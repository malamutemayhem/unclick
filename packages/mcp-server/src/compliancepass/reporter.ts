import type { CompliancePassReport } from "./schema.js";

export function renderCompliancePassMarkdown(report: CompliancePassReport): string {
  const lines = [
    `# ${report.product} Report`,
    "",
    report.headline,
    "",
    `Target: ${report.target.name}`,
    `Score: ${report.readiness_score.value}/100 (${report.readiness_score.band})`,
    `Blocking gaps: ${report.summary.blocking_gap_count}`,
    `Valid until: ${report.valid_until}`,
    "",
    "## Summary",
    "",
    report.summary.headline,
    "",
    "| Category | Score | Band | Status |",
    "| --- | ---: | --- | --- |",
    ...report.categories.map((category) =>
      `| ${category.name} | ${category.score} | ${category.band} | ${category.status} |`,
    ),
    "",
    "## Next Actions",
    "",
    ...(report.next_actions.length
      ? report.next_actions.map((action) => `- ${action}`)
      : ["- No immediate next action identified."]),
    "",
    "## Disclaimer",
    "",
    report.disclaimer,
    "",
  ];

  return `${lines.join("\n").trimEnd()}\n`;
}

export function renderCompliancePassHtml(report: CompliancePassReport): string {
  const categoryRows = report.categories.map((category) => `
          <tr>
            <td>${escapeHtml(category.name)}</td>
            <td>${category.score}</td>
            <td>${escapeHtml(category.band)}</td>
            <td>${escapeHtml(category.status)}</td>
          </tr>`).join("");
  const gapItems = report.gaps.length > 0
    ? report.gaps.map((gap) => `
          <li>
            <strong>${escapeHtml(gap.title)}</strong>
            <span>${escapeHtml(gap.severity)}</span>
            <p>${escapeHtml(gap.summary)}</p>
          </li>`).join("")
    : "<li>No current gaps.</li>";
  const actionItems = report.next_actions.length > 0
    ? report.next_actions.map((action) => `<li>${escapeHtml(action)}</li>`).join("")
    : "<li>No immediate next action identified.</li>";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(report.product)} Report</title>
    <style>
      :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      body { margin: 0; background: #f8fafc; color: #172033; }
      main { max-width: 960px; margin: 0 auto; padding: 40px 20px 56px; }
      header { border-bottom: 1px solid #d8dee8; padding-bottom: 24px; margin-bottom: 28px; }
      h1 { font-size: 2rem; margin: 0 0 8px; letter-spacing: 0; }
      h2 { font-size: 1.15rem; margin: 28px 0 12px; letter-spacing: 0; }
      p { line-height: 1.6; }
      .meta { display: grid; gap: 10px; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); margin-top: 20px; }
      .metric { border: 1px solid #d8dee8; border-radius: 8px; background: white; padding: 12px; }
      .metric span { display: block; color: #5c667a; font-size: 0.8rem; }
      .metric strong { display: block; margin-top: 4px; font-size: 1.1rem; }
      table { width: 100%; border-collapse: collapse; background: white; border: 1px solid #d8dee8; border-radius: 8px; overflow: hidden; }
      th, td { border-bottom: 1px solid #e6eaf0; padding: 10px 12px; text-align: left; }
      th { background: #eef3f8; color: #313c50; }
      tr:last-child td { border-bottom: 0; }
      ul { padding-left: 1.2rem; }
      li { margin: 10px 0; }
      li span { color: #6b3b00; margin-left: 8px; font-size: 0.85rem; text-transform: uppercase; }
      .notice { border-left: 4px solid #c48113; background: #fff8ea; padding: 12px 14px; }
    </style>
  </head>
  <body>
    <main>
      <header>
        <h1>${escapeHtml(report.product)} Report</h1>
        <p>${escapeHtml(report.headline)}</p>
        <p class="notice">${escapeHtml(report.wording_notice)}</p>
        <section class="meta" aria-label="Report summary">
          <div class="metric"><span>Target</span><strong>${escapeHtml(report.target.name)}</strong></div>
          <div class="metric"><span>Score</span><strong>${report.readiness_score.value}/100</strong></div>
          <div class="metric"><span>Band</span><strong>${escapeHtml(report.readiness_band)}</strong></div>
          <div class="metric"><span>Blocking gaps</span><strong>${report.summary.blocking_gap_count}</strong></div>
          <div class="metric"><span>Valid until</span><strong>${escapeHtml(report.valid_until)}</strong></div>
        </section>
      </header>
      <section>
        <h2>Summary</h2>
        <p>${escapeHtml(report.summary.headline)}</p>
        <table>
          <thead><tr><th>Category</th><th>Score</th><th>Band</th><th>Status</th></tr></thead>
          <tbody>${categoryRows}
          </tbody>
        </table>
      </section>
      <section>
        <h2>Gaps</h2>
        <ul>${gapItems}
        </ul>
      </section>
      <section>
        <h2>Next Actions</h2>
        <ul>${actionItems}
        </ul>
      </section>
      <section>
        <h2>Disclaimer</h2>
        <p>${escapeHtml(report.disclaimer)}</p>
      </section>
    </main>
  </body>
</html>
`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
