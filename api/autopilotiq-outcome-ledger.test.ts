import { describe, expect, it } from "vitest";

import {
  AUTOPILOT_OUTCOME_REASONS,
  AUTOPILOT_OUTCOMES,
  buildAutopilotOutcomeRow,
  type AutopilotOutcomeInput,
} from "./lib/autopilotiq-outcome-ledger";

const now = new Date("2026-05-28T00:00:00.000Z");

function baseInput(overrides: Partial<AutopilotOutcomeInput> = {}): AutopilotOutcomeInput {
  return {
    apiKeyHash: "hash_abc",
    jobId: "job-123",
    taskType: "coding",
    outcome: "success",
    outcomeReason: "proof_landed",
    now,
    ...overrides,
  };
}

describe("autopilotiq outcome ledger", () => {
  it("builds an immutable per-attempt row with route, cost, and defaults", () => {
    const row = buildAutopilotOutcomeRow(
      baseInput({
        parentJobId: "epic-1",
        attemptN: 2,
        actorAgentId: "runner-seat",
        routeTaken: {
          seat: "builder",
          model: "openai/gpt-oss-120b:free",
          prompt_version: "v3",
          tool_set: ["edit", "bash"],
        },
        costSignal: { tokens: 1200, wall_ms: 8400, usd: 0.0, retries: 1 },
        xpassVerdict: "PASS",
        confidence: "hard_gate",
        humanTouch: "approved",
        receiptId: "receipt-9",
        closedAt: "2026-05-28T00:01:00.000Z",
        inputs: { brief: "ship the slice", owned_files: ["api/x.ts"] },
      }),
    );

    expect(row).toMatchObject({
      api_key_hash: "hash_abc",
      job_id: "job-123",
      parent_job_id: "epic-1",
      attempt_n: 2,
      task_type: "coding",
      actor_agent_id: "runner-seat",
      xpass_verdict: "PASS",
      outcome: "success",
      outcome_reason: "proof_landed",
      confidence: "hard_gate",
      human_touch: "approved",
      receipt_id: "receipt-9",
      created_at: "2026-05-28T00:00:00.000Z",
      closed_at: "2026-05-28T00:01:00.000Z",
    });
    expect(row.route_taken).toEqual({
      seat: "builder",
      model: "openai/gpt-oss-120b:free",
      prompt_version: "v3",
      tool_set: ["edit", "bash"],
    });
    expect(row.cost_signal).toEqual({ tokens: 1200, wall_ms: 8400, usd: 0, retries: 1 });
    expect(row.inputs_hash).toMatch(/^[a-f0-9]{64}$/);
  });

  it("applies safe defaults when optional fields are omitted", () => {
    const row = buildAutopilotOutcomeRow(baseInput({ outcome: "hold", outcomeReason: "awaiting_proof" }));
    expect(row.attempt_n).toBe(1);
    expect(row.actor_agent_id).toBe("autopilot");
    expect(row.parent_job_id).toBeNull();
    expect(row.receipt_id).toBeNull();
    expect(row.closed_at).toBeNull();
    expect(row.xpass_verdict).toBe("none");
    expect(row.confidence).toBe("silence");
    expect(row.human_touch).toBe("auto");
    expect(row.route_taken).toEqual({ seat: null, model: null, prompt_version: null, tool_set: null });
    expect(row.cost_signal).toEqual({ tokens: null, wall_ms: null, usd: null, retries: null });
  });

  it("hashes inputs deterministically and never stores them raw", () => {
    const a = buildAutopilotOutcomeRow(baseInput({ inputs: { a: 1, b: 2 } }));
    const b = buildAutopilotOutcomeRow(baseInput({ inputs: { b: 2, a: 1 } }));
    const c = buildAutopilotOutcomeRow(baseInput({ inputs: { a: 1, b: 3 } }));
    // Order-independent (stable) hash; different content => different hash.
    expect(a.inputs_hash).toBe(b.inputs_hash);
    expect(a.inputs_hash).not.toBe(c.inputs_hash);
    // The raw input values must not appear anywhere on the row.
    expect(JSON.stringify(a)).not.toContain('"a":1');
    expect("inputs" in (a as Record<string, unknown>)).toBe(false);
  });

  it("derives a stable idempotency key within the same time bucket", () => {
    const row1 = buildAutopilotOutcomeRow(baseInput({ inputs: { x: 1 } }));
    const row2 = buildAutopilotOutcomeRow(baseInput({ inputs: { x: 1 } }));
    expect(row1.idempotency_key).toBe(row2.idempotency_key);
    expect(row1.idempotency_key).toContain("job-123:1:success:proof_landed:");
    const otherAttempt = buildAutopilotOutcomeRow(baseInput({ attemptN: 2, inputs: { x: 1 } }));
    expect(otherAttempt.idempotency_key).not.toBe(row1.idempotency_key);
  });

  it("rejects values outside the closed taxonomies", () => {
    expect(() => buildAutopilotOutcomeRow(baseInput({ outcome: "maybe" }))).toThrow(/outcome/);
    expect(() => buildAutopilotOutcomeRow(baseInput({ outcomeReason: "vibes" }))).toThrow(
      /outcome_reason/,
    );
    expect(() => buildAutopilotOutcomeRow(baseInput({ confidence: "medium" }))).toThrow(/confidence/);
    expect(() => buildAutopilotOutcomeRow(baseInput({ humanTouch: "ignored" }))).toThrow(/human_touch/);
    expect(() => buildAutopilotOutcomeRow(baseInput({ xpassVerdict: "MAYBE" }))).toThrow(/xpass_verdict/);
  });

  it("refuses secret-shaped inputs and route fields before writing", () => {
    expect(() => buildAutopilotOutcomeRow(baseInput({ inputs: { api_key: "uc_deadbeefdeadbeef" } }))).toThrow(
      /sensitive key/,
    );
    expect(() =>
      buildAutopilotOutcomeRow(baseInput({ inputs: { note: "Authorization: Bearer abc.def.ghi" } })),
    ).toThrow(/sensitive text/);
    expect(() =>
      buildAutopilotOutcomeRow(
        baseInput({ routeTaken: { seat: "builder", token: "sk-abcdef0123456789" } as never }),
      ),
    ).toThrow(/sensitive key/);
  });

  it("validates required fields and attempt_n", () => {
    expect(() => buildAutopilotOutcomeRow(baseInput({ jobId: "" }))).toThrow(/job_id required/);
    expect(() => buildAutopilotOutcomeRow(baseInput({ taskType: "" }))).toThrow(/task_type required/);
    expect(() => buildAutopilotOutcomeRow(baseInput({ apiKeyHash: "" }))).toThrow(/api_key_hash required/);
    expect(() => buildAutopilotOutcomeRow(baseInput({ attemptN: 0 }))).toThrow(/attempt_n/);
    expect(() => buildAutopilotOutcomeRow(baseInput({ attemptN: 1.5 }))).toThrow(/attempt_n/);
  });

  it("exposes closed taxonomies as frozen-shaped constants", () => {
    expect(AUTOPILOT_OUTCOMES).toContain("success");
    expect(AUTOPILOT_OUTCOMES).toContain("fail");
    expect(AUTOPILOT_OUTCOMES).toContain("hold");
    expect(AUTOPILOT_OUTCOME_REASONS).toContain("xpass_fail");
    expect(AUTOPILOT_OUTCOME_REASONS).toContain("budget_exceeded");
    expect(AUTOPILOT_OUTCOME_REASONS).toContain("policy_block");
    // Every reason is unique.
    expect(new Set(AUTOPILOT_OUTCOME_REASONS).size).toBe(AUTOPILOT_OUTCOME_REASONS.length);
  });
});
