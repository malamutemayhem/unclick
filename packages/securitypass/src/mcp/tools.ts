import { load as loadYaml } from "js-yaml";
import { SecurityPackSchema } from "../types/pack-schema.js";
import {
  getRun,
  getFinding,
  listFindings,
} from "../runner/run-store.js";
import { __resetPackStoreForTests, getRegisteredPack, registerPack } from "../runner/pack-store.js";
import { runSecurityPack, runSkeletonScan } from "../runner/index.js";
import {
  buildSecurityPassReport,
  formatSecurityPassReport,
} from "../runner/reporter.js";
import {
  ScopeUnverifiedError,
  verifyScope,
  type ScopeProofMethod,
} from "../scope/verify.js";
import type { Finding, RunProfile, RunRow, SecurityRunTarget, Severity } from "../types/index.js";
import type { SecurityPack } from "../types/pack-schema.js";

// Shared MCP tool descriptor shape. Mirrors the structure used by
// packages/mcp-server/src/server.ts so wiring SecurityPass into the catalog
// in a later chunk is a copy of the object literal.
export interface SecurityPassToolDef {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    additionalProperties?: false;
    properties: Record<string, unknown>;
    required?: string[];
  };
}

export const SECURITYPASS_TOOLS: SecurityPassToolDef[] = [
  {
    name: "securitypass_run",
    description:
      "Start a scope-gated SecurityPass scan against a registered pack or target URL. Returns a safe securitypass_receipt_v1 proof envelope without raw secrets or PoC payloads.",
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
          enum: ["dns_txt", "well_known", "bug_bounty_program", "signed_email"],
        },
        expected_token: { type: "string", description: "Expected scope proof token" },
        proof_timeout_ms: { type: "number", description: "Optional timeout for well-known proof fetches" },
        profile: {
          type: "string",
          enum: ["smoke", "standard", "deep"],
          default: "smoke",
        },
      },
      required: [],
    },
  },
  {
    name: "securitypass_status",
    description:
      "Poll the state of a SecurityPass run. Returns status, verdict summary, counts, and a safe securitypass_receipt_v1 proof envelope.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by securitypass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "securitypass_report",
    description:
      "Fetch the synthesised report for a completed run (executive narrative + findings). format=json|markdown|html.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        run_id: { type: "string" },
        format: { type: "string", enum: ["json", "markdown", "html"], default: "json" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "securitypass_register_pack",
    description: "Save a SecurityPack YAML for the calling tenant. Validates against the schema.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        pack_id: { type: "string" },
        yaml: { type: "string", description: "Pack contents as YAML" },
      },
      required: ["pack_id", "yaml"],
    },
  },
  {
    name: "securitypass_verify_scope",
    description:
      "Verify scope authorisation for a target via DNS TXT or /.well-known proof. Required before any active probe runs.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        target_type: { type: "string", enum: ["url", "git", "mcp", "api"] },
        target_url: { type: "string" },
        target_repo: { type: "string" },
        proof_method: {
          type: "string",
          enum: ["dns_txt", "well_known", "bug_bounty_program", "signed_email"],
        },
        contract_id: { type: "string", description: "Signed scope contract id" },
        expected_token: { type: "string", description: "Token to look for in DNS TXT or /.well-known" },
        proof_timeout_ms: { type: "number", description: "Optional timeout for well-known proof fetches" },
      },
      required: ["proof_method"],
    },
  },
  {
    name: "securitypass_disclosure_status",
    description:
      "Check the 90+30 responsible-disclosure timer state for a finding (notified, acked, extended, public, withdrawn).",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        finding_id: { type: "string" },
      },
      required: ["finding_id"],
    },
  },
  {
    name: "securitypass_finding_detail",
    description:
      "Fetch a single finding including PoC payload (curl / prompt / payload) and remediation. PoC is generated, never auto-fired.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        finding_id: { type: "string" },
      },
      required: ["finding_id"],
    },
  },
];

export type SecurityPassHandler = (args: Record<string, unknown>) => Promise<unknown>;

export interface SecurityPassReceipt {
  kind: "securitypass_receipt_v1";
  pass: "securitypass";
  receipt_id: string;
  run_id: string;
  status: "PASS" | "WARN" | "FAIL";
  run_status: RunRow["status"];
  checked_at: string;
  completed_at: string | null;
  target: SecurityRunTarget;
  profile: RunProfile;
  score: number;
  posture_summary: string;
  verdict_summary: RunRow["verdict_summary"];
  severity_counts: Record<Severity, number>;
  finding_count: number;
  failing_finding_count: number;
  not_checked_count: number;
  evidence: {
    scope_verified: boolean;
    scope_performed_count: number;
    active_probes_run: boolean;
    raw_finding_evidence_exposed: false;
    poc_payloads_exposed: false;
  };
  boundaries: Array<{
    check_id: string;
    title: string;
    reason: string;
    category: string;
    severity: Severity;
  }>;
  action_needed: Array<{
    check_id: string;
    title: string;
    severity: Severity;
    category: string;
  }>;
}

function normalizeProfile(raw: unknown): RunProfile {
  return raw === "standard" || raw === "deep" ? raw : "smoke";
}

function normalizeFormat(raw: unknown): "json" | "markdown" | "html" {
  return raw === "markdown" || raw === "html" ? raw : "json";
}

function normalizeProofTimeout(raw: unknown): number | undefined {
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : undefined;
}

function normalizeTargetType(raw: unknown, fallback: SecurityRunTarget["type"]): SecurityRunTarget["type"] {
  return raw === "git" || raw === "mcp" || raw === "api" || raw === "url" ? raw : fallback;
}

function parsePackYaml(yaml: string): { pack?: SecurityPack; error?: unknown } {
  let parsed: unknown;
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
        issues: result.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
      },
    };
  }
  return { pack: result.data };
}

function countBySeverity(findings: Finding[]): Record<Severity, number> {
  const counts: Record<Severity, number> = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    info: 0,
  };
  for (const finding of findings) counts[finding.severity] += 1;
  return counts;
}

function hasActiveProbeEvidence(run: RunRow, findings: Finding[]): boolean {
  if (findings.length > 0) return true;
  return run.scope_performed.some((line) => /\b(fetched|ran)\b/i.test(line));
}

function receiptStatus(run: RunRow, findings: Finding[]): SecurityPassReceipt["status"] {
  if (run.status === "failed" || run.status === "budget_exceeded") return "FAIL";
  if (findings.some((finding) => finding.verdict === "fail")) return "FAIL";
  if (run.status !== "complete" || run.not_checked.length > 0) return "WARN";
  return "PASS";
}

function createSecurityPassReceipt(
  run: RunRow,
  findings: Finding[],
  report: ReturnType<typeof buildSecurityPassReport>,
): SecurityPassReceipt {
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
      poc_payloads_exposed: false,
    },
    boundaries: run.not_checked.map((item) => ({
      check_id: item.check_id,
      title: item.title,
      reason: item.reason,
      category: item.category,
      severity: item.severity,
    })),
    action_needed: failingFindings.map((finding) => ({
      check_id: finding.check_id,
      title: finding.title,
      severity: finding.severity,
      category: finding.category,
    })),
  };
}

export async function securitypassRun(args: Record<string, unknown>): Promise<unknown> {
  const packId = String(args.pack_id ?? "");
  const packYaml = String(args.pack_yaml ?? "");
  const targetUrl = String(args.target_url ?? "");

  let pack: SecurityPack | undefined;
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
      const result = await runSecurityPack(pack, {
        target_id: String(args.target_id ?? "") || undefined,
        profile: normalizeProfile(args.profile),
      }, {
        proofTimeoutMs: normalizeProofTimeout(args.proof_timeout_ms),
      });
      const report = buildSecurityPassReport(result.run, result.findings);
      return {
        stub: false,
        run_id: result.run.id,
        status: result.run.status,
        score: report.score,
        verdict_summary: result.run.verdict_summary,
        finding_count: result.findings.length,
        not_checked_count: result.run.not_checked.length,
        posture_summary: report.posture_summary,
        disclaimer: result.run.disclaimer,
        receipt: createSecurityPassReceipt(result.run, result.findings, report),
      };
    }

    if (!targetUrl) {
      return { error: "pack_yaml, registered pack_id, or target_url is required" };
    }

    const result = await runSkeletonScan({
      pack_id: packId || "securitypass-web-baseline",
      target: { type: "url", url: targetUrl },
      profile: normalizeProfile(args.profile),
    }, {
      contractId: String(args.contract_id ?? "") || undefined,
      proofMethod: (String(args.proof_method ?? "") || undefined) as ScopeProofMethod | undefined,
      expectedToken: String(args.expected_token ?? "") || undefined,
      proofTimeoutMs: normalizeProofTimeout(args.proof_timeout_ms),
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
      receipt: createSecurityPassReceipt(result.run, [result.finding], report),
    };
  } catch (err) {
    if (err instanceof ScopeUnverifiedError) {
      return {
        error: "scope_unverified",
        detail: err.message,
        next_step:
          "Call securitypass_verify_scope first, then rerun with contract_id, proof_method, and expected_token or use a pack with a verified scope contract.",
      };
    }
    if (err instanceof Error && /target '.+' was not found in pack/.test(err.message)) {
      return {
        error: "target_not_found",
        detail: err.message,
      };
    }
    throw err;
  }
}

export async function securitypassStatus(args: Record<string, unknown>): Promise<unknown> {
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
    receipt: createSecurityPassReceipt(run, findings, report),
  };
}

export async function securitypassReport(args: Record<string, unknown>): Promise<unknown> {
  const runId = String(args.run_id ?? "");
  if (!runId) return { error: "run_id is required" };
  const run = getRun(runId);
  if (!run) return { error: "run not found", run_id: runId };
  const findings = listFindings(runId);
  const report = buildSecurityPassReport(run, findings);
  return formatSecurityPassReport(report, normalizeFormat(args.format));
}

export async function securitypassRegisterPack(args: Record<string, unknown>): Promise<unknown> {
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
      detail: `Requested pack_id '${packId}' does not match YAML id '${parsed.pack.id}'.`,
    };
  }
  registerPack(parsed.pack);
  return {
    stub: false,
    pack_id: parsed.pack.id,
    requested_pack_id: packId,
    persisted: true,
    storage: "memory",
  };
}

export async function securitypassVerifyScope(args: Record<string, unknown>): Promise<unknown> {
  const targetUrl = String(args.target_url ?? "");
  const targetRepo = String(args.target_repo ?? "");
  const proofMethod = String(args.proof_method ?? "");
  if (!proofMethod) return { error: "proof_method is required" };
  let target: SecurityRunTarget;
  if (targetUrl) {
    target = {
      type: normalizeTargetType(args.target_type, "url"),
      url: targetUrl,
    };
  } else if (targetRepo) {
    target = {
      type: normalizeTargetType(args.target_type, "git"),
      repo: targetRepo,
    };
  } else {
    return { error: "target_url or target_repo is required" };
  }
  const result = await verifyScope(
    target,
    {
      contractId: String(args.contract_id ?? "") || undefined,
      proofMethod: proofMethod as ScopeProofMethod,
      expectedToken: String(args.expected_token ?? "") || undefined,
      proofTimeoutMs: normalizeProofTimeout(args.proof_timeout_ms),
    },
  );
  return { stub: false, ...result };
}

export async function securitypassDisclosureStatus(args: Record<string, unknown>): Promise<unknown> {
  const findingId = String(args.finding_id ?? "");
  if (!findingId) return { error: "finding_id is required" };
  const finding = getFinding(findingId);
  const notifiedAt = finding?.created_at ?? null;
  const ackDeadlineAt = notifiedAt
    ? new Date(Date.parse(notifiedAt) + 90 * 24 * 60 * 60 * 1000).toISOString()
    : null;
  const publicAt = ackDeadlineAt
    ? new Date(Date.parse(ackDeadlineAt) + 30 * 24 * 60 * 60 * 1000).toISOString()
    : null;
  return {
    stub: false,
    finding_id: findingId,
    state: finding ? "notified" : "unknown",
    notified_at: notifiedAt,
    ack_deadline_at: ackDeadlineAt,
    public_at: publicAt,
    extension_until_at: null,
    note:
      "SecurityPass keeps disclosure timers private and never auto-publishes a finding. Public disclosure remains a human decision.",
  };
}

export async function securitypassFindingDetail(args: Record<string, unknown>): Promise<unknown> {
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
    poc: finding.poc ?? null,
  };
}

export const SECURITYPASS_HANDLERS: Record<string, SecurityPassHandler> = {
  securitypass_run: securitypassRun,
  securitypass_status: securitypassStatus,
  securitypass_report: securitypassReport,
  securitypass_register_pack: securitypassRegisterPack,
  securitypass_verify_scope: securitypassVerifyScope,
  securitypass_disclosure_status: securitypassDisclosureStatus,
  securitypass_finding_detail: securitypassFindingDetail,
};

export function __resetSecurityPassMcpForTests(): void {
  __resetPackStoreForTests();
}
