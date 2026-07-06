export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landing_page?: string;
}

const ATTRIBUTION_KEY = "opsbrain_attribution";
const SESSION_ID_KEY = "opsbrain_session_id";

function parseUTMs(): Partial<Attribution> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const result: Partial<Attribution> = {};
  const keys: (keyof Attribution)[] = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ];
  for (const k of keys) {
    const v = params.get(k);
    if (v) result[k] = v;
  }
  return result;
}

/**
 * Captures UTM params + referrer on first call per session and stores in sessionStorage.
 * Safe to call multiple times — only writes once per session.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  if (sessionStorage.getItem(ATTRIBUTION_KEY)) return;
  const attr: Attribution = {
    ...parseUTMs(),
    referrer: document.referrer || undefined,
    landing_page: window.location.pathname,
  };
  sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attr));
}

/** Returns stored attribution for the current session. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const stored = sessionStorage.getItem(ATTRIBUTION_KEY);
  if (!stored) {
    captureAttribution();
    const fresh = sessionStorage.getItem(ATTRIBUTION_KEY);
    return fresh ? (JSON.parse(fresh) as Attribution) : {};
  }
  return JSON.parse(stored) as Attribution;
}

/** Returns or creates a stable session ID stored in sessionStorage. */
export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  const existing = sessionStorage.getItem(SESSION_ID_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID();
  sessionStorage.setItem(SESSION_ID_KEY, id);
  return id;
}
