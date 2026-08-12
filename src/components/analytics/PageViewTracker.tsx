"use client";

import { captureAttribution } from "@/lib/attribution";
import { trackPageView } from "@/lib/landing-api";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Fires a pageview ping to the OpsBrain backend on every route change.
 * Also captures UTM attribution on first load.
 * Renders nothing - mount once in the root layout.
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      captureAttribution();
      firstRender.current = false;
    }
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
