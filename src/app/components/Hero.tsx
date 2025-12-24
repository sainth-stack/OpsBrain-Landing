"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Database, FileText, Share2 } from "lucide-react";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";

export function Hero() {
    return (
        <section id="top" className="relative min-h-[85vh] flex items-center bg-obs-bg overflow-hidden pt-12 lg:pt-0">
            {/* Background Subtle Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f4f8_1px,transparent_1px),linear-gradient(to_bottom,#f0f4f8_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <Container className="relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        {/* Enterprise Tag */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obs-surface border border-obs-border text-xs font-semibold uppercase tracking-wider text-obs-navy-secondary mb-8">
                            <span className="w-2 h-2 rounded-full bg-obs-accent-teal animate-pulse" />
                            Enterprise Operational Intelligence
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-[4.25rem] font-heading font-bold tracking-tight text-obs-navy mb-8 leading-[1.1]">
                            AI Agents That Run Enterprise Operations <span className="text-obs-accent-blue">Intelligently</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-obs-text-muted mb-10 leading-relaxed max-w-2xl">
                            OpsBrain deploys AI agents that connect enterprise systems, data, and documents to detect issues, explain root causes, and drive real operational decisions.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <Button
                                size="lg"
                                variant="primary"
                                className="bg-obs-accent-green hover:bg-obs-accent-green/90 text-white min-w-[160px] shadow-lg shadow-obs-accent-green/20"
                                onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
                            >
                                Request a Demo
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-obs-navy-secondary text-obs-navy font-medium hover:bg-obs-surface min-w-[160px]"
                                onClick={() => document.getElementById("platform")?.scrollIntoView({ behavior: "smooth" })}
                            >
                                Explore the Platform
                            </Button>
                        </div>

                        {/* Trust Hint */}
                        <div className="flex items-center gap-4 text-sm text-obs-text-dim">
                            <span className="flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-obs-text-muted" />
                                SOC2 Compliant
                            </span>
                            <span className="w-1 h-1 rounded-full bg-obs-border" />
                            <span className="flex items-center gap-1.5">
                                <Database className="w-4 h-4 text-obs-text-muted" />
                                On-Prem Capable
                            </span>
                        </div>
                    </motion.div>

                    {/* Right Visual - Abstract Architecture */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block h-[600px] w-full"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-obs-surface-bright/50 to-white/50 rounded-3xl border border-obs-border shadow-enterprise-lg backdrop-blur-sm p-8 flex items-center justify-center overflow-hidden">
                            {/* Abstract Node Network Visualization */}
                            <div className="relative w-full h-full">

                                {/* Central Hub */}
                                <motion.div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full shadow-xl border border-obs-border flex items-center justify-center z-20"
                                    animate={{ boxShadow: ["0 0 0 0px rgba(59, 130, 246, 0)", "0 0 0 20px rgba(59, 130, 246, 0.05)", "0 0 0 0px rgba(59, 130, 246, 0)"] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <div className="w-20 h-20 bg-obs-navy rounded-full flex items-center justify-center">
                                        <Share2 className="w-10 h-10 text-white" />
                                    </div>
                                </motion.div>

                                {/* Satellite Nodes */}
                                {[
                                    { icon: Database, bg: "bg-blue-50 text-blue-600", label: "Oracle DB", pos: "top-[15%] left-[20%]" },
                                    { icon: FileText, bg: "bg-orange-50 text-orange-600", label: "PDF Reports", pos: "top-[20%] right-[15%]" },
                                    { icon: ShieldCheck, bg: "bg-green-50 text-green-600", label: "Security Logs", pos: "bottom-[15%] left-[5%]" },
                                    { icon: Share2, bg: "bg-purple-50 text-purple-600", label: "API Gateway", pos: "bottom-[15%] right-[20%]" },
                                ].map((node, i) => (
                                    <motion.div
                                        key={i}
                                        className={`absolute ${node.pos} p-4 bg-white rounded-xl shadow-lg border border-obs-border flex items-center gap-3 z-10`}
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 4, delay: i * 1, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <div className={`p-2 rounded-lg ${node.bg}`}>
                                            <node.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-semibold text-obs-navy">{node.label}</span>
                                    </motion.div>
                                ))}

                                {/* Connection Lines (CSS SVG) */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 0 }}>
                                    <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="var(--obs-navy)" strokeWidth="2" strokeDasharray="5,5" />
                                    <line x1="50%" y1="50%" x2="80%" y2="25%" stroke="var(--obs-navy)" strokeWidth="2" strokeDasharray="5,5" />
                                    <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="var(--obs-navy)" strokeWidth="2" strokeDasharray="5,5" />
                                    <line x1="50%" y1="50%" x2="75%" y2="80%" stroke="var(--obs-navy)" strokeWidth="2" strokeDasharray="5,5" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}

