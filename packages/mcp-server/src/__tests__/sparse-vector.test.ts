import { describe, it, expect } from "vitest";
import { SparseVector } from "../sparse-vector.js";

describe("SparseVector", () => {
  it("creates from array", () => {
    const v = SparseVector.fromArray([0, 1, 0, 3, 0]);
    expect(v.get(1)).toBe(1);
    expect(v.get(3)).toBe(3);
    expect(v.get(0)).toBe(0);
    expect(v.nonZeroCount).toBe(2);
  });

  it("creates from entries", () => {
    const v = SparseVector.fromEntries([[0, 5], [100, 10]]);
    expect(v.get(0)).toBe(5);
    expect(v.get(100)).toBe(10);
  });

  it("set and get", () => {
    const v = new SparseVector();
    v.set(5, 10);
    expect(v.get(5)).toBe(10);
    v.set(5, 0);
    expect(v.get(5)).toBe(0);
    expect(v.nonZeroCount).toBe(0);
  });

  it("dot product", () => {
    const a = SparseVector.fromArray([1, 2, 3]);
    const b = SparseVector.fromArray([4, 5, 6]);
    expect(a.dot(b)).toBe(32);
  });

  it("magnitude", () => {
    const v = SparseVector.fromArray([3, 4]);
    expect(v.magnitude()).toBe(5);
  });

  it("cosine similarity", () => {
    const a = SparseVector.fromArray([1, 0, 0]);
    const b = SparseVector.fromArray([1, 0, 0]);
    expect(a.cosineSimilarity(b)).toBeCloseTo(1);
  });

  it("cosine similarity orthogonal vectors", () => {
    const a = SparseVector.fromArray([1, 0]);
    const b = SparseVector.fromArray([0, 1]);
    expect(a.cosineSimilarity(b)).toBeCloseTo(0);
  });

  it("add vectors", () => {
    const a = SparseVector.fromArray([1, 2, 0]);
    const b = SparseVector.fromArray([0, 3, 4]);
    const c = a.add(b);
    expect(c.get(0)).toBe(1);
    expect(c.get(1)).toBe(5);
    expect(c.get(2)).toBe(4);
  });

  it("scale vector", () => {
    const v = SparseVector.fromArray([2, 3]);
    const scaled = v.scale(2);
    expect(scaled.get(0)).toBe(4);
    expect(scaled.get(1)).toBe(6);
  });

  it("toArray", () => {
    const v = SparseVector.fromEntries([[1, 5], [3, 10]]);
    expect(v.toArray(5)).toEqual([0, 5, 0, 10, 0]);
  });

  it("indices returns sorted non-zero indices", () => {
    const v = SparseVector.fromEntries([[5, 1], [2, 3], [8, 2]]);
    expect(v.indices()).toEqual([2, 5, 8]);
  });
});
