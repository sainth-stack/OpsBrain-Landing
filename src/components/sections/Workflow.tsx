"use client";

import { getWorkflowIcon, IconBox } from "@/components/icons/icon-map";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { workflowSection, workflowSteps } from "@/content/site";
import { cn } from "@/lib/utils";
import { fadeScaleVariants, viewportOnce } from "@/lib/motion";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

const DEFAULT_ACTIVE_INDEX = 5;

function WorkflowStep({
  step,
  index,
  isActive,
  isDefaultHighlight,
  onHover,
  onLeave,
}: {
  step: (typeof workflowSteps)[number];
  index: number;
  isActive: boolean;
  isDefaultHighlight: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const Icon = getWorkflowIcon(step.icon);
  const highlighted = isActive || isDefaultHighlight;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      custom={index * 0.08}
      variants={fadeScaleVariants}
      className="group relative flex flex-col items-center text-center"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      tabIndex={0}
      role="listitem"
      aria-label={`Step ${step.step}: ${step.title}`}
      aria-current={highlighted ? "step" : undefined}
    >
      <div
        className={cn(
          "relative z-10 transition-transform duration-300 group-hover:scale-110",
          highlighted && "scale-110",
        )}
      >
        <IconBox
          icon={Icon}
          variant={highlighted ? "accent" : "primary"}
          size="md"
          className={cn(
            "transition-colors duration-300",
            highlighted && "border-brand-accent/50",
            "group-hover:border-brand-primary/40",
          )}
        />
        <span
          className={cn(
            "absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full text-[10px] font-bold",
            highlighted ? "bg-brand-accent text-white" : "bg-brand-primary text-white",
          )}
        >
          {step.step}
        </span>
      </div>
      <h3
        className={cn(
          "mt-3 text-small font-semibold transition-colors md:text-body",
          highlighted ? "text-brand-primary" : "text-text-primary",
        )}
      >
        {step.title}
      </h3>

      <div
        className={cn(
          "pointer-events-none absolute top-full z-20 mt-3 w-48 rounded-lg border border-border-default bg-surface-white p-3",
          "opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:opacity-100",
          "translate-y-1 group-hover:translate-y-0 group-focus-within:translate-y-0",
        )}
        role="tooltip"
      >
        <p className="text-small leading-relaxed text-text-secondary">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

function DesktopStepper({ lineProgress }: { lineProgress: number }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const dashOffset = 1000 - (lineProgress / 100) * 1000;

  return (
    <div className="relative hidden lg:block" role="list" aria-label="Workflow steps">
      <div className="absolute left-[6%] right-[6%] top-6 h-0.5 bg-border-default">
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="url(#workflow-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1000"
            strokeDashoffset={prefersReducedMotion ? 0 : dashOffset}
            className="transition-[stroke-dashoffset] duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="workflow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative grid grid-cols-8 gap-2">
        {workflowSteps.map((step, index) => (
          <WorkflowStep
            key={step.step}
            step={step}
            index={index}
            isActive={activeIndex === index}
            isDefaultHighlight={activeIndex === null && index === DEFAULT_ACTIVE_INDEX}
            onHover={() => setActiveIndex(index)}
            onLeave={() => setActiveIndex(null)}
          />
        ))}
      </div>
    </div>
  );
}

function MobileTimeline({ lineProgress }: { lineProgress: number }) {
  const [activeDot, setActiveDot] = useState(DEFAULT_ACTIVE_INDEX);

  return (
    <div className="lg:hidden">
      <div className="mb-6 flex items-center justify-between px-2" aria-label="Pipeline progress">
        {workflowSteps.map((step, index) => {
          const isComplete = lineProgress > index * 12.5;
          const isActive = index === activeDot;
          return (
            <button
              key={step.step}
              type="button"
              onClick={() => setActiveDot(index)}
              aria-label={`Step ${step.step}: ${step.title}`}
              aria-current={isActive ? "step" : undefined}
              className={cn(
                "size-2.5 rounded-full transition-all",
                isActive
                  ? "scale-125 bg-brand-accent ring-2 ring-brand-accent/30"
                  : isComplete
                    ? "bg-brand-primary"
                    : "bg-border-default",
              )}
            />
          );
        })}
      </div>

      <div className="relative space-y-0" role="list" aria-label="Workflow steps">
        {workflowSteps.map((step, index) => {
          const Icon = getWorkflowIcon(step.icon);
          const isLast = index === workflowSteps.length - 1;
          const stepProgress = Math.min(
            1,
            Math.max(0, (lineProgress - index * 12.5) / 12.5),
          );
          const isHighlighted = index === activeDot;

          return (
            <motion.div
              key={step.step}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              custom={index * 0.08}
              variants={fadeScaleVariants}
              className={cn(
                "relative flex gap-4 pb-8 transition-opacity",
                !isHighlighted && activeDot !== index && "opacity-60",
              )}
              role="listitem"
            >
              {!isLast && (
                <div
                  className="absolute left-6 top-12 h-[calc(100%-2rem)] w-0.5 bg-border-default"
                  aria-hidden="true"
                >
                  <div
                    className="w-full bg-gradient-to-b from-brand-primary to-brand-accent transition-all duration-700"
                    style={{ height: `${stepProgress * 100}%` }}
                  />
                </div>
              )}

              <div className="relative z-10 shrink-0">
                <IconBox
                  icon={Icon}
                  variant={isHighlighted ? "accent" : "primary"}
                  size="md"
                />
                <span
                  className={cn(
                    "absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-white",
                    isHighlighted ? "bg-brand-accent" : "bg-brand-primary",
                  )}
                >
                  {step.step}
                </span>
              </div>

              <div className="pt-1">
                <h3 className="text-body font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-1 text-small leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function Workflow() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const lineProgress = isInView ? 100 : 0;

  return (
    <Section id="workflow" surface="white" aria-label={workflowSection.title}>
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          custom={0}
          variants={fadeScaleVariants}
        >
          <SectionHeader
            eyebrow={workflowSection.eyebrow}
            title={workflowSection.title}
            subtitle={workflowSection.subtitle}
            align="center"
          />
        </motion.div>

        <div ref={ref} className="mt-12 md:mt-16">
          <DesktopStepper lineProgress={lineProgress} />
          <MobileTimeline lineProgress={lineProgress} />
        </div>
      </Container>
    </Section>
  );
}
