#!/usr/bin/env node
/**
 * Free voice demo generator — Microsoft Edge neural TTS (no API key).
 * Usage: npm run generate:voice-demos:free
 */

import { execFileSync, spawnSync } from "child_process";
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "fs";
import { dirname, join } from "path";
import { setTimeout as delay } from "timers/promises";
import { fileURLToPath } from "url";
import {
  DEMOS,
  EDGE_PROSODY,
  EDGE_VOICES,
} from "./voice-demo-dialogues.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "audio");

const onlyArg = process.argv.find((arg) => arg.startsWith("--only="));
const onlyFiles = onlyArg
  ? new Set(onlyArg.replace("--only=", "").split(",").map((s) => s.trim()))
  : null;

const demosToRun = onlyFiles
  ? DEMOS.filter((demo) => onlyFiles.has(demo.file))
  : DEMOS;

if (demosToRun.length === 0) {
  console.error("No demos matched --only filter.");
  process.exit(1);
}

function assertDependencies() {
  if (spawnSync("ffmpeg", ["-version"], { stdio: "ignore" }).status !== 0) {
    console.error("ffmpeg is required. Install with: brew install ffmpeg");
    process.exit(1);
  }
  if (
    spawnSync("python3", ["-m", "edge_tts", "--version"], { stdio: "ignore" })
      .status !== 0
  ) {
    console.error("Install Python edge-tts: pip3 install -r scripts/requirements-voice.txt");
    process.exit(1);
  }
}

function cleanText(text) {
  return text.replace(/\[[^\]]+\]\s*/g, "").trim();
}

function pauseAfterSpeaker(speaker) {
  return speaker === "agent" ? 0.22 : 0.18;
}

function synthLine(voice, text, outPath, prosody) {
  const textPath = `${outPath}.txt`;
  writeFileSync(textPath, cleanText(text), "utf8");

  const args = [
    "-m",
    "edge_tts",
    "-f",
    textPath,
    "-v",
    voice,
    `--rate=${prosody.rate}`,
    `--pitch=${prosody.pitch}`,
    "--write-media",
    outPath,
  ];

  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      execFileSync("python3", args, { stdio: "ignore" });
      rmSync(textPath, { force: true });
      return;
    } catch (error) {
      lastError = error;
      if (attempt < 3) {
        execFileSync("sleep", ["1"]);
      }
    }
  }

  rmSync(textPath, { force: true });
  throw lastError;
}

function createSilence(outPath, seconds) {
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-f",
      "lavfi",
      "-i",
      "anullsrc=r=24000:cl=mono",
      "-t",
      String(seconds),
      "-c:a",
      "libmp3lame",
      "-q:a",
      "6",
      outPath,
    ],
    { stdio: "ignore" },
  );
}

function concatMp3(parts, outPath) {
  const listPath = join(dirname(parts[0]), "concat.txt");
  writeFileSync(
    listPath,
    parts.map((part) => `file '${part.replace(/'/g, "'\\''")}'`).join("\n"),
  );
  execFileSync(
    "ffmpeg",
    ["-y", "-f", "concat", "-safe", "0", "-i", listPath, "-c", "copy", outPath],
    { stdio: "ignore" },
  );
}

function postProcess(inPath, outPath) {
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      inPath,
      "-af",
      "loudnorm=I=-16:TP=-1.5:LRA=11,highpass=f=80",
      "-ar",
      "44100",
      "-c:a",
      "libmp3lame",
      "-q:a",
      "2",
      outPath,
    ],
    { stdio: "ignore" },
  );
}

async function generateDemo(demo) {
  const voices = EDGE_VOICES[demo.lang];
  if (!voices) throw new Error(`No Edge voices for lang: ${demo.lang}`);

  const tmpDir = mkdtempSync(join(outDir, ".tmp-edge-"));
  const parts = [];

  for (let i = 0; i < demo.dialogue.length; i++) {
    const turn = demo.dialogue[i];
    const voice =
      turn.speaker === "agent" ? voices.agent : voices.customer;
    const prosody = EDGE_PROSODY[turn.speaker];
    const partPath = join(tmpDir, `line-${String(i).padStart(2, "0")}.mp3`);

    await delay(600);
    synthLine(voice, turn.text, partPath, prosody);
    parts.push(partPath);

    if (i < demo.dialogue.length - 1) {
      const pausePath = join(tmpDir, `pause-${i}.mp3`);
      createSilence(pausePath, pauseAfterSpeaker(turn.speaker));
      parts.push(pausePath);
    }
  }

  const rawPath = join(tmpDir, "raw.mp3");
  const normPath = join(tmpDir, "norm.mp3");
  concatMp3(parts, rawPath);
  postProcess(rawPath, normPath);

  copyFileSync(normPath, join(outDir, demo.file));
  const sizeKb = (readFileSync(join(outDir, demo.file)).length / 1024).toFixed(1);
  rmSync(tmpDir, { recursive: true, force: true });
  console.log(`✓ ${demo.file} (${sizeKb} KB)`);
}

assertDependencies();
mkdirSync(outDir, { recursive: true });

console.log("Generating with Edge conversational voices (Ava + Andrew for EN)...\n");

for (const demo of demosToRun) {
  try {
    await generateDemo(demo);
  } catch (error) {
    console.error(`✗ ${demo.file}:`, error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

console.log("\nDone → public/audio/");
console.log("Bump ?v= in site.ts voiceDemos if browsers cache old files.");
