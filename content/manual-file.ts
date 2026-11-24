// Kept separate from manual.ts so client components can import these
// URLs without bundling the full product content.

/**
 * Bump this whenever public/docs/flamingo-product-manual.pdf is replaced.
 * It is appended to every manual URL so browsers can't serve a cached
 * copy of the previous edition.
 */
export const MANUAL_VERSION = "2026-11-24";
/** Inline (viewable) copy of the manual PDF. */
export const MANUAL_PDF_HREF = `/docs/flamingo-product-manual.pdf?v=${MANUAL_VERSION}`;
/** Force-download endpoint for the manual PDF. */
export const MANUAL_DOWNLOAD_HREF = `/api/manual?v=${MANUAL_VERSION}`;
