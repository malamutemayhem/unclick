import { describe, it, expect } from "vitest";
import { DecisionBoundary } from "../decision-boundary.js";

describe("DecisionBoundary", () => {
  it("linear generates boundary points", () => {
    const points = DecisionBoundary.linear([1, 1], -3, [0, 5], 10);
    expect(points.length).toBeGreaterThan(0);
    for (const p of points) {
      expect(p.x + p.y).toBeCloseTo(3, 1);
    }
  });

  it("linear returns empty for zero y-weight", () => {
    const points = DecisionBoundary.linear([1, 0], -3, [0, 5]);
    expect(points.length).toBe(0);
  });

  it("classify maps region to labels", () => {
    const points = DecisionBoundary.classify(
      (p) => p[0] + p[1] > 0 ? "pos" : "neg",
      [-1, 1],
      [-1, 1],
      5,
    );
    expect(points.length).toBeGreaterThan(0);
    const labels = new Set(points.map(p => p.label));
    expect(labels.has("pos")).toBe(true);
    expect(labels.has("neg")).toBe(true);
  });

  it("margin computes distance to boundary", () => {
    const m = DecisionBoundary.margin([1, 0], 0, [3, 0]);
    expect(m).toBe(3);
  });

  it("margin is zero on boundary", () => {
    const m = DecisionBoundary.margin([1, 0], -2, [2, 0]);
    expect(m).toBe(0);
  });

  it("separable detects linearly separable data", () => {
    const result = DecisionBoundary.separable(
      [[3, 3], [4, 4]],
      [[-1, -1], [-2, -2]],
      [1, 1],
      0,
    );
    expect(result).toBe(true);
  });

  it("separable detects non-separable data", () => {
    const result = DecisionBoundary.separable(
      [[1, 1], [-1, -1]],
      [[2, 2], [-2, -2]],
      [1, 0],
      0,
    );
    expect(result).toBe(false);
  });

  it("voronoi assigns nearest centroid labels", () => {
    const points = DecisionBoundary.voronoi(
      [
        { point: [0, 0], label: "A" },
        { point: [10, 10], label: "B" },
      ],
      [-1, 11],
      [-1, 11],
      5,
    );
    expect(points.length).toBeGreaterThan(0);
    const near0 = points.find(p => p.x <= 1 && p.y <= 1);
    expect(near0?.label).toBe("A");
  });

  it("render produces text grid", () => {
    const points = DecisionBoundary.classify(
      (p) => p[0] > 0 ? "A" : "B",
      [-1, 1],
      [-1, 1],
      5,
    );
    const text = DecisionBoundary.render(points, 10, 5);
    expect(text).toContain("A");
    expect(text).toContain("B");
  });
});
