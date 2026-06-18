/**
 * Flamingo Product Manual content — all 49 entries hand-curated from
 * FLAMINGO PRODUCT MANUAL AND DESCRIPTION.pdf (53 pages, 8.6 MB).
 *
 * The downloadable copy lives at /public/docs/flamingo-product-manual.pdf
 * and is the source of truth. This file mirrors its content for the
 * digital experience at /FLAMINGO-PRODUCTS-MANUAL.
 */

export type ManualCategoryId =
  | "engine-care"
  | "fuel-system-care"
  | "brake-system-care"
  | "interior-care"
  | "exterior-care"
  | "tire-wheel-care"
  | "air-conditioning-care"
  | "car-wash-solutions"
  | "air-fresheners"
  | "accessories";

export interface ManualCategory {
  id: ManualCategoryId;
  name: string;
  tagline: string;
}

export const MANUAL_CATEGORIES: ManualCategory[] = [
  { id: "engine-care", name: "Engine Care", tagline: "Power. Protection. Longevity." },
  { id: "fuel-system-care", name: "Fuel System Care", tagline: "Cleaner combustion, every mile." },
  { id: "brake-system-care", name: "Brake System Care", tagline: "Stopping power, engineered." },
  { id: "interior-care", name: "Interior Care", tagline: "Cabin perfection." },
  { id: "exterior-care", name: "Exterior Care", tagline: "Mirror-shine paint protection." },
  { id: "tire-wheel-care", name: "Tire & Wheel Care", tagline: "Black-as-new, every wash." },
  { id: "air-conditioning-care", name: "Air Conditioning Care", tagline: "Cool, fresh, breathable." },
  { id: "car-wash-solutions", name: "Car Wash Solutions", tagline: "Premium wash chemistry." },
  { id: "air-fresheners", name: "Air Fresheners", tagline: "Long-lasting cabin freshness." },
  { id: "accessories", name: "Accessories", tagline: "Detailing tools that elevate every job." },
];

export interface ManualEntry {
  /** Primary F-code (canonical). */
  code: string;
  /** All listed F-codes for this product (multi-SKU listings). */
  codes: string[];
  name: string;
  shelfLife: string;
  specification: string;
  volumePerCarton?: string;
  description: string;
  directions: string[];
  cautions: string[];
  categoryId: ManualCategoryId;
  /** Optional slug into the existing /products catalog for cross-links. */
  productSlug?: string;
}

export const MANUAL_PRODUCTS: ManualEntry[] = [
  {
    code: "F005",
    codes: ["F005"],
    name: "Carburetor Cleaner",
    shelfLife: "3 Years",
    specification: "450ml × 24pcs",
    volumePerCarton: "0.023 CBM",
    description:
      "Formulated with professional-grade materials, this product effectively removes greasy dirt, gum, and carbon deposits from PCV valves, EGR valves, chokes, and other parts. It easily flushes away charcoal residue on carburetors using its spray tube. The product enhances combustion efficiency, helps save fuel, and reduces gas pollution.",
    directions: [
      "Remove the air filter and spray the exterior carburetor linkage.",
      "To remove gum and varnish from the throttle plate, spray short bursts into the carburetor bowl while the engine is idling.",
      "Automatic Choke: Open and close manually while spraying the choke valve shaft. If it continues to stick, remove the choke cover, start the engine, and spray into the vacuum cylinder while idling.",
      "PCV Valve: Disconnect the crankcase side of the valve and spray short bursts into the exposed end (engine must be cold). Allow to penetrate, then start the engine and spray again.",
      "Manifold Heat Controls: Spray on exposed ends of the heater valve (engine cold). Allow to penetrate, then move the counterweight back and forth until free.",
    ],
    cautions: [],
    categoryId: "fuel-system-care",
    productSlug: "flamingo-carburetor-cleaner",
  },
  {
    code: "F006",
    codes: ["F006"],
    name: "Injector & Choke Cleaner",
    shelfLife: "3 Years",
    specification: "450ml × 24pcs",
    volumePerCarton: "0.023 CBM",
    description:
      "Low-grade fuels and polluted air can cause gum, varnish, and carbon deposits in the carburetor during combustion, leading to rough idling, stalling, and increased fuel consumption. Flamingo Injector & Choke Cleaner's superior formula effectively removes deposits when sprayed directly into the carburetor. It cleans carburetors, linkages, automatic chokes, PCV valves, heat risers, spark plugs, and more — lubricating and removing moisture from moving parts.",
    directions: [
      "Run the engine for 5–10 minutes.",
      "Remove the air cleaner. With engine at high idle (5,000–6,000 rpm), spray into the air horn, flooding choke and throttle shafts and plates.",
      "Deposits will burn away with exhaust gases.",
      "Stop the engine and reinstall the air cleaner.",
      "For fuel-injected systems, spray half a can directly into half a tank of fuel.",
      "One can should last for three applications due to its cleaning efficiency.",
    ],
    cautions: [],
    categoryId: "fuel-system-care",
    productSlug: "flamingo-injector-choke-cleaner",
  },
  {
    code: "F017",
    codes: ["F017"],
    name: "Starting Fluid",
    shelfLife: "3 Years",
    specification: "450ml × 24pcs",
    volumePerCarton: "0.022 CBM",
    description:
      "This professional-grade formula helps start engines quickly and reliably, even in extreme cold (below -40°C) or humid conditions. It is easy to use, safe for engines, and reduces battery and ignition switch wear. Suitable for gasoline and diesel engines in cars, trucks, and boats.",
    directions: [
      "Remove the air filter.",
      "Shake the can well.",
      "Spray into the air intake for 3–5 seconds.",
      "Avoid spillage and then start the engine.",
    ],
    cautions: [],
    categoryId: "engine-care",
    productSlug: "flamingo-starting-fluid",
  },
  {
    code: "F184",
    codes: ["F184", "F071"],
    name: "Power Steering Fluid",
    shelfLife: "3 Years",
    specification: "1L × 12pcs / 443ml × 24pcs",
    volumePerCarton: "0.025 CBM / 0.02 CBM",
    description:
      "This fluid protects the power steering system from overheating, minimizes sludge build-up, prevents corrosion, reduces friction, and improves fuel efficiency.",
    directions: [
      "With the engine off, clean the filler cap area and remove the cap.",
      "Add fluid to the specified level. Do not overfill. Suitable for gasoline and diesel engines.",
      "If leaks persist after repeated treatment, consult a mechanic.",
    ],
    cautions: [
      "May cause lung damage if swallowed.",
      "Repeated exposure may cause skin dryness or cracking.",
      "Harmful to aquatic organisms.",
      "Avoid contact with skin and eyes.",
      "If swallowed, seek immediate medical advice. Keep out of reach of children and animals.",
    ],
    categoryId: "engine-care",
    productSlug: "flamingo-power-steering-fluid",
  },
  {
    code: "F095",
    codes: ["F095"],
    name: "Smoke Stop",
    shelfLife: "3 Years",
    specification: "354ml × 24pcs",
    volumePerCarton: "0.024 CBM",
    description:
      "Improves performance in oil-burning engines. Reduces exhaust smoke and crankcase gases, quiets noisy engines, increases oil viscosity for better compression, and reduces oil blow-by.",
    directions: [
      "Add one bottle to 4–5 quarts of oil between oil changes.",
      "Use between every oil change.",
    ],
    cautions: [],
    categoryId: "engine-care",
    productSlug: "flamingo-smoke-stop",
  },
  {
    code: "F163",
    codes: ["F163"],
    name: "Catalytic System Cleaner",
    shelfLife: "3 Years",
    specification: "300ml × 24pcs",
    volumePerCarton: "0.016 CBM",
    description:
      "Cleans the injection system and combustion chamber. Reduces soot and pollutant emissions, improves fuel efficiency, and prevents corrosion. Safe for catalytic converters and turbochargers.",
    directions: [
      "Add one 300ml can to up to 70L of fuel.",
      "Can be used preventively.",
      "Effect lasts up to 2,000km.",
    ],
    cautions: [],
    categoryId: "fuel-system-care",
    productSlug: "flamingo-catalytic-system-cleaner",
  },
  {
    code: "F173",
    codes: ["F173"],
    name: "Brake Fluid DOT 3",
    shelfLife: "3 Years",
    specification: "250ml × 24pcs",
    volumePerCarton: "0.012 CBM",
    description:
      "Flamingo Brake Fluid DOT 3 is specially formulated for optimum performance in disc or drum brake systems in today's cars and trucks. It helps protect against brake failure caused by vapor lock, prevents corrosion in the brake system, and is compatible with all brake systems requiring DOT 3 fluids.",
    directions: [
      "Clean all dirt from around cover on master cylinder before removing.",
      "Fill unit to level specified by manufacturer.",
      "Replace cover.",
      "Check fluid level once a month.",
      "To bleed system: Refer to service manual. Do not reuse brake fluid from bleeding operation.",
    ],
    cautions: [],
    categoryId: "brake-system-care",
    productSlug: "flamingo-brake-fluid",
  },
  {
    code: "F174",
    codes: ["F174"],
    name: "Brake Fluid DOT 4",
    shelfLife: "3 Years",
    specification: "250ml × 24pcs",
    volumePerCarton: "0.012 CBM",
    description:
      "As brake pads wear, the level of brake fluid drops. Flamingo Synthetic Brake Fluid DOT 4 is specially formulated to deliver optimum performance in disc or drum brake systems in today's cars and trucks. It increases the dry boiling point to ensure maximum lifespan and reliable braking power, provides protection against brake failure caused by vapor lock, helps prevent corrosion in the brake system, and is compatible with all brake systems requiring DOT 4 fluids.",
    directions: [
      "Clean all dirt from around cover on master cylinder before removing.",
      "Fill unit to level specified by manufacturer.",
      "Replace cover.",
      "Check fluid level once a month.",
      "To bleed system: Refer to service manual. Do not reuse brake fluid from bleeding operation.",
    ],
    cautions: [],
    categoryId: "brake-system-care",
  },
  {
    code: "F004",
    codes: ["F004"],
    name: "Dashboard Polish",
    shelfLife: "3 Years",
    specification: "450ml × 24pcs",
    volumePerCarton: "0.023 CBM",
    description:
      "Contains protective polishing wax and is suitable for vehicles, dashboards, leather seats, synthetic leather products, and more. It increases surface gloss and removes dirt effectively. Also suitable for household appliances, furniture, and plastic products. Truly cares for your car — polishing and cleaning are done in one step.",
    directions: [
      "Shake well before using.",
      "Spray evenly at a distance of 15–25 cm.",
      "Gently mop the surface to reveal brightness and glossiness.",
    ],
    cautions: [],
    categoryId: "interior-care",
    productSlug: "flamingo-dashboard-polish",
  },
  {
    code: "F396",
    codes: ["F396"],
    name: "Dashboard Coating",
    shelfLife: "2 Years",
    specification: "300ml × 24pcs",
    volumePerCarton: "0.014 CBM",
    description:
      "Flamingo Dashboard Coating cleans and protects ABS, plastic, vinyl, rubber, and most automotive interior surfaces. It provides a high-gloss, rejuvenating finish while sealing and protecting your dashboard. It helps to reduce color fading, scratches, and oxidation, keeping the dashboard smooth and shiny for a long time. After use, a protective film forms to insulate against dust, food particles, and everyday dirt.",
    directions: [
      "Clean grease and dust from the dashboard surface.",
      "Use a sponge or towel to apply the product thinly and evenly on the dashboard.",
      "After 10 minutes, wipe off any remaining residue with a clean towel or cotton cloth.",
      "The product can be used repeatedly for continued protection.",
    ],
    cautions: [],
    categoryId: "interior-care",
    productSlug: "flamingo-dashboard-coating",
  },
  {
    code: "F301",
    codes: ["F301"],
    name: "Wax & Dry Spray Wax",
    shelfLife: "2 Years",
    specification: "500ml × 12pcs",
    volumePerCarton: "0.019 CBM",
    description:
      "Wash and rinse your car. Skip drying. While the car is still wet, shake the product and spray one panel at a time. Dry and shine simultaneously using a clean towel or microfiber cloth.",
    directions: [],
    cautions: [
      "Eye irritant. If contact occurs, rinse eyes with water for 15 minutes.",
      "Keep out of reach of children.",
      "Do not freeze.",
    ],
    categoryId: "exterior-care",
    productSlug: "flamingo-wax-dry-spray-wax",
  },
  {
    code: "F041",
    codes: ["F041"],
    name: "Car Polish Wax",
    shelfLife: "3 Years",
    specification: "230g × 24pcs",
    volumePerCarton: "0.023 CBM",
    description:
      "Restores and protects vehicle surfaces. Not recommended for vinyl tops, decals, or damaged paint.",
    directions: [
      "Wash and dry car.",
      "Apply using circular motion to one section at a time. Let dry to a haze.",
      "Buff with a soft cloth.",
      "Best results: avoid direct sunlight. Ensure surface is cool before use.",
    ],
    cautions: [],
    categoryId: "exterior-care",
    productSlug: "flamingo-car-polish-wax",
  },
  {
    code: "F043",
    codes: ["F043"],
    name: "Rubbing Compound",
    shelfLife: "3 Years",
    specification: "230g × 24pcs",
    volumePerCarton: "0.023 CBM",
    description:
      "This wax is specially designed to safely and effectively remove fine scratches, swirls, and oxidation on cars of any color. Its gentle abrasives polish the paint surface, revealing brilliant color and clarity. The wax enhances reflection for a lasting turtle classic luster, repairing fine scratches and oxidation while restoring the car paint's natural color.",
    directions: [
      "Wash and dry the car thoroughly before use.",
      "Use the special formula applicator provided.",
      "Apply the product in circular motions, working on one section at a time.",
      "Allow the wax to dry to a haze.",
      "Wipe off with a clean, soft cloth, turning it frequently.",
    ],
    cautions: [
      "Avoid applying in direct sunlight.",
      "Ensure the car surface is cool.",
      "Do not use on vinyl tops, metallized plastic trim, decals, flat black paint, simulated wood panels, or cracked/crazed paint finishes.",
    ],
    categoryId: "exterior-care",
    productSlug: "flamingo-rubbing-compound",
  },
  {
    code: "F044",
    codes: ["F044"],
    name: "Spray Polish Wax",
    shelfLife: "3 Years",
    specification: "450ml × 24pcs",
    volumePerCarton: "0.023 CBM",
    description:
      "Formulated with a new atomized automobile formula that delivers powerful cleaning and polishing performance. It instantly removes dirt, enhances gloss, and leaves your vehicle with a brilliant, lustrous finish. A protective film forms on the surface, offering UV resistance and acid rain protection. Convenient to use — just spray and wipe. Suitable for painted and electroplated surfaces of both automobiles and motorcycles.",
    directions: [
      "Shake well before use.",
      "Spray from a distance of 20–30 cm onto the surface.",
      "Allow the wax film to dry for 10–15 minutes, then wipe with a clean, dry, soft cloth.",
      "Do not apply when the vehicle surface is hot, under direct sunlight, or in dusty environments.",
    ],
    cautions: [],
    categoryId: "exterior-care",
    productSlug: "flamingo-spray-polish-wax",
  },
  {
    code: "F343",
    codes: ["F343"],
    name: "Wash Wax",
    shelfLife: "2 Years",
    specification: "1L × 12pcs",
    description:
      "Flamingo Wash Wax is developed using advanced technology and a proprietary blend of cleaning agents, surface lubricants, and real carnauba wax, guaranteed to meet the highest standards of car care. Delivers an incredible Flamingo Shine, gently lifts away dirt that can cause scratches and swirls, promotes water beading on your car's paint, provides a mirror-like finish as you wash, and reveals your paint's deep, radiant colour.",
    directions: [
      "Use on a cool car, preferably in the shade to avoid sun spotting.",
      "Rinse the car to remove loose dirt.",
      "Pour the wash concentrate into a bucket and mix with water.",
      "Wash the car using a sponge, terry cloth, or mitt.",
      "Rinse thoroughly, then dry immediately with a soft, dry terry cloth or chamois.",
    ],
    cautions: [],
    categoryId: "car-wash-solutions",
    productSlug: "flamingo-car-wash-wax",
  },
  {
    code: "F350",
    codes: ["F350"],
    name: "Car Wash Shampoo",
    shelfLife: "2 Years",
    specification: "1L × 12pcs",
    description:
      "A neutral pH polymer agent with strong cleaning power. Safe for car paint, harmless to the human body, and requires only a small quantity for effective use. After cleaning, your car will have a durable shine. With long-term use, it provides waxing and polishing functions, enhancing the overall finish. This eco-friendly shampoo is fully biodegradable in water and causes no pollution to the environment. Suitable for both hand washing and machine washing.",
    directions: [
      "Machine Washing: Add the shampoo to the middle layer of the washer. Dilute it with water at a ratio of 1:500. Spray the foam evenly over the car's surface and clean as usual.",
      "Hand Washing: Dilute with water at a ratio of 1:300. Soak a clean towel in the solution and use it to wipe the car body. The car will be cleaned and polished in one step.",
    ],
    cautions: [],
    categoryId: "car-wash-solutions",
    productSlug: "flamingo-car-wash-shampoo",
  },
  {
    code: "F200",
    codes: ["F200", "F201"],
    name: "Microfiber Towels",
    shelfLife: "5 Years",
    specification: "60cm × 40cm / 30cm × 40cm",
    volumePerCarton: "48/CTN",
    description:
      "Made with imported microfiber, this towel provides strong cleaning power, rapid water absorption, and a lint-free, scratch-free finish. It effectively removes dust and dirt from car surfaces, glass, instruments, furniture, and more. Exceptionally soft and comfortable to handle.",
    directions: [
      "Wash with warm water after use.",
      "Machine washable.",
      "Do not boil.",
      "Do not use bleach or fabric softeners.",
      "Do not iron.",
    ],
    cautions: [],
    categoryId: "accessories",
    productSlug: "flamingo-microfiber-towel-800g-40x30",
  },
  {
    code: "F205",
    codes: ["F205"],
    name: "Microfiber Towel 50×70",
    shelfLife: "5 Years",
    specification: "50 × 70cm",
    volumePerCarton: "500/CTN",
    description:
      "The secret to a spotless, swirl-free finish lies in your towel. Flamingo Microfiber Towels (50×70CM) are expertly designed to deliver superior cleaning, drying, and polishing performance for both the interior and exterior of your vehicle. With ultra-fine fibers that trap dirt and moisture without scratching, these towels are ideal for detailing professionals and car enthusiasts alike. Soft, absorbent, and built to last, these premium microfiber towels offer excellent value and performance with every use.",
    directions: [
      "High-density microfiber for maximum absorption and cleaning power.",
      "Scratch-free, lint-free, and streak-free performance.",
      "Durable and reusable — machine washable up to 500 times.",
      "Ideal for drying, waxing, buffing, and interior cleaning.",
    ],
    cautions: [],
    categoryId: "accessories",
  },
  {
    code: "F204",
    codes: ["F204"],
    name: "Microfiber Wash Sponge",
    shelfLife: "5 Years",
    specification: "Multi-pack",
    volumePerCarton: "50/CTN",
    description:
      "Made with imported microfiber, this sponge provides strong cleaning power, rapid water absorption, and a lint-free, scratch-free finish. It effectively removes dust and dirt from car surfaces, glass, instruments, furniture, and more. Exceptionally soft and comfortable to handle.",
    directions: [
      "Wash with warm water after use.",
      "Machine washable.",
      "Do not boil.",
      "Do not use bleach or fabric softeners.",
      "Do not iron.",
    ],
    cautions: [],
    categoryId: "accessories",
    productSlug: "flamingo-microfiber-wash-sponge",
  },
  {
    code: "F2025",
    codes: ["F2025"],
    name: "Microfiber Tools Set",
    shelfLife: "5 Years",
    specification: "Multi-piece set",
    volumePerCarton: "50/CTN",
    description:
      "Maintaining your vehicle's interior and exterior has never been easier. Flamingo Microfiber Tools Set is specially crafted to deliver a scratch-free, streak-free clean on every surface. Whether it's glass, paint, dashboard, or wheels, this premium microfiber set lifts dust, dirt, and grease effortlessly without leaving behind lint or residue. Each tool in the set is designed for durability and multiple-use performance.",
    directions: [
      "Ultra-soft microfiber ensures safe, swirl-free cleaning.",
      "Highly absorbent material quickly traps dust and liquids.",
      "Durable and reusable — machine washable.",
      "Suitable for all vehicle surfaces: glass, plastic, leather, and paint.",
    ],
    cautions: [],
    categoryId: "accessories",
    productSlug: "flamingo-microfiber-tool-sets",
  },
  {
    code: "F210",
    codes: ["F210", "F211"],
    name: "PVA Chamois Towels",
    shelfLife: "5 Years",
    specification: "43cm × 32cm / 43cm × 64cm — 100pcs",
    description:
      "Drying towel made from PVA, soft and highly absorbent. Excellent quick drying ability. The soft and smooth surface leaves paint finishes in flawless condition. The towel is stored in a tube which keeps it moist and ready for use — not only for drying cars, but also boats.",
    directions: [],
    cautions: [],
    categoryId: "accessories",
    productSlug: "flamingo-pva-chanmois-towel",
  },
  {
    code: "F360",
    codes: ["F360"],
    name: "Glass Restorer",
    shelfLife: "2 Years",
    specification: "410ml × 24pcs",
    volumePerCarton: "0.019 CBM",
    description:
      "Flamingo Glass Restorer is specially formulated for cleaning and polishing car windscreens and windows. It quickly and effectively removes bug splatter, water spots, tar, and silicone deposits, leaving a crystal-clear finish. It also eliminates wet weather smearing and enhances windscreen wiper performance.",
    directions: [
      "Wash the windscreen before use.",
      "Shake the bottle well.",
      "Apply the product using a sponge in a circular motion.",
      "Once finished, rinse the windscreen thoroughly with clean water.",
    ],
    cautions: [
      "Store in a cool, dry place.",
      "Do not expose to heat or store above 120°F (49°C).",
      "Keep away from flames and avoid direct sunlight.",
      "Avoid contact with eyes. In case of eye contact or ingestion, rinse immediately with clean water and seek medical attention.",
    ],
    categoryId: "exterior-care",
    productSlug: "flamingo-glass-restorer",
  },
  {
    code: "F020",
    codes: ["F020"],
    name: "Air Conditioner Cleaner",
    shelfLife: "2 Years",
    specification: "500ml × 12pcs",
    description:
      "A clean and fresh-smelling car interior starts with a well-maintained air conditioning system. Dirt, mold, and bacteria often build up inside the AC unit, causing unpleasant odors and reduced airflow. Flamingo AC Pro Air Conditioner Cleaner is formulated with advanced cleansing agents to penetrate deep into the evaporator core and eliminate odors at the source. It leaves behind a refreshing scent while restoring optimal air quality and cooling efficiency.",
    directions: [
      "Turn off the engine and air conditioning system before use.",
      "Shake can well before use.",
      "Insert the nozzle into the air vents and spray evenly.",
      "Allow the foam to expand and penetrate the system.",
      "Let sit for 10–15 minutes, then start the engine and run the AC on high for 5–10 minutes.",
      "Use regularly for continuous freshness and optimal AC performance.",
    ],
    cautions: [],
    categoryId: "air-conditioning-care",
    productSlug: "flamingo-air-conditioner-cleaner",
  },
  {
    code: "F010",
    codes: ["F010"],
    name: "Tire Shine",
    shelfLife: "3 Years",
    specification: "500ml × 24pcs",
    volumePerCarton: "0.023 CBM",
    description:
      "A car with brilliantly shiny tires can be absolutely extraordinary. Flamingo Extreme Tire Shine is fortified with a proprietary blend of gloss enhancers to deliver a breathtaking shine and a deep, rich black finish trusted by professional detailers. Our precision applicator is specially designed to deliver smooth, even coverage exactly where it's needed. Extra gloss enhancers for an intense, smooth, and even shine. Conditions, nourishes, and preserves your tires' rich black appearance. Protects against harmful elements that cause cracking and fading. One-step, easy application — no wiping required.",
    directions: [
      "Shake can well before use.",
      "Hold the bottle 8 to 12 inches away from the tire.",
      "Spray evenly onto a clean, dry tire.",
      "Allow the product to dry for at least 5 minutes.",
      "Do not wipe. Any drips or runs will disappear, leaving a brilliant, high-gloss shine.",
    ],
    cautions: [],
    categoryId: "tire-wheel-care",
    productSlug: "flamingo-tire-shine",
  },
  {
    code: "F014",
    codes: ["F014"],
    name: "Wheel & Rim Cleaner",
    shelfLife: "3 Years",
    specification: "500ml × 24pcs",
    volumePerCarton: "0.023 CBM",
    description:
      "Your wheels are constantly exposed to grease, road grime, and brake dust, which get baked on during the intense heat of driving. Our Triple-Action Formula is specially designed to tackle all three — dissolving them quickly and effectively to reveal your wheels' beautiful, shiny finish. Safe for wheels when used as directed.",
    directions: [
      "Clean one wheel at a time.",
      "Wear eye protection and rubber gloves during use.",
      "Wet the cool wheel thoroughly with a hose.",
      "Hold the bottle 6 inches away and completely saturate the wheel with cleaner.",
      "Allow the product to penetrate for 30 seconds.",
      "Wipe with a soft cloth or sponge.",
      "Rinse the wheel thoroughly.",
      "Dry with a soft, clean towel to prevent water spots.",
      "Repeat if necessary for stubborn grime.",
    ],
    cautions: [],
    categoryId: "tire-wheel-care",
    productSlug: "flamingo-wheel-rim-cleaner",
  },
  {
    code: "F306",
    codes: ["F306"],
    name: "Enhanced Wheel & Rim Cleaner",
    shelfLife: "3 Years",
    specification: "500ml × 12pcs",
    volumePerCarton: "0.0160 CBM",
    description:
      "A powerful cleaner formulated for the rapid and effective removal of stubborn dirt such as burnt-in brake dust and road grime from all steel and lacquered aluminium rims and hubcaps. Its innovative colour-changing action shifts from white to red-purple, letting you see it work as it dissolves dirt and grime from your wheels. The unique blend of high-quality ingredients and advanced cleaning technology delivers outstanding results.",
    directions: [
      "Allow the wheels to cool before application.",
      "Spray the cleaner evenly on the wheels and let it sit for 5 minutes.",
      "Rinse thoroughly with water and high pressure.",
      "For very tough dirt, let it sit for up to 5 minutes, then scrub gently with a soft brush.",
    ],
    cautions: [
      "Do not spray on hot wheels.",
      "Do not use under direct sunlight.",
      "Store in a cool, dry place; do not expose to heat or store above 120°F (49°C).",
    ],
    categoryId: "tire-wheel-care",
    productSlug: "flamingo-enhanced-wheel-cleaner",
  },
  {
    code: "F015",
    codes: ["F015"],
    name: "Tire Sealant & Inflator",
    shelfLife: "3 Years",
    specification: "450ml × 24pcs",
    volumePerCarton: "0.024 CBM",
    description:
      "Designed to quickly locate and effectively seal most common punctures and slow leaks. 100% effective for breaches up to 6mm on tubeless rubber tires of cars, motorcycles, and electric bicycles. No jack or tire change is needed. The one-step process inflates and repairs tires in seconds. Can also be used as a preventive measure by filling it into new tires to guard against unexpected leaks. The formula is non-toxic, odourless, non-corrosive, and causes no damage to tires.",
    directions: [
      "If possible, remove the object causing the puncture.",
      "Shake the can well before use.",
      "Firmly screw the connecting tube onto the tire valve.",
      "Hold the can upright with the button facing upwards.",
      "Remove the protective cap and press the button until the tire appears firm.",
      "Once inflation is complete, disconnect both ends of the tube.",
      "Immediately drive 3–5 km to allow the sealant to distribute evenly inside the tire and seal the puncture.",
      "Finally, check and adjust the tire pressure as needed.",
    ],
    cautions: [],
    categoryId: "tire-wheel-care",
    productSlug: "flamingo-tire-sealant-inflator",
  },
  {
    code: "F023",
    codes: ["F023"],
    name: "Rubber Spray",
    shelfLife: "3 Years",
    specification: "450ml × 24pcs",
    volumePerCarton: "0.023 CBM",
    description:
      "A new type of rubber product, this spray forms an excellent elastic film that air-dries quickly at normal room temperature. Once dried, it creates a solid, removable rubber coating that can be peeled off in a single piece. The spray film is colourful, moisture-proof, acid-resistant, corrosion-resistant, and provides insulation. Suitable for use on metal, plastic, stone, ceramic, machinery, ornaments, lamps, picture frames, concrete, desks, chairs, plant pots, precision instruments, windows, doors, and more.",
    directions: [
      "Clean the car hub surface thoroughly to remove dust, dirt, and rust.",
      "Insert playing cards into the gap between the tyre and hub to prevent overspray.",
      "Cover the brake disc and surrounding parts with plastic film and tape.",
      "Shake the can vigorously for 1 to 2 minutes to ensure the contents are fully mixed.",
      "Hold the can 10–15 cm away from the surface and spray evenly.",
      "Allow 15 to 20 minutes between coats. For best results, apply 4 layers.",
    ],
    cautions: [],
    categoryId: "tire-wheel-care",
  },
  {
    code: "F011",
    codes: ["F011"],
    name: "Air Freshener — Mix Smell",
    shelfLife: "2 Years",
    specification: "330ml × 24pcs",
    volumePerCarton: "0.019 CBM",
    description:
      "Flamingo air freshener adopts the newly-developed sterilizing and deodorizing formula and is blended with the world's newest floral fragrance. With unique sterilizing and deodorizing performance, it can quickly and effectively eliminate the odor and smoke to purify the indoor air, leaving the room with pleasant fragrance and ensuring a high level of protection for users' health. Applicable indoors at family, office, hotel, kitchen, toilet, recreation center as well as car, train, and ship.",
    directions: [
      "Shake well each time before use.",
      "Hold the can upright and press the sprayer towards the indoor space.",
      "Do not spray towards people.",
      "If better effect is required, close the doors and windows and then spray for 3 to 5 seconds.",
      "Fragrance-sensitive individuals must leave before the room is enclosed.",
    ],
    cautions: [
      "Read the application instructions carefully before use.",
      "Do not spray directly towards paint surface, dashboard, leather seats and light-coloured garments at short distance to avoid changing their original colours or quality.",
      "Inflammable — store in a shady, cool, dry place between 0–40°C. Keep away from heat sources and flames. Exposure, puncture, or incineration of the can is forbidden.",
    ],
    categoryId: "air-fresheners",
    productSlug: "flamingo-air-freshener-mix-smell",
  },
  {
    code: "F102",
    codes: ["F102"],
    name: "Organic Air Freshener",
    shelfLife: "2 Years",
    specification: "50g × 144pcs",
    volumePerCarton: "0.04 CBM",
    description:
      "To prolong the scent, rotate the scent pads. For maximum strength, remove the scent vent and rotate the scent pads to an upright position. Do not place scented pads on fabric, furniture, plastic, or painted surfaces.",
    directions: [],
    cautions: [
      "Internal edges can be sharp once opened. Handle with care and keep out of reach of children.",
      "After contact with skin, wash immediately with plenty of soap and water.",
      "In case of contact with eyes, rinse immediately with plenty of clean water and seek medical advice.",
      "If swallowed, seek medical attention immediately and show the product label to the doctor.",
    ],
    categoryId: "air-fresheners",
    productSlug: "flamingo-organic-air-freshener",
  },
  {
    code: "F129",
    codes: ["F129"],
    name: "Hanging Air Freshener — Mix Smell",
    shelfLife: "2 Years",
    specification: "50ml × 120pcs",
    volumePerCarton: "0.03 CBM",
    description:
      "Flamingo car air freshener neutralizes odors and freshens the air in small spaces.",
    directions: [],
    cautions: [
      "Keep away from high heat or open flames.",
      "Keep out of reach of children and pets.",
      "Avoid prolonged exposure to direct sunlight.",
      "Store and use below 50°C (122°F).",
    ],
    categoryId: "air-fresheners",
    productSlug: "flamingo-hanging-air-freshener",
  },
  {
    code: "F092",
    codes: ["F092"],
    name: "EVA Air Freshener — Baby Mars",
    shelfLife: "2 Years",
    specification: "5g × 120pcs",
    volumePerCarton: "0.058 CBM",
    description:
      "Flamingo EVA car air freshener. It can fit in all types of cars. Contains an aggressive molecule with long-lasting protection against unpleasant odours.",
    directions: [],
    cautions: [],
    categoryId: "air-fresheners",
    productSlug: "flamingo-eva-air-freshener-baby-mars",
  },
  {
    code: "F310R",
    codes: ["F310R"],
    name: "Fresh Spray Rose",
    shelfLife: "2 Years",
    specification: "500ml × 12pcs",
    volumePerCarton: "0.019 CBM",
    description:
      "Flamingo Fresh Spray adopts a newly developed sterilising and deodorising formula, blended with the world's newest floral fragrance. With its unique performance, it quickly and effectively eliminates odours and smoke, purifying indoor air and leaving behind a pleasant fragrance. Suitable for use in homes, offices, hotels, kitchens, toilets, recreation centres, as well as in cars, trains, and ships.",
    directions: [
      "Shake well before each use.",
      "Fragrance-sensitive individuals should leave the room before it is enclosed.",
    ],
    cautions: [
      "If sprayed into the eyes, rinse immediately with running water and seek medical attention.",
      "Keep out of reach of children and animals.",
    ],
    categoryId: "air-fresheners",
    productSlug: "flamingo-fresh-spray-rose",
  },
  {
    code: "F330",
    codes: ["F330", "F382"],
    name: "Radiator Coolant — Red & Blue",
    shelfLife: "3 Years",
    specification: "5L × 4pcs / 2L × 6pcs",
    volumePerCarton: "0.038 CBM / 0.0180 CBM",
    description:
      "As an additive, Flamingo Radiator Coolant is highly efficient in improving the heat conduction function of cooling liquid in the cooling system and preventing engines from overheating. Compatible with all anti-freezers and cooling water. Changing the cooling water in the radiator yearly provides the best protection to the radiator and parts.",
    directions: [
      "Drain out the existing coolant and thoroughly rinse the inside of the radiator.",
      "Pour in Flamingo Radiator Coolant until the liquid level reaches the cold fill line.",
      "Start the engine and let it idle for about 5 minutes.",
      "If the coolant level drops, top up until it is approximately 3 cm (1.2 inches) below the overflow pipe.",
      "Always maintain the specified level, as the coolant expands when the temperature rises.",
    ],
    cautions: [
      "Store in a cool, dry place.",
      "Do not expose to heat or store at temperatures above 120°F (49°C).",
      "Avoid direct sunlight.",
      "Prevent contact with eyes. In case of eye contact or accidental ingestion, rinse thoroughly with running water and seek medical attention immediately.",
    ],
    categoryId: "engine-care",
    productSlug: "flamingo-radiator-coolant",
  },
  {
    code: "F5245SL",
    codes: ["F5245SL", "F1245SL"],
    name: "Mineral Motor Oil 20W-50",
    shelfLife: "3 Years",
    specification: "4L × 4pcs / 1L × 12pcs",
    volumePerCarton: "0.038 CBM / 0.025 CBM",
    description:
      "FMO Eco for Gasoline and Diesel Engine. Meets or exceeds API SL/CF and API SJ/CF. Recommended for high-mileage vehicles of 100,000 km gasoline & diesel pick-ups at temperatures above -15°C; European cars and other vehicles requiring viscosity grade 20W-50 under API SL/CF without emission systems; also suitable for scooters per manufacturer's operating guide.",
    directions: [],
    cautions: [],
    categoryId: "engine-care",
    productSlug: "flamingo-motor-oil-20w-50",
  },
  {
    code: "F5213G6",
    codes: ["F5213G6", "F1213G6"],
    name: "Synthetic Motor Oil 5W-30",
    shelfLife: "3 Years",
    specification: "4L × 4pcs / 1L × 12pcs",
    volumePerCarton: "0.038 CBM / 0.025 CBM",
    description:
      "FMO Pro for Gasoline Engine. Meets or exceeds ILSAC GF-6, API SP, GM DEXOS1 GEN 2. Recommended for modern gasoline or hybrid passenger cars and vans from GM, Ford, Toyota, Honda, Nissan, Mazda, Suzuki, Hyundai, Kia, Chery, Geely, Haval, and other vehicles requiring viscosity grade 5W-30 SP/SN PLUS/SN/SM/SL.",
    directions: [],
    cautions: [],
    categoryId: "engine-care",
    productSlug: "flamingo-motor-oil-5w-30-semi-synthetic",
  },
  {
    code: "F5313DE",
    codes: ["F5313DE", "F1313DE"],
    name: "Full Synthetic Motor Oil 5W-30",
    shelfLife: "3 Years",
    specification: "4L × 4pcs / 1L × 12pcs",
    volumePerCarton: "0.038 CBM / 0.025 CBM",
    description:
      "FMO Plus for Gasoline Engine. Meets or exceeds ILSAC GF-6, API SP, GM DEXOS1 GEN 2. Recommended for modern gasoline or hybrid passenger cars and vans from GM, Ford, Toyota, Honda, Nissan, Mazda, Suzuki, Hyundai, Kia, Chery, Geely, Haval, and other vehicles requiring viscosity grade 5W-30 SP/SN PLUS/SN/SM/SL.",
    directions: [],
    cautions: [],
    categoryId: "engine-care",
    productSlug: "flamingo-motor-oil-full-synthetic",
  },
  {
    code: "F5302DE",
    codes: ["F5302DE", "F1302DE"],
    name: "Full Synthetic Motor Oil 0W-20",
    shelfLife: "3 Years",
    specification: "4L × 4pcs / 1L × 12pcs",
    volumePerCarton: "0.038 CBM / 0.025 CBM",
    description:
      "FMO Plus for Gasoline/Hybrid Engines. Meets or exceeds ILSAC GF-6A, API SP/SP RC, GM DEXOS1 GEN3, GM 6094M, GM DEXOS1 GEN2, FORD WSS-M2C960-A1/961-A1/962-A1/963-A1, FORD WSS-M2C945-A/946-A/947-A, FORD WSS-M2C945-B1/946-B1/947-B1/953-B1, CHRYSLER MS 6395. Recommended for modern gasoline or hybrid passenger cars and vans from Ford, GM, Chrysler, Toyota, Honda, Nissan, Suzuki, Mazda, Hyundai, Kia, Chery, Geely, Haval, and other vehicles requiring viscosity grade 0W-20 SP/SN.",
    directions: [],
    cautions: [],
    categoryId: "engine-care",
    productSlug: "flamingo-motor-oil-0w-20",
  },
  {
    code: "F5404B4",
    codes: ["F5404B4", "F1404B4"],
    name: "Full Synthetic Motor Oil 0W-40",
    shelfLife: "3 Years",
    specification: "4L × 4pcs / 1L × 12pcs",
    volumePerCarton: "0.038 CBM / 0.025 CBM",
    description:
      "FMO Ultra for Gasoline and Diesel Engine. Meets or exceeds ACEA A3/B4-21, API SP, MB 229.3/229.5, VW 502.00/505.00, BMW LL01, RN0710/0700, PORSCHE A40, FORD WSS-M2C937-A, GM-LL-A-025/B-025, FIAT 9.55535-S2. Recommended for gasoline or diesel passenger cars and vans without emission systems (GPF/DPF) from Volkswagen, Mercedes, Renault, Porsche, Ford, Fiat, BMW, GM.",
    directions: [],
    cautions: [],
    categoryId: "engine-care",
    productSlug: "flamingo-motor-oil-0w-40",
  },
  {
    code: "F1S35AT",
    codes: ["F1S35AT"],
    name: "Synthetic Automatic Transmission Fluid ATF 5",
    shelfLife: "3 Years",
    specification: "1L × 12pcs",
    volumePerCarton: "0.0223 CBM",
    description:
      "FMO Plus for Automatic Transmission. Meets or exceeds DEXRON III-H, MERCON, ALLISON C-4, TOYOTA T-II/T-III/T-IV. Recommended for modern automatic transmissions including those in vehicles from Ford, GM, Honda, Chrysler, Hyundai, Kia, Toyota, Mitsubishi, Nissan, Suzuki, Mazda, Subaru, and others requiring ATF DEXRON/MERCON-compatible fluid.",
    directions: [],
    cautions: [],
    categoryId: "engine-care",
    productSlug: "flamingo-synthetic-automatic-transmission-fluid-atf-5",
  },
  {
    code: "F1379AT",
    codes: ["F1379AT"],
    name: "Full Synthetic Automatic Transmission Fluid ATF 9",
    shelfLife: "3 Years",
    specification: "1L × 12pcs",
    volumePerCarton: "0.0223 CBM",
    description:
      "FMO Plus for Automatic Transmission. Meets or exceeds DEXRON VI, MERCON LV, TOYOTA WS, HONDA DW-1, NISSAN MATIC-S. Recommended for modern 6- to 10-speed automatic transmissions including GM, Ford, Kia, Nissan, VW, Subaru, Mazda, BMW, Toyota, Honda, Hyundai, Mercedes-Benz, and others requiring low-viscosity ATF such as ATF VI, LV, or WS.",
    directions: [],
    cautions: [],
    categoryId: "engine-care",
    productSlug: "flamingo-fully-synthetic-automatic-transmission-fluid-atf-9",
  },
  {
    code: "F002",
    codes: ["F002"],
    name: "Foam Cleaner",
    shelfLife: "3 Years",
    specification: "650ml × 24pcs",
    volumePerCarton: "0.023 CBM",
    description:
      "Flamingo Multi-Purpose Foam Cleaner is specially formulated with active foam technology that penetrates deep into surfaces to lift dirt, grease, and stubborn stains effortlessly. Unlike ordinary cleaners, it leaves no residue and restores surfaces to their original fresh look. Perfect for both automotive and household use, it delivers professional-grade cleaning with a pleasant long-lasting fragrance.",
    directions: [
      "Shake can well before use.",
      "Spray evenly onto the surface to be cleaned.",
      "Allow foam to sit for 30–40 seconds.",
      "Wipe or scrub gently with a soft cloth or brush.",
      "Wipe clean with a dry cloth for a spotless finish.",
    ],
    cautions: [],
    categoryId: "interior-care",
    productSlug: "flamingo-foam-cleaner",
  },
  {
    code: "F021",
    codes: ["F021"],
    name: "Rubberized Undercoat",
    shelfLife: "3 Years",
    specification: "500ml × 24pcs",
    volumePerCarton: "0.023 CBM",
    description:
      "Flamingo Rubberized Undercoat is specially formulated to provide a tough, flexible coating that shields your car's underbody from rust, stone chips, moisture, and road debris. Its advanced rubberized formula creates a long-lasting protective barrier while also reducing road noise for a quieter ride. Ideal for both professional auto detailing and everyday vehicle maintenance.",
    directions: [
      "Clean and dry the surface thoroughly before application.",
      "Shake can well for at least 1–2 minutes.",
      "Hold can 20–30 cm away from the surface.",
      "Spray evenly in thin layers for best results.",
      "Allow each coat to dry before applying additional layers.",
      "Let it cure completely before exposing to water or heavy use.",
    ],
    cautions: [],
    categoryId: "exterior-care",
    productSlug: "flamingo-rubberized-undercoat",
  },
  {
    code: "F189",
    codes: ["F189"],
    name: "Hi-Temp RTV Silicone Gasket (Grey)",
    shelfLife: "3 Years",
    specification: "85g × 144pcs",
    volumePerCarton: "0.015 CBM",
    description:
      "Flamingo HI-TEMP RTV Silicone Gasket (Grey) is engineered to form durable, leak-proof seals that withstand extreme temperatures and harsh engine conditions. Its advanced low-volatile formula ensures strong adhesion without corrosion, making it safe for modern engines with sensors. Ideal for creating or replacing gaskets in automotive, mechanical, and industrial applications. Withstands high temperatures from -65°F to 650°F (intermittent), non-corrosive and sensor-safe formulation.",
    directions: [
      "Clean and dry the surface thoroughly before application.",
      "Apply a continuous, even bead to the surface.",
      "Assemble parts immediately or within a few minutes.",
      "Allow sealant to cure (typically 24 hours for full strength).",
      "Avoid exposure to oil or pressure before full curing.",
    ],
    cautions: [],
    categoryId: "engine-care",
    productSlug: "flamingo-rtv-silicone-gasket-maker",
  },
  {
    code: "F053",
    codes: ["F053"],
    name: "Fuel Injector Cleaner",
    shelfLife: "3 Years",
    specification: "354ml × 24pcs",
    volumePerCarton: "0.020 CBM",
    description:
      "A clean fuel system keeps your engine running at peak performance. Flamingo Fuel Injector Cleaner is specially formulated to remove carbon deposits, varnish, and contaminants from fuel injectors, intake valves, and combustion chambers. It restores engine efficiency, improves fuel economy, and ensures smoother acceleration while reducing harmful emissions. Ideal for regular maintenance of petrol engines.",
    directions: [
      "Pour entire contents into the fuel tank before refueling.",
      "Fill tank with petrol after adding the cleaner.",
      "One bottle treats a full tank (40–60L).",
      "Use every 3,000–5,000 km for best results.",
      "Suitable for all petrol fuel injection engines.",
    ],
    cautions: [],
    categoryId: "fuel-system-care",
    productSlug: "flamingo-fuel-injector-cleaner",
  },
  {
    code: "F1212SP",
    codes: ["F1212SP", "F5212SP"],
    name: "Motor Oil 5W-20",
    shelfLife: "5 Years",
    specification: "5L × 4pcs / 1L × 12pcs",
    volumePerCarton: "0.035 CBM",
    description:
      "Flamingo 5W-20 Engine Oil is a high-performance lubricant designed to deliver superior engine protection, improved fuel efficiency, and smooth performance under all driving conditions. Its advanced formulation reduces friction and wear while maintaining engine cleanliness, making it ideal for modern petrol engines requiring low-viscosity oil.",
    directions: [
      "Ensure engine is cool before oil change.",
      "Drain old engine oil completely.",
      "Replace oil filter if necessary.",
      "Pour recommended quantity of Flamingo 5W-20 engine oil.",
      "Check oil level using dipstick and adjust if needed.",
      "Follow manufacturer's recommended service intervals.",
    ],
    cautions: [],
    categoryId: "engine-care",
    productSlug: "flamingo-motor-oil-5w-20",
  },
  {
    code: "F-EVA",
    codes: ["F-EVA"],
    name: "Flamingo EVA Air Fresheners (Lucky Dog / Butterfly / Cat / Dog / Koala)",
    shelfLife: "3 Years",
    specification: "12pcs × 10 boxes",
    volumePerCarton: "0.018 CBM",
    description:
      "Flamingo Air Fresheners come in fun and attractive designs like Lucky Dog, Butterfly, Cat, Dog, and Koala — bringing both fragrance and personality to your environment. Formulated with long-lasting scent technology, they effectively eliminate unpleasant odors and keep your car, home, or office smelling clean and refreshing.",
    directions: [
      "Remove air freshener from packaging.",
      "Hang freely in desired location (rearview mirror, room hook, etc.).",
      "Avoid direct contact with surfaces.",
      "Adjust exposure level for desired fragrance strength.",
      "Replace when fragrance fades.",
    ],
    cautions: [],
    categoryId: "air-fresheners",
    productSlug: "flamingo-eva-car-air-freshener",
  },
  {
    code: "F132",
    codes: ["F132"],
    name: "Fuel System Cleaner",
    shelfLife: "3 Years",
    specification: "473ml × 12pcs",
    volumePerCarton: "0.022 CBM",
    description:
      "Flamingo Fuel System Cleaner is a powerful additive designed to clean the entire fuel system including injectors, intake valves, and combustion chambers. It removes carbon deposits, improves combustion efficiency, and restores engine performance while helping to reduce fuel consumption and emissions.",
    directions: [
      "Pour entire contents into fuel tank before refueling.",
      "Fill tank with petrol after adding the cleaner.",
      "One bottle treats a full tank (50–70L).",
      "Use every 3,000–5,000 km for best performance.",
      "Suitable for all petrol engines.",
    ],
    cautions: [],
    categoryId: "fuel-system-care",
    productSlug: "flamingo-fuel-system-cleaner",
  },
  {
    code: "F205-CANTON",
    codes: ["F205-CANTON"],
    name: "Canton Microfiber Towel",
    shelfLife: "5 Years",
    specification: "1pc / 12pcs / bulk",
    volumePerCarton: "500/CTN",
    description:
      "Flamingo Canton Microfiber Towel is made from high-quality microfiber material, designed to deliver superior cleaning performance for automotive care. Its thick, soft \"canton\" texture enhances absorbency and ensures a scratch-free, lint-free finish on all surfaces. Ideal for both professional detailers and everyday car maintenance, it effectively removes dirt, dust, and moisture while protecting your vehicle's paint and interior.",
    directions: [
      "Use dry for dusting and polishing surfaces.",
      "Use damp for cleaning and wiping dirt.",
      "Ideal for car body, glass, dashboard, and interior surfaces.",
      "Wash after use and air dry for reuse.",
    ],
    cautions: [],
    categoryId: "accessories",
    productSlug: "flamingo-canton-towel",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Page-level copy
// ─────────────────────────────────────────────────────────────────────

export const MANUAL_HERO = {
  eyebrow: "Product Manual Details",
  headline: "FLAMINGO PRODUCTS MANUAL",
  headlineAccent: "DETAILS.",
  subhead:
    "Explore our complete automotive care catalogue — product specifications, application guides, maintenance solutions, and professional detailing products.",
  primaryCta: { label: "Download Complete Manual", href: "/docs/flamingo-product-manual.pdf" },
  secondaryCta: { label: "View Online", href: "/FLAMINGO-PRODUCTS-MANUAL" },
  tertiaryCta: { label: "Explore Products", href: "#categories" },
} as const;

export const ABOUT_FLAMINGO = {
  eyebrow: "About Flamingo",
  headline: "ENGINEERED FOR",
  headlineAccent: "PERFORMANCE.",
  body: [
    "Flamingo Car Care Tech Co., Ltd. specialises in the research, development, and production of car care products, spray paints, industrial cleaning agents, and surface treatment technologies.",
    "The production facility spans nearly 30,000 square metres and is equipped with state-of-the-art production equipment imported from the USA, Germany, and Switzerland. Six fully automated aerosol lines, plus dedicated paste, liquid, and wax emulsification facilities, drive a daily production capacity of 150,000 cans.",
    "In Nigeria, Flamingo Car Care Products Nigeria carries this legacy forward — bridging global quality standards and local needs across exterior care, interior care, engine fluids, and general maintenance.",
  ],
} as const;

export interface ManualStat {
  value: number;
  suffix: string;
  label: string;
  formatted: string;
}

export const ABOUT_FLAMINGO_STATS: ManualStat[] = [
  { value: 30000, suffix: " m²", label: "Manufacturing facility", formatted: "30,000 m²" },
  { value: 150000, suffix: "", label: "Cans / day capacity", formatted: "150,000" },
  { value: 9001, suffix: "", label: "ISO Quality Management", formatted: "ISO 9001" },
  { value: 14001, suffix: "", label: "ISO Environmental Management", formatted: "ISO 14001" },
];

export interface ManualCertification {
  id: string;
  title: string;
  issuer: string;
  body: string;
  badge: string;
}

export const MANUAL_CERTIFICATIONS: ManualCertification[] = [
  {
    id: "iso-9001",
    title: "ISO 9001",
    issuer: "International Organization for Standardization",
    body: "Quality Management System certification. Independent verification that Flamingo's design, manufacturing, and quality-control processes meet international standards.",
    badge: "Quality Management",
  },
  {
    id: "iso-14001",
    title: "ISO 14001",
    issuer: "International Organization for Standardization",
    body: "Environmental Management System certification. Recognises that Flamingo's production processes minimise environmental impact and meet global sustainability standards.",
    badge: "Environmental Management",
  },
];

export const FEATURED_MANUAL_CODES: string[] = [
  "F010", // Tire Shine
  "F014", // Wheel & Rim Cleaner
  "F396", // Dashboard Coating
  "F343", // Wash Wax
  "F350", // Car Wash Shampoo
  "F360", // Glass Restorer
  "F020", // Air Conditioner Cleaner
  "F330", // Radiator Coolant
];

export const MANUAL_DOWNLOAD = {
  href: "/docs/flamingo-product-manual.pdf",
  filename: "Flamingo Product Manual.pdf",
  pages: 53,
  facts: [
    { label: "Pages", value: "53" },
    { label: "Product Specifications", value: "49 Entries" },
    { label: "Usage Guides", value: "Step-by-Step" },
    { label: "Technical Information", value: "Included" },
  ],
} as const;

export const MANUAL_SUPPORT = [
  {
    id: "whatsapp",
    label: "WhatsApp Support",
    description: "Chat with our product team in real time.",
    cta: "Open WhatsApp",
    type: "whatsapp" as const,
  },
  {
    id: "email",
    label: "Email Support",
    description: "Reach the sales desk for orders, samples, and quotes.",
    cta: "Email Us",
    type: "email" as const,
  },
  {
    id: "distributor",
    label: "Distributor Support",
    description: "Become a regional or wholesale distributor.",
    cta: "Apply Now",
    type: "distributor" as const,
  },
  {
    id: "products",
    label: "Product Information",
    description: "Explore the full catalogue with images and specs.",
    cta: "Open Catalogue",
    type: "products" as const,
  },
];

export function getManualEntry(code: string): ManualEntry | undefined {
  const target = code.toUpperCase();
  return MANUAL_PRODUCTS.find((p) => p.codes.some((c) => c.toUpperCase() === target));
}

export function getManualEntriesByCategory(id: ManualCategoryId): ManualEntry[] {
  return MANUAL_PRODUCTS.filter((p) => p.categoryId === id);
}
