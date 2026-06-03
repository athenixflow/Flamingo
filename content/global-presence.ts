export type DistributorStatus = "available" | "coming-soon";

export interface Country {
  code: string; // ISO 3166-1 alpha-3
  name: string;
  region: "Americas" | "Europe" | "Asia" | "Middle East" | "Africa" | "Oceania";
  status: DistributorStatus;
  distributor?: string;
  city?: string;
  // approximate centroid (lon, lat) for the SVG world map
  coords: [number, number];
}

export const COUNTRIES: Country[] = [
  { code: "USA", name: "United States", region: "Americas", status: "available", distributor: "Flamingo USA", city: "Los Angeles", coords: [-95.7, 37.0] },
  { code: "CAN", name: "Canada", region: "Americas", status: "available", distributor: "Flamingo Canada", city: "Toronto", coords: [-106.3, 56.1] },
  { code: "MEX", name: "Mexico", region: "Americas", status: "available", distributor: "Flamingo MX", city: "Mexico City", coords: [-102.5, 23.6] },
  { code: "BRA", name: "Brazil", region: "Americas", status: "coming-soon", coords: [-51.9, -14.2] },
  { code: "GBR", name: "United Kingdom", region: "Europe", status: "available", distributor: "Flamingo UK", city: "London", coords: [-3.4, 55.3] },
  { code: "DEU", name: "Germany", region: "Europe", status: "available", distributor: "Flamingo EU", city: "Berlin", coords: [10.4, 51.1] },
  { code: "FRA", name: "France", region: "Europe", status: "available", distributor: "Flamingo FR", city: "Paris", coords: [2.2, 46.2] },
  { code: "ESP", name: "Spain", region: "Europe", status: "coming-soon", coords: [-3.7, 40.4] },
  { code: "ARE", name: "United Arab Emirates", region: "Middle East", status: "available", distributor: "Flamingo Gulf", city: "Dubai", coords: [53.8, 23.4] },
  { code: "SAU", name: "Saudi Arabia", region: "Middle East", status: "available", distributor: "Flamingo KSA", city: "Riyadh", coords: [45.0, 23.8] },
  { code: "JPN", name: "Japan", region: "Asia", status: "available", distributor: "Flamingo Japan", city: "Tokyo", coords: [138.2, 36.2] },
  { code: "CHN", name: "China", region: "Asia", status: "available", distributor: "Flamingo China", city: "Shanghai", coords: [104.1, 35.8] },
  { code: "NGA", name: "Nigeria", region: "Africa", status: "available", distributor: "HQ — Manufacturing", city: "Lagos", coords: [3.38, 6.52] },
  { code: "KOR", name: "South Korea", region: "Asia", status: "available", distributor: "Flamingo Korea", city: "Seoul", coords: [127.7, 35.9] },
  { code: "PHL", name: "Philippines", region: "Asia", status: "available", distributor: "Flamingo PH", city: "Manila", coords: [121.7, 12.8] },
  { code: "IDN", name: "Indonesia", region: "Asia", status: "available", distributor: "Flamingo ID", city: "Jakarta", coords: [113.9, -0.7] },
  { code: "IND", name: "India", region: "Asia", status: "coming-soon", coords: [78.9, 20.5] },
  { code: "ZAF", name: "South Africa", region: "Africa", status: "available", distributor: "Flamingo Africa", city: "Johannesburg", coords: [22.9, -30.5] },
  { code: "AUS", name: "Australia", region: "Oceania", status: "available", distributor: "Flamingo AU", city: "Sydney", coords: [133.7, -25.2] },
];

export const STATS = {
  countries: COUNTRIES.filter((c) => c.status === "available").length,
  regions: 6,
  oemPartners: "60+",
};
