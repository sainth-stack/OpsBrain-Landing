"use client";

import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import {
  comparisonColumns,
  comparisonRows,
  comparisonSection,
} from "@/content/site";
import { cn } from "@/lib/utils";
import { fadeScaleVariants, staggerRowVariants, viewportOnce } from "@/lib/motion";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

function AnimatedCheck() {
  return (
    <motion.span
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={viewportOnce}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="inline-flex size-6 items-center justify-center rounded-full bg-brand-accent-light"
    >
      <Check className="size-3.5 text-brand-accent" aria-hidden="true" />
    </motion.span>
  );
}

export function Comparison() {
  const [mobileView, setMobileView] = useState<"opsbrain" | "traditional">(
    "opsbrain",
  );

  return (
    <Section id="comparison" surface="tint" aria-label={comparisonSection.title}>
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          custom={0}
          variants={fadeScaleVariants}
        >
          <SectionHeader
            eyebrow={comparisonSection.eyebrow}
            title={comparisonSection.title}
            subtitle={comparisonSection.subtitle}
            align="center"
          />
        </motion.div>

        {/* Mobile toggle */}
        <div
          className="mt-8 flex rounded-lg border border-border-default bg-surface-muted p-1 md:hidden"
          role="group"
          aria-label="Comparison view toggle"
        >
          {(["opsbrain", "traditional"] as const).map((view) => (
            <button
              key={view}
              type="button"
              onClick={() => setMobileView(view)}
              aria-pressed={mobileView === view}
              className={cn(
                "flex-1 rounded-md py-2.5 text-small font-medium transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                mobileView === view
                  ? "bg-surface-white text-brand-primary border border-brand-primary/20"
                  : "text-text-muted",
              )}
            >
              {view === "opsbrain"
                ? comparisonColumns.opsbrain
                : comparisonColumns.traditional}
            </button>
          ))}
        </div>

        {/* Mobile cards */}
        <div className="mt-4 space-y-3 md:hidden">
          {comparisonRows.map((row, index) => (
            <motion.div
              key={row.feature}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              custom={index * 0.06}
              variants={fadeScaleVariants}
              className="rounded-xl border border-border-default bg-surface-white p-4"
            >
              <p className="text-small font-semibold text-text-primary">
                {row.feature}
              </p>
              <p
                className={cn(
                  "mt-2 text-body font-medium",
                  mobileView === "opsbrain"
                    ? "text-brand-accent"
                    : "text-text-muted",
                )}
              >
                {mobileView === "opsbrain" ? row.opsbrain : row.traditional}
              </p>
              {mobileView === "opsbrain" && row.opsbrainWins && (
                <div className="mt-2 flex items-center gap-1.5">
                  <AnimatedCheck />
                  <span className="text-small text-brand-accent">OpsBrain wins</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="mt-10 hidden overflow-hidden rounded-xl border border-border-default md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-default bg-surface-muted">
                <th
                  scope="col"
                  className="px-6 py-4 text-small font-semibold text-text-primary"
                >
                  Feature
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-small font-semibold text-brand-primary"
                >
                  {comparisonColumns.opsbrain}
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-small font-semibold text-text-muted"
                >
                  {comparisonColumns.traditional}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, index) => (
                <motion.tr
                  key={row.feature}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  custom={index * 0.06}
                  variants={staggerRowVariants}
                  className="border-b border-border-default last:border-b-0"
                >
                  <td className="px-6 py-4 text-body font-medium text-text-primary">
                    {row.feature}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <AnimatedCheck />
                      <span className="text-body font-semibold text-text-primary">
                        {row.opsbrain}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-text-muted">
                      <span className="inline-flex size-6 items-center justify-center rounded-full bg-surface-muted">
                        <X className="size-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-body">{row.traditional}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-10 text-center">
          <Link
            href="/compare"
            className="text-small font-medium text-brand-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            See how we compare to other platforms →
          </Link>
        </p>
      </Container>
    </Section>
  );
}
