type AnalyticsEvent =
  | { name: "lead_submit"; properties: { form: string } }
  | { name: "demo_click"; properties: { cta_name: string } }
  | { name: "voice_demo_play"; properties: { language: string } }
  | { name: "roi_calculate"; properties: Record<string, number | string> };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
    };
  }
}

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const analyticsEnabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";

function shouldTrack() {
  if (typeof window === "undefined") return false;
  if (process.env.NODE_ENV !== "production") return false;
  return analyticsEnabled && Boolean(gaId || posthogKey);
}

function dispatch(event: AnalyticsEvent) {
  if (!shouldTrack()) {
    if (process.env.NODE_ENV === "development") {
      console.log("[analytics]", event.name, event.properties);
    }
    return;
  }

  if (gaId && window.gtag) {
    window.gtag("event", event.name, event.properties);
  }

  if (posthogKey && window.posthog) {
    window.posthog.capture(event.name, event.properties);
  }
}

export function trackLeadSubmit(form = "lead") {
  dispatch({ name: "lead_submit", properties: { form } });
}

export function trackDemoClick(ctaName: string) {
  dispatch({ name: "demo_click", properties: { cta_name: ctaName } });
}

export function trackVoiceDemoPlay(language: string) {
  dispatch({ name: "voice_demo_play", properties: { language } });
}

export function trackRoiCalculate(values: Record<string, number | string>) {
  dispatch({ name: "roi_calculate", properties: values });
}

/** @deprecated Use trackLeadSubmit */
export function trackFormSubmit(form = "lead") {
  trackLeadSubmit(form);
}

/** @deprecated Use trackDemoClick */
export function trackCTA(name: string) {
  trackDemoClick(name);
}

/** @deprecated Use trackVoiceDemoPlay */
export function trackAudioPlay(language: string) {
  trackVoiceDemoPlay(language);
}

/** @deprecated Use trackRoiCalculate */
export function trackCalculatorUse(values: Record<string, number | string>) {
  trackRoiCalculate(values);
}
