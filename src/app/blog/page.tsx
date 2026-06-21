import { MarketingPageShell } from "@/components/pages/MarketingPageShell";
import { JsonLdScript } from "@/components/pages/JsonLdScript";
import { PageHero } from "@/components/pages/PageHero";
import { blogHub, blogPosts } from "@/content/blog/posts";
import {
  buildPageMetadata,
  getBreadcrumbJsonLd,
  getPageJsonLd,
} from "@/lib/seo";
import Link from "next/link";

export const metadata = buildPageMetadata({
  title: blogHub.title,
  description: blogHub.description,
  path: blogHub.path,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: blogHub.path },
];

const jsonLd = getPageJsonLd([getBreadcrumbJsonLd(breadcrumbs)]);

export default function BlogIndexPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} />
      <MarketingPageShell breadcrumbs={breadcrumbs}>
        <PageHero
          eyebrow="Resources"
          title="OpsBrain Blog & Guides"
          subtitle={blogHub.description}
        />

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-xl border border-border-default bg-surface-white p-6 md:p-8"
            >
              <p className="text-small text-text-muted">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                {" · "}
                {post.readTimeMinutes} min read
              </p>
              <h2 className="mt-2 text-h3 font-bold text-text-primary">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-body leading-relaxed text-text-secondary">
                {post.description}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex text-small font-medium text-brand-primary hover:underline"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </MarketingPageShell>
    </>
  );
}
