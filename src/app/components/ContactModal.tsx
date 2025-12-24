"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Send } from "lucide-react";
import { Button } from "./ui/Button";
import { useToast } from "./ui/Toast";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const { addToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Mock API Call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setLoading(false);
        addToast("Request received! Our enterprise team will contact you shortly.", "success");
        setFormData({ name: "", email: "", company: "", message: "" });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-obs-navy/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl border border-obs-border w-full max-w-lg overflow-hidden pointer-events-auto"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-obs-border bg-obs-surface/50">
                                <div>
                                    <h3 className="text-xl font-heading font-bold text-obs-navy">Contact Sales</h3>
                                    <p className="text-sm text-obs-text-muted">Get a custom demo of OpsBrain configured for your stack.</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-obs-border/50 text-obs-text-muted hover:text-obs-navy transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-obs-navy">Work Email</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="name@company.com"
                                        className="w-full px-4 py-2 rounded-lg border border-obs-border focus:border-obs-navy focus:ring-1 focus:ring-obs-navy outline-none transition-all"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-obs-navy">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full px-4 py-2 rounded-lg border border-obs-border focus:border-obs-navy focus:ring-1 focus:ring-obs-navy outline-none transition-all"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-obs-navy">Company</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full px-4 py-2 rounded-lg border border-obs-border focus:border-obs-navy focus:ring-1 focus:ring-obs-navy outline-none transition-all"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-obs-navy">How can we help?</label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-4 py-2 rounded-lg border border-obs-border focus:border-obs-navy focus:ring-1 focus:ring-obs-navy outline-none transition-all resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        variant="primary"
                                        className="w-full justify-center"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Request
                                                <Send className="ml-2 w-4 h-4" />
                                            </>
                                        )}
                                    </Button>
                                </div>

                                <p className="text-xs text-center text-obs-text-dim mt-4">
                                    By submitting this form, you agree to our Terms of Service and Privacy Policy.
                                </p>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
