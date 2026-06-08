import { describe, it, expect } from "vitest";
import { ProgressBar } from "../progress-bar-text.js";

describe("ProgressBar", () => {
  it("renders progress bar", () => {
    const bar = new ProgressBar(100, { width: 10, showPercent: true, showFraction: false });
    bar.update(50);
    const rendered = bar.render();
    expect(rendered).toContain("#####");
    expect(rendered).toContain("50%");
  });

  it("renders complete bar", () => {
    const bar = new ProgressBar(10, { width: 10 });
    bar.update(10);
    expect(bar.render()).toContain("100%");
    expect(bar.isComplete).toBe(true);
  });

  it("renders with fraction", () => {
    const bar = new ProgressBar(100, { width: 5, showFraction: true });
    bar.update(25);
    expect(bar.render()).toContain("25/100");
  });

  it("increment updates progress", () => {
    const bar = new ProgressBar(10);
    bar.increment(3);
    bar.increment(2);
    expect(bar.progress).toBeCloseTo(0.5);
  });

  it("static bar helper", () => {
    const result = ProgressBar.bar(5, 10, 10);
    expect(result).toContain("50%");
  });

  it("spinner cycles frames", () => {
    expect(ProgressBar.spinner(0)).toBe("|");
    expect(ProgressBar.spinner(1)).toBe("/");
    expect(ProgressBar.spinner(4)).toBe("|");
  });

  it("multiBar renders multiple bars", () => {
    const result = ProgressBar.multiBar([
      { label: "Task A", current: 5, total: 10 },
      { label: "Task B", current: 10, total: 10 },
    ]);
    expect(result).toContain("Task A");
    expect(result).toContain("Task B");
    expect(result).toContain("100%");
  });

  it("eta returns estimate", () => {
    const bar = new ProgressBar(100);
    expect(bar.eta).toBe(Infinity);
  });
});
