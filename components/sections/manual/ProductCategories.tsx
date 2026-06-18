"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { MANUAL_CATEGORIES, type ManualCategory } from "@/content/manual";

const ICONS: Record<string, string> = {
  "engine-care": "⚙",
  "fuel-system-care": "⛽",
  "brake-system-care": "🛑",
  "interior-care": "🪟",
  "exterior-care": "✦",
  "tire-wheel-care": "◯",
  "air-conditioning-care": "❄",
  "car-wash-solutions": "💧",
  "air-fresheners": "✿",
  accessories: "✚",
};

export function ProductCategories() {
  return (
    <section
      id="categories"
      aria-labelledby="manual-categories"
      className="relative py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-flamingo-violet/10 blur-3xl"
      />
      <Container className="relative">
        <motion.span
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
          className="text-eyebrow flex items-center gap-3 text-flamingo-titanium"
        >
          <span aria-hidden className="h-px w-10 bg-flamingo-titanium/60" />
          Product Catalogue
        </motion.span>

        <motion.h2
          id="manual-categories"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-display mt-6 max-w-3xl text-flamingo-soft"
        >
          EXPLORE THE <span className="text-gradient-pink">FULL RANGE.</span>
        </motion.h2>

        <p className="mt-4 max-w-2xl text-base text-flamingo-titanium md:text-lg">
          Ten engineering disciplines, one catalogue. Tap a category to jump to its products in the digital library below.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MANUAL_CATEGORIES.map((cat, i) => (
            <CategoryTile key={cat.id} category={cat} delay={0.05 + i * 0.05} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CategoryTile({ category, delay }: { category: ManualCategory; delay: number }) {
  return (
    <motion.a
      href={`#library-${category.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="block group"
    >
      <GlassCard className="relative h-full overflow-hidden p-6 transition-all duration-500 group-hover:border-flamingo-pink/40">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-flamingo-pink/12 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="flex items-start gap-4">
          <span
            aria-hidden
            className="display flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-flamingo-pink/10 text-xl text-flamingo-pink transition-transform duration-500 group-hover:scale-110"
          >
            {ICONS[category.id] ?? "◆"}
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="display text-base font-bold uppercase tracking-ultra text-flamingo-soft transition-colors group-hover:text-flamingo-pink">
              {category.name}
            </h3>
            <p className="text-xs text-flamingo-titanium">
              {category.tagline}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-meta text-flamingo-titanium transition-colors group-hover:text-flamingo-soft">
          Browse
          <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </GlassCard>
    </motion.a>
  );
}
