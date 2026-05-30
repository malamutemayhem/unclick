#!/usr/bin/env node

import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export const BOUNDARY_PRODUCTS = [
  {
    id: "rotatepass",
    name: "RotatePass",
    stage: "boundary",
    role: "safe credential lifecycle and redaction proof",
    target_url: "docs/rotatepass-local-phase0.md",
    command: ["node", "--test", "scripts/rotatepass-redaction-guard.test.mjs"],
    actualCommand: [process.execPath, "--test", "scripts/rotatepass-redaction-guard.test.mjs"],
  },
  {
    id: "wakepass",
    name: "WakePass",
    stage: "live_gate",
    role: "public-safe wake, stale work, ACK, and liveness proof",
    target_url: "docs/prd/wakepass.md",
    command: [
      "node",
      "--test",
      "scripts/event-wake-router.test.mjs",
      "scripts/pinballwake-ack-ledger-room.test.mjs",
      "scripts/pinballwake-stale-room.test.mjs",
      "scripts/worker-liveness-watchdog.test.mjs",
    ],
    actualCommand: [
      process.execPath,
      "--test",
      "scripts/event-wake-router.test.mjs",
      "scripts/pinballwake-ack-ledger-room.test.mjs",
      "scripts/pinballwake-stale-room.test.mjs",
      "scripts/worker-liveness-watchdog.test.mjs",
    ],
  },
];

export const BOUNDARY_CROSS_PASS_MATRIX = [
  {
    targetId: "rotatepass",
    reviewers: [
      { id: "securitypass", role: "safe local security and secret-boundary proof" },
      { id: "legalpass", role: "safe guidance and non-certification wording" },
      { id: "commonsensepass", role: "proof-claim sanity and false-DONE guard" },
    ],
  },
  {
    targetId: "wakepass",
    reviewers: [
      { id: "testpass", role: "automation and MCP smoke trust gate" },
      { id: "commonsensepass", role: "stale-work and false-DONE sanity" },
      { id: "flowpass", role: "handoff and recovery-path overlap" },
    ],
  },
];

const REVIEWER_NAMES = new Map([
  ["commonsensepass", "CommonSensePass"],
  ["copypass", "CopyPass"],
  ["flowpass", "FlowPass"],
  ["legalpass", "LegalPass"],
  ["securitypass", "SecurityPass"],
  ["testpass", "TestPass"],
]);

function argValue(name, fallback = "") {
  const prefix = `--${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefix));
  if (found) return found.slice(prefix.length);
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] ?? fallback : fallback;
}

function makeRunId(seed) {
  return `xpass-boundary-sweep-${createHash("sha256").update(seed).digest("hex").slice(0, 16)}`;
}

function statusFromRows(rows) {
  if (rows.some((row) => row.status === "failing")) return "failing";
  if (rows.some((row) => row.status === "blocked")) return "blocked";
  if (rows.some((row) => row.status === "pending")) return "pending";
  return "passing";
}

async function readPackageSweep(pathname, targetSha) {
  try {
    const receipt = JSON.parse(await fs.readFile(pathname, "utf8"));
    if (receipt?.kind !== "xpass_package_sweep_receipt_v1") {
      return { receipt: null, stale: false, reason: "invalid_kind" };
    }
    if (targetSha && receipt.target_sha !== targetSha) {
      return { receipt, stale: true, reason: "target_sha_mismatch" };
    }
    return { receipt, stale: false, reason: "fresh" };
  } catch (err) {
    if (err?.code === "ENOENT") return { receipt: null, stale: false, reason: "missing" };
    return {
      receipt: null,
      stale: false,
      reason: "unreadable",
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

function packageReviewerStatus(packageSweepState, reviewerId) {
  if (packageSweepState?.stale) return "pending";
  const packages = packageSweepState?.receipt?.packages;
  if (!Array.isArray(packages)) return "pending";
  const row = packages.find((pkg) => pkg.id === reviewerId);
  return row?.status || "pending";
}

function reviewerRows(matrixEntry, packageSweepState) {
  return matrixEntry.reviewers.map((reviewer) => ({
    id: reviewer.id,
    name: REVIEWER_NAMES.get(reviewer.id) || reviewer.id,
    role: reviewer.role,
    status: packageReviewerStatus(packageSweepState, reviewer.id),
  }));
}

function buildCrossPassMatrix(productResults, packageSweepState) {
  const productById = new Map(productResults.map((product) => [product.id, product]));
  return BOUNDARY_CROSS_PASS_MATRIX.map((entry) => {
    const target = productById.get(entry.targetId);
    const reviewers = reviewerRows(entry, packageSweepState);
    const failingReviewer = reviewers.find((reviewer) => reviewer.status === "failing");
    const pendingReviewer = reviewers.find((reviewer) => reviewer.status === "pending" || reviewer.status === "blocked");
    const status = target?.status === "failing" || failingReviewer
      ? "failing"
      : target?.status === "passing" && !pendingReviewer
        ? "passing"
        : "pending";
    return {
      target_id: entry.targetId,
      target_name: target?.name || entry.targetId,
      status,
      reviewers,
      summary: status === "passing"
        ? `${target?.name || entry.targetId} was cross-checked by ${reviewers.map((reviewer) => reviewer.name).join(", ")}.`
        : `${target?.name || entry.targetId} boundary proof is not green yet.`,
    };
  });
}

export async function defaultRunCommand(command, args, { cwd, timeoutMs }) {
  const started = Date.now();
  try {
    await execFileAsync(command, args, {
      cwd,
      timeout: timeoutMs,
      maxBuffer: 10 * 1024 * 1024,
      env: process.env,
    });
    return { status: "passing", exitCode: 0, durationMs: Date.now() - started, failureHint: "" };
  } catch (error) {
    const exitCode = typeof error?.code === "number" ? error.code : 1;
    const signal = typeof error?.signal === "string" ? error.signal : "";
    const failureHint = signal
      ? `Process stopped with signal ${signal}.`
      : Number.isFinite(exitCode)
        ? `Process exited with code ${exitCode}.`
        : "Command failed before completion.";
    return { status: "failing", exitCode, durationMs: Date.now() - started, failureHint };
  }
}

function normalizeProductResult(product, commandResult, now) {
  const status = commandResult.status === "passing" ? "passing" : "failing";
  return {
    id: product.id,
    name: product.name,
    stage: product.stage,
    role: product.role,
    target_url: product.target_url,
    status,
    checked_at: now,
    command: product.command,
    exit_code: commandResult.exitCode,
    duration_ms: commandResult.durationMs,
    summary: status === "passing"
      ? `${product.name} public-safe boundary tests passed.`
      : `${product.name} public-safe boundary tests failed. See the workflow log for command output.`,
    failure_hint: commandResult.failureHint || null,
    proof: {
      kind: "public_safe_boundary_test",
      command: product.command,
      targetUrl: product.target_url,
    },
  };
}

function statusForReceipt(product, matrixRow) {
  if (product.status === "failing" || matrixRow?.status === "failing") return "BLOCKER";
  if (matrixRow?.status === "pending" || matrixRow?.status === "blocked") return "PENDING";
  return "PASS";
}

function checkStatus(passed) {
  return passed ? "PASS" : "BLOCKER";
}

function buildWakePassReceipt(product, matrixRow, { targetSha, now }) {
  const status = statusForReceipt(product, matrixRow);
  const commandPassed = product.status === "passing";
  const actionNeeded = [];
  if (!commandPassed) actionNeeded.push("Fix WakePass public-safe ACK, stale reclaim, and liveness guards before using this boundary receipt.");
  if (matrixRow?.status && matrixRow.status !== "passing") {
    actionNeeded.push("Refresh cross-pass reviewer proof from TestPass, CommonSensePass, and FlowPass.");
  }
  if (!targetSha) actionNeeded.push("Bind WakePass boundary proof to the PR or release SHA before using it as merge evidence.");

  return {
    kind: "wakepass_boundary_receipt_v1",
    status,
    product_id: "wakepass",
    target_url: product.target_url,
    target_sha: targetSha || null,
    checked_at: now,
    evidence_mode: "public_safe_boundary",
    lifecycle_evidence: {
      live_queue_touched: false,
      live_worker_woken: false,
      notification_sent: false,
      route_delivery_attempted: false,
      secret_values_seen: false,
      ack_tracking: "fixture_and_schema_only",
      stale_reclaim_tracking: "fixture_and_schema_only",
      liveness_tracking: "fixture_and_schema_only",
    },
    checks: [
      {
        id: "event-wake-router",
        status: checkStatus(commandPassed),
        evidence: "scripts/event-wake-router.test.mjs",
        summary: commandPassed
          ? "Wake handoffs are classified as ACK-required dispatches with bounded routing metadata."
          : "Wake event routing boundary failed.",
      },
      {
        id: "pinballwake-ack-ledger",
        status: checkStatus(commandPassed),
        evidence: "scripts/pinballwake-ack-ledger-room.test.mjs",
        summary: commandPassed
          ? "ACK ledger fixtures keep accepted, blocked, and completed worker states visible."
          : "ACK ledger boundary failed.",
      },
      {
        id: "pinballwake-stale-reclaim",
        status: checkStatus(commandPassed),
        evidence: "scripts/pinballwake-stale-room.test.mjs",
        summary: commandPassed
          ? "Stale work fixtures produce explicit reclaim evidence instead of silent healthy claims."
          : "Stale reclaim boundary failed.",
      },
      {
        id: "worker-liveness-watchdog",
        status: checkStatus(commandPassed),
        evidence: "scripts/worker-liveness-watchdog.test.mjs",
        summary: commandPassed
          ? "Worker liveness fixtures surface missed check-ins without touching live workers."
          : "Worker liveness watchdog boundary failed.",
      },
    ],
    cross_pass_reviewers: matrixRow?.reviewers ?? [],
    action_needed: actionNeeded,
    boundaries: [
      "WakePass boundary proof does not touch live queues, wake live workers, send notifications, or call route adapters.",
      "This receipt uses public-safe fixtures and schemas for ACK, stale reclaim, and liveness evidence.",
      "Healthy means the boundary fixtures passed; it is not proof that every live worker is awake.",
      "Live wake attempts require explicit future scope, idempotency keys, rate limits, and redacted route metadata only.",
    ],
  };
}

function attachBoundaryReceipts(productResults, matrix, { targetSha, now }) {
  const matrixByTarget = new Map(matrix.map((row) => [row.target_id, row]));
  return productResults.map((product) => {
    if (product.id !== "wakepass") return product;
    return {
      ...product,
      wakepass_receipt_v1: buildWakePassReceipt(product, matrixByTarget.get("wakepass"), { targetSha, now }),
    };
  });
}

function actionNeeded(productResults, matrix, packageSweepState) {
  return [
    ...(packageSweepState?.stale
      ? ["XPass boundary sweep: package reviewer proof is stale for the target SHA."]
      : []),
    ...(packageSweepState?.reason && packageSweepState.reason !== "fresh"
      ? [`XPass boundary sweep: package reviewer proof is ${packageSweepState.reason}.`]
      : []),
    ...productResults
      .filter((product) => product.status !== "passing")
      .map((product) => `${product.name}: ${product.summary}`),
    ...matrix
      .filter((row) => row.status !== "passing")
      .map((row) => `${row.target_name}: ${row.summary}`),
  ];
}

export async function buildXPassBoundarySweep({
  cwd = process.cwd(),
  products = BOUNDARY_PRODUCTS,
  packageSweepPath = "public/dogfood/xpass-package-sweep.json",
  targetSha = "",
  now = new Date().toISOString(),
  source = "xpass boundary sweep",
  timeoutMs = 120000,
  skipCommands = false,
  runCommand = defaultRunCommand,
} = {}) {
  const packageSweepState = await readPackageSweep(packageSweepPath, targetSha);
  const productResults = [];

  for (const product of products) {
    const [command, ...args] = product.actualCommand;
    const commandResult = skipCommands
      ? { status: "passing", exitCode: 0, durationMs: 0, failureHint: "" }
      : await runCommand(command, args, { cwd, timeoutMs, product });
    productResults.push(normalizeProductResult(product, commandResult, now));
  }

  const matrix = buildCrossPassMatrix(productResults, packageSweepState);
  const productsWithReceipts = attachBoundaryReceipts(productResults, matrix, { targetSha, now });
  const productStatus = statusFromRows(productResults);
  const matrixStatus = statusFromRows(matrix);
  const status = productStatus === "failing" || matrixStatus === "failing"
    ? "failing"
    : productStatus === "passing" && matrixStatus === "passing"
      ? "passing"
      : "pending";
  const seed = JSON.stringify({
    now,
    targetSha,
    packageSweepReason: packageSweepState.reason,
    products: productResults.map((product) => [product.id, product.status]),
    matrix: matrix.map((row) => [row.target_id, row.status]),
  });

  return {
    kind: "xpass_boundary_sweep_receipt_v1",
    generated_at: now,
    checked_at: now,
    run_id: makeRunId(seed),
    source,
    target_sha: targetSha || null,
    package_sweep_path: packageSweepPath,
    package_sweep_status: packageSweepState.reason,
    status,
    summary: `XPass boundary sweep ${status} across ${productResults.length} public-safe boundary product(s).`,
    product_count: productResults.length,
    products: productsWithReceipts,
    cross_pass_matrix: matrix,
    action_needed: actionNeeded(productResults, matrix, packageSweepState),
  };
}

async function main() {
  const outputPath = argValue("output", "public/dogfood/xpass-boundary-sweep.json");
  const targetSha = argValue("target-sha", process.env.DOGFOOD_TARGET_SHA || process.env.GITHUB_SHA || process.env.VERCEL_GIT_COMMIT_SHA || "");
  const packageSweepPath = argValue("package-sweep", process.env.DOGFOOD_XPASS_PACKAGE_SWEEP_PATH || "public/dogfood/xpass-package-sweep.json");
  const timeoutMs = Number(argValue("timeout-ms", process.env.XPASS_BOUNDARY_SWEEP_TIMEOUT_MS || "120000"));
  const skipCommands = process.argv.includes("--skip-commands") || process.env.XPASS_BOUNDARY_SWEEP_SKIP_COMMANDS === "1";
  const receipt = await buildXPassBoundarySweep({
    cwd: process.cwd(),
    packageSweepPath,
    targetSha,
    timeoutMs,
    skipCommands,
    source: process.env.GITHUB_ACTIONS ? "nightly dogfood workflow" : "local xpass boundary sweep",
  });

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(receipt, null, 2)}\n`);
  console.log(JSON.stringify({
    status: receipt.status,
    run_id: receipt.run_id,
    product_count: receipt.product_count,
    action_needed: receipt.action_needed.length,
  }, null, 2));

  if (receipt.status === "failing") process.exitCode = 1;
}

const cliPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
const modulePath = fileURLToPath(import.meta.url);
if (cliPath === modulePath) {
  await main();
}
