import type { SlopPassResult } from "./types.js";

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function generateJsonReport(result: SlopPassResult): object {
  return {
    ...result,
    generated_at: new Date().toISOString(),
  };
}

export function generateMarkdownReport(result: SlopPassResult): string {
  const lines: string[] = [
    `# SlopPass Report - ${result.target.label}`,
    "",
    `> ${result.disclaimer.compact}`,
    "",
    `Posture: ${result.summary.posture}`,
    "",
    "## Scope performed",
    "",
    ...result.scope.checks_attempted.map((check) => `- ${check}`),
    "",
    "## Findings",
    "",
  ];

  if (result.findings.length === 0) {
    lines.push("No findings in the inspected scope.", "");
  } else {
    for (const finding of result.findings) {
      const location = finding.file ? ` (${finding.file}${finding.line ? `:${finding.line}` : ""})` : "";
      lines.push(`- **${finding.severity}** ${finding.title}${location}`);
      lines.push(`  - Why it matters: ${finding.why_it_matters}`);
      lines.push(`  - Evidence: ${finding.evidence}`);
      lines.push(`  - Suggested fix: ${finding.suggested_fix}`);
      if (finding.confidence_note) lines.push(`  - Confidence: ${finding.confidence_note}`);
    }
    lines.push("");
  }

  lines.push("## Not checked", "");
  if (result.not_checked.length === 0) {
    lines.push("All built-in SlopPass check categories were attempted.", "");
  } else {
    for (const item of result.not_checked) lines.push(`- ${item.label}: ${item.reason}`);
    lines.push("");
  }

  lines.push("## Disclaimer", "", result.disclaimer.body, "");
  return lines.join("\n");
}

export function generateHtmlReport(result: SlopPassResult): string {
  const findings = result.findings
    .map(
      (finding) => `<li>
        <strong>${escapeHtml(finding.severity)}: ${escapeHtml(finding.title)}</strong>
        <p>${escapeHtml(finding.why_it_matters)}</p>
        <p><strong>Evidence:</strong> ${escapeHtml(finding.evidence)}</p>
        <p><strong>Suggested fix:</strong> ${escapeHtml(finding.suggested_fix)}</p>
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
  <h1>SlopPass Report</h1>
  <p>${escapeHtml(result.summary.posture)}</p>
  <h2>Findings</h2>
  <ul>${findings || "<li>No findings in the inspected scope.</li>"}</ul>
  <h2>Not checked</h2>
  <ul>${result.not_checked.map((item) => `<li>${escapeHtml(item.label)}: ${escapeHtml(item.reason)}</li>`).join("") || "<li>All built-in SlopPass check categories were attempted.</li>"}</ul>
</body>
</html>`;
}
