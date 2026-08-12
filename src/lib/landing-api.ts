import {
  LANDING,
  LANDING_BRAND,
  USE_DUMMY_API,
  type ApiResult,
} from "./api-config";
import type { LeadFormValues } from "./schemas/lead";
import { getAttribution, getSessionId } from "./attribution";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => null)) as T | null;
  if (!res.ok) {
    const msg =
      data && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : data && typeof data === "object" && "detail" in data
          ? String((data as { detail: unknown }).detail)
          : "Request failed";
    throw new Error(msg);
  }
  return data as T;
}

function withLandingBrand<T extends Record<string, unknown>>(
  body: T,
): T & { brand: string } {
  return { ...body, brand: LANDING_BRAND };
}

export async function submitLead(
  fields: LeadFormValues,
): Promise<ApiResult> {
  if (USE_DUMMY_API) {
    await delay(700);
    if (process.env.NODE_ENV !== "production") {
      console.log("[landing-api dummy] lead:", fields);
    }
    return { success: true, message: "Request received" };
  }

  const attribution = getAttribution();

  return postJson<ApiResult>(
    LANDING.leads,
    withLandingBrand({
      ...fields,
      submittedAt: new Date().toISOString(),
      source: "opsbrain-landing",
      utmSource: attribution.utm_source,
      utmMedium: attribution.utm_medium,
      utmCampaign: attribution.utm_campaign,
      utmContent: attribution.utm_content,
      utmTerm: attribution.utm_term,
      referrer: attribution.referrer,
      landingPage: attribution.landing_page,
    }),
  );
}

export async function trackPageView(page: string): Promise<void> {
  if (USE_DUMMY_API) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[landing-api dummy] pageview:", page);
    }
    return;
  }

  const attribution = getAttribution();
  const sessionId = getSessionId();

  try {
    await fetch(LANDING.pageview, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        page,
        referrer: typeof document !== "undefined" ? document.referrer : undefined,
        utmSource: attribution.utm_source,
        utmMedium: attribution.utm_medium,
        utmCampaign: attribution.utm_campaign,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        brand: LANDING_BRAND,
      }),
    });
  } catch {
    // Silently fail - pageview tracking is non-critical
  }
}

export async function submitLiveCallRequest(fields: {
  phone: string;
  fullName: string;
  language: string;
  agentId: string;
  agentName: string;
  agentRole?: string;
  consent: boolean;
}): Promise<ApiResult> {
  if (USE_DUMMY_API) {
    await delay(700);
    if (process.env.NODE_ENV !== "production") {
      console.log("[landing-api dummy] live call:", fields);
    }
    return { success: true, message: "Request received" };
  }

  const attribution = getAttribution();

  return postJson<ApiResult>(
    LANDING.liveCallRequests,
    withLandingBrand({
      phone: fields.phone,
      fullName: fields.fullName,
      language: fields.language,
      agentId: fields.agentId,
      agentName: fields.agentName,
      agentRole: fields.agentRole,
      consent: fields.consent,
      submittedAt: new Date().toISOString(),
      source: "try-live-call",
      utmSource: attribution.utm_source,
      utmMedium: attribution.utm_medium,
      utmCampaign: attribution.utm_campaign,
      utmContent: attribution.utm_content,
      utmTerm: attribution.utm_term,
      referrer: attribution.referrer,
      landingPage: attribution.landing_page || "/try-a-live-call",
    }),
  );
}

export async function submitEmailSignup(email: string): Promise<ApiResult> {
  if (USE_DUMMY_API) {
    await delay(500);
    if (process.env.NODE_ENV !== "production") {
      console.log("[landing-api dummy] email signup:", email);
    }
    return { success: true };
  }

  return postJson<ApiResult>(
    LANDING.emailSignup,
    withLandingBrand({ email: email.trim() }),
  );
}
