import { MarketingPageShell } from "@/components/pages/MarketingPageShell";
import { JsonLdScript } from "@/components/pages/JsonLdScript";
import { PageCTA } from "@/components/pages/PageCTA";
import { PageHero } from "@/components/pages/PageHero";
import { RelatedLinks } from "@/components/pages/RelatedLinks";
import { SectionHeader } from "@/components/ui/section-header";
import { aboutPage, founders, siteConfig } from "@/content/site";
import { buildPageMetadata, getAboutJsonLd } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";

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
    "Eswar Silaveri",
    "AI employees",
    "leads finder",
    "AI voice agents",
    "SDR automation",
    "About OpsBrain",
  ],
});

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function LeadershipCard({
  name,
  jobTitle,
  bio,
  image,
  linkedin,
}: (typeof founders)[number]) {
  return (
    <article className="flex h-full flex-col items-center rounded-2xl border border-border-default bg-surface-white px-6 py-8 text-center shadow-sm md:px-8 md:py-10">
      <div className="relative h-28 w-28 overflow-hidden rounded-full ring-2 ring-brand-primary/15 md:h-32 md:w-32">
        <Image
          src={image}
          alt={`${name}, ${jobTitle} at ${siteConfig.name}`}
          fill
          sizes="128px"
          className="object-cover object-top"
          priority
        />
      </div>
      <h3 className="mt-5 font-display text-xl font-bold text-text-primary">
        {name}
      </h3>
      <p className="mt-1 text-small font-semibold text-brand-primary">
        {jobTitle}
      </p>
      <p className="mt-4 max-w-sm text-body leading-relaxed text-text-secondary">
        {bio}
      </p>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border-default px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-brand-primary hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        aria-label={`${name} on LinkedIn`}
      >
        <LinkedInIcon className="h-4 w-4" />
        LinkedIn
      </a>
    </article>
  );
}

export default function AboutPage() {
  return (
    <>
      <JsonLdScript data={getAboutJsonLd()} />
      <MarketingPageShell breadcrumbs={breadcrumbs}>
        <PageHero
          eyebrow={aboutPage.eyebrow}
          title={aboutPage.h1}
          subtitle={aboutPage.intro}
        />

        <div className="flex flex-wrap gap-3">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            Get started
          </Link>
          <Link
            href="/platform"
            className="inline-flex items-center justify-center rounded-lg border border-border-default bg-surface-white px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-brand-primary hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            Explore platform
          </Link>
        </div>

        <section
          className="rounded-2xl border border-border-default bg-surface-tint/40 px-6 py-8 md:px-10 md:py-10"
          aria-labelledby="story-heading"
        >
          <SectionHeader
            eyebrow={aboutPage.storyEyebrow}
            title={aboutPage.storyTitle}
            align="left"
            className="mb-6 md:mb-8"
          />
          <div className="max-w-3xl space-y-4">
            {aboutPage.story.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-body leading-relaxed text-text-secondary"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <blockquote className="mt-8 max-w-3xl border-l-2 border-brand-primary pl-5 font-display text-lg font-semibold leading-snug text-text-primary md:text-xl">
            {aboutPage.storyHighlight}
          </blockquote>
        </section>

        <section aria-labelledby="leadership-heading">
          <SectionHeader
            eyebrow={aboutPage.leadershipEyebrow}
            title={aboutPage.leadershipTitle}
            subtitle={aboutPage.leadershipSubtitle}
            align="center"
          />
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 md:gap-8">
            {founders.map((person) => (
              <LeadershipCard key={person.id} {...person} />
            ))}
          </div>
        </section>

        <section aria-labelledby="values-heading">
          <SectionHeader
            eyebrow={aboutPage.valuesEyebrow}
            title={aboutPage.valuesTitle}
            align="center"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {aboutPage.values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-border-default bg-surface-white p-6"
              >
                <h3 className="font-display text-lg font-bold text-text-primary">
                  {value.title}
                </h3>
                <p className="mt-2 text-body leading-relaxed text-text-secondary">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="rounded-2xl border border-border-default bg-surface-white px-6 py-8 md:px-10 md:py-12"
          aria-labelledby="vision-heading"
        >
          <SectionHeader
            eyebrow={aboutPage.visionEyebrow}
            title={aboutPage.visionTitle}
            subtitle={aboutPage.vision}
            align="left"
            className="mb-8 md:mb-10"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {aboutPage.visionPoints.map((point) => (
              <div key={point.title}>
                <h3 className="font-display text-base font-bold text-text-primary">
                  {point.title}
                </h3>
                <p className="mt-2 text-small leading-relaxed text-text-secondary">
                  {point.description}
                </p>
              </div>
            ))}
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
          title={aboutPage.cta.title}
          description={aboutPage.cta.description}
          primaryHref={aboutPage.cta.primaryHref}
          primaryLabel={aboutPage.cta.primaryLabel}
          secondaryHref={aboutPage.cta.secondaryHref}
          secondaryLabel={aboutPage.cta.secondaryLabel}
        />
      </MarketingPageShell>
    </>
  );
}
