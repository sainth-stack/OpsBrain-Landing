"use client";

import { Button } from "@/components/ui/button";
import { finalCTASection, leadFormOptions } from "@/content/site";
import { trackLeadSubmit } from "@/lib/analytics";
import { submitLead } from "@/lib/landing-api";
import { leadFormSchema, type LeadFormValues } from "@/lib/schemas/lead";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const honeypotStyle: React.CSSProperties = {
  position: "absolute",
  left: "-9999px",
  width: "1px",
  height: "1px",
  overflow: "hidden",
};

const inputClassLight =
  "w-full rounded-lg border border-border-default bg-surface-white px-4 py-2.5 text-body text-text-primary transition-colors placeholder:text-text-muted focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20";

const inputClassDark =
  "w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-body text-on-dark transition-colors placeholder:text-on-dark-muted focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20";

const labelClassLight = "mb-1.5 block text-small font-medium text-text-primary";
const labelClassDark = "mb-1.5 block text-small font-medium text-on-dark";

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
  const renderedAt = useRef(Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState(
    "Something went wrong. Please try again or email us directly.",
  );

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
      if (Date.now() - renderedAt.current < 2000) {
        throw new Error("Please try again.");
      }

      const honeypot = honeypotRef.current?.value ?? "";
      if (honeypot.trim() !== "") {
        setSubmitState("success");
        reset();
        return;
      }

      const result = await submitLead(data);
      if (!result.success) {
        throw new Error(result.message ?? "Submit failed");
      }

      trackLeadSubmit("lead");
      setSubmitState("success");
      reset();
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Submit failed");
      setSubmitState("error");
    }
  };

  if (submitState === "success") {
    return (
      <div
        className={cn(
          "flex min-h-[320px] flex-col items-center justify-center rounded-xl px-6 py-12 text-center",
          isDark
            ? "border border-white/10 bg-white/5"
            : "border border-brand-accent/30 bg-brand-accent-light/30",
        )}
        role="status"
      >
        <CheckCircle2
          className={cn("size-12", isDark ? "text-brand-accent" : "text-brand-accent")}
          aria-hidden="true"
        />
        <h3
          className={cn(
            "mt-4 text-xl font-semibold",
            isDark ? "text-on-dark" : "text-text-primary",
          )}
        >
          Request received!
        </h3>
        <p className={cn("mt-2 text-body", isDark ? "text-on-dark-muted" : "text-text-secondary")}>
          {finalCTASection.successMessage}
        </p>
        <Button
          type="button"
          variant={isDark ? "outline-dark" : "secondary"}
          size="md"
          className="mt-6"
          onClick={() => setSubmitState("idle")}
        >
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative space-y-5"
      noValidate
      aria-label="Lead capture form"
    >
      <div style={honeypotStyle} aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          ref={honeypotRef}
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {isDark ? (
        <h3 className="text-xl font-semibold text-on-dark">Get started</h3>
      ) : null}
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
          <span className={cn("text-small", isDark ? "text-on-dark-muted" : "text-text-secondary")}>
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
        <p className="text-small text-red-400" role="alert">
          {errorMsg}
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
