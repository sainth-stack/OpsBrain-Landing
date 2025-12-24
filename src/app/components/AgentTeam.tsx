"use client";

import { motion } from "framer-motion";
import { Container } from "./ui/Container";
import { Section } from "./ui/Section";
import { Database, Activity, Search, AlertCircle, FileCheck, BarChart3 } from "lucide-react";

const agents = [
    {
        title: "Data Integration Agent",
        role: "Ingest & Normalize",
        desc: "Connects to any structured or unstructured source and creates a unified schema on the fly.",
        icon: Database,
        color: "text-blue-500"
    },
    {
        title: "Monitoring Agent",
        role: "Observe & Track",
        desc: "Watches metrics and logs 24/7. Understands 'normal' baselines without manual thresholds.",
        icon: Activity,
        color: "text-green-500"
    },
    {
        title: "Anomaly Agent",
        role: "Detect & Flag",
        desc: "Spots subtle deviations in patterns that humans miss. Correlates them across stacks.",
        icon: AlertCircle,
        color: "text-amber-500"
    },
    {
        title: "RCA Agent",
        role: "Root Cause Analysis",
        desc: "Traces the error back to the commit, config change, or infrastructure event that caused it.",
        icon: Search,
        color: "text-red-500"
    },
    {
        title: "Compliance Agent",
        role: "Audit & Verify",
        desc: "Ensures all data handling meets SOC2, HIPAA, and GDPR standards automatically.",
        icon: FileCheck,
        color: "text-purple-500"
    },
    {
        title: "Reporting Agent",
        role: "Summarize & Report",
        desc: "Drafts executive summaries and technical post-mortems in seconds.",
        icon: BarChart3,
        color: "text-cyan-500"
    }
];

export function AgentTeam() {
    return (
        <Section id="agents" className="bg-obs-graphite">
            <Container>
                <div className="mb-16 max-w-2xl">
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
                        Not One AI. A Team of <span className="text-obs-accent-blue">Specialized Agents</span>.
                    </h2>
                    <p className="text-obs-text-muted text-lg">
                        Generic LLMs hallucinate. OpsBrain’s specialized agents utilize narrow scope and tool-calling to ensure accuracy.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map((agent, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="p-1 rounded-2xl bg-gradient-to-br from-obs-surface-bright/50 to-transparent hover:from-obs-accent-blue/50 transition-colors duration-500"
                        >
                            <div className="bg-obs-navy h-full rounded-xl p-6 border border-obs-border">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-lg bg-obs-surface ${agent.color} bg-opacity-10`}>
                                        <agent.icon className={`w-6 h-6 ${agent.color}`} />
                                    </div>
                                    <span className="text-xs uppercase font-semibold text-obs-text-dim border border-obs-border px-2 py-1 rounded">
                                        {agent.role}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{agent.title}</h3>
                                <p className="text-obs-text-muted text-sm leading-relaxed">
                                    {agent.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
