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

function LinkedinIcon({ className }: { className?: string }) {
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

const socialIcons = {
  linkedin: LinkedinIcon,
} as const;

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
            <ul className="mt-6 flex items-center gap-3" role="list">
              {footer.social.map((item) => {
                const Icon = socialIcons[item.icon];
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-on-dark-muted transition-colors hover:border-brand-accent hover:text-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
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
