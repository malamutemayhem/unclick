import { describe, it, expect } from "vitest";
import { splineInterpolate } from "./spline-tool.js";

describe("splineInterpolate", () => {
  it("builds cubic spline segments", async () => {
    const r = await splineInterpolate({
      points: [
        [0, 0],
        [1, 1],
        [2, 0],
        [3, 1],
      ],
    }) as any;
    expect(r.segment_count).toBe(3);
    expect(r.point_count).toBe(4);
    expect(r.segments.length).toBe(3);
  });

  it("evaluates at specific x values", async () => {
    const r = await splineInterpolate({
      points: [
        [0, 0],
        [1, 1],
        [2, 4],
      ],
      eval_at: [0, 1, 2, 0.5],
    }) as any;
    expect(r.evaluated.length).toBe(4);
    expect(r.evaluated[0].y).toBeCloseTo(0, 5);
    expect(r.evaluated[1].y).toBeCloseTo(1, 5);
    expect(r.evaluated[2].y).toBeCloseTo(4, 5);
  });

  it("evaluates a single x value", async () => {
    const r = await splineInterpolate({
      points: [
        [0, 0],
        [1, 1],
        [2, 0],
      ],
      eval_at: 1,
    }) as any;
    expect(r.evaluated[0].y).toBeCloseTo(1, 5);
  });

  it("rejects fewer than 3 points", async () => {
    await expect(
      splineInterpolate({ points: [[0, 0], [1, 1]] }),
    ).rejects.toThrow("at least 3");
  });

  it("rejects duplicate x values", async () => {
    await expect(
      splineInterpolate({
        points: [
          [0, 0],
          [0, 1],
          [1, 2],
        ],
      }),
    ).rejects.toThrow("distinct");
  });

  it("stamps meta", async () => {
    const r = await splineInterpolate({
      points: [
        [0, 0],
        [1, 1],
        [2, 0],
      ],
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
