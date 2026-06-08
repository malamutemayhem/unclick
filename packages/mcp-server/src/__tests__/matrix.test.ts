import { describe, it, expect } from "vitest";
import { Matrix } from "../matrix.js";

describe("Matrix", () => {
  it("creates zero-filled matrix", () => {
    const m = new Matrix(2, 3);
    expect(m.rows).toBe(2);
    expect(m.cols).toBe(3);
    expect(m.get(0, 0)).toBe(0);
  });

  it("creates with custom fill", () => {
    const m = new Matrix(2, 2, 5);
    expect(m.get(1, 1)).toBe(5);
  });

  it("get and set", () => {
    const m = new Matrix(2, 2);
    m.set(0, 1, 42);
    expect(m.get(0, 1)).toBe(42);
  });

  it("add", () => {
    const a = Matrix.from([[1, 2], [3, 4]]);
    const b = Matrix.from([[5, 6], [7, 8]]);
    expect(a.add(b).toArray()).toEqual([[6, 8], [10, 12]]);
  });

  it("multiply", () => {
    const a = Matrix.from([[1, 2], [3, 4]]);
    const b = Matrix.from([[5, 6], [7, 8]]);
    expect(a.multiply(b).toArray()).toEqual([[19, 22], [43, 50]]);
  });

  it("multiply throws on incompatible dimensions", () => {
    const a = new Matrix(2, 3);
    const b = new Matrix(2, 2);
    expect(() => a.multiply(b)).toThrow("Incompatible");
  });

  it("scale", () => {
    const m = Matrix.from([[1, 2], [3, 4]]);
    expect(m.scale(3).toArray()).toEqual([[3, 6], [9, 12]]);
  });

  it("transpose", () => {
    const m = Matrix.from([[1, 2, 3], [4, 5, 6]]);
    const t = m.transpose();
    expect(t.rows).toBe(3);
    expect(t.cols).toBe(2);
    expect(t.toArray()).toEqual([[1, 4], [2, 5], [3, 6]]);
  });

  it("identity", () => {
    const id = Matrix.identity(3);
    expect(id.get(0, 0)).toBe(1);
    expect(id.get(0, 1)).toBe(0);
    expect(id.get(2, 2)).toBe(1);
  });

  it("from", () => {
    const m = Matrix.from([[10, 20], [30, 40]]);
    expect(m.get(1, 0)).toBe(30);
  });

  it("determinant 1x1", () => {
    expect(Matrix.from([[7]]).determinant()).toBe(7);
  });

  it("determinant 2x2", () => {
    expect(Matrix.from([[1, 2], [3, 4]]).determinant()).toBe(-2);
  });

  it("determinant 3x3", () => {
    const m = Matrix.from([[6, 1, 1], [4, -2, 5], [2, 8, 7]]);
    expect(m.determinant()).toBe(-306);
  });

  it("determinant throws for non-square", () => {
    expect(() => new Matrix(2, 3).determinant()).toThrow("square");
  });

  it("toArray returns a copy", () => {
    const m = Matrix.from([[1, 2]]);
    const arr = m.toArray();
    arr[0][0] = 99;
    expect(m.get(0, 0)).toBe(1);
  });

  it("identity times matrix returns same matrix", () => {
    const a = Matrix.from([[2, 3], [4, 5]]);
    expect(Matrix.identity(2).multiply(a).toArray()).toEqual([[2, 3], [4, 5]]);
  });
});
