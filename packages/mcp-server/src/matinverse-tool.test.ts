import { describe, it, expect } from "vitest";
import { matrixInverse } from "./matinverse-tool.js";

describe("matrixInverse", () => {
  it("inverts 2x2 identity", async () => {
    const r = await matrixInverse({
      matrix: [[1, 0], [0, 1]],
    }) as any;
    expect(r.inverse).toEqual([[1, 0], [0, 1]]);
    expect(r.determinant).toBe(1);
  });

  it("inverts 2x2 matrix", async () => {
    const r = await matrixInverse({
      matrix: [[2, 1], [7, 4]],
    }) as any;
    expect(r.inverse[0][0]).toBeCloseTo(4, 6);
    expect(r.inverse[0][1]).toBeCloseTo(-1, 6);
    expect(r.inverse[1][0]).toBeCloseTo(-7, 6);
    expect(r.inverse[1][1]).toBeCloseTo(2, 6);
    expect(r.determinant).toBeCloseTo(1, 6);
  });

  it("inverts 3x3 matrix", async () => {
    const r = await matrixInverse({
      matrix: [
        [1, 2, 3],
        [0, 1, 4],
        [5, 6, 0],
      ],
    }) as any;
    expect(r.size).toBe(3);
    expect(r.determinant).toBeCloseTo(1, 4);
  });

  it("rejects singular matrix", async () => {
    await expect(
      matrixInverse({ matrix: [[1, 2], [2, 4]] }),
    ).rejects.toThrow("singular");
  });

  it("rejects non-square matrix", async () => {
    await expect(
      matrixInverse({ matrix: [[1, 2, 3], [4, 5, 6]] }),
    ).rejects.toThrow("square");
  });

  it("stamps meta", async () => {
    const r = await matrixInverse({ matrix: [[2]] }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
    expect(r.inverse[0][0]).toBeCloseTo(0.5, 6);
  });
});
