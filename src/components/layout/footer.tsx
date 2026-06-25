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

function FooterLink({ href, label }: { href: string; label: string }) {
  const className =
    "text-sm text-on-dark-muted transition-colors hover:text-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

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
    <footer className="bg-ink text-on-dark-muted">
      <Container className="py-16">
        <div id="about" className="scroll-mt-24 border-b border-white/10 pb-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-on-dark">
            {aboutBlurb.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-on-dark-muted">
            {aboutBlurb.description}
          </p>
        </div>

        <div className="grid gap-10 pt-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
              aria-label={`${siteConfig.name} home`}
            >
              <Logo variant="dark" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-on-dark-muted">
              {footer.tagline}
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-on-dark">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5" role="list">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-7 text-xs text-on-dark-muted/80 sm:flex-row sm:justify-between">
          <p>{footer.copyright}</p>
          <p>Built for revenue teams that never sleep.</p>
        </div>
      </Container>
    </footer>
  );
}
