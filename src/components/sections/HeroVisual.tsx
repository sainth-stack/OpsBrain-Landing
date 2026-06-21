"use client";

import dynamic from "next/dynamic";

const RevenueNetworkHero = dynamic(
  () =>
    import("@/components/visuals/RevenueNetworkHero").then(
      (m) => m.RevenueNetworkHero,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto h-[520px] w-full max-w-[920px] animate-pulse rounded-2xl bg-surface-dark-elevated/80 sm:h-[540px] md:h-[500px]"
        aria-hidden="true"
      />
    ),
  },
);

export function HeroVisual() {
  return (
    <div className="hero-fade-up hero-delay-5">
      <RevenueNetworkHero className="lg:ml-auto" />
    </div>
  );
}
