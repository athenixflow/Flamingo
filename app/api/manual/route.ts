import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

/**
 * Force-download endpoint for the Flamingo Product Manual.
 *
 * The raw asset at /docs/flamingo-product-manual.pdf is served inline so
 * the bare PDF viewer route can embed it via <iframe>/<object>. This
 * route returns the same bytes but with `Content-Disposition: attachment`,
 * which forces every browser (including iOS Safari, where the HTML
 * `download` attribute is unreliable) to save the file instead of
 * rendering it inline.
 *
 * All "Download" CTAs point here.
 */
export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "docs",
    "flamingo-product-manual.pdf",
  );
  const file = await fs.readFile(filePath);
  // Convert Node Buffer to a Uint8Array view so NextResponse accepts it
  // as a BodyInit without TypeScript complaining about the BufferSource
  // mismatch between node and web runtimes.
  const body = new Uint8Array(file);

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="Flamingo Product Manual.pdf"',
      "Content-Length": String(body.byteLength),
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}

// File is static — Vercel can cache the route response indefinitely.
export const dynamic = "force-static";
