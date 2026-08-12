"use client";

import {
  opsbrainAiNavItems,
  productNavItems,
  type ProductNavItem,
} from "@/content/products";
import { ctaLinks } from "@/content/site";
import { isProductsNavActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

function ProductRows({
  items,
  onNavigate,
}: {
  items: ProductNavItem[];
  onNavigate?: () => void;
}) {
  return (
    <ul role="list" className="space-y-0.5">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex flex-col rounded-lg px-3 py-2.5 transition-colors",
              "hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
            )}
          >
            <span className="flex items-center gap-2">
              <span className="text-sm font-semibold text-text-primary">
                {item.name}
              </span>
              {item.badge ? (
                <span className="rounded-md bg-brand-primary-light px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-primary">
                  {item.badge}
                </span>
              ) : null}
            </span>
            <span className="mt-0.5 text-small leading-snug text-text-secondary">
              {item.tagline}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ProductsNavDesktop() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLIElement>(null);
  const menuId = useId();
  const active = isProductsNavActive(pathname);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <li
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
          active || open
            ? "text-brand-primary"
            : "text-text-secondary hover:text-text-primary",
        )}
      >
        Products
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Products"
          className="absolute left-1/2 top-full z-50 w-[36rem] -translate-x-1/2 pt-3"
        >
          <div className="overflow-hidden rounded-xl border border-border-default bg-surface-white shadow-lg">
            <div className="grid grid-cols-2 gap-px bg-border-default">
              <div className="bg-surface-white p-3">
                <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Products
                </p>
                <ProductRows
                  items={productNavItems}
                  onNavigate={() => setOpen(false)}
                />
              </div>
              <div className="bg-surface-muted/40 p-3">
                <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  In OpsBrain AI
                </p>
                <ProductRows
                  items={opsbrainAiNavItems}
                  onNavigate={() => setOpen(false)}
                />
              </div>
            </div>
            <div className="border-t border-border-default bg-surface-muted/30 px-4 py-2.5">
              <Link
                href={ctaLinks.talkToAgent.href}
                onClick={() => setOpen(false)}
                className="text-[13px] font-semibold text-brand-primary hover:underline"
              >
                Talk to an agent
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </li>
  );
}

export function ProductsNavMobile({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const pathname = usePathname();
  const active = isProductsNavActive(pathname);

  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-medium hover:bg-surface-muted",
          active ? "text-brand-primary" : "text-text-primary",
        )}
      >
        Products
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <div id={menuId} className="space-y-3 pb-2 pl-2">
          <div>
            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
              Products
            </p>
            <ProductRows items={productNavItems} onNavigate={onNavigate} />
          </div>
          <div>
            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
              In OpsBrain AI
            </p>
            <ProductRows items={opsbrainAiNavItems} onNavigate={onNavigate} />
          </div>
        </div>
      ) : null}
    </li>
  );
}
