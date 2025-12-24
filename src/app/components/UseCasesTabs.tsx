"use client";

import { useMemo, useState } from "react";

type UseCase = {
  id: string;
  label: string;
  problem: string;
  question: string;
  answer: string;
  outcome: string;
};

const USE_CASES: UseCase[] = [
  {
    id: "revenue",
    label: "SaaS Revenue Analytics",
    problem: "Revenue signals are split across billing, CRM, product, and support.",
    question: "Why did net revenue retention drop this month?",
    answer:
      "OpsBrain traces churn to a specific segment impacted by a release regression and increased ticket volume—backed by sources and timelines.",
    outcome: "Faster root cause, targeted retention actions, executive-ready narrative.",
  },
  {
    id: "hr",
    label: "HR & Talent Intelligence",
    problem: "Talent data lives across HRIS, surveys, performance systems, and docs.",
    question: "Which teams are at the highest attrition risk and why?",
    answer:
      "OpsBrain correlates manager changes, engagement dips, and workload indicators with explained risk drivers per cohort.",
    outcome: "Proactive retention plans and measurable leadership actions.",
  },
  {
    id: "manufacturing",
    label: "Manufacturing Quality",
    problem: "Quality metrics and shop-floor events are fragmented across systems.",
    question: "What caused the defect spike on Line 3 last week?",
    answer:
      "OpsBrain links supplier batch changes, calibration logs, and sensor anomalies to the defect window with supporting evidence.",
    outcome: "Reduced scrap and tighter corrective actions with auditability.",
  },
  {
    id: "finance",
    label: "Finance & Fraud Detection",
    problem: "Fraud signals hide across transactions, KYC, device, and support.",
    question: "Which anomalies are likely fraud vs operational noise?",
    answer:
      "OpsBrain scores patterns, explains contributing signals, and recommends investigative next steps with secure access controls.",
    outcome: "Lower losses, fewer false positives, faster investigations.",
  },
  {
    id: "healthcare",
    label: "Healthcare (Role-Based AI)",
    problem: "Sensitive data requires strict access controls and traceability.",
    question: "What changed in outcomes for the last quarter and where?",
    answer:
      "OpsBrain provides role-scoped insights, evidence trails, and PHI-safe summaries aligned to permissions and policies.",
    outcome: "Safer analysis, compliant reporting, and operational improvements.",
  },
  {
    id: "legal",
    label: "Legal & Compliance",
    problem: "Compliance proof is scattered across controls, tickets, and documents.",
    question: "Show evidence that control X was enforced over the last 90 days.",
    answer:
      "OpsBrain assembles audit-ready evidence from logs, policies, and system events with a clear chain of custody.",
    outcome: "Faster audits and higher confidence in compliance posture.",
  },
  {
    id: "support",
    label: "Customer Support Analytics",
    problem: "Customer pain signals are spread across tickets, calls, and product.",
    question: "What’s driving the surge in escalations for Enterprise accounts?",
    answer:
      "OpsBrain maps escalations to product areas, release notes, and account cohorts—explaining impact and recommended actions.",
    outcome: "Reduced escalations and clearer cross-functional prioritization.",
  },
];

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function UseCasesTabs() {
  const [activeId, setActiveId] = useState(USE_CASES[0]?.id ?? "revenue");

  const active = useMemo(
    () => USE_CASES.find((u) => u.id === activeId) ?? USE_CASES[0],
    [activeId],
  );

  const activeTabId = `usecase-tab-${activeId}`;
  const activePanelId = `usecase-panel-${activeId}`;

  return (
    <div className="rounded-2xl border border-[color:var(--obs-border)] bg-white shadow-sm">
      <div
        role="tablist"
        aria-label="OpsBrain real-world use cases"
        className="flex flex-wrap gap-2 border-b border-[color:var(--obs-border)] p-4"
      >
        {USE_CASES.map((u) => {
          const selected = u.id === activeId;
          const tabId = `usecase-tab-${u.id}`;
          const panelId = `usecase-panel-${u.id}`;
          return (
            <button
              key={u.id}
              role="tab"
              type="button"
              id={tabId}
              aria-selected={selected}
              aria-controls={panelId}
              className={cx(
                "rounded-full px-3 py-1.5 text-sm font-medium transition",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--obs-accent-blue)]",
                selected
                  ? "bg-[color:var(--obs-navy)] text-white"
                  : "bg-[color:var(--obs-bg)] text-[color:var(--obs-text)] hover:bg-white",
              )}
              onClick={() => setActiveId(u.id)}
            >
              {u.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={activePanelId}
        aria-labelledby={activeTabId}
        className="grid gap-4 p-6 md:grid-cols-2"
      >
        <div className="rounded-xl border border-[color:var(--obs-border)] bg-[color:var(--obs-bg)] p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-[color:var(--obs-text-muted)]">
            Problem
          </div>
          <div className="mt-2 text-sm leading-6 text-[color:var(--obs-text)]">
            {active.problem}
          </div>
          <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-[color:var(--obs-text-muted)]">
            Question
          </div>
          <div className="mt-2 text-sm leading-6 text-[color:var(--obs-text)]">
            {active.question}
          </div>
        </div>

        <div className="rounded-xl border border-[color:var(--obs-border)] bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-[color:var(--obs-text-muted)]">
            OpsBrain Answer
          </div>
          <div className="mt-2 text-sm leading-6 text-[color:var(--obs-text)]">
            {active.answer}
          </div>
          <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-[color:var(--obs-text-muted)]">
            Outcome
          </div>
          <div className="mt-2 text-sm leading-6 text-[color:var(--obs-text)]">
            {active.outcome}
          </div>
        </div>
      </div>
    </div>
  );
}


