import { describe, it, expect } from "vitest";
import { HealthChecker } from "../health-checker.js";

describe("HealthChecker", () => {
  it("reports healthy when all pass", async () => {
    const hc = new HealthChecker();
    hc.register("db", async () => ({ name: "db", status: "healthy", timestamp: Date.now() }));
    hc.register("cache", async () => ({ name: "cache", status: "healthy", timestamp: Date.now() }));
    const report = await hc.runAll();
    expect(report.status).toBe("healthy");
    expect(report.checks.length).toBe(2);
  });

  it("reports unhealthy when one fails", async () => {
    const hc = new HealthChecker();
    hc.register("db", async () => ({ name: "db", status: "healthy", timestamp: Date.now() }));
    hc.register("cache", async () => ({ name: "cache", status: "unhealthy", timestamp: Date.now() }));
    const report = await hc.runAll();
    expect(report.status).toBe("unhealthy");
  });

  it("catches thrown errors as unhealthy", async () => {
    const hc = new HealthChecker();
    hc.register("bad", async () => { throw new Error("connection failed"); });
    const report = await hc.runAll();
    expect(report.status).toBe("unhealthy");
    expect(report.checks[0].message).toBe("connection failed");
  });

  it("reports degraded status", async () => {
    const hc = new HealthChecker();
    hc.register("a", async () => ({ name: "a", status: "healthy", timestamp: Date.now() }));
    hc.register("b", async () => ({ name: "b", status: "degraded", timestamp: Date.now() }));
    const report = await hc.runAll();
    expect(report.status).toBe("degraded");
  });

  it("tracks uptime", async () => {
    const hc = new HealthChecker();
    hc.register("a", async () => ({ name: "a", status: "healthy", timestamp: Date.now() }));
    const report = await hc.runAll();
    expect(report.uptime).toBeGreaterThanOrEqual(0);
  });

  it("measures latency", async () => {
    const hc = new HealthChecker();
    hc.register("slow", async () => {
      await new Promise((r) => setTimeout(r, 10));
      return { name: "slow", status: "healthy", timestamp: Date.now() };
    });
    const report = await hc.runAll();
    expect(report.checks[0].latencyMs).toBeGreaterThanOrEqual(5);
  });

  it("unregister removes check", async () => {
    const hc = new HealthChecker();
    hc.register("a", async () => ({ name: "a", status: "healthy", timestamp: Date.now() }));
    hc.unregister("a");
    expect(hc.registeredChecks).toEqual([]);
  });
});
