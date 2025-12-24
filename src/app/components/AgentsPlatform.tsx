"use client";

import { motion } from "framer-motion";
import { Database, Activity, Search, AlertOctagon, FileCheck, BarChart3, Bot } from "lucide-react";
import { Container } from "./ui/Container";
import { Section } from "./ui/Section";

const agents = [
    {
        title: "Data Integration Agent",
        role: "The Connector",
        desc: "Seamlessly connects to SQL, NoSQL, and API endpoints to ingest and normalize data.",
        icon: Database,
        color: "text-blue-600",
        bg: "bg-blue-50",
    },
    {
        title: "Monitoring Agent",
        role: "The Watchdog",
        desc: "Tracks system health metrics in real-time and filters out noise from actual incidents.",
        icon: Activity,
        color: "text-green-600",
        bg: "bg-green-50",
    },
    {
        title: "Root Cause Agent",
        role: "The Detective",
        desc: "Correlates logs, traces, and changes to identify the exact source of failure.",
        icon: Search,
        color: "text-purple-600",
        bg: "bg-purple-50",
    },
    {
        title: "Anomaly Agent",
        role: "The Pattern Hunter",
        desc: "Detects subtle deviations in baseline performance that static thresholds miss.",
        icon: AlertOctagon,
        color: "text-orange-600",
        bg: "bg-orange-50",
    },
    {
        title: "Compliance Agent",
        role: "The Auditor",
        desc: "Continuously scans for PII leaks, access violations, and policy drifts.",
        icon: FileCheck,
        color: "text-teal-600",
        bg: "bg-teal-50",
    },
    {
        title: "Reporting Agent",
        role: "The Analyst",
        desc: "Drafts post-mortem reports and executive summaries automatically.",
        icon: BarChart3,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
    },
];

export function AgentsPlatform() {
    return (
        <Section id="agents" className="bg-white py-24">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obs-surface border border-obs-border text-xs font-semibold uppercase tracking-wider text-obs-navy mb-6">
                        <Bot className="w-3 h-3" />
                        Agentic Architecture
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-obs-navy mb-6">
                        A Team of AI Agents. <br /> Each With a Job.
                    </h2>
                    <p className="text-obs-text-muted text-lg">
                        OpsBrain isn’t a chatbot. It’s a coordinated system of specialized agents working together to run your operations.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map((agent, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group p-6 rounded-2xl border border-obs-border bg-white hover:shadow-enterprise transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`w-12 h-12 rounded-xl ${agent.bg} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                                <agent.icon className={`w-6 h-6 ${agent.color}`} />
                            </div>

                            <div className="mb-2">
                                <span className="text-xs font-bold text-obs-text-dim uppercase tracking-wider">{agent.role}</span>
                            </div>

                            <h3 className="text-xl font-bold text-obs-navy mb-3">{agent.title}</h3>
                            <p className="text-obs-text-muted text-sm leading-relaxed">
                                {agent.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
