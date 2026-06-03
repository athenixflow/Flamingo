import type { Metadata } from "next";

const SITE_NAME = "Flamingo Car Care";
const SITE_URL = "https://flamingocarcaretech.com";
const DEFAULT_DESCRIPTION =
  "Engineered automotive care for perfectionists. Nano ceramic coatings, tire technology, and premium detailing systems — engineered in Nigeria, trusted worldwide.";

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
  image,
}: BuildMetadataInput = {}): Metadata {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Protect The Machine.`;
  const url = `${SITE_URL}${path}`;

  // When no image override is provided, Next.js auto-discovers the dynamic
  // opengraph-image.tsx at app/ (and any nested opengraph-image.tsx routes).
  const openGraph: NonNullable<Metadata["openGraph"]> = {
    type: "website",
    url,
    title: fullTitle,
    description,
    siteName: SITE_NAME,
  };
  const twitter: NonNullable<Metadata["twitter"]> = {
    card: "summary_large_image",
    title: fullTitle,
    description,
  };
  if (image) {
    openGraph.images = [{ url: image, width: 1200, height: 630, alt: fullTitle }];
    twitter.images = [image];
  }

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
    openGraph,
    twitter,
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
