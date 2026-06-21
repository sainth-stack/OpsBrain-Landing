"use client";

import dynamic from "next/dynamic";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import {
  roiCalculatorSection,
  roiIndustryPresets,
  type RoiIndustryPreset,
} from "@/content/site";
import { trackRoiCalculate } from "@/lib/analytics";
import { calculateROI } from "@/lib/roi-model";
import { cn } from "@/lib/utils";
import { fadeUpVariants, viewportOnce } from "@/lib/motion";
import {
  motion,
  useMotionValueEvent,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

const ROIVisualization = dynamic(
  () =>
    import("@/components/visuals/ROIVisualization").then(
      (m) => m.ROIVisualization,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[480px] animate-pulse rounded-xl border border-border-default bg-surface-muted"
        aria-hidden="true"
      />
    ),
  },
);

type Currency = "INR" | "USD";

function AnimatedNumber({
  value,
  currency,
  format = "currency",
}: {
  value: number;
  currency: Currency;
  format?: "currency" | "number";
}) {
  const prefersReducedMotion = useReducedMotion();
  const spring = useSpring(value, {
    stiffness: 100,
    damping: 20,
    mass: 0.8,
  });
  const [display, setDisplay] = useState(value);

  useMotionValueEvent(spring, "change", (v) => {
    setDisplay(Math.round(v));
  });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  const activeValue = prefersReducedMotion ? value : display;
  const formatted = activeValue.toLocaleString();

  if (format === "currency") {
    return (
      <span>
        {currency === "INR" ? "₹" : "$"}
        {formatted}
      </span>
    );
  }
  return <span>{formatted}</span>;
}

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  const displayValue =
    unit === "₹" || unit === "$"
      ? `${unit}${value.toLocaleString()}`
      : unit === "hrs"
        ? `${value} hrs`
        : unit === "%"
          ? `${value}%`
          : value.toLocaleString();

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={`roi-${label.replace(/\s+/g, "-").toLowerCase()}`}
          className="text-small font-medium text-text-primary"
        >
          {label}
        </label>
        <span className="text-small font-semibold tabular-nums text-brand-primary">
          {displayValue}
        </span>
      </div>
      <input
        id={`roi-${label.replace(/\s+/g, "-").toLowerCase()}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className="roi-slider mt-3 w-full"
      />
    </div>
  );
}

const DEFAULT_PRESET = roiIndustryPresets.find((p) => p.id === "b2b-saas")!;

export function ROICalculator() {
  const [activePreset, setActivePreset] = useState<string>(DEFAULT_PRESET.id);
  const [leads, setLeads] = useState(DEFAULT_PRESET.leads);
  const [dealValue, setDealValue] = useState(DEFAULT_PRESET.dealValueInr);
  const [conversionRate, setConversionRate] = useState(
    DEFAULT_PRESET.conversionRate,
  );
  const [responseDelay, setResponseDelay] = useState(
    DEFAULT_PRESET.responseDelay,
  );
  const [currency, setCurrency] = useState<Currency>("INR");

  const results = useMemo(
    () =>
      calculateROI({
        leads,
        dealValue,
        conversionRate,
        responseDelayHours: responseDelay,
      }),
    [leads, dealValue, conversionRate, responseDelay],
  );

  const applyPreset = useCallback(
    (preset: RoiIndustryPreset) => {
      setActivePreset(preset.id);
      setLeads(preset.leads);
      setDealValue(
        currency === "INR" ? preset.dealValueInr : preset.dealValueUsd,
      );
      setConversionRate(preset.conversionRate);
      setResponseDelay(preset.responseDelay);
      trackRoiCalculate({
        event: "preset",
        preset: preset.id,
        leads: preset.leads,
        currency,
      });
    },
    [currency],
  );

  const handleInputChange = (
    setter: (v: number) => void,
    v: number,
    track = false,
  ) => {
    setActivePreset("custom");
    setter(v);
    if (track) {
      trackRoiCalculate({
        leads: setter === setLeads ? v : leads,
        dealValue: setter === setDealValue ? v : dealValue,
        conversionRate: setter === setConversionRate ? v : conversionRate,
        responseDelay: setter === setResponseDelay ? v : responseDelay,
        currency,
        revenueRecoverable: results.revenueRecoverable,
      });
    }
  };

  const toggleCurrency = () => {
    const preset = roiIndustryPresets.find((p) => p.id === activePreset);
    if (currency === "INR") {
      setCurrency("USD");
      setDealValue(preset?.dealValueUsd ?? 500);
    } else {
      setCurrency("INR");
      setDealValue(preset?.dealValueInr ?? 25000);
    }
    setActivePreset(activePreset === "custom" ? "custom" : activePreset);
  };

  return (
    <Section
      id="roi-calculator"
      surface="muted"
      aria-label={roiCalculatorSection.title}
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
            eyebrow={roiCalculatorSection.eyebrow}
            title={roiCalculatorSection.title}
            subtitle={roiCalculatorSection.subtitle}
            align="center"
          />
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="rounded-xl border border-border-default bg-surface-white p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-small font-semibold text-text-primary">
                {roiCalculatorSection.inputsPanelTitle}
              </p>
              <button
                type="button"
                onClick={toggleCurrency}
                className="rounded-lg border border-border-default px-3 py-1.5 text-small font-medium text-text-primary transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                aria-label={`Switch to ${currency === "INR" ? "USD" : "INR"}`}
              >
                {currency === "INR" ? "₹ INR" : "$ USD"}
              </button>
            </div>

            <div
              className="mt-5 flex flex-wrap gap-2"
              role="group"
              aria-label="Industry presets"
            >
              {roiIndustryPresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-small font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                    activePreset === preset.id
                      ? "border-brand-primary bg-brand-primary-light text-brand-primary"
                      : "border-border-default bg-surface-white text-text-muted hover:border-brand-primary/40 hover:text-text-primary",
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="mt-8 space-y-6">
              <SliderInput
                label="Monthly incoming leads"
                value={leads}
                min={50}
                max={5000}
                step={50}
                onChange={(v) => handleInputChange(setLeads, v, true)}
              />
              <SliderInput
                label="Average deal value"
                value={dealValue}
                min={currency === "INR" ? 5000 : 100}
                max={currency === "INR" ? 500000 : 10000}
                step={currency === "INR" ? 5000 : 100}
                unit={currency === "INR" ? "₹" : "$"}
                onChange={(v) => handleInputChange(setDealValue, v)}
              />
              <SliderInput
                label="Lead conversion rate"
                value={conversionRate}
                min={1}
                max={20}
                step={1}
                unit="%"
                onChange={(v) => handleInputChange(setConversionRate, v)}
              />
              <SliderInput
                label="Average response delay"
                value={responseDelay}
                min={0.5}
                max={24}
                step={0.5}
                unit="hrs"
                onChange={(v) => handleInputChange(setResponseDelay, v)}
              />
            </div>
          </div>

          <div className="space-y-6">
            <ROIVisualization
              leads={leads}
              responseDelay={responseDelay}
              results={results}
              currency={currency}
              heroMetric={
                <AnimatedNumber
                  value={results.revenueRecoverable}
                  currency={currency}
                />
              }
            />

            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={roiCalculatorSection.cta.href}
                variant="primary"
                size="lg"
                className="flex-1"
                trackAsDemo="roi_calculator_book_demo"
              >
                {roiCalculatorSection.cta.label}
              </ButtonLink>
              <ButtonLink
                href={roiCalculatorSection.secondaryCta.href}
                variant="secondary"
                size="lg"
                className="flex-1"
              >
                {roiCalculatorSection.secondaryCta.label}
              </ButtonLink>
            </div>

            <p className="text-small leading-relaxed text-text-muted">
              {roiCalculatorSection.disclaimer}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
