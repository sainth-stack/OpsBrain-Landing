"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, FileKey, Server, Users } from "lucide-react";
import { Container } from "./ui/Container";
import { Section } from "./ui/Section";

const features = [
    {
        icon: Server,
        title: "Multi-Tenant Isolation",
        desc: "Strict logical separation of customer data at both application and database layers.",
    },
    {
        icon: Users,
        title: "Role-Based Access Control",
        desc: "Granular permissions ensure users only see data they are authorized to access.",
    },
    {
        icon: Eye,
        title: "Comprehensive Audit Logs",
        desc: "Every agent action, query, and data access is logged and exportable for compliance.",
    },
    {
        icon: Lock,
        title: "End-to-End Encryption",
        desc: "Data is encrypted in transit (TLS 1.3) and at rest (AES-256).",
    },
    {
        icon: FileKey,
        title: "SOC 2 Type II Ready",
        desc: "Built on compliant infrastructure with continuous control monitoring.",
    },
    {
        icon: ShieldCheck,
        title: "Private Cloud Deployment",
        desc: "Optional deployment into your own VPC for complete data sovereignty.",
    },
];

export function SecuritySection() {
    return (
        <Section id="security" className="bg-obs-navy py-24 text-white overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-10 pointer-events-none" />

            <Container className="relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <div className="order-2 lg:order-1">
                        <div className="grid sm:grid-cols-2 gap-6">
                            {features.map((f, i) => (
                                <div key={i} className="group relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:border-obs-accent-teal/40 hover:shadow-lg transition-all duration-300">
                                    <div className="absolute inset-0 bg-obs-accent-teal/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                                            <f.icon className="w-6 h-6 text-obs-accent-teal" />
                                        </div>
                                        <h3 className="text-lg font-heading font-bold mb-2 text-white tracking-tight">{f.title}</h3>
                                        <p className="text-sm text-gray-300 leading-relaxed font-light">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obs-accent-teal/10 border border-obs-accent-teal/30 text-xs font-semibold uppercase tracking-wider text-obs-accent-teal mb-6">
                            <ShieldCheck className="w-3 h-3" />
                            Security First
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-6 text-white leading-tight">
                            Enterprise-Grade Security <br /> by Design
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed font-light">
                            We understand that your operational data is your most valuable asset. OpsBrain is built from the ground up to meet the strictest enterprise security and compliance standards.
                        </p>

                        <div className="p-8 bg-gradient-to-r from-obs-navy-secondary to-[#1e293b] rounded-3xl border border-white/10 flex items-center justify-between shadow-2xl">
                            <div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Compliance Standards</div>
                                <div className="flex flex-wrap gap-2">
                                    {/* Mock Badges */}
                                    {['SOC 2', 'GDPR', 'HIPAA', 'ISO 27001'].map((badge) => (
                                        <div key={badge} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-xs font-bold text-white shadow-sm hover:bg-white/10 cursor-default transition-colors">
                                            {badge}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <ShieldCheck className="w-16 h-16 text-obs-accent-green opacity-80" />
                        </div>
                    </div>

                </div>
            </Container>
        </Section>
    );
}
