import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <header className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="text-small font-semibold uppercase tracking-wider text-brand-primary">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-3 font-display text-h1 font-bold text-text-primary md:text-display">
        {title}
      </h1>
      <p className="mt-4 text-body leading-relaxed text-text-secondary md:text-lg">
        {subtitle}
      </p>
    </header>
  );
}
