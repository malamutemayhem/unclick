import { describe, it, expect } from "vitest";
import { ActivitySelection } from "../activity-selection.js";

describe("ActivitySelection", () => {
  it("selects non-overlapping activities", () => {
    const activities = [
      { start: 1, end: 3 },
      { start: 2, end: 5 },
      { start: 4, end: 7 },
      { start: 6, end: 9 },
    ];
    const selected = ActivitySelection.select(activities);
    expect(selected.length).toBe(2);
    for (let i = 1; i < selected.length; i++) {
      expect(selected[i].start).toBeGreaterThanOrEqual(selected[i - 1].end);
    }
  });

  it("maxActivities returns count", () => {
    const activities = [
      { start: 0, end: 2 },
      { start: 3, end: 5 },
      { start: 6, end: 8 },
    ];
    expect(ActivitySelection.maxActivities(activities)).toBe(3);
  });

  it("handles single activity", () => {
    const selected = ActivitySelection.select([{ start: 0, end: 1 }]);
    expect(selected.length).toBe(1);
  });

  it("handles all overlapping", () => {
    const activities = [
      { start: 0, end: 10 },
      { start: 1, end: 9 },
      { start: 2, end: 8 },
    ];
    expect(ActivitySelection.maxActivities(activities)).toBe(1);
  });

  it("conflicts detects overlapping pairs", () => {
    const activities = [
      { start: 0, end: 5 },
      { start: 3, end: 8 },
      { start: 6, end: 10 },
    ];
    const conflicts = ActivitySelection.conflicts(activities);
    expect(conflicts.length).toBe(2);
  });

  it("weighted selection maximizes weight", () => {
    const activities = [
      { start: 0, end: 3, weight: 10 },
      { start: 1, end: 4, weight: 20 },
      { start: 4, end: 6, weight: 15 },
    ];
    const { totalWeight } = ActivitySelection.weightedSelect(activities);
    expect(totalWeight).toBe(35);
  });

  it("empty input returns empty", () => {
    expect(ActivitySelection.select([]).length).toBe(0);
  });
});
