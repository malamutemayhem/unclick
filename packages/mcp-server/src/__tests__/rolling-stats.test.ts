import { describe, it, expect } from "vitest";
import { RollingStats } from "../rolling-stats.js";

describe("RollingStats", () => {
  it("returns 0 for empty stats", () => {
    const s = new RollingStats();
    expect(s.mean()).toBe(0);
    expect(s.min()).toBe(0);
    expect(s.max()).toBe(0);
    expect(s.percentile(50)).toBe(0);
    expect(s.count).toBe(0);
  });

  it("computes mean", () => {
    const s = new RollingStats();
    s.push(10);
    s.push(20);
    s.push(30);
    expect(s.mean()).toBe(20);
  });

  it("computes min and max", () => {
    const s = new RollingStats();
    s.push(5);
    s.push(100);
    s.push(42);
    expect(s.min()).toBe(5);
    expect(s.max()).toBe(100);
  });

  it("computes variance and stdDev", () => {
    const s = new RollingStats();
    s.push(2);
    s.push(4);
    s.push(4);
    s.push(4);
    s.push(5);
    s.push(5);
    s.push(7);
    s.push(9);
    expect(s.variance()).toBeCloseTo(4.571, 2);
    expect(s.stdDev()).toBeCloseTo(2.138, 2);
  });

  it("returns 0 variance for fewer than 2 values", () => {
    const s = new RollingStats();
    s.push(5);
    expect(s.variance()).toBe(0);
    expect(s.stdDev()).toBe(0);
  });

  it("computes percentiles", () => {
    const s = new RollingStats();
    for (let i = 1; i <= 100; i++) s.push(i);
    expect(s.percentile(50)).toBe(50);
    expect(s.percentile(95)).toBe(95);
    expect(s.percentile(99)).toBe(99);
  });

  it("evicts oldest values when maxSize exceeded", () => {
    const s = new RollingStats(3);
    s.push(1);
    s.push(2);
    s.push(3);
    s.push(100);
    expect(s.count).toBe(3);
    expect(s.min()).toBe(2);
    expect(s.mean()).toBe(35);
  });

  it("snapshot returns all stats", () => {
    const s = new RollingStats();
    s.push(10);
    s.push(20);
    s.push(30);
    const snap = s.snapshot();
    expect(snap.mean).toBe(20);
    expect(snap.min).toBe(10);
    expect(snap.max).toBe(30);
    expect(snap.count).toBe(3);
    expect(snap).toHaveProperty("p50");
    expect(snap).toHaveProperty("p95");
    expect(snap).toHaveProperty("p99");
    expect(snap).toHaveProperty("stdDev");
  });

  it("reset clears all values", () => {
    const s = new RollingStats();
    s.push(1);
    s.push(2);
    s.reset();
    expect(s.count).toBe(0);
    expect(s.mean()).toBe(0);
  });
});
