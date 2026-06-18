"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProductArt } from "@/components/ui/ProductArt";
import {
  FEATURED_MANUAL_CODES,
  getManualEntry,
  type ManualEntry,
} from "@/content/manual";
import { getProduct } from "@/content/products";

export function ManualFeatured() {
  const featured = FEATURED_MANUAL_CODES.map((code) => getManualEntry(code)).filter(
    (e): e is ManualEntry => Boolean(e),
  );

  return (
    <section
      aria-labelledby="manual-featured"
      className="relative py-24 sm:py-32"
    >
      <Container>
        <motion.span
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
          className="text-eyebrow flex items-center gap-3 text-flamingo-titanium"
        >
          <span aria-hidden className="h-px w-10 bg-flamingo-titanium/60" />
          Featured Catalogue
        </motion.span>

        <motion.h2
          id="manual-featured"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-display mt-6 max-w-3xl text-flamingo-soft"
        >
          POPULAR <span className="text-gradient-pink">PRODUCTS.</span>
        </motion.h2>

        <p className="mt-4 max-w-2xl text-base text-flamingo-titanium md:text-lg">
          The most-requested SKUs from the catalogue — drawn directly from the product manual.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((entry, i) => (
            <FeaturedCard key={entry.code} entry={entry} delay={0.05 + i * 0.06} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FeaturedCard({ entry, delay }: { entry: ManualEntry; delay: number }) {
  const linked = entry.productSlug ? getProduct(entry.productSlug) : undefined;
  const slug = linked?.slug ?? entry.productSlug;
  const heroColor = linked?.heroColor ?? "#E50982";

  const inner = (
    <GlassCard className="group relative flex h-full flex-col overflow-hidden p-6 transition-transform duration-500 group-hover:-translate-y-1">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: heroColor }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <span className="text-meta rounded-full bg-flamingo-obsidian/70 px-3 py-1 text-flamingo-titanium">
          {entry.code}
        </span>
        <span className="text-meta text-flamingo-titanium text-right">
          Manual
        </span>
      </div>

      {slug ? (
        <ProductArt
          productSlug={slug}
          productName={entry.name}
          heroColor={heroColor}
          className="relative mt-5 aspect-square w-full"
        />
      ) : (
        <div className="relative mt-5 flex aspect-square w-full items-center justify-center rounded-2xl bg-flamingo-pink/8 text-meta text-flamingo-titanium">
          {entry.name}
        </div>
      )}

      <div className="relative mt-5 flex flex-col gap-1">
        <h3 className="display text-base font-bold text-flamingo-soft">{entry.name}</h3>
        <p className="text-xs text-flamingo-cyan">{entry.specification}</p>
        <p className="mt-2 line-clamp-3 text-xs text-flamingo-titanium">
          {entry.description}
        </p>
      </div>

      <div className="relative mt-auto flex items-center justify-between border-t border-flamingo-titanium/10 pt-4">
        <span className="text-meta text-flamingo-titanium">
          {entry.shelfLife}
        </span>
        <span className="text-meta inline-flex items-center gap-2 text-flamingo-soft transition-colors group-hover:text-flamingo-pink">
          {linked ? "View Details" : "Read Manual"}
          <Arrow />
        </span>
      </div>
    </GlassCard>
  );

  if (linked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link href={`/products/${linked.slug}`} className="group block h-full">
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group block h-full"
    >
      {inner}
    </motion.div>
  );
}

function Arrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
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
