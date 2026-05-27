import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS, getProduct, getRelatedProducts } from "@/content/products";
import { getCategory } from "@/content/categories";
import { buildMetadata, SITE } from "@/lib/seo";
import { ProductHero } from "@/components/sections/product-detail/ProductHero";
import { ProductOverview } from "@/components/sections/product-detail/ProductOverview";
import { ProductTechnology } from "@/components/sections/product-detail/ProductTechnology";
import { UsageGuide } from "@/components/sections/product-detail/UsageGuide";
import { ProductSpecs } from "@/components/sections/product-detail/ProductSpecs";
import { RelatedProducts } from "@/components/sections/product-detail/RelatedProducts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return buildMetadata({ title: "Product not found" });
  return buildMetadata({
    title: `${product.name} · ${product.id}`,
    description: product.shortBlurb,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.id,
    category: product.realCategory,
    description: product.longCopy,
    brand: { "@type": "Brand", name: "Flamingo Car Care" },
    image: `${SITE.url}/images/og/default.jpg`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductHero product={product} category={category} />
      <ProductOverview product={product} />
      <ProductTechnology product={product} />
      <UsageGuide product={product} />
      <ProductSpecs product={product} />
      {related.length > 0 && <RelatedProducts products={related} />}
    </>
  );
}
