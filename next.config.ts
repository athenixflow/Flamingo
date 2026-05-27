import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "www.flamingocarcare.com" },
      { protocol: "https", hostname: "flamingocarcare.com" },
    ],
  },
  transpilePackages: ["three"],
};

export default nextConfig;
