import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "www.flamingocarcare.com" },
      { protocol: "https", hostname: "flamingocarcare.com" },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  transpilePackages: ["three"],
};

export default nextConfig;
