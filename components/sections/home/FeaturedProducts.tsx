import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { getHeroProducts } from "@/content/products";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ProductArt } from "@/components/ui/ProductArt";

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
              title="The chemistry that"
              accentTitle="built the catalog."
              description="Hero SKUs across our six discipline lines — drawn directly from the F-code catalog that ships to distributors in 15+ countries."
            />
            <Button href="/products" variant="outline" magnetic={false}>
              All Products
              <Arrow />
            </Button>
          </div>
        </ScrollReveal>
      </Container>

      {/* Horizontal scroll-snap carousel — escapes the container for full-bleed scroll feel */}
      <div className="relative mt-14">
        <div className="mask-fade pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-flamingo-obsidian to-transparent sm:w-24" />
        <div className="mask-fade pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-flamingo-obsidian to-transparent sm:w-24" />

        <ul
          className="no-scrollbar no-swipe-back flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1rem,4vw)] pb-6 sm:gap-7 sm:px-[max(3rem,8vw)]"
          role="list"
          aria-label="Featured products carousel"
        >
          {products.map((p) => (
            <li
              key={p.id}
              className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[28vw] xl:w-[24rem]"
            >
              <ProductCard product={p} />
            </li>
          ))}
          {/* End spacer so the last card snaps near center */}
          <li
            aria-hidden
            className="w-[max(2rem,8vw)] shrink-0 snap-end"
          />
        </ul>

        <Container className="mt-4 text-meta text-flamingo-titanium">
          ← Drag or swipe to explore
        </Container>
      </div>
    </section>
  );
}

function ProductCard({
  product,
}: {
  product: ReturnType<typeof getHeroProducts>[number];
}) {
  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
      <GlassCard className="relative h-full overflow-hidden p-8 transition-transform duration-500 group-hover:-translate-y-1">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
          style={{ background: product.heroColor }}
        />

        <div className="relative flex h-full flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
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
            className="aspect-square w-full"
          />

          <div className="flex flex-col gap-2">
            <h3 className="display text-2xl font-bold text-flamingo-soft">
              {product.name}
            </h3>
            <p className="text-sm text-flamingo-cyan">{product.tagline}</p>
            <p className="line-clamp-3 text-sm text-flamingo-titanium">
              {product.shortBlurb}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-flamingo-titanium/10 pt-4">
            <span className="text-meta text-flamingo-titanium">
              {product.specs.volume || product.realCategory}
            </span>
            <span className="text-meta inline-flex items-center gap-2 text-flamingo-soft transition-colors group-hover:text-flamingo-pink">
              Explore
              <Arrow />
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
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
