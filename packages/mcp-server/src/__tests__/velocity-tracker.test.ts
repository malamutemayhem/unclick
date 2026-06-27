import { describe, it, expect } from "vitest";
import { VelocityTracker } from "../velocity-tracker.js";

describe("VelocityTracker", () => {
  function createTracker(): VelocityTracker {
    const vt = new VelocityTracker();
    vt.addSprint({ name: "S1", committed: 30, completed: 25, days: 10 });
    vt.addSprint({ name: "S2", committed: 30, completed: 28, days: 10 });
    vt.addSprint({ name: "S3", committed: 35, completed: 30, days: 10 });
    vt.addSprint({ name: "S4", committed: 32, completed: 32, days: 10 });
    return vt;
  }

  it("getVelocity returns average completed", () => {
    const vt = createTracker();
    expect(vt.getVelocity()).toBeCloseTo(28.75, 1);
  });

  it("getStats provides comprehensive stats", () => {
    const vt = createTracker();
    const stats = vt.getStats();
    expect(stats.average).toBeGreaterThan(0);
    expect(stats.median).toBeGreaterThan(0);
    expect(stats.stdDev).toBeGreaterThanOrEqual(0);
    expect(stats.reliability).toBeGreaterThan(0);
  });

  it("getStats detects improving trend", () => {
    const vt = new VelocityTracker();
    vt.addSprint({ name: "S1", committed: 20, completed: 15, days: 10 });
    vt.addSprint({ name: "S2", committed: 20, completed: 16, days: 10 });
    vt.addSprint({ name: "S3", committed: 20, completed: 17, days: 10 });
    vt.addSprint({ name: "S4", committed: 25, completed: 22, days: 10 });
    vt.addSprint({ name: "S5", committed: 25, completed: 24, days: 10 });
    vt.addSprint({ name: "S6", committed: 30, completed: 28, days: 10 });
    const stats = vt.getStats();
    expect(stats.trend).toBe("improving");
  });

  it("forecast estimates sprints needed", () => {
    const vt = createTracker();
    const f = vt.forecast(100);
    expect(f.sprints).toBeGreaterThan(0);
    expect(["high", "medium", "low"]).toContain(f.confidence);
  });

  it("commitmentAccuracy shows per-sprint accuracy", () => {
    const vt = createTracker();
    const acc = vt.commitmentAccuracy();
    expect(acc.length).toBe(4);
    expect(acc[3].accuracy).toBe(100);
  });

  it("throughput calculates points per day", () => {
    const vt = createTracker();
    expect(vt.throughput()).toBeGreaterThan(0);
  });

  it("handles empty tracker", () => {
    const vt = new VelocityTracker();
    expect(vt.getVelocity()).toBe(0);
    expect(vt.sprintCount()).toBe(0);
  });
});
