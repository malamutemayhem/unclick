#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { evaluateContinuousImprovementRoom } from "./pinballwake-continuous-improvement-room.mjs";

function getArg(name, fallback = "") {
  const prefix = `--${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

function safeList(value) {
  return Array.isArray(value) ? value : [];
}

function normalize(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim().toLowerCase();
}

function compactText(value, max = 700) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
}

function parseJson(value, fallback) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function checkCounts(rollup = []) {
  let failure = 0;
  let pending = 0;
  let success = 0;

  for (const check of safeList(rollup)) {
    const typename = check.__typename || "";
    const state = normalize(check.state);
    const status = normalize(check.status);
    const conclusion = normalize(check.conclusion);

    if (typename === "StatusContext") {
      if (state === "success") success += 1;
      else if (state === "pending") pending += 1;
      else if (state === "failure" || state === "error") failure += 1;
      continue;
    }

    if (status && status !== "completed") {
      pending += 1;
      continue;
    }
    if (conclusion === "success" || conclusion === "skipped" || conclusion === "neutral") success += 1;
    else if (conclusion === "failure" || conclusion === "cancelled" || conclusion === "timed_out" || conclusion === "action_required") failure += 1;
  }

  return { failure, pending, success };
}

function ageHours(value, now) {
  const then = Date.parse(String(value ?? ""));
  const current = Date.parse(String(now ?? ""));
  if (!Number.isFinite(then) || !Number.isFinite(current)) return 0;
  return Math.max(0, (current - then) / 3_600_000);
}

function signalFromPr(pr = {}, now = new Date().toISOString()) {
  const number = pr.number ?? pr.pr_number ?? pr.prNumber ?? "unknown";
  const title = compactText(pr.title || `PR ${number}`, 180);
  const mergeState = normalize(pr.mergeStateStatus || pr.merge_state_status);
  const checks = checkCounts(pr.statusCheckRollup || pr.checks);
  const hours = ageHours(pr.updatedAt || pr.updated_at, now);
  const url = pr.url || pr.html_url || "";
  const base = {
    source: "github_pr_watch",
    title: `PR #${number}: ${title}`,
    pr_number: number,
    url,
  };

  if (checks.failure > 0) {
    return {
      ...base,
      type: "proof_failure",
      room: "continuous_improvement_watch",
      severity: "high",
      count: Math.max(2, checks.failure + 1),
      detail: `CI/TestPass/Vercel proof has ${checks.failure} failing check(s), ${checks.pending} pending check(s), merge state ${mergeState || "unknown"}.`,
    };
  }

  if (mergeState === "dirty" || mergeState === "blocked") {
    return {
      ...base,
      type: "merge_resistance",
      room: "continuous_improvement_watch",
      severity: "high",
      count: Math.max(2, Math.ceil(hours / 12)),
      detail: `Merge flow is ${mergeState}; repeated branch refresh or conflict handling is needed.`,
    };
  }

  if (pr.isDraft && hours >= 24) {
    return {
      ...base,
      type: "stale_draft",
      room: "continuous_improvement_watch",
      severity: hours >= 72 ? "high" : "medium",
      count: Math.max(2, Math.ceil(hours / 24)),
      detail: `Draft has been waiting about ${Math.round(hours)} hour(s); check owner, proof, and next safe chip.`,
    };
  }

  if (checks.pending >= 3 && hours >= 6) {
    return {
      ...base,
      type: "proof_wait",
      room: "continuous_improvement_watch",
      severity: "medium",
      count: Math.max(2, checks.pending),
      detail: `Proof is still pending after about ${Math.round(hours)} hour(s); check stuck Vercel/TestPass/GitHub checks.`,
    };
  }

  return null;
}

export function buildContinuousImprovementSignals({ signals = [], githubPrs = [], now = new Date().toISOString() } = {}) {
  return [
    ...safeList(signals),
    ...safeList(githubPrs).map((pr) => signalFromPr(pr, now)).filter(Boolean),
  ];
}

export function buildContinuousImprovementWatchReceipt({
  input = {},
  now = new Date().toISOString(),
  source = "continuous_improvement_watch",
  worker = "forge",
} = {}) {
  const signals = buildContinuousImprovementSignals({
    signals: input.signals,
    githubPrs: input.github_prs || input.githubPrs || input.prs,
    now,
  });
  const room = evaluateContinuousImprovementRoom({ signals, now, source, worker });
  const status =
    room.result === "front_of_line_build" ? "action_needed" :
    room.result === "hold" ? "held" :
    "idle";
  const summary =
    status === "action_needed"
      ? `Continuous Improvement promoted ${room.improvement_kind} to front-of-line work.`
      : status === "held"
        ? `Continuous Improvement held ${room.improvement_kind} because it is already covered.`
        : "Continuous Improvement found no background friction above the build threshold.";

  return {
    kind: "continuous_improvement_watch_receipt",
    generated_at: now,
    source,
    status,
    summary,
    signal_count: signals.length,
    highest_score: room.highest_score ?? room.score ?? 0,
    action: room.action,
    result: room.result,
    reason: room.reason,
    improvement_kind: room.improvement_kind || null,
    xpass_gate_result: {
      check: "continuous_improvement",
      name: "Continuous Improvement",
      status,
      summary,
      advisory: room.receipt?.xpass_advisory || [],
    },
    receipt: room.receipt || null,
    packet: room.packet || null,
    job: room.job ? {
      job_id: room.job.job_id,
      chip: room.job.chip,
      worker: room.job.worker,
      owned_files: room.job.owned_files,
      expected_proof: room.job.expected_proof,
    } : null,
    signals: signals.map((signal) => ({
      type: compactText(signal.type, 80),
      title: compactText(signal.title, 180),
      severity: compactText(signal.severity, 40),
      source: compactText(signal.source, 120),
      url: compactText(signal.url, 500),
    })),
  };
}

async function readJson(pathname, fallback) {
  if (!pathname) return fallback;
  return JSON.parse(await readFile(pathname, "utf8"));
}

async function main() {
  const inputPath = getArg("input", process.env.CONTINUOUS_IMPROVEMENT_INPUT || "");
  const githubPrsPath = getArg("github-prs", process.env.CONTINUOUS_IMPROVEMENT_GITHUB_PRS || "");
  const outputPath = getArg("output", process.env.CONTINUOUS_IMPROVEMENT_OUTPUT || "public/dogfood/continuous-improvement-watch.json");
  const now = getArg("now", process.env.CONTINUOUS_IMPROVEMENT_NOW || new Date().toISOString());
  const source = getArg("source", process.env.CONTINUOUS_IMPROVEMENT_SOURCE || "continuous_improvement_watch");
  const failOnAction = getArg("fail-on-action", process.env.CONTINUOUS_IMPROVEMENT_FAIL_ON_ACTION || "false") === "true";

  const input = await readJson(inputPath, parseJson(process.env.CONTINUOUS_IMPROVEMENT_INPUT_JSON, {}));
  if (githubPrsPath) input.github_prs = await readJson(githubPrsPath, []);

  const receipt = buildContinuousImprovementWatchReceipt({ input, now, source });
  if (outputPath) {
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(receipt, null, 2)}\n`);
  }
  console.log(JSON.stringify(receipt, null, 2));

  if (failOnAction && receipt.status === "action_needed") {
    process.exitCode = 2;
  }
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"))) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
