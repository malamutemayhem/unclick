import { describe, expect, it } from "vitest";

import {
  classifyHeartbeatOutcome,
  isHeartbeatNoOp,
  assertSingleSeatTether,
  HEARTBEAT_OUTCOME_CODES,
  HEARTBEAT_NOOP_CODES,
  HEARTBEAT_OUTCOME_LABELS,
  HEARTBEAT_TOOLS_MISSING,
  HEARTBEAT_NO_WORK,
  HEARTBEAT_SAME_TARGET_SUPPRESSED,
  HEARTBEAT_ADVISORY_ONLY_BYPASSED,
  HEARTBEAT_STALE_OWNER_RELEASED,
  HEARTBEAT_ACTION_TAKEN,
  HEARTBEAT_HUMAN_ONLY_BLOCKER,
  type HeartbeatSignal,
} from "../heartbeat-noop-reasons.js";

const SEAT = "seat-abc-123";

function baseSignal(overrides: Partial<HeartbeatSignal> = {}): HeartbeatSignal {
  return {
    seatTetherId: SEAT,
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

describe("HEARTBEAT_OUTCOME_CODES", () => {
  it("contains 7 distinct codes", () => {
    expect(HEARTBEAT_OUTCOME_CODES).toHaveLength(7);
    expect(new Set(HEARTBEAT_OUTCOME_CODES).size).toBe(7);
  });

  it("has labels for every code", () => {
    for (const code of HEARTBEAT_OUTCOME_CODES) {
      expect(HEARTBEAT_OUTCOME_LABELS[code]).toBeTruthy();
    }
  });
});

describe("isHeartbeatNoOp", () => {
  it("returns true for all noop codes", () => {
    for (const code of HEARTBEAT_NOOP_CODES) {
      expect(isHeartbeatNoOp(code)).toBe(true);
    }
  });

  it("returns false for ACTION_TAKEN", () => {
    expect(isHeartbeatNoOp(HEARTBEAT_ACTION_TAKEN)).toBe(false);
  });

  it("ACTION_TAKEN is the only non-noop", () => {
    const nonNoOps = HEARTBEAT_OUTCOME_CODES.filter((c) => !isHeartbeatNoOp(c));
    expect(nonNoOps).toEqual([HEARTBEAT_ACTION_TAKEN]);
  });
});

describe("classifyHeartbeatOutcome - precedence", () => {
  it("returns TOOLS_MISSING when tools unavailable (highest precedence)", () => {
    const result = classifyHeartbeatOutcome(
      baseSignal({ toolsAvailable: false, actionTaken: true, humanOnlyBlocker: true }),
    );
    expect(result.code).toBe(HEARTBEAT_TOOLS_MISSING);
    expect(result.isNoOp).toBe(true);
  });

  it("returns ACTION_TAKEN when action was performed", () => {
    const result = classifyHeartbeatOutcome(
      baseSignal({ actionTaken: true, staleOwnerReleased: true }),
    );
    expect(result.code).toBe(HEARTBEAT_ACTION_TAKEN);
    expect(result.isNoOp).toBe(false);
  });

  it("returns STALE_OWNER_RELEASED when a lease was recovered", () => {
    const result = classifyHeartbeatOutcome(
      baseSignal({ staleOwnerReleased: true, humanOnlyBlocker: true }),
    );
    expect(result.code).toBe(HEARTBEAT_STALE_OWNER_RELEASED);
    expect(result.isNoOp).toBe(true);
  });

  it("returns HUMAN_ONLY_BLOCKER when flagged explicitly", () => {
    const result = classifyHeartbeatOutcome(
      baseSignal({ humanOnlyBlocker: true, sameTargetSuppressed: true }),
    );
    expect(result.code).toBe(HEARTBEAT_HUMAN_ONLY_BLOCKER);
    expect(result.isNoOp).toBe(true);
  });

  it("returns SAME_TARGET_SUPPRESSED for duplicate wake", () => {
    const result = classifyHeartbeatOutcome(
      baseSignal({ sameTargetSuppressed: true, advisoryOnlyBypassed: true }),
    );
    expect(result.code).toBe(HEARTBEAT_SAME_TARGET_SUPPRESSED);
    expect(result.isNoOp).toBe(true);
  });

  it("returns ADVISORY_ONLY_BYPASSED when bypassed", () => {
    const result = classifyHeartbeatOutcome(
      baseSignal({ advisoryOnlyBypassed: true }),
    );
    expect(result.code).toBe(HEARTBEAT_ADVISORY_ONLY_BYPASSED);
    expect(result.isNoOp).toBe(true);
  });

  it("returns NO_WORK when queue is empty and nothing happened", () => {
    const result = classifyHeartbeatOutcome(baseSignal());
    expect(result.code).toBe(HEARTBEAT_NO_WORK);
    expect(result.isNoOp).toBe(true);
  });
});

describe("classifyHeartbeatOutcome - fail-closed backlog guard", () => {
  it("returns HUMAN_ONLY_BLOCKER when backlog exists but nothing acted", () => {
    const result = classifyHeartbeatOutcome(
      baseSignal({ actionableTodoCount: 3 }),
    );
    expect(result.code).toBe(HEARTBEAT_HUMAN_ONLY_BLOCKER);
  });

  it("returns NO_WORK only when actionableTodoCount is 0", () => {
    const result = classifyHeartbeatOutcome(
      baseSignal({ actionableTodoCount: 0 }),
    );
    expect(result.code).toBe(HEARTBEAT_NO_WORK);
  });

  it("does not return NO_WORK when actionableTodoCount > 0", () => {
    const result = classifyHeartbeatOutcome(
      baseSignal({ actionableTodoCount: 1 }),
    );
    expect(result.code).not.toBe(HEARTBEAT_NO_WORK);
  });
});

describe("classifyHeartbeatOutcome - output shape", () => {
  it("includes seatTetherId, code, isNoOp, label, and ledgerLine", () => {
    const result = classifyHeartbeatOutcome(baseSignal());
    expect(result.seatTetherId).toBe(SEAT);
    expect(result.code).toBe(HEARTBEAT_NO_WORK);
    expect(result.isNoOp).toBe(true);
    expect(result.label).toBe("no work");
    expect(result.ledgerLine).toBe(`${SEAT} -- ${HEARTBEAT_NO_WORK} -- no work`);
  });

  it("ledgerLine follows the seat -- code -- label format", () => {
    const result = classifyHeartbeatOutcome(
      baseSignal({ actionTaken: true }),
    );
    expect(result.ledgerLine).toMatch(
      new RegExp(`^${SEAT} -- ${HEARTBEAT_ACTION_TAKEN} -- .+$`),
    );
  });
});

describe("classifyHeartbeatOutcome - seatTetherId validation", () => {
  it("throws when seatTetherId is empty", () => {
    expect(() =>
      classifyHeartbeatOutcome(baseSignal({ seatTetherId: "" })),
    ).toThrow("seatTetherId is required");
  });

  it("throws when seatTetherId is whitespace-only", () => {
    expect(() =>
      classifyHeartbeatOutcome(baseSignal({ seatTetherId: "   " })),
    ).toThrow("seatTetherId is required");
  });

  it("trims seatTetherId in the output", () => {
    const result = classifyHeartbeatOutcome(
      baseSignal({ seatTetherId: "  trimmed  " }),
    );
    expect(result.seatTetherId).toBe("trimmed");
  });
});

describe("assertSingleSeatTether", () => {
  it("returns the single distinct id", () => {
    expect(assertSingleSeatTether(["seat-1"])).toBe("seat-1");
  });

  it("deduplicates identical ids", () => {
    expect(assertSingleSeatTether(["seat-1", "seat-1", "seat-1"])).toBe("seat-1");
  });

  it("trims whitespace before deduplication", () => {
    expect(assertSingleSeatTether(["  seat-1  ", "seat-1"])).toBe("seat-1");
  });

  it("throws for empty array", () => {
    expect(() => assertSingleSeatTether([])).toThrow("no seat tether id supplied");
  });

  it("throws for array of empty strings", () => {
    expect(() => assertSingleSeatTether(["", "  "])).toThrow(
      "no seat tether id supplied",
    );
  });

  it("throws for multiple distinct ids", () => {
    expect(() => assertSingleSeatTether(["seat-1", "seat-2"])).toThrow(
      "expected one seat tether per heartbeat, got 2",
    );
  });

  it("filters out empty strings before counting", () => {
    expect(assertSingleSeatTether(["", "seat-1", ""])).toBe("seat-1");
  });
});
