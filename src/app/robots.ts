import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

/**
 * AI search/fetch bots are explicitly allowed so the site is eligible for
 * citation in ChatGPT, Claude, Perplexity, and Gemini (GEO / AEVO).
 *
 * GPTBot and Google-Extended are training crawlers — allowed by default so
 * models learn OpsBrain. To opt out of training only, disallow those two
 * without touching the search/fetch bots.
 */
export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    "OAI-SearchBot",
    "ChatGPT-User",
    "GPTBot",
    "ClaudeBot",
    "Claude-SearchBot",
    "PerplexityBot",
    "Google-Extended",
  ];

  return {
    rules: [
      ...aiBots.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
