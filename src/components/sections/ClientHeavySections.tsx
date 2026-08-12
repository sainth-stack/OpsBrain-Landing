"use client";

import dynamic from "next/dynamic";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";

const WhyOpsBrain = dynamic(
  () => import("@/components/sections/WhyOpsBrain").then((m) => m.WhyOpsBrain),
  { loading: () => <SectionSkeleton /> },
);
const FAQ = dynamic(
  () => import("@/components/sections/FAQ").then((m) => m.FAQ),
  { loading: () => <SectionSkeleton /> },
);
const MoreFromOpsBrain = dynamic(
  () =>
    import("@/components/sections/MoreFromOpsBrain").then(
      (m) => m.MoreFromOpsBrain,
    ),
  { loading: () => <SectionSkeleton /> },
);

export function ClientHeavySections() {
  return (
    <>
      <div className="below-fold-section">
        <WhyOpsBrain />
      </div>
      <div className="below-fold-section">
        <FAQ />
      </div>
      <div className="below-fold-section">
        <MoreFromOpsBrain />
      </div>
      <FinalCTA />
    </>
  );
}
