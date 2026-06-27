import { describe, it, expect } from "vitest";
import {
  lineChart, barChart, histogram, sparkline, scatterPlot,
} from "../ascii-chart.js";

describe("lineChart", () => {
  it("generates line chart", () => {
    const result = lineChart([1, 3, 2, 5, 4]);
    expect(result).toContain("*");
    expect(result).toContain("|");
  });

  it("handles empty data", () => {
    expect(lineChart([])).toBe("");
  });

  it("includes title when provided", () => {
    const result = lineChart([1, 2, 3], { title: "My Chart" });
    expect(result).toContain("My Chart");
  });
});

describe("barChart", () => {
  it("generates bar chart", () => {
    const result = barChart(["A", "B", "C"], [10, 20, 15]);
    expect(result).toContain("#");
    expect(result).toContain("A");
    expect(result).toContain("B");
  });

  it("handles empty data", () => {
    expect(barChart([], [])).toBe("");
  });

  it("shows values", () => {
    const result = barChart(["X"], [42]);
    expect(result).toContain("42");
  });
});

describe("histogram", () => {
  it("groups data into bins", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = histogram(data, 5);
    expect(result).toContain("#");
  });

  it("handles empty data", () => {
    expect(histogram([])).toBe("");
  });
});

describe("sparkline", () => {
  it("generates sparkline characters", () => {
    const result = sparkline([1, 5, 3, 8, 2]);
    expect(result.length).toBe(5);
  });

  it("handles empty data", () => {
    expect(sparkline([])).toBe("");
  });

  it("uses full range of block chars", () => {
    const result = sparkline([0, 100]);
    expect(result[0]).not.toBe(result[1]);
  });
});

describe("scatterPlot", () => {
  it("generates scatter plot", () => {
    const result = scatterPlot([1, 2, 3], [1, 2, 3]);
    expect(result).toContain("*");
    expect(result).toContain("|");
    expect(result).toContain("+");
  });

  it("handles empty data", () => {
    expect(scatterPlot([], [])).toBe("");
  });

  it("includes title", () => {
    const result = scatterPlot([1], [1], { title: "Scatter" });
    expect(result).toContain("Scatter");
  });
});
