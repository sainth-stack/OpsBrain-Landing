"use client";

import * as React from "react";
import { CheckCircle2, X, AlertCircle } from "lucide-react";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    toasts: Toast[];
    addToast: (message: string, type?: ToastType) => void;
    removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<Toast[]>([]);

    const addToast = (message: string, type: ToastType = "info") => {
        const id = Math.random().toString(36).substring(7);
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            removeToast(id);
        }, 5000);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <div className="fixed bottom-0 right-0 p-6 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
                <AnimatePresence mode="popLayout">
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            layout
                            className={clsx(
                                "pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md",
                                toast.type === "success" && "bg-white/90 border-green-200 text-green-900",
                                toast.type === "error" && "bg-white/90 border-red-200 text-red-900",
                                toast.type === "info" && "bg-white/90 border-blue-200 text-blue-900",
                            )}
                        >
                            <div className="flex-shrink-0 mt-0.5">
                                {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                                {toast.type === "error" && <AlertCircle className="w-5 h-5 text-red-600" />}
                                {toast.type === "info" && <AlertCircle className="w-5 h-5 text-blue-600" />}
                            </div>
                            <div className="flex-1 text-sm font-medium">{toast.message}</div>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="flex-shrink-0 text-current opacity-50 hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}
