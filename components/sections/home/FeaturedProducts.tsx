"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { getHeroProducts } from "@/content/products";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

export function FeaturedProducts() {
  const products = getHeroProducts();

  return (
    <section
      aria-labelledby="featured-heading"
      className="relative py-24 sm:py-32"
    >
      <Container>
        <ScrollReveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Featured Catalog"
              title="The chemistry that built the catalog."
              description="Hero SKUs across our six discipline lines — drawn directly from the F-code catalog that ships to distributors in 15+ countries."
            />
            <Button href="/products" variant="outline" magnetic={false}>
              All Products
              <Arrow />
            </Button>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, index) => (
            <ScrollReveal key={p.id} delay={index * 0.06}>
              <ProductCard product={p} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductCard({
  product,
}: {
  product: ReturnType<typeof getHeroProducts>[number];
}) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <GlassCard className="relative h-full overflow-hidden p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
          style={{ background: product.heroColor }}
        />

        <div className="relative flex h-full flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <span className="display rounded-full bg-flamingo-obsidian/70 px-3 py-1 text-[10px] tracking-ultra text-flamingo-titanium">
              {product.id}
            </span>
            <span className="display text-[10px] uppercase tracking-ultra text-flamingo-pink">
              {product.realCategory}
            </span>
          </div>

          <BottleArt color={product.heroColor} />

          <div className="flex flex-col gap-2">
            <h3 className="display text-2xl font-bold text-flamingo-soft">
              {product.name}
            </h3>
            <p className="text-sm text-flamingo-pink">{product.tagline}</p>
            <p className="line-clamp-3 text-sm text-flamingo-titanium">
              {product.shortBlurb}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-flamingo-titanium/10 pt-4">
            <span className="text-xs text-flamingo-titanium">
              {product.specs.volume}
            </span>
            <span className="display inline-flex items-center gap-2 text-[10px] tracking-ultra text-flamingo-soft transition-colors group-hover:text-flamingo-pink">
              Explore
              <Arrow />
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

function BottleArt({ color }: { color: string }) {
  return (
    <motion.div
      className="relative mx-auto h-56 w-32"
      whileHover={{ scale: 1.04, rotate: -2 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div
        aria-hidden
        className="absolute -inset-8 rounded-full opacity-40 blur-2xl"
        style={{ background: color }}
      />
      <svg viewBox="0 0 120 220" className="relative h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="bottleBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="50%" stopColor="#050505" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          <linearGradient id="bottleHighlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        <rect x="42" y="6" width="36" height="22" rx="4" fill="#2a2a2a" />
        <rect x="46" y="24" width="28" height="10" fill="#1a1a1a" />
        <path
          d="M28 56 Q28 38 60 38 Q92 38 92 56 L92 200 Q92 214 78 214 L42 214 Q28 214 28 200 Z"
          fill="url(#bottleBody)"
          stroke={color}
          strokeWidth="1"
        />
        <rect
          x="28"
          y="80"
          width="64"
          height="80"
          fill={color}
          opacity="0.85"
        />
        <rect x="28" y="80" width="64" height="80" fill="url(#bottleHighlight)" />
        <text
          x="60"
          y="118"
          textAnchor="middle"
          fill="white"
          fontSize="11"
          fontWeight="700"
          fontFamily="var(--font-display)"
        >
          FLAMINGO
        </text>
        <text
          x="60"
          y="138"
          textAnchor="middle"
          fill="white"
          fontSize="8"
          fontFamily="var(--font-display)"
          letterSpacing="2"
        >
          NOTHING BUT
        </text>
        <text
          x="60"
          y="148"
          textAnchor="middle"
          fill="white"
          fontSize="8"
          fontFamily="var(--font-display)"
          letterSpacing="2"
        >
          THE BEST
        </text>
      </svg>
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
