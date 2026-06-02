import type { SlopPassResult } from "./types.js";

const SEVERITIES = ["critical", "high", "medium", "low", "info"] as const;

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeMarkdownText(value: unknown): string {
  return String(value ?? "")
    .replace(/\r?\n/g, " ")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function targetSummary(result: SlopPassResult): string {
  return [result.target.kind, result.target.label, result.target.ref].filter(Boolean).join(" / ");
}

function severityLines(result: SlopPassResult): string[] {
  return SEVERITIES.map((severity) => `${severity}: ${result.summary.counts_by_severity[severity] ?? 0}`);
}

function checkLines(result: SlopPassResult): string[] {
  return result.scope.checks_attempted.length > 0
    ? result.scope.checks_attempted.map((check) => `- ${escapeMarkdownText(check)}`)
    : ["No check categories were attempted."];
}

function fencedTextBlock(content: string, language = "text"): string[] {
  const longestRun = Math.max(2, ...Array.from(content.matchAll(/`+/g), (match) => match[0].length));
  const fence = "`".repeat(longestRun + 1);
  return [`${fence}${language}`, content, fence];
}

export function generateJsonReport(result: SlopPassResult): object {
  return {
    ...result,
    generated_at: new Date().toISOString(),
  };
}

export function generateBuildFixPrompt(result: SlopPassResult): string {
  const grouped = {
    blockers: result.findings.filter((finding) => finding.severity === "critical" || finding.severity === "high"),
    warnings: result.findings.filter((finding) => finding.severity === "medium" || finding.severity === "low"),
    nudges: result.findings.filter((finding) => finding.severity === "info"),
  };
  const lines = [
    "SlopPass build-fix prompt",
    "",
    "Fix only the issues below. Do not change orthogonal code. Keep the patch inside the inspected scope unless a finding explicitly names a required extra file.",
  ];

  for (const [label, findings] of Object.entries(grouped)) {
    lines.push("", label.toUpperCase());
    if (findings.length === 0) {
      lines.push("- None.");
      continue;
    }
    for (const finding of findings) {
      const location = finding.file ? ` (${finding.file}${finding.line ? `:${finding.line}` : ""})` : "";
      lines.push(`- [${finding.category}] ${finding.title}${location}`);
      lines.push(`  Evidence: ${finding.evidence}`);
      lines.push(`  Fix: ${finding.suggested_fix}`);
    }
  }

  lines.push("", "After fixing, rerun SlopPass on the same target and keep the new receipt with the PR.");
  return lines.join("\n");
}

export function generateMarkdownReport(result: SlopPassResult): string {
  const lines: string[] = [
    `# SlopPass Report - ${escapeMarkdownText(result.target.label)}`,
    "",
    `Target: ${escapeMarkdownText(targetSummary(result))}`,
    "",
    `> ${escapeMarkdownText(result.disclaimer.compact)}`,
    "",
    `Posture: ${escapeMarkdownText(result.summary.posture)}`,
    "",
    `Verdict: ${escapeMarkdownText(result.verdict)}`,
    "",
    `Provider: ${escapeMarkdownText(result.scope.provider)}`,
    "",
    `Coverage: ${escapeMarkdownText(result.summary.coverage_note)}`,
    "",
    "## Scope performed",
    "",
    ...checkLines(result),
    "",
    "## Files reviewed",
    "",
    ...(result.scope.files_reviewed.length > 0
      ? result.scope.files_reviewed.map((file) => `- ${escapeMarkdownText(file)}`)
      : ["No files were inspected."]),
    "",
    "## Severity counts",
    "",
    ...severityLines(result).map((line) => `- ${line}`),
    "",
    "## Findings",
    "",
  ];

  if (result.findings.length === 0) {
    lines.push("No findings in the inspected scope.", "");
  } else {
    for (const finding of result.findings) {
      const location = finding.file ? ` (${finding.file}${finding.line ? `:${finding.line}` : ""})` : "";
      lines.push(`- **${escapeMarkdownText(finding.severity)}** ${escapeMarkdownText(finding.title)}${escapeMarkdownText(location)}`);
      lines.push(`  - Why it matters: ${escapeMarkdownText(finding.why_it_matters)}`);
      lines.push(`  - Evidence: ${escapeMarkdownText(finding.evidence)}`);
      lines.push(`  - Suggested fix: ${escapeMarkdownText(finding.suggested_fix)}`);
      if (finding.confidence_note) lines.push(`  - Confidence: ${escapeMarkdownText(finding.confidence_note)}`);
    }
    lines.push("");
  }

  lines.push("## Not checked", "");
  if (result.not_checked.length === 0) {
    lines.push("All built-in SlopPass check categories were attempted.", "");
  } else {
    for (const item of result.not_checked) lines.push(`- ${escapeMarkdownText(item.label)}: ${escapeMarkdownText(item.reason)}`);
    lines.push("");
  }

  lines.push("## Build-fix prompt", "", ...fencedTextBlock(generateBuildFixPrompt(result)), "");
  lines.push("## Disclaimer", "", escapeMarkdownText(result.disclaimer.body), "");
  return lines.join("\n");
}

export function generateHtmlReport(result: SlopPassResult): string {
  const filesReviewed = result.scope.files_reviewed
    .map((file) => `<li>${escapeHtml(file)}</li>`)
    .join("");
  const checksAttempted = result.scope.checks_attempted
    .map((check) => `<li>${escapeHtml(check)}</li>`)
    .join("");
  const severityCounts = severityLines(result)
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join("");
  const findings = result.findings
    .map(
      (finding) => `<li>
        <strong>${escapeHtml(finding.severity)}: ${escapeHtml(finding.title)}</strong>
        ${finding.file ? `<p><strong>Location:</strong> ${escapeHtml(finding.file)}${finding.line ? `:${escapeHtml(finding.line)}` : ""}</p>` : ""}
        <p>${escapeHtml(finding.why_it_matters)}</p>
        <p><strong>Evidence:</strong> ${escapeHtml(finding.evidence)}</p>
        <p><strong>Suggested fix:</strong> ${escapeHtml(finding.suggested_fix)}</p>
        ${finding.confidence_note ? `<p><strong>Confidence:</strong> ${escapeHtml(finding.confidence_note)}</p>` : ""}
      </li>`
    )
    .join("");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>SlopPass Report - ${escapeHtml(result.target.label)}</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 32px; color: #111827; }
    .banner { border: 1px solid #f59e0b; background: #fffbeb; padding: 16px; border-radius: 8px; }
    li { margin-bottom: 16px; }
  </style>
</head>
<body>
  <div class="banner">
    <strong>${escapeHtml(result.disclaimer.headline)}</strong>
    <p>${escapeHtml(result.disclaimer.body)}</p>
  </div>
  <h1>SlopPass Report - ${escapeHtml(result.target.label)}</h1>
  <p><strong>Target:</strong> ${escapeHtml(targetSummary(result))}</p>
  <p><strong>Verdict:</strong> ${escapeHtml(result.verdict)}</p>
  <p><strong>Provider:</strong> ${escapeHtml(result.scope.provider)}</p>
  <p>${escapeHtml(result.summary.posture)}</p>
  <p><strong>Coverage:</strong> ${escapeHtml(result.summary.coverage_note)}</p>
  <h2>Scope performed</h2>
  <ul>${checksAttempted || "<li>No check categories were attempted.</li>"}</ul>
  <h2>Files reviewed</h2>
  <ul>${filesReviewed || "<li>No files were inspected.</li>"}</ul>
  <h2>Severity counts</h2>
  <ul>${severityCounts}</ul>
  <h2>Findings</h2>
  <ul>${findings || "<li>No findings in the inspected scope.</li>"}</ul>
  <h2>Build-fix prompt</h2>
  <pre>${escapeHtml(generateBuildFixPrompt(result))}</pre>
  <h2>Not checked</h2>
  <ul>${result.not_checked.map((item) => `<li>${escapeHtml(item.label)}: ${escapeHtml(item.reason)}</li>`).join("") || "<li>All built-in SlopPass check categories were attempted.</li>"}</ul>
</body>
</html>`;
}
