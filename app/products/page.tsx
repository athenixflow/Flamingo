import type { Metadata } from "next";
import { ProductsHero } from "@/components/sections/products/ProductsHero";
import { ProductCatalog } from "@/components/sections/products/ProductCatalog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "The full Flamingo catalog — tire care, ceramic coatings, paint protection, interior detailing, engine fluids, and OEM/ODM manufacturing.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <ProductCatalog />
    </>
  );
}
