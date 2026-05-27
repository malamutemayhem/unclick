#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const rawArgs = process.argv.slice(2);
const args = new Set(rawArgs);
const dryRun = args.has("--dry-run") || process.env.DOGFOOD_DRY_RUN === "1";
const outputPath = argValue("--output", "public/dogfood/latest.json");
const compliancepassReceiptPath = argValue("--compliancepass-receipt", "public/enterprise/latest.json");
const requestedMaxCompliancepassAgeHours = Number(argValue(
  "--max-compliancepass-age-hours",
  process.env.DOGFOOD_COMPLIANCEPASS_MAX_AGE_HOURS || "168",
));
const maxCompliancepassAgeHours =
  Number.isFinite(requestedMaxCompliancepassAgeHours) && requestedMaxCompliancepassAgeHours > 0
    ? requestedMaxCompliancepassAgeHours
    : 168;

const apiBase = trimTrailingSlash(process.env.DOGFOOD_API_BASE || "https://unclick.world");
const publicUrl = process.env.DOGFOOD_PUBLIC_URL || "https://unclick.world";
const mcpUrl = process.env.DOGFOOD_MCP_URL || "https://unclick.world/api/mcp";
const generatedAt = new Date().toISOString();

function argValue(name, fallback) {
  const index = rawArgs.indexOf(name);
  return index >= 0 && rawArgs[index + 1] ? rawArgs[index + 1] : fallback;
}

const statusLegend = {
  passing: "A live check ran and returned a passing result.",
  failing: "A live check ran and returned a failing result or could not reach its API.",
  blocked: "The check needs action before it can be marked passing, such as a missing credential, scope gate, or high-severity readiness gap.",
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
    stage: "scope_gated",
    label: "Scope-gated",
    automation: "Blocked public receipt until safe recurring proof exists",
    mentionProfile: "Low mention volume by design because unsafe probes stay disabled.",
    nextStep: "Add a deny-by-default recurring runner proof before live security checks.",
  },
  {
    id: "seopass",
    name: "SEOPass",
    stage: "planned",
    label: "Planned",
    automation: "Scaffold-only public receipt",
    mentionProfile: "Low mention volume until a recurring search and metadata runner lands.",
    nextStep: "Define the smallest recurring metadata proof.",
  },
  {
    id: "copypass",
    name: "CopyPass",
    stage: "planned",
    label: "Planned",
    automation: "Scaffold-only public receipt",
    mentionProfile: "Low mention volume until copy checks become scheduled evidence.",
    nextStep: "Define the copy quality receipt shape.",
  },
  {
    id: "legalpass",
    name: "LegalPass",
    stage: "planned",
    label: "Planned",
    automation: "Scaffold-only public receipt",
    mentionProfile: "Low mention volume until policy and claims checks become scheduled evidence.",
    nextStep: "Keep guidance-only until legal review boundaries are explicit.",
  },
  {
    id: "compliancepass",
    name: "CompliancePass",
    stage: "live_dogfood",
    label: "Readiness evidence",
    automation: "Local deterministic scanner and public readiness receipt",
    mentionProfile: "Low mention volume unless readiness evidence, claims, or docs drift.",
    nextStep: "Keep report language conservative and link more XPass receipts as they mature.",
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

function ageHoursSince(isoTimestamp) {
  const timestamp = Date.parse(isoTimestamp);
  if (!Number.isFinite(timestamp)) return Number.POSITIVE_INFINITY;
  return Math.max(0, (Date.parse(generatedAt) - timestamp) / (60 * 60 * 1000));
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

async function runCompliancePassReceipt() {
  const receiptPath = compliancepassReceiptPath;
  try {
    const receipt = JSON.parse(await fs.readFile(receiptPath, "utf8"));
    const complete =
      receipt.product === "CompliancePass" &&
      receipt.status === "complete" &&
      receipt.summary?.checks_pending === 0 &&
      typeof receipt.readiness_score?.value === "number";

    if (!complete) {
      return pendingResult(
        "compliancepass",
        "CompliancePass",
        "CompliancePass public receipt exists but is not complete yet.",
        "See /enterprise/latest.json for the readiness-report boundary and current category map.",
        {
          proof: { kind: "public_receipt", targetUrl: "/enterprise/latest.json" },
          nextProof: "Run npm run compliancepass:report after building @unclick/compliancepass.",
        },
      );
    }

    const receiptAgeHours = ageHoursSince(receipt.generated_at);
    if (!Number.isFinite(receiptAgeHours) || receiptAgeHours > maxCompliancepassAgeHours) {
      return blockedResult(
        "compliancepass",
        "CompliancePass",
        "CompliancePass public receipt exists but is stale.",
        "See /enterprise/latest.json for the readiness-report boundary and current category map.",
        `CompliancePass receipt is older than ${maxCompliancepassAgeHours} hour(s).`,
        {
          reasonCode: "stale_receipt",
          score: receipt.readiness_score.value,
          band: receipt.readiness_band,
          proof: {
            kind: "compliancepass_report",
            targetUrl: "/enterprise/latest.json",
            checksTotal: receipt.summary.checks_total,
            highSeverityGaps: typeof receipt.summary?.blocking_gap_count === "number"
              ? receipt.summary.blocking_gap_count
              : 0,
            generatedAt: receipt.generated_at,
            ageHours: Math.round(receiptAgeHours * 10) / 10,
            maxAgeHours: maxCompliancepassAgeHours,
          },
          nextProof: "Regenerate /enterprise/latest.json with npm run compliancepass:report, then rerun dogfood.",
        },
      );
    }

    const highSeverityGaps = Array.isArray(receipt.gaps)
      ? receipt.gaps.filter((gap) => gap?.severity === "critical" || gap?.severity === "high")
      : [];
    const blockingGapCount = typeof receipt.summary?.blocking_gap_count === "number"
      ? receipt.summary.blocking_gap_count
      : highSeverityGaps.length;
    if (receipt.readiness_band !== "green" || blockingGapCount > 0) {
      return blockedResult(
        "compliancepass",
        "CompliancePass",
        `CompliancePass scanned ${receipt.summary.checks_total} readiness checks and scored ${receipt.readiness_score.value}/100, but the receipt is ${receipt.readiness_band}.`,
        "See /enterprise/latest.json for the evidence-backed readiness report and remaining gaps.",
        `CompliancePass readiness is ${receipt.readiness_band}; ${blockingGapCount} high/critical gap(s) remain.`,
        {
          reasonCode: "readiness_gap",
          score: receipt.readiness_score.value,
          band: receipt.readiness_band,
          proof: {
            kind: "compliancepass_report",
            targetUrl: "/enterprise/latest.json",
            checksTotal: receipt.summary.checks_total,
            highSeverityGaps: blockingGapCount,
          },
          nextProof: "Resolve or explicitly route high/critical CompliancePass gaps, then regenerate /enterprise/latest.json.",
        },
      );
    }

    return passResult(
      "compliancepass",
      "CompliancePass",
      `CompliancePass scanned ${receipt.summary.checks_total} readiness checks and scored ${receipt.readiness_score.value}/100.`,
      "See /enterprise/latest.json for the evidence-backed readiness report.",
      {
        reasonCode: "public_receipt_complete",
        score: receipt.readiness_score.value,
        band: receipt.readiness_band,
        proof: {
          kind: "compliancepass_report",
          targetUrl: "/enterprise/latest.json",
          checksTotal: receipt.summary.checks_total,
        },
      },
    );
  } catch (err) {
    return pendingResult(
      "compliancepass",
      "CompliancePass",
      "CompliancePass public receipt could not be read.",
      "Generate public/enterprise/latest.json before publishing the dogfood receipt.",
      {
        proof: { kind: "missing", targetUrl: "/enterprise/latest.json" },
        nextProof: `Run npm run compliancepass:report. Last error: ${err instanceof Error ? err.message : String(err)}`,
      },
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
  await runUXPass(),
  blockedResult(
    "securitypass",
    "SecurityPass",
    "SecurityPass is blocked until the recurring runner proof is ready.",
    "SecurityPass remains scope-gated; the public dogfood receipt does not run security probes yet.",
    "SecurityPass is intentionally deny-all/scope-gated until a safe recurring runner proof lands.",
    {
      reasonCode: "scope_gate",
      nextProof: "Land a safe recurring SecurityPass runner receipt before marking this passing.",
    },
  ),
  pendingResult(
    "seopass",
    "SEOPass",
    "Queued for recurring search and metadata review.",
    "SEOPass is still scaffold-only for public dogfood receipts.",
    { nextProof: "Add a recurring SEOPass receipt before moving this out of pending." },
  ),
  pendingResult(
    "copypass",
    "CopyPass",
    "Queued for recurring copy quality review.",
    "CopyPass recurring public receipts will land after the runner surface is available.",
    { nextProof: "Add a recurring CopyPass receipt before moving this out of pending." },
  ),
  pendingResult(
    "legalpass",
    "LegalPass",
    "Queued for recurring policy and claims review.",
    "LegalPass recurring public receipts will land after the runner surface is available.",
    { nextProof: "Add a recurring LegalPass receipt before moving this out of pending." },
  ),
  await runCompliancePassReceipt(),
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
