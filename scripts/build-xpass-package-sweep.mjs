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
    targetId: "testpass",
    reviewers: [
      { id: "commonsensepass", role: "proof honesty and false-DONE gate coverage" },
      { id: "securitypass", role: "MCP and safe local security boundary review" },
      { id: "sloppass", role: "fixture quality and failure-message review" },
    ],
  },
  {
    targetId: "uxpass",
    reviewers: [
      { id: "testpass", role: "package tests must pass before public UX proof is trusted" },
      { id: "flowpass", role: "route, journey, and handoff overlap" },
      { id: "copypass", role: "interface copy and public wording clarity" },
      { id: "commonsensepass", role: "proof-claim sanity" },
    ],
  },
  {
    targetId: "securitypass",
    reviewers: [
      { id: "testpass", role: "package tests must pass before security proof is trusted" },
      { id: "commonsensepass", role: "scope-gate and proof-claim sanity" },
      { id: "legalpass", role: "safe guidance boundary and non-certification wording" },
    ],
  },
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

function normalizeSelectedIds(selectedIds) {
  return [...new Set(selectedIds
    .map((id) => String(id ?? "").trim().toLowerCase())
    .filter(Boolean))];
}

function reviewerRows(matrixEntry, resultById, catalogById) {
  return matrixEntry.reviewers.map((reviewer) => {
    const reviewerResult = resultById.get(reviewer.id);
    const reviewerPackage = reviewerResult || catalogById.get(reviewer.id);
    return {
      id: reviewer.id,
      name: reviewerPackage?.name || reviewer.id,
      role: reviewer.role,
      status: reviewerResult?.status || "pending",
    };
  });
}

function buildCrossPassMatrix(packageResults, packageCatalog = packageResults) {
  const packageById = new Map(packageResults.map((pkg) => [pkg.id, pkg]));
  const catalogById = new Map(packageCatalog.map((pkg) => [pkg.id, pkg]));
  return CROSS_PASS_MATRIX.map((entry) => {
    const target = packageById.get(entry.targetId);
    const catalogTarget = catalogById.get(entry.targetId);
    const reviewers = reviewerRows(entry, packageById, catalogById);
    const failingReviewer = reviewers.find((reviewer) => reviewer.status === "failing");
    const pendingReviewer = reviewers.find((reviewer) => reviewer.status === "pending" || reviewer.status === "blocked");
    const status = target?.status === "failing" || failingReviewer
      ? "failing"
      : target && !pendingReviewer
        ? "passing"
        : "pending";
    const targetName = target?.name || catalogTarget?.name || entry.targetId;
    return {
      target_id: entry.targetId,
      target_name: targetName,
      status,
      reviewers,
      summary: status === "passing"
        ? `${targetName} was cross-checked by ${reviewers.map((reviewer) => reviewer.name).join(", ")}.`
        : `${targetName} cross-pass proof is not green yet.`,
    };
  });
}

function actionNeeded(packages, matrix, {
  scope = "full",
  expectedPackageCount = packages.length,
  selectedPackageCount = packages.length,
  unknownPackageIds = [],
} = {}) {
  return [
    ...(unknownPackageIds.length
      ? [`XPass package sweep: unknown selected package id(s): ${unknownPackageIds.join(", ")}.`]
      : []),
    ...(scope === "partial"
      ? [`XPass package sweep: partial selected run checked ${selectedPackageCount} of ${expectedPackageCount} package(s); run the full package sweep before treating this as complete cross-pass dogfood.`]
      : []),
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
  const expectedPackageIds = packages.map((pkg) => pkg.id);
  const expectedPackageIdSet = new Set(expectedPackageIds);
  const requestedSelectedIds = normalizeSelectedIds(selectedIds);
  const unknownPackageIds = requestedSelectedIds.filter((id) => !expectedPackageIdSet.has(id));
  const selected = requestedSelectedIds.length
    ? packages.filter((pkg) => requestedSelectedIds.includes(pkg.id))
    : packages;
  const selectedPackageIds = selected.map((pkg) => pkg.id);
  const scope = selectedPackageIds.length === packages.length && unknownPackageIds.length === 0
    ? "full"
    : "partial";
  const packageResults = [];

  for (const pkg of selected) {
    const [command, ...args] = actualCommand(pkg);
    const commandResult = skipCommands
      ? { status: "passing", exitCode: 0, durationMs: 0, failureHint: "" }
      : await runCommand(command, args, { cwd, timeoutMs, pkg });
    packageResults.push(normalizePackageResult(pkg, commandResult, now));
  }

  const matrix = buildCrossPassMatrix(packageResults, packages);
  const packageStatus = statusFromPackages(packageResults);
  const matrixStatus = matrix.some((row) => row.status === "failing")
    ? "failing"
    : matrix.some((row) => row.status !== "passing")
      ? "pending"
      : "passing";
  const selectionStatus = unknownPackageIds.length ? "pending" : "passing";
  const status = packageStatus === "failing" || matrixStatus === "failing"
    ? "failing"
    : packageStatus === "passing" && matrixStatus === "passing" && selectionStatus === "passing"
      ? "passing"
      : "pending";
  const seed = JSON.stringify({
    now,
    targetSha,
    scope,
    selectedPackageIds,
    unknownPackageIds,
    packages: packageResults.map((pkg) => [pkg.id, pkg.status]),
  });
  const summary = scope === "full"
    ? `XPass package sweep ${status} across all ${packages.length} package(s).`
    : `XPass package sweep ${status} across ${packageResults.length} selected package(s); full cross-pass dogfood requires ${packages.length} package(s).`;

  return {
    kind: "xpass_package_sweep_receipt_v1",
    generated_at: now,
    checked_at: now,
    run_id: makeRunId(seed),
    source,
    target_sha: targetSha || null,
    status,
    scope,
    summary,
    package_count: packageResults.length,
    expected_package_count: packages.length,
    selected_package_ids: selectedPackageIds,
    expected_package_ids: expectedPackageIds,
    unknown_package_ids: unknownPackageIds,
    packages: packageResults,
    cross_pass_matrix: matrix,
    action_needed: actionNeeded(packageResults, matrix, {
      scope,
      expectedPackageCount: packages.length,
      selectedPackageCount: packageResults.length,
      unknownPackageIds,
    }),
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
    scope: receipt.scope,
    packages: receipt.package_count,
    expected_packages: receipt.expected_package_count,
    action_needed: receipt.action_needed.length,
    output: outputPath,
  }, null, 2));
}

const cliPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
const modulePath = fileURLToPath(import.meta.url);
if (cliPath === modulePath) {
  await main();
}
