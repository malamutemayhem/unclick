// Runnable entry for the proof-as-reward eval (run via tsx).
//
//   npm run eval:report   -> regenerate docs/eval-baseline.json + docs/eval-report.md
//   npm run eval:check    -> score current fixtures, gate against frozen baseline,
//                            exit non-zero if it regresses (CI-style rail)
//
// Keeps all IO here so api/lib/eval/harness.ts stays pure and unit-tested.

import { readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { runEval, baselineFromRun, gateAgainstBaseline, renderReport, type EvalBaseline } from "./harness.js";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, "../../..");
const BASELINE_PATH = path.join(REPO_ROOT, "docs/eval-baseline.json");
const REPORT_PATH = path.join(REPO_ROOT, "docs/eval-report.md");

const BASELINE_NOTE =
  "Frozen baseline for the proof-as-reward eval. Regenerate intentionally with " +
  "`npm run eval:report` only when fixtures are deliberately changed. A policy " +
  "change must beat or match this via `npm run eval:check`.";

async function generate(): Promise<void> {
  const run = runEval();
  const baseline = baselineFromRun(run, BASELINE_NOTE);
  await writeFile(BASELINE_PATH, JSON.stringify(baseline, null, 2) + "\n", "utf8");
  await writeFile(REPORT_PATH, renderReport(run, baseline), "utf8");
  console.log(`Wrote ${path.relative(REPO_ROOT, BASELINE_PATH)} and ${path.relative(REPO_ROOT, REPORT_PATH)}`);
  console.log(
    `truthRate=${baseline.truthRate} hallucinatedCompletionRate=${baseline.hallucinatedCompletionRate} netReward=${baseline.netReward}`,
  );
}

async function check(): Promise<void> {
  let baseline: EvalBaseline;
  try {
    baseline = JSON.parse(await readFile(BASELINE_PATH, "utf8")) as EvalBaseline;
  } catch {
    console.error(`No baseline at ${BASELINE_PATH}. Run \`npm run eval:report\` first.`);
    process.exitCode = 1;
    return;
  }
  const run = runEval();
  const gate = gateAgainstBaseline(run, baseline);
  for (const reason of gate.reasons) console.log(`- ${reason}`);
  if (!gate.ok) {
    console.error(`eval:check FAILED (${gate.status}).`);
    process.exitCode = 1;
    return;
  }
  console.log("eval:check passed: current run meets or beats the frozen baseline.");
}

const mode = process.argv.includes("--check") ? "check" : "generate";
await (mode === "check" ? check() : generate());
