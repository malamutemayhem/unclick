import { describe, it, expect } from "vitest";
import { bezierCurve } from "./bezier-tool.js";

describe("bezierCurve", () => {
  it("computes linear Bezier (straight line)", async () => {
    const r = await bezierCurve({
      control_points: [[0, 0], [10, 10]],
      steps: 10,
    }) as any;
    expect(r.degree).toBe(1);
    expect(r.curve[0]).toEqual([0, 0]);
    expect(r.curve[10]).toEqual([10, 10]);
    expect(r.curve[5][0]).toBeCloseTo(5, 4);
  });

  it("computes quadratic Bezier", async () => {
    const r = await bezierCurve({
      control_points: [[0, 0], [5, 10], [10, 0]],
      steps: 2,
    }) as any;
    expect(r.degree).toBe(2);
    expect(r.curve[1][0]).toBeCloseTo(5, 4);
    expect(r.curve[1][1]).toBeCloseTo(5, 4);
  });

  it("evaluates at specific t values", async () => {
    const r = await bezierCurve({
      control_points: [[0, 0], [10, 0]],
      eval_at: [0, 0.5, 1],
    }) as any;
    expect(r.evaluated[0].x).toBe(0);
    expect(r.evaluated[1].x).toBe(5);
    expect(r.evaluated[2].x).toBe(10);
  });

  it("computes arc length", async () => {
    const r = await bezierCurve({
      control_points: [[0, 0], [10, 0]],
      steps: 100,
    }) as any;
    expect(r.arc_length).toBeCloseTo(10, 4);
  });

  it("rejects fewer than 2 points", async () => {
    await expect(
      bezierCurve({ control_points: [[0, 0]] }),
    ).rejects.toThrow("at least 2");
  });

  it("stamps meta", async () => {
    const r = await bezierCurve({
      control_points: [[0, 0], [1, 1]],
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
