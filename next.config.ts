import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Ensure Turbopack treats this folder as the project root even if parent dirs contain lockfiles.
    root: process.cwd(),
  },
};

export default nextConfig;
