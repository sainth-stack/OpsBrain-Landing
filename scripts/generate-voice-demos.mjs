#!/usr/bin/env node
/**
 * Landing demos are Cartesia Sonic. This wrapper runs the Python generator.
 */
import { spawnSync } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const backend = join(dirname(fileURLToPath(import.meta.url)), "../../OpsBrain-Backend");
const script = join(backend, "scripts/generate_landing_voice_demos.py");
const onlyArg = process.argv.find((arg) => arg.startsWith("--only="));
const args = [script];
if (onlyArg) args.push("--only", onlyArg.replace("--only=", ""));

const result = spawnSync("python3", args, { stdio: "inherit", cwd: backend });
process.exit(result.status ?? 1);
