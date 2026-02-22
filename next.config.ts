import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Exclude better-sqlite3 from serverless bundles (it's only used in dev)
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
