/**
 * OpsBrain landing API configuration.
 * Override via NEXT_PUBLIC_* env vars in `.env.local`.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://app.opsbrainai.com/api/v1";

export const LANDING_API_BASE =
  process.env.NEXT_PUBLIC_LANDING_API_BASE ?? `${API_BASE_URL}/landing`;

/** Per-product app login URLs. */
export const PRODUCT_LOGIN = {
  opsbrain:
    process.env.NEXT_PUBLIC_OPSBRAIN_LOGIN_PAGE ?? "https://app.opsbrainai.com",
  spark:
    process.env.NEXT_PUBLIC_OPSSPARK_LOGIN_PAGE ?? "https://peers.opsbrainai.com",
  meet:
    process.env.NEXT_PUBLIC_OPSMEET_LOGIN_PAGE ??
    "https://opsmeet.opsbrainai.com/login",
} as const;

/** OpsBrain AI app login (navbar). */
export const LOGIN_PAGE =
  process.env.NEXT_PUBLIC_LOGIN_PAGE ?? PRODUCT_LOGIN.opsbrain;

/** Brand key sent with landing form submissions. */
export const LANDING_BRAND = "opsbrain";

export const LANDING = {
  leads: `${LANDING_API_BASE}/leads`,
  liveCallRequests: `${LANDING_API_BASE}/live-call-requests`,
  pageview: `${LANDING_API_BASE}/pageview`,
  chat: `${LANDING_API_BASE}/chat`,
  chatSpeak: `${LANDING_API_BASE}/chat/speak`,
  voiceSession: `${LANDING_API_BASE}/voice/session`,
  requestDemo: `${LANDING_API_BASE}/requestDemo`,
  emailSignup: `${LANDING_API_BASE}/emailsignup`,
  contactUs: `${LANDING_API_BASE}/contactus`,
} as const;

/** When true (default), form submissions are stubbed locally. */
export const USE_DUMMY_API =
  process.env.NEXT_PUBLIC_USE_DUMMY_API !== "false";

export type ApiResult = { success: boolean; message?: string };
