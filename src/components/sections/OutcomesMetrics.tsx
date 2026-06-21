"use client";

import { DarkSectionBackdrop } from "@/components/ui/DarkSectionBackdrop";
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
      className="text-center"
    >
      <span
        ref={ref}
        className="block font-display text-3xl font-bold tabular-nums text-text-inverse md:text-4xl"
      >
        {metric.prefix}
        {display}
        {metric.suffix}
      </span>
      <p className="mt-2 text-small text-text-inverse-muted">{metric.label}</p>
    </motion.div>
  );
}

export function OutcomesMetrics() {
  return (
    <Section
      id="outcomes"
      surface="dark"
      className="relative overflow-hidden py-16 md:py-20"
      aria-label={outcomesMetricsSection.title}
    >
      <DarkSectionBackdrop variant="dark" />
      <Container className="relative">
        <SectionHeader
          eyebrow={outcomesMetricsSection.eyebrow}
          title={outcomesMetricsSection.title}
          subtitle={outcomesMetricsSection.subtitle}
          align="center"
          theme="dark"
        />

        <div
          className={cn(
            "mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6",
            "divide-x-0 md:divide-x md:divide-white/10",
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
