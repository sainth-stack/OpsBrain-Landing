import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/content/blog/posts";
import { compareHub, getAllCompareSlugs } from "@/content/competitors";
import {
  getAllIndustrySlugs,
  getAllSolutionSlugs,
  hubPages,
  solutionPages,
} from "@/content/seo-pages";
import { siteConfig } from "@/content/site";

const LAST_CONTENT_UPDATE = new Date("2026-06-01T00:00:00.000Z");
const LEGAL_LAST_UPDATED = new Date("2026-06-01T00:00:00.000Z");
const BLOG_LAST_UPDATED = new Date("2026-06-01T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const corePages: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}${hubPages.aiEmployees.path}`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}${hubPages.platform.path}`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}${hubPages.integrations.path}`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}${hubPages.pricing.path}`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}${compareHub.path}`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${base}/blog`,
      lastModified: BLOG_LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.65,
    },
    {
      url: `${base}/guides/tcpa-gdpr-ai-calling`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const industryPages: MetadataRoute.Sitemap = getAllIndustrySlugs().map(
    (slug) => ({
      url: `${base}/ai-employees/${slug}`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const solutionPagesEntries: MetadataRoute.Sitemap = getAllSolutionSlugs().map(
    (slug) => ({
      url: `${base}${solutionPages[slug].path}`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const comparePages: MetadataRoute.Sitemap = getAllCompareSlugs().map(
    (slug) => ({
      url: `${base}/compare/${slug}`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const blogPosts: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: BLOG_LAST_UPDATED,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${base}/privacy`,
      lastModified: LEGAL_LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified: LEGAL_LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [
    ...corePages,
    ...industryPages,
    ...solutionPagesEntries,
    ...comparePages,
    ...blogPosts,
    ...legalPages,
  ];
}
