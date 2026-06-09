import { describe, expect, it } from "vitest";

import {
  COMMONSENSEPASS_CLAIM_KINDS,
  COMMONSENSEPASS_VERDICTS,
  commonsensepassCheckTool,
  commonsensepassRulesTool,
} from "./commonsensepass-tool.js";

import {
  COMMONSENSEPASS_WORKER_FIXTURES,
} from "./commonsensepass-runtime.js";

describe("commonsensepass connector (L2)", () => {
  // ── exported constants ────────────────────────────────────────────────────

  it("exports valid claim kinds", () => {
    expect(COMMONSENSEPASS_CLAIM_KINDS.length).toBeGreaterThan(0);
    expect(COMMONSENSEPASS_CLAIM_KINDS).toContain("healthy");
    expect(COMMONSENSEPASS_CLAIM_KINDS).toContain("quiet");
    expect(COMMONSENSEPASS_CLAIM_KINDS).toContain("merge_ready");
    expect(COMMONSENSEPASS_CLAIM_KINDS).toContain("route");
  });

  it("exports valid verdicts", () => {
    expect(COMMONSENSEPASS_VERDICTS).toContain("PASS");
    expect(COMMONSENSEPASS_VERDICTS).toContain("BLOCKER");
    expect(COMMONSENSEPASS_VERDICTS).toContain("HOLD");
    expect(COMMONSENSEPASS_VERDICTS).toContain("SUPPRESS");
    expect(COMMONSENSEPASS_VERDICTS).toContain("ROUTE");
  });

  // ── commonsensepass_rules ─────────────────────────────────────────────────

  it("returns the rule catalog without fixtures by default", async () => {
    const r = await commonsensepassRulesTool({}) as Record<string, unknown>;
    expect(r.tool).toBe("commonsensepass_rules");
    expect(r.claim_kinds).toEqual(COMMONSENSEPASS_CLAIM_KINDS);
    expect(r.verdicts).toEqual(COMMONSENSEPASS_VERDICTS);
    expect(r.default_for_unsupported_claims).toBe("HOLD");
    expect(r.rules).toBeDefined();
    expect(Array.isArray(r.rules)).toBe(true);
    expect(r.fixtures).toBeUndefined();
  });

  it("includes fixtures when requested", async () => {
    const r = await commonsensepassRulesTool({ include_fixtures: true }) as Record<string, unknown>;
    expect(r.fixtures).toBeDefined();
    expect(Array.isArray(r.fixtures)).toBe(true);
    expect((r.fixtures as unknown[]).length).toBeGreaterThan(0);
  });

  it("returns fixture_ids_by_verdict grouped correctly", async () => {
    const r = await commonsensepassRulesTool({}) as Record<string, unknown>;
    const groups = r.fixture_ids_by_verdict as Record<string, string[]>;
    expect(groups.PASS.length).toBeGreaterThan(0);
    expect(groups.BLOCKER.length).toBeGreaterThan(0);
  });

  // ── commonsensepass_check - fixture-driven verdicts ───────────────────────

  it("returns HOLD for an unsupported claim kind", async () => {
    const r = await commonsensepassCheckTool({
      claim: "unknown_claim",
      context: { now_ms: Date.now() },
    });
    expect(r.verdict).toBe("HOLD");
    expect(r.reason).toMatch(/matched no rule/);
  });

  it("includes the claim kind in the response", async () => {
    const r = await commonsensepassCheckTool({
      claim: "healthy",
      context: { now_ms: Date.now(), active_jobs: 0, todos: [] },
    });
    expect(r.claim).toBe("healthy");
  });

  it("defaults now_ms when context is missing", async () => {
    const r = await commonsensepassCheckTool({ claim: "quiet" });
    expect(r.claim).toBe("quiet");
    expect(r.verdict).toBeDefined();
  });

  it("normalizes non-object context to empty", async () => {
    const r = await commonsensepassCheckTool({ claim: "quiet", context: "bad" });
    expect(r.verdict).toBeDefined();
  });

  // Run every built-in fixture through the check tool and verify the expected verdict
  for (const fixture of COMMONSENSEPASS_WORKER_FIXTURES) {
    if (!fixture.input) continue;
    it(`fixture: ${fixture.id} -> ${fixture.expected_verdict}`, async () => {
      const r = await commonsensepassCheckTool(fixture.input as Record<string, unknown>);
      expect(r.verdict).toBe(fixture.expected_verdict);
      if (fixture.expected_rule_id) {
        expect(r.rule_id).toBe(fixture.expected_rule_id);
      }
    });
  }
});
