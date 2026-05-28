import { describe, expect, it } from "vitest";
import {
  OPEN_STALE_RECLAIM_ATTEMPT_LIMIT,
  planOpenStaleTodoRelease,
  type PlanOpenStaleTodoReleaseInput,
} from "./lib/fishbowl-todo-open-stale-release";

const NOW = Date.parse("2026-05-26T12:00:00.000Z");
const NOW_ISO = new Date(NOW).toISOString();
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

// ISO timestamp whose age relative to NOW is exactly `ageMs`.
const at = (ageMs: number) => new Date(NOW - ageMs).toISOString();

// Baseline input that classifies as stale_assigned_open: open, human assignee,
// todo older than 6h, owner last seen more than 1h ago, not protected, reclaim 0.
const staleBase: PlanOpenStaleTodoReleaseInput = {
  status: "open",
  assignedToAgentId: "alice",
  updatedAt: at(7 * HOUR),
  ownerLastSeenAt: at(2 * HOUR),
  reclaimCount: 0,
  isProtected: false,
  nowMs: NOW,
};

describe("OPEN_STALE_RECLAIM_ATTEMPT_LIMIT", () => {
  it("mirrors WORKER_SELF_HEALING_REASSIGN_ATTEMPT_LIMIT (= 3)", () => {
    expect(OPEN_STALE_RECLAIM_ATTEMPT_LIMIT).toBe(3);
  });
});

describe("planOpenStaleTodoRelease - one per classifier state", () => {
  it("stale_assigned_open: returns a release plan", () => {
    const plan = planOpenStaleTodoRelease(staleBase);
    expect(plan).not.toBeNull();
    expect(plan?.classification).toBe("stale_assigned_open");
  });

  it("unassigned_open: returns null", () => {
    expect(
      planOpenStaleTodoRelease({ ...staleBase, assignedToAgentId: "" }),
    ).toBeNull();
  });

  it("role_assigned_open: returns null", () => {
    expect(
      planOpenStaleTodoRelease({ ...staleBase, assignedToAgentId: "builder" }),
    ).toBeNull();
  });

  it("stale_in_progress: returns null (open-only release)", () => {
    expect(
      planOpenStaleTodoRelease({ ...staleBase, status: "in_progress" }),
    ).toBeNull();
  });

  it("fresh_owner_do_not_touch: returns null", () => {
    expect(
      planOpenStaleTodoRelease({ ...staleBase, updatedAt: at(1 * HOUR) }),
    ).toBeNull();
  });
});

describe("owner liveness", () => {
  it("owner seen within 1h => live owner => null", () => {
    expect(
      planOpenStaleTodoRelease({ ...staleBase, ownerLastSeenAt: at(30 * MINUTE) }),
    ).toBeNull();
  });

  it("owner dormant (>1h) and todo stale (>6h) => plan", () => {
    const plan = planOpenStaleTodoRelease({
      ...staleBase,
      updatedAt: at(8 * HOUR),
      ownerLastSeenAt: at(90 * MINUTE),
    });
    expect(plan?.classification).toBe("stale_assigned_open");
  });
});

describe("strict > boundaries", () => {
  it("todoAge exactly 6h is not > 6h => null", () => {
    expect(
      planOpenStaleTodoRelease({ ...staleBase, updatedAt: at(6 * HOUR) }),
    ).toBeNull();
  });

  it("ownerAge exactly 1h is not > 1h => owner live => null", () => {
    expect(
      planOpenStaleTodoRelease({ ...staleBase, ownerLastSeenAt: at(1 * HOUR) }),
    ).toBeNull();
  });
});

describe("reclaim attempt cap", () => {
  it("reclaimCount 0 => plan with reclaim_count 1", () => {
    expect(planOpenStaleTodoRelease(staleBase)?.update.reclaim_count).toBe(1);
  });

  it("reclaimCount 2 => plan with reclaim_count 3", () => {
    expect(
      planOpenStaleTodoRelease({ ...staleBase, reclaimCount: 2 })?.update.reclaim_count,
    ).toBe(3);
  });

  it("reclaimCount 3 (at the limit) => null", () => {
    expect(
      planOpenStaleTodoRelease({ ...staleBase, reclaimCount: 3 }),
    ).toBeNull();
  });

  it("null/undefined reclaimCount coerces to 0 => plan with reclaim_count 1", () => {
    expect(
      planOpenStaleTodoRelease({ ...staleBase, reclaimCount: null })?.update.reclaim_count,
    ).toBe(1);
    expect(
      planOpenStaleTodoRelease({ ...staleBase, reclaimCount: undefined })?.update.reclaim_count,
    ).toBe(1);
  });
});

describe("protection", () => {
  it("isProtected true => null even when otherwise stale", () => {
    expect(
      planOpenStaleTodoRelease({ ...staleBase, isProtected: true }),
    ).toBeNull();
  });
});

describe("timestamp handling", () => {
  it("missing ownerLastSeenAt => owner treated dormant => plan", () => {
    const plan = planOpenStaleTodoRelease({
      ...staleBase,
      ownerLastSeenAt: undefined,
    });
    expect(plan?.classification).toBe("stale_assigned_open");
  });

  it("unparseable ownerLastSeenAt => owner treated dormant => plan", () => {
    const plan = planOpenStaleTodoRelease({
      ...staleBase,
      ownerLastSeenAt: "garbage",
    });
    expect(plan?.classification).toBe("stale_assigned_open");
  });

  it("falls back from missing updatedAt to a recent createdAt => fresh => null", () => {
    expect(
      planOpenStaleTodoRelease({
        ...staleBase,
        updatedAt: undefined,
        createdAt: at(1 * HOUR),
      }),
    ).toBeNull();
  });

  it("falls back from missing updatedAt to a stale createdAt => plan", () => {
    const plan = planOpenStaleTodoRelease({
      ...staleBase,
      updatedAt: undefined,
      createdAt: at(7 * HOUR),
    });
    expect(plan?.classification).toBe("stale_assigned_open");
  });
});

describe("update payload matches the CAS applier (releaseWorkerSelfHealingTodoOwnership)", () => {
  it("emits exactly the WorkerSelfHealingTodoReleasePlan update shape", () => {
    const plan = planOpenStaleTodoRelease({ ...staleBase, reclaimCount: 1 });
    expect(plan).toEqual({
      classification: "stale_assigned_open",
      update: {
        status: "open",
        assigned_to_agent_id: null,
        lease_token: null,
        lease_expires_at: null,
        reclaim_count: 2,
        updated_at: NOW_ISO,
      },
    });
  });
});
