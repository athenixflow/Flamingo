"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  MANUAL_CATEGORIES,
  MANUAL_PRODUCTS,
  type ManualCategory,
  type ManualCategoryId,
  type ManualEntry,
} from "@/content/manual";

export function DigitalLibrary() {
  const [query, setQuery] = useState("");
  const normalised = query.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!normalised) return null;
    const set = new Set<string>();
    for (const p of MANUAL_PRODUCTS) {
      const haystack = [
        p.name.toLowerCase(),
        ...p.codes.map((c) => c.toLowerCase()),
        p.categoryId,
        p.description.toLowerCase(),
      ].join(" | ");
      if (haystack.includes(normalised)) set.add(p.code);
    }
    return set;
  }, [normalised]);

  return (
    <section
      aria-labelledby="manual-library"
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
          Digital Library
        </motion.span>

        <motion.h2
          id="manual-library"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-display mt-6 max-w-4xl text-flamingo-soft"
        >
          EXPLORE THE FULL <span className="text-gradient-pink">RANGE.</span>
        </motion.h2>

        <p className="mt-4 max-w-2xl text-base text-flamingo-titanium md:text-lg">
          Every product from the manual — tap a card to reveal specifications, usage instructions, and cautions.
        </p>

        <div className="mt-10">
          <label className="block">
            <span className="sr-only">Search products</span>
            <div className="flex items-center gap-3 rounded-full border border-flamingo-titanium/20 bg-flamingo-obsidian/60 px-5 py-3 transition-colors focus-within:border-flamingo-pink/60">
              <SearchGlyph className="h-4 w-4 text-flamingo-titanium" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, F-code, or category (e.g. tire, F010, brake)"
                className="flex-1 bg-transparent text-sm text-flamingo-soft outline-none placeholder:text-flamingo-titanium/60"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-meta text-flamingo-titanium hover:text-flamingo-pink"
                >
                  Clear
                </button>
              )}
            </div>
          </label>

          {matches && (
            <p className="text-meta mt-3 text-flamingo-titanium">
              {matches.size} of {MANUAL_PRODUCTS.length} products
            </p>
          )}
        </div>

        <div className="mt-12 flex flex-col gap-16">
          {MANUAL_CATEGORIES.map((cat) => (
            <CategoryGroup
              key={cat.id}
              category={cat}
              filterCodes={matches ?? null}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CategoryGroup({
  category,
  filterCodes,
}: {
  category: ManualCategory;
  filterCodes: Set<string> | null;
}) {
  const entries = MANUAL_PRODUCTS.filter(
    (p) =>
      p.categoryId === category.id &&
      (filterCodes === null || filterCodes.has(p.code)),
  );

  if (entries.length === 0) return null;

  return (
    <div id={`library-${category.id}`} className="scroll-mt-28">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h3 className="display text-2xl text-flamingo-soft sm:text-3xl">
          {category.name}
        </h3>
        <span className="text-meta text-flamingo-titanium">
          {entries.length} {entries.length === 1 ? "product" : "products"}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {entries.map((entry) => (
          <EntryAccordion key={entry.code} entry={entry} />
        ))}
      </div>
    </div>
  );
}

function EntryAccordion({ entry }: { entry: ManualEntry }) {
  const [open, setOpen] = useState(false);

  return (
    <GlassCard className="overflow-hidden p-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-flamingo-pink/5 sm:px-6 sm:py-5"
      >
        <div className="flex flex-1 items-center gap-4">
          <span className="text-meta rounded-full bg-flamingo-obsidian/70 px-3 py-1 text-flamingo-titanium shrink-0">
            {entry.code}
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="display text-sm font-bold text-flamingo-soft sm:text-base">
              {entry.name}
            </span>
            <span className="text-meta text-flamingo-titanium">
              {entry.specification}
            </span>
          </div>
        </div>
        <span
          aria-hidden
          className={`text-flamingo-pink transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <ChevronGlyph className="h-5 w-5" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-flamingo-titanium/10 px-5 pb-6 pt-5 sm:px-6">
              <Field label="Description">
                <p className="text-sm leading-relaxed text-flamingo-titanium">
                  {entry.description}
                </p>
              </Field>

              {entry.directions.length > 0 && (
                <Field label="Usage Directions">
                  <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-flamingo-titanium">
                    {entry.directions.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </Field>
              )}

              {entry.cautions.length > 0 && (
                <Field label="Cautions">
                  <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-red-200/80">
                    {entry.cautions.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </Field>
              )}

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <FactTile label="Shelf life" value={entry.shelfLife} />
                <FactTile label="Specification" value={entry.specification} />
                <FactTile
                  label="Volume / Carton"
                  value={entry.volumePerCarton ?? "—"}
                />
                <FactTile
                  label="Codes"
                  value={entry.codes.join(", ")}
                />
              </div>

              {entry.productSlug && (
                <a
                  href={`/products/${entry.productSlug}`}
                  className="text-meta mt-6 inline-flex items-center gap-2 text-flamingo-pink hover:underline"
                >
                  See full catalogue listing →
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 first:mt-0">
      <h4 className="text-meta mb-2 text-flamingo-pink">{label}</h4>
      {children}
    </div>
  );
}

function FactTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-flamingo-titanium/15 bg-flamingo-obsidian/40 p-3">
      <div className="text-meta text-flamingo-titanium">{label}</div>
      <div className="mt-1 text-sm text-flamingo-soft">{value}</div>
    </div>
  );
}

function SearchGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ChevronGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
