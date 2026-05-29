import type { Finding, NotCheckedItem, RunRow, Severity } from "../types/index.js";

export interface SecurityPassReport {
  run_id: string;
  status: RunRow["status"];
  target: RunRow["target"];
  profile: RunRow["profile"];
  disclaimer: RunRow["disclaimer"];
  posture_summary: string;
  score: number;
  severity_counts: Record<Severity, number>;
  verdict_summary: RunRow["verdict_summary"];
  scope_performed: string[];
  findings: Finding[];
  not_checked: NotCheckedItem[];
  coverage_note: string;
  completed_at: string | null;
}

const SEVERITY_WEIGHT: Record<Severity, number> = {
  critical: 35,
  high: 20,
  medium: 10,
  low: 3,
  info: 0,
};

function severityCounts(findings: Finding[]): Record<Severity, number> {
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

function computeScore(findings: Finding[], notChecked: NotCheckedItem[]): number {
  let score = 100;
  for (const finding of findings) {
    if (finding.verdict === "fail") score -= SEVERITY_WEIGHT[finding.severity];
  }
  score -= Math.min(25, notChecked.length * 5);
  return Math.max(0, Math.round(score));
}

function postureSummary(findings: Finding[], notChecked: NotCheckedItem[]): string {
  const failing = findings.filter((finding) => finding.verdict === "fail");
  if (failing.length > 0) {
    const critical = failing.filter((finding) => finding.severity === "critical").length;
    const high = failing.filter((finding) => finding.severity === "high").length;
    return `SecurityPass found ${failing.length} failing security finding(s), including ${critical} critical and ${high} high. Review the evidence before treating this target as ready.`;
  }
  if (notChecked.length > 0) {
    return `SecurityPass found no failing findings in the checks that ran, but ${notChecked.length} check(s) were not performed. Treat this as incomplete coverage.`;
  }
  return "SecurityPass found no failing findings in the performed scope. This is still a scoped review, not a guarantee of security.";
}

function coverageNote(run: RunRow): string {
  if (run.not_checked.length === 0) {
    return "All selected checks returned evidence for this target and profile.";
  }
  return `${run.not_checked.length} selected check(s) were not performed. The run remains honest about untested areas.`;
}

export function buildSecurityPassReport(run: RunRow, findings: Finding[]): SecurityPassReport {
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
    completed_at: run.completed_at,
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function formatSecurityPassReport(report: SecurityPassReport, format: "json" | "markdown" | "html"): unknown {
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
    ...(report.scope_performed.length > 0 ? report.scope_performed.map((item) => `- ${item}`) : ["- No checks ran."]),
    "",
    "## Findings",
    ...(report.findings.length > 0
      ? report.findings.map((finding) => `- [${finding.severity}] ${finding.title} (${finding.verdict})`)
      : ["- No findings reported."]),
    "",
    "## Not Checked",
    ...(report.not_checked.length > 0
      ? report.not_checked.map((item) => `- ${item.title}: ${item.reason}`)
      : ["- No selected checks were skipped."]),
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
    "</article>",
  ].join("\n");
}
