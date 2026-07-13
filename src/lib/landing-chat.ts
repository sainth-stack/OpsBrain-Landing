import { LANDING } from "@/lib/api-config";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatResult =
  | { ok: true; reply: string }
  | { ok: false; error: string };

export async function sendLandingChat(
  message: string,
  history: ChatMessage[],
): Promise<ChatResult> {
  try {
    const res = await fetch(LANDING.chat, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });
    if (!res.ok) {
      return { ok: false, error: "Assistant is temporarily unavailable." };
    }
    const data = (await res.json()) as { reply?: string };
    if (!data.reply?.trim()) {
      return { ok: false, error: "No response from assistant." };
    }
    return { ok: true, reply: data.reply.trim() };
  } catch {
    return { ok: false, error: "Could not reach the assistant. Try again." };
  }
}

export async function speakLandingReply(text: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(LANDING.chatSpeak, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { audioBase64?: string };
    if (!data.audioBase64) return null;
    const binary = atob(data.audioBase64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  } catch {
    return null;
  }
}
