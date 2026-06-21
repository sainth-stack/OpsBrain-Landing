type AnalyticsEvent =
  | { name: "cta_click"; properties: { cta_name: string } }
  | { name: "form_submit"; properties: { form: string } }
  | { name: "audio_play"; properties: { language: string } }
  | { name: "calculator_use"; properties: Record<string, number | string> };

const isProd = process.env.NODE_ENV === "production";
const analyticsEnabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";

function track(event: AnalyticsEvent) {
  if (!isProd || !analyticsEnabled) {
    if (process.env.NODE_ENV === "development") {
      console.log("[analytics]", event.name, event.properties);
    }
    return;
  }

  // Stub: wire PostHog, GA4, or Segment here
  // posthog.capture(event.name, event.properties);
  console.log("[analytics]", event.name, event.properties);
}

export function trackCTA(name: string) {
  track({ name: "cta_click", properties: { cta_name: name } });
}

export function trackFormSubmit(form = "lead") {
  track({ name: "form_submit", properties: { form } });
}

export function trackAudioPlay(language: string) {
  track({ name: "audio_play", properties: { language } });
}

export function trackCalculatorUse(values: Record<string, number | string>) {
  track({ name: "calculator_use", properties: values });
}
