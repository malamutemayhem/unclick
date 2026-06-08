import { describe, it, expect } from "vitest";
import { FunnelAnalysis } from "../funnel-analysis.js";

describe("FunnelAnalysis", () => {
  const steps = [
    { name: "Visit", count: 1000 },
    { name: "Signup", count: 400 },
    { name: "Activate", count: 200 },
    { name: "Purchase", count: 50 },
  ];

  it("analyze computes rates and dropoff", () => {
    const result = FunnelAnalysis.analyze(steps);
    expect(result.length).toBe(4);
    expect(result[0].rate).toBe(100);
    expect(result[1].rate).toBe(40);
    expect(result[1].dropoff).toBe(600);
    expect(result[1].dropoffRate).toBe(60);
  });

  it("conversionRate returns overall rate", () => {
    const rate = FunnelAnalysis.conversionRate(steps);
    expect(rate).toBe(5);
  });

  it("bottleneck identifies worst step", () => {
    const worst = FunnelAnalysis.bottleneck(steps);
    expect(worst).not.toBeNull();
    expect(worst!.name).toBe("Purchase");
  });

  it("compare shows differences between funnels", () => {
    const stepsB = [
      { name: "Visit", count: 1000 },
      { name: "Signup", count: 500 },
      { name: "Activate", count: 300 },
      { name: "Purchase", count: 100 },
    ];
    const comparison = FunnelAnalysis.compare(steps, stepsB);
    expect(comparison.length).toBe(4);
    expect(comparison[1].rateB).toBeGreaterThan(comparison[1].rateA);
  });

  it("render produces readable output", () => {
    const output = FunnelAnalysis.render(steps, 30);
    expect(output).toContain("Visit");
    expect(output).toContain("Purchase");
    expect(output).toContain("%");
  });

  it("velocity finds slowest step", () => {
    const timedSteps = [
      { name: "Visit", count: 1000, avgTime: 0 },
      { name: "Signup", count: 400, avgTime: 120 },
      { name: "Activate", count: 200, avgTime: 300 },
    ];
    const vel = FunnelAnalysis.velocity(timedSteps);
    expect(vel.slowestStep).toBe("Activate");
    expect(vel.totalTime).toBe(420);
  });

  it("forecast computes needed numbers", () => {
    const needed = FunnelAnalysis.forecast(steps, 100);
    expect(needed.length).toBe(4);
    expect(needed[0].needed).toBeGreaterThan(steps[0].count);
    expect(needed[3].needed).toBe(100);
  });

  it("handles empty steps", () => {
    expect(FunnelAnalysis.analyze([])).toEqual([]);
    expect(FunnelAnalysis.conversionRate([])).toBe(0);
    expect(FunnelAnalysis.bottleneck([])).toBeNull();
  });
});
