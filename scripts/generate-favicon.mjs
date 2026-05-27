#!/usr/bin/env node
/**
 * Generates app/favicon.ico from the brand mark using sharp (transitive
 * dependency of next). One-shot; run when the brand identity changes.
 *
 *   node scripts/generate-favicon.mjs
 *
 * Browsers accept PNG-disguised-as-ICO universally for the /favicon.ico path,
 * so we save a 32×32 PNG with .ico extension rather than negotiating ICO
 * encoding.
 */

import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT = path.resolve(__dirname, "..", "app", "favicon.ico");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#050505"/>
  <circle cx="16" cy="16" r="11" fill="#E50982"/>
  <circle cx="16" cy="16" r="6" fill="#050505"/>
  <circle cx="16" cy="16" r="3" fill="#E50982"/>
</svg>
`;

const png = await sharp(Buffer.from(svg)).resize(32, 32).png().toBuffer();

// Wrap the 32x32 PNG in a valid ICO container.
// Header: 6 bytes + Directory entry: 16 bytes = 22 bytes before image data.
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: ICO
header.writeUInt16LE(1, 4); // image count

const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0);                  // width (32)
entry.writeUInt8(32, 1);                  // height (32)
entry.writeUInt8(0, 2);                   // palette count
entry.writeUInt8(0, 3);                   // reserved
entry.writeUInt16LE(1, 4);                // color planes
entry.writeUInt16LE(32, 6);               // bits per pixel
entry.writeUInt32LE(png.length, 8);       // image bytes
entry.writeUInt32LE(22, 12);              // offset from start of file

const ico = Buffer.concat([header, entry, png]);

const { writeFile } = await import("node:fs/promises");
await writeFile(OUT, ico);

console.log(`Wrote ${OUT} (${ico.length} bytes, ICO wrapping ${png.length}-byte PNG)`);
