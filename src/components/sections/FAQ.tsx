"use client";

import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { faqCategories, faqSection } from "@/content/site";
import { cn } from "@/lib/utils";
import { fadeUpVariants, viewportOnce } from "@/lib/motion";
import { ChevronDown } from "lucide-react";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";

function FaqAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  id,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  id: string;
}) {
  return (
    <div className="border-b border-border-default last:border-b-0">
      <button
        type="button"
        id={`${id}-button`}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
        className="flex w-full min-h-11 items-center justify-between gap-4 py-4 text-left transition-colors hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
      >
        <span className="text-body font-medium text-text-primary">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-text-muted transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className={cn(
          "grid transition-[grid-template-rows] duration-250 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-4 text-body leading-relaxed text-text-secondary">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [activeTab, setActiveTab] = useState<string>(faqCategories[0].id);
  const [openByCategory, setOpenByCategory] = useState<Record<string, number | null>>(
    () =>
      Object.fromEntries(
        faqCategories.map((category) => [category.id, 0]),
      ),
  );

  const handleTabChange = useCallback((id: string) => {
    setActiveTab(id);
  }, []);

  const toggleItem = useCallback((categoryId: string, index: number) => {
    setOpenByCategory((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] === index ? null : index,
    }));
  }, []);

  return (
    <Section id="faq" surface="white" aria-label={faqSection.title}>
      <Container>
        <motion.div
          initial={false}
          whileInView="visible"
          viewport={viewportOnce}
          custom={0}
          variants={fadeUpVariants}
        >
          <SectionHeader
            eyebrow={faqSection.eyebrow}
            title={faqSection.title}
            subtitle={faqSection.subtitle}
            align="center"
          />
        </motion.div>

        {faqCategories.length > 1 ? (
          <div
            className="mx-auto mt-10 flex max-w-lg flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="FAQ categories"
          >
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeTab === cat.id}
                aria-controls={`faq-panel-${cat.id}`}
                onClick={() => handleTabChange(cat.id)}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full border px-5 py-2 text-small font-medium transition-all",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                  activeTab === cat.id
                    ? "border-brand-primary bg-brand-primary-light text-brand-primary"
                    : "border-border-default bg-surface-white text-text-muted hover:text-text-primary",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        ) : null}

        {faqCategories.map((category) => {
          const openIndex = openByCategory[category.id] ?? null;
          const isActive = activeTab === category.id;

          return (
            <div
              key={category.id}
              id={`faq-panel-${category.id}`}
              role="tabpanel"
              aria-label={category.title}
              hidden={!isActive}
              className="mx-auto mt-8 max-w-3xl rounded-xl border border-border-default bg-surface-white px-6 md:px-8"
            >
              {category.items.map((item, index) => (
                <FaqAccordionItem
                  key={item.question}
                  id={`faq-${category.id}-${index}`}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === index}
                  onToggle={() => toggleItem(category.id, index)}
                />
              ))}
            </div>
          );
        })}
      </Container>
    </Section>
  );
}
