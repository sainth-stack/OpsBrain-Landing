"use client";

import { motion } from "framer-motion";
import { Database, FileText, Server, AlertCircle, Clock, Users, Unplug } from "lucide-react";
import { Container } from "./ui/Container";
import { Section } from "./ui/Section";

const problems = [
    {
        icon: Database,
        title: "Data Scattered Everywhere",
        desc: "Critical intelligence is buried in PDFs, databases, cloud tools, and legacy logs.",
    },
    {
        icon: Users,
        title: "Dependent on Analysts",
        desc: "Business teams wait days for analysts to manually query and correlate simple answers.",
    },
    {
        icon: Server,
        title: "Monitoring ≠ Root Cause",
        desc: "Tools tell you something failed, but not why it failed or how to fix it effectively.",
    },
    {
        icon: Clock,
        title: "Delayed & Reactive",
        desc: "Decisions happen days after the incident, increasing risk and operational cost.",
    },
];

export function ProblemSection() {
    return (
        <Section id="problem" className="bg-obs-surface border-t border-obs-border py-24">
            <Container>
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-obs-navy mb-6 leading-tight">
                            Enterprise Data Is Everywhere. <br />
                            <span className="text-obs-critical">Answers Are Nowhere.</span>
                        </h2>
                        <p className="text-lg text-obs-text-muted mb-12 leading-relaxed">
                            Your teams are drowning in dashboards but starving for intelligence. OpsBrain bridges the gap between disconnected systems and decision-ready answers.
                        </p>

                        <div className="flex flex-col gap-8">
                            {problems.map((item, idx) => (
                                <div key={idx} className="flex gap-4 group">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-10 h-10 rounded-lg bg-white border border-obs-border flex items-center justify-center group-hover:border-obs-navy transition-colors shadow-sm">
                                            <item.icon className="w-5 h-5 text-obs-navy" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-obs-navy mb-1">{item.title}</h3>
                                        <p className="text-obs-text-muted text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Disconnected Systems Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[500px] w-full bg-white rounded-2xl border border-obs-border shadow-enterprise p-8 overflow-hidden"
                    >
                        <div className="absolute top-4 right-4 flex items-center gap-2 text-xs font-semibold text-obs-critical bg-obs-critical/10 px-2 py-1 rounded">
                            <AlertCircle className="w-3 h-3" />
                            Context Missing
                        </div>

                        {/* Isolated Islands Visual */}
                        <div className="relative w-full h-full">

                            {/* Island 1: PDFs */}
                            <div className="absolute top-[10%] left-[8%] p-4 bg-white rounded-xl border border-obs-border shadow-md w-40 text-center z-10 transition-transform hover:scale-105">
                                <FileText className="w-8 h-8 mx-auto text-obs-accent-blue/80 mb-2" />
                                <div className="text-xs font-bold text-obs-navy">Unstructured Docs</div>
                                <div className="text-[10px] text-obs-text-muted mt-1 bg-gray-100 px-2 py-0.5 rounded-full inline-block">No API Access</div>
                            </div>

                            {/* Island 2: Database */}
                            <div className="absolute top-[35%] right-[5%] p-4 bg-white rounded-xl border border-obs-border shadow-md w-40 text-center z-10 transition-transform hover:scale-105">
                                <Database className="w-8 h-8 mx-auto text-obs-accent-blue/80 mb-2" />
                                <div className="text-xs font-bold text-obs-navy">Legacy DB</div>
                                <div className="text-[10px] text-obs-text-muted mt-1 bg-gray-100 px-2 py-0.5 rounded-full inline-block">Siloed Data</div>
                            </div>

                            {/* Island 3: Cloud */}
                            <div className="absolute bottom-[10%] left-[15%] p-4 bg-white rounded-xl border border-obs-border shadow-md w-40 text-center z-10 transition-transform hover:scale-105">
                                <Server className="w-8 h-8 mx-auto text-obs-accent-blue/80 mb-2" />
                                <div className="text-xs font-bold text-obs-navy">Cloud Logs</div>
                                <div className="text-[10px] text-obs-text-muted mt-1 bg-gray-100 px-2 py-0.5 rounded-full inline-block">High Volume</div>
                            </div>

                            {/* The Void / Disconnection */}
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                <div className="flex flex-col items-center gap-2 opacity-60">
                                    <Unplug className="w-12 h-12 text-obs-border" />
                                    <span className="text-sm text-obs-text-dim font-medium">No Correlation</span>
                                </div>
                            </div>

                        </div>
                    </motion.div>

                </div>
            </Container>
        </Section>
    );
}
