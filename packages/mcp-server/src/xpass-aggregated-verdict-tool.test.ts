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
  selected_checks?: Array<{ check?: string; reasons?: string[] }>;
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
        { check: "UIPass", status: "passed", run_id: "ui-1", target_sha: "abc123", url: "https://example.test/ui" },
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
    expect(result.receipt?.evidence).toHaveLength(4);
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
    expect(result.missing_checks).toEqual(["uipass", "uxpass", "flowpass", "sloppass"]);
    expect(result.receipt?.full_checklist?.some((item) => item.check === "uipass" && item.status === "MISSING")).toBe(true);
    expect(result.receipt?.full_checklist?.some((item) => item.check === "uxpass" && item.status === "MISSING")).toBe(true);
    expect(result.receipt?.full_checklist?.some((item) => item.check === "fidelitypass" && item.status === "N/A")).toBe(true);
  });

  it("routes connector OAuth work through ConnectorPass readiness proof", async () => {
    const result = await xpassAggregatedVerdict({
      target: { type: "pr", id: "1522", sha: "connector-head" },
      title: "Supabase Vercel app connection rollout",
      description: "Provider login, token fallback, connected badge, and keychain parity must agree.",
      changed_files: [
        "src/lib/connectors.ts",
        "api/oauth-init.ts",
        "src/pages/Connect.tsx",
        "packages/mcp-server/src/keychain-tool.ts",
        "scripts/check-app-connection-readiness.mjs",
      ],
    }) as XPassResult;

    expect(result.verdict).toBe("pending");
    expect(result.missing_checks).toContain("connectorpass");
    expect(result.missing_checks).toContain("uxpass");
    expect(result.missing_checks).toContain("flowpass");
    expect(result.missing_checks).toContain("securitypass");
    expect(result.missing_checks).toContain("rotatepass");
    expect(result.missing_checks).toContain("copypass");
    expect(result.missing_checks).toContain("commonsensepass");
    expect(result.missing_checks).toContain("sloppass");
    expect(result.receipt?.full_checklist?.some((item) => item.check === "connectorpass" && item.status === "MISSING")).toBe(true);
    expect(result.receipt?.action_needed?.join("\n")).toMatch(/Run ConnectorPass/);
  });

  it("routes provider-hosted MCP bridge learnings through connector lifecycle proof", async () => {
    const result = await xpassAggregatedVerdict({
      target: { type: "pr", id: "1547", sha: "provider-mcp-head" },
      title: "Provider-hosted MCP bridge",
      description: [
        "Native MCP params wrapping, tool result parsing, token refresh retry, expired token reconnect state,",
        "subscription credits, cloud API fallback, OAuth popup, connected badge, and customer-facing copy must agree.",
      ].join(" "),
      changed_files: [
        "packages/mcp-server/src/provider-hosted-media-tool.ts",
        "packages/mcp-server/src/provider-hosted-media-tool.test.ts",
        "src/components/apps/ConnectAppModal.tsx",
        "api/oauth-init.ts",
        "api/oauth-callback.ts",
      ],
    }) as XPassResult;

    expect(result.verdict).toBe("pending");
    expect(result.missing_checks).toEqual(expect.arrayContaining([
      "testpass",
      "uxpass",
      "flowpass",
      "securitypass",
      "rotatepass",
      "connectorpass",
      "copypass",
      "commonsensepass",
      "sloppass",
    ]));
    expect(result.selected_checks?.find((item) => item.check === "connectorpass")?.reasons?.join("\n"))
      .toMatch(/native provider MCP bridge proof/);
    expect(result.selected_checks?.find((item) => item.check === "rotatepass")?.reasons?.join("\n"))
      .toMatch(/provider token expiry, refresh, reconnect, and revocation/);
    expect(result.receipt?.action_needed?.join("\n")).toMatch(/Run ConnectorPass/);
  });

  it("routes stored-but-unproven connector states through proof and setup gates", async () => {
    const result = await xpassAggregatedVerdict({
      target: { type: "pr", id: "1550", sha: "connector-proof-head" },
      title: "Connection truthfulness hardening",
      description: [
        "Stored credential rows, is_valid flags, last_tested_at null values, stale live proof,",
        "token scope errors, expired access tokens, duplicate MCP registration, stale MCP server config,",
        "and missing callable data-plane tools must not show a customer-facing connected badge.",
      ].join(" "),
      changed_files: [
        "packages/mcp-server/src/keychain-tool.ts",
        "api/memory-admin.ts",
        "src/components/apps/appLenses.ts",
        "src/pages/admin/AdminTools.tsx",
      ],
    }) as XPassResult;

    expect(result.verdict).toBe("pending");
    expect(result.missing_checks).toEqual(expect.arrayContaining([
      "connectorpass",
      "testpass",
      "uxpass",
      "flowpass",
      "securitypass",
      "rotatepass",
      "wakepass",
      "commonsensepass",
      "sloppass",
    ]));
    expect(result.selected_checks?.find((item) => item.check === "connectorpass")?.reasons?.join("\n"))
      .toMatch(/readiness proof/);
    expect(result.selected_checks?.find((item) => item.check === "wakepass")?.reasons?.join("\n"))
      .toMatch(/registration|hydration/);
    expect(result.selected_checks?.find((item) => item.check === "commonsensepass")?.reasons?.join("\n"))
      .toMatch(/connected\/status badge must match live/);
  });

  it("fails stale receipts generated for an older head", async () => {
    const result = await xpassAggregatedVerdict({
      target: { type: "pr", id: "547", sha: "new-head" },
      changed_files: ["src/pages/admin/You.tsx"],
      pass_results: [
        { check: "UIPass", status: "passed", run_id: "ui-1", target_sha: "new-head" },
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
        { check: "UIPass", status: "passed", run_id: "ui-1", target_sha: "abc123" },
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
