import { describe, it, expect } from "vitest";
import { Sparkline } from "../sparkline.js";

describe("Sparkline", () => {
  it("renders sparkline", () => {
    const chart = Sparkline.render([1, 5, 3, 7, 2, 8, 4]);
    expect(chart.length).toBe(7);
    expect(chart).toContain("█");
  });

  it("handles empty data", () => {
    expect(Sparkline.render([])).toBe("");
  });

  it("handles constant data", () => {
    const chart = Sparkline.render([5, 5, 5]);
    expect(chart.length).toBe(3);
  });

  it("renders with labels", () => {
    const result = Sparkline.renderWithLabels([1, 2, 3], "CPU");
    expect(result).toContain("CPU:");
    expect(result).toContain("(1-3)");
  });

  it("creates bar chart", () => {
    const bars = Sparkline.barChart([10, 5, 20]);
    expect(bars.length).toBe(3);
    expect(bars[2].length).toBeGreaterThan(bars[1].length);
  });

  it("handles zero values in bar chart", () => {
    const bars = Sparkline.barChart([0, 0, 0]);
    expect(bars).toEqual(["", "", ""]);
  });

  it("creates labeled bar chart", () => {
    const chart = Sparkline.labeledBarChart([
      { label: "A", value: 10 },
      { label: "B", value: 5 },
    ]);
    expect(chart.length).toBe(2);
    expect(chart[0]).toContain("A");
    expect(chart[0]).toContain("10");
  });

  it("detects upward trend", () => {
    expect(Sparkline.trend([1, 2, 3, 4, 5, 6, 7, 8])).toBe("up");
  });

  it("detects downward trend", () => {
    expect(Sparkline.trend([8, 7, 6, 5, 4, 3, 2, 1])).toBe("down");
  });

  it("detects flat trend", () => {
    expect(Sparkline.trend([5, 5, 5, 5, 5, 5])).toBe("flat");
  });

  it("returns unknown for insufficient data", () => {
    expect(Sparkline.trend([5])).toBe("unknown");
  });

  it("generates summary", () => {
    const s = Sparkline.summary([1, 5, 3, 7, 2]);
    expect(s.min).toBe(1);
    expect(s.max).toBe(7);
    expect(s.avg).toBeCloseTo(3.6);
    expect(s.chart.length).toBe(5);
    expect(s.trend).toBeDefined();
  });
});
