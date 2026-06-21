import { Breadcrumbs, type BreadcrumbItem } from "@/components/pages/Breadcrumbs";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function PageHeaderNav({
  breadcrumbs,
  backHref,
  backLabel = "Back",
  className,
}: {
  breadcrumbs: BreadcrumbItem[];
  backHref?: string;
  backLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border-default bg-surface-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-5",
        className,
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {backHref ? (
          <Link
            href={backHref}
            className={cn(
              "inline-flex w-fit items-center gap-2 rounded-lg border border-border-default bg-surface-muted/60 px-3 py-2",
              "text-small font-medium text-text-secondary transition-all",
              "hover:border-brand-primary/30 hover:bg-brand-primary-light/20 hover:text-brand-primary",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
            )}
          >
            <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
            {backLabel}
          </Link>
        ) : (
          <span className="hidden sm:block sm:w-[140px]" aria-hidden="true" />
        )}
        <div className="min-w-0 sm:flex-1 sm:text-right">
          <Breadcrumbs items={breadcrumbs} className="sm:justify-end" />
        </div>
      </div>
    </div>
  );
}
