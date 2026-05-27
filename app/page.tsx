import { Hero } from "@/components/sections/home/Hero";
import { Transformation } from "@/components/sections/home/Transformation";
import { FeaturedProducts } from "@/components/sections/home/FeaturedProducts";
import { TechShowcase } from "@/components/sections/home/TechShowcase";
import { DetailingCinematics } from "@/components/sections/home/DetailingCinematics";
import { GlobalPresence } from "@/components/sections/home/GlobalPresence";
import { SocialProof } from "@/components/sections/home/SocialProof";
import { FinalCTA } from "@/components/sections/home/FinalCTA";
import { LoaderOverlay } from "@/components/sections/home/LoaderOverlay";
import { SITE } from "@/lib/seo";
import { getBrandLogo } from "@/lib/brand-assets";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Flamingo Car Care",
  legalName: "Flamingo Car Care Tech Co., Ltd.",
  url: SITE.url,
  slogan: "Protect The Machine.",
  description:
    "Engineered automotive care for perfectionists. Nano ceramic coatings, polymer tire technology, and premium detailing systems.",
  sameAs: [],
};

export default function HomePage() {
  const logoSrc = getBrandLogo();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <LoaderOverlay logoSrc={logoSrc} />
      <Hero />
      <Transformation />
      <FeaturedProducts />
      <TechShowcase />
      <DetailingCinematics />
      <GlobalPresence />
      <SocialProof />
      <FinalCTA />
    </>
  );
}
