import { describe, it, expect } from "vitest";
import { ProgressBar } from "../progress-bar.js";

describe("ProgressBar", () => {
  it("renders progress bar", () => {
    const bar = ProgressBar.render(50, 100, 20);
    expect(bar).toContain("50%");
    expect(bar).toContain("█");
    expect(bar).toContain("░");
  });

  it("renders 0%", () => {
    const bar = ProgressBar.render(0, 100, 10);
    expect(bar).toContain("0%");
  });

  it("renders 100%", () => {
    const bar = ProgressBar.render(100, 100, 10);
    expect(bar).toContain("100%");
  });

  it("handles zero total", () => {
    const bar = ProgressBar.render(0, 0, 10);
    expect(bar).toContain("0%");
  });

  it("supports hash style", () => {
    const bar = ProgressBar.render(5, 10, 10, ProgressBar.HASH);
    expect(bar).toContain("#");
    expect(bar).toContain("[");
    expect(bar).toContain("]");
  });

  it("supports arrow style", () => {
    const bar = ProgressBar.render(5, 10, 10, ProgressBar.ARROW);
    expect(bar).toContain("=");
  });

  it("renders with label", () => {
    const bar = ProgressBar.renderWithLabel("Download", 50, 100, 10);
    expect(bar).toContain("Download:");
  });

  it("renders multi-bar", () => {
    const result = ProgressBar.multiBar([
      { label: "File 1", current: 50, total: 100 },
      { label: "File 2", current: 25, total: 100 },
    ], 10);
    const lines = result.split("\n");
    expect(lines.length).toBe(2);
  });

  it("cycles spinner frames", () => {
    expect(ProgressBar.spinner(0)).toBe("|");
    expect(ProgressBar.spinner(1)).toBe("/");
    expect(ProgressBar.spinner(4)).toBe("|");
  });

  it("cycles dot patterns", () => {
    expect(ProgressBar.dots(0)).toBe("   ");
    expect(ProgressBar.dots(3)).toBe("...");
  });

  it("calculates ETA", () => {
    const eta = ProgressBar.eta(50, 100, 5000);
    expect(eta).toContain("s");
  });

  it("returns calculating for zero progress", () => {
    expect(ProgressBar.eta(0, 100, 1000)).toBe("calculating...");
  });

  it("calculates throughput", () => {
    const tp = ProgressBar.throughput(100, 2000);
    expect(tp).toContain("items/s");
  });

  it("formats percentage", () => {
    expect(ProgressBar.percentage(1, 3, 1)).toBe("33.3%");
    expect(ProgressBar.percentage(0, 0)).toBe("0%");
  });

  it("formats fraction", () => {
    expect(ProgressBar.fraction(5, 10)).toBe("5/10");
  });
});
