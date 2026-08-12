"use client";

import { useCaseNavItems } from "@/content/products";
import { isUseCasesNavActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

function UseCaseRows({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul role="list" className="grid gap-0.5 sm:grid-cols-2">
      {useCaseNavItems.map((item) => (
        <li key={item.id}>
          <Link
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex flex-col rounded-lg px-3 py-2.5 transition-colors",
              "hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
            )}
          >
            <span className="text-sm font-semibold text-text-primary">
              {item.name}
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

export function UseCasesNavDesktop() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLIElement>(null);
  const menuId = useId();
  const active = isUseCasesNavActive(pathname);

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
        Use cases
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Use cases"
          className="absolute left-1/2 top-full z-50 w-[28rem] -translate-x-1/2 pt-3"
        >
          <div className="overflow-hidden rounded-xl border border-border-default bg-surface-white p-3 shadow-lg">
            <UseCaseRows onNavigate={() => setOpen(false)} />
            <div className="mt-2 border-t border-border-default px-3 pt-2.5">
              <Link
                href="/ai-employees"
                onClick={() => setOpen(false)}
                className="text-[13px] font-semibold text-brand-primary hover:underline"
              >
                View all AI employees
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </li>
  );
}

export function UseCasesNavMobile({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const pathname = usePathname();
  const active = isUseCasesNavActive(pathname);

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
        Use cases
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <div id={menuId} className="pb-2 pl-2">
          <UseCaseRows onNavigate={onNavigate} />
          <Link
            href="/ai-employees"
            onClick={onNavigate}
            className="mt-2 block px-3 text-[13px] font-semibold text-brand-primary"
          >
            View all AI employees
          </Link>
        </div>
      ) : null}
    </li>
  );
}
