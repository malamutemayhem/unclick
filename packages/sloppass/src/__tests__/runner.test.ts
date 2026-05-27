import { describe, expect, it } from "vitest";
import { runSlopPass } from "../runner/index.js";

describe("SlopPass runner", () => {
  it("returns the canonical target, scope, findings, and not_checked sections", async () => {
    const result = await runSlopPass({
      target: { kind: "files", label: "fixture", files: ["src/generated.ts"] },
      files: [
        {
          path: "src/generated.ts",
          content: "export function run() { try { return true; } catch {} }",
        },
      ],
      checks: ["logic_plausibility"],
    });

    expect(result.target.label).toBe("fixture");
    expect(result.scope.checks_attempted).toEqual(["logic_plausibility"]);
    expect(result.findings.some((finding) => finding.category === "logic_plausibility")).toBe(true);
    expect(result.not_checked.length).toBeGreaterThan(0);
    expect(result.disclaimer.compact).toContain("Scoped review only");
  });

  it("treats Slopocalypse as a first-class check category", async () => {
    const result = await runSlopPass({
      target: { kind: "files", label: "wrapper", files: ["src/wrapper.ts"] },
      files: [{ path: "src/wrapper.ts", content: "export const retryWrapper = true;" }],
      checks: ["slopocalypse_failure_mode"],
    });

    expect(result.findings).toContainEqual(
      expect.objectContaining({
        category: "slopocalypse_failure_mode",
        title: "Robustness wording needs evidence",
      })
    );
  });

  it("runs against a unified diff and keeps evidence line numbers", async () => {
    const result = await runSlopPass({
      target: { kind: "diff", label: "PR diff", ref: "abc123" },
      diff: [
        "diff --git a/src/feature.ts b/src/feature.ts",
        "--- a/src/feature.ts",
        "+++ b/src/feature.ts",
        "@@ -40,6 +40,7 @@ export function feature() {",
        " const before = true;",
        "+const value: any = eval(input);",
        " return before;",
      ].join("\n"),
      checks: ["grounding_api_reality", "maintenance_change_risk"],
    });

    expect(result.scope.files_reviewed).toEqual(["src/feature.ts"]);
    expect(result.findings).toContainEqual(
      expect.objectContaining({
        title: "Dynamic code execution is present",
        file: "src/feature.ts",
        line: 41,
      }),
    );
    expect(result.verdict).toBe("fail");
  });

  it("falls back to diff input when provided file slices are empty", async () => {
    const result = await runSlopPass({
      target: { kind: "diff", label: "empty files plus diff" },
      files: [{ path: "src/empty.ts", content: "" }],
      diff: [
        "diff --git a/src/real.ts b/src/real.ts",
        "--- a/src/real.ts",
        "+++ b/src/real.ts",
        "@@ -8,6 +8,7 @@ export function real() {",
        "+const value: any = eval(input);",
      ].join("\n"),
    });

    expect(result.scope.files_reviewed).toEqual(["src/real.ts"]);
    expect(result.findings).toContainEqual(
      expect.objectContaining({ title: "Dynamic code execution is present", line: 8 }),
    );
  });

  it("deduplicates files reviewed across multiple diff hunks", async () => {
    const result = await runSlopPass({
      target: { kind: "diff", label: "multi-hunk diff" },
      diff: [
        "diff --git a/src/repeat.ts b/src/repeat.ts",
        "--- a/src/repeat.ts",
        "+++ b/src/repeat.ts",
        "@@ -1,2 +1,3 @@",
        "+const first: any = 1;",
        "@@ -20,2 +21,3 @@",
        "+const second: any = 2;",
      ].join("\n"),
      checks: ["maintenance_change_risk"],
    });

    expect(result.scope.files_reviewed).toEqual(["src/repeat.ts"]);
    expect(result.findings.filter((finding) => finding.title === "Type safety was bypassed")).toHaveLength(2);
  });

  it("supports a stripped promptfoo-style model provider scaffold", async () => {
    const result = await runSlopPass({
      target: { kind: "files", label: "echo", files: ["src/a.ts"] },
      files: [{ path: "src/a.ts", content: "export const a = 1;" }],
      provider: "openai",
      checks: ["maintenance_change_risk"],
    });

    expect(result.scope.provider).toBe("openai");
    expect(result.findings).toContainEqual(
      expect.objectContaining({
        title: "OpenAI provider scaffold is wired",
      })
    );
  });
});
