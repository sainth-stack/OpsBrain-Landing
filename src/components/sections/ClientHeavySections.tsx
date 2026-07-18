"use client";

import dynamic from "next/dynamic";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";

const OutcomesMetrics = dynamic(
  () =>
    import("@/components/sections/OutcomesMetrics").then((m) => m.OutcomesMetrics),
  { loading: () => <SectionSkeleton /> },
);
const ROICalculator = dynamic(
  () => import("@/components/sections/ROICalculator").then((m) => m.ROICalculator),
  { loading: () => <SectionSkeleton /> },
);
const Comparison = dynamic(
  () => import("@/components/sections/Comparison").then((m) => m.Comparison),
  { loading: () => <SectionSkeleton /> },
);
const WhyOpsBrain = dynamic(
  () => import("@/components/sections/WhyOpsBrain").then((m) => m.WhyOpsBrain),
  { loading: () => <SectionSkeleton /> },
);
const FAQ = dynamic(
  () => import("@/components/sections/FAQ").then((m) => m.FAQ),
  { loading: () => <SectionSkeleton /> },
);
const FinalCTA = dynamic(
  () => import("@/components/sections/FinalCTA").then((m) => m.FinalCTA),
  { loading: () => <SectionSkeleton /> },
);

export function ClientHeavySections() {
  return (
    <>
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
