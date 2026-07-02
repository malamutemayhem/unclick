import { describe, it, expect } from "vitest";
import { matrixDecomp } from "./matrixdecomp-tool.js";

describe("matrixDecomp", () => {
  it("computes LU decomposition", async () => {
    const r = await matrixDecomp({
      matrix: [
        [2, 1],
        [4, 3],
      ],
      operation: "lu",
    }) as any;
    expect(r.operation).toBe("lu");
    expect(r.L[1][0]).toBe(2);
    expect(r.U[0][0]).toBe(2);
    expect(r.U[1][1]).toBe(1);
  });

  it("computes transpose", async () => {
    const r = await matrixDecomp({
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
      ],
      operation: "transpose",
    }) as any;
    expect(r.result.length).toBe(3);
    expect(r.result[0].length).toBe(2);
    expect(r.result[0]).toEqual([1, 4]);
  });

  it("computes trace", async () => {
    const r = await matrixDecomp({
      matrix: [
        [1, 0],
        [0, 5],
      ],
      operation: "trace",
    }) as any;
    expect(r.trace).toBe(6);
  });

  it("computes rank", async () => {
    const r = await matrixDecomp({
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      operation: "rank",
    }) as any;
    expect(r.rank).toBe(2);
  });

  it("rejects non-square for LU", async () => {
    await expect(
      matrixDecomp({ matrix: [[1, 2, 3], [4, 5, 6]], operation: "lu" }),
    ).rejects.toThrow("square");
  });

  it("stamps meta", async () => {
    const r = await matrixDecomp({
      matrix: [[1]],
      operation: "trace",
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
