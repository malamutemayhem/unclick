import { describe, expect, it } from "vitest";
import { generateHtmlReport, generateJsonReport, generateMarkdownReport } from "../reporter.js";
import { runSlopPass } from "../runner/index.js";

describe("SlopPass reporter", () => {
  it("keeps the disclaimer visible in markdown and HTML reports", async () => {
    const result = await runSlopPass({
      target: { kind: "files", label: "report", files: ["src/report.ts"] },
      files: [{ path: "src/report.ts", content: "export const placeholder = true;" }],
    });

    const markdown = generateMarkdownReport(result);
    const html = generateHtmlReport(result);

    expect(markdown).toContain("Scoped review only");
    expect(html).toContain("SlopPass is a scoped quality review");
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
