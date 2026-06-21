"use client";

import { getProblemIcon, IconBox } from "@/components/icons/icon-map";
import { DarkSectionBackdrop } from "@/components/ui/DarkSectionBackdrop";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { problemSection } from "@/content/site";
import { fadeUpVariants, viewportOnce } from "@/lib/motion";
import { motion } from "framer-motion";

export function Problem() {
  return (
    <Section id="problem" surface="dark" className="relative overflow-hidden" aria-label={problemSection.title}>
      <DarkSectionBackdrop variant="dark" />
      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          custom={0}
          variants={fadeUpVariants}
        >
          <SectionHeader
            eyebrow={problemSection.eyebrow}
            title={problemSection.title}
            subtitle={problemSection.subtitle}
            align="center"
            theme="dark"
          />
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          custom={0.15}
          variants={fadeUpVariants}
          className="mx-auto mt-8 max-w-3xl rounded-xl border border-brand-accent/30 bg-brand-accent/10 px-6 py-4 text-center text-body font-medium leading-relaxed text-brand-accent md:text-lg"
        >
          {problemSection.statHighlight}
        </motion.p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {problemSection.painPoints.map((point, index) => {
            const Icon = getProblemIcon(point.icon);
            return (
              <motion.div
                key={point.title}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={index * 0.1}
                variants={fadeUpVariants}
                className="group rounded-xl border border-white/10 bg-surface-dark-elevated/60 p-6 transition-colors hover:border-brand-primary/30 hover:bg-surface-dark-elevated"
              >
                <IconBox icon={Icon} variant="dark" size="md" />
                <h3 className="mt-4 text-h3 text-text-inverse">{point.title}</h3>
                <p className="mt-2 text-small leading-relaxed text-text-inverse-muted">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          custom={0.5}
          variants={fadeUpVariants}
          className="mt-12 text-center text-h3 font-semibold text-text-inverse md:mt-16"
        >
          {problemSection.closingLine}
        </motion.p>
      </Container>
    </Section>
  );
}
