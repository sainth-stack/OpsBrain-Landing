import { PageHeaderNav } from "@/components/pages/PageHeaderNav";
import { JsonLdScript } from "@/components/pages/JsonLdScript";
import { PageCTA } from "@/components/pages/PageCTA";
import { Container } from "@/components/ui/container";
import type { BlogPost } from "@/content/blog/posts";
import { siteConfig } from "@/content/site";
import {
  getArticleJsonLd,
  getBreadcrumbJsonLd,
  getPageJsonLd,
} from "@/lib/seo";
import Link from "next/link";

export function BlogArticle({ post }: { post: BlogPost }) {
  const path = `/blog/${post.slug}`;
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path },
  ];

  const jsonLd = getPageJsonLd([
    getBreadcrumbJsonLd(breadcrumbs),
    getArticleJsonLd({
      title: post.title,
      description: post.description,
      path,
      datePublished: post.publishedAt,
    }),
  ]);

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <main className="flex-1 py-12 md:py-16">
        <Container className="max-w-3xl">
          <PageHeaderNav
            breadcrumbs={breadcrumbs}
            backHref="/blog"
            backLabel="All posts"
          />

          <article className="mt-8 md:mt-10">
            <header>
              <p className="text-small text-text-muted">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                {" · "}
                {post.readTimeMinutes} min read
              </p>
              <h1 className="mt-3 font-display text-h1 font-bold text-text-primary">
                {post.title}
              </h1>
              <p className="mt-4 text-body leading-relaxed text-text-secondary md:text-lg">
                {post.description}
              </p>
            </header>

            <div className="prose prose-slate mt-10 max-w-none">
              {post.sections.map((section) => (
                <section key={section.heading} className="mb-10">
                  <h2 className="text-h3 font-semibold text-text-primary">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="mt-4 text-body leading-relaxed text-text-secondary"
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            <aside
              className="mt-12 rounded-xl border border-border-default bg-surface-muted p-6"
              aria-label="Related pages"
            >
              <h2 className="text-body font-semibold text-text-primary">
                Continue exploring
              </h2>
              <ul className="mt-4 space-y-2" role="list">
                {post.relatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body text-brand-primary hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </article>

          <div className="mt-12">
            <PageCTA
              title="Put these playbooks into production"
              description={`Deploy ${siteConfig.name} AI employees with a 14-day pilot on your scripts and CRM.`}
            />
          </div>
        </Container>
      </main>
    </>
  );
}
