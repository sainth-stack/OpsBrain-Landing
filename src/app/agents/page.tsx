"use client";

import { Container } from "../components/ui/Container";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FinalCTA } from "../components/FinalCTA";
import { AgentsPlatform } from "../components/AgentsPlatform";

export default function AgentsPage() {
    return (
        <main className="min-h-screen bg-obs-bg pt-20">
            <Navbar />
            <Container className="py-24 pb-0">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-heading font-bold text-obs-navy mb-6">
                        Specialized AI Agents
                    </h1>
                    <p className="text-xl text-obs-text-muted">
                        Each agent is purpose-built to handle specific operational tasks with expert precision.
                    </p>
                </div>
            </Container>
            <AgentsPlatform />
            <FinalCTA />
            <Footer />
        </main>
    );
}
