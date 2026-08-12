import { PageHeaderNav } from "@/components/pages/PageHeaderNav";
import type { BreadcrumbItem } from "@/components/pages/Breadcrumbs";
import { Container } from "@/components/ui/container";
import type { ReactNode } from "react";

export function MarketingPageShell({
  breadcrumbs,
  backHref,
  backLabel = "Back to home",
  children,
}: {
  breadcrumbs: BreadcrumbItem[];
  backHref?: string;
  backLabel?: string;
  children: ReactNode;
}) {
  return (
    <main className="flex-1 py-12 md:py-16">
      <Container>
        <PageHeaderNav
          breadcrumbs={breadcrumbs}
          backHref={backHref}
          backLabel={backLabel}
        />
        <div className="mt-8 space-y-12 md:mt-10 md:space-y-16">{children}</div>
      </Container>
    </main>
  );
}
