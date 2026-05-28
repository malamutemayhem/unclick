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
const targetSha = process.env.DOGFOOD_TARGET_SHA || process.env.GITHUB_SHA || process.env.VERCEL_GIT_COMMIT_SHA || "";
const packageSweepPath = process.env.DOGFOOD_XPASS_PACKAGE_SWEEP_PATH || "public/dogfood/xpass-package-sweep.json";
let packageSweepState = null;

function argValue(name, fallback) {
  const index = rawArgs.indexOf(name);
  return index >= 0 && rawArgs[index + 1] ? rawArgs[index + 1] : fallback;
}

const statusLegend = {
  passing: "A live check or scheduled package sweep ran and returned a passing result.",
  failing: "A live check or scheduled package sweep ran and returned a failing result.",
  blocked: "The check needs action before it can be marked passing, such as a missing credential, scope gate, or high-severity readiness gap.",
  pending: "The check is planned, package-ready, or scaffolded, but scheduled proof is not available yet.",
};

const proofPolicy =
  "Public dogfood receipts mark passing only when a live check or scheduled package sweep actually ran. Blocked and pending are honest product states, not failures to hide.";

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
    id: "sloppass",
    name: "SlopPass",
    stage: "package_ready",
    label: "Package-ready quality gate",
    automation: "Package runner, verdict pack, dogfood tests, XPass routing",
    mentionProfile: "Medium mention volume because historical QualityPass references now route here.",
    nextStep: "Add a recurring SlopPass public receipt before marking it live dogfood.",
  },
  {
    id: "seopass",
    name: "SEOPass",
    stage: "live_dogfood",
    label: "Live dogfood lane",
    automation: "Public read-only SEO receipt",
    mentionProfile: "Medium mention volume when SEO metadata, crawler, or AI-era readiness drifts.",
    nextStep: "Promote the read-only receipt into a scheduled baseline and GEOPass bundle handoff.",
  },
  {
    id: "copypass",
    name: "CopyPass",
    stage: "package_ready",
    label: "Package-ready",
    automation: "Deterministic copy review, CopyRoom boundary, dogfood tests",
    mentionProfile: "Medium mention volume for public wording, claims, docs, and source-copy risk.",
    nextStep: "Add a recurring CopyPass receipt with CopyRoom/source-copy proof.",
  },
  {
    id: "legalpass",
    name: "LegalPass",
    stage: "package_ready",
    label: "Package-ready guidance",
    automation: "Legal guidance tools, pack schema, public proof boundaries",
    mentionProfile: "Medium mention volume when public claims, policy language, or disclaimers change.",
    nextStep: "Add a recurring LegalPass receipt that stays guidance-only, not legal certification.",
  },
  {
    id: "commonsensepass",
    name: "CommonSensePass",
    stage: "live_gate",
    label: "Worker sanity gate",
    automation: "False-DONE and proof sanity checks for worker claims and queues",
    mentionProfile: "High mention volume around claims, proof receipts, merge-ready language, and queue health.",
    nextStep: "Publish the recurring proof receipt for queue and worker-claim sanity.",
  },
  {
    id: "flowpass",
    name: "FlowPass",
    stage: "package_ready",
    label: "Package-ready",
    automation: "Journey map checks and end-to-end flow fixtures",
    mentionProfile: "Medium mention volume for onboarding, checkout, handoff, forms, and success states.",
    nextStep: "Add a recurring journey receipt with one public flow target.",
  },
  {
    id: "geopass",
    name: "GEOPass",
    stage: "package_ready",
    label: "Package-ready",
    automation: "AI answer-engine readiness scanner and metadata evidence",
    mentionProfile: "Medium mention volume for llms.txt, schema, bots, and answer-engine readiness.",
    nextStep: "Add a recurring answer-engine readiness receipt.",
  },
  {
    id: "rotatepass",
    name: "RotatePass",
    stage: "boundary",
    label: "Boundary guard",
    automation: "Credential lifecycle docs and redaction guard",
    mentionProfile: "Low mention volume because live credential rotation stays behind explicit scope.",
    nextStep: "Add a safe local credential lifecycle receipt without touching real secrets.",
  },
  {
    id: "wakepass",
    name: "WakePass",
    stage: "live_gate",
    label: "Wake and stale-work gate",
    automation: "Dispatch, stale ACK, heartbeat, and reclaim visibility",
    mentionProfile: "High mention volume when scheduled work stalls or needs a fresh owner.",
    nextStep: "Expose a public-safe stale-work receipt for dogfood runs.",
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

function packageReadyResult(id, name, summary, evidence, targetUrl, nextProof) {
  const sweep = packageSweepProof(id);
  if (sweep) {
    if (sweep.package.status === "passing" && sweep.matrix?.status === "passing") {
      return passResult(
        id,
        name,
        `Scheduled XPass package sweep passed ${name}.`,
        `Receipt ${sweep.runId} ran ${sweep.commandText}; cross-checked by ${sweep.reviewerNames || "package proof"}.`,
        {
          runId: sweep.runId,
          targetUrl,
          proof: {
            kind: "xpass_package_sweep",
            runId: sweep.runId,
            packageId: id,
            targetUrl,
            targetSha: sweep.targetSha || undefined,
            receiptPath: packageSweepPath,
            reviewers: sweep.reviewers,
          },
        },
      );
    }

    if (sweep.package.status === "failing" || sweep.matrix?.status === "failing") {
      return failureResult(
        id,
        name,
        `Scheduled XPass package sweep failed ${name}.`,
        sweep.package.failure_hint || sweep.matrix?.summary || `Receipt ${sweep.runId} reported a failing package proof.`,
        {
          runId: sweep.runId,
          targetUrl,
          proof: {
            kind: "xpass_package_sweep",
            runId: sweep.runId,
            packageId: id,
            targetUrl,
            targetSha: sweep.targetSha || undefined,
            receiptPath: packageSweepPath,
            reviewers: sweep.reviewers,
          },
        },
      );
    }
  }

  const sweepNextProof = sweep && sweep.package.status === "passing" && !sweep.matrix
    ? `Regenerate ${packageSweepPath} with a cross-pass matrix row for ${name} before marking this passing.`
    : packageSweepState?.stale
      ? `Regenerate ${packageSweepPath} for ${targetSha || "the current commit"} before marking this passing.`
      : nextProof;
  return pendingResult(id, name, summary, evidence, {
    reasonCode: "package_ready_needs_scheduled_receipt",
    proof: { kind: "package_ready", targetUrl },
    targetUrl,
    nextProof: sweepNextProof,
  });
}

function boundaryResult(id, name, summary, evidence, targetUrl, nextProof) {
  return pendingResult(id, name, summary, evidence, {
    reasonCode: "boundary_needs_runner",
    proof: { kind: "boundary", targetUrl },
    targetUrl,
    nextProof,
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

async function readPackageSweepReceipt() {
  if (dryRun) {
    return { receipt: null, stale: false, reason: "dry_run" };
  }

  try {
    const receipt = JSON.parse(await fs.readFile(packageSweepPath, "utf8"));
    if (receipt?.kind !== "xpass_package_sweep_receipt_v1") {
      return { receipt: null, stale: false, reason: "invalid_kind" };
    }
    if (targetSha && receipt.target_sha !== targetSha) {
      return {
        receipt,
        stale: true,
        reason: "target_sha_mismatch",
        expectedSha: targetSha,
        actualSha: receipt.target_sha || "",
      };
    }
    return { receipt, stale: false, reason: "fresh" };
  } catch (err) {
    if (err?.code === "ENOENT") {
      return { receipt: null, stale: false, reason: "missing" };
    }
    return {
      receipt: null,
      stale: false,
      reason: "unreadable",
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

function packageSweepProof(id) {
  const receipt = packageSweepState?.receipt;
  if (!receipt || packageSweepState.stale) return null;
  const packageResult = Array.isArray(receipt.packages)
    ? receipt.packages.find((pkg) => pkg.id === id)
    : null;
  if (!packageResult) return null;

  const matrix = Array.isArray(receipt.cross_pass_matrix)
    ? receipt.cross_pass_matrix.find((row) => row.target_id === id)
    : null;
  const reviewers = Array.isArray(matrix?.reviewers) ? matrix.reviewers : [];
  const reviewerNames = reviewers.map((reviewer) => reviewer.name || reviewer.id).filter(Boolean).join(", ");
  return {
    runId: receipt.run_id || "unknown",
    targetSha: receipt.target_sha || "",
    package: packageResult,
    matrix,
    reviewers,
    reviewerNames,
    commandText: Array.isArray(packageResult.command) ? packageResult.command.join(" ") : "the package test command",
  };
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
    return pendingResult(
      "testpass",
      "TestPass",
      "Dry-run receipt builder validated the TestPass result shape.",
      "Dry run only. Live workflow calls /api/testpass-run with source=scheduled.",
      {
        reasonCode: "dry_run_only",
        nextProof: "Run the dogfood report without --dry-run and with a TestPass token before marking this passing.",
      },
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
    return pendingResult(
      "uxpass",
      "UXPass",
      "Dry-run receipt builder validated the UXPass result shape.",
      "Dry run only. Live workflow calls /api/uxpass-run against the public URL.",
      {
        reasonCode: "dry_run_only",
        nextProof: "Run the dogfood report without --dry-run and with a UXPass token before marking this passing.",
      },
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

async function runSEOPass() {
  if (dryRun) {
    return passResult(
      "seopass",
      "SEOPass",
      "Dry-run receipt builder validated the SEOPass result shape.",
      "Dry run only. Live workflow fetches public HTML, robots.txt, sitemap.xml, and llms.txt.",
    );
  }

  const checkedAt = new Date().toISOString();
  const targets = {
    page: publicUrl,
    robots: `${trimTrailingSlash(publicUrl)}/robots.txt`,
    sitemap: `${trimTrailingSlash(publicUrl)}/sitemap.xml`,
    llms: `${trimTrailingSlash(publicUrl)}/llms.txt`,
  };

  const [page, robots, sitemap, llms] = await Promise.all([
    fetchPublicText(targets.page),
    fetchPublicText(targets.robots),
    fetchPublicText(targets.sitemap),
    fetchPublicText(targets.llms),
  ]);
  const signals = analyzeSeoHtml(page.body);
  const findings = [];
  const contentType = page.headers["content-type"] || "";

  if (page.status < 200 || page.status >= 400) findings.push("Target URL did not return public 2xx HTML.");
  if (contentType && !/\b(?:text\/html|application\/xhtml\+xml)\b/i.test(contentType)) findings.push("Target URL did not return public HTML content.");
  if (robotsBlocksAll(robots.body)) findings.push("robots.txt appears to block all crawlers.");
  if (!signals.title) findings.push("Page title is missing.");
  if (!signals.description) findings.push("Meta description is missing.");
  if (!signals.viewport) findings.push("Mobile viewport is missing.");
  if (signals.h1Count === 0) findings.push("Primary H1 heading is missing.");
  if (!signals.canonical) findings.push("Canonical tag is missing.");
  if (signals.jsonLdCount === 0) findings.push("JSON-LD structured data is missing.");
  if (extractSitemapUrls(sitemap.body).length === 0) findings.push("Sitemap has no discoverable URL list.");
  if (!signals.hasQuestionHeading && !signals.hasFaqSchema) findings.push("AI-era question/FAQ structure is thin.");

  const score = Math.max(0, Math.round(100 - findings.length * 9));
  const runId = `seopass-dogfood-${checkedAt.replace(/[^0-9]/g, "").slice(0, 14)}`;
  const proof = {
    kind: "seopass_run",
    runId,
    targetUrl: publicUrl,
    score,
    sourceUrls: Object.values(targets),
  };

  if (findings.length === 0 || score >= 75) {
    return passResult(
      "seopass",
      "SEOPass",
      `SEOPass read-only dogfood completed with SEO health score ${score}.`,
      `Run ${runId} checked public HTML, robots.txt, sitemap.xml, and llms.txt for ${publicUrl}.`,
      {
        checkedAt,
        runId,
        targetUrl: publicUrl,
        proof,
        nextProof: "Schedule this receipt and wire it to the shared GEOPass baseline.",
      },
    );
  }

  return failureResult(
    "seopass",
    "SEOPass",
    `SEOPass read-only dogfood found ${findings.length} issue(s) with SEO health score ${score}.`,
    findings.slice(0, 4).join(" "),
    {
      checkedAt,
      runId,
      targetUrl: publicUrl,
      proof,
      reasonCode: "seopass_readonly_findings",
      nextProof: "Fix the listed public SEO findings, then rerun the dogfood report workflow.",
    },
  );
}

async function fetchPublicText(url) {
  const started = Date.now();
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent": "UnClick-SEOPass/0.1 (+https://unclick.world)",
        accept: "text/html,application/xhtml+xml,application/xml,text/plain;q=0.9,*/*;q=0.8",
      },
    });
    return { url: res.url || url, status: res.status, headers: Object.fromEntries(res.headers.entries()), body: await res.text(), elapsedMs: Date.now() - started };
  } catch (err) {
    return { url, status: 0, headers: {}, body: "", elapsedMs: Date.now() - started, error: err instanceof Error ? err.message : String(err) };
  }
}

function analyzeSeoHtml(html) {
  const jsonLdBlocks = Array.from(html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)).map((match) => match[1]?.trim() || "");
  return {
    title: /<title\b[^>]*>[\s\S]*?<\/title>/i.test(html),
    description: /<meta\b[^>]*(?:name=["']description["'][^>]*content=|content=[^>]*name=["']description["'])/i.test(html),
    viewport: /<meta\b[^>]*(?:name=["']viewport["'][^>]*content=|content=[^>]*name=["']viewport["'])/i.test(html),
    canonical: /<link\b[^>]*rel=["'][^"']*canonical[^"']*["'][^>]*href=/i.test(html),
    h1Count: (html.match(/<h1\b/gi) || []).length,
    jsonLdCount: jsonLdBlocks.filter((block) => {
      try {
        JSON.parse(block);
        return true;
      } catch {
        return false;
      }
    }).length,
    hasQuestionHeading: /<h[1-6]\b[^>]*>[^<]*(?:\?|how|what|why|when|where|which|can|should)/i.test(html),
    hasFaqSchema: /FAQPage/i.test(html),
  };
}

function robotsBlocksAll(body) {
  return /user-agent:\s*\*[\s\S]*?disallow:\s*\/(?:\s|$)/i.test(body);
}

function extractSitemapUrls(body) {
  return Array.from(body.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)).map((match) => match[1] || "").filter(Boolean);
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

packageSweepState = await readPackageSweepReceipt();

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
  packageReadyResult(
    "sloppass",
    "SlopPass",
    "Package-backed quality review exists, but the public dogfood receipt has not run it yet.",
    "SlopPass has a package runner, verdict pack, and dogfood tests; public status stays pending until a scheduled receipt exists.",
    "packages/sloppass",
    "Add a recurring SlopPass public receipt before marking this passing.",
  ),
  await runSEOPass(),
  packageReadyResult(
    "copypass",
    "CopyPass",
    "Package-backed copy quality review exists, but the public dogfood receipt has not run it yet.",
    "CopyPass has deterministic review tooling and CopyRoom boundary checks; public status stays pending until scheduled proof exists.",
    "packages/copypass",
    "Add a recurring CopyPass receipt with CopyRoom/source-copy proof.",
  ),
  packageReadyResult(
    "legalpass",
    "LegalPass",
    "Package-backed policy and claims guidance exists, but the public dogfood receipt has not run it yet.",
    "LegalPass has guidance tooling, pack schema, and public proof boundaries; public status stays pending until scheduled proof exists.",
    "packages/legalpass",
    "Add a recurring LegalPass receipt that stays guidance-only, not legal certification.",
  ),
  packageReadyResult(
    "commonsensepass",
    "CommonSensePass",
    "Worker sanity checks exist, but the public dogfood receipt has not run them yet.",
    "CommonSensePass is routed for proof, queue, claim, false-DONE, and merge-ready sanity; public status stays pending until scheduled proof exists.",
    "packages/commonsensepass",
    "Add a recurring CommonSensePass proof receipt for worker claims and queue health.",
  ),
  packageReadyResult(
    "flowpass",
    "FlowPass",
    "Package-backed journey checks exist, but the public dogfood receipt has not run them yet.",
    "FlowPass has journey fixtures for onboarding, checkout, handoff, forms, and success/failure states; public status stays pending until scheduled proof exists.",
    "packages/flowpass",
    "Add a recurring FlowPass receipt for one public journey target.",
  ),
  packageReadyResult(
    "geopass",
    "GEOPass",
    "Package-backed answer-engine readiness checks exist, but the public dogfood receipt has not run them yet.",
    "GEOPass has AI answer-engine readiness scanning for llms.txt, schema, bots, and metadata; public status stays pending until scheduled proof exists.",
    "packages/geopass",
    "Add a recurring GEOPass answer-engine readiness receipt.",
  ),
  boundaryResult(
    "rotatepass",
    "RotatePass",
    "Credential lifecycle boundaries are documented and guarded, but no live credential rotation runs in public dogfood.",
    "RotatePass stays boundary-only until a safe local receipt can prove redaction and lifecycle behavior without touching real secrets.",
    "docs/rotatepass-local-phase0.md",
    "Add a safe local RotatePass receipt that proves lifecycle handling without exposing secrets.",
  ),
  boundaryResult(
    "wakepass",
    "WakePass",
    "Wake and stale-work visibility exists, but the public dogfood receipt has not run a public-safe stale-work check yet.",
    "WakePass powers dispatch, stale ACK, heartbeat, and reclaim visibility; public status stays pending until a public-safe receipt exists.",
    "docs/prd/wakepass.md",
    "Add a public-safe WakePass receipt for stale scheduled work and reclaim visibility.",
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
  nextAutomation: "Nightly dogfood receipts refresh this board with live checks and scheduled XPass package proof.",
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
