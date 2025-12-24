"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Cpu, GitMerge, ShieldCheck, Database, FileText, Cloud, FileSpreadsheet } from "lucide-react";
import { Container } from "./ui/Container";
import { Section } from "./ui/Section";
import { Button } from "./ui/Button";

const principles = [
    {
        icon: Cpu,
        title: "AI Agents, Not Dashboards",
        desc: "Dashboards show data. Agents perform work. OpsBrain agents autonomously detect anomalies and root causes.",
    },
    {
        icon: GitMerge,
        title: "Explainable Outputs",
        desc: "Every insight includes a 'Chain of Thought' trace, citing specific logs, docs, and db records.",
    },
    {
        icon: ShieldCheck,
        title: "Secure by Design",
        desc: "Role-based access control (RBAC) ensures agents only access and reveal data appropriate for the user.",
    },
];

export function SolutionSection() {
    return (
        <Section id="solution" className="bg-white relative overflow-hidden py-24">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-obs-surface-bright to-transparent pointer-events-none" />

            <Container className="relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Integration Hub Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1 flex items-center justify-center"
                    >
                        {/* Self-contained canvas so it never bleeds into the right column */}
                        <div className="relative w-full max-w-[560px] aspect-square overflow-hidden">
                            {/* Scale the whole system down a bit on tighter widths */}
                            <div className="absolute inset-0 flex items-center justify-center origin-center scale-[0.78] sm:scale-[0.88] md:scale-100 lg:scale-[0.92] xl:scale-100">
                                {/* Central Hub */}
                                <div className="relative z-20">
                                    {/* Pulse Effect */}
                                    <div className="absolute inset-0 bg-obs-accent-blue/20 rounded-full animate-ping opacity-20" />
                                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-obs-navy rounded-full flex items-center justify-center shadow-2xl border-4 border-white/10">
                                        <BrainCircuit className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-white" />
                                    </div>
                                </div>

                                {/* Connected Data Sources */}
                                {[
                                    { name: "Oracle DB", icon: Database, color: "text-red-500", bg: "bg-red-50", angle: 0 },
                                    { name: "PDF Reports", icon: FileText, color: "text-orange-500", bg: "bg-orange-50", angle: 60 },
                                    { name: "MongoDB", icon: Database, color: "text-green-500", bg: "bg-green-50", angle: 120 },
                                    { name: "PostgreSQL", icon: Database, color: "text-blue-500", bg: "bg-blue-50", angle: 180 },
                                    { name: "S3 Bucket", icon: Cloud, color: "text-purple-500", bg: "bg-purple-50", angle: 240 },
                                    { name: "CSV/Excel", icon: FileSpreadsheet, color: "text-green-600", bg: "bg-green-100", angle: 300 },
                                ].map((source, i) => {
                                    // Radius is tuned to fit within the column; scaling above handles smaller breakpoints.
                                    const radius = 240;
                                    const angleRad = (source.angle * Math.PI) / 180;
                                    const x = Math.cos(angleRad) * radius;
                                    const y = Math.sin(angleRad) * radius;

                                    const isLeftSide = source.angle > 90 && source.angle < 270;
                                    const lineWidth = Math.max(120, radius - 60);

                                    return (
                                        <motion.div
                                            key={source.name}
                                            className={`absolute flex items-center gap-3 sm:gap-4 px-4 py-3 sm:px-5 sm:py-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-obs-border/60 bg-white/90 backdrop-blur-xl z-30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 ${isLeftSide ? "flex-row-reverse text-right" : "text-left"}`}
                                            style={{
                                                left: `calc(30% + ${x}px)`,
                                                top: `calc(40% + ${y}px)`,
                                                transform: "translate(-50%, -50%)",
                                            }}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                                        >
                                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${source.bg} flex items-center justify-center shrink-0 shadow-inner`}>
                                                <source.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${source.color}`} />
                                            </div>
                                            <span className="font-semibold text-obs-navy text-xs sm:text-sm whitespace-nowrap tracking-tight">
                                                {source.name}
                                            </span>

                                            {/* Connectivity Line */}
                                            <div
                                                className="absolute top-1/2 left-1/2 h-px border-t-[1.5px] border-dashed border-obs-border/40 -z-10 origin-left"
                                                style={{
                                                    width: `${lineWidth}px`,
                                                    transform: `rotate(${source.angle + 180}deg)`,
                                                }}
                                            />
                                        </motion.div>
                                    );
                                })}

                                {/* Background Rings */}
                                <div className="absolute inset-0 flex items-center justify-center z-0 opacity-50 pointer-events-none">
                                    <div className="w-[380px] h-[380px] border border-obs-border/50 rounded-full" />
                                    <div className="w-[520px] h-[520px] border border-obs-border/30 rounded-full absolute" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold uppercase tracking-wider text-obs-accent-blue mb-6">
                            <BrainCircuit className="w-3 h-3" />
                            The Solution
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-obs-navy mb-6 leading-tight">
                            Meet OpsBrain — The AI Brain for <span className="text-obs-accent-blue">Enterprise Operations</span>
                        </h2>

                        <p className="text-lg text-obs-text-muted mb-10 leading-relaxed">
                            OpsBrain connects structured and unstructured data and applies specialized AI agents to explain <strong className="text-obs-navy">what happened</strong>, <strong className="text-obs-navy">why it happened</strong>, and <strong className="text-obs-navy">what to do next</strong>.
                        </p>

                        <div className="space-y-6 mb-12">
                            {principles.map((p, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <p.icon className="w-5 h-5 text-obs-accent-blue" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-obs-navy mb-1">{p.title}</h4>
                                        <p className="text-sm text-obs-text-muted leading-relaxed">{p.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button variant="outline" className="border-obs-navy text-obs-navy hover:bg-obs-surface">
                            Explore the Architecture
                        </Button>
                    </motion.div>

                </div>
            </Container>
        </Section>
    );
}
