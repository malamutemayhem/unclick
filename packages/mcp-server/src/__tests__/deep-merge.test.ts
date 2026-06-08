import { describe, it, expect } from "vitest";
import { deepMerge, deepClone, deepFreeze, deepEqual } from "../deep-merge.js";

describe("deepMerge", () => {
  it("merges flat objects", () => {
    expect(deepMerge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  it("merges nested objects", () => {
    expect(deepMerge({ a: { x: 1 } }, { a: { y: 2 } })).toEqual({ a: { x: 1, y: 2 } });
  });

  it("later values override", () => {
    expect(deepMerge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
  });

  it("handles arrays (replace, not merge)", () => {
    expect(deepMerge({ a: [1] }, { a: [2, 3] })).toEqual({ a: [2, 3] });
  });

  it("merges multiple objects", () => {
    expect(deepMerge({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
  });
});

describe("deepClone", () => {
  it("clones objects", () => {
    const original = { a: { b: [1, 2] } };
    const cloned = deepClone(original);
    expect(cloned).toEqual(original);
    cloned.a.b.push(3);
    expect(original.a.b).toEqual([1, 2]);
  });

  it("clones dates", () => {
    const d = new Date("2024-01-01");
    const cloned = deepClone(d);
    expect(cloned.getTime()).toBe(d.getTime());
    expect(cloned).not.toBe(d);
  });

  it("handles primitives", () => {
    expect(deepClone(42)).toBe(42);
    expect(deepClone("hi")).toBe("hi");
    expect(deepClone(null)).toBe(null);
  });
});

describe("deepFreeze", () => {
  it("freezes nested objects", () => {
    const obj = deepFreeze({ a: { b: 1 } });
    expect(Object.isFrozen(obj)).toBe(true);
    expect(Object.isFrozen(obj.a)).toBe(true);
  });
});

describe("deepEqual", () => {
  it("compares equal objects", () => {
    expect(deepEqual({ a: [1, 2] }, { a: [1, 2] })).toBe(true);
  });

  it("detects differences", () => {
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(deepEqual([1], [1, 2])).toBe(false);
    expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false);
  });

  it("handles primitives", () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual("a", "b")).toBe(false);
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(null, undefined)).toBe(false);
  });
});
