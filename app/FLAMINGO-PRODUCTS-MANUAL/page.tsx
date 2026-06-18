import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ManualPDFViewer } from "@/components/sections/manual/ManualPDFViewer";

const PDF_DOWNLOAD_HREF = "/api/manual";

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
 * The actual <object>/<iframe> + loading state + fallback lives in the
 * client component <ManualPDFViewer />, which also self-heals if the
 * browser arrives here via a soft Next-router transition (single
 * window.location.reload to wake the PDF plugin).
 */
export default function FlamingoProductsManualViewerPage() {
  return (
    <div
      className="fixed inset-0 z-[60] bg-flamingo-obsidian"
      role="region"
      aria-label="Flamingo Product Manual viewer"
    >
      <ManualPDFViewer />
      <ActionBar />
    </div>
  );
}

function ActionBar() {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[61] flex items-center gap-2 sm:right-6 sm:top-6">
      <a
        href={PDF_DOWNLOAD_HREF}
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
