import { describe, it, expect } from "vitest";
import {
  Tensor, zeros, ones, fill, add, sub, mul, scale,
  dot, matmul, transpose, sum, mean, max, min, apply,
} from "../tensor-ops.js";

describe("Tensor", () => {
  it("creates tensor with shape", () => {
    const t = new Tensor([1, 2, 3, 4], [2, 2]);
    expect(t.rank).toBe(2);
    expect(t.size).toBe(4);
    expect(t.shape).toEqual([2, 2]);
  });

  it("gets and sets values", () => {
    const t = new Tensor([1, 2, 3, 4, 5, 6], [2, 3]);
    expect(t.get([0, 0])).toBe(1);
    expect(t.get([1, 2])).toBe(6);
    t.set([0, 1], 99);
    expect(t.get([0, 1])).toBe(99);
  });

  it("reshapes", () => {
    const t = new Tensor([1, 2, 3, 4, 5, 6], [2, 3]);
    const r = t.reshape([3, 2]);
    expect(r.shape).toEqual([3, 2]);
    expect(r.get([0, 0])).toBe(1);
  });
});

describe("factory functions", () => {
  it("creates zeros", () => {
    expect(sum(zeros([3, 3]))).toBe(0);
  });

  it("creates ones", () => {
    expect(sum(ones([2, 3]))).toBe(6);
  });

  it("creates filled", () => {
    expect(sum(fill([2, 2], 5))).toBe(20);
  });
});

describe("element-wise ops", () => {
  it("adds tensors", () => {
    const a = new Tensor([1, 2, 3], [3]);
    const b = new Tensor([4, 5, 6], [3]);
    expect(add(a, b).toArray()).toEqual([5, 7, 9]);
  });

  it("subtracts tensors", () => {
    const a = new Tensor([5, 5, 5], [3]);
    const b = new Tensor([1, 2, 3], [3]);
    expect(sub(a, b).toArray()).toEqual([4, 3, 2]);
  });

  it("multiplies element-wise", () => {
    const a = new Tensor([2, 3], [2]);
    const b = new Tensor([4, 5], [2]);
    expect(mul(a, b).toArray()).toEqual([8, 15]);
  });

  it("scales by scalar", () => {
    const t = new Tensor([1, 2, 3], [3]);
    expect(scale(t, 3).toArray()).toEqual([3, 6, 9]);
  });
});

describe("linear algebra", () => {
  it("dot product", () => {
    const a = new Tensor([1, 2, 3], [3]);
    const b = new Tensor([4, 5, 6], [3]);
    expect(dot(a, b)).toBe(32);
  });

  it("matrix multiplication", () => {
    const a = new Tensor([1, 2, 3, 4], [2, 2]);
    const b = new Tensor([5, 6, 7, 8], [2, 2]);
    const c = matmul(a, b);
    expect(c.toArray()).toEqual([19, 22, 43, 50]);
  });

  it("transposes matrix", () => {
    const t = new Tensor([1, 2, 3, 4, 5, 6], [2, 3]);
    const tr = transpose(t);
    expect(tr.shape).toEqual([3, 2]);
    expect(tr.get([0, 1])).toBe(4);
  });
});

describe("reductions", () => {
  it("sums", () => expect(sum(new Tensor([1, 2, 3], [3]))).toBe(6));
  it("means", () => expect(mean(new Tensor([2, 4, 6], [3]))).toBe(4));
  it("max", () => expect(max(new Tensor([1, 5, 3], [3]))).toBe(5));
  it("min", () => expect(min(new Tensor([1, 5, 3], [3]))).toBe(1));
});

describe("apply", () => {
  it("applies function element-wise", () => {
    const t = new Tensor([1, 4, 9], [3]);
    const r = apply(t, Math.sqrt);
    expect(r.toArray()).toEqual([1, 2, 3]);
  });
});
