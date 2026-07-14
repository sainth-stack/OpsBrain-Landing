"use client";

import { VoiceAssistantPanel } from "@/components/assistant/VoiceAssistantPanel";
import { prefetchLandingVoiceSession } from "@/lib/landing-voice";
import { useLandingVoiceAssistant } from "@/hooks/useLandingVoiceAssistant";
import type { VoiceCallState, VoiceTurn } from "@/lib/landing-voice";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const DISMISSED_KEY = "opsbrain_voice_dismissed";

export type PanelView = "pill" | "panel";

export type OpenDiyaOptions = {
  /** Request mic and start voice in the same user click (hero CTA). */
  autoStart?: boolean;
  /** Dim page behind the panel. */
  withBackdrop?: boolean;
};

type DiyaAssistantContextValue = {
  view: PanelView;
  showBackdrop: boolean;
  callState: VoiceCallState;
  turns: VoiceTurn[];
  agentText: string;
  userTranscript: string;
  error: string | null;
  callDuration: number;
  isInCall: boolean;
  openDiya: (options?: OpenDiyaOptions) => void;
  minimizeDiya: () => void;
  dismissDiya: () => void;
  startCall: () => Promise<void>;
  endCall: () => void;
};

const DiyaAssistantContext = createContext<DiyaAssistantContextValue | null>(null);

export function useDiyaAssistant(): DiyaAssistantContextValue {
  const ctx = useContext(DiyaAssistantContext);
  if (!ctx) {
    throw new Error("useDiyaAssistant must be used within DiyaAssistantProvider");
  }
  return ctx;
}

export function DiyaAssistantProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<PanelView>("pill");
  const [showBackdrop, setShowBackdrop] = useState(false);

  const voice = useLandingVoiceAssistant();

  useEffect(() => {
    if (view === "panel") {
      prefetchLandingVoiceSession();
    }
  }, [view]);

  useEffect(() => {
    setMounted(true);
    prefetchLandingVoiceSession();
    const dismissed = sessionStorage.getItem(DISMISSED_KEY);
    if (dismissed) return;
    const timer = window.setTimeout(() => {
      setView("panel");
      setShowBackdrop(false);
    }, 600);
    return () => window.clearTimeout(timer);
  }, []);

  const openDiya = useCallback(
    (options?: OpenDiyaOptions) => {
      sessionStorage.removeItem(DISMISSED_KEY);
      prefetchLandingVoiceSession();
      setView("panel");
      setShowBackdrop(options?.withBackdrop ?? Boolean(options?.autoStart));
      if (options?.autoStart) {
        void voice.startCall();
      }
    },
    [voice],
  );

  const minimizeDiya = useCallback(() => {
    setView("pill");
    setShowBackdrop(false);
  }, []);

  const dismissDiya = useCallback(() => {
    sessionStorage.setItem(DISMISSED_KEY, "1");
    setView("pill");
    setShowBackdrop(false);
    if (voice.isInCall) voice.endCall();
  }, [voice]);

  const value = useMemo<DiyaAssistantContextValue>(
    () => ({
      view,
      showBackdrop,
      callState: voice.callState,
      turns: voice.turns,
      agentText: voice.agentText,
      userTranscript: voice.userTranscript,
      error: voice.error,
      callDuration: voice.callDuration,
      isInCall: voice.isInCall,
      openDiya,
      minimizeDiya,
      dismissDiya,
      startCall: voice.startCall,
      endCall: voice.endCall,
    }),
    [view, showBackdrop, voice, openDiya, minimizeDiya, dismissDiya],
  );

  return (
    <DiyaAssistantContext.Provider value={value}>
      {children}
      {mounted ? <VoiceAssistantPanel /> : null}
    </DiyaAssistantContext.Provider>
  );
}
