export type DataViz = "bar_chart" | "line_chart" | "scatter_plot" | "heatmap" | "treemap";

export function dimensionsSupported(d: DataViz): number {
  const m: Record<DataViz, number> = {
    bar_chart: 2, line_chart: 2, scatter_plot: 3, heatmap: 3, treemap: 2,
  };
  return m[d];
}

export function dataPointCapacity(d: DataViz): number {
  const m: Record<DataViz, number> = {
    bar_chart: 50, line_chart: 1000, scatter_plot: 5000, heatmap: 10000, treemap: 500,
  };
  return m[d];
}

export function readabilityScore(d: DataViz): number {
  const m: Record<DataViz, number> = {
    bar_chart: 10, line_chart: 9, scatter_plot: 6, heatmap: 5, treemap: 7,
  };
  return m[d];
}

export function trendDetection(d: DataViz): number {
  const m: Record<DataViz, number> = {
    bar_chart: 5, line_chart: 10, scatter_plot: 8, heatmap: 6, treemap: 3,
  };
  return m[d];
}

export function categoryComparison(d: DataViz): number {
  const m: Record<DataViz, number> = {
    bar_chart: 10, line_chart: 5, scatter_plot: 3, heatmap: 7, treemap: 9,
  };
  return m[d];
}

export function showsTimeSeries(d: DataViz): boolean {
  const m: Record<DataViz, boolean> = {
    bar_chart: false, line_chart: true, scatter_plot: false, heatmap: false, treemap: false,
  };
  return m[d];
}

export function showsHierarchy(d: DataViz): boolean {
  const m: Record<DataViz, boolean> = {
    bar_chart: false, line_chart: false, scatter_plot: false, heatmap: false, treemap: true,
  };
  return m[d];
}

export function bestDataType(d: DataViz): string {
  const m: Record<DataViz, string> = {
    bar_chart: "categorical", line_chart: "temporal", scatter_plot: "bivariate",
    heatmap: "matrix", treemap: "hierarchical",
  };
  return m[d];
}

export function interactivityPotential(d: DataViz): string {
  const m: Record<DataViz, string> = {
    bar_chart: "tooltip_drill", line_chart: "zoom_pan", scatter_plot: "brush_select",
    heatmap: "hover_detail", treemap: "click_expand",
  };
  return m[d];
}

export function dataVizTypes(): DataViz[] {
  return ["bar_chart", "line_chart", "scatter_plot", "heatmap", "treemap"];
}
