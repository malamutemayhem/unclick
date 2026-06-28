import { describe, it, expect } from "vitest";
import { matrixOperate } from "./matrix-tool.js";

describe("matrix-tool", () => {
  it("transposes a matrix", async () => {
    const r = await matrixOperate({ matrix_a: [[1, 2], [3, 4]], operation: "transpose" }) as Record<string, unknown>;
    expect(r.result).toEqual([[1, 3], [2, 4]]);
    expect(r.unclick_meta).toBeDefined();
  });

  it("adds two matrices", async () => {
    const r = await matrixOperate({
      matrix_a: [[1, 2], [3, 4]],
      matrix_b: [[5, 6], [7, 8]],
      operation: "add",
    }) as Record<string, unknown>;
    expect(r.result).toEqual([[6, 8], [10, 12]]);
  });

  it("multiplies two matrices", async () => {
    const r = await matrixOperate({
      matrix_a: [[1, 2], [3, 4]],
      matrix_b: [[5, 6], [7, 8]],
      operation: "multiply",
    }) as Record<string, unknown>;
    expect(r.result).toEqual([[19, 22], [43, 50]]);
  });

  it("computes determinant", async () => {
    const r = await matrixOperate({ matrix_a: [[1, 2], [3, 4]], operation: "determinant" }) as Record<string, unknown>;
    expect(r.result).toBe(-2);
  });

  it("rejects missing matrix", async () => {
    const r = await matrixOperate({}) as Record<string, unknown>;
    expect(r.error).toMatch(/matrix_a/i);
  });
});
