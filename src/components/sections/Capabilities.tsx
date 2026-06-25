"use client";

import { getCapabilityIcon, IconBox } from "@/components/icons/icon-map";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { capabilities, capabilitiesSection } from "@/content/site";
import { cn } from "@/lib/utils";
import { fadeScaleVariants, viewportOnce } from "@/lib/motion";
import { motion } from "framer-motion";
import Link from "next/link";

type Capability = (typeof capabilities)[number] & { featured?: boolean };

export function Capabilities() {
  const featured = capabilities.filter((c) => "featured" in c && c.featured) as Capability[];
  const standard = capabilities.filter((c) => !("featured" in c && c.featured));

  return (
    <Section
      id="capabilities"
      surface="white"
      aria-label={capabilitiesSection.title}
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
            eyebrow={capabilitiesSection.eyebrow}
            title={capabilitiesSection.title}
            subtitle={capabilitiesSection.subtitle}
            align="center"
          />
        </motion.div>

        <div className="mt-12 grid gap-4 lg:grid-cols-4 lg:gap-5">
          {featured.map((capability, index) => {
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
                  "card-marketing lg:col-span-2",
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

          {standard.map((capability, index) => {
            const Icon = getCapabilityIcon(capability.icon);
            return (
              <motion.article
                key={capability.title}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={(index + 2) * 0.06}
                variants={fadeScaleVariants}
                className={cn(
                  "card-marketing p-5",
                  "transition-all duration-300 hover:-translate-y-1",
                )}
              >
                <IconBox
                  icon={Icon}
                  variant="primary"
                  size="sm"
                  className="transition-colors group-hover:bg-brand-accent-light group-hover:text-brand-accent"
                />
                <h3 className="mt-4 text-small font-semibold text-text-primary md:text-body">
                  {capability.title}
                </h3>
                <p className="mt-2 text-small leading-relaxed text-text-muted">
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
