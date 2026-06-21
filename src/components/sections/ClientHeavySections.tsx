"use client";

import dynamic from "next/dynamic";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";

const Multilingual = dynamic(
  () => import("@/components/sections/Multilingual").then((m) => m.Multilingual),
  { loading: () => <SectionSkeleton />, ssr: false },
);
const OutcomesMetrics = dynamic(
  () =>
    import("@/components/sections/OutcomesMetrics").then((m) => m.OutcomesMetrics),
  { loading: () => <SectionSkeleton />, ssr: false },
);
const ROICalculator = dynamic(
  () => import("@/components/sections/ROICalculator").then((m) => m.ROICalculator),
  { loading: () => <SectionSkeleton />, ssr: false },
);
const Comparison = dynamic(
  () => import("@/components/sections/Comparison").then((m) => m.Comparison),
  { loading: () => <SectionSkeleton />, ssr: false },
);
const WhyOpsBrain = dynamic(
  () => import("@/components/sections/WhyOpsBrain").then((m) => m.WhyOpsBrain),
  { loading: () => <SectionSkeleton />, ssr: false },
);
const FAQ = dynamic(
  () => import("@/components/sections/FAQ").then((m) => m.FAQ),
  { loading: () => <SectionSkeleton />, ssr: false },
);
const FinalCTA = dynamic(
  () => import("@/components/sections/FinalCTA").then((m) => m.FinalCTA),
  { loading: () => <SectionSkeleton />, ssr: false },
);

export function ClientHeavySections() {
  return (
    <>
      <div className="below-fold-section">
        <Multilingual />
      </div>
      <div className="below-fold-section">
        <OutcomesMetrics />
      </div>
      <div className="below-fold-section">
        <ROICalculator />
      </div>
      <div className="below-fold-section">
        <Comparison />
      </div>
      <div className="below-fold-section">
        <WhyOpsBrain />
      </div>
      <div className="below-fold-section">
        <FAQ />
      </div>
      <div className="below-fold-section">
        <FinalCTA />
      </div>
    </>
  );
}
