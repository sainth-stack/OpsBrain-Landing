"use client";

import { Check, X, Minus } from "lucide-react";
import { Container } from "./ui/Container";
import { Section } from "./ui/Section";
import clsx from "clsx";

const features = [
    { name: "Unifies Structured & Unstructured Data", bi: false, monitor: false, chat: true, obs: true },
    { name: "Autonomous Root Cause Analysis", bi: false, monitor: false, chat: "partial", obs: true },
    { name: "Enterprise RBAC & Audit Trails", bi: true, monitor: true, chat: false, obs: true },
    { name: "Explainable \"Chain of Thought\"", bi: false, monitor: false, chat: false, obs: true },
    { name: "Proactive Anomaly Detection", bi: false, monitor: true, chat: false, obs: true },
    { name: "Automated Remediation Actions", bi: false, monitor: "partial", chat: false, obs: true },
    { name: "Private Cloud / On-Prem Deployment", bi: true, monitor: true, chat: false, obs: true },
];

export function ComparisonTable() {
    return (
        <Section id="comparison" className="bg-white py-24 border-t border-obs-border">
            <Container>
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-obs-navy mb-4">
                        Why Modern Enterprises Choose OpsBrain
                    </h2>
                    <p className="text-obs-text-muted text-lg">
                        Stop patching together dashboards, logs, and chatbots. Get a unified brain for your operations.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[800px]">
                        <thead>
                            <tr>
                                <th className="text-left py-6 px-6 text-sm font-semibold text-obs-text-dim uppercase tracking-wider border-b border-obs-border w-1/3">Capabilities</th>
                                <th className="py-6 px-4 text-center text-sm font-bold text-obs-text-muted border-b border-obs-border w-1/6">Traditional BI</th>
                                <th className="py-6 px-4 text-center text-sm font-bold text-obs-text-muted border-b border-obs-border w-1/6">Monitoring Tools</th>
                                <th className="py-6 px-4 text-center text-sm font-bold text-obs-text-muted border-b border-obs-border w-1/6">AI Chatbots</th>
                                <th className="py-6 px-4 text-center border-b border-obs-navy bg-obs-navy/5 rounded-t-xl w-1/6">
                                    <span className="block text-lg font-bold text-obs-navy">OpsBrain</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feat, idx) => (
                                <tr key={idx} className={clsx("group transition-colors", idx % 2 === 0 ? "bg-white" : "bg-obs-surface")}>
                                    <td className="py-5 px-6 font-medium text-obs-navy border-b border-obs-border group-hover:bg-obs-surface-bright">
                                        {feat.name}
                                    </td>
                                    <td className="py-5 px-4 text-center border-b border-obs-border group-hover:bg-obs-surface-bright">
                                        <StatusIcon status={feat.bi} />
                                    </td>
                                    <td className="py-5 px-4 text-center border-b border-obs-border group-hover:bg-obs-surface-bright">
                                        <StatusIcon status={feat.monitor} />
                                    </td>
                                    <td className="py-5 px-4 text-center border-b border-obs-border group-hover:bg-obs-surface-bright">
                                        <StatusIcon status={feat.chat} />
                                    </td>
                                    <td className="py-5 px-4 text-center border-b border-obs-border bg-obs-navy/5 border-l border-r border-obs-border/50">
                                        <StatusIcon status={feat.obs} primary />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container>
        </Section>
    );
}

function StatusIcon({ status, primary = false }: { status: boolean | "partial" | string; primary?: boolean }) {
    if (status === true) {
        return (
            <div className="flex justify-center">
                <div className={clsx("w-6 h-6 rounded-full flex items-center justify-center shadow-sm", primary ? "bg-obs-accent-blue text-white" : "bg-obs-border/50 text-obs-text-muted")}>
                    <Check className="w-4 h-4" />
                </div>
            </div>
        );
    }
    if (status === "partial") {
        return (
            <div className="flex justify-center">
                <div className="w-6 h-6 rounded-full bg-obs-warning/10 text-obs-warning flex items-center justify-center border border-obs-warning/20">
                    <Minus className="w-4 h-4" />
                </div>
            </div>
        );
    }
    return (
        <div className="flex justify-center">
            <X className="w-5 h-5 text-obs-border" />
        </div>
    );
}
