import { API_BASE_URL, LANDING } from "@/lib/api-config";

export type VoiceCallState =
  | "idle"
  | "connecting"
  | "opening"
  | "active"
  | "agent_speaking"
  | "ending"
  | "ended";

export type VoiceTurn = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

export type VoiceSessionResult =
  | { ok: true; sessionToken: string; expiresIn: number }
  | { ok: false; error: string };

export async function createLandingVoiceSession(
  agentId?: string,
): Promise<VoiceSessionResult> {
  try {
    const res = await fetch(`${LANDING.voiceSession}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agent: agentId ?? "" }),
    });
    if (!res.ok) {
      return { ok: false, error: "Voice assistant is temporarily unavailable." };
    }
    const data = (await res.json()) as { sessionToken?: string; expiresIn?: number };
    if (!data.sessionToken) {
      return { ok: false, error: "Could not start voice session." };
    }
    return {
      ok: true,
      sessionToken: data.sessionToken,
      expiresIn: data.expiresIn ?? 300,
    };
  } catch {
    return { ok: false, error: "Could not reach the voice assistant." };
  }
}

const PREFETCH_MAX_AGE_MS = 4 * 60 * 1000;
let prefetchedSession: {
  sessionToken: string;
  fetchedAt: number;
  agentId: string;
} | null = null;
let prefetchInFlight: Promise<void> | null = null;
let prefetchAgentId = "";

/** Warm session token while the panel is visible (saves ~200–400ms on start). */
export function prefetchLandingVoiceSession(agentId?: string): void {
  const key = agentId ?? "";
  if (
    prefetchedSession?.agentId === key &&
    Date.now() - prefetchedSession.fetchedAt < PREFETCH_MAX_AGE_MS
  ) {
    return;
  }
  if (prefetchInFlight && prefetchAgentId === key) return;
  prefetchAgentId = key;
  prefetchInFlight = createLandingVoiceSession(agentId)
    .then((result) => {
      if (result.ok) {
        prefetchedSession = {
          sessionToken: result.sessionToken,
          fetchedAt: Date.now(),
          agentId: key,
        };
      }
    })
    .finally(() => {
      prefetchInFlight = null;
    });
}

export async function consumeLandingVoiceSession(
  agentId?: string,
): Promise<VoiceSessionResult> {
  const key = agentId ?? "";
  const cached = prefetchedSession;
  prefetchedSession = null;
  if (
    cached &&
    cached.agentId === key &&
    Date.now() - cached.fetchedAt < PREFETCH_MAX_AGE_MS
  ) {
    return { ok: true, sessionToken: cached.sessionToken, expiresIn: 300 };
  }
  return createLandingVoiceSession(agentId);
}

export function buildLandingVoiceWsUrl(
  sessionToken: string,
  agentId?: string,
): string {
  const api = new URL(API_BASE_URL);
  const proto = api.protocol === "https:" ? "wss:" : "ws:";
  const params = new URLSearchParams({ token: sessionToken });
  if (agentId) params.set("agent", agentId);
  return `${proto}//${api.host}/ws/v1/landing/voice?${params.toString()}`;
}
