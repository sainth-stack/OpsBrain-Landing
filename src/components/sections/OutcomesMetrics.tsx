"use client";

import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { outcomesMetrics, outcomesMetricsSection } from "@/content/site";
import { cn } from "@/lib/utils";
import { fadeScaleVariants, useCountUp, viewportOnce } from "@/lib/motion";
import { motion } from "framer-motion";

function MetricItem({
  metric,
  index,
}: {
  metric: (typeof outcomesMetrics)[number];
  index: number;
}) {
  const { ref, display } = useCountUp(metric.value, {
    decimals: metric.decimals,
  });

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      custom={index * 0.1}
      variants={fadeScaleVariants}
      className="rounded-2xl border border-border-default bg-surface-white p-6 text-center shadow-sm"
    >
      <span
        ref={ref}
        className="block font-display text-3xl font-bold tabular-nums text-brand-primary md:text-4xl"
      >
        {metric.prefix}
        {display}
        {metric.suffix}
      </span>
      <p className="mt-2 text-small text-text-muted">{metric.label}</p>
    </motion.div>
  );
}

export function OutcomesMetrics() {
  return (
    <Section
      id="outcomes"
      surface="white"
      className="py-16 md:py-20"
      aria-label={outcomesMetricsSection.title}
    >
      <Container>
        <SectionHeader
          eyebrow={outcomesMetricsSection.eyebrow}
          title={outcomesMetricsSection.title}
          subtitle={outcomesMetricsSection.subtitle}
          align="center"
        />

        <div
          className={cn(
            "mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6",
          )}
        >
          {outcomesMetrics.map((metric, index) => (
            <MetricItem key={metric.label} metric={metric} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
