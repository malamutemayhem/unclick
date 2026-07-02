import { describe, it, expect } from "vitest";
import { convexHull } from "./convexhull-tool.js";

describe("convexHull", () => {
  it("computes hull of a square", async () => {
    const r = await convexHull({
      points: [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        [0.5, 0.5],
      ],
    }) as any;
    expect(r.hull_size).toBe(4);
    expect(r.area).toBe(1);
  });

  it("computes hull of a triangle", async () => {
    const r = await convexHull({
      points: [
        [0, 0],
        [4, 0],
        [2, 3],
      ],
    }) as any;
    expect(r.hull_size).toBe(3);
    expect(r.area).toBe(6);
  });

  it("excludes interior points", async () => {
    const r = await convexHull({
      points: [
        [0, 0],
        [10, 0],
        [10, 10],
        [0, 10],
        [5, 5],
        [3, 3],
        [7, 2],
      ],
    }) as any;
    expect(r.hull_size).toBe(4);
    expect(r.input_size).toBe(7);
  });

  it("rejects fewer than 3 points", async () => {
    await expect(
      convexHull({ points: [[0, 0], [1, 1]] }),
    ).rejects.toThrow("at least 3");
  });

  it("stamps meta", async () => {
    const r = await convexHull({
      points: [
        [0, 0],
        [1, 0],
        [0, 1],
      ],
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
