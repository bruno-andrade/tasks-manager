import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  env: {
    NEXTAUTH_SECRET:"YOUR_KEY_HERE",
  },
}


