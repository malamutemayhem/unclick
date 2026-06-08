import { describe, it, expect } from "vitest";
import { SparseMatrix } from "../sparse-matrix.js";

describe("SparseMatrix", () => {
  it("sets and gets values", () => {
    const m = new SparseMatrix();
    m.set(0, 0, 5);
    m.set(1, 2, 10);
    expect(m.get(0, 0)).toBe(5);
    expect(m.get(1, 2)).toBe(10);
    expect(m.get(0, 1)).toBe(0);
  });

  it("removes zero values", () => {
    const m = new SparseMatrix();
    m.set(0, 0, 5);
    m.set(0, 0, 0);
    expect(m.nonZeroCount()).toBe(0);
  });

  it("reports dimensions", () => {
    const m = new SparseMatrix();
    m.set(2, 3, 1);
    expect(m.rows()).toBe(3);
    expect(m.cols()).toBe(4);
  });

  it("adds matrices", () => {
    const a = new SparseMatrix();
    a.set(0, 0, 1);
    a.set(0, 1, 2);
    const b = new SparseMatrix();
    b.set(0, 0, 3);
    b.set(1, 0, 4);
    const c = a.add(b);
    expect(c.get(0, 0)).toBe(4);
    expect(c.get(0, 1)).toBe(2);
    expect(c.get(1, 0)).toBe(4);
  });

  it("multiplies matrices", () => {
    const a = new SparseMatrix();
    a.set(0, 0, 1);
    a.set(0, 1, 2);
    a.set(1, 0, 3);
    a.set(1, 1, 4);
    const b = new SparseMatrix();
    b.set(0, 0, 5);
    b.set(0, 1, 6);
    b.set(1, 0, 7);
    b.set(1, 1, 8);
    const c = a.multiply(b);
    expect(c.get(0, 0)).toBe(19);
    expect(c.get(0, 1)).toBe(22);
    expect(c.get(1, 0)).toBe(43);
    expect(c.get(1, 1)).toBe(50);
  });

  it("scales a matrix", () => {
    const m = new SparseMatrix();
    m.set(0, 0, 3);
    m.set(1, 1, 5);
    const scaled = m.scale(2);
    expect(scaled.get(0, 0)).toBe(6);
    expect(scaled.get(1, 1)).toBe(10);
  });

  it("transposes a matrix", () => {
    const m = new SparseMatrix();
    m.set(0, 1, 7);
    m.set(1, 0, 3);
    const t = m.transpose();
    expect(t.get(1, 0)).toBe(7);
    expect(t.get(0, 1)).toBe(3);
  });

  it("gets row and column", () => {
    const m = new SparseMatrix();
    m.set(0, 0, 1);
    m.set(0, 1, 2);
    m.set(1, 0, 3);
    m.set(1, 1, 4);
    expect(m.getRow(0)).toEqual([1, 2]);
    expect(m.getCol(0)).toEqual([1, 3]);
  });

  it("converts to/from dense", () => {
    const dense = [[1, 0, 3], [0, 5, 0]];
    const m = SparseMatrix.fromDense(dense);
    expect(m.nonZeroCount()).toBe(3);
    expect(m.toDense()).toEqual(dense);
  });

  it("creates identity matrix", () => {
    const id = SparseMatrix.identity(3);
    expect(id.get(0, 0)).toBe(1);
    expect(id.get(1, 1)).toBe(1);
    expect(id.get(2, 2)).toBe(1);
    expect(id.get(0, 1)).toBe(0);
    expect(id.nonZeroCount()).toBe(3);
  });

  it("computes trace", () => {
    const m = SparseMatrix.identity(3);
    expect(m.trace()).toBe(3);
  });

  it("computes density", () => {
    const m = SparseMatrix.identity(2);
    expect(m.density()).toBe(0.5);
  });

  it("handles empty matrix density", () => {
    const m = new SparseMatrix();
    expect(m.density()).toBe(0);
  });
});
