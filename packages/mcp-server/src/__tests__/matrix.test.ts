import { describe, it, expect } from "vitest";
import { Matrix } from "../matrix.js";

describe("Matrix", () => {
  it("creates with data", () => {
    const m = new Matrix(2, 2, [1, 2, 3, 4]);
    expect(m.get(0, 0)).toBe(1);
    expect(m.get(1, 1)).toBe(4);
  });

  it("creates identity", () => {
    const m = Matrix.identity(3);
    expect(m.get(0, 0)).toBe(1);
    expect(m.get(0, 1)).toBe(0);
    expect(m.get(2, 2)).toBe(1);
  });

  it("creates zeros", () => {
    const m = Matrix.zeros(2, 3);
    expect(m.rows).toBe(2);
    expect(m.cols).toBe(3);
    expect(m.get(1, 2)).toBe(0);
  });

  it("adds matrices", () => {
    const a = new Matrix(2, 2, [1, 2, 3, 4]);
    const b = new Matrix(2, 2, [5, 6, 7, 8]);
    const c = a.add(b);
    expect(c.toArray()).toEqual([[6, 8], [10, 12]]);
  });

  it("multiplies matrices", () => {
    const a = new Matrix(2, 3, [1, 2, 3, 4, 5, 6]);
    const b = new Matrix(3, 2, [7, 8, 9, 10, 11, 12]);
    const c = a.multiply(b);
    expect(c.rows).toBe(2);
    expect(c.cols).toBe(2);
    expect(c.toArray()).toEqual([[58, 64], [139, 154]]);
  });

  it("scales a matrix", () => {
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

  it("checks equality", () => {
    const a = new Matrix(2, 2, [1, 2, 3, 4]);
    const b = new Matrix(2, 2, [1, 2, 3, 4]);
    expect(a.equals(b)).toBe(true);
  });

  it("throws on dimension mismatch for add", () => {
    const a = new Matrix(2, 2);
    const b = new Matrix(2, 3);
    expect(() => a.add(b)).toThrow("Dimension mismatch");
  });

  it("throws on dimension mismatch for multiply", () => {
    const a = new Matrix(2, 3);
    const b = new Matrix(2, 3);
    expect(() => a.multiply(b)).toThrow("Dimension mismatch");
  });

  it("identity * matrix = matrix", () => {
    const m = new Matrix(3, 3, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const id = Matrix.identity(3);
    expect(id.multiply(m).equals(m)).toBe(true);
  });
});
