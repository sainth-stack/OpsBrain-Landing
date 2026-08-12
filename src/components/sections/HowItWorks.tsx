"use client";

import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { howItWorksSection, howItWorksSteps } from "@/content/site";
import { fadeUpVariants, viewportOnce } from "@/lib/motion";
import { motion } from "framer-motion";
import Link from "next/link";

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      surface="tint"
      className="scroll-mt-16"
      aria-label={howItWorksSection.title}
    >
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          custom={0}
          variants={fadeUpVariants}
        >
          <SectionHeader
            eyebrow={howItWorksSection.eyebrow}
            title={howItWorksSection.title}
            subtitle={howItWorksSection.subtitle}
          />
        </motion.div>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((item, index) => (
            <motion.li
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              custom={index * 0.08}
              variants={fadeUpVariants}
              className="rounded-2xl border border-border-default bg-surface-white p-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-primary">
                Step {item.step}
              </p>
              <h3 className="mt-3 font-display text-lg font-bold text-text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-small leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </motion.li>
          ))}
        </ol>

        <p className="mt-10 text-center">
          <Link
            href="/solutions"
            className="text-small font-medium text-brand-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            See lead calling, inbound, and campaigns →
          </Link>
        </p>
      </Container>
    </Section>
  );
}
