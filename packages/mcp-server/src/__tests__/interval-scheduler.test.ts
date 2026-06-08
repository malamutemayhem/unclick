import { describe, it, expect } from "vitest";
import { IntervalScheduler } from "../interval-scheduler.js";

describe("IntervalScheduler", () => {
  it("overlaps detects overlapping intervals", () => {
    expect(IntervalScheduler.overlaps({ start: 0, end: 5 }, { start: 3, end: 8 })).toBe(true);
    expect(IntervalScheduler.overlaps({ start: 0, end: 5 }, { start: 5, end: 8 })).toBe(false);
  });

  it("merge combines overlapping intervals", () => {
    const merged = IntervalScheduler.merge([
      { start: 0, end: 3 },
      { start: 2, end: 5 },
      { start: 7, end: 10 },
    ]);
    expect(merged).toEqual([
      { start: 0, end: 5 },
      { start: 7, end: 10 },
    ]);
  });

  it("merge returns empty for empty input", () => {
    expect(IntervalScheduler.merge([])).toEqual([]);
  });

  it("gaps finds free slots in a range", () => {
    const g = IntervalScheduler.gaps(
      [{ start: 2, end: 4 }, { start: 6, end: 8 }],
      0, 10
    );
    expect(g).toEqual([
      { start: 0, end: 2 },
      { start: 4, end: 6 },
      { start: 8, end: 10 },
    ]);
  });

  it("findConflicts returns index pairs of overlapping intervals", () => {
    const conflicts = IntervalScheduler.findConflicts([
      { start: 0, end: 5 },
      { start: 3, end: 7 },
      { start: 10, end: 15 },
    ]);
    expect(conflicts).toEqual([[0, 1]]);
  });

  it("greedySchedule selects maximum non-overlapping set", () => {
    const selected = IntervalScheduler.greedySchedule([
      { start: 0, end: 3 },
      { start: 2, end: 5 },
      { start: 4, end: 7 },
      { start: 6, end: 9 },
    ]);
    expect(selected.length).toBe(2);
  });

  it("totalDuration sums merged interval lengths", () => {
    const dur = IntervalScheduler.totalDuration([
      { start: 0, end: 5 },
      { start: 3, end: 8 },
    ]);
    expect(dur).toBe(8);
  });

  it("contains checks if point is in interval", () => {
    expect(IntervalScheduler.contains({ start: 0, end: 10 }, 5)).toBe(true);
    expect(IntervalScheduler.contains({ start: 0, end: 10 }, 10)).toBe(false);
  });

  it("intersection computes overlap of two intervals", () => {
    const inter = IntervalScheduler.intersection({ start: 0, end: 5 }, { start: 3, end: 8 });
    expect(inter).toEqual({ start: 3, end: 5 });
    expect(IntervalScheduler.intersection({ start: 0, end: 3 }, { start: 5, end: 8 })).toBeNull();
  });

  it("split divides interval at a point", () => {
    const parts = IntervalScheduler.split({ start: 0, end: 10 }, 4);
    expect(parts).toEqual([
      { start: 0, end: 4 },
      { start: 4, end: 10 },
    ]);
  });
});
