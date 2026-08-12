"use client";

import { getAgentIcon, IconBox } from "@/components/icons/icon-map";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import {
  aiEmployeeFilters,
  aiEmployees,
  aiEmployeesSection,
} from "@/content/site";
import { cn } from "@/lib/utils";
import { fadeScaleVariants, viewportOnce } from "@/lib/motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

type Employee = (typeof aiEmployees)[number];

function EmployeeCard({
  employee,
  index,
}: {
  employee: Employee;
  index: number;
}) {
  const Icon = getAgentIcon(employee.id);

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      custom={index * 0.05}
      variants={fadeScaleVariants}
      layout
    >
      <Link
        href={`/ai-employees/${employee.id}`}
        className={cn(
          "group flex h-full flex-col rounded-2xl border border-border-default bg-surface-white p-5 md:p-6",
          "transition-colors hover:border-brand-primary/35",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <IconBox icon={Icon} variant="primary" size="sm" />
          <span className="rounded-md bg-surface-muted px-2 py-0.5 text-[11px] font-medium text-text-muted">
            {employee.industry}
          </span>
        </div>

        <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          {employee.role}
        </p>
        <h3 className="mt-1 font-display text-[17px] font-semibold tracking-tight text-text-primary">
          {employee.name}
        </h3>
        <p className="mt-2 text-[13px] font-medium text-brand-primary">
          {employee.outcomeMetric}
        </p>
        <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-relaxed text-text-secondary">
          {employee.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border-default pt-4">
          <div className="flex min-w-0 flex-wrap gap-1">
            {employee.integrations.slice(0, 2).map((integration) => (
              <span
                key={integration}
                className="rounded-md border border-border-default bg-surface-muted/60 px-2 py-0.5 text-[11px] font-medium text-text-muted"
              >
                {integration}
              </span>
            ))}
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 text-[13px] font-semibold text-brand-primary">
            Learn more
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export function AIEmployees() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered =
    activeFilter === "All"
      ? aiEmployees
      : aiEmployees.filter((employee) => employee.industry === activeFilter);

  return (
    <Section
      id="ai-employees"
      surface="muted"
      aria-label={aiEmployeesSection.title}
    >
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
            className="mb-8 md:mb-10"
          />
        </motion.div>

        <div
          className="flex flex-wrap gap-1.5"
          role="tablist"
          aria-label="Filter by industry"
        >
          {aiEmployeeFilters.map((filter) => {
            const active = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "min-h-9 rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                  active
                    ? "bg-brand-primary text-white"
                    : "bg-surface-white text-text-muted ring-1 ring-inset ring-border-default hover:text-text-primary",
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((employee, index) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              index={index}
            />
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-8 text-center text-body text-text-muted">
            No AI employees match this filter.
          </p>
        ) : null}

        <p className="mt-8 text-center text-[13px] text-text-muted">
          {aiEmployeesSection.trustLine}{" "}
          <Link
            href="/ai-employees"
            className="font-semibold text-brand-primary hover:underline"
          >
            Browse all AI employees
            <span aria-hidden="true"> →</span>
          </Link>
        </p>
      </Container>
    </Section>
  );
}
