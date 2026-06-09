import { describe, it, expect } from "vitest";
import { Matrix, solveLinear } from "../linear-algebra.js";

describe("Matrix", () => {
  it("get and set", () => {
    const m = new Matrix(2, 2);
    m.set(0, 0, 5);
    expect(m.get(0, 0)).toBe(5);
  });

  it("add", () => {
    const a = Matrix.fromArray([[1, 2], [3, 4]]);
    const b = Matrix.fromArray([[5, 6], [7, 8]]);
    const c = a.add(b);
    expect(c.toArray()).toEqual([[6, 8], [10, 12]]);
  });

  it("sub", () => {
    const a = Matrix.fromArray([[5, 6], [7, 8]]);
    const b = Matrix.fromArray([[1, 2], [3, 4]]);
    expect(a.sub(b).toArray()).toEqual([[4, 4], [4, 4]]);
  });

  it("scale", () => {
    const a = Matrix.fromArray([[1, 2], [3, 4]]);
    expect(a.scale(2).toArray()).toEqual([[2, 4], [6, 8]]);
  });

  it("mul", () => {
    const a = Matrix.fromArray([[1, 2], [3, 4]]);
    const b = Matrix.fromArray([[5, 6], [7, 8]]);
    expect(a.mul(b).toArray()).toEqual([[19, 22], [43, 50]]);
  });

  it("transpose", () => {
    const a = Matrix.fromArray([[1, 2, 3], [4, 5, 6]]);
    const t = a.transpose();
    expect(t.rows).toBe(3);
    expect(t.cols).toBe(2);
    expect(t.toArray()).toEqual([[1, 4], [2, 5], [3, 6]]);
  });

  it("determinant 2x2", () => {
    const m = Matrix.fromArray([[1, 2], [3, 4]]);
    expect(m.determinant()).toBe(-2);
  });

  it("determinant 3x3", () => {
    const m = Matrix.fromArray([[1, 2, 3], [0, 1, 4], [5, 6, 0]]);
    expect(m.determinant()).toBe(1);
  });

  it("trace", () => {
    const m = Matrix.fromArray([[1, 0], [0, 5]]);
    expect(m.trace()).toBe(6);
  });

  it("identity", () => {
    const I = Matrix.identity(3);
    expect(I.get(0, 0)).toBe(1);
    expect(I.get(0, 1)).toBe(0);
    expect(I.get(2, 2)).toBe(1);
  });

  it("identity * A = A", () => {
    const a = Matrix.fromArray([[1, 2], [3, 4]]);
    const I = Matrix.identity(2);
    expect(I.mul(a).toArray()).toEqual(a.toArray());
  });
});

describe("solveLinear", () => {
  it("solves 2x2 system", () => {
    const A = Matrix.fromArray([[2, 1], [1, 3]]);
    const b = [5, 10];
    const x = solveLinear(A, b);
    expect(x).not.toBeNull();
    expect(x![0]).toBeCloseTo(1, 8);
    expect(x![1]).toBeCloseTo(3, 8);
  });

  it("solves 3x3 system", () => {
    const A = Matrix.fromArray([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
    const b = [3, 5, 7];
    const x = solveLinear(A, b);
    expect(x).not.toBeNull();
    expect(x![0]).toBeCloseTo(3);
    expect(x![1]).toBeCloseTo(5);
    expect(x![2]).toBeCloseTo(7);
  });

  it("returns null for singular matrix", () => {
    const A = Matrix.fromArray([[1, 2], [2, 4]]);
    const b = [3, 6];
    expect(solveLinear(A, b)).toBeNull();
  });
});
