import { describe, it, expect } from "vitest";
import { HealthChecker } from "../health-check.js";

describe("HealthChecker", () => {
  it("register and check healthy", async () => {
    const hc = new HealthChecker();
    hc.register("db", () => ({ status: "healthy" }));
    const result = await hc.check("db");
    expect(result.status).toBe("healthy");
    expect(result.latencyMs).toBeGreaterThanOrEqual(0);
  });

  it("handles check errors", async () => {
    const hc = new HealthChecker();
    hc.register("bad", () => { throw new Error("down"); });
    const result = await hc.check("bad");
    expect(result.status).toBe("unhealthy");
    expect(result.message).toBe("down");
  });

  it("handles async checks", async () => {
    const hc = new HealthChecker();
    hc.register("api", async () => ({ status: "healthy", message: "200 OK" }));
    const result = await hc.check("api");
    expect(result.status).toBe("healthy");
  });

  it("checkAll aggregates status", async () => {
    const hc = new HealthChecker();
    hc.register("a", () => ({ status: "healthy" }));
    hc.register("b", () => ({ status: "healthy" }));
    const agg = await hc.checkAll();
    expect(agg.status).toBe("healthy");
    expect(agg.checks.length).toBe(2);
  });

  it("aggregates as unhealthy if any unhealthy", async () => {
    const hc = new HealthChecker();
    hc.register("ok", () => ({ status: "healthy" }));
    hc.register("bad", () => ({ status: "unhealthy" }));
    const agg = await hc.checkAll();
    expect(agg.status).toBe("unhealthy");
  });

  it("aggregates as degraded for mixed", async () => {
    const hc = new HealthChecker();
    hc.register("ok", () => ({ status: "healthy" }));
    hc.register("slow", () => ({ status: "degraded" }));
    const agg = await hc.checkAll();
    expect(agg.status).toBe("degraded");
  });

  it("getLastResult returns cached result", async () => {
    const hc = new HealthChecker();
    hc.register("x", () => ({ status: "healthy" }));
    await hc.check("x");
    expect(hc.getLastResult("x")?.status).toBe("healthy");
  });

  it("unregister removes check", () => {
    const hc = new HealthChecker();
    hc.register("x", () => ({ status: "healthy" }));
    expect(hc.unregister("x")).toBe(true);
    expect(hc.checkCount).toBe(0);
  });

  it("throws for unknown check", async () => {
    const hc = new HealthChecker();
    await expect(hc.check("nope")).rejects.toThrow("Unknown check");
  });

  it("clear empties everything", () => {
    const hc = new HealthChecker();
    hc.register("x", () => ({ status: "healthy" }));
    hc.clear();
    expect(hc.checkCount).toBe(0);
  });
});
