import { readdirSync, existsSync } from "node:fs";
import path from "node:path";

const BRAND_DIR = path.join(process.cwd(), "public", "images", "brand");

let cached: string | null | undefined;

/**
 * Returns the public URL of the brand logo, or `null` if no file is present.
 * Discovers any file matching `logo.<ext>` where ext is jpg/jpeg/png/webp/svg
 * (and accepts the doubled extension `logo.jpg.jpeg` that Windows tends to
 * generate when users save a JPEG as `.jpg`).
 *
 * Server-only: do not call from a client component. The root layout resolves
 * the URL once and passes it down as a prop.
 */
export function getBrandLogo(): string | null {
  if (cached !== undefined) return cached;
  if (!existsSync(BRAND_DIR)) {
    cached = null;
    return cached;
  }
  const files = readdirSync(BRAND_DIR);
  const match = files.find((f) =>
    /^logo\.(jpe?g|png|webp|svg)(\.(jpe?g|png|webp))?$/i.test(f),
  );
  cached = match ? `/images/brand/${match}` : null;
  return cached;
}
