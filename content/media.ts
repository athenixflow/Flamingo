export interface CampaignReel {
  id: string;
  title: string;
  copy: string;
  posterColor: string;
  duration: string;
  category: "Brand" | "Product" | "Behind The Scenes" | "Distributor";
}

export const CAMPAIGN_REELS: CampaignReel[] = [
  {
    id: "protect-the-machine",
    title: "Protect The Machine.",
    copy: "The flagship campaign film. Cinematic visualization of every Flamingo protection technology working in concert.",
    posterColor: "#E50982",
    duration: "1:42",
    category: "Brand",
  },
  {
    id: "ceramic-cure",
    title: "Ceramic Cure",
    copy: "F710 Nano Ceramic Coating, in macro. Watch SiO₂ crystallize on paint in real time.",
    posterColor: "#8A2EFF",
    duration: "0:58",
    category: "Product",
  },
  {
    id: "tire-tech",
    title: "Hydrophobic Tire Tech",
    copy: "Polymer + ozone formula sheds water on contact. Slow-motion at 240fps.",
    posterColor: "#00CFFF",
    duration: "1:12",
    category: "Product",
  },
  {
    id: "studio-tour",
    title: "Inside the Manufacturing Studio",
    copy: "A walk through the OEM/ODM facility — where 60+ global brands have their chemistry produced.",
    posterColor: "#B8B8B8",
    duration: "2:30",
    category: "Behind The Scenes",
  },
  {
    id: "dubai-launch",
    title: "Dubai Distributor Launch",
    copy: "Flamingo Gulf opening event. A first look at the Middle East flagship.",
    posterColor: "#E50982",
    duration: "1:05",
    category: "Distributor",
  },
  {
    id: "plastic-restorer",
    title: "F311 Restoration Story",
    copy: "A 14-year-old daily driver. One application. Side-by-side before and after.",
    posterColor: "#8A2EFF",
    duration: "0:46",
    category: "Product",
  },
];
