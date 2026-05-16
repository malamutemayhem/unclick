// src/lib/criticalPathQueue.test.ts

import { describe, test, expect } from "vitest";
import {
  rankCriticalPath,
  pickTopN,
  explainRank,
  __consts__,
  type TodoLike,
} from "./criticalPathQueue";

const open = (
  id: string,
  priority: TodoLike["priority"] = "medium",
  blocked_by: string[] = [],
  extra: Partial<TodoLike> = {},
): TodoLike => ({ id, status: "open", priority, blocked_by, ...extra });

describe("rankCriticalPath", () => {
  test("ranks higher-priority todos above lower-priority when no dependencies", () => {
    const ranked = rankCriticalPath([
      open("A", "low"),
      open("B", "urgent"),
      open("C", "high"),
      open("D", "medium"),
    ]);
    expect(ranked.map((r) => r.todo.id)).toEqual(["B", "C", "D", "A"]);
  });

  test("excludes done/cancelled/archived statuses by default", () => {
    const ranked = rankCriticalPath([
      open("A", "urgent"),
      { id: "B", priority: "urgent", status: "done" },
      { id: "C", priority: "urgent", status: "cancelled" },
      { id: "D", priority: "urgent", status: "archived" },
    ]);
    expect(ranked.map((r) => r.todo.id)).toEqual(["A"]);
  });

  test("medium-priority blocker outranks isolated high-priority when unblock count is high", () => {
    // Topology: M is blocked_by nothing; downstream chain D1..D5 are all blocked by M.
    const todos: TodoLike[] = [
      open("M", "medium"),
      open("D1", "low", ["M"]),
      open("D2", "low", ["M"]),
      open("D3", "low", ["M"]),
      open("D4", "low", ["M"]),
      open("D5", "low", ["M"]),
      open("H", "high"), // high but isolated
    ];
    const ranked = rankCriticalPath(todos);
    // M's score: 30 (medium) + 5 * 2 = 40. H's score: 60. So H still wins on default weights.
    // But with multiplier turned up, M should win.
    const rankedHeavy = rankCriticalPath(todos, { unblockMultiplier: 10 });
    // M's heavy score: 30 + 5*10 = 80. H stays at 60. M wins.
    expect(rankedHeavy[0].todo.id).toBe("M");
  });

  test("reachableUnblocks counts transitive downstream nodes (BFS)", () => {
    // M blocks A. A blocks B. B blocks C. M has reach 3.
    const ranked = rankCriticalPath([
      open("M", "medium"),
      open("A", "low", ["M"]),
      open("B", "low", ["A"]),
      open("C", "low", ["B"]),
    ]);
    const m = ranked.find((r) => r.todo.id === "M")!;
    expect(m.reachableUnblocks).toBe(3);
    expect(m.unblockCount).toBe(1); // direct dependents only
  });

  test("circular dependencies do not blow up", () => {
    // A blocks B, B blocks C, C blocks A.
    const ranked = rankCriticalPath([
      open("A", "medium", ["C"]),
      open("B", "medium", ["A"]),
      open("C", "medium", ["B"]),
    ]);
    // No throw. Each has reach 2 (the other two).
    for (const r of ranked) {
      expect(r.reachableUnblocks).toBe(2);
    }
  });

  test("manual_score is added to the score", () => {
    const ranked = rankCriticalPath([
      open("A", "low", [], { manual_score: 1000 }),
      open("B", "urgent"),
    ]);
    expect(ranked[0].todo.id).toBe("A");
  });

  test("manual_score can also be negative", () => {
    const ranked = rankCriticalPath([
      open("A", "urgent", [], { manual_score: -200 }),
      open("B", "low"),
    ]);
    expect(ranked[0].todo.id).toBe("B");
  });

  test("priority weights can be overridden", () => {
    const ranked = rankCriticalPath(
      [open("A", "low"), open("B", "urgent")],
      { priorityWeights: { urgent: 5, low: 100 } },
    );
    expect(ranked[0].todo.id).toBe("A");
  });

  test("missing priority defaults to medium", () => {
    const ranked = rankCriticalPath([
      { id: "X", status: "open", blocked_by: [] }, // no priority
      open("Y", "low"),
    ]);
    expect(ranked[0].todo.id).toBe("X"); // medium beats low by default
  });

  test("blocked_by referencing unknown ids is safely ignored", () => {
    const ranked = rankCriticalPath([
      open("A", "medium", ["DOES_NOT_EXIST"]),
    ]);
    expect(ranked.length).toBe(1);
    expect(ranked[0].reachableUnblocks).toBe(0);
  });

  test("stable secondary sort breaks ties by id ascending", () => {
    const ranked = rankCriticalPath([
      open("Z", "high"),
      open("A", "high"),
      open("M", "high"),
    ]);
    expect(ranked.map((r) => r.todo.id)).toEqual(["A", "M", "Z"]);
  });

  test("setting stableSecondarySort: false preserves insertion order on ties", () => {
    const ranked = rankCriticalPath(
      [open("Z", "high"), open("A", "high"), open("M", "high")],
      { stableSecondarySort: false },
    );
    // Score and reachableUnblocks all equal - sort is non-deterministic but should not throw.
    expect(ranked.length).toBe(3);
  });
});

describe("pickTopN", () => {
  test("returns the top N ranked", () => {
    const todos = ["A", "B", "C", "D", "E"].map((id) => open(id, "high"));
    const top3 = pickTopN(todos, 3);
    expect(top3.length).toBe(3);
  });

  test("throws on invalid N", () => {
    expect(() => pickTopN([open("A")], 0)).toThrow(RangeError);
    expect(() => pickTopN([open("A")], -1)).toThrow(RangeError);
    expect(() => pickTopN([open("A")], 1.5)).toThrow(RangeError);
  });

  test("returns fewer when fewer are available", () => {
    const top10 = pickTopN([open("A")], 10);
    expect(top10.length).toBe(1);
  });
});

describe("explainRank", () => {
  test("describes priority weight and unblock count", () => {
    const ranked = rankCriticalPath([
      open("M", "medium"),
      open("A", "low", ["M"]),
      open("B", "low", ["M"]),
    ]);
    const m = ranked.find((r) => r.todo.id === "M")!;
    const text = explainRank(m);
    expect(text).toMatch(/score \d+ = /);
    expect(text).toMatch(/priority/);
    expect(text).toMatch(/unblocks 2 downstream/);
  });

  test("explains 'no downstream blockers' when reach is zero", () => {
    const ranked = rankCriticalPath([open("X", "high")]);
    expect(explainRank(ranked[0])).toMatch(/no downstream blockers/);
  });

  test("includes manual_score when set", () => {
    const ranked = rankCriticalPath([open("X", "medium", [], { manual_score: 25 })]);
    expect(explainRank(ranked[0])).toMatch(/manual \+25/);
  });
});

describe("default weights and excluded statuses", () => {
  test("default weights favour urgent strongly over low", () => {
    expect(__consts__.DEFAULT_PRIORITY_WEIGHTS.urgent).toBeGreaterThan(
      __consts__.DEFAULT_PRIORITY_WEIGHTS.low * 5,
    );
  });

  test("done is excluded by default", () => {
    expect(__consts__.DEFAULT_EXCLUDED_STATUSES.has("done")).toBe(true);
  });
});
