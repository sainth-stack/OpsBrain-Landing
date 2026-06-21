import type { FaqItem } from "@/content/seo-pages";

export function PageFaq({
  title = "Frequently asked questions",
  items,
}: {
  title?: string;
  items: FaqItem[];
}) {
  return (
    <section aria-labelledby="page-faq-heading">
      <h2
        id="page-faq-heading"
        className="text-h2 font-bold text-text-primary"
      >
        {title}
      </h2>
      <dl className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item.question}
            className="rounded-xl border border-border-default bg-surface-white p-5"
          >
            <dt className="text-body font-semibold text-text-primary">
              {item.question}
            </dt>
            <dd className="mt-2 text-body leading-relaxed text-text-secondary">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
