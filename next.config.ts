import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Optional: optimize for Docker deployment
  distDir: ".next",
};

export default nextConfig;
