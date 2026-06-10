import { describe, expect, it } from "vitest";

import { renderCompliancePassMarkdown, renderCompliancePassHtml } from "./reporter.js";
import type { CompliancePassReport } from "./schema.js";

function makeReport(overrides: Partial<CompliancePassReport> = {}): CompliancePassReport {
  return {
    schema_version: "1.0",
    generated_at: "2025-06-01T00:00:00Z",
    valid_until: "2025-07-01T00:00:00Z",
    source: "test-runner",
    product: "CompliancePass",
    legacy_aliases: ["EnterprisePass"],
    headline: "Test report headline",
    target: { name: "test-target", surface: "repo" },
    status: "complete",
    readiness_band: "green",
    wording_notice: "For informational purposes only.",
    readiness_score: { value: 85, band: "green", traffic_light: "green", rationale: "All good" },
    summary: {
      score_overall: 85,
      headline: "Summary headline",
      checks_total: 5,
      checks_pass: 4,
      checks_partial: 1,
      checks_fail: 0,
      checks_unknown: 0,
      checks_na: 0,
      checks_pending: 0,
      gap_severity_counts: { critical: 0, high: 0, medium: 1, low: 0, info: 0 },
      blocking_gap_count: 0,
    },
    report_integrity: {
      categories_total: 1,
      checks_total_matches_categories: true,
      gap_count_matches_findings: true,
      green_requires_no_high_or_critical_gaps: true,
      max_public_age_hours: 48,
    },
    report_sections: ["summary", "categories"],
    categories: [
      {
        id: "code_maintainability",
        name: "Code Maintainability",
        status: "pass",
        score: 90,
        band: "green",
        summary: "Code is well maintained",
        checks: [
          {
            id: "lint",
            category_id: "code_maintainability",
            title: "Linting",
            status: "pass",
            score: 100,
            summary: "All linting checks pass",
            evidence: [],
            findings: [],
          },
        ],
      },
    ],
    next_actions: ["Review documentation", "Update CI config"],
    gaps: [
      {
        id: "gap-1",
        severity: "medium",
        title: "Missing changelog",
        summary: "No CHANGELOG.md found",
        recommendation: "Add a changelog",
        evidence: [],
      },
    ],
    future_regret_notes: [],
    evidence: [],
    exclusions: [],
    disclaimer: "This report is informational only.",
    ...overrides,
  } as CompliancePassReport;
}

describe("renderCompliancePassMarkdown", () => {
  it("includes the product title", () => {
    const md = renderCompliancePassMarkdown(makeReport());
    expect(md).toContain("# CompliancePass Report");
  });

  it("includes the target name", () => {
    const md = renderCompliancePassMarkdown(makeReport());
    expect(md).toContain("Target: test-target");
  });

  it("includes the score and band", () => {
    const md = renderCompliancePassMarkdown(makeReport());
    expect(md).toContain("Score: 85/100 (green)");
  });

  it("includes blocking gap count", () => {
    const md = renderCompliancePassMarkdown(makeReport());
    expect(md).toContain("Blocking gaps: 0");
  });

  it("renders category table rows", () => {
    const md = renderCompliancePassMarkdown(makeReport());
    expect(md).toContain("| Code Maintainability | 90 | green | pass |");
  });

  it("renders next actions as bullet list", () => {
    const md = renderCompliancePassMarkdown(makeReport());
    expect(md).toContain("- Review documentation");
    expect(md).toContain("- Update CI config");
  });

  it("shows fallback when no next actions", () => {
    const md = renderCompliancePassMarkdown(makeReport({ next_actions: [] }));
    expect(md).toContain("No immediate next action identified");
  });

  it("includes the disclaimer", () => {
    const md = renderCompliancePassMarkdown(makeReport());
    expect(md).toContain("This report is informational only.");
  });

  it("includes the summary headline", () => {
    const md = renderCompliancePassMarkdown(makeReport());
    expect(md).toContain("Summary headline");
  });
});

describe("renderCompliancePassHtml", () => {
  it("produces valid HTML with doctype", () => {
    const html = renderCompliancePassHtml(makeReport());
    expect(html).toContain("<!doctype html>");
    expect(html).toContain("</html>");
  });

  it("includes the product title in the page", () => {
    const html = renderCompliancePassHtml(makeReport());
    expect(html).toContain("CompliancePass Report");
  });

  it("includes the target name", () => {
    const html = renderCompliancePassHtml(makeReport());
    expect(html).toContain("test-target");
  });

  it("includes the score value", () => {
    const html = renderCompliancePassHtml(makeReport());
    expect(html).toContain("85/100");
  });

  it("renders category rows in the table", () => {
    const html = renderCompliancePassHtml(makeReport());
    expect(html).toContain("Code Maintainability");
    expect(html).toContain("<td>90</td>");
  });

  it("renders gaps as list items", () => {
    const html = renderCompliancePassHtml(makeReport());
    expect(html).toContain("Missing changelog");
    expect(html).toContain("No CHANGELOG.md found");
  });

  it("shows fallback when no gaps", () => {
    const html = renderCompliancePassHtml(makeReport({ gaps: [] }));
    expect(html).toContain("No current gaps");
  });

  it("renders next action items", () => {
    const html = renderCompliancePassHtml(makeReport());
    expect(html).toContain("Review documentation");
    expect(html).toContain("Update CI config");
  });

  it("shows fallback when no next actions", () => {
    const html = renderCompliancePassHtml(makeReport({ next_actions: [] }));
    expect(html).toContain("No immediate next action identified");
  });

  it("escapes HTML special characters", () => {
    const html = renderCompliancePassHtml(makeReport({
      headline: 'Test <script>alert("xss")</script>',
    }));
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("includes the disclaimer", () => {
    const html = renderCompliancePassHtml(makeReport());
    expect(html).toContain("This report is informational only.");
  });

  it("includes the wording notice", () => {
    const html = renderCompliancePassHtml(makeReport());
    expect(html).toContain("For informational purposes only.");
  });
});
