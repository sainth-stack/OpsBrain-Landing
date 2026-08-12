"use client";

import { getCapabilityIcon, IconBox } from "@/components/icons/icon-map";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { homeCapabilitiesSection, homeProductCapabilities } from "@/content/site";
import { cn } from "@/lib/utils";
import { fadeScaleVariants, viewportOnce } from "@/lib/motion";
import { motion } from "framer-motion";
import Link from "next/link";

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      surface="white"
      aria-label={homeCapabilitiesSection.title}
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
            eyebrow={homeCapabilitiesSection.eyebrow}
            title={homeCapabilitiesSection.title}
            subtitle={homeCapabilitiesSection.subtitle}
            align="center"
          />
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homeProductCapabilities.map((capability, index) => {
            const Icon = getCapabilityIcon(capability.icon);
            return (
              <motion.article
                key={capability.title}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={index * 0.08}
                variants={fadeScaleVariants}
                className={cn(
                  "card-marketing",
                  "transition-all duration-300 hover:-translate-y-1",
                )}
              >
                <IconBox
                  icon={Icon}
                  variant="primary"
                  size="md"
                  className="transition-colors group-hover:bg-brand-accent-light group-hover:text-brand-accent"
                />
                <h3 className="mt-4 font-display text-h3 text-text-primary">
                  {capability.title}
                </h3>
                <p className="mt-2 text-body leading-relaxed text-text-secondary">
                  {capability.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <p className="mt-10 text-center">
          <Link
            href="/platform"
            className="text-small font-medium text-brand-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            Explore the full platform →
          </Link>
        </p>
      </Container>
    </Section>
  );
}
