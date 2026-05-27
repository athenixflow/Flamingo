import type { Metadata } from "next";

const SITE_NAME = "Flamingo Car Care";
const SITE_URL = "https://flamingocarcare.com";
const DEFAULT_DESCRIPTION =
  "Engineered automotive care for perfectionists. Nano ceramic coatings, tire technology, and premium detailing systems — engineered in USA.";

interface BuildMetadataInput {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = "/images/og/default.jpg",
}: BuildMetadataInput = {}): Metadata {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Protect The Machine.`;
  const url = `${SITE_URL}${path}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    keywords: [
      "car care",
      "automotive detailing",
      "ceramic coating",
      "tire shine",
      "nano coating",
      "paint protection",
      "Flamingo car care",
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export const SITE = { name: SITE_NAME, url: SITE_URL };
