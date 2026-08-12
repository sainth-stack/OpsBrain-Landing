"use client";

import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { moreFromOpsBrain } from "@/content/products";
import { fadeUpVariants, viewportOnce } from "@/lib/motion";
import { ArrowRight, Share2, Video } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const cardIcons = {
  spark: Share2,
  meet: Video,
} as const;

export function MoreFromOpsBrain() {
  return (
    <Section
      id={moreFromOpsBrain.id}
      surface="muted"
      aria-labelledby="more-from-opsbrain-heading"
    >
      <Container>
        <SectionHeader
          eyebrow={moreFromOpsBrain.eyebrow}
          title={moreFromOpsBrain.title}
          subtitle={moreFromOpsBrain.subtitle}
        />

        <div className="grid gap-5 md:grid-cols-2">
          {moreFromOpsBrain.cards.map((card, index) => {
            const Icon = cardIcons[card.slug];
            return (
              <motion.div
                key={card.slug}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={index * 0.08}
                variants={fadeUpVariants}
              >
                <Link
                  href={card.href}
                  className="group flex h-full flex-col rounded-2xl border border-border-default bg-surface-white p-7 transition-all hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary md:p-8"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-primary-light text-brand-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-small font-semibold uppercase tracking-wider text-brand-primary">
                    {card.name}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-text-primary">
                    {card.line}
                  </h3>
                  <p className="mt-3 flex-1 text-body leading-relaxed text-text-secondary">
                    {card.body}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-small font-semibold text-brand-primary">
                    {card.cta}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
