// src/lib/seatRelay.test.ts

import { describe, test, expect } from "vitest";
import {
  evaluateSeatRelay,
  redactSecrets,
  __testing__,
  type RelayableItem,
  type RelayCandidate,
} from "./seatRelay";
import type { SeatSnapshot } from "./workerHealthMonitor";

const { isProtected, isInCooldown, findBestCandidate, PROTECTED_TAGS_DEFAULT } = __testing__;

const NOW = new Date("2026-05-21T04:00:00Z");

function isoMinus(ms: number): string {
  return new Date(NOW.getTime() - ms).toISOString();
}

function staleSeat(id: string, todoId: string): SeatSnapshot {
  return {
    id,
    last_seen: isoMinus(6 * 60 * 60 * 1000), // 6h ago - stale
    open_claims: [{ todo_id: todoId, claimed_at: isoMinus(8 * 60 * 60 * 1000), eta: null, resume_safe: true }],
  };
}

function deadSeat(id: string, todoId: string): SeatSnapshot {
  return {
    id,
    last_seen: isoMinus(48 * 60 * 60 * 1000), // 48h ago - dead
    open_claims: [{ todo_id: todoId, claimed_at: isoMinus(50 * 60 * 60 * 1000), eta: null, resume_safe: true }],
  };
}

function healthySeat(id: string): SeatSnapshot {
  return {
    id,
    last_seen: isoMinus(5 * 60 * 1000), // 5 min ago - healthy
    open_claims: [],
  };
}

function makeItem(overrides: Partial<RelayableItem> & { todo_id: string }): RelayableItem {
  return {
    title: `Task ${overrides.todo_id}`,
    assigned_to: null,
    ...overrides,
  };
}

function makeCandidate(overrides: Partial<RelayCandidate> & { seat_id: string }): RelayCandidate {
  return {
    active_claims: 0,
    max_claims: 5,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Unit tests: isProtected
// ---------------------------------------------------------------------------

describe("isProtected", () => {
  test("returns true for human_blocker items", () => {
    expect(isProtected(makeItem({ todo_id: "T1", human_blocker: true }), PROTECTED_TAGS_DEFAULT)).toBe(true);
  });

  test("returns true for manual_only items", () => {
    expect(isProtected(makeItem({ todo_id: "T1", manual_only: true }), PROTECTED_TAGS_DEFAULT)).toBe(true);
  });

  test("returns true for human-owned items", () => {
    expect(isProtected(makeItem({ todo_id: "T1", owner_type: "human" }), PROTECTED_TAGS_DEFAULT)).toBe(true);
  });

  test("returns true for items with protected tags", () => {
    expect(isProtected(makeItem({ todo_id: "T1", tags: ["security"] }), PROTECTED_TAGS_DEFAULT)).toBe(true);
    expect(isProtected(makeItem({ todo_id: "T1", tags: ["billing"] }), PROTECTED_TAGS_DEFAULT)).toBe(true);
    expect(isProtected(makeItem({ todo_id: "T1", tags: ["gated"] }), PROTECTED_TAGS_DEFAULT)).toBe(true);
  });

  test("returns false for normal agent items", () => {
    expect(isProtected(makeItem({ todo_id: "T1", owner_type: "agent", tags: ["build"] }), PROTECTED_TAGS_DEFAULT)).toBe(false);
  });

  test("returns false for untagged items", () => {
    expect(isProtected(makeItem({ todo_id: "T1" }), PROTECTED_TAGS_DEFAULT)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Unit tests: isInCooldown
// ---------------------------------------------------------------------------

describe("isInCooldown", () => {
  test("returns true when last relay is within cooldown", () => {
    const item = makeItem({ todo_id: "T1", last_relay_at: isoMinus(30 * 60 * 1000) }); // 30 min ago
    expect(isInCooldown(item, 60 * 60 * 1000, NOW)).toBe(true);
  });

  test("returns false when last relay exceeds cooldown", () => {
    const item = makeItem({ todo_id: "T1", last_relay_at: isoMinus(2 * 60 * 60 * 1000) }); // 2h ago
    expect(isInCooldown(item, 60 * 60 * 1000, NOW)).toBe(false);
  });

  test("returns false when no last_relay_at", () => {
    const item = makeItem({ todo_id: "T1", last_relay_at: null });
    expect(isInCooldown(item, 60 * 60 * 1000, NOW)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Unit tests: findBestCandidate
// ---------------------------------------------------------------------------

describe("findBestCandidate", () => {
  test("selects candidate with lowest load", () => {
    const candidates = [
      makeCandidate({ seat_id: "A", active_claims: 3 }),
      makeCandidate({ seat_id: "B", active_claims: 1 }),
      makeCandidate({ seat_id: "C", active_claims: 2 }),
    ];
    const result = findBestCandidate(candidates, "T1");
    expect(result?.seat_id).toBe("B");
  });

  test("excludes the current owner seat", () => {
    const candidates = [
      makeCandidate({ seat_id: "A", active_claims: 0 }),
      makeCandidate({ seat_id: "B", active_claims: 1 }),
    ];
    const result = findBestCandidate(candidates, "T1", "A");
    expect(result?.seat_id).toBe("B");
  });

  test("returns null when all candidates are at capacity", () => {
    const candidates = [
      makeCandidate({ seat_id: "A", active_claims: 5, max_claims: 5 }),
      makeCandidate({ seat_id: "B", active_claims: 5, max_claims: 5 }),
    ];
    expect(findBestCandidate(candidates, "T1")).toBeNull();
  });

  test("returns null with empty candidates", () => {
    expect(findBestCandidate([], "T1")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Unit tests: redactSecrets
// ---------------------------------------------------------------------------

describe("redactSecrets", () => {
  test("redacts Stripe-style keys", () => {
    const input = "key is sk_test_abcdefghij1234567890";
    const result = redactSecrets(input);
    expect(result).toContain("[REDACTED]");
    expect(result).not.toContain("abcdefghij1234567890");
  });

  test("redacts GitHub PAT tokens", () => {
    const input = "token: ghp_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghij";
    const result = redactSecrets(input);
    expect(result).toContain("[REDACTED]");
  });

  test("leaves short strings alone", () => {
    const input = "seat hello-world is stale";
    expect(redactSecrets(input)).toBe(input);
  });
});

// ---------------------------------------------------------------------------
// Integration tests: evaluateSeatRelay
// ---------------------------------------------------------------------------

describe("evaluateSeatRelay", () => {
  test("releases stale claims that are safe to release", () => {
    const seats = [staleSeat("worker-A", "T1")];
    const items = [makeItem({ todo_id: "T1", assigned_to: "worker-A" })];

    const result = evaluateSeatRelay({ seats, items, now: NOW });

    expect(result.released).toHaveLength(1);
    expect(result.released[0].todo_id).toBe("T1");
    expect(result.released[0].action).toBe("release");
    expect(result.released[0].from_seat).toBe("worker-A");
    expect(result.released[0].proof.release_verified).toBe(true);
  });

  test("reassigns when candidates are available", () => {
    const seats = [deadSeat("worker-A", "T1")];
    const items = [makeItem({ todo_id: "T1", assigned_to: "worker-A" })];
    const candidates = [makeCandidate({ seat_id: "worker-B", active_claims: 0 })];

    const result = evaluateSeatRelay({ seats, items, candidates, now: NOW });

    expect(result.reassigned).toHaveLength(1);
    expect(result.reassigned[0].to_seat).toBe("worker-B");
    expect(result.reassigned[0].proof.handoff_bonded).toBe(true);
    expect(result.reassigned[0].proof.release_verified).toBe(true);
  });

  test("skips protected items (human_blocker)", () => {
    const seats = [deadSeat("worker-A", "T1")];
    const items = [makeItem({ todo_id: "T1", assigned_to: "worker-A", human_blocker: true })];

    const result = evaluateSeatRelay({ seats, items, now: NOW });

    expect(result.skipped).toHaveLength(1);
    expect(result.skipped[0].reason).toBe("protected_item");
  });

  test("skips protected items (manual_only)", () => {
    const seats = [deadSeat("worker-A", "T1")];
    const items = [makeItem({ todo_id: "T1", assigned_to: "worker-A", manual_only: true })];

    const result = evaluateSeatRelay({ seats, items, now: NOW });

    expect(result.skipped).toHaveLength(1);
    expect(result.skipped[0].reason).toBe("protected_item");
  });

  test("skips protected items (human owner_type)", () => {
    const seats = [deadSeat("worker-A", "T1")];
    const items = [makeItem({ todo_id: "T1", assigned_to: "worker-A", owner_type: "human" })];

    const result = evaluateSeatRelay({ seats, items, now: NOW });

    expect(result.skipped).toHaveLength(1);
    expect(result.skipped[0].reason).toBe("protected_item");
  });

  test("holds when max relay attempts exceeded", () => {
    const seats = [deadSeat("worker-A", "T1")];
    const items = [makeItem({ todo_id: "T1", assigned_to: "worker-A", relay_attempt_count: 3 })];

    const result = evaluateSeatRelay({ seats, items, now: NOW });

    expect(result.held).toHaveLength(1);
    expect(result.held[0].reason).toBe("max_attempts_exceeded");
    expect(result.held[0].safe).toBe(false);
  });

  test("skips items in cooldown", () => {
    const seats = [deadSeat("worker-A", "T1")];
    const items = [makeItem({ todo_id: "T1", assigned_to: "worker-A", last_relay_at: isoMinus(30 * 60 * 1000) })];

    const result = evaluateSeatRelay({ seats, items, now: NOW });

    expect(result.skipped).toHaveLength(1);
    expect(result.skipped[0].reason).toBe("cooldown_active");
  });

  test("skips items not flagged for reclaim", () => {
    const seats = [healthySeat("worker-A")];
    const items = [makeItem({ todo_id: "T1", assigned_to: "worker-A" })];

    const result = evaluateSeatRelay({ seats, items, now: NOW });

    expect(result.skipped).toHaveLength(1);
    expect(result.skipped[0].reason).toBe("not_stale");
  });

  test("holds items that need coordinator review (non-resume-safe stale claims)", () => {
    const seats: SeatSnapshot[] = [{
      id: "worker-A",
      last_seen: isoMinus(6 * 60 * 60 * 1000), // stale
      open_claims: [{ todo_id: "T1", claimed_at: isoMinus(8 * 60 * 60 * 1000), eta: null, resume_safe: false }],
    }];
    const items = [makeItem({ todo_id: "T1", assigned_to: "worker-A" })];

    const result = evaluateSeatRelay({ seats, items, now: NOW });

    expect(result.held).toHaveLength(1);
    expect(result.held[0].reason).toBe("needs_coordinator_review");
  });

  test("does not reassign to the same seat that owns it", () => {
    const seats = [deadSeat("worker-A", "T1")];
    const items = [makeItem({ todo_id: "T1", assigned_to: "worker-A" })];
    const candidates = [makeCandidate({ seat_id: "worker-A", active_claims: 0 })];

    const result = evaluateSeatRelay({ seats, items, candidates, now: NOW });

    // Should release, not reassign (only candidate is the current owner)
    expect(result.released).toHaveLength(1);
    expect(result.reassigned).toHaveLength(0);
  });

  test("never marks anything false DONE", () => {
    const seats = [deadSeat("worker-A", "T1"), staleSeat("worker-B", "T2")];
    const items = [
      makeItem({ todo_id: "T1", assigned_to: "worker-A" }),
      makeItem({ todo_id: "T2", assigned_to: "worker-B" }),
    ];

    const result = evaluateSeatRelay({ seats, items, now: NOW });

    for (const decision of result.decisions) {
      expect(decision.action).not.toBe("done");
      expect(decision.reason).not.toContain("DONE");
    }
  });

  test("proof trail redacts secrets in reasons", () => {
    const seats: SeatSnapshot[] = [{
      id: "worker-A",
      last_seen: isoMinus(48 * 60 * 60 * 1000),
      open_claims: [{ todo_id: "T1", claimed_at: isoMinus(50 * 60 * 60 * 1000), eta: null, resume_safe: true }],
    }];
    const items = [makeItem({ todo_id: "T1", assigned_to: "worker-A" })];

    const result = evaluateSeatRelay({ seats, items, now: NOW });

    for (const entry of result.proof_trail) {
      expect(entry).not.toMatch(/sk_test_[a-zA-Z0-9]{20}/);
      expect(entry).not.toMatch(/ghp_[a-zA-Z0-9]{36}/);
    }
  });

  test("handles multiple items with mixed states", () => {
    const seats: SeatSnapshot[] = [
      deadSeat("worker-dead", "T1"),
      staleSeat("worker-stale", "T2"),
      healthySeat("worker-healthy"),
    ];
    const items: RelayableItem[] = [
      makeItem({ todo_id: "T1", assigned_to: "worker-dead" }),
      makeItem({ todo_id: "T2", assigned_to: "worker-stale" }),
      makeItem({ todo_id: "T3", assigned_to: "worker-healthy" }),
      makeItem({ todo_id: "T4", assigned_to: "worker-dead", human_blocker: true }),
    ];
    const candidates = [makeCandidate({ seat_id: "worker-healthy", active_claims: 1 })];

    const result = evaluateSeatRelay({ seats, items, candidates, now: NOW });

    // T1: dead seat, safe to release, candidate available -> reassign
    expect(result.reassigned.find((d) => d.todo_id === "T1")).toBeTruthy();
    // T2: stale but resume_safe -> release (candidate excludes stale owner)
    expect(result.released.find((d) => d.todo_id === "T2") || result.reassigned.find((d) => d.todo_id === "T2")).toBeTruthy();
    // T3: healthy seat -> skip (not stale)
    expect(result.skipped.find((d) => d.todo_id === "T3")).toBeTruthy();
    // T4: human_blocker -> skip (protected)
    expect(result.skipped.find((d) => d.todo_id === "T4")).toBeTruthy();
  });

  test("caps reassignment attempts with custom max", () => {
    const seats = [deadSeat("worker-A", "T1")];
    const items = [makeItem({ todo_id: "T1", assigned_to: "worker-A", relay_attempt_count: 1 })];

    const result = evaluateSeatRelay({ seats, items, now: NOW, options: { maxRelayAttempts: 1 } });

    expect(result.held).toHaveLength(1);
    expect(result.held[0].reason).toBe("max_attempts_exceeded");
  });

  test("each decision includes a relay_id proof", () => {
    const seats = [deadSeat("worker-A", "T1")];
    const items = [makeItem({ todo_id: "T1", assigned_to: "worker-A" })];

    const result = evaluateSeatRelay({ seats, items, now: NOW });

    for (const decision of result.decisions) {
      expect(decision.proof.relay_id).toMatch(/^relay_/);
      expect(decision.proof.timestamp).toBe(NOW.toISOString());
      expect(decision.proof.trail.length).toBeGreaterThan(0);
    }
  });

  test("returns evaluated_at timestamp", () => {
    const result = evaluateSeatRelay({ seats: [], items: [], now: NOW });
    expect(result.evaluated_at).toBe(NOW.toISOString());
  });
});
