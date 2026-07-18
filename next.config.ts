import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(self), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async redirects() {
    return [
      // Prefer apex host — fixes GSC "duplicate without user-selected canonical"
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.opsbrainai.com" }],
        destination: "https://opsbrainai.com/:path*",
        permanent: true,
      },

      // Legacy / guessed paths that currently 404 in Search Console
      {
        source: "/solution",
        destination: "/solutions",
        permanent: true,
      },
      {
        source: "/solution/:path*",
        destination: "/solutions/:path*",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/",
        permanent: true,
      },
      {
        source: "/demo",
        destination: "/",
        permanent: true,
      },
      {
        source: "/get-started",
        destination: "/",
        permanent: true,
      },
      {
        source: "/book-demo",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/guides",
        destination: "/guides/tcpa-gdpr-ai-calling",
        permanent: true,
      },
      {
        source: "/login",
        destination: "https://app.opsbrainai.com/login",
        permanent: true,
      },
      {
        source: "/privacy/policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/terms-of-service",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/tos",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/ai-employees/real-estate",
        destination: "/ai-employees/realestate",
        permanent: true,
      },
      {
        source: "/ai-employees/healthcare",
        destination: "/ai-employees/hospital",
        permanent: true,
      },
      {
        source: "/solutions/lead_calling",
        destination: "/solutions/lead-calling",
        permanent: true,
      },
      {
        source: "/compare/bland",
        destination: "/compare/bland-ai-alternative",
        permanent: true,
      },
      {
        source: "/compare/vapi",
        destination: "/compare/vapi-alternative",
        permanent: true,
      },
      {
        source: "/compare/retell",
        destination: "/compare/retell-alternative",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/og-image.jpg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/icon.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/audio/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
