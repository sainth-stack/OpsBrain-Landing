"use client";

import { submitLiveCallRequest } from "@/lib/landing-api";
import { trackDemoClick, trackLeadSubmit } from "@/lib/analytics";
import {
  liveCallAgentPortraits,
  type LiveCallAgent,
} from "@/content/live-call-agents";
import { cn } from "@/lib/utils";
import { Loader2, Phone, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

type CallAgentModalProps = {
  agent: LiveCallAgent | null;
  open: boolean;
  onClose: () => void;
};

export function CallAgentModal({ agent, open, onClose }: CallAgentModalProps) {
  const titleId = useId();
  const [language, setLanguage] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  const [submittedPhone, setSubmittedPhone] = useState("");

  useEffect(() => {
    if (!open || !agent) return;
    setLanguage(agent.languages[0] ?? "English");
    setStatus("idle");
    setError(null);
  }, [open, agent]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !agent || typeof document === "undefined") return null;

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (fullName.trim().length < 2) {
      setError("Enter your name");
      setStatus("error");
      return;
    }
    if (!language) {
      setError("Select a language");
      setStatus("error");
      return;
    }
    if (digits.length < 10) {
      setError("Enter a valid mobile number");
      setStatus("error");
      return;
    }
    if (!consent) {
      setError("Consent is required");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError(null);
    trackDemoClick(`live_call_${agent.id}`);

    try {
      const phoneValue = phone.trim();
      await submitLiveCallRequest({
        phone: phoneValue,
        fullName: fullName.trim(),
        language,
        agentId: agent.id,
        agentName: agent.name,
        agentRole: agent.role,
        consent,
      });
      trackLeadSubmit("try_live_call");
      setSubmittedPhone(phoneValue);
      setStatus("success");
      setPhone("");
      setFullName("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-border-default bg-surface-white shadow-xl">
        <div className="flex items-start justify-between gap-3 border-b border-border-default px-5 py-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="relative shrink-0">
              <div className="size-11 overflow-hidden rounded-full bg-surface-muted ring-2 ring-white">
                <Image
                  src={liveCallAgentPortraits[agent.gender]}
                  alt={agent.name}
                  width={44}
                  height={44}
                  className="size-full object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-surface-white bg-emerald-500" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-primary">
                Call {agent.name}
              </p>
              <h2
                id={titleId}
                className="mt-1 font-display text-lg font-semibold text-text-primary"
              >
                {agent.role}
              </h2>
              <p className="mt-1 text-[13px] text-text-secondary">
                Choose a language and share your details for the demo call.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 shrink-0 place-items-center rounded-lg text-text-muted hover:bg-surface-muted hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            aria-label="Close"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        {status === "success" ? (
          <div className="px-5 py-8 text-center">
            <div className="mx-auto grid size-11 place-items-center rounded-xl bg-brand-primary-light text-brand-primary">
              <Phone className="size-5" aria-hidden="true" />
            </div>
            <p className="mt-4 font-display text-base font-semibold text-text-primary">
              Request received
            </p>
            <p className="mt-2 text-[13px] text-text-secondary">
              {agent.name} will call you shortly
              {submittedPhone ? ` on ${submittedPhone}` : ""}.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex h-10 items-center rounded-lg bg-brand-primary px-5 text-[13px] font-semibold text-white hover:bg-brand-primary-hover"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 px-5 py-5">
            <div>
              <p className="text-[12px] font-semibold text-text-primary">
                Language
              </p>
              <div
                className="mt-2 flex flex-wrap gap-1.5"
                role="radiogroup"
                aria-label="Language"
              >
                {agent.languages.map((option) => {
                  const active = option === language;
                  return (
                    <button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setLanguage(option)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                        active
                          ? "bg-brand-primary text-white shadow-sm"
                          : "bg-surface-muted text-text-secondary hover:text-text-primary",
                      )}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="call-agent-name"
                className="text-[12px] font-semibold text-text-primary"
              >
                Your name
              </label>
              <input
                id="call-agent-name"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Full name"
                className={cn(
                  "mt-1.5 w-full rounded-lg border border-border-default bg-surface-white px-3 py-2.5 text-[14px] text-text-primary",
                  "placeholder:text-text-muted focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20",
                )}
              />
            </div>

            <div>
              <label
                htmlFor="call-agent-phone"
                className="text-[12px] font-semibold text-text-primary"
              >
                Mobile number
              </label>
              <input
                id="call-agent-phone"
                type="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+91 98765 43210"
                className={cn(
                  "mt-1.5 w-full rounded-lg border border-border-default bg-surface-white px-3 py-2.5 text-[14px] text-text-primary",
                  "placeholder:text-text-muted focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20",
                )}
              />
            </div>

            <label className="flex items-start gap-2 text-[12px] leading-relaxed text-text-secondary">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                className="mt-0.5 size-4 rounded border-border-default text-brand-primary focus:ring-brand-primary"
              />
              I agree to receive a demo call from OpsBrain AI on this number.
            </label>

            {error ? (
              <p className="text-[13px] text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-primary via-indigo-600 to-violet-600 text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(79,70,229,0.25)] transition-opacity hover:opacity-[0.96] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              {status === "loading" ? (
                <Loader2 className="size-4 animate-spin" strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Phone className="size-4" strokeWidth={1.75} aria-hidden="true" />
              )}
              Call me now
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
