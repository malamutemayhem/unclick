import { describe, expect, it } from "vitest";
import {
  generateBuildFixPrompt,
  generateHtmlReport,
  generateJsonReport,
  generateMarkdownReport,
} from "../reporter.js";
import { runSlopPass } from "../runner/index.js";
import { createSlopPassVerdictPack } from "../verdict-pack.js";

describe("SlopPass reporter", () => {
  it("keeps the disclaimer visible in markdown and HTML reports", async () => {
    const result = await runSlopPass({
      target: { kind: "files", label: "report", files: ["src/report.ts"] },
      files: [{ path: "src/report.ts", content: "export const placeholder = true;" }],
    });

    const markdown = generateMarkdownReport(result);
    const html = generateHtmlReport(result);

    expect(markdown).toContain("Scoped review only");
    expect(markdown).toContain("Target: files / report");
    expect(markdown).toContain("Build-fix prompt");
    expect(markdown).toContain("Do not change orthogonal code");
    expect(markdown).toContain("Verdict: warn");
    expect(markdown).toContain("Provider: http");
    expect(markdown).toContain("Coverage: This result only covers the target");
    expect(markdown).toContain("## Files reviewed");
    expect(markdown).toContain("- src/report.ts");
    expect(markdown).toContain("## Severity counts");
    expect(markdown).toContain("- medium: 1");
    expect(html).toContain("SlopPass is a scoped quality review");
    expect(html).toContain("<h1>SlopPass Report - report</h1>");
    expect(html).toContain("<strong>Target:</strong> files / report");
    expect(html).toContain("Build-fix prompt");
    expect(html).toContain("<strong>Verdict:</strong> warn");
    expect(html).toContain("<strong>Provider:</strong> http");
    expect(html).toContain("<h2>Files reviewed</h2>");
    expect(html).toContain("<li>src/report.ts</li>");
    expect(html).toContain("<li>medium: 1</li>");
    expect(html).toContain("src/report.ts:1");
  });

  it("escapes target and file names in rendered reports", async () => {
    const result = await runSlopPass({
      target: { kind: "files", label: "<script>\nalert(1)</script>", files: ["src/<report>.ts"] },
      files: [{ path: "src/<report>.ts", content: "export const placeholder = true;" }],
    });

    const markdown = generateMarkdownReport(result);
    const html = generateHtmlReport(result);

    expect(markdown).toContain("SlopPass Report - &lt;script&gt; alert(1)&lt;/script&gt;");
    expect(markdown).toContain("- src/&lt;report&gt;.ts");
    expect(markdown).not.toContain("# SlopPass Report - <script>");
    expect(html).toContain("SlopPass Report - &lt;script&gt;\nalert(1)&lt;/script&gt;");
    expect(html).toContain("<li>src/&lt;report&gt;.ts</li>");
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<li>src/<report>.ts</li>");
  });

  it("renders confidence notes in both markdown and HTML findings", async () => {
    const result = await runSlopPass({
      target: { kind: "files", label: "provider", files: ["src/provider.ts"] },
      files: [{ path: "src/provider.ts", content: "export const ok = true;" }],
      provider: "openai",
      checks: ["maintenance_change_risk"],
    });

    expect(generateMarkdownReport(result)).toContain("Confidence: Offline provider mode. No model call was made.");
    expect(generateHtmlReport(result)).toContain("<strong>Confidence:</strong> Offline provider mode. No model call was made.");
  });

  it("emits an agent-ready build-fix prompt grouped by severity", async () => {
    const result = await runSlopPass({
      target: { kind: "files", label: "prompt", files: ["src/prompt.ts"] },
      files: [{ path: "src/prompt.ts", content: "export const value: any = eval(input);" }],
    });

    const prompt = generateBuildFixPrompt(result);

    expect(prompt).toContain("BLOCKERS");
    expect(prompt).toContain("Dynamic code execution is present");
    expect(prompt).toContain("src/prompt.ts:1");
  });

  it("keeps the markdown build-fix fence intact when evidence contains backticks", async () => {
    const result = await runSlopPass({
      target: { kind: "files", label: "fence", files: ["src/fence.ts"] },
      files: [{ path: "src/fence.ts", content: "export const value: any = 1;" }],
    });
    if (!result.findings[0]) throw new Error("expected a finding");
    result.findings[0].evidence = "```";

    const markdown = generateMarkdownReport(result);

    expect(markdown).toContain("````text");
    expect(markdown).toContain("  Evidence: ```");
    expect(markdown).toContain("\n````\n");
  });

  it("renders an explicit empty-scope line for plan-only reports", () => {
    const result = createSlopPassVerdictPack({
      target: { kind: "repo", label: "planned" },
    });

    expect(generateMarkdownReport(result)).toContain("No check categories were attempted.");
    expect(generateHtmlReport(result)).toContain("<li>No check categories were attempted.</li>");
  });

  it("emits JSON with the canonical result shape", async () => {
    const result = await runSlopPass({
      target: { kind: "files", label: "json", files: ["src/json.ts"] },
      files: [{ path: "src/json.ts", content: "export const value = 1;" }],
    });
    const report = generateJsonReport(result) as Record<string, unknown>;

    expect(report.target).toBeDefined();
    expect(report.scope).toBeDefined();
    expect(report.findings).toBeDefined();
    expect(report.not_checked).toBeDefined();
    expect(report.generated_at).toEqual(expect.any(String));
  });
});
