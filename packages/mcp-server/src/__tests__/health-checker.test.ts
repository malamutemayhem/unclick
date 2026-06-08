import { describe, it, expect } from "vitest";
import { HealthChecker } from "../health-checker.js";

describe("HealthChecker", () => {
  it("considers unknown endpoints healthy", () => {
    const hc = new HealthChecker();
    expect(hc.isHealthy("unknown")).toBe(true);
  });

  it("stays healthy with all successes", () => {
    const hc = new HealthChecker();
    hc.recordSuccess("api");
    hc.recordSuccess("api");
    hc.recordSuccess("api");
    expect(hc.isHealthy("api")).toBe(true);
  });

  it("becomes unhealthy when failures dominate", () => {
    const hc = new HealthChecker({ windowSize: 4, healthyThreshold: 0.5 });
    hc.recordSuccess("api");
    hc.recordFailure("api");
    hc.recordFailure("api");
    hc.recordFailure("api");
    expect(hc.isHealthy("api")).toBe(false);
  });

  it("recovers when successes return", () => {
    const hc = new HealthChecker({ windowSize: 4, healthyThreshold: 0.5 });
    hc.recordFailure("api");
    hc.recordFailure("api");
    hc.recordFailure("api");
    hc.recordFailure("api");
    expect(hc.isHealthy("api")).toBe(false);

    hc.recordSuccess("api");
    hc.recordSuccess("api");
    hc.recordSuccess("api");
    expect(hc.isHealthy("api")).toBe(true);
  });

  it("getSnapshot returns full stats", () => {
    const hc = new HealthChecker();
    hc.recordSuccess("api");
    hc.recordFailure("api");
    const snap = hc.getSnapshot("api");
    expect(snap.endpoint).toBe("api");
    expect(snap.totalCalls).toBe(2);
    expect(snap.successRate).toBe(0.5);
    expect(snap.lastSuccess).toBeGreaterThan(0);
    expect(snap.lastFailure).toBeGreaterThan(0);
  });

  it("getDegraded lists only unhealthy endpoints", () => {
    const hc = new HealthChecker({ windowSize: 2, healthyThreshold: 0.5 });
    hc.recordSuccess("good");
    hc.recordFailure("bad");
    hc.recordFailure("bad");
    const degraded = hc.getDegraded();
    expect(degraded).toHaveLength(1);
    expect(degraded[0].endpoint).toBe("bad");
  });

  it("tracks multiple endpoints independently", () => {
    const hc = new HealthChecker();
    hc.recordSuccess("a");
    hc.recordFailure("b");
    expect(hc.getAllSnapshots()).toHaveLength(2);
  });

  it("reset clears specific endpoint", () => {
    const hc = new HealthChecker();
    hc.recordFailure("api");
    hc.reset("api");
    expect(hc.getSnapshot("api").totalCalls).toBe(0);
  });

  it("reset with no arg clears everything", () => {
    const hc = new HealthChecker();
    hc.recordSuccess("a");
    hc.recordSuccess("b");
    hc.reset();
    expect(hc.getAllSnapshots()).toHaveLength(0);
  });
});
