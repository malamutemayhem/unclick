import { describe, it, expect } from "vitest";
import { Matrix } from "../matrix.js";

describe("Matrix", () => {
  it("creates with fill value", () => {
    const m = new Matrix(2, 3, 1);
    expect(m.get(0, 0)).toBe(1);
    expect(m.rows).toBe(2);
    expect(m.cols).toBe(3);
  });

  it("set and get", () => {
    const m = new Matrix(2, 2);
    m.set(0, 1, 5);
    expect(m.get(0, 1)).toBe(5);
  });

  it("add matrices", () => {
    const a = Matrix.from([[1, 2], [3, 4]]);
    const b = Matrix.from([[5, 6], [7, 8]]);
    const c = a.add(b);
    expect(c.toArray()).toEqual([[6, 8], [10, 12]]);
  });

  it("add throws on dimension mismatch", () => {
    const a = new Matrix(2, 2);
    const b = new Matrix(2, 3);
    expect(() => a.add(b)).toThrow("dimensions");
  });

  it("multiply matrices", () => {
    const a = Matrix.from([[1, 2], [3, 4]]);
    const b = Matrix.from([[5, 6], [7, 8]]);
    const c = a.multiply(b);
    expect(c.toArray()).toEqual([[19, 22], [43, 50]]);
  });

  it("scale multiplies all elements", () => {
    const m = Matrix.from([[1, 2], [3, 4]]);
    expect(m.scale(2).toArray()).toEqual([[2, 4], [6, 8]]);
  });

  it("transpose swaps rows and cols", () => {
    const m = Matrix.from([[1, 2, 3], [4, 5, 6]]);
    const t = m.transpose();
    expect(t.rows).toBe(3);
    expect(t.cols).toBe(2);
    expect(t.toArray()).toEqual([[1, 4], [2, 5], [3, 6]]);
  });

  it("identity creates diagonal ones", () => {
    const m = Matrix.identity(3);
    expect(m.get(0, 0)).toBe(1);
    expect(m.get(1, 1)).toBe(1);
    expect(m.get(0, 1)).toBe(0);
  });
});
