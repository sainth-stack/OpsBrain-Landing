"use client";

import dynamic from "next/dynamic";

const MobileStickyCTA = dynamic(
  () =>
    import("@/components/layout/MobileStickyCTA").then(
      (m) => m.MobileStickyCTA,
    ),
  { ssr: false },
);

export function DeferredMobileCTA() {
  return <MobileStickyCTA />;
}
