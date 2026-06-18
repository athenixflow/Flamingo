import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

const PDF_HREF = "/docs/flamingo-product-manual.pdf";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Flamingo Product Manual",
    description: "Read the complete Flamingo Product Manual online.",
    path: "/FLAMINGO-PRODUCTS-MANUAL",
  }),
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

/**
 * Bare PDF viewer.
 *
 * The route exists for QR-code / packaging links — scan, the PDF opens
 * full-bleed. No marketing chrome.
 *
 * The viewer is a fixed full-viewport overlay that visually covers the
 * global Navbar / Footer / WhatsAppButton rendered by app/layout.tsx.
 * Native <object>/<iframe> hands rendering to the browser's built-in PDF
 * viewer (Chrome/Edge/Firefox/Safari desktop), which provides scroll,
 * zoom, search, page-navigation, and download natively. iOS Safari falls
 * back to the action-bar Download button + a "tap to open" link.
 */
export default function FlamingoProductsManualViewerPage() {
  return (
    <div
      className="fixed inset-0 z-[60] bg-flamingo-obsidian"
      role="region"
      aria-label="Flamingo Product Manual viewer"
    >
      <object
        data={`${PDF_HREF}#view=FitH&toolbar=1&navpanes=1&scrollbar=1`}
        type="application/pdf"
        className="h-full w-full"
        aria-label="Flamingo Product Manual"
      >
        <iframe
          src={`${PDF_HREF}#view=FitH&toolbar=1`}
          title="Flamingo Product Manual"
          className="h-full w-full border-0"
        >
          <FallbackMessage />
        </iframe>
      </object>

      <ActionBar />
    </div>
  );
}

function ActionBar() {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[61] flex items-center gap-2 sm:right-6 sm:top-6">
      <a
        href={PDF_HREF}
        download="Flamingo Product Manual.pdf"
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-flamingo-pink px-4 py-2.5 text-xs font-bold uppercase tracking-ultra text-white shadow-glow transition-transform hover:scale-[1.03]"
      >
        <DownloadGlyph className="h-4 w-4" />
        <span className="hidden sm:inline">Download</span>
      </a>
      <a
        href="/FLAMINGO-PRODUCTS-MANUAL-DETAILS"
        aria-label="Close viewer and view full product details"
        className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-flamingo-titanium/30 bg-flamingo-obsidian/70 text-flamingo-soft backdrop-blur transition-colors hover:border-flamingo-pink/60 hover:text-flamingo-pink"
      >
        <CloseGlyph className="h-4 w-4" />
      </a>
    </div>
  );
}

/**
 * iOS Safari and other browsers that can't embed a PDF inline land here.
 * Renders a centered card with a download link + open-in-browser tap target.
 */
function FallbackMessage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-flamingo-obsidian px-6 text-center">
      <div className="max-w-md rounded-3xl border border-flamingo-titanium/15 bg-flamingo-obsidian/80 p-8">
        <h1 className="display text-2xl font-bold text-flamingo-soft">
          Flamingo Product Manual
        </h1>
        <p className="mt-3 text-sm text-flamingo-titanium">
          Tap below to open the manual in your device&apos;s PDF reader, or download it for offline reading.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={PDF_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-flamingo-pink px-6 py-3 text-sm font-bold uppercase tracking-ultra text-white shadow-glow"
          >
            Open PDF
          </a>
          <a
            href={PDF_HREF}
            download="Flamingo Product Manual.pdf"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-flamingo-titanium/30 px-6 py-3 text-sm font-bold uppercase tracking-ultra text-flamingo-soft transition-colors hover:border-flamingo-pink hover:text-flamingo-pink"
          >
            <DownloadGlyph className="h-4 w-4" />
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

function DownloadGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M6 6l12 12M18 6l-12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
