import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  distDir: "dist",
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
