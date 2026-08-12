"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const NAV_OFFSET_PX = 80;

function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth") {
  const id = hash.replace(/^#/, "");
  if (!id) return false;

  const el = document.getElementById(id);
  if (!el) return false;

  const top =
    el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET_PX;
  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}

function waitForHashTarget(hash: string, attempts = 40) {
  let tries = 0;

  const tick = () => {
    if (scrollToHash(hash, tries === 0 ? "auto" : "smooth")) return;
    tries += 1;
    if (tries < attempts) {
      window.setTimeout(tick, 50);
    }
  };

  tick();
}

/**
 * Ensures `/#contact` (and other hash links) scroll reliably on the homepage,
 * including when FinalCTA is hydrated late or the user is already on `/`.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { hash } = window.location;
    if (hash) {
      // Defer past first paint / dynamic section mount.
      window.requestAnimationFrame(() => waitForHashTarget(hash));
    }

    const onHashChange = () => {
      if (window.location.hash) {
        waitForHashTarget(window.location.hash);
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin || !url.hash) return;

      const isHomeHash =
        (url.pathname === "/" || url.pathname === "") &&
        (pathname === "/" || pathname === "");
      const isSamePageHash =
        url.pathname === pathname ||
        (url.pathname === "" && pathname === "/");

      if (!isHomeHash && !isSamePageHash) return;

      event.preventDefault();
      const nextHash = url.hash;
      if (window.location.hash !== nextHash) {
        history.pushState(null, "", `${pathname}${nextHash}`);
      }
      waitForHashTarget(nextHash);
    };

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick);
    };
  }, [pathname]);

  return null;
}
