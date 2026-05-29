"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ECOSYSTEM_INTRO, ECOSYSTEM_NODES } from "@/content/about";
import { CATEGORIES, type CategoryId } from "@/content/categories";
import { PRODUCTS } from "@/content/products";
import { getProductImage } from "@/lib/product-images";

export function ProductEcosystem() {
  const [active, setActive] = useState<CategoryId | null>(null);

  return (
    <section
      aria-labelledby="ecosystem-heading"
      className="relative overflow-hidden bg-flamingo-obsidian py-32 sm:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-noise opacity-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-flamingo-cyan/8 blur-[140px]"
      />

      <Container className="relative flex flex-col gap-16">
        <ScrollReveal>
          <div className="flex flex-col gap-6">
            <span className="text-eyebrow flex items-center gap-3 text-flamingo-titanium">
              <span aria-hidden className="h-px w-10 bg-flamingo-pink/60" />
              {ECOSYSTEM_INTRO.eyebrow}
            </span>
            <h2 id="ecosystem-heading" className="text-display max-w-4xl text-flamingo-soft">
              {ECOSYSTEM_INTRO.title}
              <br />
              <span className="text-gradient-pink">{ECOSYSTEM_INTRO.accentTitle}</span>
            </h2>
            <div className="grid max-w-3xl gap-3 text-sm text-flamingo-titanium md:text-base">
              {ECOSYSTEM_INTRO.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <OrbitStage active={active} setActive={setActive} />
        <CategoryDetail active={active} />
      </Container>
    </section>
  );
}

function OrbitStage({
  active,
  setActive,
}: {
  active: CategoryId | null;
  setActive: (id: CategoryId | null) => void;
}) {
  const count = ECOSYSTEM_NODES.length;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-2xl">
      {/* Ambient rotating ring */}
      <motion.div
        animate={{ rotate: active ? 0 : 360 }}
        transition={{ duration: active ? 0.8 : 80, ease: active ? "easeOut" : "linear", repeat: active ? 0 : Infinity }}
        className="absolute inset-0"
      >
        {ECOSYSTEM_NODES.map((node, i) => {
          const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
          const radius = 42; // percent
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          const isActive = active === node.id;
          const category = CATEGORIES.find((c) => c.id === node.id);
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setActive(isActive ? null : node.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 no-tap-highlight"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.15 : 1,
                  opacity: !active || isActive ? 1 : 0.4,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-2"
              >
                <span
                  aria-hidden
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full border bg-flamingo-carbon/80 backdrop-blur"
                  style={{
                    borderColor: category?.accentColor ?? "#E50982",
                    boxShadow: isActive
                      ? `0 0 24px ${category?.accentColor ?? "#E50982"}55`
                      : undefined,
                  }}
                >
                  <NodeGlyph id={node.id} color={category?.accentColor ?? "#E50982"} />
                </span>
                <span
                  className="text-meta whitespace-nowrap rounded-full bg-flamingo-obsidian/60 px-3 py-1"
                  style={{ color: category?.accentColor ?? "#F5F5F5" }}
                >
                  {node.label}
                </span>
              </motion.div>
            </button>
          );
        })}
      </motion.div>

      {/* Center vehicle silhouette */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-16 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(229,9,130,0.20), transparent 70%)",
            }}
          />
          <svg viewBox="0 0 200 80" className="relative h-24 w-48" aria-hidden>
            <defs>
              <linearGradient id="ecoCarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2a2a2a" />
                <stop offset="100%" stopColor="#050505" />
              </linearGradient>
            </defs>
            <path
              d="M10,55 Q25,28 60,22 L130,22 Q160,18 188,40 L195,55 Q190,68 175,68 L25,68 Q12,66 10,55 Z"
              fill="url(#ecoCarGrad)"
              stroke="#E50982"
              strokeWidth="1.2"
            />
            <circle cx="50" cy="68" r="9" fill="#0a0a0a" stroke="#E50982" strokeWidth="1.2" />
            <circle cx="150" cy="68" r="9" fill="#0a0a0a" stroke="#E50982" strokeWidth="1.2" />
          </svg>
          <span className="text-meta mt-3 block text-center text-flamingo-titanium">
            The vehicle
          </span>
        </div>
      </div>
    </div>
  );
}

function NodeGlyph({ id, color }: { id: CategoryId; color: string }) {
  const props = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (id === "exterior")
    return (
      <svg {...props}>
        <path d="M5 17l7-12 7 12z" />
        <path d="M9 17h6" />
      </svg>
    );
  if (id === "interior")
    return (
      <svg {...props}>
        <rect x="5" y="4" width="14" height="14" rx="2" />
        <path d="M5 11h14M12 4v14" />
      </svg>
    );
  if (id === "tires")
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  if (id === "engine")
    return (
      <svg {...props}>
        <rect x="4" y="8" width="16" height="10" rx="1.5" />
        <path d="M8 8V5h8v3M4 12h2M18 12h2" />
      </svg>
    );
  if (id === "ceramic")
    return (
      <svg {...props}>
        <path d="M5 8h14M5 12h14M5 16h14" />
      </svg>
    );
  // professional
  return (
    <svg {...props}>
      <path d="M12 3l3 6 6 1-4.5 4 1 6L12 17l-5.5 3 1-6L3 10l6-1z" />
    </svg>
  );
}

function CategoryDetail({ active }: { active: CategoryId | null }) {
  const node = ECOSYSTEM_NODES.find((n) => n.id === active);
  const category = active ? CATEGORIES.find((c) => c.id === active) : null;
  const sampleProducts = useMemo(() => {
    if (!active) return [];
    return PRODUCTS.filter((p) => p.category === active).slice(0, 4);
  }, [active]);

  return (
    <div className="min-h-[18rem]">
      <AnimatePresence mode="wait">
        {active && node && category ? (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-3xl p-8"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <span
                  className="text-meta"
                  style={{ color: category.accentColor }}
                >
                  {category.shortName} · Ecosystem node
                </span>
                <h3 className="display text-2xl text-flamingo-soft sm:text-3xl">
                  {category.name}
                </h3>
                <p className="max-w-xl text-sm text-flamingo-titanium">{category.description}</p>
              </div>
              <Link
                href={`/products?filter=${category.id}`}
                className="text-meta inline-flex items-center gap-2 rounded-full border border-flamingo-titanium/30 px-4 py-2 text-flamingo-soft transition-colors hover:border-flamingo-pink hover:text-flamingo-pink"
              >
                Explore {category.shortName} →
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {sampleProducts.map((p) => {
                const img = getProductImage(p.slug);
                return (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-flamingo-titanium/10 bg-flamingo-obsidian/60"
                  >
                    {img && (
                      <Image
                        src={img}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-flamingo-obsidian via-flamingo-obsidian/80 to-transparent p-3">
                      <span className="text-meta text-flamingo-titanium">
                        {p.code ?? p.realCategory}
                      </span>
                      <span className="text-sm text-flamingo-soft">{p.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-meta text-center text-flamingo-titanium"
          >
            Tap any orbit node to expand its product family →
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
