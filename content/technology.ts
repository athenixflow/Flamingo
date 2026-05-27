export type TechVizType = "molecular" | "hydrophobic" | "layered" | "uv";

export interface TechPillar {
  id: string;
  name: string;
  hero: string;
  scienceCopy: string;
  bullets: string[];
  vizType: TechVizType;
  accent: string;
}

export const TECH_PILLARS: TechPillar[] = [
  {
    id: "nano-particles",
    name: "Microscopic Nano Particle Technology",
    hero: "Smaller than a wavelength of light. Larger than the molecular flaws it fills.",
    scienceCopy:
      "Our restoration formulas — including the F311 Plastic Restorer — carry microscopic nano particles that penetrate deeply into porous trim surfaces. At this scale, particles fill the micro-fissures left behind by UV oxidation and re-establish the optical density that makes 'faded' plastic look black again.",
    bullets: [
      "Sub-micron carrier suspension",
      "Penetrates oxidized surface micro-fissures",
      "Restores optical density without surface film",
      "Works on any trim color — not just black",
    ],
    vizType: "molecular",
    accent: "#E50982",
  },
  {
    id: "polymer-silicone",
    name: "Waterproof Polymer + Ozone Formula",
    hero: "A silicone backbone engineered to outlast the seasons.",
    scienceCopy:
      "The polymer silicone formula at the heart of our tire-shine chemistry — F010, F085, F353, F354 — is built around long hydrophobic chains that bond to rubber sidewalls and shed water on contact. The ozone-stabilized carrier penetrates pores and creates a flexible protective skin that flexes with the tire instead of cracking off.",
    bullets: [
      "Long-chain hydrophobic polymer",
      "Ozone-stabilized carrier",
      "Bonds to vinyl, rubber, and plastic",
      "UV-blocking surface layer",
    ],
    vizType: "hydrophobic",
    accent: "#00CFFF",
  },
  {
    id: "sio2-ceramic",
    name: "9H SiO₂ Ceramic Coating",
    hero: "Molecular bonding. 9H surface hardness. 24+ months of protection.",
    scienceCopy:
      "Silicon dioxide (SiO₂) — the same chemistry as quartz — crystallizes during cure to form a transparent ceramic shell with 9H surface hardness. The coating bonds covalently to the paint clear coat, creating a permanent layer that resists chemical etching, UV degradation, and minor scratch impacts.",
    bullets: [
      "Covalent SiO₂ bond to clear coat",
      "9H Mohs surface hardness",
      "Hydrophobic + oleophobic surface tension",
      "24+ months proven durability",
    ],
    vizType: "layered",
    accent: "#8A2EFF",
  },
  {
    id: "uv-stable",
    name: "UV-Stable Protection Chemistry",
    hero: "The sun is the slowest, most patient enemy your paint will ever face.",
    scienceCopy:
      "Every Flamingo protection product — from spray sealants to ceramic coatings to plastic restorers — incorporates UV-absorbing additives that intercept the high-energy photons responsible for paint chalking, plastic fading, and rubber cracking. Protection isn't just water beading; it's photon management.",
    bullets: [
      "UV-absorbing additive package",
      "Prevents paint oxidation",
      "Stops plastic chalking",
      "Reduces rubber crack propagation",
    ],
    vizType: "uv",
    accent: "#E50982",
  },
];
