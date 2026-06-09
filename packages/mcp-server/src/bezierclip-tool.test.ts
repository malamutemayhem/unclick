import { describe, it, expect } from "vitest";
import { bezierClip } from "./bezierclip-tool.js";

describe("bezierClip", () => {
  it("clips a linear Bezier (line) from t=0 to t=1 and returns original endpoints", async () => {
    const r = (await bezierClip({
      control_points: [[0, 0], [10, 10]],
      t_start: 0.0,
      t_end: 1.0,
    })) as any;
    expect(r.start_point[0]).toBeCloseTo(0, 5);
    expect(r.end_point[0]).toBeCloseTo(10, 5);
    expect(r.degree).toBe(1);
  });

  it("clips a quadratic Bezier sub-curve with correct endpoints", async () => {
    const r = (await bezierClip({
      control_points: [[0, 0], [5, 10], [10, 0]],
      t_start: 0.25,
      t_end: 0.75,
    })) as any;
    expect(r.control_point_count).toBe(3);
    // Evaluated start should match B(0.25) = (2.5, 3.75)
    expect(r.start_point[0]).toBeCloseTo(2.5, 5);
    expect(r.start_point[1]).toBeCloseTo(3.75, 5);
  });

  it("clips a cubic Bezier and returns 4 control points", async () => {
    const r = (await bezierClip({
      control_points: [[0, 0], [1, 3], [3, 3], [4, 0]],
      t_start: 0.2,
      t_end: 0.8,
    })) as any;
    expect(r.control_point_count).toBe(4);
    expect(r.degree).toBe(3);
  });

  it("rejects t_start >= t_end", async () => {
    await expect(
      bezierClip({
        control_points: [[0, 0], [1, 1]],
        t_start: 0.5,
        t_end: 0.5,
      }),
    ).rejects.toThrow("t_start must be less than t_end");
  });

  it("stamps meta with local-computation source", async () => {
    const r = (await bezierClip({
      control_points: [[0, 0], [5, 10], [10, 0]],
      t_start: 0.0,
      t_end: 1.0,
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
