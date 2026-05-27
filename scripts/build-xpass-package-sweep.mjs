#!/usr/bin/env node

import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export const PASS_PACKAGES = [
  {
    id: "testpass",
    name: "TestPass",
    workspace: "@unclick/testpass",
    path: "packages/testpass",
    stage: "live_gate",
    role: "merge proof and MCP smoke gate",
  },
  {
    id: "uxpass",
    name: "UXPass",
    workspace: "@unclick/uxpass",
    path: "packages/uxpass",
    stage: "live_dogfood",
    role: "public UX and route sweep gate",
  },
  {
    id: "securitypass",
    name: "SecurityPass",
    workspace: "@unclick/securitypass",
    path: "packages/securitypass",
    stage: "scope_gated",
    role: "safe local security package proof only",
  },
  {
    id: "sloppass",
    name: "SlopPass",
    workspace: "@unclick/sloppass",
    path: "packages/sloppass",
    stage: "package_ready",
    role: "AI-code quality and anti-slop review",
  },
  {
    id: "seopass",
    name: "SEOPass",
    workspace: "@unclick/seopass",
    path: "packages/seopass",
    stage: "package_ready",
    role: "crawler, canonical, robots, sitemap, and metadata proof",
  },
  {
    id: "copypass",
    name: "CopyPass",
    workspace: "@unclick/copypass",
    path: "packages/copypass",
    stage: "package_ready",
    role: "copy quality, claims, and source-copy boundary proof",
  },
  {
    id: "legalpass",
    name: "LegalPass",
    workspace: "@unclick/legalpass",
    path: "packages/legalpass",
    stage: "package_ready",
    role: "guidance-only policy and claims proof",
  },
  {
    id: "commonsensepass",
    name: "CommonSensePass",
    workspace: "@unclick/commonsensepass",
    path: "packages/commonsensepass",
    stage: "live_gate",
    role: "false-DONE, claim sanity, and proof honesty gate",
  },
  {
    id: "flowpass",
    name: "FlowPass",
    workspace: "@unclick/flowpass",
    path: "packages/flowpass",
    stage: "package_ready",
    role: "journey and handoff proof",
  },
  {
    id: "geopass",
    name: "GEOPass",
    workspace: "@unclick/geopass",
    path: "packages/geopass",
    stage: "package_ready",
    role: "answer-engine readiness and AI-discovery proof",
  },
];

export const CROSS_PASS_MATRIX = [
  {
    targetId: "sloppass",
    reviewers: [
      { id: "testpass", role: "package tests must pass before public proof is trusted" },
      { id: "commonsensepass", role: "false-DONE and proof-claim sanity" },
      { id: "copypass", role: "plain-English claims and wording boundary" },
    ],
  },
  {
    targetId: "seopass",
    reviewers: [
      { id: "testpass", role: "package tests must pass before public proof is trusted" },
      { id: "geopass", role: "answer-engine overlap for crawler and metadata signals" },
      { id: "commonsensepass", role: "proof-claim sanity" },
    ],
  },
  {
    targetId: "geopass",
    reviewers: [
      { id: "testpass", role: "package tests must pass before public proof is trusted" },
      { id: "seopass", role: "search-indexing overlap for crawlable answer sources" },
      { id: "commonsensepass", role: "proof-claim sanity" },
    ],
  },
  {
    targetId: "copypass",
    reviewers: [
      { id: "sloppass", role: "anti-slop quality review" },
      { id: "legalpass", role: "claims and guidance-only boundary" },
      { id: "commonsensepass", role: "proof-claim sanity" },
    ],
  },
  {
    targetId: "legalpass",
    reviewers: [
      { id: "copypass", role: "public wording and claims clarity" },
      { id: "securitypass", role: "safe local package proof only" },
      { id: "commonsensepass", role: "certification-claim sanity" },
    ],
  },
  {
    targetId: "commonsensepass",
    reviewers: [
      { id: "testpass", role: "package tests must pass before public proof is trusted" },
      { id: "sloppass", role: "anti-slop claim review" },
    ],
  },
  {
    targetId: "flowpass",
    reviewers: [
      { id: "uxpass", role: "route and UX sweep overlap" },
      { id: "testpass", role: "package tests must pass before public proof is trusted" },
      { id: "commonsensepass", role: "proof-claim sanity" },
    ],
  },
];

function argValue(name, fallback = "") {
  const prefix = `--${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefix));
  if (found) return found.slice(prefix.length);
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] ?? fallback : fallback;
}

function argValues(name) {
  const prefix = `--${name}=`;
  const values = [];
  for (let index = 0; index < process.argv.length; index += 1) {
    const arg = process.argv[index];
    if (arg.startsWith(prefix)) values.push(arg.slice(prefix.length));
    if (arg === `--${name}` && process.argv[index + 1]) values.push(process.argv[index + 1]);
  }
  return values;
}

function compactText(value, max = 400) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
}

function npmCommandParts() {
  if (process.platform === "win32") {
    return {
      command: process.execPath,
      prefixArgs: [path.join(path.dirname(process.execPath), "node_modules", "npm", "bin", "npm-cli.js")],
    };
  }
  return { command: "npm", prefixArgs: [] };
}

function displayCommand(pkg) {
  return ["npm", "run", "test", `--workspace=${pkg.workspace}`];
}

function actualCommand(pkg) {
  const npm = npmCommandParts();
  return [npm.command, ...npm.prefixArgs, "run", "test", `--workspace=${pkg.workspace}`];
}

function statusFromPackages(packages) {
  if (packages.some((pkg) => pkg.status === "failing")) return "failing";
  if (packages.some((pkg) => pkg.status === "blocked")) return "blocked";
  if (packages.some((pkg) => pkg.status === "pending")) return "pending";
  return "passing";
}

function makeRunId(seed) {
  return `xpass-package-sweep-${createHash("sha256").update(seed).digest("hex").slice(0, 16)}`;
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
    return {
      status: "passing",
      exitCode: 0,
      durationMs: Date.now() - started,
      failureHint: "",
    };
  } catch (error) {
    const exitCode = typeof error?.code === "number" ? error.code : 1;
    const signal = typeof error?.signal === "string" ? error.signal : "";
    const hint = signal
      ? `Process stopped with signal ${signal}.`
      : Number.isFinite(exitCode)
        ? `Process exited with code ${exitCode}.`
        : "Command failed before completion.";
    return {
      status: "failing",
      exitCode,
      durationMs: Date.now() - started,
      failureHint: hint,
    };
  }
}

function normalizePackageResult(pkg, commandResult, now) {
  const status = commandResult.status === "passing" ? "passing" : "failing";
  return {
    id: pkg.id,
    name: pkg.name,
    workspace: pkg.workspace,
    path: pkg.path,
    stage: pkg.stage,
    role: pkg.role,
    status,
    checked_at: now,
    command: displayCommand(pkg),
    exit_code: commandResult.exitCode,
    duration_ms: commandResult.durationMs,
    summary: status === "passing"
      ? `${pkg.name} package tests passed.`
      : `${pkg.name} package tests failed. See the workflow log for command output.`,
    failure_hint: commandResult.failureHint || null,
    proof: {
      kind: "workspace_package_test",
      workspace: pkg.workspace,
      command: displayCommand(pkg),
    },
  };
}

function reviewerRows(matrixEntry, packageById) {
  return matrixEntry.reviewers.map((reviewer) => {
    const reviewerPackage = packageById.get(reviewer.id);
    return {
      id: reviewer.id,
      name: reviewerPackage?.name || reviewer.id,
      role: reviewer.role,
      status: reviewerPackage?.status || "pending",
    };
  });
}

function buildCrossPassMatrix(packages) {
  const packageById = new Map(packages.map((pkg) => [pkg.id, pkg]));
  return CROSS_PASS_MATRIX.map((entry) => {
    const target = packageById.get(entry.targetId);
    const reviewers = reviewerRows(entry, packageById);
    const failingReviewer = reviewers.find((reviewer) => reviewer.status === "failing");
    const pendingReviewer = reviewers.find((reviewer) => reviewer.status === "pending" || reviewer.status === "blocked");
    const status = target?.status === "failing" || failingReviewer
      ? "failing"
      : target && !pendingReviewer
        ? "passing"
        : "pending";
    return {
      target_id: entry.targetId,
      target_name: target?.name || entry.targetId,
      status,
      reviewers,
      summary: status === "passing"
        ? `${target?.name || entry.targetId} was cross-checked by ${reviewers.map((reviewer) => reviewer.name).join(", ")}.`
        : `${target?.name || entry.targetId} cross-pass proof is not green yet.`,
    };
  });
}

function actionNeeded(packages, matrix) {
  return [
    ...packages
      .filter((pkg) => pkg.status !== "passing")
      .map((pkg) => `${pkg.name}: ${pkg.summary}`),
    ...matrix
      .filter((row) => row.status !== "passing")
      .map((row) => `${row.target_name}: ${row.summary}`),
  ];
}

export async function buildXPassPackageSweep({
  cwd = process.cwd(),
  packages = PASS_PACKAGES,
  selectedIds = [],
  targetSha = "",
  now = new Date().toISOString(),
  source = "xpass package sweep",
  timeoutMs = 120000,
  skipCommands = false,
  runCommand = defaultRunCommand,
} = {}) {
  const selected = selectedIds.length
    ? packages.filter((pkg) => selectedIds.includes(pkg.id))
    : packages;
  const packageResults = [];

  for (const pkg of selected) {
    const [command, ...args] = actualCommand(pkg);
    const commandResult = skipCommands
      ? { status: "passing", exitCode: 0, durationMs: 0, failureHint: "" }
      : await runCommand(command, args, { cwd, timeoutMs, pkg });
    packageResults.push(normalizePackageResult(pkg, commandResult, now));
  }

  const matrix = buildCrossPassMatrix(packageResults);
  const packageStatus = statusFromPackages(packageResults);
  const matrixStatus = matrix.some((row) => row.status === "failing")
    ? "failing"
    : matrix.some((row) => row.status !== "passing")
      ? "pending"
      : "passing";
  const status = packageStatus === "failing" || matrixStatus === "failing"
    ? "failing"
    : packageStatus === "passing" && matrixStatus === "passing"
      ? "passing"
      : "pending";
  const seed = JSON.stringify({ now, targetSha, packages: packageResults.map((pkg) => [pkg.id, pkg.status]) });

  return {
    kind: "xpass_package_sweep_receipt_v1",
    generated_at: now,
    checked_at: now,
    run_id: makeRunId(seed),
    source,
    target_sha: targetSha || null,
    status,
    summary: `XPass package sweep ${status} across ${packageResults.length} package(s).`,
    package_count: packageResults.length,
    packages: packageResults,
    cross_pass_matrix: matrix,
    action_needed: actionNeeded(packageResults, matrix),
  };
}

async function main() {
  const outputPath = argValue("output", "public/dogfood/xpass-package-sweep.json");
  const targetSha = argValue("target-sha", process.env.DOGFOOD_TARGET_SHA || process.env.GITHUB_SHA || process.env.VERCEL_GIT_COMMIT_SHA || "");
  const selectedIds = argValues("package").map((value) => value.toLowerCase());
  const timeoutMs = Number(argValue("timeout-ms", process.env.XPASS_PACKAGE_SWEEP_TIMEOUT_MS || "120000"));
  const skipCommands = process.argv.includes("--skip-commands") || process.env.XPASS_PACKAGE_SWEEP_SKIP_COMMANDS === "1";
  const receipt = await buildXPassPackageSweep({
    cwd: process.cwd(),
    selectedIds,
    targetSha,
    source: process.env.GITHUB_ACTIONS ? "nightly dogfood workflow" : "local xpass package sweep",
    timeoutMs,
    skipCommands,
  });

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(receipt, null, 2)}\n`);
  console.log(JSON.stringify({
    generated_at: receipt.generated_at,
    status: receipt.status,
    packages: receipt.package_count,
    action_needed: receipt.action_needed.length,
    output: outputPath,
  }, null, 2));
}

const cliPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
const modulePath = fileURLToPath(import.meta.url);
if (cliPath === modulePath) {
  await main();
}
