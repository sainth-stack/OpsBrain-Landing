"use client";

import { ButtonLink } from "@/components/ui/button";
import { ctaLinks } from "@/content/site";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > 400);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border-default bg-surface-white/95 p-3 backdrop-blur-md transition-transform duration-300 md:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      role="complementary"
      aria-label="Quick action"
    >
      <div className="flex gap-2">
        <ButtonLink
          href={ctaLinks.login.href}
          variant="secondary"
          size="md"
          className="flex-1"
        >
          {ctaLinks.login.label}
        </ButtonLink>
        <ButtonLink
          href={ctaLinks.bookDemo.href}
          variant="primary"
          size="md"
          className="flex-1"
          trackAsDemo="mobile_sticky_book_demo"
        >
          {ctaLinks.bookDemo.label}
        </ButtonLink>
      </div>
    </div>
  );
}
