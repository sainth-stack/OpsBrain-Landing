"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "./ui/Container";
import { Section } from "./ui/Section";
import { Linkedin } from "lucide-react";

const leaders = [
    {
        name: "Sainath Reddy",
        role: "Founder & CEO",
        bio: "Building the autopilot for enterprise operations.",
        linkedin: "https://www.linkedin.com/in/sainathreddyguraka/",
        image: null
    },
    {
        name: "Eswar Silaveri",
        role: "Co-Founder & CTO",
        bio: "Architecting scalable AI agents that reason.",
        linkedin: "https://www.linkedin.com/in/silaveri-eswar-829876208/",
        image: null
    },
    {
        name: "Meer Mohammed Baqar",
        role: "Co-Founder & COO",
        bio: "Driving operational excellence and enterprise growth.",
        linkedin: "https://www.linkedin.com/in/meer-mohammed-baqar-273987245/",
        image: null
    }
];

export function LeadershipSection() {
    return (
        <Section id="leadership" className="bg-obs-surface py-24 border-t border-obs-border">
            <Container>
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-obs-navy mb-4">
                        Built by Enterprise Veterans
                    </h2>
                    <p className="text-obs-text-muted text-lg">
                        Our team understands the complexity of modern infrastructure because we've lived it.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {leaders.map((leader) => (
                        <div key={leader.name} className="group bg-white rounded-2xl p-8 border border-obs-border shadow-sm hover:shadow-enterprise transition-all text-center">
                            <div className="w-24 h-24 mx-auto bg-obs-navy/5 rounded-full mb-6 flex items-center justify-center text-2xl font-bold text-obs-navy border-2 border-white shadow-lg overflow-hidden relative">
                                {/* Placeholder for avatar */}
                                <div className="absolute inset-0 bg-gradient-to-br from-obs-surface to-obs-border flex items-center justify-center">
                                    {leader.name.charAt(0)}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-obs-navy mb-1">{leader.name}</h3>
                            <div className="text-sm font-semibold text-obs-accent-blue uppercase tracking-wide mb-4">{leader.role}</div>
                            <p className="text-obs-text-muted mb-6 text-sm leading-relaxed">{leader.bio}</p>

                            <Link
                                href={leader.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                            >
                                <Linkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
