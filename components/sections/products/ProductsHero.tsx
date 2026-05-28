"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { PRODUCTS } from "@/content/products";
import { CATEGORIES } from "@/content/categories";

export function ProductsHero() {
  return (
    <section
      aria-labelledby="catalog-heading"
      className="relative overflow-hidden pb-12 pt-40 sm:pt-48"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-noise opacity-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-1/3 h-96 w-96 rounded-full bg-flamingo-cyan/12 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-flamingo-violet/20 blur-3xl"
      />

      <Container className="relative">
        <motion.span
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-eyebrow flex items-center gap-3"
        >
          <span aria-hidden className="h-px w-10 bg-flamingo-titanium/60" />
          The Catalog
        </motion.span>

        <motion.h1
          id="catalog-heading"
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-mega mt-6 max-w-5xl text-flamingo-soft"
        >
          Every formula in the lineup.
          <br />
          <span className="text-gradient-pink">Engineered for purpose.</span>
        </motion.h1>

        <motion.p
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="mt-6 max-w-2xl text-base text-flamingo-titanium md:text-lg"
        >
          {PRODUCTS.length} active SKUs across {CATEGORIES.length} discipline
          lines. Every product carries its F-code from the production line —
          the same code your distributor uses to place a wholesale order.
        </motion.p>
      </Container>
    </section>
  );
}
