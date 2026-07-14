import { CtaLink } from "@/components/ui/cta-link";
import { TalkWithDiyaButton } from "@/components/assistant/TalkWithDiyaButton";
import { Container } from "@/components/ui/container";
import { HeroOrbVisual } from "@/components/sections/HeroOrbVisual";
import { HeroStats } from "@/components/sections/HeroStats";
import { hero } from "@/content/site";
import { CheckCircle2, Sparkles } from "lucide-react";

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

      <Container className="relative grid items-center gap-16 py-20 md:py-28 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-1.5 text-sm font-medium text-brand-primary motion-safe:animate-fade-up">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
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

          <ul
            className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 motion-safe:animate-fade-up"
            style={{ animationDelay: "270ms" }}
          >
            {hero.stats.map((stat) => (
              <li
                key={stat.label}
                className="flex items-center gap-2 text-sm font-medium text-text-primary"
              >
                <CheckCircle2 className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                {stat.value} {stat.label.toLowerCase()}
              </li>
            ))}
          </ul>

          <div
            className="mt-9 flex flex-wrap items-center gap-4 motion-safe:animate-fade-up"
            style={{ animationDelay: "360ms" }}
          >
            <CtaLink
              href={hero.primaryCta.href}
              variant="primary"
              size="lg"
              trackAsDemo="hero_get_started"
            >
              {hero.primaryCta.label}
            </CtaLink>
            <TalkWithDiyaButton
              label={hero.secondaryCta.label}
              trackAs="hero_talk_with_diya"
            />
          </div>

          <div className="hidden lg:block">
            <HeroStats />
          </div>
        </div>

        <HeroOrbVisual />

        <div className="lg:hidden">
          <HeroStats />
        </div>
      </Container>
    </section>
  );
}
