import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/nav/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { buildMetadata } from "@/lib/seo";
import { getBrandLogo } from "@/lib/brand-assets";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logoSrc = getBrandLogo();
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-flamingo-pink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to main content
        </a>
        <LenisProvider>
          <Navbar logoSrc={logoSrc} />
          <main id="main">{children}</main>
          <Footer logoSrc={logoSrc} />
          <WhatsAppButton />
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  );
}
