"use client";

import { Container } from "../components/ui/Container";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FinalCTA } from "../components/FinalCTA";

export default function PlatformPage() {
    return (
        <main className="min-h-screen bg-obs-bg pt-20">
            <Navbar />
            <Container className="py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-heading font-bold text-obs-navy mb-6">
                        Enterprise AI Ops Platform
                    </h1>
                    <p className="text-xl text-obs-text-muted mb-12">
                        A unified control plane for your operational data, agents, and automation.
                    </p>
                    <div className="p-12 bg-obs-surface rounded-2xl border border-obs-border">
                        <p className="font-medium text-obs-text-dim">Detailed platform architecture and agent orchestration capabilities coming soon.</p>
                    </div>
                </div>
            </Container>
            <FinalCTA />
            <Footer />
        </main>
    );
}
