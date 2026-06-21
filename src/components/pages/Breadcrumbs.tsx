import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export type BreadcrumbItem = { name: string; path: string };

export function Breadcrumbs({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("min-w-0", className)}>
      <ol className={cn("flex flex-wrap items-center gap-1 text-small", className)}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isHome = index === 0 && item.path === "/";

          return (
            <li key={`${item.path}-${index}`} className="flex min-w-0 items-center">
              {index > 0 ? (
                <ChevronRight
                  className="mx-1 size-3.5 shrink-0 text-text-muted/70"
                  aria-hidden="true"
                />
              ) : null}
              {isLast ? (
                <span
                  className="truncate font-medium text-text-primary"
                  aria-current="page"
                  title={item.name}
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className={cn(
                    "inline-flex max-w-[12rem] items-center gap-1 truncate rounded-md px-1 py-0.5 text-text-muted transition-colors",
                    "hover:bg-surface-white hover:text-brand-primary",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                    isHome && "max-w-none",
                  )}
                  title={item.name}
                >
                  {isHome ? (
                    <Home className="size-3.5 shrink-0" aria-hidden="true" />
                  ) : null}
                  <span className={cn("truncate", isHome && "sr-only sm:not-sr-only")}>
                    {isHome ? "Home" : item.name}
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
