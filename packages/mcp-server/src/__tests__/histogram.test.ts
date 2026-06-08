import { describe, it, expect } from "vitest";
import { Histogram } from "../histogram.js";

describe("Histogram", () => {
  it("records values into buckets", () => {
    const h = new Histogram([10, 50, 100, 500]);
    h.record(5);
    h.record(25);
    h.record(75);
    h.record(200);
    h.record(1000);
    const buckets = h.getBuckets();
    expect(buckets.find((b) => b.le === 10)!.count).toBe(1);
    expect(buckets.find((b) => b.le === 50)!.count).toBe(1);
    expect(buckets.find((b) => b.le === 100)!.count).toBe(1);
    expect(buckets.find((b) => b.le === 500)!.count).toBe(1);
    expect(buckets.find((b) => b.le === "+Inf")!.count).toBe(1);
  });

  it("tracks count, sum, min, max, mean", () => {
    const h = new Histogram([100]);
    h.record(10);
    h.record(20);
    h.record(30);
    expect(h.count).toBe(3);
    expect(h.sum).toBe(60);
    expect(h.min).toBe(10);
    expect(h.max).toBe(30);
    expect(h.mean).toBe(20);
  });

  it("percentile estimation", () => {
    const h = new Histogram([10, 20, 30, 40, 50]);
    for (let i = 1; i <= 50; i++) h.record(i);
    const p50 = h.percentile(50);
    expect(p50).toBeGreaterThanOrEqual(20);
    expect(p50).toBeLessThanOrEqual(30);
  });

  it("reset clears all data", () => {
    const h = new Histogram([100]);
    h.record(50);
    h.record(150);
    h.reset();
    expect(h.count).toBe(0);
    expect(h.sum).toBe(0);
  });
});
