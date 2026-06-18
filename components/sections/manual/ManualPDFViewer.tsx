"use client";

import { useEffect, useRef, useState } from "react";

const PDF_INLINE_HREF = "/docs/flamingo-product-manual.pdf";
const PDF_DOWNLOAD_HREF = "/api/manual";
// Time after which we auto-hide the loading overlay regardless of events.
// By this point every supported browser has engaged its built-in PDF
// viewer and the document is visible behind the overlay.
const OVERLAY_AUTO_HIDE_MS = 1800;
// Time after which, if the embed still hasn't reported a load, we swap
// to an explicit Open / Download fallback card. Covers iOS Safari (no
// inline PDF support) and very slow / failed connections.
const FALLBACK_AFTER_MS = 6000;

/**
 * Client wrapper around the PDF embed.
 *
 * We deliberately don't depend on the <object> element firing a `load`
 * event to clear the loading overlay — browsers' built-in PDF plugins
 * take over the embed and stop bubbling JS events, so that signal is
 * unreliable (and in incognito with a cold cache, it almost never
 * arrives in time). Instead the overlay auto-hides on a fixed timer,
 * with the iframe `load` event as a fast-path optimisation when it does
 * fire.
 *
 * If neither the iframe load fires nor the user reaches the page on a
 * device with inline PDF support, the 6s fallback timer swaps the embed
 * for an explicit Open / Download card.
 */
export function ManualPDFViewer() {
  const objectRef = useRef<HTMLObjectElement>(null);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const el = objectRef.current;

    let loadFired = false;
    let cancelled = false;

    const handleLoad = () => {
      if (cancelled) return;
      loadFired = true;
      setOverlayVisible(false);
    };

    // Fast-path: hide overlay the moment the iframe reports it loaded.
    // iframe `load` is more reliable than <object> `load` in practice.
    const innerIframe = el?.querySelector("iframe");
    if (innerIframe) innerIframe.addEventListener("load", handleLoad);
    if (el) el.addEventListener("load", handleLoad);

    // Default-path: hide the overlay after a fixed grace period whether
    // or not we ever hear a load event. The PDF plugin has engaged by
    // this point on every supported browser.
    const overlayTimer = window.setTimeout(() => {
      if (cancelled) return;
      setOverlayVisible(false);
    }, OVERLAY_AUTO_HIDE_MS);

    // Fallback: if we still haven't seen a load by FALLBACK_AFTER_MS,
    // the device probably can't render PDFs inline (iOS Safari, some
    // in-app browsers). Swap to explicit Open / Download buttons.
    const fallbackTimer = window.setTimeout(() => {
      if (cancelled || loadFired) return;
      setFallback(true);
    }, FALLBACK_AFTER_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(overlayTimer);
      window.clearTimeout(fallbackTimer);
      if (innerIframe) innerIframe.removeEventListener("load", handleLoad);
      if (el) el.removeEventListener("load", handleLoad);
    };
  }, []);

  if (fallback) {
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

      {overlayVisible && <LoadingOverlay />}
    </div>
  );
}

function LoadingOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[55] flex flex-col items-center justify-center gap-4 bg-flamingo-obsidian transition-opacity duration-300"
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
