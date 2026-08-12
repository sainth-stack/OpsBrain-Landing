import { JsonLdScript } from "@/components/pages/JsonLdScript";
import { ProductPage } from "@/components/pages/ProductPage";
import { getProductPage, productSlugs } from "@/content/products";
import {
  buildPageMetadata,
  getBreadcrumbJsonLd,
  getFaqJsonLdFromItems,
  getPageJsonLd,
  getServiceJsonLd,
} from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductPage(slug);
  if (!product) return {};

  return buildPageMetadata({
    title: product.seoTitle,
    description: product.seoDescription,
    path: product.path,
    keywords: product.keywords,
  });
}

export default async function ProductSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductPage(slug);
  if (!product) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: product.name, path: product.path },
  ];

  const jsonLd = getPageJsonLd([
    getBreadcrumbJsonLd(breadcrumbs),
    getServiceJsonLd({
      name: product.name,
      description: product.seoDescription,
      url: product.path,
    }),
    getFaqJsonLdFromItems(product.faq),
  ]);

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <ProductPage product={product} />
    </>
  );
}
