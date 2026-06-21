import { ComparisonPage } from "@/components/pages/ComparisonPage";
import {
  COMPARE_OG_IMAGE,
  getAllCompareSlugs,
  getComparePage,
} from "@/content/competitors";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCompareSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getComparePage(slug);
  if (!content) return {};

  return buildPageMetadata({
    title: content.title,
    description: content.description,
    path: `/compare/${slug}`,
    keywords: content.keywords,
    ogImage: COMPARE_OG_IMAGE,
  });
}

export default async function CompareSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const content = getComparePage(slug);
  if (!content) notFound();

  return <ComparisonPage content={content} />;
}
