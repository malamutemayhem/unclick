import { describe, it, expect } from "vitest";
import { Matrix } from "../matrix.js";

describe("Matrix", () => {
  it("creates and accesses elements", () => {
    const m = new Matrix(2, 2, [1, 2, 3, 4]);
    expect(m.get(0, 0)).toBe(1);
    expect(m.get(1, 1)).toBe(4);
  });

  it("adds matrices", () => {
    const a = new Matrix(2, 2, [1, 2, 3, 4]);
    const b = new Matrix(2, 2, [5, 6, 7, 8]);
    expect(a.add(b).toArray()).toEqual([[6, 8], [10, 12]]);
  });

  it("subtracts matrices", () => {
    const a = new Matrix(2, 2, [5, 6, 7, 8]);
    const b = new Matrix(2, 2, [1, 2, 3, 4]);
    expect(a.subtract(b).toArray()).toEqual([[4, 4], [4, 4]]);
  });

  it("multiplies matrices", () => {
    const a = new Matrix(2, 2, [1, 2, 3, 4]);
    const b = new Matrix(2, 2, [5, 6, 7, 8]);
    expect(a.multiply(b).toArray()).toEqual([[19, 22], [43, 50]]);
  });

  it("scales matrix", () => {
    const m = new Matrix(2, 2, [1, 2, 3, 4]);
    expect(m.scale(2).toArray()).toEqual([[2, 4], [6, 8]]);
  });

  it("transposes", () => {
    const m = new Matrix(2, 3, [1, 2, 3, 4, 5, 6]);
    const t = m.transpose();
    expect(t.rows).toBe(3);
    expect(t.cols).toBe(2);
    expect(t.toArray()).toEqual([[1, 4], [2, 5], [3, 6]]);
  });

  it("computes determinant", () => {
    const m = new Matrix(2, 2, [1, 2, 3, 4]);
    expect(m.determinant()).toBe(-2);
    const m3 = new Matrix(3, 3, [1, 2, 3, 0, 1, 4, 5, 6, 0]);
    expect(m3.determinant()).toBe(1);
  });

  it("creates identity", () => {
    const id = Matrix.identity(3);
    expect(id.get(0, 0)).toBe(1);
    expect(id.get(1, 1)).toBe(1);
    expect(id.get(0, 1)).toBe(0);
  });

  it("creates zeros", () => {
    const z = Matrix.zeros(2, 3);
    expect(z.toArray()).toEqual([[0, 0, 0], [0, 0, 0]]);
  });
});
