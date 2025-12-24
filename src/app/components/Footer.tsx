"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "./ui/Container";

const footerLinks = {
    Platform: [
        { label: "AI Agents", href: "#" },
        { label: "Data Connections", href: "#" },
        { label: "Security", href: "#" },
        { label: "Integrations", href: "#" },
    ],
    Solutions: [
        { label: "For DevOps", href: "#" },
        { label: "For Support", href: "#" },
        { label: "For Security", href: "#" },
        { label: "Case Studies", href: "#" },
    ],
    Company: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Contact", href: "#" },
    ],
    Legal: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
        { label: "SOC 2 Compliance", href: "#" },
    ]
};

export function Footer() {
    return (
        <footer className="bg-obs-navy border-t border-obs-border/10 pt-16 pb-8">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="#top" className="inline-block mb-6">
                            <Image
                                src="/opsbrain/opsbrain_logo_wordmark_dark.png"
                                alt="OpsBrain"
                                width={150}
                                height={35}
                                className="h-8 w-auto opacity-90"
                            />
                        </Link>
                        <p className="text-obs-text-dim text-sm leading-relaxed max-w-xs mb-6">
                            OpsBrain deploys AI agents that connect enterprise systems, data, and documents to detect issues and drive real operational decisions.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="https://www.linkedin.com/company/opsbrain/"
                                target="_blank"
                                className="w-8 h-8 rounded bg-obs-surface/10 flex items-center justify-center hover:bg-obs-surface/20 hover:text-white transition-colors text-obs-text-dim"
                            >
                                <span className="sr-only">LinkedIn</span>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.542V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </Link>
                            {/* Social icons placeholders */}
                            <div className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 transition-colors" />
                            <div className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 transition-colors" />
                        </div>
                    </div>

                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category} className="col-span-1">
                            <h4 className="font-bold text-white mb-4">{category}</h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-sm text-obs-text-muted hover:text-white transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-obs-border/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-obs-text-dim">
                        &copy; {new Date().getFullYear()} OpsBrain Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2 text-xs text-obs-text-dim">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            System Operational
                        </span>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
