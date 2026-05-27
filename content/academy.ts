export type AcademyTopic =
  | "tutorials"
  | "maintenance"
  | "ceramic"
  | "restoration"
  | "professional";

export interface AcademyChapter {
  title: string;
  body: string;
}

export interface AcademyLesson {
  slug: string;
  title: string;
  topic: AcademyTopic;
  duration: string;
  summary: string;
  thumbColor: string;
  chapters: AcademyChapter[];
  relatedProducts?: string[]; // F-codes
  relatedSlugs?: string[];
}

export const ACADEMY_TOPICS: { id: AcademyTopic; label: string }[] = [
  { id: "tutorials", label: "Detailing Tutorials" },
  { id: "maintenance", label: "Maintenance Routines" },
  { id: "ceramic", label: "Ceramic Guides" },
  { id: "restoration", label: "Restoration Tips" },
  { id: "professional", label: "Professional Detailing" },
];

/**
 * Seeded from the live flamingocarcare.com "Expert Tips" sections —
 * Vinyl/Rubber/Plastic, Leather/Fabric/Carpet, Interior/Exterior Checklists —
 * extended with ceramic and restoration guidance aligned to the real catalog.
 */
export const ACADEMY_LESSONS: AcademyLesson[] = [
  {
    slug: "vinyl-rubber-plastic-care",
    title: "Vinyl, Rubber & Plastic Care",
    topic: "tutorials",
    duration: "6 min read",
    summary:
      "The right chemistry — and the right technique — for keeping vinyl, rubber, and plastic trim looking factory-new.",
    thumbColor: "#E50982",
    chapters: [
      {
        title: "Why these surfaces fade",
        body: "Vinyl, rubber, and unpainted plastic share a common enemy: ultraviolet light. UV photons break down the polymer chains that give these surfaces their flexibility and color depth, leading to chalking, fading, and ultimately cracking. Routine care isn't cosmetic — it's structural.",
      },
      {
        title: "Cleaning before protection",
        body: "Any protectant applied over surface contamination just locks the dirt in. Wash with a pH-neutral all-purpose cleaner, agitate with a soft detail brush in the textured areas, and rinse thoroughly. Allow surfaces to dry before applying protection.",
      },
      {
        title: "Choosing the right protectant",
        body: "For faded trim, use a nano-particle restorer like F311 Plastic Restorer — the sub-micron particles penetrate the surface and restore optical density. For maintenance on already-healthy trim, a silicone-based protectant like F317 Silicone Dashboard Polish is the right choice.",
      },
      {
        title: "Application technique",
        body: "Always apply protectant to the applicator, not directly to the surface — direct sprays cause runs and overspray onto adjacent painted surfaces. Use a foam applicator or cotton terry cloth, work in straight lines, and wipe excess with a clean microfiber.",
      },
    ],
    relatedProducts: ["F311", "F317", "F415"],
    relatedSlugs: ["interior-checklist", "exterior-checklist"],
  },
  {
    slug: "leather-fabric-carpet-care",
    title: "Leather, Fabric & Carpet Care",
    topic: "tutorials",
    duration: "7 min read",
    summary:
      "How to clean and condition the soft surfaces of your interior without damaging them.",
    thumbColor: "#8A2EFF",
    chapters: [
      {
        title: "Identifying your seat material",
        body: "Most modern 'leather' seats are actually a thin leather layer over a polyurethane base, or fully synthetic vinyl. Treatment products that work on full-grain leather can damage these synthetic substitutes. When in doubt, check your owner's manual.",
      },
      {
        title: "Routine leather cleaning",
        body: "Use a dedicated pH-balanced leather cleaner with a soft brush. Work in small sections, agitate gently, and wipe away suspended dirt before it dries back into the surface. Never use household cleaners — most contain solvents that strip the leather's protective coating.",
      },
      {
        title: "Fabric and carpet",
        body: "Vacuum thoroughly first. For stains, blot — never rub. A fabric-and-carpet shampoo with low-foam chemistry penetrates without saturating, lifts the stain, and extracts cleanly. Avoid over-wetting: trapped moisture creates the conditions for mold growth in the foam backing.",
      },
      {
        title: "Protection",
        body: "After cleaning, a fabric protectant restores hydrophobic repellency to factory fabric. For leather, a UV-blocking conditioner keeps natural oils from migrating out and prevents the dry, cracked appearance that ages an interior faster than mileage does.",
      },
    ],
    relatedSlugs: ["interior-checklist"],
  },
  {
    slug: "interior-checklist",
    title: "Interior Detailing Checklist",
    topic: "maintenance",
    duration: "4 min read",
    summary:
      "A repeatable interior detailing routine — the same order, the same products, every time.",
    thumbColor: "#00CFFF",
    chapters: [
      {
        title: "1. Clear the cabin",
        body: "Remove floor mats, trash, and all loose items. Detailing happens in an empty cabin — every time.",
      },
      {
        title: "2. Vacuum top-down",
        body: "Headliner, dash, seats, then footwells and floor mats separately. Use a soft brush attachment on textured plastics.",
      },
      {
        title: "3. Clean the hard surfaces",
        body: "Dashboard, door panels, console, steering wheel column. APC on a microfiber, never sprayed directly on the surface.",
      },
      {
        title: "4. Treat the soft surfaces",
        body: "Leather cleaner and conditioner on seats. Fabric shampoo on cloth. Carpet shampoo on carpets.",
      },
      {
        title: "5. Glass and detail",
        body: "Interior glass cleaner with a waffle-weave microfiber. Vent brushes for HVAC louvres. Finish with a premium air freshener installed in the dashboard airflow.",
      },
    ],
    relatedProducts: ["F311", "F317", "F210"],
  },
  {
    slug: "exterior-checklist",
    title: "Exterior Detailing Checklist",
    topic: "maintenance",
    duration: "5 min read",
    summary:
      "The two-bucket wash, decontamination, and protection routine that keeps paint flawless.",
    thumbColor: "#E50982",
    chapters: [
      {
        title: "1. Pre-rinse and pre-foam",
        body: "Rinse loose dirt with a strong jet. Apply a snow-foam pre-wash and let it dwell for 5 minutes — this lifts the worst of the contamination before you ever touch the paint.",
      },
      {
        title: "2. Two-bucket wash",
        body: "One bucket for shampoo, one for rinsing. Use a wash mitt, top-down, straight-line motions. Rinse the mitt between every panel.",
      },
      {
        title: "3. Decontamination",
        body: "An iron-particle remover dissolves embedded brake dust from the paint and wheels. A clay bar removes anything the iron remover left behind.",
      },
      {
        title: "4. Dry",
        body: "A plush microfiber drying towel and a slow draw. Pat — don't drag. Edges and seams trap water; use a leaf blower to clear them.",
      },
      {
        title: "5. Protect",
        body: "Spray sealant (F510) for everyday protection, paste wax (F505) for deep gloss, or ceramic spray (F715) for hydrophobic durability. Apply in shade, panel by panel.",
      },
    ],
    relatedProducts: ["F510", "F505", "F715", "F014"],
  },
  {
    slug: "ceramic-coating-explained",
    title: "Nano Ceramic Coating, Explained",
    topic: "ceramic",
    duration: "8 min read",
    summary:
      "What SiO₂ actually does to your paint — and why surface preparation determines whether your $200 coating bonds or beads off in six months.",
    thumbColor: "#8A2EFF",
    chapters: [
      {
        title: "The chemistry",
        body: "Silicon dioxide is the same molecule as quartz. In coating chemistry, it's suspended in a carrier solvent that flashes off after application, leaving a covalently-bonded ceramic shell on the clear coat. The bond is permanent — you don't 'reapply' ceramic, you re-coat over a maintained surface.",
      },
      {
        title: "Why prep matters more than the product",
        body: "Any contamination between the coating and the clear coat is a defect in the bond. Decontaminate with an iron remover, clay the paint, machine polish to a defect-free surface, IPA-wipe to remove polish residues. Only then is the surface ready to bond.",
      },
      {
        title: "Application",
        body: "Apply 4–6 drops of F710 to an applicator block with a suede cloth. Work a 60cm panel section in a crosshatch pattern. Wait 60 seconds, then level with a plush microfiber. Move to the next section.",
      },
      {
        title: "Cure and maintenance",
        body: "24 hours away from water. 7 days for full chemical resistance. Maintain with pH-neutral shampoo and a topper like F715 Ceramic Spray every 6 months. Avoid traffic-film-removers and other strong alkaline cleaners.",
      },
    ],
    relatedProducts: ["F710", "F715"],
  },
  {
    slug: "tire-restoration-tips",
    title: "Tire Restoration & Protection",
    topic: "restoration",
    duration: "5 min read",
    summary:
      "Brown, cracked, faded tires can be brought back — and kept that way.",
    thumbColor: "#00CFFF",
    chapters: [
      {
        title: "Why tires turn brown",
        body: "Anti-ozonants bloom to the tire surface as a protective sacrificial layer. As they're consumed by UV and ozone exposure, the surface turns brown. Cleaning removes the spent layer; protectant slows the rate at which the next layer is consumed.",
      },
      {
        title: "Deep clean",
        body: "Spray F003 Tire Foam onto dry tires. Agitate with a stiff brush, especially in the textured sidewall lettering. Rinse thoroughly.",
      },
      {
        title: "Protect",
        body: "Apply F010 or F085 Tire Shine for an everyday wet look. For maximum longevity and gloss, switch to F353 or F354 Enhanced Tire Gel — concentrated polymer gel delivers show-car results.",
      },
      {
        title: "Maintenance cadence",
        body: "Wash and reapply every 2–4 weeks for daily drivers. Show vehicles get a full deep clean and gel application the day before the event.",
      },
    ],
    relatedProducts: ["F003", "F010", "F085", "F353", "F354"],
  },
  {
    slug: "plastic-trim-restoration",
    title: "Restoring Faded Plastic Trim",
    topic: "restoration",
    duration: "4 min read",
    summary:
      "How nano particles in F311 Plastic Restorer rebuild optical density in oxidized exterior trim.",
    thumbColor: "#E50982",
    chapters: [
      {
        title: "What 'faded' actually means",
        body: "UV exposure breaks down the polymer chains at the surface of plastic trim. The breakdown creates micro-fissures that scatter incoming light, which we perceive as a chalky white-grey appearance. The plastic itself isn't gone — its optical density is.",
      },
      {
        title: "Why nano particles work",
        body: "F311 carries microscopic nano particles in a deep-penetrating carrier. The particles fill the micro-fissures and re-establish the optical density of the original surface. Unlike topical dressings, this is a deep structural restoration — not a surface dye.",
      },
      {
        title: "Application",
        body: "Shake well. Apply a small amount to a cotton terry cloth towel or foam applicator pad. Work into the trim, allow 5 minutes, wipe excess. Neglected areas may need 2–3 applications.",
      },
      {
        title: "What to avoid",
        body: "Don't apply to glass, paint, tire tread, leather, or clear plastic. Don't use on surfaces where you don't want a slight gloss.",
      },
    ],
    relatedProducts: ["F311"],
  },
  {
    slug: "professional-workflow",
    title: "Professional Detailing Workflow",
    topic: "professional",
    duration: "10 min read",
    summary:
      "The detailing studio workflow that produces consistent, premium results across every car that comes through the bay.",
    thumbColor: "#8A2EFF",
    chapters: [
      {
        title: "Intake and inspection",
        body: "Document the vehicle's condition before any work begins. Photograph existing defects, swirls, and damage. Set client expectations based on the inspection — not based on what the client hopes for.",
      },
      {
        title: "Decontamination phase",
        body: "Foam pre-wash with F910 Professional Foam Cleaner. Iron remover. Tar remover. Clay bar. Each step takes the surface one layer closer to bare clear coat.",
      },
      {
        title: "Paint correction",
        body: "Machine polish in stages — cutting compound on a microfiber pad for defect removal, polishing compound on a foam pad for clarity, finishing polish for a wet-look gloss. Inspect under multiple light sources between stages.",
      },
      {
        title: "Protection",
        body: "Wipe down with IPA. Apply F710 Nano Ceramic Coating. Cure under controlled environment. Final inspection. Re-photograph for the client portfolio.",
      },
      {
        title: "The pro difference",
        body: "Consistency. The same products, the same order, the same technique, the same inspection — every car. That's what builds a detailing reputation.",
      },
    ],
    relatedProducts: ["F910", "F710", "F715"],
  },
];

export function getLesson(slug: string) {
  return ACADEMY_LESSONS.find((l) => l.slug === slug);
}

export function getLessonsByTopic(topic: AcademyTopic) {
  return ACADEMY_LESSONS.filter((l) => l.topic === topic);
}
