import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechViz } from "@/components/tech/TechViz";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Product } from "@/content/products";

function pickViz(product: Product) {
  if (product.category === "ceramic")
    return { type: "layered" as const, accent: "#8A2EFF", label: "SiO₂ Layered Bond" };
  if (product.category === "tires")
    return { type: "hydrophobic" as const, accent: "#00CFFF", label: "Hydrophobic Polymer" };
  if (product.category === "exterior")
    return { type: "hydrophobic" as const, accent: "#E50982", label: "Polymer Beading" };
  if (product.category === "engine")
    return { type: "layered" as const, accent: "#B8B8B8", label: "Multi-Phase Chemistry" };
  return { type: "molecular" as const, accent: "#E50982", label: "Nano Particle Carrier" };
}

export function ProductTechnology({ product }: { product: Product }) {
  const viz = pickViz(product);

  return (
    <section className="py-24" aria-labelledby="tech">
      <Container>
        <SectionHeading
          eyebrow="Technology"
          title="The chemistry that makes it work."
          accent
        />

        <GlassCard className="mt-12 overflow-hidden">
          <div className="grid items-stretch lg:grid-cols-2">
            <div className="aspect-[16/10] lg:aspect-auto">
              <TechViz type={viz.type} accent={viz.accent} />
            </div>
            <div className="flex flex-col gap-4 p-10">
              <span
                className="display text-[10px] tracking-ultra"
                style={{ color: viz.accent }}
              >
                {viz.label}
              </span>
              <h3 className="display text-3xl text-flamingo-soft">
                Built for the failure mode this product solves.
              </h3>
              <p className="text-sm text-flamingo-titanium md:text-base">
                Every formula in the Flamingo catalog starts with a measurable
                way the prior surface fails — and the chemistry is engineered
                back from there. {product.name} addresses {product.realCategory.toLowerCase()} demands with the same engineering discipline applied across the entire catalog.
              </p>
            </div>
          </div>
        </GlassCard>
      </Container>
    </section>
  );
}
