import { describe, it, expect } from "vitest";
import { deepMerge, deepMergeWith, deepClone, deepFreeze, deepEqual } from "../deep-merge.js";

describe("deepMerge", () => {
  it("merges flat objects", () => {
    expect(deepMerge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  it("overrides with last source", () => {
    expect(deepMerge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
  });

  it("recursively merges nested objects", () => {
    const result = deepMerge({ a: { b: 1, c: 2 } }, { a: { c: 3, d: 4 } });
    expect(result).toEqual({ a: { b: 1, c: 3, d: 4 } });
  });

  it("arrays are replaced not merged", () => {
    expect(deepMerge({ a: [1, 2] }, { a: [3, 4] })).toEqual({ a: [3, 4] });
  });

  it("handles multiple sources", () => {
    expect(deepMerge({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
  });
});

describe("deepMergeWith", () => {
  it("uses custom merger", () => {
    const result = deepMergeWith(
      (target, source) => {
        if (Array.isArray(target) && Array.isArray(source)) return [...target, ...source];
        return source;
      },
      { a: [1] },
      { a: [2] }
    );
    expect(result).toEqual({ a: [1, 2] });
  });
});

describe("deepClone", () => {
  it("clones objects deeply", () => {
    const original = { a: { b: [1, 2, 3] }, c: "hi" };
    const cloned = deepClone(original);
    expect(cloned).toEqual(original);
    cloned.a.b.push(4);
    expect(original.a.b).toEqual([1, 2, 3]);
  });

  it("clones primitives", () => {
    expect(deepClone(42)).toBe(42);
    expect(deepClone("hello")).toBe("hello");
    expect(deepClone(null)).toBe(null);
  });

  it("clones Date", () => {
    const d = new Date("2024-01-01");
    const c = deepClone(d);
    expect(c.getTime()).toBe(d.getTime());
    expect(c).not.toBe(d);
  });
});

describe("deepFreeze", () => {
  it("freezes nested objects", () => {
    const obj = deepFreeze({ a: { b: 1 } });
    expect(Object.isFrozen(obj)).toBe(true);
    expect(Object.isFrozen((obj as any).a)).toBe(true);
  });
});

describe("deepEqual", () => {
  it("equal objects", () => {
    expect(deepEqual({ a: 1, b: [2, 3] }, { a: 1, b: [2, 3] })).toBe(true);
  });

  it("different values", () => {
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
  });

  it("different keys", () => {
    expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false);
  });

  it("primitives", () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual("a", "b")).toBe(false);
  });

  it("arrays of different length", () => {
    expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
  });

  it("null handling", () => {
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(null, {})).toBe(false);
  });
});
