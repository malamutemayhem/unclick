import { describe, it, expect } from "vitest";
import { HistogramText } from "../histogram-text.js";

describe("HistogramText", () => {
  const data = [1, 2, 2, 3, 3, 3, 4, 4, 5, 10];

  it("binData creates correct number of bins", () => {
    const bins = HistogramText.binData(data, 5);
    expect(bins.length).toBe(5);
  });

  it("binData counts are correct", () => {
    const bins = HistogramText.binData(data, 5);
    const totalCount = bins.reduce((s, b) => s + b.count, 0);
    expect(totalCount).toBe(data.length);
  });

  it("binData returns empty for empty input", () => {
    expect(HistogramText.binData([])).toEqual([]);
  });

  it("binData handles single value", () => {
    const bins = HistogramText.binData([5, 5, 5], 3);
    expect(bins.length).toBe(3);
  });

  it("render produces horizontal histogram", () => {
    const output = HistogramText.render(data, 5, 20);
    expect(output).toContain("|");
    const lines = output.split("\n");
    expect(lines.length).toBe(5);
  });

  it("render returns empty string for empty data", () => {
    expect(HistogramText.render([])).toBe("");
  });

  it("renderVertical produces vertical histogram", () => {
    const output = HistogramText.renderVertical(data, 5, 10);
    const lines = output.split("\n");
    expect(lines.length).toBe(11);
  });

  it("stats computes correct statistics", () => {
    const s = HistogramText.stats(data);
    expect(s.count).toBe(10);
    expect(s.min).toBe(1);
    expect(s.max).toBe(10);
    expect(s.mean).toBeGreaterThan(0);
    expect(s.stdDev).toBeGreaterThan(0);
  });

  it("stats handles empty data", () => {
    const s = HistogramText.stats([]);
    expect(s.count).toBe(0);
    expect(s.mean).toBe(0);
  });

  it("percentile calculates correctly", () => {
    const p50 = HistogramText.percentile(data, 50);
    expect(p50).toBeGreaterThanOrEqual(3);
    expect(p50).toBeLessThanOrEqual(4);
  });

  it("quartiles returns q1 q2 q3", () => {
    const q = HistogramText.quartiles(data);
    expect(q.q1).toBeLessThan(q.q2);
    expect(q.q2).toBeLessThanOrEqual(q.q3);
  });

  it("boxPlot renders a box plot string", () => {
    const plot = HistogramText.boxPlot(data, 40);
    expect(plot.length).toBeGreaterThan(0);
    expect(plot).toContain("─");
  });

  it("boxPlot handles uniform data", () => {
    const plot = HistogramText.boxPlot([5, 5, 5], 20);
    expect(plot).toContain("─");
  });
});
