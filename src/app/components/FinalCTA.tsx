"use client";

import { ArrowRight, MessageSquare } from "lucide-react";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";

export function FinalCTA() {
    return (
        <section className="bg-obs-navy py-24 relative overflow-hidden">
            {/* Abstract Background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-obs-accent-blue/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-obs-accent-teal/10 blur-[100px] pointer-events-none" />

            <Container className="relative z-10 text-center">
                <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
                    Ready to See AI Agents at Work?
                </h2>
                <p className="text-lg text-obs-text-muted mb-10 max-w-2xl mx-auto">
                    Join the forward-thinking enterprises using OpsBrain to turn data noise into operational decisions.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        size="lg"
                        variant="primary"
                        className="bg-obs-accent-green hover:bg-obs-accent-green/90 text-white min-w-[200px] shadow-lg shadow-obs-accent-green/20"
                        onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
                    >
                        Request Enterprise Demo
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="min-w-[200px]"
                    >
                        <MessageSquare className="mr-2 w-4 h-4" />
                        Talk to Enterprise Team
                    </Button>
                </div>
            </Container>
        </section>
    );
}
