"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { ClientErrorBoundary } from "@/components/motion/ClientErrorBoundary";

const HypercarScene = dynamic(
  () => import("@/components/three/HypercarScene").then((m) => m.HypercarScene),
  { ssr: false, loading: () => <HeroFallback /> },
);

function HeroFallback() {
  return (
    <div className="absolute inset-0 grid-noise opacity-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-radial from-flamingo-pink/20 via-transparent to-transparent"
      />
    </div>
  );
}

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      <div className="absolute inset-0">
        {reduced ? (
          <HeroFallback />
        ) : (
          <ClientErrorBoundary name="HypercarScene" fallback={<HeroFallback />}>
            <HypercarScene />
          </ClientErrorBoundary>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-b from-flamingo-obsidian/30 via-transparent to-flamingo-obsidian" />
      <div className="absolute inset-0 bg-gradient-to-r from-flamingo-obsidian/85 via-flamingo-obsidian/30 to-transparent" />

      <Container className="relative flex h-full flex-col justify-end pb-20 sm:pb-28">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="display mb-5 flex items-center gap-3 text-[10px] tracking-ultra text-flamingo-pink"
        >
          <span aria-hidden className="h-px w-10 bg-flamingo-pink" />
          Engineered in USA · Nothing But The Best
        </motion.div>

        <motion.h1
          id="hero-heading"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="display max-w-4xl text-5xl font-bold leading-[0.92] text-flamingo-soft sm:text-6xl md:text-7xl lg:text-[8rem]"
        >
          Protect
          <br />
          <span className="text-gradient-pink">The Machine.</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-base text-flamingo-titanium md:text-lg"
        >
          Engineered automotive care for perfectionists. Nano ceramic coatings,
          polymer tire technology, and premium detailing systems trusted by
          distributors in 15+ countries.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="/products" size="lg">
            Explore Products
            <Arrow />
          </Button>
          <Button href="/media" size="lg" variant="ghost">
            Watch the Experience
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 right-6 hidden items-center gap-3 sm:flex"
        >
          <span className="display text-[10px] tracking-ultra text-flamingo-titanium">
            Scroll to transform
          </span>
          <span aria-hidden className="relative inline-flex h-10 w-px overflow-hidden bg-flamingo-titanium/30">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-pulse bg-flamingo-pink" />
          </span>
        </motion.div>
      </Container>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
