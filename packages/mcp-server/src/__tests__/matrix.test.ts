import { describe, it, expect } from "vitest";
import { Matrix } from "../matrix.js";

describe("Matrix", () => {
  it("from and toArray", () => {
    const m = Matrix.from([[1, 2], [3, 4]]);
    expect(m.toArray()).toEqual([[1, 2], [3, 4]]);
    expect(m.rows).toBe(2);
    expect(m.cols).toBe(2);
  });

  it("get and set", () => {
    const m = new Matrix(2, 2);
    m.set(0, 1, 5);
    expect(m.get(0, 1)).toBe(5);
    expect(m.get(0, 0)).toBe(0);
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
    expect(m.transpose().toArray()).toEqual([[1, 4], [2, 5], [3, 6]]);
  });

  it("identity", () => {
    const I = Matrix.identity(3);
    expect(I.toArray()).toEqual([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
  });

  it("multiply by identity", () => {
    const m = Matrix.from([[1, 2], [3, 4]]);
    const I = Matrix.identity(2);
    expect(m.multiply(I).equals(m)).toBe(true);
  });

  it("equals with epsilon", () => {
    const a = Matrix.from([[1.0000001]]);
    const b = Matrix.from([[1.0000002]]);
    expect(a.equals(b, 1e-6)).toBe(true);
    expect(a.equals(b, 1e-9)).toBe(false);
  });
});
