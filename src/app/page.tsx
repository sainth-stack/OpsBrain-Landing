import dynamic from "next/dynamic";
import { ClientHeavySections } from "@/components/sections/ClientHeavySections";
import { Hero } from "@/components/sections/Hero";
import { TalkToAgent } from "@/components/sections/TalkToAgent";
import { TrustBar } from "@/components/sections/TrustBar";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";
import { siteConfig } from "@/content/site";
import { buildPageMetadata, getHomeJsonLd } from "@/lib/seo";

const Problem = dynamic(
  () => import("@/components/sections/Problem").then((m) => m.Problem),
  { loading: () => <SectionSkeleton /> },
);
const HowItWorks = dynamic(
  () => import("@/components/sections/HowItWorks").then((m) => m.HowItWorks),
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
const IndustryVoiceShowcase = dynamic(
  () =>
    import("@/components/sections/IndustryVoiceShowcase").then(
      (m) => m.IndustryVoiceShowcase,
    ),
  { loading: () => <SectionSkeleton /> },
);

export const metadata = buildPageMetadata({
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  path: "/",
});

const jsonLd = getHomeJsonLd();

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1">
        <Hero />
        <TalkToAgent />
        <TrustBar />
        <div className="below-fold-section">
          <Problem />
        </div>
        <div className="below-fold-section">
          <HowItWorks />
        </div>
        <div className="below-fold-section">
          <Capabilities />
        </div>
        <div className="below-fold-section">
          <AIEmployees />
        </div>
        <div className="below-fold-section">
          <IndustryVoiceShowcase />
        </div>
        <ClientHeavySections />
      </main>
    </>
  );
}
