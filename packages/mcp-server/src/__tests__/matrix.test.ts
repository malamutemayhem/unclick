import { describe, it, expect } from "vitest";
import { Matrix } from "../matrix.js";

describe("Matrix", () => {
  it("creates from 2D array", () => {
    const m = new Matrix([[1, 2], [3, 4]]);
    expect(m.rows).toBe(2);
    expect(m.cols).toBe(2);
    expect(m.get(0, 0)).toBe(1);
    expect(m.get(1, 1)).toBe(4);
  });

  it("throws on empty data", () => {
    expect(() => new Matrix([])).toThrow();
  });

  it("throws on jagged array", () => {
    expect(() => new Matrix([[1, 2], [3]])).toThrow("same length");
  });

  it("adds matrices", () => {
    const a = new Matrix([[1, 2], [3, 4]]);
    const b = new Matrix([[5, 6], [7, 8]]);
    expect(a.add(b).toArray()).toEqual([[6, 8], [10, 12]]);
  });

  it("subtracts matrices", () => {
    const a = new Matrix([[5, 6], [7, 8]]);
    const b = new Matrix([[1, 2], [3, 4]]);
    expect(a.subtract(b).toArray()).toEqual([[4, 4], [4, 4]]);
  });

  it("multiplies matrices", () => {
    const a = new Matrix([[1, 2], [3, 4]]);
    const b = new Matrix([[5, 6], [7, 8]]);
    expect(a.multiply(b).toArray()).toEqual([[19, 22], [43, 50]]);
  });

  it("throws on incompatible multiply", () => {
    const a = new Matrix([[1, 2]]);
    const b = new Matrix([[1, 2]]);
    expect(() => a.multiply(b)).toThrow("Incompatible");
  });

  it("scales matrix", () => {
    const m = new Matrix([[1, 2], [3, 4]]);
    expect(m.scale(2).toArray()).toEqual([[2, 4], [6, 8]]);
  });

  it("transposes", () => {
    const m = new Matrix([[1, 2, 3], [4, 5, 6]]);
    expect(m.transpose().toArray()).toEqual([[1, 4], [2, 5], [3, 6]]);
  });

  it("computes determinant 2x2", () => {
    const m = new Matrix([[1, 2], [3, 4]]);
    expect(m.determinant()).toBe(-2);
  });

  it("computes determinant 3x3", () => {
    const m = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 0]]);
    expect(m.determinant()).toBe(27);
  });

  it("checks equality", () => {
    const a = new Matrix([[1, 2], [3, 4]]);
    const b = new Matrix([[1, 2], [3, 4]]);
    expect(a.equals(b)).toBe(true);
  });

  it("identity matrix", () => {
    const id = Matrix.identity(3);
    expect(id.get(0, 0)).toBe(1);
    expect(id.get(0, 1)).toBe(0);
    expect(id.get(2, 2)).toBe(1);
  });

  it("zeros matrix", () => {
    const z = Matrix.zeros(2, 3);
    expect(z.rows).toBe(2);
    expect(z.cols).toBe(3);
    expect(z.get(0, 0)).toBe(0);
  });
});
