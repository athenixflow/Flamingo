import type { CategoryId } from "./categories";
import type { TechVizType } from "@/components/tech/TechViz";

export const ABOUT_HERO = {
  eyebrow: "Flamingo Car Care Tech Co., Ltd.",
  headline: ["ENGINEERED", "TO PRESERVE", "PERFECTION."],
  subline:
    "For decades, Flamingo has transformed automotive care through chemistry, engineering, and relentless innovation.",
  primaryCta: { label: "Explore Our Story", href: "#legacy" },
  scrollIndicator: "Discover the Engineering",
};

export interface LegacyEra {
  era: string;
  title: string;
  body: string;
  accent: string;
  icon: "beaker" | "factory" | "handshake" | "lattice" | "globe";
}

export const LEGACY_TIMELINE: LegacyEra[] = [
  {
    era: "1980s",
    title: "Foundational chemistry.",
    body:
      "Lab-scale formulation runs. The first aerosol systems and surface treatments enter trial. Engineering discipline arrives before scale.",
    accent: "#FFA55A",
    icon: "beaker",
  },
  {
    era: "1990s",
    title: "Industrial scale-up.",
    body:
      "Vertical integration of filling lines and quality protocols. Manufacturing capacity grows from artisan runs to industrial throughput.",
    accent: "#B8B8B8",
    icon: "factory",
  },
  {
    era: "2000s",
    title: "OEM/ODM partnerships.",
    body:
      "Private-label production for international automotive brands. Flamingo chemistry begins protecting vehicles under dozens of other names.",
    accent: "#00CFFF",
    icon: "handshake",
  },
  {
    era: "2010s",
    title: "Nano-ceramic breakthrough.",
    body:
      "9H SiO₂ coating system. Hydrophobic polymer tire chemistry. UV-stable protective layers move from research into the standard catalog.",
    accent: "#8A2EFF",
    icon: "lattice",
  },
  {
    era: "Today",
    title: "47 SKUs. 15+ countries. 30,000 m².",
    body:
      "A full catalog spanning ceramic, exterior, interior, tires, engine, and professional/OEM — produced at industrial scale, shipped to distributors on six continents.",
    accent: "#E50982",
    icon: "globe",
  },
];

export const LEGACY_INTRO = {
  eyebrow: "The Legacy",
  title: "A LEGACY BUILT",
  accentTitle: "ON AUTOMOTIVE SCIENCE.",
  body: [
    "Flamingo Car Care Tech was built on a simple belief: every vehicle deserves protection that performs beyond expectations.",
    "From advanced cleaning systems to surface restoration technologies, Flamingo has spent years refining automotive care through research, manufacturing excellence, and continuous innovation.",
    "The company combines industrial-scale production capability with advanced automotive chemistry to create products trusted worldwide.",
  ],
};

export interface ManufacturingStat {
  value: number;
  display: string;
  unit?: string;
  suffix?: string;
  label: string;
}

export const MANUFACTURING_INTRO = {
  eyebrow: "Manufacturing",
  title: "30,000 SQUARE METERS",
  accentTitle: "OF INNOVATION.",
  body: [
    "Behind every Flamingo product is a manufacturing ecosystem engineered for consistency, scale, and quality.",
    "From automated production lines to advanced filling systems and quality-assurance protocols, every process is optimized for performance.",
  ],
};

export const MANUFACTURING_STATS: ManufacturingStat[] = [
  { value: 30000, display: "30,000", unit: "m²", label: "Manufacturing facility" },
  { value: 6, display: "6", label: "Fully automated aerosol lines" },
  { value: 15000, display: "15,000", suffix: "/ day", label: "Production capacity" },
  { value: 0, display: "Global", label: "Manufacturing infrastructure" },
];

export const MANUFACTURING_STATIONS = [
  { name: "Aerosol Fill", note: "Pressurised line" },
  { name: "Capping", note: "Torque-controlled" },
  { name: "Labeling", note: "Vision-verified" },
  { name: "Quality", note: "Batch-tested" },
  { name: "Packaging", note: "Sealed carton" },
  { name: "Dispatch", note: "Container-ready" },
];

export interface RdPhase {
  vizType: TechVizType;
  accent: string;
  eyebrow: string;
  title: string;
  body: string;
}

export const RD_INTRO = {
  eyebrow: "Research & Development",
  title: "EVERY FORMULA",
  accentTitle: "BEGINS WITH A QUESTION.",
  body: [
    "At Flamingo, innovation starts long before a product reaches the shelf.",
    "Every formula is engineered, tested, refined, and validated through extensive research into cleaning science, protection chemistry, and surface preservation.",
    "We don't simply create products. We engineer performance.",
  ],
};

export const RD_PHASES: RdPhase[] = [
  {
    vizType: "hydrophobic",
    accent: "#00CFFF",
    eyebrow: "01 — Surface tension",
    title: "Water beads, then leaves.",
    body:
      "Polymer + ozone chemistry creates a hydrophobic skin that rejects moisture and contamination. Beading is the visible signature of a working protective layer.",
  },
  {
    vizType: "molecular",
    accent: "#8A2EFF",
    eyebrow: "02 — Molecular network",
    title: "Nano particles connect.",
    body:
      "At microscopic scale, nano carriers bond to surface irregularities. The result: an even, integrated film instead of a temporary coating that washes away.",
  },
  {
    vizType: "layered",
    accent: "#E50982",
    eyebrow: "03 — Layered ceramic",
    title: "9H SiO₂ stacks.",
    body:
      "Engineered layers of silicon dioxide build a hard, UV-stable shell. Each layer reinforces the one below. Protection becomes architectural, not topical.",
  },
];

export const PHILOSOPHY_INTRO = {
  eyebrow: "Engineering Philosophy",
  title: "THE SCIENCE",
  accentTitle: "BEHIND THE SHINE.",
  body: [
    "Automotive care isn't about appearance alone. It's about protecting every surface from the forces that constantly degrade performance and beauty.",
    "Flamingo products are engineered to fight them all.",
  ],
};

export const PHILOSOPHY_FORCES = [
  { label: "UV Radiation", blurb: "Photochemical degradation of paint, plastic, rubber." },
  { label: "Heat", blurb: "Cyclic expansion stress on coatings and seals." },
  { label: "Moisture", blurb: "Capillary corrosion and oxidative attack." },
  { label: "Oxidation", blurb: "Long-cycle breakdown of binders and pigments." },
  { label: "Contamination", blurb: "Road tar, brake dust, organic fallout, microparticulates." },
];

export const ECOSYSTEM_INTRO = {
  eyebrow: "Product Ecosystem",
  title: "AN ECOSYSTEM",
  accentTitle: "OF CARE.",
  body: [
    "Automotive care is not a single product. It's a complete system.",
    "Every Flamingo solution is designed to work with the others — to protect, restore, enhance, and preserve every vehicle surface.",
  ],
};

export interface EcosystemNode {
  id: CategoryId;
  label: string;
  benefit: string;
}

export const ECOSYSTEM_NODES: EcosystemNode[] = [
  { id: "exterior", label: "Exterior", benefit: "Paint sealants, waxes, polymer protection." },
  { id: "interior", label: "Interior", benefit: "Dashboard polish, leather conditioning, air care." },
  { id: "tires", label: "Tires & Wheels", benefit: "Hydrophobic polymer + ozone luster." },
  { id: "engine", label: "Engine & Fluids", benefit: "Motor oils, additives, cooling system care." },
  { id: "ceramic", label: "Nano Ceramic", benefit: "9H SiO₂ molecular bonding shell." },
  { id: "professional", label: "Pro / OEM", benefit: "Custom formulation. Private label. Scale." },
];

export const REACH_INTRO = {
  eyebrow: "Global Reach",
  title: "TRUSTED ACROSS",
  accentTitle: "CONTINENTS.",
  body: [
    "Flamingo products serve automotive professionals, distributors, retailers, and enthusiasts across international markets.",
    "Built with global standards. Delivered with local relevance.",
  ],
};

// Hub-to-region trade routes (great-circle arcs drawn over the WorldMap).
// `from` and `to` are [lon, lat]. Origin is the Lagos, Nigeria HQ.
export const REACH_ROUTES: { from: [number, number]; to: [number, number]; region: string }[] = [
  { from: [3.38, 6.52], to: [-95.7, 37.0], region: "Americas" },
  { from: [3.38, 6.52], to: [10.4, 51.1], region: "Europe" },
  { from: [3.38, 6.52], to: [53.8, 23.4], region: "Middle East" },
  { from: [3.38, 6.52], to: [22.9, -30.5], region: "Southern Africa" },
  { from: [3.38, 6.52], to: [133.7, -25.2], region: "Oceania" },
];

export const CERTIFICATIONS_INTRO = {
  eyebrow: "Certifications",
  title: "VERIFIED.",
  accentTitle: "CERTIFIED. TRUSTED.",
  body: [
    "Quality is not claimed. It is proven.",
    "Every certification represents a commitment to excellence, consistency, environmental responsibility, and manufacturing integrity.",
  ],
};

export const CERTIFICATIONS = [
  { id: "iso-9001", name: "ISO 9001", subtitle: "Quality Management System" },
  { id: "iso-14001", name: "ISO 14001", subtitle: "Environmental Management Standard" },
  { id: "iqs", name: "International Quality Systems", subtitle: "Multi-region compliance" },
  { id: "ems", name: "Environmental Management", subtitle: "Sustainable manufacturing protocols" },
  { id: "gmc", name: "Global Manufacturing Compliance", subtitle: "Cross-border production standards" },
  { id: "trust", name: "Trust Indicators", subtitle: "Distributor verification programme" },
];

export const WHY_INTRO = {
  eyebrow: "Why Flamingo Exists",
  title: "WE DON'T MAKE PRODUCTS.",
  accentTitle: "WE PROTECT INVESTMENTS.",
  body: [
    "Every vehicle tells a story. A first car. A dream machine. A family vehicle. A business asset.",
    "Years of memories. Years of investment.",
    "Our mission is simple: help people preserve what matters. Through technology. Through science. Through care.",
  ],
};

export interface WhyVignette {
  title: string;
  body: string;
  imageSlug: string;
  caption: string;
}

export const WHY_VIGNETTES: WhyVignette[] = [
  {
    title: "Paint restoration.",
    body: "Oxidation flattens the colour. Polymer protection brings the depth back.",
    imageSlug: "flamingo-car-polish-wax",
    caption: "Polish wax · F041",
  },
  {
    title: "Interior restoration.",
    body: "Dust, UV, dry leather. Conditioned cabin chemistry undoes the damage.",
    imageSlug: "flamingo-dashboard-coating",
    caption: "Dashboard coating · F396",
  },
  {
    title: "Wheel restoration.",
    body: "Brake dust dulls every wheel. Targeted cleaner + tire luster lift them back to factory.",
    imageSlug: "flamingo-tire-shine",
    caption: "Tire shine · F010",
  },
];

export const MANIFESTO = {
  headline: ["THE FUTURE OF", "AUTOMOTIVE CARE", "IS ENGINEERED."],
  subline:
    "From molecular science to global manufacturing, Flamingo exists to help every vehicle perform, look, and last better.",
  primaryCta: { label: "Explore Products", href: "/products" },
  secondaryCta: { label: "Become a Distributor", href: "/contact?type=distributor" },
};
