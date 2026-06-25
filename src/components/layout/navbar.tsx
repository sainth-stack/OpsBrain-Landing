"use client";

import { CtaLink } from "@/components/ui/cta-link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { LOGIN_PAGE } from "@/lib/api-config";
import { ctaLinks, navLinks } from "@/content/site";
import { isNavLinkActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    closeMobile();
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobile();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border-default bg-surface-white/85 backdrop-blur-md">
      <Container>
        <nav
          className="flex h-16 items-center justify-between"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="flex shrink-0 items-center rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            aria-label="OpsBrain AI home"
          >
            <Logo priority />
          </Link>

          <ul className="hidden items-center gap-7 lg:flex" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                    isNavLinkActive(pathname, link.href)
                      ? "text-brand-primary"
                      : "text-text-secondary hover:text-text-primary",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <CtaLink href={LOGIN_PAGE} variant="ghost" size="sm">
              Login
            </CtaLink>
            <CtaLink
              href={ctaLinks.getStarted.href}
              variant="primary"
              size="sm"
              trackAsDemo="navbar_get_started"
            >
              {ctaLinks.getStarted.label}
            </CtaLink>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-text-primary hover:bg-surface-muted lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </nav>
      </Container>

      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-border-default bg-surface-white lg:hidden">
          <ul className="flex flex-col gap-1 px-5 py-4 sm:px-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-text-primary hover:bg-surface-muted"
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 flex flex-col gap-2 px-3">
              <CtaLink href={LOGIN_PAGE} variant="outline" className="w-full">
                Login
              </CtaLink>
              <CtaLink
                href={ctaLinks.getStarted.href}
                variant="primary"
                className="w-full"
                trackAsDemo="mobile_nav_get_started"
                onClick={closeMobile}
              >
                {ctaLinks.getStarted.label}
              </CtaLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
