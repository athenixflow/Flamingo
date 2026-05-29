import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { LegacyTimeline } from "@/components/sections/about/LegacyTimeline";
import { Manufacturing } from "@/components/sections/about/Manufacturing";
import { ResearchDevelopment } from "@/components/sections/about/ResearchDevelopment";
import { EngineeringPhilosophy } from "@/components/sections/about/EngineeringPhilosophy";
import { ProductEcosystem } from "@/components/sections/about/ProductEcosystem";
import { GlobalReach } from "@/components/sections/about/GlobalReach";
import { Certifications } from "@/components/sections/about/Certifications";
import { WhyWeExist } from "@/components/sections/about/WhyWeExist";
import { BrandManifesto } from "@/components/sections/about/BrandManifesto";
import { buildMetadata } from "@/lib/seo";
import { getBrandLogo } from "@/lib/brand-assets";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Flamingo Car Care Tech Co., Ltd. — decades of automotive chemistry, 30,000 m² of manufacturing, and a 47-SKU catalog engineered to preserve perfection.",
  path: "/about",
});

export default function AboutPage() {
  const logoSrc = getBrandLogo();
  return (
    <>
      <AboutHero />
      <LegacyTimeline />
      <Manufacturing />
      <ResearchDevelopment />
      <EngineeringPhilosophy />
      <ProductEcosystem />
      <GlobalReach />
      <Certifications />
      <WhyWeExist />
      <BrandManifesto logoSrc={logoSrc} />
    </>
  );
}
