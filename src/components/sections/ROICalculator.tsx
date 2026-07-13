"use client";

import { ButtonLink } from "@/components/ui/button";
import { ROIVisualization } from "@/components/visuals/ROIVisualization";
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
import { useCallback, useMemo, useState } from "react";

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
  const id = `roi-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const displayValue =
    unit === "$"
      ? `${unit}${value.toLocaleString()}`
      : unit === "hrs"
        ? `${value} hrs`
        : unit === "%"
          ? `${value}%`
          : value.toLocaleString();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-text-primary">
          {label}
        </label>
        <span className="shrink-0 text-sm font-semibold tabular-nums text-brand-primary">
          {displayValue}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-slider w-full"
      />
    </div>
  );
}

const DEFAULT_PRESET = roiIndustryPresets.find((p) => p.id === "b2b-saas")!;

export function ROICalculator() {
  const [activePreset, setActivePreset] = useState(DEFAULT_PRESET.id);
  const [leads, setLeads] = useState(DEFAULT_PRESET.leads);
  const [dealValue, setDealValue] = useState(DEFAULT_PRESET.dealValueUsd);
  const [conversionRate, setConversionRate] = useState(
    DEFAULT_PRESET.conversionRate,
  );
  const [responseDelay, setResponseDelay] = useState(
    DEFAULT_PRESET.responseDelay,
  );

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

  const applyPreset = useCallback((preset: RoiIndustryPreset) => {
    setActivePreset(preset.id);
    setLeads(preset.leads);
    setDealValue(preset.dealValueUsd);
    setConversionRate(preset.conversionRate);
    setResponseDelay(preset.responseDelay);
    trackRoiCalculate({ event: "preset", preset: preset.id, leads: preset.leads });
  }, []);

  const update =
    (setter: (v: number) => void) =>
    (v: number) => {
      setActivePreset("custom");
      setter(v);
    };

  return (
    <Section
      id="roi-calculator"
      surface="tint"
      aria-label={roiCalculatorSection.title}
    >
      <Container>
        <SectionHeader
          eyebrow={roiCalculatorSection.eyebrow}
          title={roiCalculatorSection.title}
          subtitle={roiCalculatorSection.subtitle}
          align="center"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
          <div className="flex flex-col rounded-2xl border border-border-default bg-surface-white p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-text-primary">
                {roiCalculatorSection.inputsPanelTitle}
              </p>
            </div>

            <div
              className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
              role="group"
              aria-label="Industry presets"
            >
              {roiIndustryPresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className={cn(
                    "rounded-full border px-3 py-2 text-sm font-medium transition-colors",
                    activePreset === preset.id
                      ? "border-brand-primary bg-brand-primary-light text-brand-primary"
                      : "border-border-default bg-surface-white text-text-muted hover:border-brand-primary/40 hover:text-text-primary",
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-1 flex-col justify-center space-y-7">
              <SliderInput
                label="Monthly incoming leads"
                value={leads}
                min={50}
                max={5000}
                step={50}
                onChange={update(setLeads)}
              />
              <SliderInput
                label="Average deal value"
                value={dealValue}
                min={100}
                max={10000}
                step={100}
                unit="$"
                onChange={update(setDealValue)}
              />
              <SliderInput
                label="Lead conversion rate"
                value={conversionRate}
                min={1}
                max={20}
                step={1}
                unit="%"
                onChange={update(setConversionRate)}
              />
              <SliderInput
                label="Average response delay"
                value={responseDelay}
                min={0.5}
                max={24}
                step={0.5}
                unit="hrs"
                onChange={update(setResponseDelay)}
              />
            </div>
          </div>

          <ROIVisualization
            leads={leads}
            responseDelay={responseDelay}
            results={results}
          />
        </div>

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          <ButtonLink
            href={roiCalculatorSection.cta.href}
            variant="primary"
            size="lg"
            className="sm:min-w-[200px]"
            trackAsDemo="roi_calculator_get_started"
          >
            {roiCalculatorSection.cta.label}
          </ButtonLink>
          <ButtonLink
            href={roiCalculatorSection.secondaryCta.href}
            variant="outline"
            size="lg"
            className="sm:min-w-[200px]"
          >
            {roiCalculatorSection.secondaryCta.label}
          </ButtonLink>
        </div>

        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-text-muted">
          {roiCalculatorSection.disclaimer}
        </p>
      </Container>
    </Section>
  );
}
