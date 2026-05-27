export interface Stat {
  value: string;
  label: string;
  hint?: string;
}

export interface Pillar {
  title: string;
  body: string;
}

export const ABOUT_HERO = {
  eyebrow: "About Flamingo",
  headline: "Engineered for the perfectionists who refuse to compromise.",
  subline:
    "Flamingo Car Care Tech Co., Ltd. is a global automotive care manufacturer. Engineered in USA chemistry. Manufactured at scale. Trusted by distributors and OEM partners across six regions.",
};

export const PHILOSOPHY: Pillar[] = [
  {
    title: "Obsession is engineering",
    body: "Every Flamingo product begins with a measurable failure mode in the field — a tire that cracked too soon, a trim that chalked under UV, a paint that lost gloss after a season. We engineer back from the failure, not forward from a marketing brief.",
  },
  {
    title: "Protection is the product",
    body: "A car looks new because it's been protected. A clean car without protection is a car halfway to dirty. Every product in the catalog — wax, sealant, coating, tire shine, trim restorer — exists to extend the time between detail sessions.",
  },
  {
    title: "Surfaces deserve chemistry",
    body: "Different surfaces fail differently. Paint chalks, plastic oxidizes, rubber cracks, leather dries. Generic 'all-purpose' chemistry treats none of them well. Flamingo's catalog mirrors the chemistry diversity of the surfaces it protects.",
  },
];

export const MISSION = {
  title: "Our mission",
  body: "To produce the most engineered, longest-lasting, most premium automotive care chemistry on the global market — and to make it accessible through partners we trust on every continent.",
};

export const MANUFACTURING: Pillar[] = [
  {
    title: "Vertical integration",
    body: "Raw chemistry, formulation, blending, filling, labeling, packaging — every stage happens under one roof. Quality control is continuous, not sampled at the loading dock.",
  },
  {
    title: "OEM/ODM capability",
    body: "Over 60 global automotive brands have their private-label chemistry produced in our facility. We bring the same QC discipline to every contract — whether it's our label or yours.",
  },
  {
    title: "Stability testing",
    body: "Every formula passes accelerated-aging, thermal-cycle, and field-exposure stability protocols before it ships. The product on a distributor's shelf two years from now performs like the product that shipped fresh.",
  },
];

export const QUALITY: Pillar[] = [
  {
    title: "ISO-aligned process",
    body: "Manufacturing aligned to ISO 9001 quality management principles. Documentation, traceability, and continuous improvement built into every production run.",
  },
  {
    title: "Regulatory compliance",
    body: "REACH (EU), GHS labeling, MSDS documentation, and country-specific regulatory packs available for every SKU. Compliance is part of the product, not an afterthought.",
  },
  {
    title: "Performance benchmarking",
    body: "Every formula is benchmarked against the leading branded competitor. Where we don't outperform, we don't ship.",
  },
];

export const STATS_LIST: Stat[] = [
  { value: "60+", label: "OEM / ODM partners", hint: "Global brands manufactured in our facility" },
  { value: "100+", label: "Active SKUs", hint: "Across 15 product categories" },
  { value: "15", label: "Countries served", hint: "And expanding" },
  { value: "24+", label: "Months ceramic durability", hint: "F710 9H coating" },
];
