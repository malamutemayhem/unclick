import { describe, expect, it } from "vitest";

import { xpassAggregatedVerdict } from "./xpass-aggregated-verdict-tool.js";

type XPassResult = {
  ok?: boolean;
  verdict?: string;
  result?: string;
  reason?: string;
  missing_checks?: string[];
  stale_checks?: string[];
  unscoped_checks?: string[];
  auto_merge_gate?: {
    merge_ready?: boolean;
    verdict_matches_head?: boolean;
    required_head_sha?: string;
  };
  receipt?: {
    evidence?: unknown[];
    action_needed?: string[];
    full_checklist?: Array<{ check?: string; status?: string; reason?: string }>;
    provenance?: { head_sha?: string; invalidates_on?: string[] };
    staleness?: { stale_checks?: string[]; unscoped_checks?: string[] };
  };
  error?: string;
};

describe("xpass_aggregated_verdict", () => {
  it("requires a target SHA for PR-head binding", async () => {
    const result = await xpassAggregatedVerdict({
      target: { type: "pr", id: "547" },
      changed_files: ["src/pages/admin/You.tsx"],
    }) as XPassResult;

    expect(result.verdict).toBe("fail");
    expect(result.reason).toBe("missing_target_sha");
    expect(result.error).toMatch(/target\.sha/);
  });

  it("passes only when every selected receipt is green and bound to the same head", async () => {
    const result = await xpassAggregatedVerdict({
      generated_at: "2026-05-30T00:00:00.000Z",
      target: { type: "pr", id: "547", sha: "abc123" },
      changed_files: ["src/pages/admin/You.tsx"],
      pass_results: [
        { check: "UXPass", status: "passed", run_id: "ux-1", target_sha: "abc123", url: "https://example.test/ux" },
        { check: "FlowPass", status: "passed", run_id: "flow-1", target_sha: "abc123" },
        { check: "SlopPass", status: "green", run_id: "slop-1", target_sha: "abc123" },
      ],
    }) as XPassResult;

    expect(result.ok).toBe(true);
    expect(result.verdict).toBe("pass");
    expect(result.result).toBe("passed");
    expect(result.auto_merge_gate?.merge_ready).toBe(true);
    expect(result.auto_merge_gate?.verdict_matches_head).toBe(true);
    expect(result.auto_merge_gate?.required_head_sha).toBe("abc123");
    expect(result.receipt?.provenance?.head_sha).toBe("abc123");
    expect(result.receipt?.provenance?.invalidates_on).toContain("new_commit");
    expect(result.receipt?.evidence).toHaveLength(3);
    expect(result.receipt?.action_needed).toEqual([]);
  });

  it("returns pending with a full checklist when selected receipts are missing", async () => {
    const result = await xpassAggregatedVerdict({
      target: { type: "pr", id: "547", sha: "abc123" },
      changed_files: ["src/pages/admin/You.tsx"],
    }) as XPassResult;

    expect(result.ok).toBe(false);
    expect(result.verdict).toBe("pending");
    expect(result.result).toBe("xpass_needed");
    expect(result.missing_checks).toEqual(["uxpass", "flowpass", "sloppass"]);
    expect(result.receipt?.full_checklist?.some((item) => item.check === "uxpass" && item.status === "MISSING")).toBe(true);
    expect(result.receipt?.full_checklist?.some((item) => item.check === "fidelitypass" && item.status === "N/A")).toBe(true);
  });

  it("fails stale receipts generated for an older head", async () => {
    const result = await xpassAggregatedVerdict({
      target: { type: "pr", id: "547", sha: "new-head" },
      changed_files: ["src/pages/admin/You.tsx"],
      pass_results: [
        { check: "UXPass", status: "passed", run_id: "ux-1", target_sha: "old-head" },
        { check: "FlowPass", status: "passed", run_id: "flow-1", target_sha: "new-head" },
        { check: "SlopPass", status: "passed", run_id: "slop-1", target_sha: "new-head" },
      ],
    }) as XPassResult;

    expect(result.ok).toBe(false);
    expect(result.verdict).toBe("fail");
    expect(result.reason).toBe("stale_pass_result");
    expect(result.stale_checks).toEqual(["uxpass"]);
    expect(result.receipt?.staleness?.stale_checks).toEqual(["uxpass"]);
    expect(result.receipt?.action_needed?.join("\n")).toMatch(/stale/);
  });

  it("fails unscoped receipts that do not name the target head", async () => {
    const result = await xpassAggregatedVerdict({
      target: { type: "pr", id: "547", sha: "abc123" },
      changed_files: ["src/pages/admin/You.tsx"],
      pass_results: [
        { check: "UXPass", status: "passed", run_id: "ux-1" },
        { check: "FlowPass", status: "passed", run_id: "flow-1", target_sha: "abc123" },
        { check: "SlopPass", status: "passed", run_id: "slop-1", target_sha: "abc123" },
      ],
    }) as XPassResult;

    expect(result.ok).toBe(false);
    expect(result.verdict).toBe("fail");
    expect(result.reason).toBe("unscoped_pass_result");
    expect(result.unscoped_checks).toEqual(["uxpass"]);
    expect(result.receipt?.staleness?.unscoped_checks).toEqual(["uxpass"]);
    expect(result.receipt?.action_needed?.join("\n")).toMatch(/missing target SHA scope/);
  });
});
