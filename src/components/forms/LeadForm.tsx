"use client";

import { Button } from "@/components/ui/button";
import { leadFormOptions } from "@/content/site";
import { trackFormSubmit } from "@/lib/analytics";
import { leadFormSchema, type LeadFormValues } from "@/lib/schemas/lead";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const inputClassLight =
  "w-full rounded-lg border border-border-default bg-surface-white px-4 py-2.5 text-body text-text-primary transition-colors placeholder:text-text-muted focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20";

const inputClassDark =
  "w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-body text-text-inverse transition-colors placeholder:text-text-inverse-muted focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20";

const labelClassLight = "mb-1.5 block text-small font-medium text-text-primary";
const labelClassDark = "mb-1.5 block text-small font-medium text-text-inverse";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 text-small text-red-600" role="alert">
      {message}
    </p>
  );
}

export function LeadForm({ theme = "light" }: { theme?: "light" | "dark" }) {
  const isDark = theme === "dark";
  const inputClass = isDark ? inputClassDark : inputClassLight;
  const labelClass = isDark ? labelClassDark : labelClassLight;
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    setSubmitState("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Submit failed");

      trackFormSubmit("lead");
      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
    }
  };

  if (submitState === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center rounded-xl border border-brand-accent/30 bg-brand-accent-light/30 px-6 py-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
        >
          <CheckCircle2
            className="size-16 text-brand-accent"
            aria-hidden="true"
          />
        </motion.div>
        <h3 className={cn("mt-4 text-h3 font-semibold", isDark ? "text-text-inverse" : "text-text-primary")}>
          Request received!
        </h3>
        <p className={cn("mt-2 text-body", isDark ? "text-text-inverse-muted" : "text-text-secondary")}>
          We&apos;ll contact you within 24 hours.
        </p>
        <Button
          type="button"
          variant="secondary"
          size="md"
          className="mt-6"
          onClick={() => setSubmitState("idle")}
        >
          Submit another request
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
      aria-label="Lead capture form"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            className={inputClass}
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
          />
          <FieldError message={errors.fullName?.message} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone *
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message} />
        </div>
        <div>
          <label htmlFor="businessName" className={labelClass}>
            Business Name *
          </label>
          <input
            id="businessName"
            type="text"
            autoComplete="organization"
            className={inputClass}
            aria-invalid={!!errors.businessName}
            {...register("businessName")}
          />
          <FieldError message={errors.businessName?.message} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={inputClass}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="industry" className={labelClass}>
            Industry
          </label>
          <select
            id="industry"
            className={cn(inputClass, "appearance-none")}
            aria-invalid={!!errors.industry}
            {...register("industry")}
          >
            <option value="">Select industry</option>
            {leadFormOptions.industries.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <FieldError message={errors.industry?.message} />
        </div>
        <div>
          <label htmlFor="callVolume" className={labelClass}>
            Monthly Call Volume
          </label>
          <select
            id="callVolume"
            className={cn(inputClass, "appearance-none")}
            aria-invalid={!!errors.callVolume}
            {...register("callVolume")}
          >
            <option value="">Select volume</option>
            {leadFormOptions.callVolumes.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <FieldError message={errors.callVolume?.message} />
        </div>
        <div>
          <label htmlFor="useCase" className={labelClass}>
            Primary Use Case
          </label>
          <select
            id="useCase"
            className={cn(inputClass, "appearance-none")}
            aria-invalid={!!errors.useCase}
            {...register("useCase")}
          >
            <option value="">Select use case</option>
            {leadFormOptions.useCases.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <FieldError message={errors.useCase?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message (optional)
        </label>
        <textarea
          id="message"
          rows={3}
          className={cn(inputClass, "resize-y")}
          placeholder="Tell us about your use case..."
          {...register("message")}
        />
      </div>

      <div>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className={cn(
              "mt-1 size-4 rounded focus:ring-brand-accent",
              isDark
                ? "border-white/20 bg-white/5 text-brand-accent"
                : "border-border-default text-brand-primary focus:ring-brand-primary",
            )}
            aria-invalid={!!errors.consent}
            {...register("consent")}
          />
          <span className={cn("text-small", isDark ? "text-text-inverse-muted" : "text-text-secondary")}>
            I agree to the{" "}
            <Link
              href="/privacy"
              className="font-medium text-brand-accent hover:underline"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/terms"
              className="font-medium text-brand-accent hover:underline"
            >
              Terms of Service
            </Link>
            . *
          </span>
        </label>
        <FieldError message={errors.consent?.message} />
      </div>

      {submitState === "error" && (
        <p className="text-small text-red-600" role="alert">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={submitState === "loading"}
      >
        {submitState === "loading" ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            Submitting...
          </>
        ) : (
          "Deploy My AI Employee"
        )}
      </Button>
    </form>
  );
}
