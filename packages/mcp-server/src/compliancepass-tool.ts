import * as path from "node:path";
import { createHash } from "node:crypto";
import {
  renderCompliancePassMarkdown,
  runCompliancePass,
  type CompliancePassReport,
} from "./compliancepass/index.js";

const RUNS = new Map<string, CompliancePassReport>();

function runIdFor(report: CompliancePassReport): string {
  const stamp = report.generated_at.replace(/[^0-9]/g, "").slice(0, 14);
  const digest = createHash("sha256")
    .update(`${report.generated_at}:${report.target.name}:${report.readiness_score.value}`)
    .digest("hex")
    .slice(0, 8);
  return `compliancepass-${stamp}-${digest}`;
}

export async function compliancepassRun(args: Record<string, unknown>): Promise<unknown> {
  const repoPath = typeof args.repo_path === "string" && args.repo_path.trim()
    ? path.resolve(args.repo_path)
    : process.cwd();
  const targetName = typeof args.target_name === "string" && args.target_name.trim()
    ? args.target_name.trim()
    : "UnClick";

  try {
    const report = await runCompliancePass({ repoPath, targetName });
    const runId = runIdFor(report);
    RUNS.set(runId, report);
    return {
      run_id: runId,
      status: "complete",
      pass: "compliancepass",
      product: report.product,
      legacy_aliases: report.legacy_aliases,
      readiness_score: report.readiness_score,
      summary: report.summary,
      categories: report.categories.map((category) => ({
        id: category.id,
        name: category.name,
        score: category.score,
        band: category.band,
        status: category.status,
      })),
      gaps: report.gaps.slice(0, 10),
      next_actions: report.next_actions,
      disclaimer: report.disclaimer,
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
  const report = RUNS.get(runId);
  if (!report) return { error: "run not found", run_id: runId };
  return {
    run_id: runId,
    status: "complete",
    pass: "compliancepass",
    readiness_score: report.readiness_score,
    summary: report.summary,
    generated_at: report.generated_at,
  };
}

export async function compliancepassReportJson(args: Record<string, unknown>): Promise<unknown> {
  const runId = typeof args.run_id === "string" ? args.run_id : "";
  if (!runId) return { error: "run_id is required" };
  const report = RUNS.get(runId);
  if (!report) return { error: "run not found", run_id: runId };
  return report;
}

export async function compliancepassReportMd(args: Record<string, unknown>): Promise<unknown> {
  const runId = typeof args.run_id === "string" ? args.run_id : "";
  if (!runId) return { error: "run_id is required" };
  const report = RUNS.get(runId);
  if (!report) return { error: "run not found", run_id: runId };
  return {
    run_id: runId,
    format: "markdown",
    markdown: renderCompliancePassMarkdown(report),
  };
}
