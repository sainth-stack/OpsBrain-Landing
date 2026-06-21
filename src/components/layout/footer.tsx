import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { aboutBlurb, footer, footerLinks, siteConfig } from "@/content/site";
import Link from "next/link";

const columns = [
  { title: "Product", links: footerLinks.product },
  { title: "AI Employees", links: footerLinks.aiEmployees },
  { title: "Company", links: footerLinks.company },
  { title: "Legal", links: footerLinks.legal },
] as const;

function FooterLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const className =
    "inline-flex min-h-11 items-center text-small text-text-secondary transition-colors hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary";

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {label}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border-default bg-surface-muted">
      <Container className="py-16">
        <div id="about" className="scroll-mt-24 border-b border-border-default pb-12">
          <h2 className="text-small font-semibold uppercase tracking-wider text-text-primary">
            {aboutBlurb.title}
          </h2>
          <p className="mt-3 max-w-3xl text-small leading-relaxed text-text-secondary">
            {aboutBlurb.description}
          </p>
        </div>

        <div className="grid gap-10 pt-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              aria-label={`${siteConfig.name} home`}
            >
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-small leading-relaxed text-text-secondary">
              {footer.tagline}
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-small font-semibold uppercase tracking-wider text-text-primary">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-1" role="list">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-default pt-8 sm:flex-row">
          <p className="text-small text-text-muted">{footer.copyright}</p>
          <p className="text-small text-text-muted">
            Built for revenue teams that never sleep.
          </p>
        </div>
      </Container>
    </footer>
  );
}
