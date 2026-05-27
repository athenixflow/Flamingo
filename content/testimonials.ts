export interface Testimonial {
  id: string;
  handle: string;
  platform: "Instagram" | "TikTok" | "YouTube" | "Distributor";
  quote: string;
  context?: string;
  posterColor: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    handle: "@detail.studio",
    platform: "Instagram",
    quote: "The Tire Gel finish lasted six washes. We've switched the whole shop over.",
    context: "Tire Gel F354",
    posterColor: "#E50982",
  },
  {
    id: "t2",
    handle: "@autospec_ph",
    platform: "TikTok",
    quote: "Plastic Restorer on a 12-year-old daily — looks brand new. No greasy residue.",
    context: "Plastic Restorer F311",
    posterColor: "#8A2EFF",
  },
  {
    id: "t3",
    handle: "@ceramicworks",
    platform: "YouTube",
    quote: "9H beads water like quartz. Two-year-old Tesla still glassy.",
    context: "Nano Ceramic Coating F710",
    posterColor: "#00CFFF",
  },
  {
    id: "t4",
    handle: "Distributor — Dubai",
    platform: "Distributor",
    quote: "Consistent OEM quality on every container. That's why we re-order.",
    context: "Wholesale partnership",
    posterColor: "#E50982",
  },
  {
    id: "t5",
    handle: "@dailydriven_mx",
    platform: "Instagram",
    quote: "Wheel cleaner turns purple on contact with brake dust. Wild to watch.",
    context: "Wheel & Rim Cleaner F014",
    posterColor: "#8A2EFF",
  },
  {
    id: "t6",
    handle: "@hyperdetail",
    platform: "YouTube",
    quote: "Spray sealant in one pass beat my paste wax on the gloss meter. I'm sold.",
    context: "Spray Paint Sealant F510",
    posterColor: "#00CFFF",
  },
  {
    id: "t7",
    handle: "@enginebay.club",
    platform: "Instagram",
    quote: "Pro Foam Cleaner is what the shop next door uses. Now I do too.",
    context: "Professional Foam Cleaner F910",
    posterColor: "#E50982",
  },
  {
    id: "t8",
    handle: "Distributor — Germany",
    platform: "Distributor",
    quote: "The OEM line gave us our private-label launch in 90 days. Reliable partner.",
    context: "OEM/ODM",
    posterColor: "#8A2EFF",
  },
];
