"use client";

import { Container } from "./ui/Container";
import Image from "next/image";

const logos = [
    "Acme Corp",
    "GlobalBank",
    "TechFlow",
    "DataSystems",
    "CloudScale",
    "EnterpriseNet"
];

export function TrustBar() {
    return (
        <section className="border-b border-obs-border bg-white py-10">
            <Container>
                <p className="text-center text-sm font-semibold uppercase tracking-wider text-obs-text-dim mb-8">
                    Trusted by modern enterprises
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* In a real scenario, these would be SVGs. Using placeholder spans with enterprise-style font for now to be clean */}
                    {logos.map((logo) => (
                        <div key={logo} className="text-xl font-bold text-obs-navy-secondary flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-obs-border/50" />
                            {logo}
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
