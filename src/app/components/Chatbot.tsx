"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Send, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

const QUICK_ACTIONS = [
    "Explain revenue drop",
    "Show anomalies",
    "Generate executive summary",
    "Assess business impact",
] as const;

const MOCK_RESPONSES: Record<string, string> = {
    "Explain revenue drop": [
        "Here’s what we found",
        "",
        "Key insights",
        "- Revenue decline concentrated in South India",
        "- Primary driver: conversion rate down vs. baseline",
        "- Secondary driver: higher refund volume in a single category",
        "",
        "Impact",
        "- Week-over-week change: material",
        "- Risk: forecast variance if trend persists",
        "",
        "Recommended action",
        "- Validate channel attribution changes",
        "- Review refund root-cause (SKU / vendor / logistics)",
        "- Share executive summary with Finance + Ops leaders",
    ].join("\n"),
    "Show anomalies": [
        "Anomalies detected (last 7 days)",
        "",
        "- Spike in refunds (South India • Category B)",
        "- Drop in conversion (Mobile • Paid Search)",
        "- Increased cycle time (Order fulfillment • Node 3)",
        "",
        "Next step",
        "- Pick one anomaly to drill into drivers and owners",
    ].join("\n"),
    "Generate executive summary": [
        "Executive summary",
        "",
        "What changed",
        "- Revenue down, driven by conversion + refunds",
        "",
        "So what",
        "- Near-term margin pressure and forecast risk",
        "",
        "Now what",
        "- Validate data lineage, assign owners, and run corrective actions",
    ].join("\n"),
    "Assess business impact": [
        "Business impact assessment",
        "",
        "Affected areas",
        "- Sales performance and pipeline confidence",
        "- Customer experience (refunds and delays)",
        "",
        "Recommended action",
        "- Prioritize investigation by revenue exposure",
        "- Create an owner + ETA per driver",
    ].join("\n"),
    default: [
        "I can help with executive-grade analysis.",
        "",
        "Try asking",
        "- Explain revenue drop",
        "- Show anomalies",
        "- Generate executive summary",
        "- Assess business impact",
    ].join("\n"),
};

function BotMessage({ text }: { text: string }) {
    const lines = text.split("\n");

    const blocks: Array<
        | { kind: "p"; text: string }
        | { kind: "h"; text: string }
        | { kind: "ul"; items: string[] }
    > = [];

    let currentList: string[] = [];
    const flushList = () => {
        if (currentList.length) {
            blocks.push({ kind: "ul", items: currentList });
            currentList = [];
        }
    };

    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) {
            flushList();
            continue;
        }

        if (line.startsWith("- ")) {
            currentList.push(line.replace(/^- /, ""));
            continue;
        }

        flushList();

        const looksLikeHeading =
            line.length <= 32 &&
            !/[.?!]$/.test(line) &&
            line === line.replace(/^\p{Ll}/u, (m) => m); // keep as-is; avoid aggressive casing

        if (looksLikeHeading) blocks.push({ kind: "h", text: line });
        else blocks.push({ kind: "p", text: line });
    }

    flushList();

    return (
        <div className="space-y-2">
            {blocks.map((b, idx) => {
                if (b.kind === "h") {
                    return (
                        <div key={idx} className="text-sm font-semibold text-obs-navy">
                            {b.text}
                        </div>
                    );
                }
                if (b.kind === "ul") {
                    return (
                        <ul key={idx} className="list-disc pl-5 text-sm text-obs-text space-y-1">
                            {b.items.map((it) => (
                                <li key={it}>{it}</li>
                            ))}
                        </ul>
                    );
                }
                return (
                    <p key={idx} className="text-sm text-obs-text">
                        {b.text}
                    </p>
                );
            })}
        </div>
    );
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            text: ["Hello — I’m OpsBrain AI.", "", "Ask a business question and I’ll return a structured briefing."].join(
                "\n"
            ),
            sender: "bot",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate bot delay
        setTimeout(() => {
            const responseText = MOCK_RESPONSES[text] || MOCK_RESPONSES["default"];
            const newBotMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, newBotMessage]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-24 right-6 w-[420px] h-[560px] z-50 bg-white border border-obs-border rounded-2xl shadow-enterprise-lg overflow-hidden flex flex-col font-sans"
                    >
                        {/* Header */}
                        <div className="px-4 pt-4 pb-3 bg-gradient-to-b from-white to-obs-surface border-b border-obs-border flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-obs-border bg-white">
                                    <Image
                                        src="/opsbrain/opsbrain_bot_icon.png"
                                        alt="OpsBrain AI"
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-semibold text-obs-navy tracking-tight">
                                            OpsBrain AI
                                        </h3>
                                        <span className="inline-flex items-center gap-1 rounded-full border border-obs-border bg-white px-2 py-0.5 text-[11px] font-medium text-obs-text-muted">
                                            <ShieldCheck className="h-3.5 w-3.5 text-obs-accent-teal" />
                                            Secure • Online
                                        </span>
                                    </div>
                                    <p className="text-xs text-obs-text-muted">
                                        Enterprise Intelligence Assistant
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-obs-surface rounded-full transition-colors text-obs-text-muted hover:text-obs-navy"
                                aria-label="Close OpsBrain AI"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-white">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`
                                            max-w-[86%] px-4 py-3 rounded-2xl border shadow-[0_1px_0_rgba(0,0,0,0.02)]
                                            ${msg.sender === "user"
                                                ? "bg-obs-navy text-white border-obs-navy"
                                                : "bg-obs-surface border-obs-border"}
                                        `}
                                    >
                                        {msg.sender === "bot" ? (
                                            <BotMessage text={msg.text} />
                                        ) : (
                                            <p className="text-sm leading-relaxed">{msg.text}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-obs-surface px-4 py-3 rounded-2xl border border-obs-border text-sm text-obs-text-muted">
                                        Analyzing…
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions */}
                        <div className="px-4 py-3 border-t border-obs-border bg-white overflow-x-auto flex gap-2 no-scrollbar">
                            {QUICK_ACTIONS.map((q) => (
                                <button
                                    key={q}
                                    onClick={() => handleSendMessage(q)}
                                    className="whitespace-nowrap px-3 py-2 rounded-lg bg-white text-xs font-medium text-obs-navy hover:bg-obs-surface transition-colors border border-obs-border"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-obs-border bg-obs-surface">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSendMessage(inputValue);
                                }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask a business question…"
                                    className="flex-1 bg-white border border-obs-border rounded-xl px-4 py-2.5 text-sm text-obs-text focus:outline-none focus:border-obs-accent-blue/60 focus:ring-2 focus:ring-obs-accent-blue/10 transition-colors placeholder:text-obs-text-dim"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="p-2.5 rounded-xl bg-obs-navy text-white hover:bg-obs-navy-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    aria-label="Send message"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                            <div className="mt-2 flex items-center justify-between gap-3">
                                <p className="text-[11px] text-obs-text-muted">
                                    Data access controlled by role-based permissions.
                                </p>
                                <p className="text-[11px] text-obs-text-muted">
                                    Tenant-isolated • Auditable
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 w-14 h-14 bg-obs-navy rounded-2xl shadow-enterprise-lg flex items-center justify-center z-50 text-white hover:bg-obs-navy-secondary transition-colors group border border-obs-border"
                aria-label={isOpen ? "Close OpsBrain AI" : "Open OpsBrain AI"}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                        >
                            <X size={28} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                            className="relative w-full h-full p-2"
                        >
                            <div className="relative w-full h-full rounded-xl overflow-hidden bg-white">
                                <Image
                                    src="/opsbrain/opsbrain_bot_icon.png"
                                    alt="OpsBrain AI"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </>
    );
}
