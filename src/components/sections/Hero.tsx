import { DarkSectionBackdrop } from "@/components/ui/DarkSectionBackdrop";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { HeroStats } from "@/components/sections/HeroStats";
import { hero } from "@/content/site";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-surface-dark pb-16 pt-12 md:pb-24 md:pt-16 lg:pb-28 lg:pt-20"
      aria-label="Hero"
    >
      <DarkSectionBackdrop variant="dark" />
      <div
        className="hero-gradient-mesh pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl lg:max-w-none">
            <div className="hero-fade-up hero-delay-0">
              <Badge
                variant="accent"
                className="mb-6 border border-brand-accent/20 bg-brand-accent/10 text-brand-accent"
              >
                {hero.eyebrow}
              </Badge>
            </div>

            <h1 className="hero-fade-up hero-delay-1 font-display text-[2rem] font-bold leading-[1.12] tracking-tight text-text-inverse sm:text-h1 lg:text-display">
              {hero.headline}
            </h1>

            <p className="hero-fade-up hero-delay-2 mt-6 max-w-lg text-body leading-relaxed text-text-inverse-muted md:mt-8 md:text-lg">
              {hero.subheadline}
            </p>

            <div className="hero-fade-up hero-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink
                href={hero.primaryCta.href}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                trackAsDemo="hero_book_demo"
              >
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink
                href={hero.secondaryCta.href}
                variant="secondary"
                size="lg"
                className="w-full border-white/20 bg-white/10 text-text-inverse hover:bg-white/20 sm:w-auto"
              >
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>

            <p className="hero-fade-up hero-delay-4 mt-4 text-small text-text-inverse-muted">
              {hero.socialProof}
            </p>

            <div className="hidden lg:block">
              <HeroStats />
            </div>
          </div>

          <HeroVisual />

          <div className="lg:hidden">
            <HeroStats />
          </div>
        </div>
      </Container>
    </section>
  );
}
