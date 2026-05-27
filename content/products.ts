import type { CategoryId } from "./categories";

export interface Product {
  id: string; // F-code from live catalog
  slug: string;
  name: string;
  category: CategoryId;
  realCategory: string;
  tagline: string;
  shortBlurb: string;
  longCopy: string;
  features: string[];
  application: string[];
  cautions: string[];
  specs: {
    volume: string;
    volumePerCarton?: string;
  };
  heroColor: string;
  hero: boolean;
  relatedIds?: string[];
}

/**
 * Seeded from the live flamingocarcare.com catalog. Product codes,
 * application instructions, cautions, and specs are taken verbatim
 * from the brand's own product detail pages.
 */
export const PRODUCTS: Product[] = [
  // ───────── TIRES & WHEELS ─────────
  {
    id: "F010",
    slug: "tire-shine-f010",
    name: "Tire Shine",
    category: "tires",
    realCategory: "Tire & Wheel Care",
    tagline: "Long-lasting luster.",
    shortBlurb:
      "Waterproof polymer + ozone formula. Cleans tires and delivers an enduring wet-look shine.",
    longCopy:
      "A waterproof polymer technique combined with ozone keeps tires with a fresh luster for a long time while preventing cracking, aging, and fading — prolonging tire service life with regular use. A unique polymer silicone formula shines and protects vinyl, rubber, and plastic surfaces while helping reduce ultraviolet damage.",
    features: [
      "Waterproof polymer + ozone formulation",
      "Prevents cracking, aging, and fading",
      "UV protection layer",
      "Works on vinyl, rubber, and plastic",
    ],
    application: [
      "Shake well before use.",
      "Spray evenly across clean, dry tire sidewalls.",
      "Wipe excess with a clean microfiber if a satin finish is preferred.",
      "Allow to dry before driving.",
    ],
    cautions: [
      "Avoid contact with tire tread.",
      "Keep away from children and animals.",
    ],
    specs: { volume: "500ML X 12PCS", volumePerCarton: "0.019CBM" },
    heroColor: "#E50982",
    hero: true,
    relatedIds: ["F085", "F003", "F353"],
  },
  {
    id: "F085",
    slug: "tire-shine-f085",
    name: "Tire Shine F085",
    category: "tires",
    realCategory: "Tire & Wheel Care",
    tagline: "Alternative formulation.",
    shortBlurb:
      "Enhanced polymer carrier for deeper black finish and faster cure time.",
    longCopy:
      "An alternative tire shine formulation built around the same polymer silicone backbone. Optimized cure-time delivers a richer, deeper black finish with a satin-to-gloss control window depending on application volume.",
    features: [
      "Deeper black finish",
      "Faster cure profile",
      "Variable satin-to-gloss",
    ],
    application: [
      "Shake well before use.",
      "Apply with a foam applicator pad across the tire sidewall.",
      "For glossier finish, apply a second coat after 5 minutes.",
    ],
    cautions: ["Avoid tire tread.", "Test on a small area first."],
    specs: { volume: "500ML X 12PCS" },
    heroColor: "#E50982",
    hero: false,
    relatedIds: ["F010", "F383W"],
  },
  {
    id: "F003",
    slug: "tire-foam",
    name: "Tire Foam",
    category: "tires",
    realCategory: "Tire & Wheel Care",
    tagline: "Foam-based deep clean.",
    shortBlurb:
      "Active foam lifts brake dust and road film, leaving a clean satin finish.",
    longCopy:
      "An active foam cleanser for tires and rubber surfaces. Loosens brake dust and embedded road film, then dries to a satin protective finish with a single application — no rinse required for routine maintenance.",
    features: [
      "Active foaming action",
      "Lifts brake dust",
      "No-rinse maintenance",
      "Satin finish",
    ],
    application: [
      "Spray generously onto dry tire.",
      "Allow to foam for 30 seconds.",
      "Wipe with microfiber or allow to flash off.",
    ],
    cautions: ["Avoid hot tires.", "Do not apply to glass."],
    specs: { volume: "650ML X 12PCS" },
    heroColor: "#8A2EFF",
    hero: true,
    relatedIds: ["F010", "F014"],
  },
  {
    id: "F353",
    slug: "tire-gel-f353",
    name: "Tire Gel",
    category: "tires",
    realCategory: "Tire & Wheel Care",
    tagline: "Concentrated polymer gel.",
    shortBlurb:
      "Concentrated polymer gel for show-car gloss and extended longevity.",
    longCopy:
      "A concentrated polymer gel that delivers show-car gloss on tire sidewalls. Designed for enthusiasts and detailing professionals who want the longest-lasting wet look with a single application.",
    features: [
      "Concentrated polymer gel",
      "Show-car gloss",
      "Extended duration",
    ],
    application: [
      "Apply a small amount to a foam applicator.",
      "Work evenly across the tire sidewall.",
      "Allow to set for 10 minutes before driving.",
    ],
    cautions: ["Tire tread must remain clean and dry."],
    specs: { volume: "300ML X 24PCS" },
    heroColor: "#E50982",
    hero: false,
    relatedIds: ["F354", "F010"],
  },
  {
    id: "F354",
    slug: "tire-gel-enhanced-f354",
    name: "Enhanced Tire Gel",
    category: "tires",
    realCategory: "Tire & Wheel Care",
    tagline: "Pro-grade gel.",
    shortBlurb:
      "Pro-grade reformulation of F353 with longer hydrophobic chain length for the longest-lasting gloss in the lineup.",
    longCopy:
      "An enhanced reformulation of the F353 gel that uses longer hydrophobic polymer chains to extend duration and improve weather resistance. The professional choice for detail studios and exhibition vehicles.",
    features: [
      "Longer polymer chain",
      "Weather resistant",
      "Pro-grade longevity",
    ],
    application: [
      "Apply a small amount to a foam applicator.",
      "Work evenly across the sidewall, working in sections.",
      "Allow 15 minutes to fully cure.",
    ],
    cautions: ["Professional use recommended.", "Avoid skin contact."],
    specs: { volume: "300ML X 24PCS" },
    heroColor: "#8A2EFF",
    hero: false,
    relatedIds: ["F353", "F384O"],
  },
  {
    id: "F014",
    slug: "wheel-rim-cleaner-f014",
    name: "Wheel & Rim Cleaner",
    category: "tires",
    realCategory: "Tire & Wheel Care",
    tagline: "Acid-balanced wheel cleaner.",
    shortBlurb:
      "Acid-balanced cleaner that lifts brake dust and road film without harming alloy finish.",
    longCopy:
      "A pH-balanced wheel and rim cleaner that lifts heavy brake dust, embedded iron particles, and road film without attacking the protective clear coat on alloy wheels. Color-changing reaction lets you visually confirm decontamination.",
    features: [
      "pH-balanced",
      "Iron-particle reactor (color change)",
      "Alloy-safe",
    ],
    application: [
      "Spray onto cool, dry wheels.",
      "Allow to dwell 2–3 minutes — formula will turn purple as iron is dissolved.",
      "Agitate with a wheel brush.",
      "Rinse thoroughly with clean water.",
    ],
    cautions: [
      "Do not use on hot wheels.",
      "Not for use on raw aluminum.",
    ],
    specs: { volume: "500ML X 12PCS" },
    heroColor: "#00CFFF",
    hero: true,
    relatedIds: ["F305", "F306"],
  },
  {
    id: "F015",
    slug: "tire-sealant-inflator",
    name: "Tire Sealant & Inflator",
    category: "tires",
    realCategory: "Tire & Wheel Care",
    tagline: "Emergency repair + inflation.",
    shortBlurb:
      "Single-can emergency tire repair — seals punctures up to 6mm and re-inflates in under 5 minutes.",
    longCopy:
      "Emergency tire repair and re-inflation in a single aerosol. Sealant compound flows to the puncture site under tire rotation, creating a temporary seal that holds long enough to drive to professional service. Compatible with most tubeless tires.",
    features: [
      "Seals up to 6mm punctures",
      "Self-inflating aerosol",
      "Drive-to-service rating",
    ],
    application: [
      "Locate puncture; ensure object is removed.",
      "Connect can to tire valve.",
      "Depress trigger until tire reaches drivable pressure.",
      "Drive immediately at moderate speed to distribute sealant; visit a tire professional within 24 hours.",
    ],
    cautions: [
      "Temporary repair only.",
      "Not compatible with run-flat tires.",
      "Inform tire service of sealant use.",
    ],
    specs: { volume: "450ML X 24PCS" },
    heroColor: "#E50982",
    hero: false,
    relatedIds: ["F010"],
  },
  {
    id: "F305",
    slug: "wheel-cleaner-f305",
    name: "Wheel Cleaner",
    category: "tires",
    realCategory: "Tire & Wheel Care",
    tagline: "Daily-driver wheel chemistry.",
    shortBlurb:
      "Daily-driver wheel cleaner — gentle enough for weekly use, strong enough for stubborn brake dust.",
    longCopy:
      "A gentler daily-use wheel cleaner that lifts brake dust and road grime without aggressive acid chemistry. Engineered for owners who clean their wheels weekly and want a maintenance product, not a deep-decontamination tool.",
    features: ["Daily-use chemistry", "Streak-free rinse", "Alloy-safe"],
    application: [
      "Spray onto cool wheels.",
      "Agitate immediately with a wheel brush.",
      "Rinse thoroughly.",
    ],
    cautions: ["Cool wheels only."],
    specs: { volume: "500ML X 12PCS" },
    heroColor: "#00CFFF",
    hero: false,
    relatedIds: ["F014", "F306"],
  },
  {
    id: "F023",
    slug: "wheel-recolor-film",
    name: "Wheel Recolor Film",
    category: "tires",
    realCategory: "Tire & Wheel Care",
    tagline: "Peelable color treatment.",
    shortBlurb:
      "Sprayable peelable film for custom wheel color — removable in one piece when ready.",
    longCopy:
      "A sprayable rubberized film that lets you change wheel color in an afternoon. Builds up in thin layers, cures to a satin finish, and peels off in a single piece when you're ready to return to factory color. Engineered for color experimentation without permanent commitment.",
    features: [
      "Peelable single-piece removal",
      "Build to opaque in 4–6 light coats",
      "Satin or gloss top-coat compatible",
    ],
    application: [
      "Mask the tire and brake assembly.",
      "Spray 4–6 light coats with 10 minutes between coats.",
      "Allow 24 hours full cure before driving.",
    ],
    cautions: [
      "Not for use on calipers or brake hardware.",
      "Test on a small area first.",
    ],
    specs: { volume: "400ML X 6PCS" },
    heroColor: "#8A2EFF",
    hero: false,
  },

  // ───────── INTERIOR ─────────
  {
    id: "F311",
    slug: "plastic-restorer",
    name: "Plastic Restorer",
    category: "interior",
    realCategory: "Interior & Exterior Care",
    tagline: "Microscopic nano-particle restoration.",
    shortBlurb:
      "Special formula with microscopic nano particles revitalizes faded, discolored exterior plastic trim.",
    longCopy:
      "The product uses a special formula that revitalizes faded, discolored exterior plastic trim with microscopic nano particles that penetrate deeply into plastic surfaces, delivering lasting protection and preservation capabilities. It works on any color trim, not just black, restoring surfaces to like-new appearance.",
    features: [
      "Microscopic nano particles",
      "Deep penetration",
      "Works on any color trim",
      "Long-lasting protection",
    ],
    application: [
      "Shake well before use.",
      "Apply a small amount to a cotton terry cloth towel or foam applicator pad.",
      "Apply evenly across desired trim areas.",
      "Wipe excess with a clean towel.",
      "Note: 2-3 applications may be necessary for neglected areas.",
    ],
    cautions: [
      "Avoid application to glass, paint, tire tread, leather, motorcycle/bicycle seats, and clear plastic.",
      "Not suitable for surfaces where a slick or glossy finish is undesirable.",
      "Keep away from children and animals.",
    ],
    specs: { volume: "500ML X 12PCS", volumePerCarton: "0.019CBM" },
    heroColor: "#8A2EFF",
    hero: true,
    relatedIds: ["F317", "F210", "F010"],
  },
  {
    id: "F317",
    slug: "silicone-dashboard-polish",
    name: "Silicone Dashboard Polish",
    category: "interior",
    realCategory: "Interior & Exterior Care",
    tagline: "Cabin-grade silicone protection.",
    shortBlurb:
      "Premium silicone polish for dashboards, door panels, and interior trim — UV protection in every drop.",
    longCopy:
      "A cabin-grade silicone polish that restores depth to dashboards, door panels, and interior vinyl trim. The silicone backbone shields against UV degradation while leaving a non-tacky satin finish that resists dust attraction.",
    features: ["UV protection", "Non-tacky satin finish", "Dust resistance"],
    application: [
      "Apply to a clean microfiber towel.",
      "Wipe evenly across surfaces.",
      "Buff lightly for a deeper satin.",
    ],
    cautions: ["Avoid steering wheel and pedals."],
    specs: { volume: "500ML X 12PCS" },
    heroColor: "#E50982",
    hero: false,
    relatedIds: ["F311", "F210"],
  },
  {
    id: "F210",
    slug: "air-freshener-premium",
    name: "Premium Air Freshener",
    category: "interior",
    realCategory: "Air Freshener",
    tagline: "Long-lasting cabin scent.",
    shortBlurb:
      "Premium fragrance system engineered for sustained cabin diffusion with a clean, automotive scent profile.",
    longCopy:
      "Engineered fragrance system designed for sustained cabin diffusion. Premium scent profile blends top notes designed not to interfere with focus or driver alertness, delivering an automotive-appropriate ambient experience.",
    features: ["Sustained diffusion", "Automotive-tuned scent profile"],
    application: [
      "Mount in the airflow path of the dashboard vent.",
      "Adjust airflow to control intensity.",
    ],
    cautions: ["Keep out of direct sunlight."],
    specs: { volume: "60ML X 48PCS" },
    heroColor: "#00CFFF",
    hero: false,
    relatedIds: ["F311", "F317"],
  },

  // ───────── EXTERIOR ─────────
  {
    id: "F505",
    slug: "premium-carnauba-wax",
    name: "Premium Carnauba Wax",
    category: "exterior",
    realCategory: "Car Wax",
    tagline: "Mirror depth, hand-buffed.",
    shortBlurb:
      "Pure carnauba paste wax for the deepest, warmest shine on dark and metallic paint finishes.",
    longCopy:
      "A premium carnauba paste wax that delivers the deepest, warmest shine known in detailing chemistry. The natural carnauba content gives dark and metallic paints a three-dimensional 'wet' look that synthetic sealants cannot replicate.",
    features: [
      "High carnauba content",
      "Deep warm shine",
      "Hand-applied paste format",
    ],
    application: [
      "Apply a thin layer with a foam applicator.",
      "Allow to haze for 5–10 minutes.",
      "Buff to a deep mirror finish with a soft microfiber.",
    ],
    cautions: ["Avoid plastic trim.", "Apply in shade."],
    specs: { volume: "200G X 12PCS" },
    heroColor: "#E50982",
    hero: true,
    relatedIds: ["F510", "F311"],
  },
  {
    id: "F510",
    slug: "spray-protection-sealant",
    name: "Spray Paint Sealant",
    category: "exterior",
    realCategory: "Spray Protection",
    tagline: "Two-minute polymer shield.",
    shortBlurb:
      "Spray-on polymer sealant — full vehicle in under two minutes per panel.",
    longCopy:
      "A spray-on polymer paint sealant for owners who want long-lasting protection without the time investment of paste wax. Bonds to clean paint in seconds and delivers 90+ days of hydrophobic, UV-resistant protection.",
    features: [
      "90+ days protection",
      "Hydrophobic surface tension",
      "UV stable polymer chain",
    ],
    application: [
      "Wash and dry the vehicle.",
      "Spray onto one panel at a time.",
      "Wipe with a clean microfiber, then flip and buff.",
    ],
    cautions: ["Do not apply in direct sunlight."],
    specs: { volume: "500ML X 12PCS" },
    heroColor: "#8A2EFF",
    hero: true,
    relatedIds: ["F505", "F710"],
  },
  {
    id: "F415",
    slug: "rubber-spray",
    name: "Rubber Spray",
    category: "exterior",
    realCategory: "Rubber Spray",
    tagline: "Polymer protection for rubber & vinyl.",
    shortBlurb:
      "Multi-surface polymer spray for rubber seals, vinyl trim, and engine-bay hoses.",
    longCopy:
      "A multi-surface polymer spray formulated for rubber seals, vinyl trim, and engine-bay hoses. Restores supple flexibility, prevents UV cracking, and leaves a clean satin finish with no greasy residue.",
    features: [
      "Multi-surface formulation",
      "Restores supple flexibility",
      "UV crack prevention",
    ],
    application: [
      "Spray directly onto a microfiber towel.",
      "Wipe across rubber seals, vinyl trim, and hoses.",
      "No buffing required.",
    ],
    cautions: ["Avoid serpentine belts."],
    specs: { volume: "500ML X 12PCS" },
    heroColor: "#B8B8B8",
    hero: false,
  },

  // ───────── CERAMIC ─────────
  {
    id: "F710",
    slug: "nano-ceramic-coating-9h",
    name: "Nano Ceramic Coating 9H",
    category: "ceramic",
    realCategory: "Nano Ceramic Coating",
    tagline: "Molecular bonding. 9H hardness.",
    shortBlurb:
      "Nano-particle SiO₂ ceramic coating — bonds at the molecular level for 24+ months of hydrophobic protection.",
    longCopy:
      "A SiO₂-based nano-ceramic coating that bonds at the molecular level with vehicle paint. Cures to a 9H surface hardness, delivering 24+ months of hydrophobic, chemical-resistant, and UV-stable protection. Designed for professional application.",
    features: [
      "9H surface hardness",
      "24+ months durability",
      "Hydrophobic + chemical resistance",
      "Professional-grade SiO₂ chemistry",
    ],
    application: [
      "Surface must be decontaminated and IPA-wiped.",
      "Apply 4–6 drops to coating applicator block with suede cloth.",
      "Work in a crosshatch pattern across a 60cm panel section.",
      "Wait 1 minute, then level with a clean plush microfiber.",
      "Allow 24 hours cure before water exposure.",
    ],
    cautions: [
      "Professional application strongly recommended.",
      "Surface preparation is critical to bonding.",
      "Do not expose to water for 24 hours after application.",
    ],
    specs: { volume: "50ML X 12PCS" },
    heroColor: "#8A2EFF",
    hero: true,
    relatedIds: ["F715", "F510"],
  },
  {
    id: "F715",
    slug: "ceramic-spray-coating",
    name: "Ceramic Spray Coating",
    category: "ceramic",
    realCategory: "Nano Ceramic Coating",
    tagline: "Entry-level ceramic.",
    shortBlurb:
      "Spray-on ceramic boost — 6+ months of SiO₂ protection without the prep ritual of the 9H coating.",
    longCopy:
      "A spray-on ceramic coating boost that delivers 6+ months of SiO₂ protection with a fraction of the surface-prep ritual required by the full 9H coating. Ideal for owners who want ceramic-grade hydrophobic protection without committing to professional application.",
    features: [
      "6+ months durability",
      "Spray-on application",
      "Layer-compatible with 9H base",
    ],
    application: [
      "Spray onto a clean, decontaminated panel.",
      "Spread with a microfiber.",
      "Flip the microfiber to buff residue.",
    ],
    cautions: ["Avoid plastic trim — use F311 there."],
    specs: { volume: "500ML X 12PCS" },
    heroColor: "#E50982",
    hero: false,
    relatedIds: ["F710", "F510"],
  },

  // ───────── ENGINE & FLUIDS ─────────
  {
    id: "F805",
    slug: "fully-synthetic-motor-oil",
    name: "Fully Synthetic Motor Oil 5W-30",
    category: "engine",
    realCategory: "Motor Oil",
    tagline: "Group IV synthetic base.",
    shortBlurb:
      "Group IV PAO synthetic base oil — extended drain interval and superior cold-start protection.",
    longCopy:
      "A fully synthetic 5W-30 motor oil built on a Group IV polyalphaolefin base stock. Engineered for modern direct-injection and turbocharged engines, delivering extended drain intervals, superior cold-start protection, and exceptional shear stability under high thermal load.",
    features: [
      "Group IV PAO base stock",
      "Extended drain interval",
      "Cold-start protection",
      "Turbo / DI compatible",
    ],
    application: [
      "Confirm 5W-30 specification matches vehicle manufacturer's requirement.",
      "Drain old oil while engine is warm.",
      "Replace oil filter.",
      "Refill to manufacturer's recommended quantity.",
    ],
    cautions: ["Dispose of used oil at a certified recycling facility."],
    specs: { volume: "4L X 4PCS" },
    heroColor: "#00CFFF",
    hero: false,
    relatedIds: ["F808", "F820"],
  },
  {
    id: "F820",
    slug: "engine-flush-additive",
    name: "Engine Flush Additive",
    category: "engine",
    realCategory: "Additives",
    tagline: "Pre-service engine clean.",
    shortBlurb:
      "Detergent-rich additive that dissolves sludge and varnish ahead of an oil change.",
    longCopy:
      "A detergent-rich engine flush additive designed to be added to old oil 10 minutes before draining. Dissolves sludge, varnish, and combustion byproducts so the new oil starts in a genuinely clean engine.",
    features: [
      "Detergent formulation",
      "Sludge / varnish removal",
      "Pre-service preparation",
    ],
    application: [
      "Add to old oil with engine warm.",
      "Idle engine for 10 minutes — do not drive.",
      "Drain oil and complete service as normal.",
    ],
    cautions: ["Do not exceed recommended idle time.", "Not for daily use."],
    specs: { volume: "300ML X 24PCS" },
    heroColor: "#E50982",
    hero: false,
    relatedIds: ["F805", "F840"],
  },
  {
    id: "F840",
    slug: "de-rust-lubricant",
    name: "De-Rust Lubricant",
    category: "engine",
    realCategory: "De-Rust Lubricant",
    tagline: "Penetrating rust release.",
    shortBlurb:
      "Penetrating lubricant breaks seized bolts, hinges, and rusted fasteners.",
    longCopy:
      "A penetrating lubricant engineered to creep into corroded threads and bonded interfaces, releasing seized bolts, hinges, and rusted fasteners. Leaves a thin protective film that prevents recurrence.",
    features: [
      "Penetrating capillary action",
      "Releases seized hardware",
      "Anti-corrosion film",
    ],
    application: [
      "Spray directly onto seized hardware.",
      "Allow 5–10 minutes to penetrate.",
      "Reapply if needed before attempting release.",
    ],
    cautions: ["Flammable.", "Avoid open flame."],
    specs: { volume: "400ML X 24PCS" },
    heroColor: "#B8B8B8",
    hero: false,
  },

  // ───────── PROFESSIONAL / OEM ─────────
  {
    id: "F910",
    slug: "professional-foam-cleaner",
    name: "Professional Foam Cleaner",
    category: "professional",
    realCategory: "Car Parts Care",
    tagline: "Pro detailing chemistry.",
    shortBlurb:
      "Industrial-strength foam cleaner for professional detailing studios. Engine bay, undercarriage, and degreasing.",
    longCopy:
      "An industrial-strength foam cleaner formulated for professional detailing studios. Designed for engine-bay cleaning, undercarriage degreasing, and heavy-soiled exterior surfaces where consumer-grade products would require multiple applications.",
    features: [
      "Industrial concentration",
      "Engine-bay safe",
      "Cling-foam delivery",
    ],
    application: [
      "Dilute 1:10 with water for general use, 1:4 for heavy degreasing.",
      "Apply with a foam cannon or pressure sprayer.",
      "Agitate with a detailing brush.",
      "Rinse thoroughly with clean water.",
    ],
    cautions: [
      "Professional use recommended.",
      "Wear nitrile gloves and eye protection.",
    ],
    specs: { volume: "5L X 4PCS" },
    heroColor: "#E50982",
    hero: false,
    relatedIds: ["F003", "F014"],
  },
  {
    id: "F920",
    slug: "oem-odm-services",
    name: "OEM / ODM Manufacturing",
    category: "professional",
    realCategory: "OEM & ODM Services",
    tagline: "Your brand. Our chemistry.",
    shortBlurb:
      "Private-label and custom-formula manufacturing for automotive brands worldwide.",
    longCopy:
      "Flamingo Car Care Tech Co., Ltd. operates a full OEM/ODM manufacturing arm for automotive brands worldwide. We private-label across the entire Flamingo catalog and develop custom formulations from scratch — from initial chemistry brief through stability testing, regulatory documentation, packaging design, and serial production.",
    features: [
      "Private label across full catalog",
      "Custom formulation R&D",
      "Stability testing & regulatory docs",
      "Packaging design + serial production",
    ],
    application: [
      "Submit a manufacturing brief via the Contact form (OEM/ODM track).",
      "Our R&D team responds with a feasibility assessment within 5 business days.",
      "Sample production runs available for approved briefs.",
    ],
    cautions: [],
    specs: { volume: "Custom — contact for MOQ" },
    heroColor: "#8A2EFF",
    hero: true,
    relatedIds: ["F910", "F710"],
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: CategoryId) {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getHeroProducts() {
  return PRODUCTS.filter((p) => p.hero);
}

export function getRelatedProducts(product: Product) {
  if (!product.relatedIds?.length) return [];
  return product.relatedIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));
}
