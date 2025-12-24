"use client";

import { Container } from "../components/ui/Container";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FinalCTA } from "../components/FinalCTA";
import { FileText, PlayCircle, BookOpen } from "lucide-react";

const resources = [
    { title: "Enterprise AI Guide", type: "Whitepaper", icon: FileText },
    { title: "OpsBrain Demo Walkthrough", type: "Video", icon: PlayCircle },
    { title: "API Documentation", type: "Docs", icon: BookOpen },
]

export default function ResourcesPage() {
    return (
        <main className="min-h-screen bg-obs-bg pt-20">
            <Navbar />
            <Container className="py-24">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-heading font-bold text-obs-navy mb-6">
                        Resources
                    </h1>
                    <p className="text-xl text-obs-text-muted">
                        Guides, documentation, and insights to help you get the most out of OpsBrain.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {resources.map((res, i) => (
                        <div key={i} className="p-8 bg-white border border-obs-border rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                            <div className="w-12 h-12 bg-obs-surface rounded-lg flex items-center justify-center mb-4 group-hover:bg-obs-navy group-hover:text-white transition-colors">
                                <res.icon className="w-6 h-6" />
                            </div>
                            <div className="text-xs font-bold text-obs-accent-blue uppercase tracking-wider mb-2">{res.type}</div>
                            <h3 className="text-xl font-bold text-obs-navy">{res.title}</h3>
                        </div>
                    ))}
                </div>
            </Container>
            <FinalCTA />
            <Footer />
        </main>
    );
}
