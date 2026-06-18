"use client";

import { useEffect, useRef, useState } from "react";

const PDF_INLINE_HREF = "/docs/flamingo-product-manual.pdf";
const PDF_DOWNLOAD_HREF = "/api/manual";
const RELOAD_FLAG = "flamingo-manual-soft-nav-reloaded";
const SOFT_NAV_GRACE_MS = 350;
const FALLBACK_AFTER_MS = 6000;

/**
 * Client wrapper around the PDF embed.
 *
 * Two failure modes we defend against:
 *
 * 1. Soft-nav blank: when the user arrives via a Next.js client-side route
 *    transition (e.g. clicking a <Link> elsewhere on the site), the browser's
 *    built-in PDF viewer plugin doesn't initialize on the freshly-mounted
 *    <object>. The element exists in the DOM but renders nothing. If the
 *    plugin hasn't fired its load event within SOFT_NAV_GRACE_MS we trigger
 *    a single window.location.reload() — tracked in sessionStorage so we
 *    never loop.
 *
 * 2. Slow / unsupported embed: if the plugin still hasn't loaded after
 *    FALLBACK_AFTER_MS we swap the embed for a fallback card with explicit
 *    Open + Download buttons. Covers iOS Safari (no inline PDF) and very
 *    slow connections gracefully.
 */
export function ManualPDFViewer() {
  const objectRef = useRef<HTMLObjectElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");

  useEffect(() => {
    const el = objectRef.current;
    if (!el) return;

    let cancelled = false;

    // Soft-nav self-heal: if the embed hasn't reported a load within the
    // grace window, do one hard reload to force the browser to engage the
    // PDF plugin. sessionStorage prevents an infinite loop on repeat soft
    // navs back to this page during the same tab session.
    const softNavTimer = window.setTimeout(() => {
      if (cancelled || status === "ready") return;
      try {
        if (window.sessionStorage.getItem(RELOAD_FLAG)) return;
        window.sessionStorage.setItem(RELOAD_FLAG, "1");
      } catch {
        // sessionStorage may throw in private mode — fall through and reload anyway.
      }
      window.location.reload();
    }, SOFT_NAV_GRACE_MS);

    const handleLoad = () => {
      if (cancelled) return;
      window.clearTimeout(softNavTimer);
      window.clearTimeout(fallbackTimer);
      try {
        window.sessionStorage.removeItem(RELOAD_FLAG);
      } catch {}
      setStatus("ready");
    };

    const fallbackTimer = window.setTimeout(() => {
      if (cancelled || status === "ready") return;
      setStatus("fallback");
    }, FALLBACK_AFTER_MS);

    el.addEventListener("load", handleLoad);
    // <iframe> children also fire load — listen on the inner iframe if present.
    const innerIframe = el.querySelector("iframe");
    if (innerIframe) innerIframe.addEventListener("load", handleLoad);

    return () => {
      cancelled = true;
      window.clearTimeout(softNavTimer);
      window.clearTimeout(fallbackTimer);
      el.removeEventListener("load", handleLoad);
      if (innerIframe) innerIframe.removeEventListener("load", handleLoad);
    };
    // status intentionally omitted — we only want this effect on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "fallback") {
    return <FallbackCard />;
  }

  return (
    <div className="relative h-full w-full">
      <object
        ref={objectRef}
        data={`${PDF_INLINE_HREF}#view=FitH&toolbar=1&navpanes=1&scrollbar=1`}
        type="application/pdf"
        className="h-full w-full"
        aria-label="Flamingo Product Manual"
      >
        <iframe
          src={`${PDF_INLINE_HREF}#view=FitH&toolbar=1`}
          title="Flamingo Product Manual"
          className="h-full w-full border-0"
        />
      </object>

      {status === "loading" && <LoadingOverlay />}
    </div>
  );
}

function LoadingOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[55] flex flex-col items-center justify-center gap-4 bg-flamingo-obsidian"
    >
      <Spinner />
      <span className="text-meta text-flamingo-titanium">Loading manual…</span>
    </div>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden
      className="block h-10 w-10 animate-spin rounded-full border-2 border-flamingo-titanium/20 border-t-flamingo-pink"
    />
  );
}

function FallbackCard() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-flamingo-obsidian px-6 text-center">
      <div className="max-w-md rounded-3xl border border-flamingo-titanium/15 bg-flamingo-obsidian/80 p-8">
        <h1 className="display text-2xl font-bold text-flamingo-soft">
          Flamingo Product Manual
        </h1>
        <p className="mt-3 text-sm text-flamingo-titanium">
          The in-browser viewer isn&apos;t available on this device. Tap below to open the manual in your device&apos;s PDF reader, or download it for offline reading.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={PDF_INLINE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-flamingo-pink px-6 py-3 text-sm font-bold uppercase tracking-ultra text-white shadow-glow"
          >
            Open PDF
          </a>
          <a
            href={PDF_DOWNLOAD_HREF}
            download="Flamingo Product Manual.pdf"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-flamingo-titanium/30 px-6 py-3 text-sm font-bold uppercase tracking-ultra text-flamingo-soft transition-colors hover:border-flamingo-pink hover:text-flamingo-pink"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
