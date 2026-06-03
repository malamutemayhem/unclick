import { describe, expect, it } from "vitest";

import {
  assertSingleSeatTether,
  classifyHeartbeatOutcome,
  HEARTBEAT_ACTION_TAKEN,
  HEARTBEAT_ADVISORY_ONLY_BYPASSED,
  HEARTBEAT_HUMAN_ONLY_BLOCKER,
  HEARTBEAT_NO_WORK,
  HEARTBEAT_NOOP_CODES,
  HEARTBEAT_OUTCOME_CODES,
  HEARTBEAT_OUTCOME_LABELS,
  HEARTBEAT_SAME_TARGET_SUPPRESSED,
  HEARTBEAT_STALE_OWNER_RELEASED,
  HEARTBEAT_TOOLS_MISSING,
  isHeartbeatNoOp,
  type HeartbeatSignal,
} from "./heartbeat-noop-reasons.js";

// A healthy, quiet cycle: tools present, nothing to do, no actions. The baseline
// that every targeted test mutates one field at a time so the precedence is
// exercised in isolation.
function quietSignal(overrides: Partial<HeartbeatSignal> = {}): HeartbeatSignal {
  return {
    seatTetherId: "unclick-builder-tether-seat",
    toolsAvailable: true,
    actionTaken: false,
    staleOwnerReleased: false,
    humanOnlyBlocker: false,
    sameTargetSuppressed: false,
    advisoryOnlyBypassed: false,
    actionableTodoCount: 0,
    ...overrides,
  };
}

describe("heartbeat outcome code vocabulary", () => {
  it("has a label for every code and a stable code set", () => {
    expect(HEARTBEAT_OUTCOME_CODES).toEqual([
      "heartbeat_tools_missing",
      "heartbeat_action_taken",
      "heartbeat_stale_owner_released",
      "heartbeat_human_only_blocker",
      "heartbeat_same_target_suppressed",
      "heartbeat_advisory_only_bypassed",
      "heartbeat_no_work",
    ]);
    for (const code of HEARTBEAT_OUTCOME_CODES) {
      expect(typeof HEARTBEAT_OUTCOME_LABELS[code]).toBe("string");
      expect(HEARTBEAT_OUTCOME_LABELS[code].length).toBeGreaterThan(0);
    }
  });

  it("marks every code a no-op except action_taken", () => {
    expect(isHeartbeatNoOp(HEARTBEAT_ACTION_TAKEN)).toBe(false);
    for (const code of HEARTBEAT_NOOP_CODES) {
      expect(isHeartbeatNoOp(code)).toBe(true);
      expect(code).not.toBe(HEARTBEAT_ACTION_TAKEN);
    }
    // No-op set + the single action code = the whole code set, no gaps.
    expect(new Set([...HEARTBEAT_NOOP_CODES, HEARTBEAT_ACTION_TAKEN])).toEqual(
      new Set(HEARTBEAT_OUTCOME_CODES),
    );
  });
});

describe("classifyHeartbeatOutcome - one named code per path", () => {
  it("tools missing dominates everything else", () => {
    const outcome = classifyHeartbeatOutcome(
      quietSignal({
        toolsAvailable: false,
        actionTaken: true,
        actionableTodoCount: 5,
      }),
    );
    expect(outcome.code).toBe(HEARTBEAT_TOOLS_MISSING);
    expect(outcome.isNoOp).toBe(true);
  });

  it("action taken is the only non-no-op", () => {
    const outcome = classifyHeartbeatOutcome(
      quietSignal({ actionTaken: true, actionableTodoCount: 3 }),
    );
    expect(outcome.code).toBe(HEARTBEAT_ACTION_TAKEN);
    expect(outcome.isNoOp).toBe(false);
  });

  it("stale owner released ranks above the passive no-ops", () => {
    const outcome = classifyHeartbeatOutcome(
      quietSignal({ staleOwnerReleased: true, sameTargetSuppressed: true }),
    );
    expect(outcome.code).toBe(HEARTBEAT_STALE_OWNER_RELEASED);
    expect(outcome.isNoOp).toBe(true);
  });

  it("emits human-only blocker when a human-gated surface is flagged", () => {
    const outcome = classifyHeartbeatOutcome(
      quietSignal({ humanOnlyBlocker: true }),
    );
    expect(outcome.code).toBe(HEARTBEAT_HUMAN_ONLY_BLOCKER);
  });

  it("emits same-target-suppressed for a deduped wake", () => {
    const outcome = classifyHeartbeatOutcome(
      quietSignal({ sameTargetSuppressed: true }),
    );
    expect(outcome.code).toBe(HEARTBEAT_SAME_TARGET_SUPPRESSED);
  });

  it("emits advisory_only bypassed", () => {
    const outcome = classifyHeartbeatOutcome(
      quietSignal({ advisoryOnlyBypassed: true }),
    );
    expect(outcome.code).toBe(HEARTBEAT_ADVISORY_ONLY_BYPASSED);
  });

  it("emits no_work ONLY for a genuinely empty queue", () => {
    const outcome = classifyHeartbeatOutcome(quietSignal());
    expect(outcome.code).toBe(HEARTBEAT_NO_WORK);
    expect(outcome.isNoOp).toBe(true);
  });

  // The core acceptance rule: a bare "no change" must never be the status while
  // actionable backlog exists. Backlog + no safe disposition routes to a human.
  it("never reports no_work while actionable backlog exists", () => {
    const outcome = classifyHeartbeatOutcome(
      quietSignal({ actionableTodoCount: 7 }),
    );
    expect(outcome.code).not.toBe(HEARTBEAT_NO_WORK);
    expect(outcome.code).toBe(HEARTBEAT_HUMAN_ONLY_BLOCKER);
  });

  it("is deterministic: identical signals map to the identical code", () => {
    const signal = quietSignal({ sameTargetSuppressed: true });
    expect(classifyHeartbeatOutcome(signal).code).toBe(
      classifyHeartbeatOutcome(signal).code,
    );
  });
});

describe("ledger surfacing + one-tether-per-seat", () => {
  it("surfaces a stable ledger line carrying seat, code, and label", () => {
    const outcome = classifyHeartbeatOutcome(
      quietSignal({ seatTetherId: "seat-a", advisoryOnlyBypassed: true }),
    );
    expect(outcome.ledgerLine).toBe(
      "seat-a -- heartbeat_advisory_only_bypassed -- advisory_only bypassed",
    );
    expect(outcome.seatTetherId).toBe("seat-a");
    expect(outcome.label).toBe(HEARTBEAT_OUTCOME_LABELS[outcome.code]);
  });

  it("requires a seat tether id on every outcome", () => {
    expect(() =>
      classifyHeartbeatOutcome(quietSignal({ seatTetherId: "   " })),
    ).toThrow(/seatTetherId is required/);
  });

  it("assertSingleSeatTether returns the single distinct id", () => {
    expect(assertSingleSeatTether(["seat-a", "seat-a"])).toBe("seat-a");
  });

  it("assertSingleSeatTether rejects zero or mixed tethers", () => {
    expect(() => assertSingleSeatTether([])).toThrow(/no seat tether id/);
    expect(() => assertSingleSeatTether(["seat-a", "seat-b"])).toThrow(
      /expected one seat tether/,
    );
  });
});
