import { describe, it, expect } from "vitest";
import { Matrix } from "../matrix.js";

describe("Matrix", () => {
  it("get and set", () => {
    const m = new Matrix(2, 2);
    m.set(0, 0, 5);
    expect(m.get(0, 0)).toBe(5);
  });

  it("add", () => {
    const a = Matrix.from([[1, 2], [3, 4]]);
    const b = Matrix.from([[5, 6], [7, 8]]);
    expect(a.add(b).toArray()).toEqual([[6, 8], [10, 12]]);
  });

  it("subtract", () => {
    const a = Matrix.from([[5, 6], [7, 8]]);
    const b = Matrix.from([[1, 2], [3, 4]]);
    expect(a.subtract(b).toArray()).toEqual([[4, 4], [4, 4]]);
  });

  it("multiply", () => {
    const a = Matrix.from([[1, 2], [3, 4]]);
    const b = Matrix.from([[5, 6], [7, 8]]);
    expect(a.multiply(b).toArray()).toEqual([[19, 22], [43, 50]]);
  });

  it("scale", () => {
    const m = Matrix.from([[1, 2], [3, 4]]);
    expect(m.scale(2).toArray()).toEqual([[2, 4], [6, 8]]);
  });

  it("transpose", () => {
    const m = Matrix.from([[1, 2, 3], [4, 5, 6]]);
    const t = m.transpose();
    expect(t.rows).toBe(3);
    expect(t.cols).toBe(2);
    expect(t.toArray()).toEqual([[1, 4], [2, 5], [3, 6]]);
  });

  it("determinant 2x2", () => {
    const m = Matrix.from([[1, 2], [3, 4]]);
    expect(m.determinant()).toBe(-2);
  });

  it("determinant 3x3", () => {
    const m = Matrix.from([[1, 2, 3], [4, 5, 6], [7, 8, 0]]);
    expect(m.determinant()).toBe(27);
  });

  it("identity", () => {
    const id = Matrix.identity(3);
    expect(id.get(0, 0)).toBe(1);
    expect(id.get(0, 1)).toBe(0);
    expect(id.get(1, 1)).toBe(1);
  });

  it("equals", () => {
    const a = Matrix.from([[1, 2], [3, 4]]);
    const b = Matrix.from([[1, 2], [3, 4]]);
    expect(a.equals(b)).toBe(true);
  });

  it("dimension mismatch throws", () => {
    const a = new Matrix(2, 2);
    const b = new Matrix(3, 3);
    expect(() => a.add(b)).toThrow("Dimension mismatch");
  });
});
