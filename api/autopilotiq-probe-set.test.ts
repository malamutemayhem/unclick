import { describe, expect, it } from "vitest";

import {
  PROBE_CHECK_KINDS,
  PROBE_SET_V0,
  PROBE_TASK_TYPES,
  aggregateProbeResults,
  checkProbeDrift,
  checkScoreboardHonesty,
  runProbeSuite,
  scoreProbe,
  type Probe,
  type ProbeOutcomeRecord,
  type ProbeResult,
} from "./lib/autopilotiq-probe-set";

function probe(overrides: Partial<Probe> & Pick<Probe, "expected" | "check_kind">): Probe {
  return {
    id: overrides.id ?? "probe.test.example",
    task_type: overrides.task_type ?? "format",
    prompt: overrides.prompt ?? "test prompt",
    description: overrides.description ?? "test description",
    expected: overrides.expected,
    check_kind: overrides.check_kind,
  };
}

describe("autopilotiq probe set v0 - data integrity", () => {
  it("exposes a non-empty, frozen probe set with unique ids and valid taxonomies", () => {
    expect(PROBE_SET_V0.length).toBeGreaterThanOrEqual(6);
    const ids = PROBE_SET_V0.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const p of PROBE_SET_V0) {
      expect(PROBE_TASK_TYPES).toContain(p.task_type);
      expect(PROBE_CHECK_KINDS).toContain(p.check_kind);
      expect(p.prompt.length).toBeGreaterThan(0);
      expect(p.expected.length).toBeGreaterThan(0);
      expect(p.description.length).toBeGreaterThan(0);
    }
  });
});

describe("scoreProbe", () => {
  it("equals: exact match passes, others fail with a reason", () => {
    const p = probe({ expected: "yes", check_kind: "equals" });
    expect(scoreProbe(p, "yes")).toEqual({ pass: true, reason: "exact match" });
    expect(scoreProbe(p, "Yes").pass).toBe(false);
    expect(scoreProbe(p, "no").reason).toContain("expected 'yes'");
  });

  it("equals_trimmed: ignores surrounding whitespace", () => {
    const p = probe({ expected: "foo_bar_baz", check_kind: "equals_trimmed" });
    expect(scoreProbe(p, "  foo_bar_baz\n").pass).toBe(true);
    expect(scoreProbe(p, "foo bar baz").pass).toBe(false);
  });

  it("includes: substring presence", () => {
    const p = probe({ expected: "needle", check_kind: "includes" });
    expect(scoreProbe(p, "a haystack needle inside").pass).toBe(true);
    expect(scoreProbe(p, "a haystack").pass).toBe(false);
  });

  it("regex: pattern match against actual", () => {
    const p = probe({ expected: "^\\d{4}-\\d{2}-\\d{2}$", check_kind: "regex" });
    expect(scoreProbe(p, "2026-05-28").pass).toBe(true);
    expect(scoreProbe(p, "May 28, 2026").pass).toBe(false);
  });

  it("regex: invalid pattern fails cleanly without throwing", () => {
    const p = probe({ expected: "[unterminated", check_kind: "regex" });
    const result = scoreProbe(p, "anything");
    expect(result.pass).toBe(false);
    expect(result.reason).toContain("invalid regex");
  });

  it("json_equal: order-independent equality on parsed JSON", () => {
    const p = probe({ expected: '[1,2,3]', check_kind: "json_equal" });
    expect(scoreProbe(p, "[1,2,3]").pass).toBe(true);
    expect(scoreProbe(p, "[ 1, 2, 3 ]").pass).toBe(true);
    expect(scoreProbe(p, "[3,2,1]").pass).toBe(false);

    const obj = probe({ expected: '{"a":1,"b":2}', check_kind: "json_equal" });
    expect(scoreProbe(obj, '{"b":2,"a":1}').pass).toBe(true);
    expect(scoreProbe(obj, "not json").pass).toBe(false);
  });

  it("length_at_least: minimum character count", () => {
    const p = probe({ expected: "10", check_kind: "length_at_least" });
    expect(scoreProbe(p, "1234567890").pass).toBe(true);
    expect(scoreProbe(p, "short").pass).toBe(false);
  });
});

describe("aggregateProbeResults", () => {
  function res(overrides: Partial<ProbeResult>): ProbeResult {
    return {
      probe_id: overrides.probe_id ?? "p",
      task_type: overrides.task_type ?? "format",
      pass: overrides.pass ?? true,
      reason: overrides.reason ?? "",
      actual: overrides.actual ?? "",
      wall_ms: overrides.wall_ms ?? 0,
      started_at: overrides.started_at ?? "2026-05-28T00:00:00.000Z",
      finished_at: overrides.finished_at ?? "2026-05-28T00:00:00.000Z",
    };
  }

  it("computes pass_rate and a per-task-type breakdown", () => {
    const results = [
      res({ probe_id: "a", task_type: "json_extract", pass: true }),
      res({ probe_id: "b", task_type: "json_extract", pass: false }),
      res({ probe_id: "c", task_type: "regex_match", pass: true }),
      res({ probe_id: "d", task_type: "regex_match", pass: true }),
    ];
    const board = aggregateProbeResults(results, {
      suiteRunId: "run-1",
      generatedAt: "2026-05-28T00:00:00.000Z",
    });
    expect(board.total).toBe(4);
    expect(board.passed).toBe(3);
    expect(board.failed).toBe(1);
    expect(board.pass_rate).toBeCloseTo(0.75, 5);
    expect(board.by_task_type.json_extract).toEqual({ total: 2, passed: 1, pass_rate: 0.5 });
    expect(board.by_task_type.regex_match).toEqual({ total: 2, passed: 2, pass_rate: 1 });
    expect(board.suite_run_id).toBe("run-1");
  });

  it("returns pass_rate=0 (not NaN) for an empty result set", () => {
    const board = aggregateProbeResults([], {
      suiteRunId: "run-empty",
      generatedAt: "2026-05-28T00:00:00.000Z",
    });
    expect(board.total).toBe(0);
    expect(board.pass_rate).toBe(0);
    expect(board.by_task_type).toEqual({});
  });
});

describe("checkProbeDrift", () => {
  it("classifies stable when |delta| < threshold", () => {
    const r = checkProbeDrift({ baseline_pass_rate: 0.8, current_pass_rate: 0.82, threshold: 0.05 });
    expect(r.verdict).toBe("stable");
    expect(r.delta).toBeCloseTo(0.02, 5);
  });

  it("classifies drifting_up when delta exceeds threshold positive", () => {
    const r = checkProbeDrift({ baseline_pass_rate: 0.6, current_pass_rate: 0.8, threshold: 0.05 });
    expect(r.verdict).toBe("drifting_up");
  });

  it("classifies drifting_down when delta exceeds threshold negative", () => {
    const r = checkProbeDrift({ baseline_pass_rate: 0.9, current_pass_rate: 0.7, threshold: 0.05 });
    expect(r.verdict).toBe("drifting_down");
  });
});

describe("checkScoreboardHonesty (catches lying scoreboard)", () => {
  it("flags an 'improving' claim against flat probes as dishonest", () => {
    const v = checkScoreboardHonesty({
      claim: "improving",
      baseline_pass_rate: 0.8,
      current_pass_rate: 0.81,
      threshold: 0.05,
    });
    expect(v.honest).toBe(false);
    expect(v.observed_verdict).toBe("stable");
    expect(v.reason).toContain("contradicts observed");
  });

  it("flags an 'improving' claim against a real drop as dishonest", () => {
    const v = checkScoreboardHonesty({
      claim: "improving",
      baseline_pass_rate: 0.9,
      current_pass_rate: 0.7,
      threshold: 0.05,
    });
    expect(v.honest).toBe(false);
    expect(v.observed_verdict).toBe("drifting_down");
  });

  it("accepts an honest 'improving' claim when probes actually drift up", () => {
    const v = checkScoreboardHonesty({
      claim: "improving",
      baseline_pass_rate: 0.6,
      current_pass_rate: 0.8,
      threshold: 0.05,
    });
    expect(v.honest).toBe(true);
    expect(v.observed_verdict).toBe("drifting_up");
  });

  it("accepts an honest 'stable' claim", () => {
    const v = checkScoreboardHonesty({
      claim: "stable",
      baseline_pass_rate: 0.8,
      current_pass_rate: 0.79,
      threshold: 0.05,
    });
    expect(v.honest).toBe(true);
    expect(v.observed_verdict).toBe("stable");
  });

  it("flags a 'stable' claim when probes are actually degrading", () => {
    const v = checkScoreboardHonesty({
      claim: "stable",
      baseline_pass_rate: 0.9,
      current_pass_rate: 0.6,
      threshold: 0.05,
    });
    expect(v.honest).toBe(false);
    expect(v.observed_verdict).toBe("drifting_down");
  });
});

describe("runProbeSuite (end-to-end harness)", () => {
  it("runs the suite with an oracle executor and yields a green scoreboard", async () => {
    let tick = 0;
    const out = await runProbeSuite({
      executor: (p) => p.expected, // oracle: always return the expected answer
      suiteRunId: "run-oracle",
      now: () => new Date(Date.parse("2026-05-28T00:00:00.000Z") + ++tick * 5),
    });
    expect(out.scoreboard.total).toBe(PROBE_SET_V0.length);
    expect(out.scoreboard.passed).toBe(PROBE_SET_V0.length);
    expect(out.scoreboard.pass_rate).toBe(1);
    for (const result of out.results) {
      expect(result.pass).toBe(true);
      expect(result.wall_ms).toBeGreaterThanOrEqual(0);
    }
  });

  it("runs the suite with a degenerate executor and yields a red scoreboard", async () => {
    const out = await runProbeSuite({
      executor: () => "definitely wrong",
      suiteRunId: "run-bad",
    });
    expect(out.scoreboard.passed).toBe(0);
    expect(out.scoreboard.pass_rate).toBe(0);
    expect(out.results.every((r) => !r.pass)).toBe(true);
  });

  it("captures executor failures cleanly without throwing", async () => {
    const out = await runProbeSuite({
      executor: () => {
        throw new Error("executor offline");
      },
    });
    expect(out.scoreboard.failed).toBe(PROBE_SET_V0.length);
    expect(out.results[0].reason).toContain("executor threw");
  });

  it("emits ProbeOutcomeRecord shaped for the Slice 0a recorder", async () => {
    const records: ProbeOutcomeRecord[] = [];
    await runProbeSuite({
      executor: (p) => p.expected,
      recorder: (record) => {
        records.push(record);
      },
      suiteRunId: "run-record",
      routeTaken: { seat: "builder", model: "openai/gpt-oss-120b:free", tool_set: ["edit"] },
    });
    expect(records).toHaveLength(PROBE_SET_V0.length);
    const first = records[0];
    expect(first.taskType).toBe("probe");
    expect(first.parentJobId).toBe("run-record");
    expect(first.outcome).toBe("success");
    expect(first.outcomeReason).toBe("clean_pass");
    expect(first.attemptN).toBe(1);
    expect(first.routeTaken.prompt_version).toMatch(/^probe:/);
    expect(first.routeTaken.seat).toBe("builder");
    expect(first.routeTaken.tool_set).toEqual(["edit"]);
    expect(first.costSignal.wall_ms).toBeGreaterThanOrEqual(0);
    expect(first.prompt_hash).toMatch(/^[a-f0-9]{64}$/);
    expect(first.expected_hash).toMatch(/^[a-f0-9]{64}$/);
    expect(first.actual_hash).toMatch(/^[a-f0-9]{64}$/);
    expect("prompt" in (first as Record<string, unknown>)).toBe(false);
    expect("expected" in (first as Record<string, unknown>)).toBe(false);
    expect("actual" in (first as Record<string, unknown>)).toBe(false);
  });

  it("emits outcomeReason='wrong_route' for a failed probe via the recorder", async () => {
    const records: ProbeOutcomeRecord[] = [];
    await runProbeSuite({
      executor: () => "definitely wrong",
      recorder: (record) => {
        records.push(record);
      },
    });
    expect(records.every((r) => r.outcome === "fail")).toBe(true);
    expect(records.every((r) => r.outcomeReason === "wrong_route")).toBe(true);
  });

  it("integrates with the honesty check: oracle vs degenerate runs map to claims", async () => {
    const oracle = await runProbeSuite({ executor: (p) => p.expected });
    const degenerate = await runProbeSuite({ executor: () => "wrong" });

    // Pretend the prior baseline was the degenerate run; the oracle run is a
    // real improvement, so an "improving" claim should be honest.
    const honest = checkScoreboardHonesty({
      claim: "improving",
      baseline_pass_rate: degenerate.scoreboard.pass_rate,
      current_pass_rate: oracle.scoreboard.pass_rate,
      threshold: 0.05,
    });
    expect(honest.honest).toBe(true);
    expect(honest.observed_verdict).toBe("drifting_up");

    // Conversely: baseline was the oracle, but we now ship the degenerate run
    // and try to claim "stable"; the honesty check must reject that lie.
    const dishonest = checkScoreboardHonesty({
      claim: "stable",
      baseline_pass_rate: oracle.scoreboard.pass_rate,
      current_pass_rate: degenerate.scoreboard.pass_rate,
      threshold: 0.05,
    });
    expect(dishonest.honest).toBe(false);
    expect(dishonest.observed_verdict).toBe("drifting_down");
  });
});
