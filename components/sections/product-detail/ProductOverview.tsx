import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Product } from "@/content/products";

export function ProductOverview({ product }: { product: Product }) {
  return (
    <section className="py-24" aria-labelledby="overview">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Overview"
              title="The engineering, in plain language."
            />
            <p className="text-base leading-relaxed text-flamingo-titanium md:text-lg">
              {product.longCopy}
            </p>
          </div>

          <GlassCard className="h-fit p-8">
            <h3 className="display text-[10px] tracking-ultra text-flamingo-pink">
              Key features
            </h3>
            <ul className="mt-5 flex flex-col gap-4">
              {product.features.map((f, i) => (
                <li key={f} className="flex items-start gap-3 text-sm text-flamingo-soft">
                  <span className="display mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-flamingo-pink/15 text-[10px] text-flamingo-pink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </Container>
    </section>
  );
}
