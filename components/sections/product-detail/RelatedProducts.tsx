import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Product } from "@/content/products";

export function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <section className="py-24" aria-labelledby="related">
      <Container>
        <SectionHeading
          eyebrow="Pairs With"
          title="Use it with these."
          description="Products that share a workflow, a chemistry family, or a customer profile."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="group block"
            >
              <GlassCard className="h-full overflow-hidden p-6">
                <div className="flex items-center justify-between">
                  <span className="text-meta rounded-full bg-flamingo-obsidian/70 px-3 py-1 text-flamingo-titanium">
                    {p.id}
                  </span>
                  <span className="text-meta text-flamingo-titanium">
                    {p.realCategory}
                  </span>
                </div>
                <h3 className="mt-6 display text-xl text-flamingo-soft transition-colors group-hover:text-flamingo-pink">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-flamingo-cyan">{p.tagline}</p>
                <p className="mt-4 line-clamp-2 text-sm text-flamingo-titanium">
                  {p.shortBlurb}
                </p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
