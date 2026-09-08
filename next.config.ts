import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.12",
    "192.168.1.12:3000",
    "localhost",
    "localhost:3000",
  ],
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
