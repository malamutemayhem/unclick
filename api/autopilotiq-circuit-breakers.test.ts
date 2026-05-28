import { describe, expect, it } from "vitest";

import {
  AUTOPILOTIQ_COMPONENTS,
  CIRCUIT_BREAK_REASONS,
  DEFAULT_AUTOPILOTIQ_SAFETY_CONFIG,
  DEFAULT_CIRCUIT_BREAKER_LIMITS,
  evaluateCircuitBreaker,
  isComponentAllowed,
  isComponentPaused,
  isSelfImprovementKilled,
  recordCircuitBreak,
  type AutopilotIQComponent,
  type AutopilotIQSafetyConfig,
  type CircuitBreakerLimits,
  type CircuitBreakRecord,
} from "./lib/autopilotiq-circuit-breakers";

describe("evaluateCircuitBreaker (Layer 1)", () => {
  it("allows when no resource has been used and defaults apply", () => {
    const v = evaluateCircuitBreaker({});
    expect(v.allow).toBe(true);
    expect(v.breached).toBeNull();
    expect(v.detail).toContain("within all configured limits");
  });

  it("allows when usage is exactly at the limit (strict > triggers breach)", () => {
    const limits: CircuitBreakerLimits = { max_actions: 8 };
    expect(evaluateCircuitBreaker({ actions: 8 }, limits).allow).toBe(true);
    expect(evaluateCircuitBreaker({ actions: 9 }, limits).allow).toBe(false);
  });

  it("treats an undefined limit as uncapped for that resource", () => {
    const limits: CircuitBreakerLimits = { max_actions: 8 }; // tokens uncapped
    const v = evaluateCircuitBreaker({ actions: 1, tokens: 1_000_000 }, limits);
    expect(v.allow).toBe(true);
  });

  it("breaches circuit_break_actions with a clear detail line", () => {
    const v = evaluateCircuitBreaker({ actions: 12 }, { max_actions: 8 });
    expect(v.allow).toBe(false);
    expect(v.breached).toBe("circuit_break_actions");
    expect(v.detail).toContain("actions=12");
    expect(v.detail).toContain("limit=8");
  });

  it("breaches circuit_break_tokens when tokens exceed the cap", () => {
    const v = evaluateCircuitBreaker({ tokens: 300_000 }, { max_tokens: 200_000 });
    expect(v.breached).toBe("circuit_break_tokens");
  });

  it("breaches circuit_break_cost when usd exceeds the cap", () => {
    const v = evaluateCircuitBreaker({ usd: 1.25 }, { max_usd: 1.0 });
    expect(v.breached).toBe("circuit_break_cost");
    expect(v.detail).toContain("usd=1.25");
  });

  it("breaches circuit_break_time when wall_ms exceeds the cap", () => {
    const v = evaluateCircuitBreaker({ wall_ms: 600_000 }, { max_wall_ms: 5 * 60_000 });
    expect(v.breached).toBe("circuit_break_time");
  });

  it("breaches circuit_break_retries when retries exceed the cap", () => {
    const v = evaluateCircuitBreaker({ retries: 4 }, { max_retries: 3 });
    expect(v.breached).toBe("circuit_break_retries");
  });

  it("returns the first deterministic breach when multiple limits are exceeded", () => {
    // actions is checked first (actions > tokens > cost > time > retries)
    const v = evaluateCircuitBreaker(
      { actions: 99, tokens: 9_999_999, usd: 99 },
      { max_actions: 8, max_tokens: 200_000, max_usd: 1.0 },
    );
    expect(v.breached).toBe("circuit_break_actions");
  });

  it("uses DEFAULT_CIRCUIT_BREAKER_LIMITS when no limits are provided", () => {
    const v = evaluateCircuitBreaker({ actions: 9 });
    expect(v.breached).toBe("circuit_break_actions");
    expect(v.limits).toBe(DEFAULT_CIRCUIT_BREAKER_LIMITS);
  });

  it("every reason in CIRCUIT_BREAK_REASONS can be produced by some breach", () => {
    const breachedReasons = new Set<string>();
    breachedReasons.add(evaluateCircuitBreaker({ actions: 99 }, { max_actions: 1 }).breached!);
    breachedReasons.add(evaluateCircuitBreaker({ tokens: 99 }, { max_tokens: 1 }).breached!);
    breachedReasons.add(evaluateCircuitBreaker({ usd: 99 }, { max_usd: 1 }).breached!);
    breachedReasons.add(evaluateCircuitBreaker({ wall_ms: 99 }, { max_wall_ms: 1 }).breached!);
    breachedReasons.add(evaluateCircuitBreaker({ retries: 99 }, { max_retries: 1 }).breached!);
    for (const reason of CIRCUIT_BREAK_REASONS) {
      expect(breachedReasons.has(reason)).toBe(true);
    }
  });
});

describe("isSelfImprovementKilled (Layer 3)", () => {
  it("defaults to false", () => {
    expect(isSelfImprovementKilled()).toBe(false);
    expect(isSelfImprovementKilled(DEFAULT_AUTOPILOTIQ_SAFETY_CONFIG)).toBe(false);
  });

  it("returns true when the flag is set", () => {
    expect(isSelfImprovementKilled({ self_improvement_kill: true })).toBe(true);
  });
});

describe("isComponentPaused (Layer 2)", () => {
  it("defaults to not paused", () => {
    for (const component of AUTOPILOTIQ_COMPONENTS) {
      expect(isComponentPaused(component)).toBe(false);
    }
  });

  it("returns true only for the named paused components", () => {
    const config: AutopilotIQSafetyConfig = {
      paused_components: ["seat_intelligence", "creative_evolution"],
    };
    expect(isComponentPaused("seat_intelligence", config)).toBe(true);
    expect(isComponentPaused("creative_evolution", config)).toBe(true);
    expect(isComponentPaused("autopilotiq_tuner", config)).toBe(false);
  });

  it("the global kill switch trumps the per-component list", () => {
    const config: AutopilotIQSafetyConfig = {
      self_improvement_kill: true,
      paused_components: [], // explicitly empty
    };
    for (const component of AUTOPILOTIQ_COMPONENTS) {
      expect(isComponentPaused(component, config)).toBe(true);
    }
  });
});

describe("isComponentAllowed (compound)", () => {
  it("reports allowed=true with reason='ok' under default config", () => {
    expect(isComponentAllowed("autopilotiq_tuner")).toEqual({ allowed: true, reason: "ok" });
  });

  it("reports reason='kill_switch' when the global kill is engaged", () => {
    const v = isComponentAllowed("autopilotiq_tuner", { self_improvement_kill: true });
    expect(v).toEqual({ allowed: false, reason: "kill_switch" });
  });

  it("reports reason='component_paused' when only that component is paused", () => {
    const v = isComponentAllowed("retry_tuner", {
      self_improvement_kill: false,
      paused_components: ["retry_tuner"],
    });
    expect(v).toEqual({ allowed: false, reason: "component_paused" });
  });

  it("kill_switch is reported instead of component_paused when both apply", () => {
    const v = isComponentAllowed("retry_tuner", {
      self_improvement_kill: true,
      paused_components: ["retry_tuner"],
    });
    expect(v.reason).toBe("kill_switch");
  });
});

describe("recordCircuitBreak", () => {
  it("returns null and never calls the recorder when the verdict allows", async () => {
    let called = 0;
    const record = await recordCircuitBreak({
      jobId: "job-1",
      verdict: evaluateCircuitBreaker({ actions: 1 }, { max_actions: 8 }),
      recorder: () => {
        called += 1;
      },
    });
    expect(record).toBeNull();
    expect(called).toBe(0);
  });

  it("builds a record with the Slice 0a adapter shape on breach", async () => {
    const verdict = evaluateCircuitBreaker(
      { actions: 99, tokens: 1234, usd: 5.5, wall_ms: 12_000, retries: 2 },
      { max_actions: 8 },
    );
    const record = await recordCircuitBreak({
      jobId: "job-cb-1",
      parentJobId: "epic-1",
      attemptN: 3,
      receiptId: "receipt-x",
      routeTaken: { seat: "builder", model: "openai/gpt-oss-120b:free", tool_set: ["edit"] },
      verdict,
    });

    expect(record).not.toBeNull();
    const r = record as CircuitBreakRecord;
    expect(r.jobId).toBe("job-cb-1");
    expect(r.parentJobId).toBe("epic-1");
    expect(r.taskType).toBe("circuit_break");
    expect(r.attemptN).toBe(3);
    expect(r.outcome).toBe("fail");
    expect(r.outcomeReason).toBe("policy_block");
    expect(r.break_reason).toBe("circuit_break_actions");
    expect(r.break_detail).toContain("actions=99");
    expect(r.routeTaken).toEqual({
      seat: "builder",
      model: "openai/gpt-oss-120b:free",
      prompt_version: "circuit_break:circuit_break_actions",
      tool_set: ["edit"],
    });
    expect(r.costSignal).toEqual({ tokens: 1234, wall_ms: 12_000, usd: 5.5, retries: 2 });
    expect(r.receiptId).toBe("receipt-x");
  });

  it("calls the injected recorder exactly once per breach with the same record", async () => {
    const seen: CircuitBreakRecord[] = [];
    const verdict = evaluateCircuitBreaker({ usd: 2 }, { max_usd: 1 });
    const record = await recordCircuitBreak({
      jobId: "job-cb-2",
      verdict,
      recorder: (rec) => {
        seen.push(rec);
      },
    });
    expect(seen).toHaveLength(1);
    expect(seen[0]).toBe(record);
    expect(seen[0].break_reason).toBe("circuit_break_cost");
  });

  it("returns the record even when no recorder is provided", async () => {
    const verdict = evaluateCircuitBreaker({ retries: 5 }, { max_retries: 3 });
    const record = await recordCircuitBreak({ jobId: "job-cb-3", verdict });
    expect(record?.break_reason).toBe("circuit_break_retries");
  });
});
