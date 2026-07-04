import { MarketingPageShell } from "@/components/pages/MarketingPageShell";
import { JsonLdScript } from "@/components/pages/JsonLdScript";
import { PageCTA } from "@/components/pages/PageCTA";
import { PageHero } from "@/components/pages/PageHero";
import { RelatedLinks } from "@/components/pages/RelatedLinks";
import { aboutPage, founder, siteConfig } from "@/content/site";
import { buildPageMetadata, getAboutJsonLd } from "@/lib/seo";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: aboutPage.path },
];

export const metadata = buildPageMetadata({
  title: aboutPage.title,
  description: aboutPage.description,
  path: aboutPage.path,
  keywords: [
    "OpsBrain AI",
    "OpsBrain",
    "Sainath Reddy Guraka",
    "AI employees",
    "leads finder",
    "AI voice agents",
    "SDR automation",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLdScript data={getAboutJsonLd()} />
      <MarketingPageShell breadcrumbs={breadcrumbs}>
        <PageHero
          eyebrow="Company"
          title={aboutPage.h1}
          subtitle={aboutPage.intro}
        />

        <section className="max-w-3xl space-y-4" aria-labelledby="mission-heading">
          <h2
            id="mission-heading"
            className="font-display text-h2 font-bold text-text-primary"
          >
            Mission
          </h2>
          <p className="text-body leading-relaxed text-text-secondary">
            {aboutPage.mission}
          </p>
        </section>

        <section className="max-w-3xl space-y-4" aria-labelledby="founder-heading">
          <h2
            id="founder-heading"
            className="font-display text-h2 font-bold text-text-primary"
          >
            Founder
          </h2>
          <div className="rounded-2xl border border-border-default bg-surface-white p-6 md:p-8">
            <p className="font-display text-xl font-bold text-text-primary">
              {founder.name}
            </p>
            <p className="mt-1 text-small font-semibold uppercase tracking-wider text-brand-primary">
              {founder.jobTitle}
            </p>
            <p className="mt-4 text-body leading-relaxed text-text-secondary">
              {founder.description}
            </p>
          </div>
        </section>

        <section className="max-w-3xl space-y-4" aria-labelledby="product-heading">
          <h2
            id="product-heading"
            className="font-display text-h2 font-bold text-text-primary"
          >
            What {siteConfig.name} does
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-body text-text-secondary">
            {aboutPage.productFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </section>

        <RelatedLinks
          links={[
            { href: "/platform", label: "Platform" },
            { href: "/ai-employees", label: "AI Employees" },
            { href: "/solutions", label: "Solutions" },
            { href: "/pricing", label: "Pricing" },
            { href: "/blog", label: "Blog" },
          ]}
        />

        <PageCTA
          title="Deploy your first AI employee"
          description="Tell us about your pipeline — we'll configure an OpsBrain AI employee for lead calling, support, or outbound campaigns."
          primaryHref="/#contact"
          primaryLabel="Get started"
        />
      </MarketingPageShell>
    </>
  );
}
