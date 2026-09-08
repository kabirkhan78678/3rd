import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // optimizePackageImports helps with lucide-react and framer-motion
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
