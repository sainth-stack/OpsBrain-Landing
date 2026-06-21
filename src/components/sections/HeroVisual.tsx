"use client";

import dynamic from "next/dynamic";

const DashboardMockup = dynamic(
  () =>
    import("@/components/visuals/DashboardMockup").then(
      (m) => m.DashboardMockup,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto h-[380px] w-full max-w-lg animate-pulse rounded-2xl bg-surface-dark-elevated/80"
        aria-hidden="true"
      />
    ),
  },
);

export function HeroVisual() {
  return (
    <div className="hero-fade-up hero-delay-5">
      <DashboardMockup className="lg:ml-auto" />
    </div>
  );
}
