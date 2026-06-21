"use client";

import { BulkCampaignFlow } from "@/components/visuals/BulkCampaignFlow";
import { InboundSupportFlow } from "@/components/visuals/InboundSupportFlow";
import { LeadCallingFlow } from "@/components/visuals/LeadCallingFlow";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { howItWorksSection, howItWorksTabs } from "@/content/site";
import { cn } from "@/lib/utils";
import { fadeScaleVariants, viewportOnce } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const visualComponents = {
  LeadCallingFlow,
  InboundSupportFlow,
  BulkCampaignFlow,
} as const;

function TabVisual({
  visual,
  activeStep,
}: {
  visual: (typeof howItWorksTabs)[number]["visual"];
  activeStep: number;
}) {
  const Component = visualComponents[visual];
  return <Component active activeStep={activeStep} />;
}

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const tabListRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const currentTab = howItWorksTabs[activeTab];

  const selectTab = useCallback((index: number) => {
    setActiveTab(index);
    setActiveStep(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % currentTab.steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [currentTab.steps.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      let nextIndex = index;
      if (e.key === "ArrowRight") {
        nextIndex = (index + 1) % howItWorksTabs.length;
      } else if (e.key === "ArrowLeft") {
        nextIndex = (index - 1 + howItWorksTabs.length) % howItWorksTabs.length;
      } else if (e.key === "Home") {
        nextIndex = 0;
      } else if (e.key === "End") {
        nextIndex = howItWorksTabs.length - 1;
      } else {
        return;
      }
      e.preventDefault();
      setActiveTab(nextIndex);
      setActiveStep(0);
      const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons?.[nextIndex]?.focus();
    },
    [],
  );

  return (
    <Section id="how-it-works" surface="muted" aria-label={howItWorksSection.title}>
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          custom={0}
          variants={fadeScaleVariants}
        >
          <SectionHeader
            eyebrow={howItWorksSection.eyebrow}
            title={howItWorksSection.title}
            subtitle={howItWorksSection.subtitle}
            align="center"
          />
        </motion.div>

        <div className="mt-10 md:mt-14">
          {/* Tab list */}
          <div
            ref={tabListRef}
            role="tablist"
            aria-label="How it works scenarios"
            className="relative flex flex-col gap-1 rounded-xl border border-border-default bg-surface-white p-1 sm:flex-row"
          >
            {howItWorksTabs.map((tab, index) => (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={activeTab === index}
                aria-controls={`${panelId}-${tab.id}`}
                tabIndex={activeTab === index ? 0 : -1}
                onClick={() => selectTab(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={cn(
                  "relative z-10 flex-1 rounded-lg px-4 py-3 text-small font-medium transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                  activeTab === index
                    ? "text-brand-primary"
                    : "text-text-muted hover:text-text-primary",
                )}
              >
                {activeTab === index && (
                  <motion.span
                    layoutId="how-it-works-tab-indicator"
                    className="absolute inset-0 rounded-lg bg-brand-primary-light"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab panels */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.id}
              role="tabpanel"
              id={`${panelId}-${currentTab.id}`}
              aria-labelledby={`tab-${currentTab.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12"
            >
              <div>
                <h3 className="text-h3 text-text-primary">{currentTab.title}</h3>
                <p className="mt-3 text-body text-text-secondary">
                  {currentTab.description}
                </p>

                <ol className="mt-8 space-y-4" aria-label="Steps">
                  {currentTab.steps.map((step, index) => (
                    <li key={step} className="flex gap-4">
                      <motion.span
                        animate={
                          activeStep === index
                            ? { scale: [1, 1.15, 1] }
                            : { scale: 1 }
                        }
                        transition={{
                          duration: 0.6,
                          repeat: activeStep === index ? Infinity : 0,
                          repeatDelay: 1,
                        }}
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-full text-small font-bold",
                          activeStep === index
                            ? "bg-brand-primary text-white ring-2 ring-brand-primary/30"
                            : "bg-surface-muted text-text-muted",
                        )}
                        aria-current={activeStep === index ? "step" : undefined}
                      >
                        {index + 1}
                      </motion.span>
                      <p
                        className={cn(
                          "pt-1 text-body",
                          activeStep === index
                            ? "font-medium text-text-primary"
                            : "text-text-secondary",
                        )}
                      >
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="min-h-[280px]">
                <TabVisual visual={currentTab.visual} activeStep={activeStep} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
