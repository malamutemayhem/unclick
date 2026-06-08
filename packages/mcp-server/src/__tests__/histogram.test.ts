import { describe, it, expect } from "vitest";
import { Histogram } from "../histogram.js";

describe("Histogram", () => {
  it("adds values to correct buckets", () => {
    const h = new Histogram(0, 100, 10);
    h.add(5);
    h.add(15);
    h.add(15);
    expect(h.getBucket(0).count).toBe(1);
    expect(h.getBucket(1).count).toBe(2);
  });

  it("addMany", () => {
    const h = new Histogram(0, 10, 2);
    h.addMany([1, 2, 3, 6, 7, 8]);
    expect(h.getBucket(0).count).toBe(3);
    expect(h.getBucket(1).count).toBe(3);
  });

  it("count tracks total", () => {
    const h = new Histogram(0, 100, 10);
    h.addMany([1, 2, 3, 4, 5]);
    expect(h.count).toBe(5);
  });

  it("percentile", () => {
    const h = new Histogram(0, 100, 10);
    for (let i = 0; i < 100; i++) h.add(i);
    const p50 = h.percentile(50);
    expect(p50).toBeGreaterThan(40);
    expect(p50).toBeLessThan(60);
  });

  it("toArray returns all buckets", () => {
    const h = new Histogram(0, 10, 5);
    expect(h.toArray()).toHaveLength(5);
    expect(h.toArray()[0].start).toBe(0);
  });

  it("reset clears", () => {
    const h = new Histogram(0, 10, 2);
    h.add(1);
    h.reset();
    expect(h.count).toBe(0);
  });

  it("toString produces text", () => {
    const h = new Histogram(0, 10, 2);
    h.add(1);
    expect(typeof h.toString()).toBe("string");
  });

  it("clamps out-of-range values", () => {
    const h = new Histogram(0, 10, 2);
    h.add(-5);
    h.add(100);
    expect(h.count).toBe(2);
  });
});
