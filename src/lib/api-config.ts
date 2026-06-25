/**
 * OpsBrain landing API configuration.
 * Override via NEXT_PUBLIC_* env vars in `.env.local`.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.opsbrainai.com";

export const LANDING_API_BASE =
  process.env.NEXT_PUBLIC_LANDING_API_BASE ?? `${API_BASE_URL}/landing`;

export const LOGIN_PAGE =
  process.env.NEXT_PUBLIC_LOGIN_PAGE ?? "https://app.opsbrainai.com";

/** Brand key sent with landing form submissions. */
export const LANDING_BRAND = "opsbrain";

export const LANDING = {
  leads: `${LANDING_API_BASE}/leads`,
  requestDemo: `${LANDING_API_BASE}/requestDemo`,
  emailSignup: `${LANDING_API_BASE}/emailsignup`,
  contactUs: `${LANDING_API_BASE}/contactus`,
} as const;

/** When true (default), form submissions are stubbed locally. */
export const USE_DUMMY_API =
  process.env.NEXT_PUBLIC_USE_DUMMY_API !== "false";

export type ApiResult = { success: boolean; message?: string };
