/**
 * Pipeline leak model for the ROI calculator.
 *
 * Based on speed-to-lead research: response delay increases drop-off before
 * first contact and lowers downstream conversion. OpsBrain targets sub-60-second
 * response (see OPSBRAIN_RESPONSE_HOURS).
 */

/** OpsBrain first-response target: under 60 seconds */
export const OPSBRAIN_RESPONSE_HOURS = 1 / 60;

/** Natural drop-off even at instant response (wrong numbers, duplicates, etc.) */
const BASE_LEAK_RATE = 0.08;

/** Additional leakage at 24h average response delay */
const MAX_DELAY_LEAK = 0.62;

/** Share of recoverable pipeline when moving from current delay to OpsBrain speed */
export const RECOVERY_RATE = 0.72;

export type ROIInputs = {
  leads: number;
  dealValue: number;
  conversionRate: number;
  responseDelayHours: number;
};

export type ROIResults = {
  /** 0–1 share of leads lost before effective follow-up */
  leakRate: number;
  leakPct: number;
  missedFollowUps: number;
  followUpsCompleted: number;
  expectedDeals: number;
  dealsWithCurrentDelay: number;
  dealsWithOpsBrain: number;
  dealsRecovered: number;
  revenueAtRisk: number;
  revenueWithCurrentDelay: number;
  revenueWithOpsBrain: number;
  revenueRecoverable: number;
  opsBrainLeakRate: number;
  opsBrainLeakPct: number;
  currentConversionPct: number;
  opsBrainConversionPct: number;
};

export function getLeakRate(responseDelayHours: number): number {
  const delayFactor = Math.min(Math.max(responseDelayHours, 0) / 24, 1);
  return BASE_LEAK_RATE + delayFactor * MAX_DELAY_LEAK;
}

export function calculateROI(inputs: ROIInputs): ROIResults {
  const { leads, dealValue, conversionRate, responseDelayHours } = inputs;

  const leakRate = getLeakRate(responseDelayHours);
  const opsBrainLeakRate = getLeakRate(OPSBRAIN_RESPONSE_HOURS);

  const leakPct = Math.round(leakRate * 100);
  const opsBrainLeakPct = Math.round(opsBrainLeakRate * 100);

  const missedFollowUps = Math.round(leads * leakRate);
  const followUpsCompleted = leads - missedFollowUps;

  const conversion = conversionRate / 100;
  const expectedDeals = leads * conversion;

  const dealsWithCurrentDelay = expectedDeals * (1 - leakRate);
  const dealsWithOpsBrain = expectedDeals * (1 - opsBrainLeakRate);
  const dealsRecovered = Math.max(0, dealsWithOpsBrain - dealsWithCurrentDelay);

  const revenueWithCurrentDelay = Math.round(dealsWithCurrentDelay * dealValue);
  const revenueWithOpsBrain = Math.round(dealsWithOpsBrain * dealValue);
  const revenueAtRisk = Math.round(expectedDeals * leakRate * dealValue);
  const revenueRecoverable = Math.round(
    (revenueWithOpsBrain - revenueWithCurrentDelay) * RECOVERY_RATE,
  );

  const currentConversionPct = Math.round(conversion * (1 - leakRate) * 1000) / 10;
  const opsBrainConversionPct =
    Math.round(conversion * (1 - opsBrainLeakRate) * 1000) / 10;

  return {
    leakRate,
    leakPct,
    missedFollowUps,
    followUpsCompleted,
    expectedDeals,
    dealsWithCurrentDelay,
    dealsWithOpsBrain,
    dealsRecovered,
    revenueAtRisk,
    revenueWithCurrentDelay,
    revenueWithOpsBrain,
    revenueRecoverable,
    opsBrainLeakRate,
    opsBrainLeakPct,
    currentConversionPct,
    opsBrainConversionPct,
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
