import { describe, it, expect } from "vitest";
import { deepEqual, deepClone } from "../deep-equal.js";

describe("deepEqual", () => {
  it("primitives", () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual("a", "a")).toBe(true);
    expect(deepEqual(true, true)).toBe(true);
    expect(deepEqual(1, 2)).toBe(false);
  });

  it("null and undefined", () => {
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);
    expect(deepEqual(null, undefined)).toBe(false);
  });

  it("NaN", () => {
    expect(deepEqual(NaN, NaN)).toBe(true);
  });

  it("arrays", () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
  });

  it("nested objects", () => {
    expect(deepEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
    expect(deepEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
  });

  it("dates", () => {
    const d = new Date("2024-01-01");
    expect(deepEqual(d, new Date("2024-01-01"))).toBe(true);
    expect(deepEqual(d, new Date("2024-01-02"))).toBe(false);
  });

  it("regexps", () => {
    expect(deepEqual(/abc/gi, /abc/gi)).toBe(true);
    expect(deepEqual(/abc/g, /abc/i)).toBe(false);
  });

  it("maps", () => {
    const m1 = new Map([["a", 1]]);
    const m2 = new Map([["a", 1]]);
    expect(deepEqual(m1, m2)).toBe(true);
  });

  it("sets", () => {
    expect(deepEqual(new Set([1, 2]), new Set([1, 2]))).toBe(true);
    expect(deepEqual(new Set([1, 2]), new Set([1, 3]))).toBe(false);
  });

  it("different types", () => {
    expect(deepEqual(1, "1")).toBe(false);
    expect(deepEqual([], {})).toBe(false);
  });
});

describe("deepClone", () => {
  it("clones primitives", () => {
    expect(deepClone(42)).toBe(42);
    expect(deepClone("hello")).toBe("hello");
  });

  it("clones objects deeply", () => {
    const obj = { a: { b: [1, 2, 3] } };
    const clone = deepClone(obj);
    expect(clone).toEqual(obj);
    expect(clone).not.toBe(obj);
    expect(clone.a).not.toBe(obj.a);
  });

  it("clones dates", () => {
    const d = new Date("2024-01-01");
    const clone = deepClone(d);
    expect(clone.getTime()).toBe(d.getTime());
    expect(clone).not.toBe(d);
  });

  it("clones maps and sets", () => {
    const m = new Map([["a", 1]]);
    const s = new Set([1, 2]);
    expect(deepClone(m).get("a")).toBe(1);
    expect(deepClone(s).has(2)).toBe(true);
  });

  it("handles null", () => {
    expect(deepClone(null)).toBeNull();
  });
});
