import { describe, it, expect } from "vitest";
import { MedianTracker } from "../median-tracker.js";

describe("median-tracker", () => {
  it("single value", () => {
    const mt = new MedianTracker();
    mt.add(5);
    expect(mt.median()).toBe(5);
  });

  it("two values returns average", () => {
    const mt = new MedianTracker();
    mt.add(1);
    mt.add(3);
    expect(mt.median()).toBe(2);
  });

  it("odd count returns middle", () => {
    const mt = new MedianTracker();
    [3, 1, 5].forEach((v) => mt.add(v));
    expect(mt.median()).toBe(3);
  });

  it("even count returns average of middle two", () => {
    const mt = new MedianTracker();
    [1, 2, 3, 4].forEach((v) => mt.add(v));
    expect(mt.median()).toBe(2.5);
  });

  it("handles duplicates", () => {
    const mt = new MedianTracker();
    [5, 5, 5].forEach((v) => mt.add(v));
    expect(mt.median()).toBe(5);
  });

  it("tracks size", () => {
    const mt = new MedianTracker();
    expect(mt.size).toBe(0);
    mt.add(1);
    mt.add(2);
    expect(mt.size).toBe(2);
  });

  it("throws on empty median", () => {
    const mt = new MedianTracker();
    expect(() => mt.median()).toThrow("No values");
  });

  it("values returns sorted array", () => {
    const mt = new MedianTracker();
    [5, 1, 3, 2, 4].forEach((v) => mt.add(v));
    expect(mt.values()).toEqual([1, 2, 3, 4, 5]);
  });

  it("large sequence maintains correct median", () => {
    const mt = new MedianTracker();
    for (let i = 1; i <= 100; i++) mt.add(i);
    expect(mt.median()).toBe(50.5);
  });
});
