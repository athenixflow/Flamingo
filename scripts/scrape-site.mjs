#!/usr/bin/env node
/**
 * Scrapes the live flamingocarcare.com site to harvest real product data,
 * expert-tip copy, and company info. Outputs JSON to /content/scraped/.
 *
 * Run: node scripts/scrape-site.mjs
 *
 * This is a build-time tool. The scraped JSON is committed and the runtime
 * site reads from compiled TypeScript modules in /content.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.resolve(__dirname, "..", "content", "scraped");

const BASE = "https://www.flamingocarcare.com";

const CATEGORY_PATHS = [
  "tire-wheel-care",
  "interior-exterior",
  "car-wax",
  "motor-oil",
  "nano-ceramic-coating",
  "rubber-spray",
  "spray-protection",
  "air-freshener",
  "car-parts-care",
  "de-rust-lubricant",
  "cooling-system-care",
  "additives",
  "spray-paint",
];

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; FlamingoSiteBuild/1.0; +https://flamingocarcare.com)",
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractProductLinks(html) {
  const links = new Set();
  const re = /href="([^"]*\?[^"]*aid=\d+[^"]*)"/g;
  let match;
  while ((match = re.exec(html))) links.add(match[1]);
  return [...links];
}

function extractFCode(text) {
  const m = text.match(/\bF\d{2,4}[A-Z]?\b/);
  return m ? m[0] : null;
}

function extractProductData(html) {
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/_.*$/, "").trim() : null;

  const text = stripTags(html);
  const code = extractFCode(text);

  const volumeMatch = text.match(/Volume[:\s]*([0-9.]+\s*(ML|L|G|KG|OZ)[^\s]*[^,;.]*)/i);
  const cartonMatch = text.match(/Volume per carton[:\s]*([0-9.]+\s*CBM[^,;.]*)/i);

  return {
    title,
    code,
    volume: volumeMatch ? volumeMatch[1].trim() : null,
    volumePerCarton: cartonMatch ? cartonMatch[1].trim() : null,
    bodyText: text.slice(0, 4000),
  };
}

async function scrapeCategory(slug) {
  const url = `${BASE}/${slug}/`;
  try {
    const html = await fetchText(url);
    const productLinks = extractProductLinks(html);
    return { slug, url, productLinks };
  } catch (err) {
    return { slug, url, error: err.message };
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  console.log("Scraping homepage...");
  const homeHtml = await fetchText(BASE);
  await writeFile(path.join(OUT_DIR, "home.html"), homeHtml);

  const categories = [];
  for (const slug of CATEGORY_PATHS) {
    console.log(`Scraping category: ${slug}`);
    const result = await scrapeCategory(slug);
    categories.push(result);
    await new Promise((r) => setTimeout(r, 300));
  }
  await writeFile(
    path.join(OUT_DIR, "categories.json"),
    JSON.stringify(categories, null, 2),
  );

  const allLinks = new Set();
  for (const c of categories) {
    (c.productLinks || []).forEach((l) =>
      allLinks.add(l.startsWith("http") ? l : `${BASE}/${l.replace(/^\//, "")}`),
    );
  }
  console.log(`Found ${allLinks.size} product links`);

  const products = [];
  for (const link of allLinks) {
    try {
      const html = await fetchText(link);
      const data = extractProductData(html);
      products.push({ url: link, ...data });
    } catch (err) {
      products.push({ url: link, error: err.message });
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  await writeFile(
    path.join(OUT_DIR, "products.json"),
    JSON.stringify(products, null, 2),
  );

  console.log(`Done. ${products.length} products scraped.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
