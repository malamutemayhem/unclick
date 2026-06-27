import { describe, it, expect } from "vitest";
import { Histogram } from "../histogram.js";

describe("Histogram", () => {
  it("counts observations in buckets", () => {
    const h = new Histogram([10, 50, 100]);
    h.observe(5);
    h.observe(25);
    h.observe(75);
    h.observe(150);
    const buckets = h.getBuckets();
    expect(buckets[0].count).toBe(1);
    expect(buckets[1].count).toBe(1);
    expect(buckets[2].count).toBe(1);
    expect(buckets[3].count).toBe(1);
  });

  it("tracks count", () => {
    const h = new Histogram([10]);
    h.observe(1);
    h.observe(2);
    h.observe(20);
    expect(h.count).toBe(3);
  });

  it("tracks average", () => {
    const h = new Histogram([100]);
    h.observe(10);
    h.observe(20);
    h.observe(30);
    expect(h.average).toBe(20);
  });

  it("tracks min and max", () => {
    const h = new Histogram([50]);
    h.observe(10);
    h.observe(90);
    h.observe(50);
    expect(h.minimum).toBe(10);
    expect(h.maximum).toBe(90);
  });

  it("empty histogram returns 0 for stats", () => {
    const h = new Histogram([10]);
    expect(h.count).toBe(0);
    expect(h.average).toBe(0);
    expect(h.minimum).toBe(0);
    expect(h.maximum).toBe(0);
  });

  it("reset clears everything", () => {
    const h = new Histogram([10]);
    h.observe(5);
    h.observe(15);
    h.reset();
    expect(h.count).toBe(0);
    expect(h.getBuckets().every((b) => b.count === 0)).toBe(true);
  });

  it("boundary values go in lower bucket", () => {
    const h = new Histogram([10, 20]);
    h.observe(10);
    const buckets = h.getBuckets();
    expect(buckets[0].count).toBe(1);
    expect(buckets[0].bound).toBe("<=10");
  });
});
