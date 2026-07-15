"use client";

import { sendLandingChat, speakLandingReply, type ChatMessage } from "@/lib/landing-chat";
import { cn } from "@/lib/utils";
import type { SpeechRecognitionCtor, SpeechRecognitionInstance } from "@/types/speech-recognition";
import { MessageCircle, Mic, MicOff, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I'm Diya — your OpsBrain AI guide. Ask me about pricing, features, and getting started, or anything else on your mind.",
};

function getSpeechRecognition(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function SiteAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setVoiceEnabled(Boolean(getSpeechRecognition()));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const playReply = useCallback(async (text: string) => {
    const buffer = await speakLandingReply(text);
    if (!buffer) return;
    const blob = new Blob([buffer], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    if (audioRef.current) {
      audioRef.current.pause();
      URL.revokeObjectURL(audioRef.current.src);
    }
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onended = () => URL.revokeObjectURL(url);
    await audio.play().catch(() => undefined);
  }, []);

  const sendMessage = useCallback(
    async (text: string, options?: { speak?: boolean }) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: ChatMessage = { role: "user", content: trimmed };
      const history = messages.filter((m) => m !== WELCOME || messages.length > 1);
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);

      const result = await sendLandingChat(trimmed, history);
      setLoading(false);

      if (!result.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: result.error },
        ]);
        return;
      }

      const assistantMsg: ChatMessage = { role: "assistant", content: result.reply };
      setMessages((prev) => [...prev, assistantMsg]);
      if (options?.speak) {
        await playReply(result.reply);
      }
    },
    [loading, messages, playReply],
  );

  const startListening = useCallback(() => {
    const Ctor = getSpeechRecognition();
    if (!Ctor || loading) return;

    const recognition = new Ctor();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim();
      if (transcript) {
        void sendMessage(transcript, { speak: true });
      }
    };

    recognition.start();
  }, [loading, sendMessage]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            "fixed bottom-24 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full",
            "bg-brand-primary text-white shadow-lg transition-transform hover:scale-105",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
            "lg:bottom-6",
          )}
          aria-label="Open OpsBrain assistant"
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </button>
      ) : (
        <div
          className={cn(
            "fixed bottom-24 right-5 z-50 flex w-[min(100vw-2.5rem,24rem)] flex-col overflow-hidden rounded-2xl",
            "border border-border-default bg-surface-white shadow-2xl",
            "lg:bottom-6",
          )}
          role="dialog"
          aria-label="OpsBrain AI assistant"
        >
          <header className="flex items-center justify-between border-b border-border-default bg-brand-primary px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Diya · OpsBrain AI</p>
              <p className="text-xs text-white/80">Text & voice assistant</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Close assistant"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div
            ref={scrollRef}
            className="flex max-h-80 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((msg, idx) => (
              <div
                key={`${msg.role}-${idx}`}
                className={cn(
                  "max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "ml-auto bg-brand-primary/10 text-text-primary"
                    : "mr-auto bg-surface-muted text-text-secondary",
                )}
              >
                {msg.content}
              </div>
            ))}
            {loading ? (
              <p className="text-xs text-text-muted">Diya is thinking…</p>
            ) : null}
          </div>

          <form
            className="flex items-center gap-2 border-t border-border-default px-3 py-3"
            onSubmit={(e) => {
              e.preventDefault();
              void sendMessage(input);
            }}
          >
            {voiceEnabled ? (
              <button
                type="button"
                onClick={listening ? stopListening : startListening}
                disabled={loading}
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors",
                  listening
                    ? "border-red-300 bg-red-50 text-red-600"
                    : "border-border-default text-text-secondary hover:bg-surface-muted",
                )}
                aria-label={listening ? "Stop listening" : "Ask with voice"}
              >
                {listening ? (
                  <MicOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Mic className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            ) : null}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about pricing, features…"
              disabled={loading}
              className="min-w-0 flex-1 rounded-lg border border-border-default px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30"
              aria-label="Message to assistant"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary text-white disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
