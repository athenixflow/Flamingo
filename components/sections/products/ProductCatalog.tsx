"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { PRODUCTS } from "@/content/products";
import { CATEGORIES, type CategoryId } from "@/content/categories";
import { ProductArt } from "@/components/ui/ProductArt";
import { cn } from "@/lib/utils/cn";

type Filter = CategoryId | "all";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...CATEGORIES.map((c) => ({ id: c.id as Filter, label: c.shortName })),
];

export function ProductCatalog() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    if (filter === "all") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === filter);
  }, [filter]);

  // Group visible products by category for H2 semantic structure when "all".
  const groups =
    filter === "all"
      ? CATEGORIES.map((cat) => ({
          category: cat,
          products: visible.filter((p) => p.category === cat.id),
        })).filter((g) => g.products.length > 0)
      : [
          {
            category: CATEGORIES.find((c) => c.id === filter)!,
            products: visible,
          },
        ];

  return (
    <section className="pb-32" aria-labelledby="catalog">
      <Container>
        <div id="catalog" className="sticky top-24 z-20 -mx-3 mb-10 flex justify-center">
          <div className="glass-strong inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full px-2 py-2">
            <LayoutGroup>
              {FILTERS.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    className={cn(
                      "text-meta relative shrink-0 rounded-full px-4 py-2 transition-colors no-tap-highlight",
                      active
                        ? "text-white"
                        : "text-flamingo-titanium hover:text-flamingo-soft",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-flamingo-pink"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative">{f.label}</span>
                  </button>
                );
              })}
            </LayoutGroup>
          </div>
        </div>

        <div className="flex flex-col gap-16">
          {groups.map((group) => (
            <div key={group.category.id}>
              <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-eyebrow text-flamingo-titanium">
                    {group.category.realCategories.join(" · ")}
                  </span>
                  <h2 className="display text-3xl text-flamingo-soft sm:text-4xl">
                    {group.category.name}
                  </h2>
                </div>
                <span className="text-meta text-flamingo-titanium">
                  {group.products.length}{" "}
                  {group.products.length === 1 ? "SKU" : "SKUs"}
                </span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {group.products.map((p) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <CatalogCard product={p} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="rounded-3xl border border-flamingo-titanium/10 p-12 text-center text-flamingo-titanium">
            No products in this category yet.
          </div>
        )}
      </Container>
    </section>
  );
}

function CatalogCard({
  product,
}: {
  product: (typeof PRODUCTS)[number];
}) {
  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
      <GlassCard className="h-full overflow-hidden p-6">
        <div className="flex h-full flex-col gap-5">
          <div className="flex items-center justify-between">
            {product.code ? (
              <span className="text-meta rounded-full bg-flamingo-obsidian/70 px-3 py-1 text-flamingo-titanium">
                {product.code}
              </span>
            ) : (
              <span aria-hidden />
            )}
            <span className="text-meta text-flamingo-titanium">
              {product.realCategory}
            </span>
          </div>

          <ProductArt
            productSlug={product.slug}
            productName={product.name}
            heroColor={product.heroColor}
            className="aspect-[4/3] w-full"
          />

          <div className="flex flex-col gap-1">
            <h3 className="display text-xl font-bold text-flamingo-soft transition-colors group-hover:text-flamingo-pink">
              {product.name}
            </h3>
            <p className="text-sm text-flamingo-cyan">{product.tagline}</p>
          </div>

          <p className="line-clamp-3 text-sm text-flamingo-titanium">
            {product.shortBlurb}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-flamingo-titanium/10 pt-3">
            <span className="text-meta text-flamingo-titanium">
              {product.specs.volume || product.realCategory}
            </span>
            <span className="text-meta inline-flex items-center gap-1 text-flamingo-soft transition-colors group-hover:text-flamingo-pink">
              View detail →
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
