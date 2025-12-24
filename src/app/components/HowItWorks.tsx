"use client";

import { motion } from "framer-motion";
import { Database, BrainCircuit, LineChart } from "lucide-react";
import { Container } from "./ui/Container";
import { Section } from "./ui/Section";
import clsx from "clsx";

const steps = [
    {
        title: "Connect Enterprise Data",
        desc: "Securely ingest data from your existing stack—databases, logs, documents, and cloud services.",
        icon: Database,
    },
    {
        title: "AI Agents Analyze",
        desc: "Specialized agents correlate unrelated data points to build a full context of your operations.",
        icon: BrainCircuit,
    },
    {
        title: "Insights & Actions",
        desc: "Receive explainable root-cause analysis and trigger automated remediation workflows.",
        icon: LineChart,
    }
];

export function HowItWorks() {
    return (
        <Section id="how" className="bg-obs-surface border-t border-obs-border py-24">
            <Container>

                <div className="text-center mb-20 max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-obs-navy mb-4">How OpsBrain Works</h2>
                    <p className="text-obs-text-muted text-lg">From disconnected noise to actionable intelligence in three steps.</p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[3rem] left-[15%] right-[15%] h-[2px] bg-obs-border">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-obs-accent-blue/30 to-transparent w-full h-full" />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.2, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                <div className={clsx(
                                    "w-24 h-24 rounded-2xl flex items-center justify-center shadow-enterprise mb-8 relative z-10 transition-transform duration-300 group-hover:-translate-y-2",
                                    "bg-white border text-obs-accent-blue",
                                    idx === 0 ? "border-blue-100" : idx === 1 ? "border-teal-100" : "border-indigo-100"
                                )}>
                                    <div className={clsx(
                                        "absolute inset-0 rounded-2xl opacity-20 blur-xl transition-opacity group-hover:opacity-40",
                                        idx === 0 ? "bg-blue-400" : idx === 1 ? "bg-teal-400" : "bg-indigo-400"
                                    )} />
                                    <step.icon className="w-10 h-10" />

                                    <div className="absolute -right-3 -top-3 w-8 h-8 rounded-full bg-obs-navy text-white flex items-center justify-center font-bold text-sm border-2 border-white">
                                        {idx + 1}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-obs-navy mb-3">{step.title}</h3>
                                <p className="text-obs-text-muted text-base leading-relaxed max-w-sm mx-auto">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
