import { describe, expect, it } from "vitest";

import {
  commonsensepassCheck,
  fixtureIdsByVerdict,
  COMMONSENSEPASS_WORKER_FIXTURES,
  COMMONSENSEPASS_RULE_METADATA,
  OWNER_FRESH_WINDOW_MS,
  DUPLICATE_WAKE_WINDOW_MS,
  type ClaimInput,
} from "../commonsensepass-runtime.js";

const NOW = 1_765_000_000_000;
const HEAD = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const STALE = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";

describe("fixtureIdsByVerdict", () => {
  it("groups all fixture ids by their expected verdict", () => {
    const groups = fixtureIdsByVerdict();
    const totalIds = Object.values(groups).flat();
    expect(totalIds.length).toBe(COMMONSENSEPASS_WORKER_FIXTURES.length);
  });

  it("returns the correct verdicts for known fixtures", () => {
    const groups = fixtureIdsByVerdict();
    expect(groups.BLOCKER).toContain("false-quiet-with-backlog");
    expect(groups.PASS).toContain("quiet-empty-queue-pass");
    expect(groups.SUPPRESS).toContain("duplicate-wake-suppress");
    expect(groups.ROUTE).toContain("route-specialist-lane");
  });

  it("accepts custom fixture lists", () => {
    const groups = fixtureIdsByVerdict([
      { id: "a", title: "a", expected_verdict: "PASS", notes: "" },
      { id: "b", title: "b", expected_verdict: "BLOCKER", notes: "" },
    ]);
    expect(groups.PASS).toEqual(["a"]);
    expect(groups.BLOCKER).toEqual(["b"]);
    expect(groups.HOLD).toEqual([]);
  });
});

describe("commonsensepassCheck - all fixtures pass", () => {
  for (const fixture of COMMONSENSEPASS_WORKER_FIXTURES) {
    if (!fixture.input) continue;
    it(`${fixture.id}: ${fixture.title}`, () => {
      const result = commonsensepassCheck(fixture.input!);
      expect(result.verdict).toBe(fixture.expected_verdict);
      if (fixture.expected_rule_id) {
        expect(result.rule_id).toBe(fixture.expected_rule_id);
      }
    });
  }
});

describe("R1 - no quiet if backlog exists", () => {
  it("blocks healthy claim with actionable todos", () => {
    const result = commonsensepassCheck({
      claim: "healthy",
      context: { now_ms: NOW, active_jobs: 0, todos: [{ id: "t1", status: "actionable" }] },
    });
    expect(result.verdict).toBe("BLOCKER");
    expect(result.rule_id).toBe("R1");
  });

  it("blocks no_work with queued todos", () => {
    const result = commonsensepassCheck({
      claim: "no_work",
      context: { now_ms: NOW, active_jobs: 0, todos: [{ id: "t1", status: "queued" }, { id: "t2", status: "actionable" }] },
    });
    expect(result.verdict).toBe("BLOCKER");
  });

  it("blocks when active_jobs=0 but fresh in-progress work exists", () => {
    const result = commonsensepassCheck({
      claim: "healthy",
      context: {
        now_ms: NOW,
        active_jobs: 0,
        todos: [{ id: "t1", status: "in_progress", owner: "w1", owner_last_seen_ms: NOW - 1000 }],
      },
    });
    expect(result.verdict).toBe("BLOCKER");
    expect(result.reason).toContain("underreporting");
  });

  it("passes when in-progress work is stale (owner not seen recently)", () => {
    const result = commonsensepassCheck({
      claim: "quiet",
      context: {
        now_ms: NOW,
        active_jobs: 0,
        todos: [{ id: "t1", status: "in_progress", owner: "w1", owner_last_seen_ms: NOW - OWNER_FRESH_WINDOW_MS - 1 }],
      },
    });
    expect(result.verdict).toBe("PASS");
  });

  it("passes with empty todos", () => {
    const result = commonsensepassCheck({
      claim: "quiet",
      context: { now_ms: NOW, active_jobs: 0, todos: [] },
    });
    expect(result.verdict).toBe("PASS");
    expect(result.rule_id).toBe("R1");
  });

  it("does not fire for non-R1 claims", () => {
    const result = commonsensepassCheck({
      claim: "pass",
      context: { now_ms: NOW, current_head_sha: HEAD, commented_on_sha: HEAD },
    });
    expect(result.rule_id).toBe("R2");
  });
});

describe("R2 - PASS must be on current head SHA", () => {
  it("passes when SHAs match", () => {
    const result = commonsensepassCheck({
      claim: "pass",
      context: { now_ms: NOW, current_head_sha: HEAD, commented_on_sha: HEAD },
    });
    expect(result.verdict).toBe("PASS");
    expect(result.rule_id).toBe("R2");
  });

  it("blocks when SHAs differ", () => {
    const result = commonsensepassCheck({
      claim: "pass",
      context: { now_ms: NOW, current_head_sha: HEAD, commented_on_sha: STALE },
    });
    expect(result.verdict).toBe("BLOCKER");
  });

  it("holds when commented_on_sha is missing", () => {
    const result = commonsensepassCheck({
      claim: "pass",
      context: { now_ms: NOW, current_head_sha: HEAD },
    });
    expect(result.verdict).toBe("HOLD");
    expect(result.rule_id).toBe("R2");
  });
});

describe("R3 - duplicate wake suppression", () => {
  it("suppresses duplicate wake within window", () => {
    const result = commonsensepassCheck({
      claim: "duplicate_wake",
      context: {
        now_ms: NOW,
        current_wake: { id: "w1", state_fingerprint: "fp", emitted_ms: NOW },
        recent_wakes: [{ id: "w1", state_fingerprint: "fp", emitted_ms: NOW - 60_000 }],
      },
    });
    expect(result.verdict).toBe("SUPPRESS");
    expect(result.rule_id).toBe("R3");
  });

  it("passes when fingerprint differs", () => {
    const result = commonsensepassCheck({
      claim: "duplicate_wake",
      context: {
        now_ms: NOW,
        current_wake: { id: "w1", state_fingerprint: "new-fp", emitted_ms: NOW },
        recent_wakes: [{ id: "w1", state_fingerprint: "old-fp", emitted_ms: NOW - 60_000 }],
      },
    });
    expect(result.verdict).toBe("PASS");
  });

  it("passes when prior wake is outside the window", () => {
    const result = commonsensepassCheck({
      claim: "duplicate_wake",
      context: {
        now_ms: NOW,
        current_wake: { id: "w1", state_fingerprint: "fp", emitted_ms: NOW },
        recent_wakes: [{ id: "w1", state_fingerprint: "fp", emitted_ms: NOW - DUPLICATE_WAKE_WINDOW_MS - 1 }],
      },
    });
    expect(result.verdict).toBe("PASS");
  });

  it("holds when current_wake is missing", () => {
    const result = commonsensepassCheck({
      claim: "duplicate_wake",
      context: { now_ms: NOW },
    });
    expect(result.verdict).toBe("HOLD");
  });
});

describe("R4 - done requires closing proof", () => {
  it("passes with pipeline=100 and closing_ref", () => {
    const result = commonsensepassCheck({
      claim: "done",
      context: {
        now_ms: NOW,
        subject_todo_id: "t1",
        todos: [{ id: "t1", status: "in_progress", pipeline: 100, closing_ref: "PR #42" }],
      },
    });
    expect(result.verdict).toBe("PASS");
    expect(result.rule_id).toBe("R4");
  });

  it("blocks when pipeline is not 100", () => {
    const result = commonsensepassCheck({
      claim: "done",
      context: {
        now_ms: NOW,
        subject_todo_id: "t1",
        todos: [{ id: "t1", status: "in_progress", pipeline: 80 }],
      },
    });
    expect(result.verdict).toBe("BLOCKER");
  });

  it("blocks when closing_ref is missing", () => {
    const result = commonsensepassCheck({
      claim: "done",
      context: {
        now_ms: NOW,
        subject_todo_id: "t1",
        todos: [{ id: "t1", status: "in_progress", pipeline: 100 }],
      },
    });
    expect(result.verdict).toBe("BLOCKER");
    expect(result.reason).toContain("closing_ref");
  });

  it("holds when subject todo is not found", () => {
    const result = commonsensepassCheck({
      claim: "done",
      context: { now_ms: NOW, subject_todo_id: "t-missing", todos: [] },
    });
    expect(result.verdict).toBe("HOLD");
  });
});

describe("R5 - merge-ready requires full proof", () => {
  it("passes with complete proof", () => {
    const result = commonsensepassCheck({
      claim: "merge_ready",
      context: {
        now_ms: NOW,
        pr: {
          number: 42,
          head_sha: HEAD,
          mergeable: true,
          checks_state: "success",
          reviewer_pass: { verdict: "PASS", sha: HEAD },
          safety_pass: { verdict: "PASS", sha: HEAD },
        },
      },
    });
    expect(result.verdict).toBe("PASS");
    expect(result.rule_id).toBe("R5");
  });

  it("blocks when not mergeable", () => {
    const result = commonsensepassCheck({
      claim: "merge_ready",
      context: {
        now_ms: NOW,
        pr: { number: 42, head_sha: HEAD, mergeable: false, checks_state: "success" },
      },
    });
    expect(result.verdict).toBe("BLOCKER");
  });

  it("blocks when checks are failing", () => {
    const result = commonsensepassCheck({
      claim: "merge_ready",
      context: {
        now_ms: NOW,
        pr: {
          number: 42,
          head_sha: HEAD,
          mergeable: true,
          checks_state: "failure",
          reviewer_pass: { verdict: "PASS", sha: HEAD },
          safety_pass: { verdict: "PASS", sha: HEAD },
        },
      },
    });
    expect(result.verdict).toBe("BLOCKER");
  });

  it("holds when reviewer pass is missing", () => {
    const result = commonsensepassCheck({
      claim: "merge_ready",
      context: {
        now_ms: NOW,
        pr: { number: 42, head_sha: HEAD, mergeable: true, checks_state: "success" },
      },
    });
    expect(result.verdict).toBe("HOLD");
  });

  it("blocks when reviewer pass is on a stale SHA", () => {
    const result = commonsensepassCheck({
      claim: "merge_ready",
      context: {
        now_ms: NOW,
        pr: {
          number: 42,
          head_sha: HEAD,
          mergeable: true,
          checks_state: "success",
          reviewer_pass: { verdict: "PASS", sha: STALE },
          safety_pass: { verdict: "PASS", sha: HEAD },
        },
      },
    });
    expect(result.verdict).toBe("BLOCKER");
    expect(result.reason).toContain("Reviewer PASS");
  });

  it("holds when PR snapshot is missing", () => {
    const result = commonsensepassCheck({
      claim: "merge_ready",
      context: { now_ms: NOW },
    });
    expect(result.verdict).toBe("HOLD");
  });
});

describe("R6 - route to specialist lane", () => {
  it("routes when lanes differ", () => {
    const result = commonsensepassCheck({
      claim: "route",
      context: { now_ms: NOW, current_lane: "general", required_lane: "securitypass", route_to: "securitypass" },
    });
    expect(result.verdict).toBe("ROUTE");
    expect(result.rule_id).toBe("R6");
    expect(result.route_to).toBe("securitypass");
  });

  it("passes when already on the correct lane", () => {
    const result = commonsensepassCheck({
      claim: "route",
      context: { now_ms: NOW, current_lane: "securitypass", required_lane: "securitypass" },
    });
    expect(result.verdict).toBe("PASS");
  });

  it("holds when lanes are missing", () => {
    const result = commonsensepassCheck({
      claim: "route",
      context: { now_ms: NOW },
    });
    expect(result.verdict).toBe("HOLD");
  });
});

describe("unmatched claims", () => {
  it("returns HOLD for unknown claim kinds", () => {
    const result = commonsensepassCheck({
      claim: "unknown_claim" as any,
      context: { now_ms: NOW },
    });
    expect(result.verdict).toBe("HOLD");
    expect(result.rule_id).toBeNull();
    expect(result.reason).toContain("matched no rule");
  });
});

describe("rule metadata integrity", () => {
  it("has 6 rules covering all rule IDs", () => {
    expect(COMMONSENSEPASS_RULE_METADATA).toHaveLength(6);
    const ids = COMMONSENSEPASS_RULE_METADATA.map((r) => r.id);
    expect(ids).toEqual(["R1", "R2", "R3", "R4", "R5", "R6"]);
  });

  it("every rule has a title and summary", () => {
    for (const rule of COMMONSENSEPASS_RULE_METADATA) {
      expect(rule.title.length).toBeGreaterThan(0);
      expect(rule.summary.length).toBeGreaterThan(0);
      expect(rule.claims.length).toBeGreaterThan(0);
      expect(rule.possible_verdicts.length).toBeGreaterThan(0);
    }
  });
});
