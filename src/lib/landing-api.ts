import {
  LANDING,
  LANDING_BRAND,
  USE_DUMMY_API,
  type ApiResult,
} from "./api-config";
import type { LeadFormValues } from "./schemas/lead";

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

  return postJson<ApiResult>(
    LANDING.leads,
    withLandingBrand({
      ...fields,
      submittedAt: new Date().toISOString(),
      source: "opsbrain-landing",
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
