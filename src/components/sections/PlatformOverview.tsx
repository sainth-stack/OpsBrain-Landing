import { IconBox } from "@/components/icons/icon-map";
import { Container } from "@/components/ui/container";
import { platformOverview } from "@/content/site";
import { cn } from "@/lib/utils";
import {
  ArrowRightLeft,
  Phone,
  Search,
  Zap,
} from "lucide-react";

const pillarIcons = {
  Search,
  Phone,
  Zap,
  ArrowRightLeft,
} as const;

export function PlatformOverview() {
  return (
    <section
      id="platform-overview"
      className="relative overflow-hidden py-16 md:py-20"
      aria-label={platformOverview.title}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-indigo-600 to-purple-700" />

      <div
        className="pointer-events-none absolute inset-0 opacity-20 platform-dot-pattern"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="text-center">
          <h2 className="text-h2 font-bold text-white md:text-h1">
            {platformOverview.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-body text-indigo-100 md:text-lg">
            {platformOverview.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {platformOverview.pillars.map((pillar) => {
            const Icon =
              pillarIcons[pillar.icon as keyof typeof pillarIcons] ?? Search;
            return (
              <div
                key={pillar.label}
                className={cn(
                  "rounded-xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm",
                  "transition-colors hover:bg-white/15",
                )}
              >
                <IconBox
                  icon={Icon}
                  variant="dark"
                  size="md"
                  className="bg-white/10"
                />
                <h3 className="mt-4 text-h3 font-semibold text-white">
                  {pillar.label}
                </h3>
                <p className="mt-2 text-small leading-relaxed text-indigo-100">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
