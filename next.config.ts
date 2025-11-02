// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // optional example
      },
      {
        protocol: "https",
        hostname: "cdn.yourbackend.com", // optional
      },
    ],
  },
};

export default nextConfig;
