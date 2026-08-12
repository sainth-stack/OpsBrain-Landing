import { CtaLink } from "@/components/ui/cta-link";
import { Container } from "@/components/ui/container";
import { HeroOrbVisual } from "@/components/sections/HeroOrbVisual";
import { HeroStats } from "@/components/sections/HeroStats";
import { hero } from "@/content/site";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const headlineParts = hero.headline.split(" 24/7");
  const headlineLead = headlineParts[0] ?? hero.headline;
  const headlineTail = headlineParts.length > 1 ? "24/7" : null;

  return (
    <section
      id="hero"
      className="relative overflow-hidden hero-surface-gradient text-text-primary"
      aria-label="Hero"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -left-48 -top-48 h-[36rem] w-[36rem] rounded-full bg-brand-primary/10 blur-[130px]" />
        <div className="absolute -bottom-56 right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-brand-accent/15 blur-[130px]" />
        <div className="hero-grid absolute inset-0" />
      </div>

      <Container className="relative py-20 md:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <p
              className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-primary motion-safe:animate-fade-up"
            >
              <span
                className="size-1.5 rounded-full bg-brand-primary"
                aria-hidden="true"
              />
              {hero.eyebrow}
            </p>

            <h1
              className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-text-primary sm:text-5xl xl:text-[3.6rem] motion-safe:animate-fade-up"
              style={{ animationDelay: "90ms" }}
            >
              {headlineLead}
              {headlineTail ? (
                <>
                  {" "}
                  <span className="gradient-text-light">{headlineTail}</span>
                </>
              ) : null}
            </h1>

            <p
              className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary motion-safe:animate-fade-up"
              style={{ animationDelay: "180ms" }}
            >
              {hero.subheadline}
            </p>

            <div
              className="mt-9 flex flex-wrap items-center gap-3 motion-safe:animate-fade-up sm:gap-4"
              style={{ animationDelay: "270ms" }}
            >
              <CtaLink
                href={hero.primaryCta.href}
                variant="primary"
                size="lg"
                trackAsDemo="hero_get_started"
              >
                {hero.primaryCta.label}
              </CtaLink>
              <CtaLink
                href={hero.secondaryCta.href}
                variant="outline"
                size="lg"
                trackAsDemo="hero_talk_to_agent"
              >
                {hero.secondaryCta.label}
              </CtaLink>
            </div>

            <p
              className="mt-5 text-sm text-text-muted motion-safe:animate-fade-up"
              style={{ animationDelay: "360ms" }}
            >
              {hero.salesCta.prompt}{" "}
              <a
                href={hero.salesCta.href}
                className="inline-flex items-center gap-1 font-semibold text-brand-primary transition-colors hover:text-brand-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                {hero.salesCta.label}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </a>
            </p>
          </div>

          <HeroOrbVisual />
        </div>

        <div
          className="mt-14 motion-safe:animate-fade-up md:mt-16"
          style={{ animationDelay: "420ms" }}
        >
          <HeroStats />
        </div>
      </Container>
    </section>
  );
}
