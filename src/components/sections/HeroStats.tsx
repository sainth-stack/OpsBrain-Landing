import { hero } from "@/content/site";

export function HeroStats() {
  return (
    <div
      className="mt-10 grid grid-cols-3 gap-4 border-t border-border-default pt-8 sm:gap-6 lg:mt-12"
      aria-label="Key performance metrics"
    >
      {hero.stats.map((stat) => (
        <div key={stat.label} className="text-left">
          <span className="text-2xl font-bold tabular-nums text-brand-primary md:text-3xl">
            {stat.value}
          </span>
          <p className="mt-1 text-small leading-snug text-text-muted">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
