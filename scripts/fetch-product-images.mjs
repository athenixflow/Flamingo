#!/usr/bin/env node
/**
 * Fetches real product imagery and metadata from flamingocarcare.com.
 *
 * For each F-code in our /content/products.ts catalog:
 *   1. Search the live site (category pages) for the matching product detail link
 *   2. Pull the detail page HTML
 *   3. Find the main product image URL
 *   4. Download it to /public/images/products/<F-code>.jpg
 *   5. Also resolve and write the live-site source URL into /content/scraped/source-urls.json
 *
 * Run: node scripts/fetch-product-images.mjs
 */

import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PRODUCTS_TS = path.resolve(__dirname, "..", "content", "products.ts");
const IMG_DIR = path.resolve(__dirname, "..", "public", "images", "products");
const META_DIR = path.resolve(__dirname, "..", "content", "scraped");

const BASE = "https://www.flamingocarcare.com";

const CATEGORY_PATHS = [
  "tire-wheel-care",
  "interior-exterior",
  "CAR-WAX",
  "MOTOR-OIL",
  "nano-ceramic-coating",
  "Rubber-Spray",
  "spray-protection",
  "air-freshener",
  "car-parts-care",
  "de-rust-lubricant",
  "cooling-system-care",
  "additives",
  "spray-paint",
  "oem--amp--odm",
  "oil--amp--fluid",
  "new-items",
];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36";

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

function extractFCodes(text) {
  return readFile(PRODUCTS_TS, "utf8").then((src) => {
    const ids = new Set();
    const re = /id:\s*"(F[0-9A-Z]+)"/g;
    let m;
    while ((m = re.exec(src))) ids.add(m[1]);
    return [...ids];
  });
}

function resolveUrl(href) {
  if (href.startsWith("http")) return href;
  if (href.startsWith("//")) return `https:${href}`;
  if (href.startsWith("/")) return `${BASE}${href}`;
  return `${BASE}/${href}`;
}

function findDetailLinks(html, categorySlug) {
  const links = new Set();
  // Pattern 1: /{category}/{id}.html
  const re1 = new RegExp(`href="([^"]*\\/${categorySlug}\\/\\d+\\.html)"`, "g");
  let m;
  while ((m = re1.exec(html))) links.add(resolveUrl(m[1]));
  // Pattern 2: legacy ?aid= query strings
  const re2 = /href="([^"]*aid=\d+[^"]*)"/g;
  while ((m = re2.exec(html))) links.add(resolveUrl(m[1]));
  return [...links];
}

function findMainImage(html) {
  // Live site stores main product photos at /uploads/allimg/Upjpeg/.
  // The OG image points at the site logo, so we skip it.
  const upjpeg = html.match(
    /src="([^"]*\/uploads\/allimg\/Upjpeg\/[^"]+\.(?:jpg|jpeg|png|webp))"/i,
  );
  if (upjpeg) return resolveUrl(upjpeg[1]);

  // Fall back to any /uploads/ image that isn't in the header-logo path or thumbnail path.
  const all = [
    ...html.matchAll(/src="([^"]*\/uploads\/[^"]+\.(?:jpg|jpeg|png|webp))"/gi),
  ]
    .map((m) => m[1])
    .filter(
      (u) =>
        !/\/uploads\/allimg\/2024\d{4,6}\//i.test(u) && !/\/small\//i.test(u),
    );
  if (all.length > 0) return resolveUrl(all[0]);

  return null;
}

function extractFCode(html) {
  // Plain text search for F-code
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ");
  const m = cleaned.match(/\bF\d{2,4}[A-Z]?\b/);
  return m ? m[0] : null;
}

async function main() {
  await mkdir(IMG_DIR, { recursive: true });
  await mkdir(META_DIR, { recursive: true });

  const wantedCodes = await extractFCodes();
  console.log(`Looking for ${wantedCodes.length} F-codes from local catalog.`);
  console.log(wantedCodes.join(", "));

  // Build code → detail URL map by walking categories
  const codeToUrl = {};
  for (const slug of CATEGORY_PATHS) {
    const catUrl = `${BASE}/${slug}/`;
    try {
      const html = await fetchText(catUrl);
      const detailLinks = findDetailLinks(html, slug);
      console.log(`[${slug}] ${detailLinks.length} detail links`);
      for (const link of detailLinks) {
        try {
          const detail = await fetchText(link);
          const code = extractFCode(detail);
          if (code && wantedCodes.includes(code) && !codeToUrl[code]) {
            const img = findMainImage(detail);
            if (img) {
              codeToUrl[code] = { detail: link, image: img };
              console.log(`  ✓ ${code} → ${img.split("/").pop()}`);
            }
          }
          await new Promise((r) => setTimeout(r, 150));
        } catch (err) {
          console.warn(`  ✗ ${link}: ${err.message}`);
        }
      }
    } catch (err) {
      console.warn(`[${slug}] ${err.message}`);
    }
  }

  // Download images
  for (const code of Object.keys(codeToUrl)) {
    const { image } = codeToUrl[code];
    try {
      const ext = path.extname(new URL(image).pathname).toLowerCase() || ".jpg";
      const target = path.join(IMG_DIR, `${code}${ext}`);
      const buf = await fetchBuffer(image);
      await writeFile(target, buf);
      console.log(`  saved ${code}${ext} (${buf.length} bytes)`);
    } catch (err) {
      console.warn(`  failed ${code}: ${err.message}`);
    }
  }

  await writeFile(
    path.join(META_DIR, "source-urls.json"),
    JSON.stringify(codeToUrl, null, 2),
  );

  // Also write a flat manifest that maps F-code → local image path.
  // This is imported by lib/product-images.ts on both server and client.
  const manifest = {};
  const { readdirSync } = await import("node:fs");
  for (const file of readdirSync(IMG_DIR)) {
    const match = file.match(/^(F[0-9A-Z]+)\.(jpg|jpeg|png|webp)$/i);
    if (match) {
      manifest[match[1].toUpperCase()] = `/images/products/${file}`;
    }
  }
  const manifestPath = path.resolve(
    __dirname,
    "..",
    "content",
    "product-image-manifest.json",
  );
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(
    `\nDone. ${Object.keys(codeToUrl).length}/${wantedCodes.length} matched. ${Object.keys(manifest).length} images in manifest.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
