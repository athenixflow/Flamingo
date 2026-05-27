export type InquiryType = "consumer" | "distributor" | "oem";

export interface InquiryOption {
  id: InquiryType;
  label: string;
  description: string;
}

export const INQUIRY_OPTIONS: InquiryOption[] = [
  {
    id: "consumer",
    label: "Consumer Question",
    description:
      "Product advice, where-to-buy questions, application help.",
  },
  {
    id: "distributor",
    label: "Distributor / Wholesale",
    description:
      "Open a wholesale account or become a regional distributor.",
  },
  {
    id: "oem",
    label: "OEM / ODM Manufacturing",
    description:
      "Private-label production or custom formulation manufacturing.",
  },
];

export interface Office {
  region: string;
  city: string;
  role: string;
  email?: string;
  phone?: string;
}

export const OFFICES: Office[] = [
  {
    region: "Headquarters",
    city: "Guangzhou, China",
    role: "Manufacturing & R&D",
    email: "info@flamingocarcare.com",
  },
  {
    region: "Americas",
    city: "Los Angeles, USA",
    role: "Regional distribution",
    email: "americas@flamingocarcare.com",
  },
  {
    region: "Europe",
    city: "Berlin, Germany",
    role: "Regional distribution",
    email: "eu@flamingocarcare.com",
  },
  {
    region: "Middle East",
    city: "Dubai, UAE",
    role: "Regional distribution",
    email: "gulf@flamingocarcare.com",
  },
  {
    region: "Asia Pacific",
    city: "Tokyo, Japan",
    role: "Regional distribution",
    email: "apac@flamingocarcare.com",
  },
];
