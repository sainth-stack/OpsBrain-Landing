"use client";

import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { whyOpsBrainSection } from "@/content/site";
import { cn } from "@/lib/utils";
import { fadeUpVariants, viewportOnce } from "@/lib/motion";
import { Check, Lock, Shield, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const badgeIcons = [ShieldCheck, Lock, Shield, ShieldCheck] as const;

export function WhyOpsBrain() {
  return (
    <Section
      id="why-opsbrain"
      surface="white"
      className="relative overflow-hidden"
      aria-label={whyOpsBrainSection.title}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(79 70 229 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(79 70 229 / 0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 75%)",
        }}
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            custom={0}
            variants={fadeUpVariants}
          >
            <SectionHeader
              eyebrow={whyOpsBrainSection.eyebrow}
              title={whyOpsBrainSection.title}
              subtitle={whyOpsBrainSection.subtitle}
              align="left"
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {whyOpsBrainSection.trustBadges.map((badge, index) => {
                const Icon = badgeIcons[index] ?? ShieldCheck;
                return (
                  <div
                    key={badge.label}
                    className="rounded-xl border border-border-default bg-surface-muted/50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-lg bg-brand-primary-light">
                        <Icon className="size-5 text-brand-primary" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-small font-semibold text-text-primary">
                          {badge.label}
                        </p>
                        <p className="text-[11px] text-text-muted">{badge.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <ul className="space-y-3" role="list">
            {whyOpsBrainSection.checklist.map((item, index) => (
              <motion.li
                key={item}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={index * 0.06}
                variants={fadeUpVariants}
                className={cn(
                  "flex items-start gap-3 rounded-lg border border-border-default bg-surface-muted/50 px-4 py-3",
                )}
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={viewportOnce}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                    delay: index * 0.06,
                  }}
                  className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-accent-light"
                >
                  <Check className="size-3.5 text-brand-accent" aria-hidden="true" />
                </motion.span>
                <span className="text-body text-text-primary">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
