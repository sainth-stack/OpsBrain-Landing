#!/usr/bin/env node
/**
 * Generates voice demo MP3s via ElevenLabs Text-to-Dialogue API.
 *
 * Usage:
 *   npm run generate:voice-demos
 *   node scripts/generate-voice-demos.mjs --only sales-en,sales-hi
 *
 * Requires ELEVENLABS_API_KEY in opsbrain-landing/.env
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { DEMOS, VOICES, VOICE_FALLBACKS } from "./voice-demo-dialogues.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "audio");

const onlyArg = process.argv.find((arg) => arg.startsWith("--only="));
const onlyFiles = onlyArg
  ? new Set(onlyArg.replace("--only=", "").split(",").map((s) => s.trim()))
  : null;

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
const demosToRun = onlyFiles
  ? DEMOS.filter((demo) => onlyFiles.has(demo.file))
  : DEMOS;

if (demosToRun.length === 0) {
  console.error("No demos matched --only filter.");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

function buildInputs(dialogue, lang, voiceMap) {
  return dialogue.map(({ speaker, text }) => ({
    text,
    voice_id: speaker === "agent" ? voiceMap.agent : voiceMap.customer,
  }));
}

async function requestDialogue(file, lang, dialogue, voiceMap) {
  const url =
    "https://api.elevenlabs.io/v1/text-to-dialogue?output_format=mp3_44100_128";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      inputs: buildInputs(dialogue, lang, voiceMap),
      model_id: MODEL,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return { ok: false, status: res.status, err };
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  return { ok: true, buffer };
}

async function generateDialogue(demo) {
  const { file, lang, dialogue } = demo;
  let voiceMap = VOICES[lang];
  let result = await requestDialogue(file, lang, dialogue, voiceMap);

  if (
    !result.ok &&
    (result.status === 402 || result.err.includes("paid_plan_required")) &&
    VOICE_FALLBACKS[lang]
  ) {
    console.warn(`↻ ${file}: library voices unavailable — using premade fallbacks`);
    voiceMap = VOICE_FALLBACKS[lang];
    result = await requestDialogue(file, lang, dialogue, voiceMap);
  }

  if (!result.ok) {
    if (result.status === 401 && result.err.includes("quota_exceeded")) {
      console.error(
        `\n⚠ ElevenLabs quota exceeded. Dialogue demos need ~400+ credits each.\n` +
          `Top up at https://elevenlabs.io/subscription then re-run this script.\n`,
      );
    }
    throw new Error(`${file}: ${result.status} ${result.err}`);
  }

  const outPath = join(outDir, file);
  writeFileSync(outPath, result.buffer);
  console.log(`✓ ${file} (${(result.buffer.length / 1024).toFixed(1)} KB)`);
}

console.log(
  `Generating ${demosToRun.length} dialogue demo(s) with ${MODEL}...\n`,
);

const failures = [];

for (const demo of demosToRun) {
  try {
    await generateDialogue(demo);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    failures.push({ file: demo.file, message });
    console.error(`✗ ${demo.file}: ${message.split("\n")[0]}`);
  }
}

if (failures.length === 0) {
  console.log("\nDone. Files saved to public/audio/");
} else {
  console.log(
    `\nFinished with ${failures.length} failure(s). Re-run after topping up ElevenLabs credits:`,
  );
  console.log("  npm run generate:voice-demos");
  process.exit(1);
}
