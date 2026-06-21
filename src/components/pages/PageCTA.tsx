import { ButtonLink } from "@/components/ui/button";

export function PageCTA({
  title = "Ready to deploy your AI employee?",
  description = "Tell us about your workflow and we'll configure your first AI employee within 24 hours.",
  primaryHref = "/#contact",
  primaryLabel = "Get Started",
  secondaryHref = "/pricing",
  secondaryLabel = "View pricing",
}: {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section
      className="rounded-2xl border border-brand-primary/20 bg-brand-primary-light/30 p-8 md:p-10"
      aria-label="Call to action"
    >
      <h2 className="font-display text-h2 font-bold text-text-primary">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-body leading-relaxed text-text-secondary">
        {description}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <ButtonLink
          href={primaryHref}
          variant="primary"
          size="lg"
          trackAsDemo="page_cta_book_demo"
        >
          {primaryLabel}
        </ButtonLink>
        <ButtonLink href={secondaryHref} variant="secondary" size="lg">
          {secondaryLabel}
        </ButtonLink>
      </div>
    </section>
  );
}
