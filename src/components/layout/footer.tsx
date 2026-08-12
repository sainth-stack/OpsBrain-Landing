import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import {
  footer,
  footerLinks,
  poweredByPartners,
  poweredBySection,
  siteConfig,
} from "@/content/site";
import { cn } from "@/lib/utils";
import Link from "next/link";

const columns = [
  { title: "Product", links: footerLinks.product },
  { title: "Also from OpsBrain", links: footerLinks.alsoFromOpsBrain },
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

function PartnerMark({ id }: { id: string }) {
  if (id === "sarvam") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="font-display text-[15px] font-bold tracking-tight text-on-dark">
          sarvam
        </span>
        <span className="size-1.5 rounded-full bg-violet-400" aria-hidden="true" />
      </span>
    );
  }

  if (id === "cartesia") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <svg
          viewBox="0 0 24 24"
          className="size-4 text-on-dark"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4"
            stroke="#A5B4FC"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
        <span className="font-display text-[15px] font-bold tracking-tight text-on-dark">
          Cartesia
        </span>
      </span>
    );
  }

  if (id === "aws") {
    return (
      <span className="inline-flex flex-col items-start leading-none">
        <span className="font-display text-[15px] font-bold tracking-wide text-on-dark">
          aws
        </span>
        <svg
          viewBox="0 0 40 8"
          className="mt-0.5 h-1.5 w-9"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 3c7 3.2 18 4.4 30 1.6"
            stroke="#FF9900"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M28 2.4l3.8 1.2-4 1.5"
            stroke="#FF9900"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      <svg
        viewBox="0 0 24 24"
        className="size-4"
        fill="none"
        aria-hidden="true"
      >
        <path d="M13.2 3.2 5.5 20.8h4.3L17.5 3.2h-4.3Z" fill="#0078D4" />
        <path
          d="M10.2 12.2 5.5 20.8h4.3l2.4-4.4-2-4.2Z"
          fill="#50E6FF"
          fillOpacity="0.9"
        />
        <path d="m13.2 3.2 4.3 17.6H21L17.5 3.2h-4.3Z" fill="#50E6FF" />
      </svg>
      <span className="font-display text-[15px] font-bold tracking-tight text-on-dark">
        Azure
      </span>
    </span>
  );
}

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
      <div className="border-b border-white/10">
        <Container className="py-4">
          <p className="text-center text-xs font-medium tracking-wide text-on-dark-muted/90 md:text-sm">
            {footer.strip}
          </p>
        </Container>
      </div>

      <Container className="py-14 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(5,minmax(0,1fr))]">
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

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-6">
            <div className="text-center sm:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-accent">
                {poweredBySection.eyebrow}
              </p>
              <p className="mt-1 text-[13px] text-on-dark-muted">
                {poweredBySection.stripLine}
              </p>
            </div>
            <ul
              className="flex flex-wrap items-center justify-center gap-2 sm:justify-end"
              role="list"
            >
              {poweredByPartners.map((partner) => (
                <li key={partner.id}>
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={partner.name}
                    title={partner.role}
                    className={cn(
                      "inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5",
                      "transition-colors hover:border-brand-accent/40 hover:bg-white/10",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent",
                    )}
                  >
                    <PartnerMark id={partner.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-7 text-xs text-on-dark-muted/80 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <p>{footer.location}</p>
        </div>
      </Container>
    </footer>
  );
}
