import * as path from "node:path";
import { createHash } from "node:crypto";
import {
  renderCompliancePassMarkdown,
  runCompliancePass,
  type CompliancePassEvidence,
  type CompliancePassReport,
} from "./compliancepass/index.js";

type CompliancePassReceiptStatus = "PASS" | "WARN" | "BLOCKER";

interface CompliancePassMcpReceipt {
  kind: "compliancepass_receipt_v1";
  status: CompliancePassReceiptStatus;
  run_id: string;
  target_name: string;
  target_sha?: string;
  generated_at: string;
  valid_until: string;
  readiness_score: CompliancePassReport["readiness_score"];
  checked: {
    total: number;
    pass: number;
    partial: number;
    fail: number;
    unknown: number;
    na: number;
    pending: 0;
  };
  gap_severity_counts: CompliancePassReport["summary"]["gap_severity_counts"];
  blocking_gap_count: number;
  evidence_sources: CompliancePassEvidence[];
  action_needed: string[];
  boundaries: string[];
}

interface CompliancePassRunRecord {
  report: CompliancePassReport;
  target_sha?: string;
  receipt: CompliancePassMcpReceipt;
}

const RUNS = new Map<string, CompliancePassRunRecord>();

function runIdFor(report: CompliancePassReport): string {
  const stamp = report.generated_at.replace(/[^0-9]/g, "").slice(0, 14);
  const digest = createHash("sha256")
    .update(`${report.generated_at}:${report.target.name}:${report.readiness_score.value}`)
    .digest("hex")
    .slice(0, 8);
  return `compliancepass-${stamp}-${digest}`;
}

function parseTargetSha(value: unknown): string | undefined | { error: string } {
  if (value === undefined) return undefined;
  if (typeof value !== "string" || value.trim().length === 0) {
    return { error: "target_sha must be a non-empty string when provided" };
  }
  return value.trim();
}

function receiptStatus(report: CompliancePassReport): CompliancePassReceiptStatus {
  if (
    report.summary.blocking_gap_count > 0 ||
    report.summary.checks_fail > 0 ||
    report.readiness_band === "red" ||
    report.summary.gap_severity_counts.critical > 0 ||
    report.summary.gap_severity_counts.high > 0
  ) {
    return "BLOCKER";
  }
  if (
    report.summary.checks_partial > 0 ||
    report.summary.checks_unknown > 0 ||
    report.readiness_band === "amber" ||
    report.readiness_band === "unknown"
  ) {
    return "WARN";
  }
  return "PASS";
}

function buildReceipt(
  runId: string,
  report: CompliancePassReport,
  targetSha?: string,
): CompliancePassMcpReceipt {
  return {
    kind: "compliancepass_receipt_v1",
    status: receiptStatus(report),
    run_id: runId,
    target_name: report.target.name,
    ...(targetSha ? { target_sha: targetSha } : {}),
    generated_at: report.generated_at,
    valid_until: report.valid_until,
    readiness_score: report.readiness_score,
    checked: {
      total: report.summary.checks_total,
      pass: report.summary.checks_pass,
      partial: report.summary.checks_partial,
      fail: report.summary.checks_fail,
      unknown: report.summary.checks_unknown,
      na: report.summary.checks_na,
      pending: report.summary.checks_pending,
    },
    gap_severity_counts: report.summary.gap_severity_counts,
    blocking_gap_count: report.summary.blocking_gap_count,
    evidence_sources: receiptEvidence(report),
    action_needed: receiptActions(report),
    boundaries: [
      "CompliancePass is readiness guidance, not a compliance certification.",
      "CompliancePass receipts are evidence summaries and do not replace legal, security, privacy, or compliance review.",
      "CompliancePass must not expose secrets, local filesystem paths, private production data, or raw sensitive source text.",
    ],
  };
}

function receiptEvidence(report: CompliancePassReport): CompliancePassEvidence[] {
  const seen = new Set<string>();
  return [...report.evidence, ...report.gaps.flatMap((gap) => gap.evidence)]
    .filter((item) => {
      const key = [item.type, item.label, item.path ?? "", item.summary, item.line ?? ""].join("\u0000");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 20);
}

function receiptActions(report: CompliancePassReport): string[] {
  const actions = [
    ...report.next_actions,
    ...report.gaps.map((gap) => `${gap.id}: ${gap.recommendation}`),
  ];
  return Array.from(new Set(actions)).slice(0, 12);
}

export async function compliancepassRun(args: Record<string, unknown>): Promise<unknown> {
  const targetSha = parseTargetSha(args.target_sha);
  if (typeof targetSha === "object") return targetSha;
  const repoPath = typeof args.repo_path === "string" && args.repo_path.trim()
    ? path.resolve(args.repo_path)
    : process.cwd();
  const targetName = typeof args.target_name === "string" && args.target_name.trim()
    ? args.target_name.trim()
    : "UnClick";

  try {
    const report = await runCompliancePass({ repoPath, targetName });
    const runId = runIdFor(report);
    const receipt = buildReceipt(runId, report, targetSha);
    RUNS.set(runId, { report, target_sha: targetSha, receipt });
    return {
      run_id: runId,
      status: "complete",
      pass: "compliancepass",
      product: report.product,
      legacy_aliases: report.legacy_aliases,
      target_sha: targetSha,
      readiness_score: report.readiness_score,
      summary: report.summary,
      categories: report.categories.map(
        (category: CompliancePassReport["categories"][number]) => ({
          id: category.id,
          name: category.name,
          score: category.score,
          band: category.band,
          status: category.status,
        }),
      ),
      gaps: report.gaps.slice(0, 10),
      next_actions: report.next_actions,
      disclaimer: report.disclaimer,
      compliancepass_receipt_v1: receipt,
    };
  } catch (err) {
    return {
      error: "compliancepass_run_failed",
      detail: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function compliancepassStatus(args: Record<string, unknown>): Promise<unknown> {
  const runId = typeof args.run_id === "string" ? args.run_id : "";
  if (!runId) return { error: "run_id is required" };
  const record = RUNS.get(runId);
  if (!record) return { error: "run not found", run_id: runId };
  const { report } = record;
  return {
    run_id: runId,
    status: "complete",
    pass: "compliancepass",
    target_sha: record.target_sha,
    readiness_score: report.readiness_score,
    summary: report.summary,
    generated_at: report.generated_at,
    compliancepass_receipt_v1: record.receipt,
  };
}

export async function compliancepassReportJson(args: Record<string, unknown>): Promise<unknown> {
  const runId = typeof args.run_id === "string" ? args.run_id : "";
  if (!runId) return { error: "run_id is required" };
  const record = RUNS.get(runId);
  if (!record) return { error: "run not found", run_id: runId };
  return record.report;
}

export async function compliancepassReportMd(args: Record<string, unknown>): Promise<unknown> {
  const runId = typeof args.run_id === "string" ? args.run_id : "";
  if (!runId) return { error: "run_id is required" };
  const record = RUNS.get(runId);
  if (!record) return { error: "run not found", run_id: runId };
  return {
    run_id: runId,
    format: "markdown",
    markdown: renderCompliancePassMarkdown(record.report),
  };
}
