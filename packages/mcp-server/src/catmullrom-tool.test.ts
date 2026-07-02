import { describe, it, expect } from "vitest";
import { catmullRom } from "./catmullrom-tool.js";

describe("catmullRom", () => {
  const pts: [number, number][] = [
    [0, 0],
    [1, 2],
    [3, 3],
    [4, 0],
  ];

  it("passes through the inner control points at segment boundaries", async () => {
    // t=0 maps to p1, t=1 maps to p2 for a 4-point (single-segment) spline
    const r = (await catmullRom({ points: pts, t_values: [0, 1] })) as any;
    expect(r.evaluated[0].x).toBeCloseTo(1, 4);
    expect(r.evaluated[0].y).toBeCloseTo(2, 4);
    expect(r.evaluated[1].x).toBeCloseTo(3, 4);
    expect(r.evaluated[1].y).toBeCloseTo(3, 4);
  });

  it("returns correct control_point_count and alpha", async () => {
    const r = (await catmullRom({ points: pts, t_values: [0.5] })) as any;
    expect(r.control_point_count).toBe(4);
    expect(r.alpha).toBe(0.5);
  });

  it("evaluates at the midpoint producing a value between endpoints", async () => {
    const r = (await catmullRom({ points: pts, t_values: [0.5] })) as any;
    const mid = r.evaluated[0];
    // The midpoint x should be between 1 and 3
    expect(mid.x).toBeGreaterThan(1);
    expect(mid.x).toBeLessThan(3);
  });

  it("rejects fewer than 4 points", async () => {
    await expect(
      catmullRom({ points: [[0, 0], [1, 1], [2, 2]], t_values: [0.5] }),
    ).rejects.toThrow("at least 4");
  });

  it("stamps meta with local-computation source", async () => {
    const r = (await catmullRom({ points: pts, t_values: [0.5] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
