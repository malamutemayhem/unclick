import { describe, it, expect } from "vitest";
import { Histogram } from "../histogram.js";

describe("Histogram", () => {
  it("counts values into correct buckets", () => {
    const h = new Histogram([10, 50, 100]);
    h.observe(5);
    h.observe(25);
    h.observe(75);
    h.observe(200);
    expect(h.getBucket(10)).toBe(1);
    expect(h.getBucket(50)).toBe(1);
    expect(h.getBucket(100)).toBe(1);
    expect(h.getOverflow()).toBe(1);
  });

  it("tracks total count", () => {
    const h = new Histogram([10, 100]);
    h.observe(1);
    h.observe(50);
    h.observe(150);
    expect(h.count).toBe(3);
  });

  it("values on boundary go into that bucket", () => {
    const h = new Histogram([10, 20]);
    h.observe(10);
    expect(h.getBucket(10)).toBe(1);
    expect(h.getBucket(20)).toBe(0);
  });

  it("snapshot returns all buckets", () => {
    const h = new Histogram([5, 10]);
    h.observe(3);
    h.observe(7);
    h.observe(15);
    const snap = h.snapshot();
    expect(snap).toEqual([
      { le: 5, count: 1 },
      { le: 10, count: 1 },
      { le: "+Inf", count: 1 },
    ]);
  });

  it("reset clears all counts", () => {
    const h = new Histogram([10]);
    h.observe(5);
    h.observe(15);
    h.reset();
    expect(h.count).toBe(0);
    expect(h.getBucket(10)).toBe(0);
    expect(h.getOverflow()).toBe(0);
  });

  it("handles unsorted boundaries", () => {
    const h = new Histogram([100, 10, 50]);
    h.observe(5);
    expect(h.getBucket(10)).toBe(1);
  });
});
