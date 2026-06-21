import dynamic from "next/dynamic";
import { ClientHeavySections } from "@/components/sections/ClientHeavySections";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";
import {
  getFaqJsonLd,
  getOrganizationJsonLd,
  getSoftwareApplicationJsonLd,
} from "@/lib/seo";

const Problem = dynamic(
  () => import("@/components/sections/Problem").then((m) => m.Problem),
  { loading: () => <SectionSkeleton /> },
);
const HowItWorks = dynamic(
  () => import("@/components/sections/HowItWorks").then((m) => m.HowItWorks),
  { loading: () => <SectionSkeleton /> },
);
const Workflow = dynamic(
  () => import("@/components/sections/Workflow").then((m) => m.Workflow),
  { loading: () => <SectionSkeleton /> },
);
const Capabilities = dynamic(
  () => import("@/components/sections/Capabilities").then((m) => m.Capabilities),
  { loading: () => <SectionSkeleton /> },
);
const AIEmployees = dynamic(
  () => import("@/components/sections/AIEmployees").then((m) => m.AIEmployees),
  { loading: () => <SectionSkeleton /> },
);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    getOrganizationJsonLd(),
    getSoftwareApplicationJsonLd(),
    getFaqJsonLd(),
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <div className="below-fold-section">
          <Problem />
        </div>
        <div className="below-fold-section">
          <HowItWorks />
        </div>
        <div className="below-fold-section">
          <Workflow />
        </div>
        <div className="below-fold-section">
          <Capabilities />
        </div>
        <div className="below-fold-section">
          <AIEmployees />
        </div>
        <ClientHeavySections />
      </main>
    </>
  );
}
