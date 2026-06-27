import { describe, it, expect } from "vitest";
import {
  maxNonOverlapping, maxWeightedSchedule, findOverlaps,
  mergeIntervals, maxConcurrent,
} from "../interval-scheduling.js";

describe("maxNonOverlapping", () => {
  it("selects non-overlapping intervals", () => {
    const result = maxNonOverlapping([
      { start: 0, end: 3 },
      { start: 2, end: 5 },
      { start: 4, end: 7 },
      { start: 6, end: 9 },
    ]);
    expect(result.length).toBeGreaterThanOrEqual(2);
    for (let i = 1; i < result.length; i++) {
      expect(result[i].start).toBeGreaterThanOrEqual(result[i - 1].end);
    }
  });

  it("returns empty for empty input", () => {
    expect(maxNonOverlapping([])).toEqual([]);
  });

  it("returns all if none overlap", () => {
    const result = maxNonOverlapping([
      { start: 0, end: 1 },
      { start: 2, end: 3 },
      { start: 4, end: 5 },
    ]);
    expect(result).toHaveLength(3);
  });
});

describe("maxWeightedSchedule", () => {
  it("maximizes total weight", () => {
    const result = maxWeightedSchedule([
      { start: 0, end: 3, weight: 2 },
      { start: 1, end: 4, weight: 10 },
      { start: 3, end: 6, weight: 3 },
    ]);
    expect(result.totalWeight).toBeGreaterThanOrEqual(10);
  });

  it("returns empty for empty input", () => {
    const result = maxWeightedSchedule([]);
    expect(result.intervals).toEqual([]);
    expect(result.totalWeight).toBe(0);
  });
});

describe("findOverlaps", () => {
  it("finds overlapping pairs", () => {
    const overlaps = findOverlaps([
      { start: 0, end: 3 },
      { start: 2, end: 5 },
      { start: 6, end: 8 },
    ]);
    expect(overlaps).toHaveLength(1);
  });

  it("returns empty for non-overlapping", () => {
    const overlaps = findOverlaps([
      { start: 0, end: 1 },
      { start: 2, end: 3 },
    ]);
    expect(overlaps).toHaveLength(0);
  });
});

describe("mergeIntervals", () => {
  it("merges overlapping intervals", () => {
    const result = mergeIntervals([
      { start: 0, end: 3 },
      { start: 2, end: 5 },
      { start: 7, end: 9 },
    ]);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ start: 0, end: 5 });
    expect(result[1]).toEqual({ start: 7, end: 9 });
  });

  it("handles empty input", () => {
    expect(mergeIntervals([])).toEqual([]);
  });

  it("handles adjacent intervals", () => {
    const result = mergeIntervals([
      { start: 0, end: 2 },
      { start: 2, end: 4 },
    ]);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ start: 0, end: 4 });
  });
});

describe("maxConcurrent", () => {
  it("finds maximum concurrency", () => {
    const result = maxConcurrent([
      { start: 0, end: 5 },
      { start: 2, end: 7 },
      { start: 4, end: 6 },
      { start: 8, end: 10 },
    ]);
    expect(result.maxCount).toBe(3);
    expect(result.time).toBe(4);
  });

  it("returns zero for empty input", () => {
    const result = maxConcurrent([]);
    expect(result.maxCount).toBe(0);
  });
});
