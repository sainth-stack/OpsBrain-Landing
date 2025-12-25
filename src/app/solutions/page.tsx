import { Container } from "../components/ui/Container";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FinalCTA } from "../components/FinalCTA";
import { SolutionSection } from "../components/SolutionSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Solutions | Chaos to Clarity Data Integration",
    description: "Solve data chaos with OpsBrain. Unified processing for CSV, PDF, JSON, and SQL. Intelligent file organization and semantic search for modern enterprises.",
    keywords: ["Data Chaos", "Multi-Format Support", "Document Embedding", "Schema Discovery", "S3 Integration", "Vector Database"],
};

export default function SolutionsPage() {
    return (
        <main className="min-h-screen bg-obs-bg pt-20">
            <Navbar />
            <Container className="py-24 pb-0">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-heading font-bold text-obs-navy mb-6">
                        Solutions for Every Team
                    </h1>
                    <p className="text-xl text-obs-text-muted">
                        From DevOps to Support, OpsBrain empowers your teams with instant answers.
                    </p>
                </div>
            </Container>
            <SolutionSection />
            <FinalCTA />
            <Footer />
        </main>
    );
}
