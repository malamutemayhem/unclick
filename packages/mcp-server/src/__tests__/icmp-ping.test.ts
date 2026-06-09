import { describe, it, expect } from "vitest";
import { PingSim } from "../icmp-ping.js";

describe("PingSim", () => {
  it("single ping returns result", () => {
    const sim = new PingSim("10.0.0.1", { baseRtt: 20, jitter: 0 }, 42);
    const result = sim.ping();
    expect(result.success).toBe(true);
    expect(result.target).toBe("10.0.0.1");
    expect(result.seq).toBe(1);
    expect(result.rtt).toBeGreaterThan(0);
  });

  it("run executes count pings", () => {
    const sim = new PingSim("10.0.0.1", { count: 5 }, 42);
    const results = sim.run();
    expect(results).toHaveLength(5);
  });

  it("sequence numbers increment", () => {
    const sim = new PingSim("10.0.0.1", {}, 42);
    const r1 = sim.ping();
    const r2 = sim.ping();
    expect(r2.seq).toBe(r1.seq + 1);
  });

  it("100% loss rate produces all failures", () => {
    const sim = new PingSim("10.0.0.1", { count: 3, lossRate: 1.0 }, 42);
    const results = sim.run();
    expect(results.every((r) => !r.success)).toBe(true);
    expect(results.every((r) => r.rtt === -1)).toBe(true);
  });

  it("stats reflect results", () => {
    const sim = new PingSim("10.0.0.1", { count: 4, baseRtt: 10, jitter: 0 }, 42);
    sim.run();
    const stats = sim.getStats();
    expect(stats.sent).toBe(4);
    expect(stats.received).toBe(4);
    expect(stats.lost).toBe(0);
    expect(stats.lossPercent).toBe(0);
    expect(stats.avgRtt).toBeGreaterThan(0);
  });

  it("stats handle all lost", () => {
    const sim = new PingSim("10.0.0.1", { count: 3, lossRate: 1.0 }, 42);
    sim.run();
    const stats = sim.getStats();
    expect(stats.lossPercent).toBe(100);
    expect(stats.avgRtt).toBe(0);
  });

  it("stats on empty", () => {
    const sim = new PingSim("10.0.0.1");
    const stats = sim.getStats();
    expect(stats.sent).toBe(0);
  });

  it("reset clears results", () => {
    const sim = new PingSim("10.0.0.1", { count: 3 }, 42);
    sim.run();
    sim.reset();
    expect(sim.getResults()).toHaveLength(0);
    expect(sim.getStats().sent).toBe(0);
  });

  it("getResults returns copies", () => {
    const sim = new PingSim("10.0.0.1", { count: 2 }, 42);
    sim.run();
    const results = sim.getResults();
    expect(results).toHaveLength(2);
  });

  it("deterministic with seed", () => {
    const sim1 = new PingSim("10.0.0.1", { count: 3 }, 123);
    const sim2 = new PingSim("10.0.0.1", { count: 3 }, 123);
    const r1 = sim1.run();
    const r2 = sim2.run();
    expect(r1.map((r) => r.rtt)).toEqual(r2.map((r) => r.rtt));
  });

  it("jitter affects rtt variance", () => {
    const sim = new PingSim("10.0.0.1", { count: 10, baseRtt: 50, jitter: 20 }, 42);
    const results = sim.run();
    const rtts = results.map((r) => r.rtt);
    const min = Math.min(...rtts);
    const max = Math.max(...rtts);
    expect(max - min).toBeGreaterThan(0);
  });
});
