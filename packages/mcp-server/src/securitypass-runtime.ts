/* eslint-disable @typescript-eslint/ban-ts-comment, no-var */
// @ts-nocheck
/* Generated from @unclick/securitypass source so Vercel bundles SecurityPass with the MCP function. */

// packages/securitypass/src/mcp/tools.ts
import { load as loadYaml } from "js-yaml";

// packages/securitypass/src/types/pack-schema.ts
import { z } from "zod";
var SeveritySchema = z.enum(["critical", "high", "medium", "low", "info"]);
var ProfileSchema = z.enum(["smoke", "standard", "deep"]);
var TargetSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["url", "git", "mcp", "api"]),
  url: z.string().url().optional(),
  repo: z.string().optional(),
  branch: z.string().optional(),
  notes: z.string().optional()
}).superRefine((target, ctx) => {
  if ((target.type === "url" || target.type === "api" || target.type === "mcp") && !target.url) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["url"],
      message: `${target.type} targets require a URL.`
    });
  }
  if (target.type === "git" && !target.repo) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["repo"],
      message: "git targets require a repo path."
    });
  }
});
var ScopeContractSchema = z.object({
  contract_id: z.string().min(1),
  proof_method: z.enum(["dns_txt", "well_known", "bug_bounty_program", "signed_email"]),
  expected_token: z.string().min(1).optional(),
  bug_bounty_program: z.enum(["hackerone", "bugcrowd", "intigriti", "yeswehack"]).optional(),
  in_scope_assets: z.array(z.string().min(1)).default([]),
  out_of_scope_assets: z.array(z.string().min(1)).default([]),
  signed_at: z.string().datetime().optional()
});
var CheckSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  severity: SeveritySchema,
  probe: z.string().min(1),
  description: z.string().optional(),
  expected: z.unknown().optional(),
  on_fail: z.string().optional(),
  remediation: z.string().optional(),
  tags: z.array(z.string()).default([]),
  profiles: z.array(ProfileSchema).default(["smoke", "standard", "deep"])
});
var HatSchema = z.object({
  id: z.string().min(1),
  role: z.enum([
    "pen_tester",
    "defensive_engineer",
    "appsec_specialist",
    "cloud_security",
    "supply_chain_auditor",
    "ai_ml_security",
    "compliance_auditor",
    "legal",
    "threat_intel",
    "customer"
  ]),
  veto: z.boolean().default(false),
  brief: z.string().optional()
});
var ThresholdsSchema = z.object({
  fail_on: z.array(SeveritySchema).default(["critical", "high"]),
  warn_on: z.array(SeveritySchema).default(["medium"]),
  min_pass_rate: z.number().min(0).max(1).default(0.9)
});
var HealBudgetSchema = z.object({
  max_attempts: z.number().int().min(0).default(0),
  max_cost_usd: z.number().min(0).default(0),
  max_wall_seconds: z.number().int().min(0).default(0)
});
var MonitorSchema = z.object({
  enabled: z.boolean().default(false),
  cron: z.string().optional(),
  channels: z.array(z.string()).default([]),
  diff_only: z.boolean().default(true)
});
var FixtureSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(["http_session", "credential_ref", "sample_payload", "graphql_query"]),
  vault_ref: z.string().optional(),
  value: z.unknown().optional()
}).superRefine((fixture, ctx) => {
  if (fixture.kind === "credential_ref" || fixture.kind === "http_session") {
    if (!fixture.vault_ref) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["vault_ref"],
        message: `${fixture.kind} fixtures require a BackstagePass vault reference.`
      });
    }
    if (fixture.value !== void 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["value"],
        message: `${fixture.kind} fixtures must not inline sensitive values.`
      });
    }
  }
});
var SecurityPackSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, "must be semver"),
  description: z.string().default(""),
  targets: z.array(TargetSchema).min(1),
  scope_contract: ScopeContractSchema,
  checks: z.array(CheckSchema).min(1),
  hats: z.array(HatSchema).default([]),
  thresholds: ThresholdsSchema.default({
    fail_on: ["critical", "high"],
    warn_on: ["medium"],
    min_pass_rate: 0.9
  }),
  heal_budget: HealBudgetSchema.default({
    max_attempts: 0,
    max_cost_usd: 0,
    max_wall_seconds: 0
  }),
  monitor: MonitorSchema.default({
    enabled: false,
    channels: [],
    diff_only: true
  }),
  fixtures: z.array(FixtureSchema).default([])
});

// packages/securitypass/src/runner/run-store.ts
import { randomUUID } from "node:crypto";
var RUNS = /* @__PURE__ */ new Map();
var FINDINGS = /* @__PURE__ */ new Map();
function emptySummary() {
  return { total: 0, check: 0, na: 0, fail: 0, other: 0, pending: 0, pass_rate: 0 };
}
var SECURITYPASS_DISCLAIMER = {
  headline: "SecurityPass is a scoped review, not a security guarantee.",
  body: "SecurityPass reports evidence-based security risks it can observe in the target and scope for this run. It does not certify that the system is secure, replace a penetration test, or verify every dependency, provider, environment, or future change.",
  compact: "Scoped review only. Not a pentest, certification, or guarantee of security."
};
function createRun(input) {
  const id = randomUUID();
  const row = {
    id,
    pack_id: input.pack_id,
    target: input.target,
    profile: input.profile ?? "smoke",
    status: "queued",
    verdict_summary: emptySummary(),
    scope_performed: [],
    not_checked: [],
    score: null,
    posture_summary: null,
    disclaimer: SECURITYPASS_DISCLAIMER,
    created_at: (/* @__PURE__ */ new Date()).toISOString(),
    completed_at: null
  };
  RUNS.set(id, row);
  FINDINGS.set(id, []);
  return row;
}
function getRun(runId) {
  return RUNS.get(runId);
}
function setRunStatus(runId, status) {
  const row = RUNS.get(runId);
  if (!row) return void 0;
  row.status = status;
  if (status !== "queued" && status !== "running") {
    row.completed_at = (/* @__PURE__ */ new Date()).toISOString();
  }
  RUNS.set(runId, row);
  return row;
}
function appendFinding(runId, finding) {
  const list = FINDINGS.get(runId) ?? [];
  const full = {
    ...finding,
    id: randomUUID(),
    run_id: runId,
    created_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  list.push(full);
  FINDINGS.set(runId, list);
  recomputeSummary(runId);
  return full;
}
function appendScopePerformed(runId, scopeLine) {
  const row = RUNS.get(runId);
  if (!row) return void 0;
  if (!row.scope_performed.includes(scopeLine)) {
    row.scope_performed.push(scopeLine);
  }
  RUNS.set(runId, row);
  return row;
}
function appendNotChecked(runId, item) {
  const row = RUNS.get(runId);
  if (!row) return void 0;
  row.not_checked.push(item);
  RUNS.set(runId, row);
  return row;
}
function setRunNarrative(runId, patch) {
  const row = RUNS.get(runId);
  if (!row) return void 0;
  row.score = patch.score;
  row.posture_summary = patch.posture_summary;
  RUNS.set(runId, row);
  return row;
}
function listFindings(runId) {
  return FINDINGS.get(runId) ?? [];
}
function getFinding(findingId) {
  for (const list of FINDINGS.values()) {
    const hit = list.find((f) => f.id === findingId);
    if (hit) return hit;
  }
  return void 0;
}
function recomputeSummary(runId) {
  const row = RUNS.get(runId);
  if (!row) return;
  const list = FINDINGS.get(runId) ?? [];
  const summary = emptySummary();
  summary.total = list.length;
  for (const f of list) {
    summary[f.verdict] += 1;
  }
  const decided = summary.check + summary.na + summary.fail + summary.other;
  summary.pass_rate = decided > 0 ? summary.check / decided : 0;
  row.verdict_summary = summary;
  RUNS.set(runId, row);
}

// packages/securitypass/src/runner/pack-store.ts
var PACKS = /* @__PURE__ */ new Map();
function registerPack(pack) {
  PACKS.set(pack.id, pack);
  return pack;
}
function getRegisteredPack(packId) {
  return PACKS.get(packId);
}
function __resetPackStoreForTests() {
  PACKS.clear();
}

// packages/securitypass/src/runner/security-headers.ts
var BASELINE_HEADERS = [
  "content-security-policy",
  "strict-transport-security",
  "x-frame-options",
  "x-content-type-options",
  "permissions-policy"
];
var SEVERITY_BY_HEADER = {
  "content-security-policy": "high",
  "strict-transport-security": "high",
  "x-frame-options": "medium",
  "x-content-type-options": "medium",
  "permissions-policy": "low"
};
async function checkSecurityHeaders(url, opts = {}) {
  const { timeoutMs = 1e4, fetchImpl = fetch } = opts;
  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), timeoutMs);
  let res;
  try {
    res = await fetchImpl(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal
    });
  } finally {
    clearTimeout(tid);
  }
  const checks = BASELINE_HEADERS.map((header) => {
    const value = res.headers.get(header);
    return {
      header,
      present: value !== null,
      value,
      severity: SEVERITY_BY_HEADER[header]
    };
  });
  const missing = checks.filter((c) => !c.present);
  const verdict = missing.length === 0 ? "check" : "fail";
  const on_fail_comment = missing.length === 0 ? void 0 : `Missing headers: ${missing.map((c) => c.header).join(", ")}`;
  return {
    url,
    fetched_at: (/* @__PURE__ */ new Date()).toISOString(),
    status_code: res.status,
    checks,
    verdict,
    on_fail_comment
  };
}
var SKELETON_TARGET_URL = "https://unclick.world";

// packages/securitypass/src/runner/reporter.ts
var SEVERITY_WEIGHT = {
  critical: 35,
  high: 20,
  medium: 10,
  low: 3,
  info: 0
};
function severityCounts(findings) {
  const counts = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    info: 0
  };
  for (const finding of findings) counts[finding.severity] += 1;
  return counts;
}
function computeScore(findings, notChecked2) {
  let score = 100;
  for (const finding of findings) {
    if (finding.verdict === "fail") score -= SEVERITY_WEIGHT[finding.severity];
  }
  score -= Math.min(25, notChecked2.length * 5);
  return Math.max(0, Math.round(score));
}
function postureSummary(findings, notChecked2) {
  const failing = findings.filter((finding) => finding.verdict === "fail");
  if (failing.length > 0) {
    const critical = failing.filter((finding) => finding.severity === "critical").length;
    const high = failing.filter((finding) => finding.severity === "high").length;
    return `SecurityPass found ${failing.length} failing security finding(s), including ${critical} critical and ${high} high. Review the evidence before treating this target as ready.`;
  }
  if (notChecked2.length > 0) {
    return `SecurityPass found no failing findings in the checks that ran, but ${notChecked2.length} check(s) were not performed. Treat this as incomplete coverage.`;
  }
  return "SecurityPass found no failing findings in the performed scope. This is still a scoped review, not a guarantee of security.";
}
function coverageNote(run) {
  if (run.not_checked.length === 0) {
    return "All selected checks returned evidence for this target and profile.";
  }
  return `${run.not_checked.length} selected check(s) were not performed. The run remains honest about untested areas.`;
}
function buildSecurityPassReport(run, findings) {
  const score = computeScore(findings, run.not_checked);
  const summary = postureSummary(findings, run.not_checked);
  return {
    run_id: run.id,
    status: run.status,
    target: run.target,
    profile: run.profile,
    disclaimer: run.disclaimer,
    posture_summary: summary,
    score,
    severity_counts: severityCounts(findings),
    verdict_summary: run.verdict_summary,
    scope_performed: run.scope_performed,
    findings,
    not_checked: run.not_checked,
    coverage_note: coverageNote(run),
    completed_at: run.completed_at
  };
}
function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
function formatSecurityPassReport(report, format) {
  if (format === "json") return report;
  const markdown = [
    `# SecurityPass Report`,
    "",
    `**Score:** ${report.score}`,
    `**Status:** ${report.status}`,
    `**Target:** ${report.target.url ?? report.target.repo ?? report.target.type}`,
    "",
    `> ${report.disclaimer.compact}`,
    "",
    report.posture_summary,
    "",
    "## Scope Performed",
    ...report.scope_performed.length > 0 ? report.scope_performed.map((item) => `- ${item}`) : ["- No checks ran."],
    "",
    "## Findings",
    ...report.findings.length > 0 ? report.findings.map((finding) => `- [${finding.severity}] ${finding.title} (${finding.verdict})`) : ["- No findings reported."],
    "",
    "## Not Checked",
    ...report.not_checked.length > 0 ? report.not_checked.map((item) => `- ${item.title}: ${item.reason}`) : ["- No selected checks were skipped."]
  ].join("\n");
  if (format === "markdown") return markdown;
  return [
    "<article>",
    `<h1>SecurityPass Report</h1>`,
    `<p><strong>Score:</strong> ${report.score}</p>`,
    `<p><strong>Status:</strong> ${escapeHtml(report.status)}</p>`,
    `<p><strong>Target:</strong> ${escapeHtml(String(report.target.url ?? report.target.repo ?? report.target.type))}</p>`,
    `<p><strong>${escapeHtml(report.disclaimer.headline)}</strong> ${escapeHtml(report.disclaimer.body)}</p>`,
    `<p>${escapeHtml(report.posture_summary)}</p>`,
    `<pre>${escapeHtml(markdown)}</pre>`,
    "</article>"
  ].join("\n");
}

// packages/securitypass/src/scope/verify.ts
import { createHash } from "node:crypto";
import { resolveTxt as nodeResolveTxt } from "node:dns/promises";
function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}
function targetHost(target) {
  if (!target.url) return null;
  try {
    return new URL(target.url).hostname;
  } catch {
    return null;
  }
}
function targetOrigin(target) {
  if (!target.url) return null;
  try {
    return new URL(target.url).origin;
  } catch {
    return null;
  }
}
function tokenFromWellKnown(body) {
  if (!body || typeof body !== "object") return [];
  const record = body;
  const candidates = [
    record.token,
    record.expected_token,
    record.securitypass_token,
    record.securitypass_scope?.token,
    record.securitypass_scope?.expected_token
  ];
  if (Array.isArray(record.tokens)) candidates.push(...record.tokens);
  return candidates.filter((value) => typeof value === "string");
}
function textContainsStandaloneToken(value, token) {
  const trimmed = value.trim();
  if (trimmed === token) return true;
  return trimmed.split(/[\s,;]+/).some((part) => part === token || part.endsWith(`=${token}`) || part.endsWith(`:${token}`));
}
function failure(target, opts, reason, evidence = {}) {
  return {
    verified: false,
    target,
    proof_method: opts.proofMethod ?? null,
    contract_id: opts.contractId ?? null,
    checked_at: (/* @__PURE__ */ new Date()).toISOString(),
    reason,
    evidence
  };
}
function success(target, opts, evidence) {
  return {
    verified: true,
    target,
    proof_method: opts.proofMethod ?? null,
    contract_id: opts.contractId ?? null,
    checked_at: (/* @__PURE__ */ new Date()).toISOString(),
    evidence
  };
}
async function verifyScope(target, opts = {}) {
  const proofMethod = opts.proofMethod;
  const expectedToken = opts.expectedToken?.trim();
  if (!proofMethod) {
    return failure(target, opts, "No scope proof method was supplied.");
  }
  if (proofMethod === "signed_email" || proofMethod === "bug_bounty_program") {
    if (!opts.contractId || !expectedToken) {
      return failure(target, opts, `${proofMethod} scope requires a contract id and expected token.`);
    }
    return success(target, opts, {
      mode: "contract_attestation",
      token_sha256: hashToken(expectedToken)
    });
  }
  if (!expectedToken) {
    return failure(target, opts, `${proofMethod} scope requires an expected token.`);
  }
  if (proofMethod === "dns_txt") {
    const host = targetHost(target);
    if (!host) return failure(target, opts, "DNS TXT scope verification requires a URL target.");
    const resolveTxt = opts.resolveTxt ?? nodeResolveTxt;
    const recordNames = [`_securitypass-scope.${host}`, host];
    const checked = [];
    for (const recordName of recordNames) {
      try {
        const txtRecords = await resolveTxt(recordName);
        const flattened = txtRecords.map((parts) => parts.join(""));
        const found = flattened.some((value) => textContainsStandaloneToken(value, expectedToken));
        checked.push({ record: recordName, found });
        if (found) {
          return success(target, opts, {
            record_name: recordName,
            token_sha256: hashToken(expectedToken)
          });
        }
      } catch {
        checked.push({ record: recordName, found: false });
      }
    }
    return failure(target, opts, "Expected SecurityPass DNS TXT token was not found.", { checked });
  }
  if (proofMethod === "well_known") {
    const origin = targetOrigin(target);
    if (!origin) return failure(target, opts, "Well-known scope verification requires a URL target.");
    const proofUrl = `${origin}/.well-known/securitypass-scope.json`;
    const fetchImpl = opts.fetchImpl ?? fetch;
    const timeoutMs = opts.proofTimeoutMs ?? 1e4;
    const controller = new AbortController();
    const timeout = timeoutMs > 0 ? setTimeout(() => {
      controller.abort();
    }, timeoutMs) : null;
    let response;
    try {
      response = await fetchImpl(proofUrl, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal
      });
    } catch (err) {
      return failure(target, opts, "Well-known proof could not be fetched.", {
        proof_url: proofUrl,
        error: err instanceof Error ? err.message : String(err)
      });
    } finally {
      if (timeout) clearTimeout(timeout);
    }
    const text = await response.text();
    if (!response.ok) {
      return failure(target, opts, "Well-known proof returned a non-success status.", {
        proof_url: proofUrl,
        status: response.status
      });
    }
    try {
      const parsed = JSON.parse(text);
      if (tokenFromWellKnown(parsed).includes(expectedToken)) {
        return success(target, opts, {
          proof_url: proofUrl,
          token_sha256: hashToken(expectedToken)
        });
      }
    } catch {
      if (textContainsStandaloneToken(text, expectedToken)) {
        return success(target, opts, {
          proof_url: proofUrl,
          token_sha256: hashToken(expectedToken),
          mode: "plain_text_fallback"
        });
      }
    }
    return failure(target, opts, "Expected token was not present in the well-known proof.", {
      proof_url: proofUrl,
      status: response.status
    });
  }
  return failure(target, opts, `Unsupported scope proof method: ${proofMethod}`);
}
var ScopeUnverifiedError = class extends Error {
  code = "scope_unverified";
  target;
  proof;
  constructor(target, proof, message) {
    super(
      message ?? `SecurityPass refuses to probe ${target.url ?? target.repo ?? target.type}: ${proof?.reason ?? "scope verification failed"}.`
    );
    this.name = "ScopeUnverifiedError";
    this.target = target;
    this.proof = proof;
  }
};
async function verifyScopeOrThrow(target, opts = {}) {
  const result = await verifyScope(target, opts);
  if (!result.verified) {
    throw new ScopeUnverifiedError(target, result);
  }
  return result;
}

// packages/securitypass/src/probes/command-runner.ts
import { spawn } from "node:child_process";
var runCommand = (spec) => new Promise((resolve, reject) => {
  const child = spawn(spec.command, spec.args, {
    cwd: spec.cwd,
    shell: false,
    windowsHide: true
  });
  let stdout = "";
  let stderr = "";
  let timedOut = false;
  const timeout = spec.timeoutMs && spec.timeoutMs > 0 ? setTimeout(() => {
    timedOut = true;
    child.kill("SIGTERM");
  }, spec.timeoutMs) : null;
  child.stdout?.on("data", (chunk) => {
    stdout += String(chunk);
  });
  child.stderr?.on("data", (chunk) => {
    stderr += String(chunk);
  });
  child.on("error", (err) => {
    if (timeout) clearTimeout(timeout);
    reject(err);
  });
  child.on("close", (code) => {
    if (timeout) clearTimeout(timeout);
    resolve({
      exitCode: timedOut ? 124 : code ?? 1,
      stdout,
      stderr: timedOut ? `${stderr}
Command timed out after ${spec.timeoutMs}ms.`.trim() : stderr
    });
  });
});

// packages/securitypass/src/probes/gitleaks.ts
function buildGitleaksCommand(repoPath) {
  return {
    command: "gitleaks",
    args: [
      "git",
      "--report-format",
      "json",
      "--report-path",
      "-",
      "--redact=100",
      "--no-banner",
      "--log-level",
      "error",
      repoPath
    ],
    cwd: repoPath,
    timeoutMs: 12e4
  };
}
function parseGitleaksJson(stdout) {
  if (!stdout.trim()) return [];
  let leaks;
  try { leaks = JSON.parse(stdout); } catch { return []; }
  return leaks.map((leak) => ({
    check_id: `securitypass.gitleaks.${leak.RuleID ?? "secret"}`,
    title: leak.Description ?? "Potential secret detected",
    severity: "critical",
    verdict: "fail",
    category: "secrets",
    description: `Gitleaks reported a potential secret in ${leak.File ?? "an unknown file"}.`,
    remediation: "Rotate the exposed credential, remove it from history, and replace it with a managed secret.",
    evidence: {
      rule_id: leak.RuleID ?? null,
      file: leak.File ?? null,
      start_line: leak.StartLine ?? null,
      end_line: leak.EndLine ?? null,
      commit: leak.Commit ?? null,
      fingerprint: leak.Fingerprint ?? null,
      secret_redacted: leak.Secret ? "[redacted]" : null
    }
  }));
}
function gitleaksResultFromCommand(target, command, result) {
  return {
    probe: "gitleaks",
    target,
    command,
    findings: parseGitleaksJson(result.stdout),
    raw: { exitCode: result.exitCode, stderr: result.stderr }
  };
}

// packages/securitypass/src/probes/osv-scanner.ts
function buildOsvScannerCommand(path) {
  return {
    command: "osv-scanner",
    args: ["scan", "source", "--format", "json", "--recursive", "--no-call-analysis=rust", path],
    cwd: path,
    timeoutMs: 12e4
  };
}
function roundUp1(score) {
  return Math.ceil((score + Number.EPSILON) * 10) / 10;
}
function parseCvssVector(vector) {
  const metrics = {};
  for (const part of vector.split("/")) {
    const [key, value] = part.split(":");
    if (!key || !value || key === "CVSS") continue;
    metrics[key] = value;
  }
  return metrics;
}
function cvssV3Score(vector) {
  if (!vector.startsWith("CVSS:3.")) return null;
  const metrics = parseCvssVector(vector);
  const impactValues = { N: 0, L: 0.22, H: 0.56 };
  const av = { N: 0.85, A: 0.62, L: 0.55, P: 0.2 }[metrics.AV];
  const ac = { L: 0.77, H: 0.44 }[metrics.AC];
  const ui = { N: 0.85, R: 0.62 }[metrics.UI];
  const scope = metrics.S;
  const pr = scope === "C" ? { N: 0.85, L: 0.68, H: 0.5 }[metrics.PR] : { N: 0.85, L: 0.62, H: 0.27 }[metrics.PR];
  const c = impactValues[metrics.C];
  const i = impactValues[metrics.I];
  const a = impactValues[metrics.A];
  if (av === void 0 || ac === void 0 || pr === void 0 || ui === void 0 || c === void 0 || i === void 0 || a === void 0 || !scope) return null;
  const impactSubScore = 1 - (1 - c) * (1 - i) * (1 - a);
  const impact = scope === "U" ? 6.42 * impactSubScore : 7.52 * (impactSubScore - 0.029) - 3.25 * Math.pow(impactSubScore - 0.02, 15);
  if (impact <= 0) return 0;
  const exploitability = 8.22 * av * ac * pr * ui;
  const base = scope === "U" ? Math.min(impact + exploitability, 10) : Math.min(1.08 * (impact + exploitability), 10);
  return roundUp1(base);
}
function cvssV2Score(vector) {
  const metrics = parseCvssVector(vector);
  const av = { L: 0.395, A: 0.646, N: 1 }[metrics.AV];
  const ac = { H: 0.35, M: 0.61, L: 0.71 }[metrics.AC];
  const au = { M: 0.45, S: 0.56, N: 0.704 }[metrics.Au];
  const impactValues = { N: 0, P: 0.275, C: 0.66 };
  const c = impactValues[metrics.C];
  const i = impactValues[metrics.I];
  const a = impactValues[metrics.A];
  if (av === void 0 || ac === void 0 || au === void 0 || c === void 0 || i === void 0 || a === void 0) return null;
  const impact = 10.41 * (1 - (1 - c) * (1 - i) * (1 - a));
  if (impact <= 0) return 0;
  const exploitability = 20 * av * ac * au;
  return roundUp1((0.6 * impact + 0.4 * exploitability - 1.5) * 1.176);
}
function parsedCvssScoresFromOsv(severityEntries) {
  return severityEntries.flatMap((severity) => {
    const rawScore = severity.score?.trim();
    if (!rawScore) return [];
    let score = null;
    if (rawScore.startsWith("CVSS:3.")) {
      score = cvssV3Score(rawScore);
    } else if (severity.type === "CVSS_V2" || /(^|\/)Au:/.test(rawScore)) {
      score = cvssV2Score(rawScore);
    }
    return score === null ? [] : [{
      type: severity.type ?? null,
      vector: rawScore,
      score
    }];
  });
}
function severityFromScore(score) {
  if (score >= 9) return "critical";
  if (score >= 7) return "high";
  if (score >= 4) return "medium";
  if (score > 0) return "low";
  return "info";
}
function fallbackSeverityFromCvssVector(scoreText) {
  if (!scoreText.includes("CVSS:")) return null;
  if (/\/(?:VC|VI|VA|SC|SI|SA|C|I|A):H(?:\/|$)/.test(scoreText)) return "high";
  if (/\/(?:VC|VI|VA|SC|SI|SA|C|I|A):(?:L|P)(?:\/|$)/.test(scoreText)) return "medium";
  return "low";
}
function osvSeverityEntries(vuln) {
  return [
    ...vuln.severity ?? [],
    ...(vuln.affected ?? []).flatMap((affected) => affected.severity ?? [])
  ];
}
function cvssScoresFromOsv(vuln) {
  return parsedCvssScoresFromOsv(osvSeverityEntries(vuln));
}
function severityFromOsv(vuln) {
  const severityEntries = osvSeverityEntries(vuln);
  const scores = severityEntries.map((severity) => severity.score).filter((score) => Boolean(score));
  const text = scores.join(" ").toUpperCase();
  if (text.includes("CRITICAL")) return "critical";
  if (text.includes("HIGH")) return "high";
  if (text.includes("MEDIUM")) return "medium";
  if (text.includes("LOW")) return "low";
  const numericScores = scores.map((score) => Number(String(score).trim())).filter((score) => Number.isFinite(score));
  const numericScore = numericScores.length > 0 ? Math.max(...numericScores) : null;
  if (numericScore !== null) {
    return severityFromScore(numericScore);
  }
  const cvssScores = parsedCvssScoresFromOsv(severityEntries);
  if (cvssScores.length > 0) {
    return severityFromScore(Math.max(...cvssScores.map((score) => score.score)));
  }
  for (const score of scores) {
    const fallback = fallbackSeverityFromCvssVector(score);
    if (fallback) return fallback;
  }
  return "low";
}
function fixedVersionsFromOsv(vuln) {
  const fixedVersions = /* @__PURE__ */ new Set();
  for (const affected of vuln.affected ?? []) {
    for (const range of affected.ranges ?? []) {
      for (const event of range.events ?? []) {
        if (event.fixed) fixedVersions.add(event.fixed);
      }
    }
  }
  return [...fixedVersions].sort();
}
function referencesFromOsv(vuln) {
  return (vuln.references ?? []).filter((reference) => Boolean(reference.url)).map((reference) => ({
    type: reference.type ?? null,
    url: reference.url
  }));
}
function callAnalysisForVulnerability(pkg, vuln) {
  const vulnIds = new Set([vuln.id, ...vuln.aliases ?? []].filter(Boolean));
  return (pkg.groups ?? []).filter((group) => (group.ids ?? []).some((id) => vulnIds.has(id))).map((group) => ({
    ids: group.ids ?? [],
    analysis: group.experimentalAnalysis ?? {}
  }));
}
function parseOsvScannerJson(stdout) {
  if (!stdout.trim()) return [];
  let body;
  try { body = JSON.parse(stdout); } catch { return []; }
  const findings = [];
  for (const result of body.results ?? []) {
    for (const pkg of result.packages ?? []) {
      for (const vuln of pkg.vulnerabilities ?? []) {
        findings.push({
          check_id: `securitypass.osv.${vuln.id ?? "vulnerability"}`,
          title: vuln.summary ?? "Open source vulnerability detected",
          severity: severityFromOsv(vuln),
          verdict: "fail",
          category: "supply-chain",
          description: vuln.details,
          remediation: "Upgrade the affected package, apply a vendor patch, or document an accepted risk.",
          evidence: {
            id: vuln.id ?? null,
            aliases: vuln.aliases ?? [],
            package: pkg.package?.name ?? null,
            version: pkg.package?.version ?? null,
            ecosystem: pkg.package?.ecosystem ?? null,
            fixed_versions: fixedVersionsFromOsv(vuln),
            references: referencesFromOsv(vuln),
            published: vuln.published ?? null,
            modified: vuln.modified ?? null,
            call_analysis: callAnalysisForVulnerability(pkg, vuln),
            cvss_scores: cvssScoresFromOsv(vuln),
            severity: vuln.severity ?? [],
            source_path: result.source?.path ?? null,
            source_type: result.source?.type ?? null
          }
        });
      }
    }
  }
  return findings;
}
function osvResultFromCommand(target, command, result) {
  return {
    probe: "osv-scanner",
    target,
    command,
    findings: parseOsvScannerJson(result.stdout),
    raw: { exitCode: result.exitCode, stderr: result.stderr }
  };
}

// packages/securitypass/src/runner/index.ts
function targetFromPackTarget(target) {
  return {
    id: target.id,
    type: target.type,
    url: target.url,
    repo: target.repo,
    branch: target.branch
  };
}
function normalizeScopeAsset(asset) {
  return asset.trim().replaceAll("\\", "/").replace(/\/+$/, "").toLowerCase();
}
function normalizedUrlPath(pathname) {
  const path = pathname.replace(/\/+$/, "");
  return path || "/";
}
function urlMatchesScopeAsset(targetUrl, asset) {
  let target;
  try {
    target = new URL(targetUrl);
  } catch {
    return false;
  }
  const rawAsset = asset.trim();
  const normalizedAsset = normalizeScopeAsset(rawAsset);
  if (!normalizedAsset) return false;
  if (normalizedAsset.startsWith("*.")) {
    return target.hostname.toLowerCase().endsWith(`.${normalizedAsset.slice(2)}`);
  }
  try {
    const assetUrl = new URL(rawAsset);
    if (assetUrl.origin.toLowerCase() !== target.origin.toLowerCase()) return false;
    const assetPath = normalizedUrlPath(assetUrl.pathname);
    const targetPath = normalizedUrlPath(target.pathname);
    if (assetPath === "/") return true;
    return targetPath === assetPath || targetPath.startsWith(`${assetPath}/`);
  } catch {
    return target.hostname.toLowerCase() === normalizedAsset;
  }
}
function repoMatchesScopeAsset(repo, asset) {
  const normalizedRepo = normalizeScopeAsset(repo);
  const normalizedAsset = normalizeScopeAsset(asset);
  if (!normalizedAsset) return false;
  return normalizedRepo === normalizedAsset || normalizedRepo.startsWith(`${normalizedAsset}/`);
}
function targetMatchesScopeAsset(target, asset) {
  if (target.url && urlMatchesScopeAsset(target.url, asset)) return true;
  if (target.repo && repoMatchesScopeAsset(target.repo, asset)) return true;
  return false;
}
function scopeFailure(target, contract, reason, evidence) {
  const proof = {
    verified: false,
    target,
    proof_method: contract.proof_method,
    contract_id: contract.contract_id,
    checked_at: (/* @__PURE__ */ new Date()).toISOString(),
    reason,
    evidence
  };
  return new ScopeUnverifiedError(target, proof);
}
function assertTargetWithinDeclaredScope(pack, target) {
  const contract = pack.scope_contract;
  const outOfScopeHit = contract.out_of_scope_assets.find((asset) => targetMatchesScopeAsset(target, asset));
  if (outOfScopeHit) {
    throw scopeFailure(target, contract, "Target matches an explicitly out-of-scope asset.", {
      matched_asset: outOfScopeHit,
      target
    });
  }
  if (contract.in_scope_assets.length === 0) return;
  const inScopeHit = contract.in_scope_assets.find((asset) => targetMatchesScopeAsset(target, asset));
  if (!inScopeHit) {
    throw scopeFailure(target, contract, "Target is not listed in the signed in-scope assets.", {
      in_scope_assets: contract.in_scope_assets,
      target
    });
  }
}
function selectPackTarget(pack, targetId) {
  if (targetId) {
    const target2 = pack.targets.find((candidate) => candidate.id === targetId);
    if (!target2) {
      throw new Error(`SecurityPass target '${targetId}' was not found in pack '${pack.id}'.`);
    }
    return target2;
  }
  const target = pack.targets[0];
  if (!target) {
    throw new Error("SecurityPass pack must include at least one target.");
  }
  return target;
}
function checkAppliesToProfile(check, profile) {
  return check.profiles.includes(profile);
}
function notChecked(check, reason, evidence = {}) {
  return {
    check_id: check.id,
    title: check.title,
    reason,
    category: check.category,
    severity: check.severity,
    evidence
  };
}
function findingFromProbe(check, finding) {
  return {
    check_id: finding.check_id,
    title: finding.title,
    severity: finding.severity,
    verdict: finding.verdict,
    category: finding.category,
    description: finding.description ?? check.description,
    remediation: finding.remediation ?? check.remediation,
    on_fail_comment: check.on_fail,
    evidence: finding.evidence
  };
}
function checkedFinding(check, evidence) {
  return {
    check_id: check.id,
    title: check.title,
    severity: check.severity,
    verdict: "check",
    category: check.category,
    description: check.description,
    remediation: check.remediation,
    on_fail_comment: check.on_fail,
    evidence
  };
}
function commandFailureNotChecked(check, command, err) {
  const detail = err instanceof Error ? err.message : String(err);
  return notChecked(check, `${command} could not run on this host.`, {
    command,
    detail
  });
}
function unreadableJsonNotChecked(check, command, err) {
  return notChecked(check, `${command} returned JSON evidence that SecurityPass could not parse.`, {
    command,
    detail: err instanceof Error ? err.message : String(err)
  });
}
function appendProbeFindings(runId, check, findings, emptyEvidence) {
  if (findings.length === 0) {
    appendFinding(runId, checkedFinding(check, emptyEvidence));
    return;
  }
  for (const finding of findings) {
    appendFinding(runId, findingFromProbe(check, finding));
  }
}
function finalizeRunNarrative(runId) {
  const run = getRun(runId);
  if (!run) {
    throw new Error(`SecurityPass run '${runId}' was not found during finalisation.`);
  }
  const report = buildSecurityPassReport(run, listFindings(runId));
  setRunNarrative(runId, {
    score: report.score,
    posture_summary: report.posture_summary
  });
  return getRun(runId) ?? run;
}
async function runSkeletonScan(input = {}, opts = {}) {
  const url = input.target?.url ?? SKELETON_TARGET_URL;
  const target = input.target ?? { type: "url", url };
  await verifyScopeOrThrow(target, opts);
  const run = createRun({
    pack_id: input.pack_id ?? "securitypass-skeleton",
    target,
    profile: input.profile ?? "smoke"
  });
  appendScopePerformed(run.id, `Scope verified by ${opts.proofMethod ?? "unknown"} before active probing.`);
  setRunStatus(run.id, "running");
  let headers;
  try {
    headers = await checkSecurityHeaders(url, opts);
  } catch (err) {
    setRunStatus(run.id, "failed");
    throw err;
  }
  const finding = appendFinding(run.id, {
    check_id: "sec-headers.baseline",
    title: "Baseline browser security headers present",
    severity: "high",
    verdict: headers.verdict,
    category: "web.headers",
    description: "Verifies the response advertises CSP, HSTS, X-Frame-Options, X-Content-Type-Options, and Permissions-Policy.",
    remediation: "Configure the edge (Cloudflare / Vercel / nginx) to emit the missing headers with project-appropriate values.",
    on_fail_comment: headers.on_fail_comment,
    evidence: { status_code: headers.status_code, checks: headers.checks }
  });
  setRunStatus(run.id, "complete");
  return { run: finalizeRunNarrative(run.id), finding, headers };
}
async function runSecurityPack(pack, input = {}, opts = {}) {
  const profile = input.profile ?? "smoke";
  const packTarget = selectPackTarget(pack, input.target_id);
  const target = targetFromPackTarget(packTarget);
  assertTargetWithinDeclaredScope(pack, target);
  const scopeProof = await verifyScopeOrThrow(target, {
    contractId: pack.scope_contract.contract_id,
    proofMethod: pack.scope_contract.proof_method,
    expectedToken: pack.scope_contract.expected_token,
    proofTimeoutMs: opts.proofTimeoutMs,
    fetchImpl: opts.fetchImpl,
    resolveTxt: opts.resolveTxt
  });
  const run = createRun({
    pack_id: pack.id,
    target,
    profile
  });
  appendScopePerformed(
    run.id,
    `Scope verified by ${scopeProof.proof_method ?? "unknown"} for contract ${scopeProof.contract_id ?? "unknown"}.`
  );
  setRunStatus(run.id, "running");
  const commandRunner = opts.commandRunner ?? runCommand;
  const checks = pack.checks.filter((check) => checkAppliesToProfile(check, profile));
  if (checks.length === 0) {
    appendNotChecked(run.id, {
      check_id: "securitypass.profile.empty",
      title: "No checks selected for this profile",
      reason: `No checks in ${pack.id} apply to the ${profile} profile.`,
      category: "coverage",
      severity: "info"
    });
  }
  for (const check of checks) {
    if (check.probe === "security-headers") {
      if (!target.url) {
        appendNotChecked(run.id, notChecked(check, "Security headers check requires a URL target."));
        continue;
      }
      try {
        const headers = await checkSecurityHeaders(target.url, { fetchImpl: opts.fetchImpl });
        appendScopePerformed(run.id, `${check.id}: fetched response headers from ${target.url}.`);
        appendFinding(run.id, {
          check_id: check.id,
          title: check.title,
          severity: check.severity,
          verdict: headers.verdict,
          category: check.category,
          description: check.description,
          remediation: check.remediation,
          on_fail_comment: headers.on_fail_comment ?? check.on_fail,
          evidence: { status_code: headers.status_code, checks: headers.checks }
        });
      } catch (err) {
        appendNotChecked(run.id, notChecked(check, "Security headers check could not fetch the target.", {
          detail: err instanceof Error ? err.message : String(err)
        }));
      }
      continue;
    }
    if (check.probe === "gitleaks") {
      const repoPath = target.repo;
      if (!repoPath) {
        appendNotChecked(run.id, notChecked(check, "Gitleaks check requires a git target with a repo path."));
        continue;
      }
      const command = buildGitleaksCommand(repoPath);
      try {
        const result = await commandRunner(command);
        if (result.exitCode !== 0 && !result.stdout.trim()) {
          appendNotChecked(run.id, notChecked(check, "Gitleaks returned a non-zero exit without JSON evidence.", {
            exit_code: result.exitCode,
            stderr: result.stderr
          }));
          continue;
        }
        let findings;
        try {
          findings = gitleaksResultFromCommand(target, command, result).findings;
        } catch (err) {
          appendNotChecked(run.id, unreadableJsonNotChecked(check, "gitleaks", err));
          continue;
        }
        appendScopePerformed(run.id, `${check.id}: ran gitleaks against ${repoPath}.`);
        appendProbeFindings(run.id, check, findings, {
          probe: "gitleaks",
          exit_code: result.exitCode,
          finding_count: 0
        });
      } catch (err) {
        appendNotChecked(run.id, commandFailureNotChecked(check, "gitleaks", err));
      }
      continue;
    }
    if (check.probe === "osv-scanner") {
      const repoPath = target.repo;
      if (!repoPath) {
        appendNotChecked(run.id, notChecked(check, "OSV-Scanner check requires a git target with a repo path."));
        continue;
      }
      const command = buildOsvScannerCommand(repoPath);
      try {
        const result = await commandRunner(command);
        if (result.exitCode !== 0 && !result.stdout.trim()) {
          appendNotChecked(run.id, notChecked(check, "OSV-Scanner returned a non-zero exit without JSON evidence.", {
            exit_code: result.exitCode,
            stderr: result.stderr
          }));
          continue;
        }
        let findings;
        try {
          findings = osvResultFromCommand(target, command, result).findings;
        } catch (err) {
          appendNotChecked(run.id, unreadableJsonNotChecked(check, "osv-scanner", err));
          continue;
        }
        appendScopePerformed(run.id, `${check.id}: ran osv-scanner against ${repoPath}.`);
        appendProbeFindings(run.id, check, findings, {
          probe: "osv-scanner",
          exit_code: result.exitCode,
          finding_count: 0
        });
      } catch (err) {
        appendNotChecked(run.id, commandFailureNotChecked(check, "osv-scanner", err));
      }
      continue;
    }
    appendNotChecked(
      run.id,
      notChecked(check, `Probe '${check.probe}' is declared in the pack but not wired in this runner yet.`)
    );
  }
  setRunStatus(run.id, "complete");
  const finalRun = finalizeRunNarrative(run.id);
  return { run: finalRun, findings: listFindings(run.id) };
}

// packages/securitypass/src/mcp/tools.ts
var SECURITYPASS_TOOLS = [
  {
    name: "securitypass_run",
    description: "Start a scope-gated SecurityPass scan against a registered pack or target URL. Returns a safe securitypass_receipt_v1 proof envelope without raw secrets or PoC payloads.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        pack_id: { type: "string", description: "Pack id, e.g. 'securitypass-web-baseline'" },
        pack_yaml: { type: "string", description: "Optional pack YAML to validate and run without prior registration" },
        target_id: { type: "string", description: "Target id inside the SecurityPass pack" },
        target_url: { type: "string", description: "Target URL (must be in pack scope)" },
        contract_id: { type: "string", description: "Scope contract id for skeleton URL scans" },
        proof_method: {
          type: "string",
          enum: ["dns_txt", "well_known", "bug_bounty_program", "signed_email"]
        },
        expected_token: { type: "string", description: "Expected scope proof token" },
        proof_timeout_ms: { type: "number", description: "Optional timeout for well-known proof fetches" },
        profile: {
          type: "string",
          enum: ["smoke", "standard", "deep"],
          default: "smoke"
        }
      },
      required: []
    }
  },
  {
    name: "securitypass_status",
    description: "Poll the state of a SecurityPass run. Returns status, verdict summary, counts, and a safe securitypass_receipt_v1 proof envelope.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by securitypass_run" }
      },
      required: ["run_id"]
    }
  },
  {
    name: "securitypass_report",
    description: "Fetch the synthesised report for a completed run (executive narrative + findings). format=json|markdown|html.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        run_id: { type: "string" },
        format: { type: "string", enum: ["json", "markdown", "html"], default: "json" }
      },
      required: ["run_id"]
    }
  },
  {
    name: "securitypass_register_pack",
    description: "Save a SecurityPack YAML for the calling tenant. Validates against the schema.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        pack_id: { type: "string" },
        yaml: { type: "string", description: "Pack contents as YAML" }
      },
      required: ["pack_id", "yaml"]
    }
  },
  {
    name: "securitypass_verify_scope",
    description: "Verify scope authorisation for a target via DNS TXT or /.well-known proof. Required before any active probe runs.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        target_type: { type: "string", enum: ["url", "git", "mcp", "api"] },
        target_url: { type: "string" },
        target_repo: { type: "string" },
        proof_method: {
          type: "string",
          enum: ["dns_txt", "well_known", "bug_bounty_program", "signed_email"]
        },
        contract_id: { type: "string", description: "Signed scope contract id" },
        expected_token: { type: "string", description: "Token to look for in DNS TXT or /.well-known" },
        proof_timeout_ms: { type: "number", description: "Optional timeout for well-known proof fetches" }
      },
      required: ["proof_method"]
    }
  },
  {
    name: "securitypass_disclosure_status",
    description: "Check the 90+30 responsible-disclosure timer state for a finding (notified, acked, extended, public, withdrawn).",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        finding_id: { type: "string" }
      },
      required: ["finding_id"]
    }
  },
  {
    name: "securitypass_finding_detail",
    description: "Fetch a single finding including PoC payload (curl / prompt / payload) and remediation. PoC is generated, never auto-fired.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        finding_id: { type: "string" }
      },
      required: ["finding_id"]
    }
  }
];
function normalizeProfile(raw) {
  return raw === "standard" || raw === "deep" ? raw : "smoke";
}
function normalizeFormat(raw) {
  return raw === "markdown" || raw === "html" ? raw : "json";
}
function normalizeProofTimeout(raw) {
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : void 0;
}
function normalizeTargetType(raw, fallback) {
  return raw === "git" || raw === "mcp" || raw === "api" || raw === "url" ? raw : fallback;
}
function parsePackYaml(yaml) {
  let parsed;
  try {
    parsed = loadYaml(yaml);
  } catch (err) {
    return { error: { error: "yaml parse failed", detail: err instanceof Error ? err.message : String(err) } };
  }
  const result = SecurityPackSchema.safeParse(parsed);
  if (!result.success) {
    return {
      error: {
        error: "schema validation failed",
        issues: result.error.issues.map((i) => ({ path: i.path.join("."), message: i.message }))
      }
    };
  }
  return { pack: result.data };
}
function countBySeverity(findings) {
  const counts = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    info: 0
  };
  for (const finding of findings) counts[finding.severity] += 1;
  return counts;
}
function hasActiveProbeEvidence(run, findings) {
  if (findings.length > 0) return true;
  return run.scope_performed.some((line) => /\b(fetched|ran)\b/i.test(line));
}
function receiptStatus(run, findings) {
  if (run.status === "failed" || run.status === "budget_exceeded") return "FAIL";
  if (findings.some((finding) => finding.verdict === "fail")) return "FAIL";
  if (run.status !== "complete" || run.not_checked.length > 0) return "WARN";
  return "PASS";
}
function createSecurityPassReceipt(run, findings, report) {
  const failingFindings = findings.filter((finding) => finding.verdict === "fail");
  return {
    kind: "securitypass_receipt_v1",
    pass: "securitypass",
    receipt_id: `securitypass:${run.id}`,
    run_id: run.id,
    status: receiptStatus(run, findings),
    run_status: run.status,
    checked_at: run.completed_at ?? run.created_at,
    completed_at: run.completed_at,
    target: run.target,
    profile: run.profile,
    score: report.score,
    posture_summary: report.posture_summary,
    verdict_summary: run.verdict_summary,
    severity_counts: countBySeverity(findings),
    finding_count: findings.length,
    failing_finding_count: failingFindings.length,
    not_checked_count: run.not_checked.length,
    evidence: {
      scope_verified: run.scope_performed.length > 0,
      scope_performed_count: run.scope_performed.length,
      active_probes_run: hasActiveProbeEvidence(run, findings),
      raw_finding_evidence_exposed: false,
      poc_payloads_exposed: false
    },
    boundaries: run.not_checked.map((item) => ({
      check_id: item.check_id,
      title: item.title,
      reason: item.reason,
      category: item.category,
      severity: item.severity
    })),
    action_needed: failingFindings.map((finding) => ({
      check_id: finding.check_id,
      title: finding.title,
      severity: finding.severity,
      category: finding.category
    }))
  };
}
async function securitypassRun(args) {
  const packId = String(args.pack_id ?? "");
  const packYaml = String(args.pack_yaml ?? "");
  const targetUrl = String(args.target_url ?? "");
  let pack;
  if (packYaml.trim()) {
    const parsed = parsePackYaml(packYaml);
    if (parsed.error) return parsed.error;
    pack = parsed.pack;
  } else if (packId) {
    pack = getRegisteredPack(packId);
  }
  if (packId && !pack && !packYaml.trim() && !targetUrl) {
    return { error: "pack not found", pack_id: packId };
  }
  try {
    if (pack) {
      const result2 = await runSecurityPack(pack, {
        target_id: String(args.target_id ?? "") || void 0,
        profile: normalizeProfile(args.profile)
      }, {
        proofTimeoutMs: normalizeProofTimeout(args.proof_timeout_ms)
      });
      const report2 = buildSecurityPassReport(result2.run, result2.findings);
      return {
        stub: false,
        run_id: result2.run.id,
        status: result2.run.status,
        score: report2.score,
        verdict_summary: result2.run.verdict_summary,
        finding_count: result2.findings.length,
        not_checked_count: result2.run.not_checked.length,
        posture_summary: report2.posture_summary,
        disclaimer: result2.run.disclaimer,
        receipt: createSecurityPassReceipt(result2.run, result2.findings, report2)
      };
    }
    if (!targetUrl) {
      return { error: "pack_yaml, registered pack_id, or target_url is required" };
    }
    const result = await runSkeletonScan({
      pack_id: packId || "securitypass-web-baseline",
      target: { type: "url", url: targetUrl },
      profile: normalizeProfile(args.profile)
    }, {
      contractId: String(args.contract_id ?? "") || void 0,
      proofMethod: String(args.proof_method ?? "") || void 0,
      expectedToken: String(args.expected_token ?? "") || void 0,
      proofTimeoutMs: normalizeProofTimeout(args.proof_timeout_ms)
    });
    const report = buildSecurityPassReport(result.run, [result.finding]);
    return {
      stub: false,
      run_id: result.run.id,
      status: result.run.status,
      score: report.score,
      verdict_summary: result.run.verdict_summary,
      finding_count: 1,
      not_checked_count: result.run.not_checked.length,
      posture_summary: report.posture_summary,
      disclaimer: result.run.disclaimer,
      receipt: createSecurityPassReceipt(result.run, [result.finding], report)
    };
  } catch (err) {
    if (err instanceof ScopeUnverifiedError) {
      return {
        error: "scope_unverified",
        detail: err.message,
        next_step: "Call securitypass_verify_scope first, then rerun with contract_id, proof_method, and expected_token or use a pack with a verified scope contract."
      };
    }
    if (err instanceof Error && /target '.+' was not found in pack/.test(err.message)) {
      return {
        error: "target_not_found",
        detail: err.message
      };
    }
    throw err;
  }
}
async function securitypassStatus(args) {
  const runId = String(args.run_id ?? "");
  if (!runId) return { error: "run_id is required" };
  const run = getRun(runId);
  if (!run) return { error: "run not found", run_id: runId };
  const findings = listFindings(runId);
  const report = buildSecurityPassReport(run, findings);
  return {
    stub: false,
    run_id: run.id,
    status: run.status,
    verdict_summary: run.verdict_summary,
    score: report.score,
    finding_count: findings.length,
    not_checked_count: run.not_checked.length,
    posture_summary: report.posture_summary,
    coverage_note: report.coverage_note,
    completed_at: run.completed_at,
    receipt: createSecurityPassReceipt(run, findings, report)
  };
}
async function securitypassReport(args) {
  const runId = String(args.run_id ?? "");
  if (!runId) return { error: "run_id is required" };
  const run = getRun(runId);
  if (!run) return { error: "run not found", run_id: runId };
  const findings = listFindings(runId);
  const report = buildSecurityPassReport(run, findings);
  return formatSecurityPassReport(report, normalizeFormat(args.format));
}
async function securitypassRegisterPack(args) {
  const packId = String(args.pack_id ?? "");
  const yaml = String(args.yaml ?? "");
  if (!packId) return { error: "pack_id is required" };
  if (!yaml) return { error: "yaml is required" };
  const parsed = parsePackYaml(yaml);
  if (parsed.error) return parsed.error;
  if (!parsed.pack) return { error: "schema validation failed" };
  if (parsed.pack.id !== packId) {
    return {
      error: "pack_id mismatch",
      detail: `Requested pack_id '${packId}' does not match YAML id '${parsed.pack.id}'.`
    };
  }
  registerPack(parsed.pack);
  return {
    stub: false,
    pack_id: parsed.pack.id,
    requested_pack_id: packId,
    persisted: true,
    storage: "memory"
  };
}
async function securitypassVerifyScope(args) {
  const targetUrl = String(args.target_url ?? "");
  const targetRepo = String(args.target_repo ?? "");
  const proofMethod = String(args.proof_method ?? "");
  if (!proofMethod) return { error: "proof_method is required" };
  let target;
  if (targetUrl) {
    target = {
      type: normalizeTargetType(args.target_type, "url"),
      url: targetUrl
    };
  } else if (targetRepo) {
    target = {
      type: normalizeTargetType(args.target_type, "git"),
      repo: targetRepo
    };
  } else {
    return { error: "target_url or target_repo is required" };
  }
  const result = await verifyScope(
    target,
    {
      contractId: String(args.contract_id ?? "") || void 0,
      proofMethod,
      expectedToken: String(args.expected_token ?? "") || void 0,
      proofTimeoutMs: normalizeProofTimeout(args.proof_timeout_ms)
    }
  );
  return { stub: false, ...result };
}
async function securitypassDisclosureStatus(args) {
  const findingId = String(args.finding_id ?? "");
  if (!findingId) return { error: "finding_id is required" };
  const finding = getFinding(findingId);
  const notifiedAt = finding?.created_at ?? null;
  const ackDeadlineAt = notifiedAt ? new Date(Date.parse(notifiedAt) + 90 * 24 * 60 * 60 * 1e3).toISOString() : null;
  const publicAt = ackDeadlineAt ? new Date(Date.parse(ackDeadlineAt) + 30 * 24 * 60 * 60 * 1e3).toISOString() : null;
  return {
    stub: false,
    finding_id: findingId,
    state: finding ? "notified" : "unknown",
    notified_at: notifiedAt,
    ack_deadline_at: ackDeadlineAt,
    public_at: publicAt,
    extension_until_at: null,
    note: "SecurityPass keeps disclosure timers private and never auto-publishes a finding. Public disclosure remains a human decision."
  };
}
async function securitypassFindingDetail(args) {
  const findingId = String(args.finding_id ?? "");
  if (!findingId) return { error: "finding_id is required" };
  const finding = getFinding(findingId);
  if (!finding) return { error: "finding not found", finding_id: findingId };
  return {
    stub: false,
    finding,
    // PoC stays absent until chunk 4 wires the generator. The runtime
    // contract: PoCs are GENERATED, NEVER auto-fired. Any handler change
    // must preserve that invariant.
    poc: finding.poc ?? null
  };
}
var SECURITYPASS_HANDLERS = {
  securitypass_run: securitypassRun,
  securitypass_status: securitypassStatus,
  securitypass_report: securitypassReport,
  securitypass_register_pack: securitypassRegisterPack,
  securitypass_verify_scope: securitypassVerifyScope,
  securitypass_disclosure_status: securitypassDisclosureStatus,
  securitypass_finding_detail: securitypassFindingDetail
};
function __resetSecurityPassMcpForTests() {
  __resetPackStoreForTests();
}
export {
  SECURITYPASS_HANDLERS,
  SECURITYPASS_TOOLS,
  __resetSecurityPassMcpForTests,
  securitypassDisclosureStatus,
  securitypassFindingDetail,
  securitypassRegisterPack,
  securitypassReport,
  securitypassRun,
  securitypassStatus,
  securitypassVerifyScope
};
