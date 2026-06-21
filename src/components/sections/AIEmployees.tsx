"use client";

import { EmployeeAvatar, type AvatarType } from "@/components/visuals/EmployeeAvatars";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import {
  aiEmployeeFilters,
  aiEmployees,
  aiEmployeesSection,
} from "@/content/site";
import { cn } from "@/lib/utils";
import { fadeScaleVariants, viewportOnce } from "@/lib/motion";
import { ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState, type MouseEvent } from "react";

function useCardTilt() {
  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = Math.max(-4, Math.min(4, ((y - rect.height / 2) / rect.height) * -8));
    const rotateY = Math.max(-4, Math.min(4, ((x - rect.width / 2) / rect.width) * 8));
    el.style.setProperty("--tilt-x", `${rotateX}deg`);
    el.style.setProperty("--tilt-y", `${rotateY}deg`);
  };

  const onMouseLeave = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--tilt-x", "0deg");
    e.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return { onMouseMove, onMouseLeave };
}

type Employee = (typeof aiEmployees)[number];

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
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
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        className="relative z-10 w-full max-w-lg rounded-2xl border border-border-default bg-surface-white p-6 md:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          aria-label="Close"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <EmployeeAvatar type={employee.avatar as AvatarType} size={72} />

        <p className="mt-4 text-[11px] font-medium uppercase tracking-wider text-text-muted">
          {employee.role}
        </p>
        <h3 id="employee-modal-title" className="mt-1 text-h3 text-text-primary">
          {employee.name}
        </h3>
        <p className="mt-4 text-body leading-relaxed text-text-secondary">
          {employee.fullDescription}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#contact" variant="primary" size="lg" className="flex-1" onClick={onClose}>
            Deploy This Employee
          </ButtonLink>
          <Button variant="secondary" size="lg" className="flex-1" onClick={onClose}>
            Close
          </Button>
        </div>
      </motion.div>
    </div>
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
  const { onMouseMove, onMouseLeave } = useCardTilt();

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      custom={index * 0.07}
      variants={fadeScaleVariants}
      layout
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn(
        "card-tilt group relative flex shrink-0 snap-center flex-col overflow-hidden rounded-xl border border-border-default bg-surface-white",
        "w-[280px] transition-all duration-300 hover:scale-[1.02] hover:border-brand-primary/40",
        "md:w-auto md:shrink md:snap-align-none",
        className,
      )}
    >
      <div
        className={cn(
          "h-1 w-full bg-gradient-to-r opacity-70 transition-opacity duration-300 group-hover:opacity-100",
          employee.gradient,
        )}
        aria-hidden="true"
      />

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <EmployeeAvatar type={employee.avatar as AvatarType} size={64} />

        <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-text-muted">
          {employee.role}
        </p>
        <h3 className="mt-2 text-body font-semibold text-text-primary">
          {employee.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-small leading-relaxed text-text-muted">
          {employee.description}
        </p>

        <button
          type="button"
          onClick={() => onLearnMore(employee)}
          className="mt-4 inline-flex min-h-11 items-center gap-1 text-small font-medium text-brand-primary transition-colors hover:text-brand-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          Learn More
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
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
    <Section id="ai-employees" surface="white" aria-label={aiEmployeesSection.title}>
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
      </Container>

      <AnimatePresence>
        {selectedEmployee && (
          <EmployeeModal employee={selectedEmployee} onClose={handleClose} />
        )}
      </AnimatePresence>
    </Section>
  );
}
