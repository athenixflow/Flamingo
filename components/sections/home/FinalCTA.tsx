"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function FinalCTA() {
  return (
    <section
      aria-labelledby="final-heading"
      className="relative overflow-hidden py-32 sm:py-48"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(229,9,130,0.25), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-noise opacity-20"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-flamingo-pink/30 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative text-center">
        <ScrollReveal>
          <span className="text-eyebrow inline-flex items-center gap-3">
            <span className="h-px w-10 bg-flamingo-titanium/60" />
            Built for Obsession
            <span className="h-px w-10 bg-flamingo-titanium/60" />
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 id="final-heading" className="text-mega mt-6 text-flamingo-soft">
            Built for
            <br />
            <span className="text-gradient-pink">Obsession.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-base text-flamingo-titanium md:text-lg">
            The catalog that distributors stock. The chemistry that detailing
            studios trust. The brand that shows up on the surfaces you love
            most.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Button href="/products" size="lg">
              Explore Products
              <Arrow />
            </Button>
            <Button href="/contact" size="lg" variant="ghost">
              Contact Flamingo
            </Button>
          </div>
        </ScrollReveal>
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
