import { brandLogos, faqCategories, siteConfig } from "@/content/site";

export function getOrganizationJsonLd() {
  return {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.seo.description,
    logo: `${siteConfig.url}${brandLogos.favicon.icon512}`,
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
      price: "0",
      priceCurrency: "USD",
      description: "14-day pilot available",
    },
  };
}

export function getFaqJsonLd() {
  const allItems = faqCategories.flatMap((cat) =>
    cat.items.map((item) => ({ question: item.question, answer: item.answer })),
  );
  return {
    "@type": "FAQPage",
    mainEntity: allItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
