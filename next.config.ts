import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // AVIF first (~20-30% lighter than WebP), WebP as the fallback.
    formats: ["image/avif", "image/webp"],
    // GitHub avatar on /projects
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
