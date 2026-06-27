import { describe, it, expect } from "vitest";
import {
  dimensionsSupported, dataPointCapacity, readabilityScore,
  trendDetection, categoryComparison, showsTimeSeries,
  showsHierarchy, bestDataType, interactivityPotential, dataVizTypes,
} from "../data-viz-calc.js";

describe("dimensionsSupported", () => {
  it("heatmap supports most dimensions", () => {
    expect(dimensionsSupported("heatmap")).toBeGreaterThan(
      dimensionsSupported("bar_chart")
    );
  });
});

describe("dataPointCapacity", () => {
  it("heatmap highest capacity", () => {
    expect(dataPointCapacity("heatmap")).toBeGreaterThan(
      dataPointCapacity("bar_chart")
    );
  });
});

describe("readabilityScore", () => {
  it("bar chart most readable", () => {
    expect(readabilityScore("bar_chart")).toBeGreaterThan(
      readabilityScore("heatmap")
    );
  });
});

describe("trendDetection", () => {
  it("line chart best for trends", () => {
    expect(trendDetection("line_chart")).toBeGreaterThan(
      trendDetection("treemap")
    );
  });
});

describe("categoryComparison", () => {
  it("bar chart best for categories", () => {
    expect(categoryComparison("bar_chart")).toBeGreaterThan(
      categoryComparison("scatter_plot")
    );
  });
});

describe("showsTimeSeries", () => {
  it("line chart shows time series", () => {
    expect(showsTimeSeries("line_chart")).toBe(true);
  });
  it("bar chart does not", () => {
    expect(showsTimeSeries("bar_chart")).toBe(false);
  });
});

describe("showsHierarchy", () => {
  it("treemap shows hierarchy", () => {
    expect(showsHierarchy("treemap")).toBe(true);
  });
  it("scatter plot does not", () => {
    expect(showsHierarchy("scatter_plot")).toBe(false);
  });
});

describe("bestDataType", () => {
  it("scatter plot for bivariate data", () => {
    expect(bestDataType("scatter_plot")).toBe("bivariate");
  });
});

describe("interactivityPotential", () => {
  it("scatter plot uses brush select", () => {
    expect(interactivityPotential("scatter_plot")).toBe("brush_select");
  });
});

describe("dataVizTypes", () => {
  it("returns 5 types", () => {
    expect(dataVizTypes()).toHaveLength(5);
  });
});
