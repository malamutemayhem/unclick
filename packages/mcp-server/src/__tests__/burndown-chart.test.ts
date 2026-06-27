import { describe, it, expect } from "vitest";
import { BurndownChart } from "../burndown-chart.js";

describe("BurndownChart", () => {
  it("generate creates entries for each day", () => {
    const entries = BurndownChart.generate(100, 10, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
    expect(entries.length).toBe(11);
    expect(entries[0].planned).toBe(100);
    expect(entries[10].remaining).toBe(0);
  });

  it("generate tracks actual vs planned", () => {
    const entries = BurndownChart.generate(100, 10, [5, 5, 5, 5, 5]);
    expect(entries[5].actual).toBe(75);
    expect(entries[5].planned).toBe(50);
  });

  it("render produces readable output", () => {
    const entries = BurndownChart.generate(50, 5, [10, 10, 10, 10, 10]);
    const output = BurndownChart.render(entries, 30);
    expect(output).toContain("Day");
    expect(output).toContain("Planned");
    expect(output).toContain("Actual");
  });

  it("status detects on-track sprint", () => {
    const entries = BurndownChart.generate(100, 10, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
    const stat = BurndownChart.status(entries);
    expect(stat.onTrack).toBe(true);
    expect(stat.deviation).toBeLessThanOrEqual(0);
  });

  it("status detects behind-schedule sprint", () => {
    const entries = BurndownChart.generate(100, 10, [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]);
    const stat = BurndownChart.status(entries);
    expect(stat.onTrack).toBe(false);
    expect(stat.deviation).toBeGreaterThan(0);
  });

  it("status calculates projected completion", () => {
    const entries = BurndownChart.generate(100, 10, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
    const stat = BurndownChart.status(entries);
    expect(stat.projectedCompletion).toBeLessThanOrEqual(10);
  });

  it("scope adjusts for added work", () => {
    const entries = BurndownChart.generate(100, 5, [20, 20, 20, 20, 20]);
    const scoped = BurndownChart.scope(entries, [0, 10, 0, 5, 0]);
    expect(scoped[2].planned).toBeGreaterThan(entries[2].planned);
  });

  it("idealLine produces linear decrease", () => {
    const ideal = BurndownChart.idealLine(100, 10);
    expect(ideal.length).toBe(11);
    expect(ideal[0]).toBe(100);
    expect(ideal[10]).toBe(0);
  });
});
