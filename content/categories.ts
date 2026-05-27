export type CategoryId =
  | "exterior"
  | "interior"
  | "tires"
  | "engine"
  | "ceramic"
  | "professional";

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  description: string;
  accentColor: string;
  realCategories: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: "exterior",
    name: "Exterior Protection",
    shortName: "Exterior",
    description:
      "Paint sealants, waxes, sprays, and polymer protection systems engineered for paint perfection.",
    accentColor: "#E50982",
    realCategories: [
      "Spray Protection",
      "Car Wax",
      "Spray Paint",
      "Rubber Spray",
    ],
  },
  {
    id: "interior",
    name: "Interior Detailing",
    shortName: "Interior",
    description:
      "Premium dashboard, leather, fabric, and air-care formulations for cabin perfection.",
    accentColor: "#8A2EFF",
    realCategories: ["Air Freshener", "Interior & Exterior Care"],
  },
  {
    id: "tires",
    name: "Tires & Wheels",
    shortName: "Tires",
    description:
      "Waterproof polymer + ozone formulas for long-lasting tire luster, plus dedicated wheel chemistry.",
    accentColor: "#00CFFF",
    realCategories: ["Tire & Wheel Care"],
  },
  {
    id: "engine",
    name: "Engine & Fluids",
    shortName: "Engine",
    description:
      "Motor oils, additives, cooling-system care, and de-rust lubricants for mechanical longevity.",
    accentColor: "#E50982",
    realCategories: [
      "Motor Oil",
      "Oil & Fluid Products",
      "Cooling System Care",
      "Additives",
      "De-Rust Lubricant",
    ],
  },
  {
    id: "ceramic",
    name: "Nano Ceramic",
    shortName: "Ceramic",
    description:
      "Nano-particle ceramic coatings — molecular bonding for hydrophobic, UV-stable, scratch-resistant shells.",
    accentColor: "#8A2EFF",
    realCategories: ["Nano Ceramic Coating"],
  },
  {
    id: "professional",
    name: "Professional & OEM",
    shortName: "Pro / OEM",
    description:
      "Specialty parts care and OEM/ODM manufacturing for global automotive brands.",
    accentColor: "#B8B8B8",
    realCategories: ["OEM & ODM Services", "Car Parts Care"],
  },
];

export function getCategory(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id);
}
