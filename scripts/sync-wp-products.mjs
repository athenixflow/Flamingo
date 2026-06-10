#!/usr/bin/env node
/**
 * Sync the live product catalog from https://flamingocarcaretech.com
 * (WordPress public REST API) into content/products.ts +
 * public/images/products/ + content/product-image-manifest.json.
 *
 * Usage: node scripts/sync-wp-products.mjs
 *
 * No credentials required — the `product` custom post type is exposed
 * publicly at /wp-json/wp/v2/product.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import https from "node:https";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://flamingocarcaretech.com/wp-json/wp/v2";
const UA = "FlamingoCatalogSync/1.0 (+https://github.com/athenixflow/Flamingo)";

const PRODUCTS_TS = path.join(ROOT, "content", "products.ts");
const MANIFEST_JSON = path.join(ROOT, "content", "product-image-manifest.json");
const IMAGES_DIR = path.join(ROOT, "public", "images", "products");

const CATEGORY_HERO = {
  exterior: "#E50982",
  interior: "#8A2EFF",
  tires: "#00CFFF",
  engine: "#E50982",
  ceramic: "#8A2EFF",
  professional: "#B8B8B8",
};

const CATEGORY_FALLBACK_TAGLINE = {
  exterior: "Premium exterior protection.",
  interior: "Cabin freshness, engineered.",
  tires: "Long-lasting tire luster.",
  engine: "Engine-grade chemistry.",
  ceramic: "Nano ceramic shield.",
  professional: "Professional-grade detailing.",
};

// ────────────────────────────────────────────────────────────────────
// HTTP helpers
// ────────────────────────────────────────────────────────────────────

function httpGet(url, { binary = false } = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          "User-Agent": UA,
          Accept: binary ? "image/*,*/*;q=0.8" : "application/json",
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return httpGet(res.headers.location, { binary }).then(resolve, reject);
        }
        if (res.statusCode >= 400) {
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const buf = Buffer.concat(chunks);
          if (binary) return resolve(buf);
          try {
            resolve(JSON.parse(buf.toString("utf8")));
          } catch (err) {
            reject(err);
          }
        });
        res.on("error", reject);
      },
    );
    req.on("error", reject);
    req.setTimeout(30000, () => req.destroy(new Error(`Timeout ${url}`)));
  });
}

async function paginate(endpoint) {
  const all = [];
  for (let page = 1; page <= 20; page++) {
    const url = `${endpoint}${endpoint.includes("?") ? "&" : "?"}page=${page}`;
    let batch;
    try {
      batch = await httpGet(url);
    } catch (err) {
      // WP returns 400 once you page past the last page
      if (String(err.message).includes("HTTP 400")) break;
      throw err;
    }
    if (!Array.isArray(batch) || batch.length === 0) break;
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all;
}

// ────────────────────────────────────────────────────────────────────
// HTML / text helpers
// ────────────────────────────────────────────────────────────────────

function decodeEntities(s) {
  if (!s) return "";
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&hellip;/g, "…")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
}

function stripTags(html) {
  return decodeEntities(
    String(html)
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const SECTION_PATTERNS = {
  features: /\b(key\s+features?|features?|benefits?|highlights?)\s*:?\s*$/i,
  application: /\b(how\s+to\s+use|application|directions?|usage|instructions?|how\s+to\s+apply)\s*:?\s*$/i,
  cautions: /\b(cautions?|warnings?|precautions?|safety|notes?)\s*:?\s*$/i,
};

/**
 * Parse the WordPress content.rendered HTML into structured fields.
 * Strategy:
 *  - Tokenize into <p> blocks and <ul> blocks (preserving order).
 *  - <p> blocks ending with a known section heading (e.g. "Key Features:")
 *    label the *next* <ul>.
 *  - Narrative <p> blocks before the first labeled section become longCopy.
 *  - <ul> blocks become string[] of their <li> contents.
 */
function parseContent(html) {
  const out = {
    longCopy: "",
    features: [],
    application: [],
    cautions: [],
  };

  // Tokenize <p>...</p> and <ul>...</ul> blocks in document order.
  const tokenRegex = /<(p|ul|ol)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  const tokens = [];
  let m;
  while ((m = tokenRegex.exec(html))) {
    tokens.push({ tag: m[1].toLowerCase(), inner: m[2] });
  }

  const narrative = [];
  let pendingLabel = null; // "features" | "application" | "cautions" | null
  let seenLabeledSection = false;

  for (const tok of tokens) {
    if (tok.tag === "p") {
      const text = stripTags(tok.inner).replace(/\s+/g, " ").trim();
      if (!text) continue;

      // Is this a section heading paragraph?
      let labelFound = null;
      for (const [k, re] of Object.entries(SECTION_PATTERNS)) {
        if (re.test(text)) {
          labelFound = k;
          break;
        }
      }
      if (labelFound) {
        pendingLabel = labelFound;
        seenLabeledSection = true;
        continue;
      }

      // Bold/strong-only paragraphs ending in ":" — treat as headings too
      if (text.endsWith(":") && text.length < 60) {
        for (const [k, re] of Object.entries(SECTION_PATTERNS)) {
          if (re.test(text.replace(/:$/, ""))) {
            pendingLabel = k;
            seenLabeledSection = true;
            break;
          }
        }
        if (pendingLabel) continue;
      }

      if (!seenLabeledSection) narrative.push(text);
      // Paragraphs after a labeled section but before its UL are ignored.
    } else if (tok.tag === "ul" || tok.tag === "ol") {
      const items = [];
      const liRegex = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
      let li;
      while ((li = liRegex.exec(tok.inner))) {
        const text = stripTags(li[1]).replace(/\s+/g, " ").trim();
        if (text) items.push(text);
      }
      if (items.length === 0) continue;
      const target = pendingLabel ?? "features"; // unlabeled lists default to features
      out[target].push(...items);
      pendingLabel = null;
    }
  }

  out.longCopy = narrative.join("\n\n");
  // Deduplicate within each list while preserving order.
  for (const k of ["features", "application", "cautions"]) {
    const seen = new Set();
    out[k] = out[k].filter((s) => {
      const key = s.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  return out;
}

function extractFCode(text) {
  const m = String(text).match(/\bF\d{3,4}\b/);
  return m ? m[0].toUpperCase() : null;
}

function extractVolume(text) {
  const matches = [
    ...String(text).matchAll(
      /(\d+(?:\.\d+)?)\s*(ml|l|kg|g|oz|fl\s?oz)\b/gi,
    ),
  ];
  if (matches.length === 0) return "";
  const norm = matches
    .map((m) => {
      const n = parseFloat(m[1]);
      const unit = m[2].toLowerCase().replace(/\s+/g, "");
      const ml =
        unit === "ml" ? n
          : unit === "l" ? n * 1000
          : unit === "g" ? n
          : unit === "kg" ? n * 1000
          : unit === "oz" || unit === "floz" ? n * 30
          : 0;
      return { n, unit, ml };
    })
    .filter((x) => x.ml > 0)
    .sort((a, b) => b.ml - a.ml);
  if (norm.length === 0) return "";
  const u = norm[0].unit === "floz" ? "FL OZ" : norm[0].unit.toUpperCase();
  return `${norm[0].n}${u}`;
}

function firstSentence(text, max = 120) {
  const s = stripTags(text).replace(/\s+/g, " ").trim();
  if (!s) return "";
  const m = s.match(/^[^.!?]+[.!?]/);
  const out = (m ? m[0] : s).trim();
  return out.length > max ? out.slice(0, max - 1).trimEnd() + "…" : out;
}

/**
 * Derive a punchy chip-style tagline from a WP excerpt by stripping the
 * "Flamingo X (Fxxx) is a/an" preamble and taking the first qualifier.
 * Target length: ~25–55 chars, sentence-cased, terminated with a period.
 * Falls back to a category-based default when the excerpt yields nothing
 * usable.
 */
function deriveTagline(excerptText, categoryId) {
  const fallback =
    CATEGORY_FALLBACK_TAGLINE[categoryId] ?? "Engineered automotive care.";
  if (!excerptText) return fallback;
  let s = stripTags(excerptText).replace(/\s+/g, " ").trim();
  // Strip "Flamingo NAME (parenthesized info)? is a/an/the " preamble if present.
  s = s.replace(
    /^Flamingo\s+[^(.]+?(?:\s*\([^)]*\))?\s+is\s+(an?|the)\s+/i,
    "",
  );
  // If still starts with "Flamingo NAME (...)," strip that too.
  s = s.replace(/^Flamingo\s+[^(.]+?(?:\s*\([^)]*\))?\s*,\s*/i, "");

  // Cut at first sentence boundary (.,;:) — never mid-word.
  const boundary = s.search(/[,;:.]/);
  let tag = boundary > 0 ? s.slice(0, boundary).trim() : s;
  // If still too long, snap back to last whitespace before 55 chars.
  if (tag.length > 55) {
    const snap = tag.lastIndexOf(" ", 55);
    tag = (snap > 20 ? tag.slice(0, snap) : tag.slice(0, 55)).trim();
  }
  // Drop dangling connectors before sealing.
  tag = tag.replace(/\s+(and|or|but|with|for|to|the|a|an|in|on|at|of|that)$/i, "");
  // Sanity check — discard malformed fragments and use the category fallback instead.
  const looksBad =
    !tag ||
    tag.length < 18 ||
    /\)/.test(tag) || // contains a stray paren-close
    /^(and|or|but|with|for|the|a|an|in|on|at|of|that|is|are|it|its)\b/i.test(tag) ||
    /^Flamingo\b/i.test(tag);
  if (looksBad) return fallback;
  tag = tag[0].toUpperCase() + tag.slice(1);
  if (!/[.!?]$/.test(tag)) tag += ".";
  return tag;
}

/**
 * 1–2 complete sentences from the source text, max ~180 chars, no
 * mid-word ellipsis.
 */
function shortBlurb(text, max = 200) {
  const s = stripTags(text).replace(/\s+/g, " ").trim();
  if (!s) return "";
  if (s.length <= max) return s;
  // Take complete sentences until we'd exceed max.
  const sentences = s.match(/[^.!?]+[.!?]+/g) ?? [s];
  let out = "";
  for (const sent of sentences) {
    if ((out + sent).trim().length > max) break;
    out += sent;
  }
  out = out.trim();
  return out || sentences[0].trim();
}

// ────────────────────────────────────────────────────────────────────
// Category mapping
// ────────────────────────────────────────────────────────────────────

function classifyByTitle(title) {
  const t = title.toLowerCase();
  if (/(ceramic|\b9h\b|nano|sio2|coating)/.test(t))
    return { id: "ceramic", display: "Nano Ceramic Coating" };
  if (/(dashboard|interior|leather|freshener|fragrance|cabin|smell|rose|fresh\s+spray|conditioner)/.test(t))
    return { id: "interior", display: "Interior & Air Care" };
  if (/(\bwheel\b|\btire\b|\brim\b)/.test(t))
    return { id: "tires", display: "Tire & Wheel Care" };
  if (/(engine|fuel|injector|\boil\b|coolant|brake|transmission|atf|catalytic|carburetor|carb\b|starting|smoke|steering|undercoat|gasket|hydraulic|radiator|de-?rust|atf\d|motor\s+oil|additive)/.test(t))
    return { id: "engine", display: "Engine & Fluids" };
  if (/(towel|sponge|microfiber|chamois|chanmois|tool\s+set|cloth|brush|pva)/.test(t))
    return { id: "professional", display: "Detailing Tools" };
  if (/(wash|shampoo|wax|polish|sealant|paint|rubber\s+spray|spray\s+wax|glass\s+restorer|polish\s+wax|compound|protect)/.test(t))
    return { id: "exterior", display: "Exterior Protection" };
  return null;
}

function mapCategory(wpCategoryNames, title) {
  const names = wpCategoryNames.map((n) => n.toLowerCase());

  // Specific WP categories override title classification.
  if (names.includes("tire")) return { id: "tires", display: "Tire & Wheel Care" };
  if (names.includes("oils")) return { id: "engine", display: "Engine & Fluids" };
  if (names.includes("home")) return { id: "interior", display: "Home & Air Care" };

  // For the generic "Car Care" / "Cars" buckets, classify by title keywords.
  const byTitle = classifyByTitle(title);
  if (byTitle) return byTitle;

  // Final fallback when nothing matched.
  return { id: "exterior", display: "Exterior Protection" };
}

// ────────────────────────────────────────────────────────────────────
// Image download
// ────────────────────────────────────────────────────────────────────

async function downloadImage(url, slug) {
  if (!url) return null;
  const ext = (path.extname(new URL(url).pathname) || ".jpg").toLowerCase();
  const safeExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext) ? ext : ".jpg";
  const dest = path.join(IMAGES_DIR, `${slug}${safeExt}`);
  const publicPath = `/images/products/${slug}${safeExt}`;
  try {
    const stat = await fs.stat(dest);
    if (stat.size > 0) return publicPath; // skip already-downloaded
  } catch {}
  try {
    const buf = await httpGet(url, { binary: true });
    await fs.writeFile(dest, buf);
    return publicPath;
  } catch (err) {
    console.warn(`  ! image download failed for ${slug}: ${err.message}`);
    return null;
  }
}

// ────────────────────────────────────────────────────────────────────
// Code generation
// ────────────────────────────────────────────────────────────────────

function tsEscape(s) {
  return String(s)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "");
}

function tsStringArray(arr, indent) {
  if (!arr.length) return "[]";
  const inner = arr.map((s) => `${indent}  "${tsEscape(s)}"`).join(",\n");
  return `[\n${inner},\n${indent}]`;
}

function renderProductLiteral(p) {
  const i = "    ";
  return [
    "  {",
    `${i}id: "${tsEscape(p.id)}",`,
    `${i}code: ${p.code ? `"${tsEscape(p.code)}"` : "null"},`,
    `${i}slug: "${tsEscape(p.slug)}",`,
    `${i}name: "${tsEscape(p.name)}",`,
    `${i}category: "${p.category}",`,
    `${i}realCategory: "${tsEscape(p.realCategory)}",`,
    `${i}tagline: "${tsEscape(p.tagline)}",`,
    `${i}shortBlurb: "${tsEscape(p.shortBlurb)}",`,
    `${i}longCopy: "${tsEscape(p.longCopy)}",`,
    `${i}features: ${tsStringArray(p.features, i)},`,
    `${i}application: ${tsStringArray(p.application, i)},`,
    `${i}cautions: ${tsStringArray(p.cautions, i)},`,
    `${i}specs: { volume: "${tsEscape(p.specs.volume)}"${p.specs.volumePerCarton ? `, volumePerCarton: "${tsEscape(p.specs.volumePerCarton)}"` : ""} },`,
    `${i}heroColor: "${p.heroColor}",`,
    `${i}hero: ${p.hero ? "true" : "false"},`,
    p.relatedIds?.length
      ? `${i}relatedIds: [${p.relatedIds.map((s) => `"${tsEscape(s)}"`).join(", ")}],`
      : "",
    "  }",
  ]
    .filter(Boolean)
    .join("\n");
}

function renderProductsTs(products) {
  const header = `import type { CategoryId } from "./categories";
import { EXTRA_PRODUCTS } from "./products-extra";

export interface Product {
  /** Stable primary key — equals the product slug. */
  id: string;
  /** Display code (F-code) shown on chips and breadcrumbs. Null when the live catalog never assigned one. */
  code: string | null;
  slug: string;
  name: string;
  category: CategoryId;
  realCategory: string;
  tagline: string;
  shortBlurb: string;
  longCopy: string;
  features: string[];
  application: string[];
  cautions: string[];
  specs: {
    volume: string;
    volumePerCarton?: string;
  };
  heroColor: string;
  hero: boolean;
  relatedIds?: string[];
}

/**
 * Generated by scripts/sync-wp-products.mjs from the live WordPress
 * catalog at https://flamingocarcaretech.com/wp-json/wp/v2/product.
 *
 * DO NOT EDIT THIS ARRAY BY HAND. Add manual entries to products-extra.ts
 * instead — they get merged into PRODUCTS below and survive re-syncs.
 */
const AUTO_PRODUCTS: Product[] = [
`;

  const body = products.map(renderProductLiteral).join(",\n");

  const footer = `,
];

/**
 * Final exported catalog = the WP-synced array + any supplemental entries
 * curated in products-extra.ts (scraped from flamingocarcare.com, etc.).
 */
export const PRODUCTS: Product[] = [...AUTO_PRODUCTS, ...EXTRA_PRODUCTS];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: CategoryId) {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getHeroProducts() {
  return PRODUCTS.filter((p) => p.hero);
}

export function getRelatedProducts(product: Product) {
  if (!product.relatedIds?.length) return [];
  return product.relatedIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));
}
`;

  return header + body + footer;
}

// ────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────

async function main() {
  await fs.mkdir(IMAGES_DIR, { recursive: true });

  console.log("Fetching product categories…");
  const rawCats = await paginate(`${BASE}/product_cat?per_page=100`);
  const catById = new Map(rawCats.map((c) => [c.id, c.name]));
  console.log(`  → ${rawCats.length} WP categories`);

  console.log("Fetching products (paginated, embedded media)…");
  const rawProducts = await paginate(`${BASE}/product?per_page=100&_embed=true`);
  console.log(`  → ${rawProducts.length} products\n`);

  // Pass 1 — transform into draft Product objects (without related / hero flags).
  const drafts = [];
  for (const raw of rawProducts) {
    const slug = raw.slug;
    const titleRaw = raw.title?.rendered ?? "";
    const title = decodeEntities(stripTags(titleRaw)).replace(/\s+/g, " ").trim();
    const cleanName = title.replace(/^FLAMINGO\s+/i, "").trim();

    const wpCatNames = (raw.product_cat ?? []).map((id) => catById.get(id)).filter(Boolean);
    const cat = mapCategory(wpCatNames, title);

    const parsed = parseContent(raw.content?.rendered ?? "");
    const excerptText = stripTags(raw.excerpt?.rendered ?? "");
    const longCopy = parsed.longCopy || excerptText;

    const code = extractFCode(`${title} ${excerptText} ${raw.content?.rendered ?? ""}`);
    const volume = extractVolume(`${title} ${parsed.longCopy} ${excerptText}`);

    const featuredUrl =
      raw._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
    const imagePath = featuredUrl ? await downloadImage(featuredUrl, slug) : null;

    drafts.push({
      id: slug, // stable primary key
      code, // F-code or null
      slug,
      name: cleanName,
      category: cat.id,
      realCategory: cat.display,
      tagline: deriveTagline(excerptText || longCopy, cat.id),
      shortBlurb: shortBlurb(excerptText || longCopy),
      longCopy,
      features: parsed.features,
      application: parsed.application,
      cautions: parsed.cautions,
      specs: { volume },
      heroColor: CATEGORY_HERO[cat.id] ?? "#E50982",
      hero: false,
      relatedIds: undefined,
      _wpDate: raw.date,
      _imagePath: imagePath,
    });
  }

  // Pass 2 — pick hero products (first 6, one per internal category where possible).
  const heroPicks = new Set();
  for (const catId of ["ceramic", "tires", "engine", "exterior", "interior", "professional"]) {
    const candidate = drafts.find((d) => d.category === catId && !heroPicks.has(d.slug));
    if (candidate) heroPicks.add(candidate.slug);
    if (heroPicks.size >= 6) break;
  }
  // Top up to 6 if we didn't fill from distinct categories
  for (const d of drafts) {
    if (heroPicks.size >= 6) break;
    heroPicks.add(d.slug);
  }
  drafts.forEach((d) => (d.hero = heroPicks.has(d.slug)));

  // Pass 3 — relatedIds: pick up to 3 same-category siblings.
  for (const d of drafts) {
    const siblings = drafts
      .filter((s) => s.slug !== d.slug && s.category === d.category)
      .slice(0, 3)
      .map((s) => s.slug);
    if (siblings.length) d.relatedIds = siblings;
  }

  // Pass 4 — generate manifest (slug → image path).
  const manifest = {};
  for (const d of drafts) {
    if (d._imagePath) manifest[d.slug] = d._imagePath;
  }

  // Clean drafts (drop the private _wp* fields before serializing).
  const products = drafts.map(({ _wpDate, _imagePath, ...rest }) => rest);

  await fs.writeFile(PRODUCTS_TS, renderProductsTs(products), "utf8");
  await fs.writeFile(MANIFEST_JSON, JSON.stringify(manifest, null, 2) + "\n", "utf8");

  // Summary
  const byCat = {};
  for (const p of products) byCat[p.category] = (byCat[p.category] ?? 0) + 1;

  console.log("=".repeat(60));
  console.log("Sync complete.");
  console.log(`  Products: ${products.length}`);
  console.log(`  With image: ${Object.keys(manifest).length}`);
  console.log(`  With F-code: ${products.filter((p) => p.code).length}`);
  console.log(`  With features: ${products.filter((p) => p.features.length).length}`);
  console.log(`  With application steps: ${products.filter((p) => p.application.length).length}`);
  console.log(`  With cautions: ${products.filter((p) => p.cautions.length).length}`);
  console.log(`  With volume: ${products.filter((p) => p.specs.volume).length}`);
  console.log(`  Hero-flagged: ${products.filter((p) => p.hero).length}`);
  console.log("  Per internal category:");
  for (const [k, v] of Object.entries(byCat).sort()) {
    console.log(`    ${k.padEnd(14)} ${v}`);
  }
  console.log("=".repeat(60));
}

main().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
