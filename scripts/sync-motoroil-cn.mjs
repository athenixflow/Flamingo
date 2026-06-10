#!/usr/bin/env node
/**
 * Scrape https://www.flamingocarcare.com/MOTOR-OIL/ — a static-HTML
 * sister site of the WordPress catalog — and add motor-oil grades to
 * content/products-extra.ts that aren't already in our catalog.
 *
 * Strategy:
 *   1. Fetch the MOTOR-OIL listing page → all /MOTOR-OIL/{id}.html anchors
 *      with their alt-text titles.
 *   2. Group by unique title (bottle-size variants share the same title;
 *      we pick the first detail URL for each).
 *   3. Dedup against existing motor-oil products in content/products.ts
 *      using a grade-fingerprint (5w-30, 0w-20-c3, etc.). Skip any grade
 *      already covered, except C3/C5/etc. variants which are always
 *      distinct ACEA-spec products.
 *   4. For each remaining title, fetch the detail page → extract the
 *      hero image URL + F-code, download the image to
 *      public/images/products/, build a Product entry.
 *   5. Write content/products-extra.ts merging with anything already
 *      there (dedup by slug).
 *
 * Output:
 *   - content/products-extra.ts          (EXTRA_PRODUCTS array)
 *   - content/product-image-manifest.json (new slug → image-path entries)
 *   - public/images/products/{slug}.{ext} (downloaded bottle images)
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import https from "node:https";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://www.flamingocarcare.com";
const LISTING_URL = `${BASE}/MOTOR-OIL/`;
const UA = "FlamingoMotorOilSync/1.0 (+https://github.com/athenixflow/Flamingo)";

const PRODUCTS_TS = path.join(ROOT, "content", "products.ts");
const EXTRA_TS = path.join(ROOT, "content", "products-extra.ts");
const MANIFEST_JSON = path.join(ROOT, "content", "product-image-manifest.json");
const IMAGES_DIR = path.join(ROOT, "public", "images", "products");

// ────────────────────────────────────────────────────────────────────
// HTTP helpers
// ────────────────────────────────────────────────────────────────────

function httpGet(url, { binary = false, redirects = 0 } = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          "User-Agent": UA,
          Accept: binary ? "image/*,*/*;q=0.8" : "text/html,*/*;q=0.8",
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects < 5) {
          const next = res.headers.location.startsWith("http")
            ? res.headers.location
            : `${BASE}${res.headers.location}`;
          return httpGet(next, { binary, redirects: redirects + 1 }).then(resolve, reject);
        }
        if (res.statusCode >= 400) {
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const buf = Buffer.concat(chunks);
          resolve(binary ? buf : buf.toString("utf8"));
        });
        res.on("error", reject);
      },
    );
    req.on("error", reject);
    req.setTimeout(30000, () => req.destroy(new Error(`Timeout ${url}`)));
  });
}

// ────────────────────────────────────────────────────────────────────
// Parsing
// ────────────────────────────────────────────────────────────────────

function parseListing(html) {
  // Each product card looks like:
  //   <a href="/MOTOR-OIL/449.html"><img src="..." alt="MINERAL MOTOR OIL 15W-40" ...
  const re = /<a\s+href="(\/MOTOR-OIL\/(\d+)\.html)"\s*>\s*<img[^>]*alt="([^"]+)"/gi;
  const out = [];
  let m;
  while ((m = re.exec(html))) {
    const [, href, id, title] = m;
    const cleanTitle = title.replace(/\s+/g, " ").trim();
    if (!/motor\s*oil/i.test(cleanTitle)) continue;
    out.push({ id, url: `${BASE}${href}`, title: cleanTitle });
  }
  return out;
}

function parseDetailPage(html) {
  // Hero image lives inside <div class="Imgs"> … <img src="…">
  const imgMatch = html.match(/<div\s+class="Imgs">[\s\S]*?<img[^>]+src="([^"]+)"/i);
  const imageSrc = imgMatch ? imgMatch[1] : null;
  // F-code: <li>PRODUCT CODE:F4234SL</li> (sometimes "PRODUCT CODE :")
  const codeMatch = html.match(/PRODUCT\s*CODE\s*:\s*([A-Z0-9-]+)/i);
  const code = codeMatch ? codeMatch[1].trim().toUpperCase() : null;
  return { imageSrc, code };
}

// ────────────────────────────────────────────────────────────────────
// Slug / fingerprint helpers
// ────────────────────────────────────────────────────────────────────

function kebab(s) {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function slugFromTitle(title) {
  return `flamingo-${kebab(title)}`;
}

/** Grade fingerprint: "5w-30", "0w-20-c5", etc. Null if no grade. */
function gradeFingerprint(text) {
  const t = String(text).toLowerCase();
  const grade = t.match(/\b(\d+w-?\d+)\b/);
  if (!grade) return null;
  const normGrade = grade[1].replace(/(\d+w)(\d+)/, "$1-$2"); // 5w30 → 5w-30
  const variant = t.match(/\b(c[2-9])\b/);
  return variant ? `${normGrade}-${variant[1]}` : normGrade;
}

/** Extract every motor-oil-like product currently in content/products.ts. */
async function readExistingFingerprints() {
  const src = await fs.readFile(PRODUCTS_TS, "utf8");
  const set = new Set();
  // Pull out every product name + slug; fingerprint anything that names a grade.
  const blockRe = /\{\s*id:\s*"([^"]+)",[\s\S]*?name:\s*"([^"]+)"/g;
  let m;
  while ((m = blockRe.exec(src))) {
    const [, slug, name] = m;
    if (!/motor\s*oil|atf|oil|fluid/i.test(name)) continue;
    const fp = gradeFingerprint(name) ?? gradeFingerprint(slug);
    if (fp) set.add(fp);
  }
  return set;
}

// ────────────────────────────────────────────────────────────────────
// Image download
// ────────────────────────────────────────────────────────────────────

async function downloadImage(absoluteUrl, slug) {
  const ext = (path.extname(new URL(absoluteUrl).pathname) || ".png").toLowerCase();
  const safeExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext) ? ext : ".png";
  const dest = path.join(IMAGES_DIR, `${slug}${safeExt}`);
  const publicPath = `/images/products/${slug}${safeExt}`;
  try {
    const stat = await fs.stat(dest);
    if (stat.size > 0) return publicPath; // idempotent re-run
  } catch {}
  const buf = await httpGet(absoluteUrl, { binary: true });
  await fs.writeFile(dest, buf);
  return publicPath;
}

// ────────────────────────────────────────────────────────────────────
// Copy generation (minimal — matches user's "Recommended" plan choice)
// ────────────────────────────────────────────────────────────────────

const TAGLINE = "Engine-grade chemistry.";

function buildLongCopy(title) {
  const t = title.toLowerCase();
  let typeLabel = "premium motor oil";
  if (/full\s+synthetic/.test(t)) typeLabel = "full synthetic motor oil";
  else if (/synthetic/.test(t)) typeLabel = "synthetic motor oil";
  else if (/mineral/.test(t)) typeLabel = "mineral motor oil";

  const grade = title.match(/\b(\d+W-?\d+)\b/i)?.[1].toUpperCase().replace(/(\d+W)(\d+)/, "$1-$2");
  const variant = title.match(/\b(C[2-9])\b/i)?.[1].toUpperCase();
  const ackVariant = variant ? ` It meets the ACEA ${variant} specification for modern engines with after-treatment systems.` : "";

  const intro = `Flamingo ${title.replace(/^FLAMINGO\s+/i, "").trim()} is a ${typeLabel} engineered for consistent engine protection across a wide operating range.`;
  const grade_paragraph = grade
    ? ` The ${grade} viscosity profile delivers cold-start flow with high-temperature film strength, helping reduce wear, deposits, and oil consumption.${ackVariant}`
    : ackVariant;
  const close = " Suitable for gasoline and diesel engines per the manufacturer's recommended grade.";
  return `${intro}${grade_paragraph}${close}`;
}

function shortBlurb(title) {
  const t = title.toLowerCase();
  let typeLabel = "motor oil";
  if (/full\s+synthetic/.test(t)) typeLabel = "full synthetic motor oil";
  else if (/synthetic/.test(t)) typeLabel = "synthetic motor oil";
  else if (/mineral/.test(t)) typeLabel = "mineral motor oil";
  return `Flamingo ${typeLabel} — engineered for engine protection and longevity.`;
}

// ────────────────────────────────────────────────────────────────────
// TS rendering
// ────────────────────────────────────────────────────────────────────

function tsEscape(s) {
  return String(s)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "");
}

function renderEntry(p) {
  const i = "    ";
  return [
    "  {",
    `${i}id: "${tsEscape(p.id)}",`,
    `${i}code: ${p.code ? `"${tsEscape(p.code)}"` : "null"},`,
    `${i}slug: "${tsEscape(p.slug)}",`,
    `${i}name: "${tsEscape(p.name)}",`,
    `${i}category: "engine",`,
    `${i}realCategory: "Motor Oil",`,
    `${i}tagline: "${tsEscape(p.tagline)}",`,
    `${i}shortBlurb: "${tsEscape(p.shortBlurb)}",`,
    `${i}longCopy: "${tsEscape(p.longCopy)}",`,
    `${i}features: [],`,
    `${i}application: [],`,
    `${i}cautions: [],`,
    `${i}specs: { volume: "" },`,
    `${i}heroColor: "#E50982",`,
    `${i}hero: false,`,
    "  }",
  ].join("\n");
}

function renderExtraTs(entries) {
  const header = `import type { Product } from "./products";

/**
 * Hand-curated / scraped supplemental products that live alongside the
 * WordPress-synced catalog in products.ts. These are appended to PRODUCTS
 * at export time so re-running scripts/sync-wp-products.mjs never wipes
 * them out.
 *
 * Populated by scripts/sync-motoroil-cn.mjs (and any future per-category
 * scrapers pointed at flamingocarcare.com).
 */
export const EXTRA_PRODUCTS: Product[] = [
`;
  const body = entries.map(renderEntry).join(",\n");
  const footer = entries.length > 0 ? "\n];\n" : "];\n";
  return header + body + footer;
}

// ────────────────────────────────────────────────────────────────────
// Read existing EXTRA entries (so we don't clobber manual additions)
// ────────────────────────────────────────────────────────────────────

async function readExistingExtraSlugs() {
  try {
    const src = await fs.readFile(EXTRA_TS, "utf8");
    const slugs = new Set();
    const re = /slug:\s*"([^"]+)"/g;
    let m;
    while ((m = re.exec(src))) slugs.add(m[1]);
    return slugs;
  } catch {
    return new Set();
  }
}

// ────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────

async function main() {
  await fs.mkdir(IMAGES_DIR, { recursive: true });

  console.log(`Fetching ${LISTING_URL}…`);
  const listingHtml = await httpGet(LISTING_URL);
  const items = parseListing(listingHtml);
  console.log(`  → ${items.length} product anchors`);

  // Group by title, keep first detail URL per unique title
  const byTitle = new Map();
  for (const it of items) {
    if (!byTitle.has(it.title)) byTitle.set(it.title, it.url);
  }
  console.log(`  → ${byTitle.size} unique titles`);

  // Dedup against existing catalog + extras
  const existingFingerprints = await readExistingFingerprints();
  const existingExtraSlugs = await readExistingExtraSlugs();
  console.log(`  → ${existingFingerprints.size} existing motor-oil fingerprints in products.ts`);

  // Walk through unique titles in listing order; pick ones whose grade
  // fingerprint isn't already covered. Track adds so we don't add two
  // titles with the same grade in this run.
  const addedFingerprints = new Set();
  const toAdd = [];
  for (const [title, url] of byTitle) {
    const fp = gradeFingerprint(title);
    if (!fp) {
      console.log(`  ? "${title}" — no grade detected, skipping`);
      continue;
    }
    if (existingFingerprints.has(fp) || addedFingerprints.has(fp)) {
      console.log(`  · "${title}" — already covered (${fp}), skipping`);
      continue;
    }
    addedFingerprints.add(fp);
    toAdd.push({ title, url, fingerprint: fp });
  }

  console.log(`\nWill add ${toAdd.length} new products. Fetching detail pages…\n`);

  // Read existing manifest to merge new entries
  let manifest = {};
  try {
    manifest = JSON.parse(await fs.readFile(MANIFEST_JSON, "utf8"));
  } catch {}

  const newEntries = [];
  for (const item of toAdd) {
    const slug = slugFromTitle(item.title);
    if (existingExtraSlugs.has(slug)) {
      console.log(`  · ${slug} — already in products-extra.ts, skipping`);
      continue;
    }
    console.log(`  → ${slug}`);
    const detailHtml = await httpGet(item.url);
    const { imageSrc, code } = parseDetailPage(detailHtml);

    let imagePath = null;
    if (imageSrc) {
      const absoluteImage = imageSrc.startsWith("http") ? imageSrc : `${BASE}${imageSrc}`;
      try {
        imagePath = await downloadImage(absoluteImage, slug);
        console.log(`     img: ${imagePath}`);
      } catch (err) {
        console.warn(`     ! image download failed: ${err.message}`);
      }
    } else {
      console.warn(`     ! no image found on detail page`);
    }

    const cleanName = item.title
      .replace(/^FLAMINGO\s+/i, "")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase())
      // Re-capitalise viscosity grade (0w-20 → 0W-20) and ACEA spec (c3 → C3)
      .replace(/\b(\d+)w-(\d+)\b/gi, (_, a, b) => `${a}W-${b}`)
      .replace(/\b(c)([2-9])\b/gi, (_, c, n) => `${c.toUpperCase()}${n}`);

    newEntries.push({
      id: slug,
      slug,
      name: cleanName,
      code,
      tagline: TAGLINE,
      shortBlurb: shortBlurb(item.title),
      longCopy: buildLongCopy(item.title),
    });

    if (imagePath) manifest[slug] = imagePath;
  }

  // Merge with existing EXTRA entries by reading raw file + appending.
  // For simplicity (and matching the user's "scraped + hand-edited live
  // together" model), we read the existing entries' slugs and only emit
  // entries not already present. The existing entries we leave intact by
  // appending our new entries to a *re-rendered* file — but to preserve
  // any hand edits, we re-parse and merge structurally. Simplest robust
  // approach: re-emit only entries we've scraped, plus we ALSO read any
  // existing entries' raw JSON-ish blocks and preserve them.
  //
  // For this initial run there are no existing extras (seed is empty),
  // so we just emit our new entries. If the file already had entries,
  // we'd preserve them by reading their slugs (done above) and skipping
  // duplicate slugs.
  const existingEntries = await readExistingEntriesAsObjects();
  const merged = [
    ...existingEntries.filter((e) => !newEntries.find((n) => n.slug === e.slug)),
    ...newEntries,
  ];

  await fs.writeFile(EXTRA_TS, renderExtraTs(merged), "utf8");
  await fs.writeFile(MANIFEST_JSON, JSON.stringify(manifest, null, 2) + "\n", "utf8");

  console.log("\n" + "=".repeat(60));
  console.log("Sync complete.");
  console.log(`  Added: ${newEntries.length}`);
  console.log(`  Images downloaded: ${Object.keys(manifest).length - (Object.keys(manifest).length - newEntries.filter((e) => manifest[e.slug]).length)}`);
  console.log(`  EXTRA_PRODUCTS now: ${merged.length}`);
  console.log("=".repeat(60));
  for (const e of newEntries) {
    console.log(`  · ${e.slug.padEnd(55)} ${e.code ?? "(no F-code)"}`);
  }
}

/**
 * Re-read the existing EXTRA file and pull out each entry as a minimal
 * object (id/slug/name/code/tagline/shortBlurb/longCopy). Used to
 * preserve hand-edited entries across re-runs of this scraper.
 */
async function readExistingEntriesAsObjects() {
  let src = "";
  try {
    src = await fs.readFile(EXTRA_TS, "utf8");
  } catch {
    return [];
  }

  const entries = [];
  const blockRe = /\{\s*id:\s*"([^"]+)",\s*code:\s*(null|"[^"]*"),\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*category:\s*"[^"]+",\s*realCategory:\s*"[^"]+",\s*tagline:\s*"([^"]+)",\s*shortBlurb:\s*"([^"]+)",\s*longCopy:\s*"([^"]+)",[\s\S]*?\}/g;
  let m;
  while ((m = blockRe.exec(src))) {
    const [, id, codeRaw, slug, name, tagline, shortBlurb, longCopy] = m;
    const code = codeRaw === "null" ? null : codeRaw.slice(1, -1);
    entries.push({
      id, slug, name, code, tagline, shortBlurb, longCopy,
    });
  }
  return entries;
}

main().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
