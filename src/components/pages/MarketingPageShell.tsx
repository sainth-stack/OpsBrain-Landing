import { Container } from "@/components/ui/container";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/pages/Breadcrumbs";
import Link from "next/link";
import type { ReactNode } from "react";

export function MarketingPageShell({
  breadcrumbs,
  children,
}: {
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
}) {
  return (
    <main className="flex-1 py-12 md:py-16">
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        <Link
          href="/"
          className="mt-6 inline-flex text-small font-medium text-brand-primary hover:underline"
        >
          ← Back to home
        </Link>
        <div className="mt-8 space-y-12 md:space-y-16">{children}</div>
      </Container>
    </main>
  );
}
