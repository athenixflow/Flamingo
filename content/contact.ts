export type InquiryType = "general" | "distributor";

export interface InquiryOption {
  id: InquiryType;
  label: string;
  description: string;
  submitLabel: string;
  emailSubject: string;
}

export const INQUIRY_OPTIONS: InquiryOption[] = [
  {
    id: "general",
    label: "General Inquiry",
    description:
      "Product questions, where-to-buy, application help, partnership scoping.",
    submitLabel: "Send Message",
    emailSubject: "New Inquiry from Flamingo Website",
  },
  {
    id: "distributor",
    label: "Distributor Inquiry",
    description:
      "Open a wholesale account, become a regional distributor, request a price list.",
    submitLabel: "Become a Distributor",
    emailSubject: "New Distributor Inquiry",
  },
];

export const CONTACT_PAGE = {
  eyebrow: "Contact",
  headline: "Let's Build",
  headlineAccent: "Something Bigger.",
  subhead:
    "Whether you're looking for premium automotive care products, distribution opportunities, or business partnerships, our team is ready to help.",
} as const;

export interface BusinessHour {
  days: string;
  hours: string;
}

export const BUSINESS_HOURS: BusinessHour[] = [
  { days: "Monday – Friday", hours: "8:00 AM – 5:00 PM" },
  { days: "Saturday", hours: "9:00 AM – 2:00 PM" },
  { days: "Sunday", hours: "Closed" },
];

export const HQ = {
  name: "Flamingo Car Care Tech Co., Ltd.",
  region: "Headquarters",
  city: "Lagos, Nigeria",
  role: "Manufacturing, distribution & customer care",
  addressLines: [
    "YIM 1939 Building",
    "Festac Access Road",
    "Amuwo Odofin",
    "Lagos State, Nigeria",
  ],
  email: "sales@flamingocarcaretech.com",
  phones: ["+234 814 036 4558", "+234 808 931 2955"],
  hours: BUSINESS_HOURS,
} as const;

export const WHATSAPP = {
  // Primary first — fallback used only when the link router can't reach the
  // primary number (very rare; WhatsApp opens with the first that exists).
  primary: "+234 814 036 4558",
  fallback: "+234 808 931 2955",
  label: "Chat With Us",
  // Pre-filled greeting so the visitor sees a starter message in the WA chat.
  greeting: "Hi Flamingo team, I'd like more information about your products.",
} as const;

function toWaUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_URL = toWaUrl(WHATSAPP.primary, WHATSAPP.greeting);
export const WHATSAPP_FALLBACK_URL = toWaUrl(WHATSAPP.fallback, WHATSAPP.greeting);

export interface SocialLink {
  id: "facebook" | "instagram" | "linkedin" | "x";
  label: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/share/18JFDt8fvx/?mibextid=wwXIfr",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/flamingocarcareng",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/flamingo-car-care-tech-limited/",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/flamingo_ng",
  },
];
