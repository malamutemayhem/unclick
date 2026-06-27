import { describe, it, expect } from "vitest";
import { HyperLogLog } from "../hyperloglog.js";

describe("HyperLogLog", () => {
  it("count returns 0 for empty set", () => {
    const hll = new HyperLogLog(10);
    expect(hll.count()).toBe(0);
  });

  it("count estimates cardinality", () => {
    const hll = new HyperLogLog(14);
    for (let i = 0; i < 1000; i++) {
      hll.add(`item-${i}`);
    }
    const estimate = hll.count();
    expect(estimate).toBeGreaterThan(800);
    expect(estimate).toBeLessThan(1200);
  });

  it("duplicate items do not increase count significantly", () => {
    const hll = new HyperLogLog(14);
    for (let i = 0; i < 100; i++) {
      hll.add("same-item");
    }
    expect(hll.count()).toBeLessThan(10);
  });

  it("merge combines two HLL sketches", () => {
    const a = new HyperLogLog(10);
    const b = new HyperLogLog(10);
    for (let i = 0; i < 500; i++) a.add(`a-${i}`);
    for (let i = 0; i < 500; i++) b.add(`b-${i}`);
    const merged = a.merge(b);
    const estimate = merged.count();
    expect(estimate).toBeGreaterThan(600);
    expect(estimate).toBeLessThan(1400);
  });

  it("clear resets the sketch", () => {
    const hll = new HyperLogLog(10);
    hll.add("test");
    hll.clear();
    expect(hll.count()).toBe(0);
  });

  it("precision returns configured value", () => {
    const hll = new HyperLogLog(12);
    expect(hll.precision()).toBe(12);
  });

  it("registerCount equals 2^precision", () => {
    const hll = new HyperLogLog(10);
    expect(hll.registerCount()).toBe(1024);
  });
});
