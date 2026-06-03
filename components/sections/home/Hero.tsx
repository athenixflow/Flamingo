"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

function HeroFallback() {
  return (
    <div className="absolute inset-0 grid-noise opacity-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-radial from-flamingo-titanium/10 via-transparent to-transparent"
      />
    </div>
  );
}

function HeroVideo({ preload }: { preload: "auto" | "metadata" }) {
  return (
    <video
      className="h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload={preload}
      poster="/images/products/9h-nano-ceramic-coating.jpg"
      aria-hidden
      style={{ filter: "brightness(0.55) contrast(1.08) saturate(1.05)" }}
    >
      <source src="/videos/hero-amg-gle.mp4" type="video/mp4" />
    </video>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Video stage — radial mask fades the footage into the obsidian site bg at every edge */}
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 78% 70% at 50% 50%, #000 45%, rgba(0,0,0,0.55) 75%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 78% 70% at 50% 50%, #000 45%, rgba(0,0,0,0.55) 75%, transparent 100%)",
        }}
      >
        {reduced ? <HeroFallback /> : <HeroVideo preload={isMobile ? "metadata" : "auto"} />}
      </div>

      {/* Inward vignette — soft center contrast lift + hard edge fade to obsidian */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at 50% 50%, rgba(5,5,5,0.25) 0%, rgba(5,5,5,0.55) 55%, rgba(5,5,5,0.9) 80%, rgb(5,5,5) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-flamingo-obsidian via-flamingo-obsidian/80 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-flamingo-obsidian via-flamingo-obsidian/85 to-transparent"
      />

      <Container className="relative flex min-h-[100svh] flex-col items-center justify-center pb-32 pt-44 text-center sm:pb-36 sm:pt-52">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-eyebrow mb-6 flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2"
        >
          <span aria-hidden className="hidden h-px w-10 bg-flamingo-titanium/60 sm:block" />
          <span className="text-center">Engineered in Nigeria · Nothing But The Best</span>
          <span aria-hidden className="hidden h-px w-10 bg-flamingo-titanium/60 sm:block" />
        </motion.div>

        <motion.h1
          id="hero-heading"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-mega mx-auto max-w-5xl text-flamingo-soft"
        >
          Protect
          <br />
          <span className="text-gradient-pink">The Machine.</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-7 max-w-xl text-base text-flamingo-titanium md:text-lg"
        >
          Engineered automotive care for perfectionists. Nano ceramic coatings,
          polymer tire technology, and premium detailing systems trusted by
          distributors in 15+ countries.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/products" size="lg">
            Explore Products
            <Arrow />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 right-6 hidden items-center gap-3 sm:flex"
        >
          <span className="text-meta text-flamingo-titanium">
            Scroll to transform
          </span>
          <span aria-hidden className="relative inline-flex h-10 w-px overflow-hidden bg-flamingo-titanium/30">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-pulse bg-flamingo-titanium" />
          </span>
        </motion.div>
      </Container>

      {/* Marquee ticker — signature cinematic motion at the foot of the hero */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t border-flamingo-titanium/10 bg-flamingo-obsidian/40 py-3 backdrop-blur">
        <div className="flex animate-marquee whitespace-nowrap">
          <TickerStrip />
          <TickerStrip />
        </div>
      </div>
    </section>
  );
}

function TickerStrip() {
  const items = [
    "Engineered in Nigeria",
    "Nothing But The Best",
    "Protect The Machine",
    "Nano Ceramic · 9H",
    "Polymer Tire Tech",
    "OEM / ODM Manufacturing",
    "15+ Countries",
  ];
  return (
    <ul className="flex shrink-0 items-center gap-12 px-6 text-meta text-flamingo-titanium">
      {items.map((it) => (
        <li key={it} className="flex items-center gap-12">
          <span>{it}</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-flamingo-titanium/40" />
        </li>
      ))}
    </ul>
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
