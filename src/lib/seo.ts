import type { FaqItem } from "@/content/seo-pages";
import {
  brandLogos,
  faqCategories,
  founder,
  founders,
  siteConfig,
} from "@/content/site";
import type { Metadata } from "next";

const organizationId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;
const softwareId = `${siteConfig.url}/#software`;
const founderId = `${siteConfig.url}/#sainath`;
const cofounderId = `${siteConfig.url}/#eswar`;

export function buildPageMetadata({
  title,
  description,
  path,
  ogImage,
  keywords,
  type = "website",
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
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
      type,
      locale: "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === "article" && publishedTime
        ? { publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@opsbrainai",
      images: [image],
    },
  };
}

export function getFounderJsonLd() {
  return {
    "@type": "Person",
    "@id": founderId,
    name: founder.name,
    alternateName: founder.shortName,
    jobTitle: founder.jobTitle,
    description: founder.description,
    url: `${siteConfig.url}/about`,
    image: `${siteConfig.url}${founder.image}`,
    sameAs: [founder.linkedin],
    worksFor: { "@id": organizationId },
    knowsAbout: [
      "AI employees",
      "AI voice agents",
      "Lead generation",
      "SDR automation",
      "Revenue operations",
    ],
  };
}

export function getCofounderJsonLd() {
  const eswar = founders.find((person) => person.id === "eswar");
  if (!eswar) return null;

  return {
    "@type": "Person",
    "@id": cofounderId,
    name: eswar.name,
    alternateName: eswar.shortName,
    jobTitle: eswar.jobTitle,
    description: eswar.bio,
    url: `${siteConfig.url}/about`,
    image: `${siteConfig.url}${eswar.image}`,
    sameAs: [eswar.linkedin],
    worksFor: { "@id": organizationId },
    knowsAbout: [
      "AI systems",
      "Voice AI",
      "CRM automation",
      "Scalable infrastructure",
    ],
  };
}

export function getOrganizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    alternateName: [...siteConfig.alternateNames],
    url: siteConfig.url,
    description: siteConfig.seo.description,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/icon.png`,
    },
    image: `${siteConfig.url}${brandLogos.ogImage}`,
    founder: [{ "@id": founderId }, { "@id": cofounderId }],
    foundingLocation: {
      "@type": "Place",
      name: "India",
    },
    areaServed: "Worldwide",
    sameAs: [
      "https://www.linkedin.com/company/99239755/",
      founder.linkedin,
      ...founders
        .filter((person) => person.id === "eswar")
        .map((person) => person.linkedin),
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: `${siteConfig.url}/#contact`,
      availableLanguage: ["English", "Hindi", "Telugu"],
    },
  };
}

export function getWebSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.url,
    name: siteConfig.name,
    alternateName: [...siteConfig.alternateNames],
    description: siteConfig.seo.description,
    publisher: { "@id": organizationId },
    inLanguage: "en",
  };
}

export function getSoftwareApplicationJsonLd() {
  return {
    "@type": "SoftwareApplication",
    "@id": softwareId,
    name: siteConfig.name,
    alternateName: [...siteConfig.alternateNames],
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: siteConfig.seo.description,
    url: siteConfig.url,
    featureList: [
      "AI employees for sales, support, healthcare, real estate, HR, and more",
      "Lead finder and instant outbound calling",
      "Multilingual AI voice (Telugu, Hindi, English, 50+ languages)",
      "Lead qualification and meeting booking",
      "Bi-directional CRM sync",
      "Bulk outbound campaigns",
      "24/7 inbound support agents",
    ],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      description: "Plans from $399/mo with included voice minutes. Contact us for Enterprise.",
    },
    publisher: { "@id": organizationId },
    author: { "@id": founderId },
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
        price: "399",
        description: "Starter plan from $399/mo with 2,000 included voice minutes.",
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
    image: `${siteConfig.url}${brandLogos.ogImage}`,
    author: { "@id": founderId },
    publisher: { "@id": organizationId },
    mainEntityOfPage: url,
    url,
  };
}

export function getAboutJsonLd() {
  const cofounder = getCofounderJsonLd();
  return getPageJsonLd([
    getFounderJsonLd(),
    ...(cofounder ? [cofounder] : []),
    getOrganizationJsonLd(),
    getBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  ]);
}

export function getHomeJsonLd() {
  return getPageJsonLd([
    getFounderJsonLd(),
    getOrganizationJsonLd(),
    getWebSiteJsonLd(),
    getSoftwareApplicationJsonLd(),
    getFaqJsonLd(),
  ]);
}
