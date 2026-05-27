import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Product } from "@/content/products";

export function ProductSpecs({ product }: { product: Product }) {
  const rows: [string, string][] = [
    ["Product Code", product.id],
    ["Category", product.realCategory],
    ["Volume", product.specs.volume],
  ];
  if (product.specs.volumePerCarton) {
    rows.push(["Volume per carton", product.specs.volumePerCarton]);
  }

  return (
    <section className="py-24" aria-labelledby="specs">
      <Container>
        <SectionHeading
          eyebrow="Technical Data"
          title="The same data your distributor uses."
        />

        <GlassCard className="mt-12 overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {rows.map(([k, v], i) => (
                <tr
                  key={k}
                  className={i % 2 === 0 ? "bg-flamingo-carbon/30" : ""}
                >
                  <th
                    scope="row"
                    className="px-8 py-5 text-left text-xs uppercase tracking-ultra text-flamingo-titanium"
                  >
                    {k}
                  </th>
                  <td className="px-8 py-5 text-flamingo-soft">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </Container>
    </section>
  );
}
