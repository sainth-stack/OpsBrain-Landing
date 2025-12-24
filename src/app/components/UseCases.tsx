"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "./ui/Container";
import { Section } from "./ui/Section";
import clsx from "clsx";
import { Building2, Gavel, Hammer, HeartPulse, Laptop, Landmark } from "lucide-react";

const industries = [
    {
        id: "tech",
        label: "SaaS & Tech",
        icon: Laptop,
        case: {
            problem: "Incident spikes during deployment, unclear root cause in 50+ microservices.",
            question: "Why did API latency spike by 300% after the v4.2 release?",
            answer: "Correlation found: Release v4.2 introduced a N+1 query in the UserAuth microservice (Line 42), saturating the Read Replica DB."
        }
    },
    {
        id: "mfg",
        label: "Manufacturing",
        icon: Hammer,
        case: {
            problem: "Unplanned downtime in assembly line controllers causing shipment delays.",
            question: "What caused the robotic arm controller failure on Line 3 yesterday?",
            answer: "Log analysis: Voltage fluctuation pattern detected 2 minutes prior to failure, correlating with HVAC startup surge in Sector 4."
        }
    },
    {
        id: "finance",
        label: "Finance",
        icon: Landmark,
        case: {
            problem: "Trade reconciliation failures delayed end-of-day reporting by 4 hours.",
            question: "Where is the data mismatch in the EOD settlement report?",
            answer: "Data Audit: Gateway B timestamp format changed from ISO8601 to Epoch at 14:00 UTC, causing ingestion validation errors."
        }
    },
    {
        id: "health",
        label: "Healthcare",
        icon: HeartPulse,
        case: {
            problem: "Patient data access logs showed unusual patterns during night shift.",
            question: "Was there authorized access to VIP patient records last night?",
            answer: "Security Scan: Yes, authorized access by Dr. Smith (ID: 9942) from authorized terminal. Context: Emergency crash cart protocol triggered."
        }
    },
    {
        id: "legal",
        label: "Legal & Compliance",
        icon: Gavel,
        case: {
            problem: "Audit request for all email communications regarding 'Project Alpha'.",
            question: "Retrieve all communications about Project Alpha risks from Q3?",
            answer: "Discovery Complete: 423 emails, 54 Slack threads, and 12 PDF contracts indexed and tagged. Summary of risks generated."
        }
    },
];

export function UseCases() {
    const [activeTab, setActiveTab] = useState(industries[0]);

    return (
        <Section id="use-cases" className="bg-obs-surface py-24">
            <Container>
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-obs-border text-xs font-semibold uppercase tracking-wider text-obs-navy mb-6">
                        <Building2 className="w-3 h-3" />
                        Industry Solutions
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-obs-navy mb-4">
                        Built for Complex Enterprises
                    </h2>
                    <p className="text-obs-text-muted text-lg max-w-2xl mx-auto">
                        See how OpsBrain agents solve real-world operational challenges across industries.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Tabs */}
                    <div className="lg:w-1/3 flex flex-col gap-2">
                        {industries.map((ind) => (
                            <button
                                key={ind.id}
                                onClick={() => setActiveTab(ind)}
                                className={clsx(
                                    "flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 border",
                                    activeTab.id === ind.id
                                        ? "bg-white border-obs-border shadow-enterprise ring-1 ring-obs-border/50"
                                        : "bg-transparent border-transparent hover:bg-white/50 text-obs-text-muted"
                                )}
                            >
                                <div className={clsx(
                                    "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                                    activeTab.id === ind.id ? "bg-obs-navy text-white" : "bg-obs-border/30 text-obs-text-muted"
                                )}>
                                    <ind.icon className="w-5 h-5" />
                                </div>
                                <span className={clsx("font-semibold", activeTab.id === ind.id ? "text-obs-navy" : "text-obs-text-muted")}>
                                    {ind.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="lg:w-2/3">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white rounded-2xl border border-obs-border p-8 shadow-enterprise-lg h-full flex flex-col justify-center"
                            >
                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-sm font-bold text-obs-text-dim uppercase tracking-wider mb-2">The Challenge</h4>
                                        <p className="text-lg text-obs-navy font-medium">"{activeTab.case.problem}"</p>
                                    </div>

                                    <div className="p-6 bg-obs-surface rounded-xl border border-obs-border">
                                        <h4 className="text-sm font-bold text-obs-accent-blue uppercase tracking-wider mb-3">User Question</h4>
                                        <p className="text-xl font-heading font-semibold text-obs-navy">"{activeTab.case.question}"</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold text-obs-accent-green uppercase tracking-wider mb-2">OpsBrain Answer</h4>
                                        <div className="flex gap-3">
                                            <div className="flex-shrink-0 w-1 bg-obs-accent-green rounded-full" />
                                            <p className="text-obs-text-muted leading-relaxed">{activeTab.case.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
