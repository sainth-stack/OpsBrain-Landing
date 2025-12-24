import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustBar } from "./components/TrustBar";
import { ProblemSection } from "./components/ProblemSection";
import { SolutionSection } from "./components/SolutionSection";
import { HowItWorks } from "./components/HowItWorks";
import { AgentsPlatform } from "./components/AgentsPlatform";
import { UseCases } from "./components/UseCases";
import { SecuritySection } from "./components/SecuritySection";
import { ComparisonTable } from "./components/ComparisonTable";
import { LeadershipSection } from "./components/LeadershipSection";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-obs-bg">
      <Navbar />
      <Hero />
      <TrustBar />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <AgentsPlatform />
      <UseCases />
      <SecuritySection />
      <ComparisonTable />
      <LeadershipSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
