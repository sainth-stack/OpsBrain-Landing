import Link from "next/link";

export function RelatedLinks({
  title = "Related pages",
  links,
}: {
  title?: string;
  links: { href: string; label: string; description?: string }[];
}) {
  return (
    <section aria-labelledby="related-links-heading">
      <h2
        id="related-links-heading"
        className="text-h3 font-semibold text-text-primary"
      >
        {title}
      </h2>
      <ul className="mt-4 space-y-3" role="list">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group block rounded-lg border border-border-default bg-surface-white p-4 transition-colors hover:border-brand-primary/40 hover:bg-brand-primary-light/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              <span className="font-medium text-brand-primary group-hover:underline">
                {link.label}
              </span>
              {link.description ? (
                <p className="mt-1 text-small text-text-secondary">
                  {link.description}
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
