import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Local images in /public/images
    unoptimized: false,
  },
};

export default nextConfig;
