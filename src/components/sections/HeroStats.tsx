import { hero } from "@/content/site";

export function HeroStats() {
  return (
    <div
      className="grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-border-default bg-surface-white/80 shadow-[0_1px_0_rgba(15,23,42,0.03)] backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4"
      aria-label="Product highlights"
    >
      {hero.featureCards.map((card, index) => (
        <article
          key={card.eyebrow}
          className={[
            "relative px-5 py-6 sm:px-6 sm:py-7",
            index > 0 ? "border-t border-border-default sm:border-t-0" : "",
            index % 2 === 1 ? "sm:border-l sm:border-border-default" : "",
            index > 0 ? "lg:border-l lg:border-border-default" : "",
            index === 2 ? "sm:border-t sm:border-border-default lg:border-t-0" : "",
            index === 3 ? "sm:border-t sm:border-border-default lg:border-t-0" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-primary">
            <span
              className="size-1.5 shrink-0 rounded-full bg-brand-primary"
              aria-hidden="true"
            />
            {card.eyebrow}
          </p>
          <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-text-primary sm:text-xl">
            {card.title}
          </h3>
          <p className="mt-1.5 text-sm leading-snug text-text-muted">{card.description}</p>
        </article>
      ))}
    </div>
  );
}
