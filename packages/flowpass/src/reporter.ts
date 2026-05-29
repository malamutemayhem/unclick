import type {
  FlowPassFinding,
  FlowPassReport,
  FlowPassStepResult,
} from "./schema.js";

const SEVERITIES = ["critical", "high", "medium", "low", "info"] as const;

export interface GenerateFlowPassHtmlReportOptions {
  ogImageUrl?: string;
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeMarkdown(value: unknown): string {
  return String(value ?? "")
    .replace(/\r?\n/g, " ")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function findingLines(finding: FlowPassFinding): string[] {
  return [
    `- ${escapeMarkdown(finding.severity)}: ${escapeMarkdown(finding.title)}`,
    `  - Evidence: ${escapeMarkdown(finding.summary)}`,
    ...(finding.recommendation
      ? [`  - Next: ${escapeMarkdown(finding.recommendation)}`]
      : []),
  ];
}

function stepSummary(step: FlowPassStepResult): string {
  return `${step.label}: ${step.verdict}, ${step.score}/100`;
}

function defaultOgImageUrl(report: FlowPassReport): string {
  const target = new URL(report.target_url);
  return `${target.protocol}//${target.host}/og-image.png`;
}

function severityLines(report: FlowPassReport): string[] {
  const counts = report.summary?.counts_by_severity;
  if (!counts) return ["- No severity summary was generated."];
  return SEVERITIES.map((severity) => `- ${severity}: ${counts[severity]}`);
}

export function generateFlowPassJsonReport(report: FlowPassReport): object {
  return {
    ...report,
    generated_report_at: new Date().toISOString(),
  };
}

export function generateFlowPassFixPrompt(report: FlowPassReport): string {
  const findings = report.steps.flatMap((step) => step.findings);
  const lines = [
    "FlowPass journey-fix prompt",
    "",
    `Target: ${report.target_url}`,
    `Journey: ${report.journey.name}`,
    "",
    "Fix only the journey proof gaps below. Keep changes scoped to the user path, receipt, recovery state, or fixture evidence named by FlowPass.",
  ];

  if (findings.length === 0) {
    lines.push("", "No blocking journey findings were detected in this fixture run.");
  } else {
    lines.push("", "Findings");
    for (const item of findings) lines.push(...findingLines(item));
  }

  lines.push(
    "",
    "After fixing, rerun FlowPass with the same journey and attach the new receipt to the PR or Boardroom job.",
  );
  return lines.join("\n");
}

export function generateFlowPassMarkdownReport(report: FlowPassReport): string {
  const lines: string[] = [
    `# FlowPass Report - ${escapeMarkdown(report.journey.name)}`,
    "",
    `Target: ${escapeMarkdown(report.target_url)}`,
    "",
    `Mode: ${escapeMarkdown(report.mode)}`,
    "",
    `Verdict: ${escapeMarkdown(report.verdict)}`,
    "",
    `Journey readiness score: ${report.journey_readiness_score}/100`,
    "",
    `Posture: ${escapeMarkdown(report.summary?.posture ?? "No posture summary was generated.")}`,
    "",
    `Coverage: ${escapeMarkdown(report.summary?.coverage_note ?? "No coverage summary was generated.")}`,
    "",
    "## Steps",
    "",
  ];

  for (const step of report.steps) {
    lines.push(`- ${escapeMarkdown(stepSummary(step))}`);
    for (const comment of step.comments) lines.push(`  - ${escapeMarkdown(comment)}`);
    for (const item of step.findings) lines.push(...findingLines(item));
  }

  lines.push("", "## Hat panel", "");
  if (report.hats.length === 0) {
    lines.push("- No hat outputs were generated.");
  } else {
    for (const hat of report.hats) {
      lines.push(`- ${escapeMarkdown(hat.hat_id)}: ${escapeMarkdown(hat.verdict)}. ${escapeMarkdown(hat.summary)}`);
    }
  }

  lines.push("", "## Severity counts", "", ...severityLines(report));
  lines.push("", "## Disagreements", "");
  if (report.disagreements.length === 0) {
    lines.push("- No open Driver versus Verifier disagreement.");
  } else {
    for (const disagreement of report.disagreements) {
      lines.push(`- ${escapeMarkdown(disagreement.id)}: ${escapeMarkdown(disagreement.summary)}`);
    }
  }

  lines.push("", "## Not checked", "");
  for (const item of report.not_checked) {
    lines.push(`- ${escapeMarkdown(item.label)}: ${escapeMarkdown(item.reason)}`);
  }

  lines.push("", "## Build-fix prompt", "", "```text", generateFlowPassFixPrompt(report), "```", "");
  return lines.join("\n");
}

export function generateFlowPassHtmlReport(
  report: FlowPassReport,
  options: GenerateFlowPassHtmlReportOptions = {},
): string {
  const title = `FlowPass Report - ${report.journey.name}`;
  const description =
    report.summary?.posture ||
    "FlowPass is a scoped journey proof for end-to-end product readiness.";
  const ogImageUrl = options.ogImageUrl || defaultOgImageUrl(report);
  const steps = report.steps
    .map(
      (step) => `<li>
        <strong>${escapeHtml(step.label)}: ${escapeHtml(step.verdict)} (${escapeHtml(step.score)}/100)</strong>
        <ul>
          ${step.comments.map((comment) => `<li>${escapeHtml(comment)}</li>`).join("")}
          ${step.findings
            .map(
              (finding) => `<li>${escapeHtml(finding.severity)}: ${escapeHtml(finding.title)}
                <p>${escapeHtml(finding.summary)}</p>
                ${finding.recommendation ? `<p><strong>Next:</strong> ${escapeHtml(finding.recommendation)}</p>` : ""}
              </li>`,
            )
            .join("")}
        </ul>
      </li>`,
    )
    .join("");
  const hats = report.hats
    .map((hat) => `<li>${escapeHtml(hat.hat_id)}: ${escapeHtml(hat.verdict)}. ${escapeHtml(hat.summary)}</li>`)
    .join("");
  const notChecked = report.not_checked
    .map((item) => `<li>${escapeHtml(item.label)}: ${escapeHtml(item.reason)}</li>`)
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${escapeHtml(ogImageUrl)}">
  <style>
    body { font-family: system-ui, sans-serif; margin: 32px; color: #111827; line-height: 1.5; }
    .banner { border: 1px solid #0ea5e9; background: #f0f9ff; padding: 16px; border-radius: 8px; }
    li { margin-bottom: 10px; }
    pre { white-space: pre-wrap; background: #f8fafc; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="banner">
    <strong>FlowPass is a scoped journey proof, not a production certification.</strong>
    <p>${escapeHtml(report.summary?.coverage_note ?? "Unknown live paths stay unknown unless separately checked.")}</p>
  </div>
  <h1>${escapeHtml(title)}</h1>
  <p><strong>Target:</strong> ${escapeHtml(report.target_url)}</p>
  <p><strong>Mode:</strong> ${escapeHtml(report.mode)}</p>
  <p><strong>Verdict:</strong> ${escapeHtml(report.verdict)}</p>
  <p><strong>Score:</strong> ${escapeHtml(report.journey_readiness_score)}/100</p>
  <p>${escapeHtml(report.summary?.posture ?? "")}</p>
  <h2>Steps</h2>
  <ul>${steps}</ul>
  <h2>Hat panel</h2>
  <ul>${hats || "<li>No hat outputs were generated.</li>"}</ul>
  <h2>Not checked</h2>
  <ul>${notChecked || "<li>No exclusions were recorded.</li>"}</ul>
  <h2>Build-fix prompt</h2>
  <pre>${escapeHtml(generateFlowPassFixPrompt(report))}</pre>
</body>
</html>`;
}
