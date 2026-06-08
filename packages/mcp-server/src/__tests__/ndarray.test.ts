import { describe, it, expect } from "vitest";
import { NdArray } from "../ndarray.js";

describe("NdArray", () => {
  it("creates from data and shape", () => {
    const a = new NdArray([1, 2, 3, 4, 5, 6], [2, 3]);
    expect(a.shape).toEqual([2, 3]);
    expect(a.ndim).toBe(2);
    expect(a.size).toBe(6);
  });

  it("zeros creates zero-filled array", () => {
    const a = NdArray.zeros([2, 3]);
    expect(a.sum()).toBe(0);
  });

  it("ones creates one-filled array", () => {
    const a = NdArray.ones([3]);
    expect(a.sum()).toBe(3);
  });

  it("arange creates range", () => {
    const a = NdArray.arange(5);
    expect(a.toArray()).toEqual([0, 1, 2, 3, 4]);
  });

  it("arange with start/stop/step", () => {
    const a = NdArray.arange(2, 10, 3);
    expect(a.toArray()).toEqual([2, 5, 8]);
  });

  it("linspace creates evenly spaced", () => {
    const a = NdArray.linspace(0, 1, 5);
    expect(a.get([0])).toBeCloseTo(0);
    expect(a.get([4])).toBeCloseTo(1);
    expect(a.size).toBe(5);
  });

  it("get and set elements", () => {
    const a = new NdArray([1, 2, 3, 4], [2, 2]);
    expect(a.get([0, 0])).toBe(1);
    expect(a.get([1, 1])).toBe(4);
    a.set([0, 1], 99);
    expect(a.get([0, 1])).toBe(99);
  });

  it("reshape changes shape", () => {
    const a = NdArray.arange(6).reshape([2, 3]);
    expect(a.shape).toEqual([2, 3]);
    expect(a.get([1, 0])).toBe(3);
  });

  it("transpose swaps dimensions", () => {
    const a = new NdArray([1, 2, 3, 4, 5, 6], [2, 3]);
    const t = a.transpose();
    expect(t.shape).toEqual([3, 2]);
    expect(t.get([0, 0])).toBe(1);
    expect(t.get([0, 1])).toBe(4);
  });

  it("add with scalar", () => {
    const a = NdArray.arange(3).add(10);
    expect(a.toArray()).toEqual([10, 11, 12]);
  });

  it("add with array", () => {
    const a = new NdArray([1, 2], [2]);
    const b = new NdArray([3, 4], [2]);
    expect(a.add(b).toArray()).toEqual([4, 6]);
  });

  it("sub works", () => {
    const a = new NdArray([5, 10], [2]);
    expect(a.sub(3).toArray()).toEqual([2, 7]);
  });

  it("mul works", () => {
    const a = new NdArray([2, 3], [2]);
    expect(a.mul(4).toArray()).toEqual([8, 12]);
  });

  it("dot product (matrix multiply)", () => {
    const a = new NdArray([1, 2, 3, 4], [2, 2]);
    const b = new NdArray([5, 6, 7, 8], [2, 2]);
    const c = a.dot(b);
    expect(c.get([0, 0])).toBe(19);
    expect(c.get([0, 1])).toBe(22);
    expect(c.get([1, 0])).toBe(43);
    expect(c.get([1, 1])).toBe(50);
  });

  it("sum/mean/min/max", () => {
    const a = new NdArray([1, 2, 3, 4], [4]);
    expect(a.sum()).toBe(10);
    expect(a.mean()).toBe(2.5);
    expect(a.min()).toBe(1);
    expect(a.max()).toBe(4);
  });

  it("map transforms elements", () => {
    const a = NdArray.arange(3).map((v) => v * v);
    expect(a.toArray()).toEqual([0, 1, 4]);
  });

  it("slice rows", () => {
    const a = new NdArray([1, 2, 3, 4, 5, 6], [3, 2]);
    const s = a.slice(0, 1, 3);
    expect(s.shape).toEqual([2, 2]);
    expect(s.get([0, 0])).toBe(3);
  });

  it("throws on shape mismatch", () => {
    expect(() => new NdArray([1, 2, 3], [2, 2])).toThrow("does not match");
  });
});
