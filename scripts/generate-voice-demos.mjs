#!/usr/bin/env node
/**
 * Generates voice demo MP3s via ElevenLabs Text-to-Dialogue API.
 * Usage: node scripts/generate-voice-demos.mjs
 * Requires ELEVENLABS_API_KEY in opsbrain-landing/.env
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { DEMOS, VOICES } from "./voice-demo-dialogues.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "audio");

const envContent = readFileSync(join(root, ".env"), "utf8");
const apiKey = envContent
  .split("\n")
  .find((l) => l.startsWith("ELEVENLABS_API_KEY="))
  ?.split("=")
  .slice(1)
  .join("=")
  ?.trim();

if (!apiKey) {
  console.error("Missing ELEVENLABS_API_KEY in .env");
  process.exit(1);
}

const MODEL = "eleven_v3";

mkdirSync(outDir, { recursive: true });

function buildInputs(dialogue, lang) {
  const voices = VOICES[lang];
  return dialogue.map(({ speaker, text }) => ({
    text,
    voice_id: speaker === "agent" ? voices.agent : voices.customer,
  }));
}

async function generateDialogue({ file, lang, dialogue }) {
  const url = `https://api.elevenlabs.io/v1/text-to-dialogue?output_format=mp3_44100_128`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      inputs: buildInputs(dialogue, lang),
      model_id: MODEL,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    if (res.status === 401 && err.includes("quota_exceeded")) {
      console.error(
        `\n⚠ ElevenLabs quota exceeded. Dialogue demos need ~400+ credits each.\n` +
          `Top up at https://elevenlabs.io/subscription then re-run this script.\n`,
      );
    }
    if (res.status === 402 && err.includes("paid_plan_required")) {
      console.error(
        `\n⚠ Voice requires a paid ElevenLabs plan via API (community library voices).\n` +
          `Use premade voice IDs in scripts/voice-demo-dialogues.mjs, or upgrade your plan.\n`,
      );
    }
    throw new Error(`${file}: ${res.status} ${err}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  const outPath = join(outDir, file);
  writeFileSync(outPath, buffer);
  console.log(`✓ ${file} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

console.log(
  `Generating ${DEMOS.length} dialogue demos with ${MODEL} (multi-speaker)...\n`,
);

for (const demo of DEMOS) {
  await generateDialogue(demo);
}

console.log("\nDone. Files saved to public/audio/");
