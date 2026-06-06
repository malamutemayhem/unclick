import { describe, expect, it } from "vitest";
import { DEFAULT_CHECKS } from "../categories.js";
import { SLOPPASS_LIMITS, SlopPassResultSchema, SlopPassRunInputSchema } from "../schema.js";

describe("SlopPass run schema", () => {
  it("accepts the canonical target, files, and provider shape", () => {
    const parsed = SlopPassRunInputSchema.parse({
      target: { kind: "files", label: "source sample", files: ["src/example.ts"] },
      files: [{ path: "src/example.ts", content: "export const ok = true;" }],
    });

    expect(parsed.provider).toBe("http");
    expect(parsed.target.label).toBe("source sample");
  });

  it("keeps the seven PRD categories as built-in checks", () => {
    expect(DEFAULT_CHECKS).toEqual([
      "grounding_api_reality",
      "logic_plausibility",
      "scaffold_without_substance",
      "test_proof_theatre",
      "slopocalypse_failure_mode",
      "maintenance_change_risk",
      "vcs_integration_risk",
    ]);
  });

  it("accepts a diff instead of source files", () => {
    const parsed = SlopPassRunInputSchema.parse({
      target: { kind: "diff", label: "diff-only" },
      diff: [
        "diff --git a/src/example.ts b/src/example.ts",
        "--- a/src/example.ts",
        "+++ b/src/example.ts",
        "@@ -1 +1 @@",
        "+export const ok = true;",
      ].join("\n"),
    });

    expect(parsed.diff).toContain("src/example.ts");
    expect(parsed.provider).toBe("http");
  });

  it("keeps GitHub PR target metadata on diff-backed runs", () => {
    const parsed = SlopPassRunInputSchema.parse({
      target: {
        kind: "pr",
        label: "PR #1200",
        repo: "malamutemayhem/unclick",
        number: 1200,
        url: "https://github.com/malamutemayhem/unclick/pull/1200",
      },
      diff: [
        "diff --git a/src/example.ts b/src/example.ts",
        "--- a/src/example.ts",
        "+++ b/src/example.ts",
        "@@ -1 +1 @@",
        "+export const ok = true;",
      ].join("\n"),
    });

    expect(parsed.target.repo).toBe("malamutemayhem/unclick");
    expect(parsed.target.number).toBe(1200);
    expect(parsed.target.url).toBe("https://github.com/malamutemayhem/unclick/pull/1200");
  });

  it("accepts git_context as a review source", () => {
    const parsed = SlopPassRunInputSchema.parse({
      target: { kind: "pr", label: "PR 123", ref: "123" },
      git_context: {
        base_sha: "base",
        head_sha: "head",
        files: {
          "src/example.ts": {
            base_blob: "export const before = true;",
            main_blob: "export const current = true;",
            pr_head_blob: "export const before = true;",
          },
        },
      },
      checks: ["vcs_integration_risk"],
    });

    expect(parsed.git_context?.files["src/example.ts"].main_blob).toContain("current");
  });

  it("rejects a run without files, diff, or git_context", () => {
    expect(() =>
      SlopPassRunInputSchema.parse({
        target: { kind: "files", label: "empty" },
        files: [],
      })
    ).toThrow();
  });

  it("rejects empty source file text", () => {
    expect(() =>
      SlopPassRunInputSchema.parse({
        target: { kind: "files", label: "empty file" },
        files: [{ path: "src/empty.ts", content: "" }],
      }),
    ).toThrow();
  });

  it("rejects empty requested check lists", () => {
    expect(() =>
      SlopPassRunInputSchema.parse({
        target: { kind: "files", label: "no checks" },
        files: [{ path: "src/example.ts", content: "export const ok = true;" }],
        checks: [],
      }),
    ).toThrow();
  });

  it("caps file count and source size before review work starts", () => {
    expect(() =>
      SlopPassRunInputSchema.parse({
        target: { kind: "files", label: "too many" },
        files: Array.from({ length: SLOPPASS_LIMITS.maxFiles + 1 }, (_, index) => ({
          path: `src/${index}.ts`,
          content: "export const ok = true;",
        })),
      }),
    ).toThrow();

    expect(() =>
      SlopPassRunInputSchema.parse({
        target: { kind: "files", label: "too large" },
        files: [{ path: "src/large.ts", content: "x".repeat(SLOPPASS_LIMITS.maxFileBytes + 1) }],
      }),
    ).toThrow();
  });

  it("validates the advisory result contract with verdict and scope", () => {
    const parsed = SlopPassResultSchema.parse({
      target: { kind: "files", label: "source sample", files: ["src/example.ts"] },
      scope: {
        checks_attempted: ["maintenance_change_risk"],
        files_reviewed: ["src/example.ts"],
        provider: "provided-source",
      },
      verdict: "warn",
      findings: [],
      not_checked: [
        {
          label: "logic_plausibility",
          reason: "Check was not requested.",
        },
      ],
      summary: {
        posture: "Scoped static review completed.",
        counts_by_severity: { critical: 0, high: 0, medium: 0, low: 1, info: 0 },
        coverage_note: "Only provided source files were inspected.",
      },
      disclaimer: {
        headline: "Scoped review only",
        body: "Human review is still required.",
        compact: "Scoped review only.",
      },
    });

    expect(parsed.verdict).toBe("warn");
    expect(parsed.scope.provider).toBe("provided-source");
  });

  it("validates cross-branch evidence on findings", () => {
    const parsed = SlopPassResultSchema.parse({
      target: { kind: "pr", label: "PR 123", ref: "123" },
      scope: {
        checks_attempted: ["vcs_integration_risk"],
        files_reviewed: ["src/example.ts"],
        provider: "http",
      },
      verdict: "fail",
      findings: [
        {
          title: "Current main lines are missing from the PR head",
          category: "vcs_integration_risk",
          severity: "critical",
          why_it_matters: "A clean textual merge can still erase current main work.",
          evidence: "src/example.ts:2 exists in current main but not in the PR head.",
          suggested_fix: "Rebase current main and preserve the missing line.",
          file: "src/example.ts",
          line: 2,
          cross_branch_evidence: {
            base_sha: "base",
            head_sha: "head",
            file: "src/example.ts",
            line_range: [2, 2],
          },
        },
      ],
      not_checked: [],
      summary: {
        posture: "Scoped static review completed.",
        counts_by_severity: { critical: 1, high: 0, medium: 0, low: 0, info: 0 },
        coverage_note: "Only provided source files were inspected.",
      },
      disclaimer: {
        headline: "Scoped review only",
        body: "Human review is still required.",
        compact: "Scoped review only.",
      },
    });

    expect(parsed.findings[0].cross_branch_evidence?.line_range).toEqual([2, 2]);
  });
});
