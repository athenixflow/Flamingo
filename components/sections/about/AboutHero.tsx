"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { ClientErrorBoundary } from "@/components/motion/ClientErrorBoundary";
import { ABOUT_HERO } from "@/content/about";

const HypercarScene = dynamic(
  () => import("@/components/three/HypercarScene").then((m) => m.HypercarScene),
  { ssr: false, loading: () => <HeroFallback /> },
);

function HeroFallback() {
  return (
    <div className="absolute inset-0 grid-noise opacity-30">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-radial from-flamingo-pink/10 via-transparent to-transparent"
      />
    </div>
  );
}

function Particles({ count = 14 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const delay = (i % 5) * 1.4;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.55, 0.2, 0],
              y: [0, -120],
            }}
            transition={{
              duration: 18,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-[3px] w-[3px] rounded-full bg-white/80"
            style={{ left: `${left}%`, top: `${top}%` }}
          />
        );
      })}
    </div>
  );
}

export function AboutHero() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="about-hero"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      <div className="absolute inset-0">
        {reduced ? (
          <HeroFallback />
        ) : (
          <ClientErrorBoundary name="AboutHypercar" fallback={<HeroFallback />}>
            <HypercarScene />
          </ClientErrorBoundary>
        )}
      </div>

      {!reduced && <Particles />}

      {/* Cinematic vignette layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 55%, transparent 30%, rgba(5,5,5,0.55) 65%, rgb(5,5,5) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-flamingo-obsidian via-flamingo-obsidian/80 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-flamingo-obsidian via-flamingo-obsidian/80 to-transparent"
      />

      <Container className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center pb-28 pt-40 text-center sm:pt-48">
        <motion.span
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-eyebrow mb-8 flex items-center justify-center gap-3 text-flamingo-titanium"
        >
          <span aria-hidden className="h-px w-10 bg-flamingo-titanium/60" />
          {ABOUT_HERO.eyebrow}
          <span aria-hidden className="h-px w-10 bg-flamingo-titanium/60" />
        </motion.span>

        <motion.h1
          id="about-hero"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-mega max-w-5xl text-flamingo-soft"
        >
          {ABOUT_HERO.headline[0]}
          <br />
          {ABOUT_HERO.headline[1]}
          <br />
          <span className="text-gradient-pink">{ABOUT_HERO.headline[2]}</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.85, duration: 1 }}
          className="mx-auto mt-8 max-w-2xl text-base text-flamingo-titanium md:text-lg"
        >
          {ABOUT_HERO.subline}
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.9 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href={ABOUT_HERO.primaryCta.href} size="lg">
            {ABOUT_HERO.primaryCta.label}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 items-center gap-3 sm:flex"
        >
          <span className="text-meta text-flamingo-titanium">
            {ABOUT_HERO.scrollIndicator}
          </span>
          <span aria-hidden className="relative inline-flex h-10 w-px overflow-hidden bg-flamingo-titanium/30">
            <motion.span
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-0 top-0 h-1/2 bg-flamingo-pink"
            />
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
