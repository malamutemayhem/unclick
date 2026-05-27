#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run") || process.env.DOGFOOD_DRY_RUN === "1";
const outputIndex = process.argv.indexOf("--output");
const outputPath =
  outputIndex >= 0 && process.argv[outputIndex + 1]
    ? process.argv[outputIndex + 1]
    : "public/dogfood/latest.json";

const apiBase = trimTrailingSlash(process.env.DOGFOOD_API_BASE || "https://unclick.world");
const publicUrl = process.env.DOGFOOD_PUBLIC_URL || "https://unclick.world";
const mcpUrl = process.env.DOGFOOD_MCP_URL || "https://unclick.world/api/mcp";
const generatedAt = new Date().toISOString();

const statusLegend = {
  passing: "A live check ran and returned a passing result.",
  failing: "A live check ran and returned a failing result or could not reach its API.",
  blocked: "The check could not run because an action is needed, such as a missing credential or scope gate.",
  pending: "The check is planned or scaffolded, but live proof is not available yet.",
};

const proofPolicy =
  "Public dogfood receipts mark passing only when a live check actually ran. Blocked and pending are honest product states, not failures to hide.";

const xpassIndex = [
  {
    id: "testpass",
    name: "TestPass",
    stage: "live_gate",
    label: "Live trust gate",
    automation: "PR check, scheduled smoke, dogfood receipt, wake-router watched",
    mentionProfile: "High mention volume because it protects merges and cron trust.",
    nextStep: "Keep it as the default proof gate while the rest of XPass catches up.",
  },
  {
    id: "commonsensepass",
    name: "CommonSensePass",
    stage: "worker_sanity_gate",
    label: "Worker sanity gate",
    automation: "Worker claim guard and MCP protocol surface",
    mentionProfile: "High mention volume around no-work, done, healthy, and merge-ready claims.",
    nextStep: "Add the CommonSensePass dogfood receipt to the public dogfood board.",
  },
  {
    id: "uxpass",
    name: "UXPass",
    stage: "live_dogfood",
    label: "Live dogfood lane",
    automation: "Dogfood receipt and run endpoint",
    mentionProfile: "Medium mention volume when the dogfood receipt or runner needs attention.",
    nextStep: "Promote to scheduled proof once the credential path is consistently healthy.",
  },
  {
    id: "securitypass",
    name: "SecurityPass",
    stage: "scope_verified_runner",
    label: "Scope-verified runner",
    automation: "Deterministic package and MCP surface; public recurring probes remain gated",
    mentionProfile: "Low mention volume by design because unsafe probes stay disabled.",
    nextStep: "Add a deny-by-default recurring runner proof before live security checks.",
  },
  {
    id: "seopass",
    name: "SEOPass",
    stage: "deterministic_pack",
    label: "Deterministic pack",
    automation: "Package-level runner and proof tests; public recurring receipt not yet wired",
    mentionProfile: "Medium mention volume when public/search surfaces change.",
    nextStep: "Wire the recurring metadata receipt into public dogfood.",
  },
  {
    id: "copypass",
    name: "CopyPass",
    stage: "deterministic_pack",
    label: "Deterministic pack",
    automation: "Package-level copy review and MCP surface; public recurring receipt not yet wired",
    mentionProfile: "Medium mention volume for public copy, docs, and exact-source claims.",
    nextStep: "Wire the recurring copy-quality receipt into public dogfood.",
  },
  {
    id: "legalpass",
    name: "LegalPass",
    stage: "deterministic_pack",
    label: "Deterministic pack",
    automation: "Package-level issue spotting and MCP surface; public recurring receipt not yet wired",
    mentionProfile: "Medium mention volume for terms, privacy, billing, and public claim changes.",
    nextStep: "Wire the recurring policy/claims receipt into public dogfood.",
  },
  {
    id: "sloppass",
    name: "SlopPass",
    stage: "deterministic_pack",
    label: "Code-quality pack",
    automation: "Package-level source and diff review; public recurring receipt not yet wired",
    mentionProfile: "Medium mention volume for AI-generated or code-quality-sensitive changes.",
    nextStep: "Wire a SlopPass diff receipt into XPass PR proof.",
  },
  {
    id: "flowpass",
    name: "FlowPass",
    stage: "plan_only_package",
    label: "Plan-only package",
    automation: "Package-level journey schema and fixtures; live route execution not yet wired",
    mentionProfile: "Low mention volume until journey receipts can run on deployed flows.",
    nextStep: "Connect the smallest login-free journey receipt.",
  },
  {
    id: "geopass",
    name: "GEOPass",
    stage: "plan_only_package",
    label: "Plan-only package",
    automation: "Package-level generative-engine readiness contract; live crawler not yet wired",
    mentionProfile: "Low mention volume until public AI-readiness scans are scheduled.",
    nextStep: "Connect GEOPass scanner evidence to SEOPass and public dogfood.",
  },
  {
    id: "rotatepass",
    name: "RotatePass",
    stage: "metadata_contract",
    label: "Credential metadata contract",
    automation: "Docs and redaction guard protect credential-health language",
    mentionProfile: "Low mention volume unless credentials, tokens, or rotation metadata change.",
    nextStep: "Add safe metadata-only receipt without exposing secret values.",
  },
  {
    id: "wakepass",
    name: "WakePass",
    stage: "reliability_gate",
    label: "Reliability gate",
    automation: "PinballWake and dispatch ACK checks feed action-needed handoffs",
    mentionProfile: "High mention volume when worker ACKs, dispatches, or stale handoffs break.",
    nextStep: "Publish a public-safe WakePass receipt for stale-ACK cleanup.",
  },
  {
    id: "enterprisepass",
    name: "EnterprisePass",
    stage: "guidance",
    label: "Guidance report",
    automation: "Receipt guard and readiness report boundary",
    mentionProfile: "Low mention volume while it remains a guidance layer, not certification.",
    nextStep: "Add low-risk readiness checks without claiming compliance certification.",
  },
];

function trimTrailingSlash(value) {
  return value.replace(/\/+$/, "");
}

function statusFromFailureKind(failureKind) {
  if (failureKind === "missing_secret") return "blocked";
  if (failureKind === "network" || failureKind === "http" || failureKind === "parse") return "failing";
  return "pending";
}

function result(id, name, status, summary, evidence, details = {}) {
  return { id, name, status, summary, evidence, checkedAt: generatedAt, ...details };
}

function pendingResult(id, name, summary, evidence, details = {}) {
  return result(id, name, "pending", summary, evidence, {
    reasonCode: "planned_runner",
    ...details,
  });
}

function blockedResult(id, name, summary, evidence, blockedReason, details = {}) {
  return result(id, name, "blocked", summary, evidence, { blockedReason, ...details });
}

function failureResult(id, name, summary, evidence, details = {}) {
  return result(id, name, "failing", summary, evidence, details);
}

function passResult(id, name, summary, evidence, details = {}) {
  return result(id, name, "passing", summary, evidence, details);
}

async function postJson(url, token, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  let json = {};
  try {
    json = await res.json();
  } catch {
    json = {};
  }

  return { ok: res.ok, status: res.status, json };
}

async function runTestPass() {
  const token = process.env.DOGFOOD_TESTPASS_TOKEN || process.env.TESTPASS_TOKEN || "";
  if (dryRun) {
    return passResult(
      "testpass",
      "TestPass",
      "Dry-run receipt builder validated the TestPass result shape.",
      "Dry run only. Live workflow calls /api/testpass-run with source=scheduled.",
    );
  }
  if (!token) {
    return blockedResult(
      "testpass",
      "TestPass",
      "Scheduled TestPass could not run because DOGFOOD_TESTPASS_TOKEN or TESTPASS_TOKEN is missing.",
      "Set the GitHub secret so the nightly dogfood workflow can create a fresh testpass_runs row.",
      "Missing DOGFOOD_TESTPASS_TOKEN or TESTPASS_TOKEN.",
      {
        reasonCode: "missing_credential",
        nextProof: "Set one TestPass workflow secret, then rerun the dogfood report workflow.",
      },
    );
  }

  try {
    const { ok, status, json } = await postJson(`${apiBase}/api/testpass-run`, token, {
      pack_id: "testpass-core",
      profile: "smoke",
      server_url: mcpUrl,
      source: "scheduled",
    });

    if (!ok) {
      return failureResult(
        "testpass",
        "TestPass",
        `Scheduled TestPass API call returned HTTP ${status}.`,
        json.error ? `API error: ${json.error}` : "The API did not return an error body.",
      );
    }

    const summary = json.verdict_summary || {};
    const failCount = Number(summary.fail || 0);
    const total = Number(summary.total || 0);
    const runId = json.run_id || "unknown";
    if (json.status === "complete" && failCount === 0) {
      return passResult(
        "testpass",
        "TestPass",
        `Scheduled TestPass completed with ${total} checks and 0 failures.`,
        `Run ${runId} checked ${mcpUrl}.`,
        {
          runId,
          targetUrl: mcpUrl,
          proof: { kind: "testpass_run", runId, targetUrl: mcpUrl },
        },
      );
    }

    const statusLabel = json.status || "unknown";
    return result(
      "testpass",
      "TestPass",
      statusFromFailureKind(statusLabel === "running" ? "pending" : "http"),
      `Scheduled TestPass returned status ${statusLabel} with ${failCount} failures.`,
      `Run ${runId} checked ${mcpUrl}.`,
      {
        runId,
        targetUrl: mcpUrl,
        proof: { kind: "testpass_run", runId, targetUrl: mcpUrl },
      },
    );
  } catch (err) {
    return failureResult(
      "testpass",
      "TestPass",
      "Scheduled TestPass could not reach the API.",
      err instanceof Error ? err.message : String(err),
    );
  }
}

async function runUXPass() {
  const token = process.env.DOGFOOD_UXPASS_TOKEN || process.env.UXPASS_TOKEN || process.env.CRON_SECRET || "";
  if (dryRun) {
    return passResult(
      "uxpass",
      "UXPass",
      "Dry-run receipt builder validated the UXPass result shape.",
      "Dry run only. Live workflow calls /api/uxpass-run against the public URL.",
    );
  }
  if (!token) {
    return blockedResult(
      "uxpass",
      "UXPass",
      "Scheduled UXPass could not run because DOGFOOD_UXPASS_TOKEN, UXPASS_TOKEN, or CRON_SECRET is missing.",
      "Set one workflow secret so the nightly dogfood workflow can create a fresh uxpass_runs row.",
      "Missing DOGFOOD_UXPASS_TOKEN, UXPASS_TOKEN, or CRON_SECRET.",
      {
        reasonCode: "missing_credential",
        nextProof: "Set one UXPass workflow secret, then rerun the dogfood report workflow.",
      },
    );
  }

  try {
    const { ok, status, json } = await postJson(`${apiBase}/api/uxpass-run`, token, {
      url: publicUrl,
      target_url: publicUrl,
      source: "scheduled",
    });

    if (!ok) {
      return failureResult(
        "uxpass",
        "UXPass",
        `Scheduled UXPass API call returned HTTP ${status}.`,
        json.error ? `API error: ${json.error}` : "The API did not return an error body.",
      );
    }

    const runId = json.run_id || "unknown";
    const uxScore = typeof json.ux_score === "number" ? json.ux_score : null;
    if (json.status === "complete" && (uxScore === null || uxScore >= 80)) {
      return passResult(
        "uxpass",
        "UXPass",
        `Scheduled UXPass completed${uxScore === null ? "" : ` with UX score ${uxScore}`}.`,
        `Run ${runId} checked ${publicUrl}.`,
        {
          runId,
          targetUrl: publicUrl,
          proof: { kind: "uxpass_run", runId, targetUrl: publicUrl },
        },
      );
    }

    return failureResult(
      "uxpass",
      "UXPass",
      `Scheduled UXPass returned status ${json.status || "unknown"}${uxScore === null ? "" : ` with UX score ${uxScore}`}.`,
      `Run ${runId} checked ${publicUrl}.`,
      {
        runId,
        targetUrl: publicUrl,
        proof: { kind: "uxpass_run", runId, targetUrl: publicUrl },
      },
    );
  } catch (err) {
    return failureResult(
      "uxpass",
      "UXPass",
      "Scheduled UXPass could not reach the API.",
      err instanceof Error ? err.message : String(err),
    );
  }
}

function buildTrend(results) {
  const today = generatedAt.slice(0, 10);
  return [{
    date: today,
    passing: results.filter((result) => result.status === "passing").length,
    failing: results.filter((result) => result.status === "failing").length,
    blocked: results.filter((result) => result.status === "blocked").length,
    pending: results.filter((result) => result.status === "pending").length,
  }];
}

function buildStatus(results) {
  if (results.some((result) => result.status === "failing")) return "failing";
  if (results.some((result) => result.status === "blocked")) return "blocked";
  if (results.some((result) => result.status === "pending")) return "pending";
  return "passing";
}

function buildLastActionableFailure(results) {
  const failing = results.find((result) => result.status === "failing" || result.status === "blocked");
  if (!failing) {
    return {
      title: "No actionable dogfood failure in the latest receipt",
      detail: "The live checks that ran in this receipt did not report a blocking failure.",
      owner: "Dogfood automation",
    };
  }

  return {
    title: `${failing.name} needs attention`,
    detail: failing.blockedReason ? `${failing.summary} Blocked reason: ${failing.blockedReason}` : failing.summary,
    owner: "Dogfood automation",
  };
}

const results = [
  await runTestPass(),
  pendingResult(
    "commonsensepass",
    "CommonSensePass",
    "Worker sanity-gate code exists, but the public dogfood board does not yet publish its receipt.",
    "CommonSensePass guards false healthy, done, no-work, duplicate, and route claims before workers move state.",
    {
      nextProof: "Publish the CommonSensePass receipt in public dogfood and include it in XPass receipts.",
    },
  ),
  await runUXPass(),
  blockedResult(
    "securitypass",
    "SecurityPass",
    "SecurityPass has a scope-verified runner, but public recurring probes remain blocked until a safe schedule exists.",
    "The deterministic package and MCP surface exist; the public dogfood receipt does not run security probes yet.",
    "SecurityPass public dogfood is intentionally blocked until a deny-by-default recurring proof lands.",
    {
      reasonCode: "scope_gate",
      nextProof: "Land a safe recurring SecurityPass runner receipt before marking this passing.",
    },
  ),
  pendingResult(
    "seopass",
    "SEOPass",
    "Deterministic SEOPass package proof exists, but the public dogfood board has no recurring SEO receipt yet.",
    "SEOPass should feed public search and metadata evidence through the shared GEOPass scanner contract.",
    { nextProof: "Wire a recurring SEOPass receipt before moving this out of pending." },
  ),
  pendingResult(
    "copypass",
    "CopyPass",
    "Deterministic CopyPass package proof exists, but the public dogfood board has no recurring copy receipt yet.",
    "CopyPass should check public wording, docs, and exact-source copy claims before XPass marks copy surfaces covered.",
    { nextProof: "Wire a recurring CopyPass receipt before moving this out of pending." },
  ),
  pendingResult(
    "legalpass",
    "LegalPass",
    "Deterministic LegalPass package proof exists, but the public dogfood board has no recurring policy/claims receipt yet.",
    "LegalPass should stay guidance-only and call out what was not reviewed.",
    { nextProof: "Wire a recurring LegalPass receipt before moving this out of pending." },
  ),
  pendingResult(
    "sloppass",
    "SlopPass",
    "Deterministic SlopPass package proof exists, but the public dogfood board has no recurring diff-quality receipt yet.",
    "SlopPass can inspect provided source or unified diffs without executing code or making paid model calls.",
    { nextProof: "Wire a SlopPass diff receipt into XPass PR proof." },
  ),
  pendingResult(
    "flowpass",
    "FlowPass",
    "FlowPass is a plan-only package; live journey receipts are not wired yet.",
    "FlowPass should prove important user journeys end-to-end once safe target routes are declared.",
    { nextProof: "Add one login-free journey receipt before moving FlowPass out of pending." },
  ),
  pendingResult(
    "geopass",
    "GEOPass",
    "GEOPass is a plan-only package; live generative-engine readiness scans are not wired yet.",
    "GEOPass owns the shared scanner contract that SEOPass and public AI-readiness checks can consume.",
    { nextProof: "Connect GEOPass scanner evidence to public dogfood." },
  ),
  pendingResult(
    "rotatepass",
    "RotatePass",
    "RotatePass has a safe metadata contract, but no public credential-health receipt is published yet.",
    "RotatePass must not expose secret values; it should only report metadata such as owner, age, and verification target.",
    { nextProof: "Add a metadata-only RotatePass receipt with redaction proof." },
  ),
  pendingResult(
    "wakepass",
    "WakePass",
    "WakePass reliability checks exist internally, but no public-safe stale-ACK receipt is published yet.",
    "WakePass should surface action-needed handoffs, missed ACKs, and stale dispatch cleanup without creating noise.",
    { nextProof: "Publish a public-safe WakePass receipt for stale ACK cleanup." },
  ),
  pendingResult(
    "enterprisepass",
    "EnterprisePass",
    "Seed enterprise-readiness report is published; automated evidence checks are not live yet.",
    "See /enterprise/latest.json for the readiness-report boundary and pending category map.",
    {
      proof: { kind: "planned", targetUrl: "/enterprise/latest.json" },
      nextProof: "Wire automated evidence checks before moving this beyond readiness guidance.",
    },
  ),
];

const report = {
  generatedAt,
  lastRunAt: generatedAt,
  status: buildStatus(results),
  source: dryRun ? "dogfood receipt dry run" : "nightly dogfood workflow",
  headline: "We dogfood UnClick on UnClick.",
  target: "UnClick public and agent-facing product surfaces",
  nextAutomation: "Nightly dogfood receipts refresh this board with live scheduled evidence.",
  statusLegend,
  proofPolicy,
  xpassIndex,
  results,
  trend: buildTrend(results),
  lastActionableFailure: buildLastActionableFailure(results),
};

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);

console.log(`Wrote dogfood report to ${outputPath}`);
console.log(JSON.stringify({
  generatedAt: report.generatedAt,
  status: report.status,
  passing: report.trend[0].passing,
  failing: report.trend[0].failing,
  blocked: report.trend[0].blocked,
  pending: report.trend[0].pending,
}, null, 2));
