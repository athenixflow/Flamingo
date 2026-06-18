"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MANUAL_HERO } from "@/content/manual";

export function ManualHero() {
  return (
    <section
      aria-labelledby="manual-hero"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      <BackgroundLayers />

      <Container className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center pb-28 pt-40 text-center sm:pt-48">
        <motion.span
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-eyebrow mb-8 flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 text-flamingo-titanium"
        >
          <span aria-hidden className="hidden h-px w-10 bg-flamingo-titanium/60 sm:block" />
          <span className="break-words text-center">{MANUAL_HERO.eyebrow}</span>
          <span aria-hidden className="hidden h-px w-10 bg-flamingo-titanium/60 sm:block" />
        </motion.span>

        <motion.h1
          id="manual-hero"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-mega max-w-5xl text-flamingo-soft"
        >
          {MANUAL_HERO.headline}
          <br />
          <span className="text-gradient-pink">{MANUAL_HERO.headlineAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.9 }}
          className="mx-auto mt-8 max-w-2xl text-base text-flamingo-titanium md:text-lg"
        >
          {MANUAL_HERO.subhead}
        </motion.p>

        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={MANUAL_HERO.primaryCta.href}
            download
            className="inline-flex items-center gap-2 rounded-full bg-flamingo-pink px-7 py-3.5 text-sm font-bold uppercase tracking-ultra text-white shadow-glow transition-transform hover:scale-[1.03]"
          >
            <DownloadGlyph className="h-4 w-4" />
            {MANUAL_HERO.primaryCta.label}
          </a>
          {/* Plain <a> instead of Button — Button wraps next/link, which
              triggers a soft client-side navigation. The viewer route
              relies on a full document load for the browser's PDF plugin
              to engage, so this CTA must hard-navigate. */}
          <a
            href={MANUAL_HERO.secondaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-flamingo-titanium/30 px-7 py-3.5 text-sm font-bold uppercase tracking-ultra text-flamingo-soft transition-colors hover:border-flamingo-pink hover:text-flamingo-pink"
          >
            {MANUAL_HERO.secondaryCta.label}
          </a>
          <Button href={MANUAL_HERO.tertiaryCta.href} variant="ghost" magnetic={false}>
            {MANUAL_HERO.tertiaryCta.label}
          </Button>
        </motion.div>
      </Container>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-flamingo-obsidian via-flamingo-obsidian/80 to-transparent" />
    </section>
  );
}

function BackgroundLayers() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-noise opacity-25"
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [0.9, 1.04, 0.9] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-flamingo-pink/12 blur-3xl"
      />
      <BottleSilhouettes />
      <Particles />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 55%, transparent 25%, rgba(5,5,5,0.55) 65%, rgb(5,5,5) 100%)",
        }}
      />
    </>
  );
}

function BottleSilhouettes() {
  const bottles = [
    { x: 12, y: 18, scale: 0.7, delay: 0 },
    { x: 78, y: 22, scale: 0.9, delay: 1.4 },
    { x: 18, y: 70, scale: 0.6, delay: 2.6 },
    { x: 84, y: 68, scale: 0.8, delay: 0.8 },
    { x: 50, y: 12, scale: 0.55, delay: 3.4 },
    { x: 50, y: 80, scale: 0.65, delay: 4.2 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {bottles.map((b, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 60 120"
          fill="none"
          className="absolute"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `${b.scale * 80}px`,
            height: `${b.scale * 160}px`,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.18, 0.32, 0.18] }}
          transition={{ duration: 8 + i, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M22 4 L38 4 L38 18 Q38 22 42 22 L46 22 Q50 22 50 26 L50 110 Q50 116 44 116 L16 116 Q10 116 10 110 L10 26 Q10 22 14 22 L18 22 Q22 22 22 18 Z"
            stroke="rgb(229 9 130 / 0.55)"
            strokeWidth="1"
          />
          <path
            d="M16 60 L44 60"
            stroke="rgb(229 9 130 / 0.35)"
            strokeWidth="0.8"
          />
        </motion.svg>
      ))}
    </div>
  );
}

function Particles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const delay = (i % 5) * 1.4;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.55, 0.2, 0], y: [0, -140] }}
            transition={{ duration: 18, delay, repeat: Infinity, ease: "linear" }}
            className="absolute h-[3px] w-[3px] rounded-full bg-white/80"
            style={{ left: `${left}%`, top: `${top}%` }}
          />
        );
      })}
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
