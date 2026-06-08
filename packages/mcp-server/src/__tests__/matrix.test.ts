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

  it("fromArray builds matrix", () => {
    const m = Matrix.fromArray([[1, 2], [3, 4]]);
    expect(m.get(0, 0)).toBe(1);
    expect(m.get(1, 1)).toBe(4);
    expect(m.rows).toBe(2);
    expect(m.cols).toBe(2);
  });

  it("identity creates diagonal ones", () => {
    const m = Matrix.identity(3);
    expect(m.get(0, 0)).toBe(1);
    expect(m.get(1, 1)).toBe(1);
    expect(m.get(2, 2)).toBe(1);
    expect(m.get(0, 1)).toBe(0);
  });

  it("get and set work", () => {
    const m = new Matrix(2, 2);
    m.set(0, 1, 42);
    expect(m.get(0, 1)).toBe(42);
  });

  it("add sums matrices", () => {
    const a = Matrix.fromArray([[1, 2], [3, 4]]);
    const b = Matrix.fromArray([[5, 6], [7, 8]]);
    const c = a.add(b);
    expect(c.toArray()).toEqual([[6, 8], [10, 12]]);
  });

  it("add throws on dimension mismatch", () => {
    const a = new Matrix(2, 2);
    const b = new Matrix(2, 3);
    expect(() => a.add(b)).toThrow("Dimension mismatch");
  });

  it("multiply works correctly", () => {
    const a = Matrix.fromArray([[1, 2], [3, 4]]);
    const b = Matrix.fromArray([[5, 6], [7, 8]]);
    const c = a.multiply(b);
    expect(c.toArray()).toEqual([[19, 22], [43, 50]]);
  });

  it("multiply throws on dimension mismatch", () => {
    const a = new Matrix(2, 3);
    const b = new Matrix(2, 3);
    expect(() => a.multiply(b)).toThrow("Dimension mismatch");
  });

  it("multiply with identity returns same", () => {
    const a = Matrix.fromArray([[1, 2], [3, 4]]);
    const id = Matrix.identity(2);
    expect(a.multiply(id).toArray()).toEqual([[1, 2], [3, 4]]);
  });

  it("scale multiplies all elements", () => {
    const m = Matrix.fromArray([[1, 2], [3, 4]]);
    expect(m.scale(3).toArray()).toEqual([[3, 6], [9, 12]]);
  });

  it("transpose swaps rows and cols", () => {
    const m = Matrix.fromArray([[1, 2, 3], [4, 5, 6]]);
    const t = m.transpose();
    expect(t.rows).toBe(3);
    expect(t.cols).toBe(2);
    expect(t.toArray()).toEqual([[1, 4], [2, 5], [3, 6]]);
  });

  it("toArray returns deep copy", () => {
    const m = Matrix.fromArray([[1, 2]]);
    const arr = m.toArray();
    arr[0][0] = 99;
    expect(m.get(0, 0)).toBe(1);
  });

  it("getRow returns row copy", () => {
    const m = Matrix.fromArray([[1, 2], [3, 4]]);
    expect(m.getRow(0)).toEqual([1, 2]);
    expect(m.getRow(1)).toEqual([3, 4]);
  });

  it("getCol returns column", () => {
    const m = Matrix.fromArray([[1, 2], [3, 4]]);
    expect(m.getCol(0)).toEqual([1, 3]);
    expect(m.getCol(1)).toEqual([2, 4]);
  });

  it("map applies function to all elements", () => {
    const m = Matrix.fromArray([[1, 2], [3, 4]]);
    const doubled = m.map((v) => v * 2);
    expect(doubled.toArray()).toEqual([[2, 4], [6, 8]]);
  });

  it("map receives row and col indices", () => {
    const m = new Matrix(2, 2);
    const result = m.map((_v, r, c) => r * 10 + c);
    expect(result.toArray()).toEqual([[0, 1], [10, 11]]);
  });
});
