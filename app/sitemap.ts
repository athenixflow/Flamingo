import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/content/products";
import { SITE } from "@/lib/seo";

const STATIC_PATHS = ["", "products", "about", "contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...STATIC_PATHS.map((p) => ({
      url: `${SITE.url}/${p}`.replace(/\/$/, "") || SITE.url,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.8,
    })),
    ...PRODUCTS.map((product) => ({
      url: `${SITE.url}/products/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
