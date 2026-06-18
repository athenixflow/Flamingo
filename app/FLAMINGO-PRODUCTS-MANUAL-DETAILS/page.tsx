import type { Metadata } from "next";
import { ManualHero } from "@/components/sections/manual/ManualHero";
import { AboutFlamingo } from "@/components/sections/manual/AboutFlamingo";
import { ManualCertifications } from "@/components/sections/manual/ManualCertifications";
import { ProductCategories } from "@/components/sections/manual/ProductCategories";
import { ManualFeatured } from "@/components/sections/manual/ManualFeatured";
import { DigitalLibrary } from "@/components/sections/manual/DigitalLibrary";
import { ManualDownload } from "@/components/sections/manual/ManualDownload";
import { ManualDistributorCTA } from "@/components/sections/manual/ManualDistributorCTA";
import { ManualSupport } from "@/components/sections/manual/ManualSupport";
import { ManualFooter } from "@/components/sections/manual/ManualFooter";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Flamingo Products Manual Details",
  description:
    "Explore the complete Flamingo Product Catalogue — company profile, certifications, product categories, featured SKUs, searchable digital library, and the downloadable Product Manual.",
  path: "/FLAMINGO-PRODUCTS-MANUAL-DETAILS",
});

export default function FlamingoProductsManualDetailsPage() {
  return (
    <>
      <ManualHero />
      <AboutFlamingo />
      <ManualCertifications />
      <ProductCategories />
      <ManualFeatured />
      <DigitalLibrary />
      <ManualDownload />
      <ManualDistributorCTA />
      <ManualSupport />
      <ManualFooter />
    </>
  );
}
