"use client";

import { EmployeeAvatar, type AvatarType } from "@/components/visuals/EmployeeAvatars";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import {
  aiEmployeeFilters,
  aiEmployees,
  aiEmployeesSection,
} from "@/content/site";
import { cn } from "@/lib/utils";
import { fadeScaleVariants, viewportOnce } from "@/lib/motion";
import { ArrowRight, Check, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Employee = (typeof aiEmployees)[number];

function IntegrationChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border-default bg-surface-muted px-2 py-0.5 text-[11px] font-medium text-text-muted">
      {label}
    </span>
  );
}

function EmployeeModal({
  employee,
  onClose,
}: {
  employee: Employee;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="employee-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        className="relative z-10 flex w-full max-w-lg max-h-[min(640px,calc(100dvh-2rem))] flex-col overflow-hidden rounded-2xl border border-border-default bg-surface-white shadow-xl"
      >
        <div
          className={cn("h-0.5 shrink-0 bg-gradient-to-r", employee.gradient)}
          aria-hidden="true"
        />

        <div className="min-h-0 flex-1 overflow-y-auto p-6 md:p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            aria-label="Close"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          <EmployeeAvatar type={employee.avatar as AvatarType} size="xl" />

          <p className="mt-5 text-[11px] font-medium uppercase tracking-wider text-text-muted">
            {employee.role}
          </p>
          <h3 id="employee-modal-title" className="mt-1 font-display text-h3 text-text-primary">
            {employee.name}
          </h3>
          <p className="mt-2 text-small font-medium text-brand-accent">
            {employee.outcomeMetric}
          </p>

          <ul className="mt-6 space-y-3" role="list">
            {employee.capabilities.map((capability) => (
              <li key={capability} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-accent-light">
                  <Check className="size-3 text-brand-accent" aria-hidden="true" />
                </span>
                <span className="text-small leading-relaxed text-text-secondary">
                  {capability}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
              Integrates with
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {employee.integrations.map((integration) => (
                <IntegrationChip key={integration} label={integration} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-3 border-t border-border-muted bg-surface-white p-4 sm:flex-row sm:p-6">
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:flex-1"
            onClick={() => {
              onClose();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Deploy This Employee
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full sm:flex-1"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}

function EmployeeCard({
  employee,
  index,
  onLearnMore,
  className,
}: {
  employee: Employee;
  index: number;
  onLearnMore: (employee: Employee) => void;
  className?: string;
}) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      custom={index * 0.07}
      variants={fadeScaleVariants}
      layout
      className={cn(
        "gradient-border group relative flex shrink-0 snap-center flex-col overflow-hidden rounded-xl bg-surface-white",
        "w-[300px] shadow-sm transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-md hover:border-brand-primary/40",
        "md:w-auto md:shrink md:snap-align-none",
        className,
      )}
    >
      <div
        className={cn("h-0.5 w-full bg-gradient-to-r", employee.gradient)}
        aria-hidden="true"
      />

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <EmployeeAvatar type={employee.avatar as AvatarType} />

        <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-text-muted">
          {employee.role}
        </p>
        <h3 className="mt-1.5 text-body font-semibold text-text-primary md:text-lg">
          <Link
            href={`/ai-employees/${employee.id}`}
            className="hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            {employee.name}
          </Link>
        </h3>
        <p className="mt-2 text-small font-medium text-brand-accent">
          {employee.outcomeMetric}
        </p>
        <p className="mt-2 line-clamp-2 text-small leading-relaxed text-text-muted">
          {employee.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-border-muted pt-4">
          <div className="flex min-w-0 flex-wrap gap-1">
            {employee.integrations.slice(0, 3).map((integration) => (
              <IntegrationChip key={integration} label={integration} />
            ))}
          </div>
          <Link
            href={`/ai-employees/${employee.id}`}
            className="inline-flex shrink-0 items-center gap-0.5 text-small font-medium text-brand-primary transition-colors hover:text-brand-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            Learn more
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function AIEmployees() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filtered =
    activeFilter === "All"
      ? aiEmployees
      : aiEmployees.filter((e) => e.industry === activeFilter);

  const handleLearnMore = useCallback((employee: Employee) => {
    setSelectedEmployee(employee);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedEmployee(null);
  }, []);

  return (
    <Section id="ai-employees" surface="muted" aria-label={aiEmployeesSection.title}>
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          custom={0}
          variants={fadeScaleVariants}
        >
          <SectionHeader
            eyebrow={aiEmployeesSection.eyebrow}
            title={aiEmployeesSection.title}
            subtitle={aiEmployeesSection.subtitle}
            align="center"
          />
        </motion.div>

        <div
          className="mt-8 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Filter by industry"
        >
          {aiEmployeeFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-small font-medium transition-all",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                activeFilter === filter
                  ? "border-brand-primary bg-brand-primary-light text-brand-primary"
                  : "border-border-default bg-surface-white text-text-muted hover:border-brand-primary/30 hover:text-text-primary",
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div
          className={cn(
            "mt-10 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none",
            "-mx-6 px-6",
            "md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 md:snap-none lg:grid-cols-3 lg:gap-5",
          )}
        >
          {filtered.map((employee, index) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              index={index}
              onLearnMore={handleLearnMore}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-center text-body text-text-muted">
            No AI employees match this filter.
          </p>
        )}

        <p className="mt-10 text-center text-small text-text-muted">
          {aiEmployeesSection.trustLine}{" "}
          <Link href="/ai-employees" className="font-medium text-brand-primary hover:underline">
            Browse all AI employees →
          </Link>
        </p>
      </Container>

      <AnimatePresence>
        {selectedEmployee && (
          <EmployeeModal employee={selectedEmployee} onClose={handleClose} />
        )}
      </AnimatePresence>
    </Section>
  );
}
