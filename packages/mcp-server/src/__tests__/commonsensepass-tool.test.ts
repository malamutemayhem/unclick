import { describe, expect, it } from "vitest";

import { ADDITIONAL_HANDLERS, ADDITIONAL_TOOLS } from "../tool-wiring.js";
import { COMMONSENSEPASS_WORKER_FIXTURES } from "../commonsensepass-runtime.js";

function asRecord(value: unknown): Record<string, unknown> {
  expect(value).not.toBeNull();
  expect(typeof value).toBe("object");
  return value as Record<string, unknown>;
}

describe("commonsensepass MCP tools", () => {
  it("advertises direct worker check and rules tools", () => {
    const names = new Set(ADDITIONAL_TOOLS.map((tool) => tool.name));
    expect(names.has("commonsensepass_check")).toBe(true);
    expect(names.has("commonsensepass_rules")).toBe(true);

    const checkTool = ADDITIONAL_TOOLS.find((tool) => tool.name === "commonsensepass_check");
    const schema = checkTool?.inputSchema as unknown as {
      properties?: { claim?: { enum?: readonly string[] } };
    };
    expect(schema.properties?.claim?.enum).toContain("quiet");
    expect(schema.properties?.claim?.enum).toContain("route");
  });

  it("returns the worker-readable rule catalog", async () => {
    const result = asRecord(await ADDITIONAL_HANDLERS.commonsensepass_rules({}));
    const rules = result.rules as Array<Record<string, unknown>>;
    const fixtureIds = result.fixture_ids_by_verdict as Record<string, string[]>;

    expect(result.default_for_unsupported_claims).toBe("HOLD");
    expect((result.verdicts as string[])).toEqual(["PASS", "BLOCKER", "HOLD", "SUPPRESS", "ROUTE"]);
    expect(rules.map((rule) => rule.id)).toEqual(["R1", "R2", "R3", "R4", "R5", "R6"]);
    expect(fixtureIds.BLOCKER).toContain("false-quiet-with-backlog");
    expect(fixtureIds.ROUTE).toContain("route-specialist-lane");
  });

  it("blocks false quiet claims with R1", async () => {
    const result = asRecord(await ADDITIONAL_HANDLERS.commonsensepass_check({
      claim: "quiet",
      context: {
        now_ms: 1_765_000_000_000,
        active_jobs: 0,
        todos: [{ id: "todo-actionable-1", status: "actionable" }],
      },
    }));

    expect(result.verdict).toBe("BLOCKER");
    expect(result.rule_id).toBe("R1");
    expect(result.next_action).toBe("hydrate_queue_and_claim_one");
  });

  it("suppresses duplicate wakes with R3", async () => {
    const now = 1_765_000_000_000;
    const result = asRecord(await ADDITIONAL_HANDLERS.commonsensepass_check({
      claim: "duplicate_wake",
      context: {
        now_ms: now,
        current_wake: { id: "wake-123", state_fingerprint: "same", emitted_ms: now },
        recent_wakes: [{ id: "wake-123", state_fingerprint: "same", emitted_ms: now - 1_000 }],
      },
    }));

    expect(result.verdict).toBe("SUPPRESS");
    expect(result.rule_id).toBe("R3");
  });

  it("blocks proofless done claims with R4", async () => {
    const result = asRecord(await ADDITIONAL_HANDLERS.commonsensepass_check({
      claim: "done",
      context: {
        now_ms: 1_765_000_000_000,
        subject_todo_id: "todo-done-weak",
        todos: [{ id: "todo-done-weak", status: "in_progress", pipeline: 80 }],
      },
    }));

    expect(result.verdict).toBe("BLOCKER");
    expect(result.rule_id).toBe("R4");
    expect(result.next_action).toBe("attach_closing_pr_or_commit_and_set_pipeline_100");
  });

  it("routes wrong-lane work with R6", async () => {
    const result = asRecord(await ADDITIONAL_HANDLERS.commonsensepass_check({
      claim: "route",
      context: {
        now_ms: 1_765_000_000_000,
        current_lane: "general-worker",
        required_lane: "securitypass",
      },
    }));

    expect(result.verdict).toBe("ROUTE");
    expect(result.rule_id).toBe("R6");
    expect(result.route_to).toBe("securitypass");
  });

  it("keeps every bundled fixture aligned with the local runtime", async () => {
    for (const fixture of COMMONSENSEPASS_WORKER_FIXTURES) {
      if (!fixture.input) continue;
      const result = asRecord(await ADDITIONAL_HANDLERS.commonsensepass_check(fixture.input));
      expect(result.verdict).toBe(fixture.expected_verdict);
      expect(result.rule_id).toBe(fixture.expected_rule_id);
    }
  });
});
