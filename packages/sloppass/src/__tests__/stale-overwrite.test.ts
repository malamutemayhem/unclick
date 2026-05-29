import { describe, expect, it } from "vitest";
import { detectStaleOverwrites } from "../lenses/stale-overwrite.js";
import { runSlopPass } from "../runner/index.js";

const contextFor = (overrides: {
  base_blob?: string;
  main_blob?: string;
  pr_head_blob?: string;
} = {}) => ({
  base_sha: "base-sha",
  head_sha: "head-sha",
  files: {
    "src/routes.ts": {
      base_blob: [
        "export const routes = [",
        "  '/admin',",
        "];",
      ].join("\n"),
      main_blob: [
        "export const routes = [",
        "  '/admin',",
        "  '/jobsmith',",
        "  '/draftroom',",
        "];",
      ].join("\n"),
      pr_head_blob: [
        "export const routes = [",
        "  '/admin',",
        "];",
      ].join("\n"),
      ...overrides,
    },
  },
});

describe("stale-overwrite lens", () => {
  it("does not report when the PR head preserves current main lines", () => {
    const findings = detectStaleOverwrites(
      contextFor({
        pr_head_blob: [
          "export const routes = [",
          "  '/admin',",
          "  '/jobsmith',",
          "  '/draftroom',",
          "];",
        ].join("\n"),
      }),
    );

    expect(findings).toEqual([]);
  });

  it("reports main-only lines missing from the PR head", () => {
    const findings = detectStaleOverwrites(contextFor());

    expect(findings).toHaveLength(1);
    expect(findings[0]).toMatchObject({
      category: "vcs_integration_risk",
      severity: "critical",
      file: "src/routes.ts",
      line: 3,
      cross_branch_evidence: {
        base_sha: "base-sha",
        head_sha: "head-sha",
        file: "src/routes.ts",
        line_range: [3, 4],
      },
    });
    expect(findings[0].evidence).toContain("'/jobsmith'");
    expect(findings[0].evidence).toContain("'/draftroom'");
  });

  it("emits not_checked when git_context is absent", async () => {
    const result = await runSlopPass({
      target: { kind: "files", label: "plain source", files: ["src/plain.ts"] },
      files: [{ path: "src/plain.ts", content: "export const ok = true;" }],
      checks: ["vcs_integration_risk"],
    });

    expect(result.findings).toEqual([]);
    expect(result.scope.checks_attempted).toEqual([]);
    expect(result.verdict).toBe("unknown");
    expect(result.not_checked).toContainEqual({
      label: "stale-overwrite-detector",
      reason: "git_context not provided in SlopPassRunInput.",
    });
  });

  it("runs through SlopPass with git_context and returns a blocking finding", async () => {
    const result = await runSlopPass({
      target: { kind: "pr", label: "PR 123", ref: "123" },
      git_context: contextFor(),
      checks: ["vcs_integration_risk"],
    });

    expect(result.scope.files_reviewed).toEqual(["src/routes.ts"]);
    expect(result.findings).toHaveLength(1);
    expect(result.verdict).toBe("fail");
    expect(result.summary.counts_by_severity.critical).toBe(1);
  });
});
