"use client";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { useTheme } from "@/components/providers/ThemeProvider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ctaLinks, navLinks } from "@/content/site";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const { theme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isLight = theme === "light";
  const overHero = !scrolled;
  const heroOverlay = overHero && !isLight;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        isLight
          ? "border-border-default bg-surface-white"
          : heroOverlay
            ? "border-border-default/40 bg-surface-dark/70 backdrop-blur-md"
            : "border-border-default bg-surface-white",
      )}
    >
      <Container>
        <nav
          className="flex h-14 items-center justify-between md:h-16"
          aria-label="Main navigation"
        >
          <a
            href={ctaLinks.login.href}
            className="flex shrink-0 items-center rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            aria-label="Go to OpsBrain app"
          >
            <Logo priority variant={heroOverlay ? "dark" : undefined} />
          </a>

          <ul className="hidden items-center gap-1 md:flex" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-lg px-4 text-small font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                    heroOverlay
                      ? "text-on-dark-muted hover:bg-white/10 hover:text-on-dark"
                      : "text-text-secondary hover:bg-surface-muted hover:text-text-primary",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle inverted={heroOverlay} />
            <ButtonLink
              href={ctaLinks.login.href}
              variant="ghost"
              size="sm"
              aria-label={ctaLinks.login.label}
              className={
                heroOverlay
                  ? "text-on-dark hover:bg-white/10 hover:text-on-dark"
                  : undefined
              }
            >
              {ctaLinks.login.label}
            </ButtonLink>
            <ButtonLink
              href={ctaLinks.bookDemo.href}
              variant="primary"
              size="sm"
              aria-label={ctaLinks.bookDemo.label}
              trackAsDemo="navbar_book_demo"
            >
              {ctaLinks.bookDemo.label}
            </ButtonLink>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle inverted={heroOverlay} />
            <button
              type="button"
              className={cn(
                "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                heroOverlay
                  ? "text-on-dark hover:bg-white/10"
                  : "text-text-primary hover:bg-surface-muted",
              )}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </Container>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-40 top-14 md:top-16 md:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-text-primary/20 transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        <div
          className={cn(
            "absolute right-0 top-0 h-full w-full max-w-sm border-l border-border-default bg-surface-white transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <nav
            className="flex h-full flex-col p-6"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex min-h-11 items-center rounded-lg px-4 text-body font-medium text-text-primary transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-3 border-t border-border-default pt-6">
              <div className="flex items-center justify-between px-1 pb-1">
                <span className="text-small font-medium text-text-secondary">
                  Theme
                </span>
                <ThemeToggle />
              </div>
              <ButtonLink
                href={ctaLinks.login.href}
                variant="secondary"
                size="md"
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                {ctaLinks.login.label}
              </ButtonLink>
              <ButtonLink
                href={ctaLinks.bookDemo.href}
                variant="primary"
                size="md"
                className="w-full"
                trackAsDemo="mobile_nav_book_demo"
                onClick={() => setMobileOpen(false)}
              >
                {ctaLinks.bookDemo.label}
              </ButtonLink>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
