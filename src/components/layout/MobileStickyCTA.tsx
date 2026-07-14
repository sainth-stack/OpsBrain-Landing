"use client";

import { TalkWithDiyaButton } from "@/components/assistant/TalkWithDiyaButton";
import { CtaLink } from "@/components/ui/cta-link";
import { ctaLinks } from "@/content/site";

export function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border-default bg-surface-white/95 p-3 backdrop-blur-md lg:hidden">
      <TalkWithDiyaButton
        label="Talk to Diya"
        size="md"
        className="flex-1"
        trackAs="mobile_sticky_talk_diya"
      />
      <CtaLink
        href={ctaLinks.getStarted.href}
        variant="primary"
        size="lg"
        className="flex-1"
        trackAsDemo="mobile_sticky_get_started"
      >
        {ctaLinks.getStarted.label}
      </CtaLink>
    </div>
  );
}
