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

          <ProductArt
            productId={product.id}
            productName={product.name}
            heroColor={product.heroColor}
            className="aspect-square w-full"
          />

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
