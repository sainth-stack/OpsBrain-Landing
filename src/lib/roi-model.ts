/**
 * Simple pipeline-leak model for the ROI calculator.
 * Longer response delay → more missed follow-ups → less revenue.
 * OpsBrain assumes sub-60-second first response.
 */

export const OPSBRAIN_RESPONSE_HOURS = 1 / 60;

const BASE_LEAK = 0.08;
const MAX_EXTRA_LEAK = 0.55;
const RECOVERY_FACTOR = 0.72;

export type ROIInputs = {
  leads: number;
  dealValue: number;
  conversionRate: number;
  responseDelayHours: number;
};

export type ROIResults = {
  leakPct: number;
  missedFollowUps: number;
  followUpsCompleted: number;
  dealsRecovered: number;
  revenueAtRisk: number;
  revenueRecoverable: number;
  currentConversionPct: number;
  opsBrainConversionPct: number;
};

function leakRate(delayHours: number): number {
  const delayFactor = Math.min(Math.max(delayHours, 0) / 24, 1);
  return BASE_LEAK + delayFactor * MAX_EXTRA_LEAK;
}

export function calculateROI(inputs: ROIInputs): ROIResults {
  const { leads, dealValue, conversionRate, responseDelayHours } = inputs;
  const conversion = conversionRate / 100;

  const todayLeak = leakRate(responseDelayHours);
  const opsBrainLeak = leakRate(OPSBRAIN_RESPONSE_HOURS);

  const missedFollowUps = Math.round(leads * todayLeak);
  const followUpsCompleted = leads - missedFollowUps;

  const dealsToday = leads * conversion * (1 - todayLeak);
  const dealsWithOpsBrain = leads * conversion * (1 - opsBrainLeak);
  const dealsRecovered = Math.max(0, Math.round(dealsWithOpsBrain - dealsToday));

  const revenueAtRisk = Math.round(leads * conversion * todayLeak * dealValue);
  const revenueRecoverable = Math.round(
    (dealsWithOpsBrain - dealsToday) * dealValue * RECOVERY_FACTOR,
  );

  return {
    leakPct: Math.round(todayLeak * 100),
    missedFollowUps,
    followUpsCompleted,
    dealsRecovered,
    revenueAtRisk,
    revenueRecoverable,
    currentConversionPct:
      Math.round(conversion * (1 - todayLeak) * 1000) / 10,
    opsBrainConversionPct:
      Math.round(conversion * (1 - opsBrainLeak) * 1000) / 10,
  };
}

export function formatResponseDelay(hours: number): string {
  if (hours < 1) {
    const mins = Math.round(hours * 60);
    return mins <= 1 ? "under 1 min" : `${mins} min`;
  }
  if (hours === 1) return "1 hr";
  return Number.isInteger(hours) ? `${hours} hrs` : `${hours} hrs`;
}
