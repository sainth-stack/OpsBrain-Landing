import { brandLogos, faqCategories, siteConfig } from "@/content/site";
import type { FaqItem } from "@/content/seo-pages";
import type { Metadata } from "next";

const organizationId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;

export function buildPageMetadata({
  title,
  description,
  path,
  ogImage,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  keywords?: string[];
}): Metadata {
  const canonicalPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  const url = `${siteConfig.url}${canonicalPath}`;
  const image = ogImage ?? brandLogos.ogImage;

  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function getOrganizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.seo.description,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/icon.png`,
    },
  };
}

export function getWebSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.seo.description,
    publisher: { "@id": organizationId },
  };
}

export function getSoftwareApplicationJsonLd() {
  return {
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: siteConfig.seo.description,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      description: "Contact for pricing. 14-day pilot available.",
    },
  };
}

export function getFaqJsonLdFromItems(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getFaqJsonLd() {
  const allItems = faqCategories.flatMap((cat) =>
    cat.items.map((item) => ({ question: item.question, answer: item.answer })),
  );
  return getFaqJsonLdFromItems(allItems);
}

export function getBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function getServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@type": "Service",
    name,
    description,
    url: `${siteConfig.url}${url.startsWith("/") ? url : `/${url}`}`,
    provider: { "@id": organizationId },
    areaServed: "Worldwide",
  };
}

export function getProductOfferJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@type": "Product",
    name,
    description,
    url: `${siteConfig.url}${url.startsWith("/") ? url : `/${url}`}`,
    brand: { "@id": organizationId },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        description: "Contact for quote. 14-day pilot available.",
      },
    },
  };
}

export function getPageJsonLd(items: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": items,
  };
}

export function getArticleJsonLd({
  title,
  description,
  path,
  datePublished,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
}) {
  const url = `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
  return {
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
    mainEntityOfPage: url,
    url,
  };
}

export function getHomeJsonLd() {
  return getPageJsonLd([
    getOrganizationJsonLd(),
    getWebSiteJsonLd(),
    getSoftwareApplicationJsonLd(),
    getFaqJsonLd(),
  ]);
}
