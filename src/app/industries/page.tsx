"use client";

import { Container } from "../components/ui/Container";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FinalCTA } from "../components/FinalCTA";
import { UseCases } from "../components/UseCases";

export default function IndustriesPage() {
    return (
        <main className="min-h-screen bg-obs-bg pt-20">
            <Navbar />
            <Container className="py-24 pb-0">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-heading font-bold text-obs-navy mb-6">
                        Industry-Specific Intelligence
                    </h1>
                    <p className="text-xl text-obs-text-muted">
                        Tailored AI agents for the unique operational challenges of your industry.
                    </p>
                </div>
            </Container>
            <UseCases />
            <FinalCTA />
            <Footer />
        </main>
    );
}
