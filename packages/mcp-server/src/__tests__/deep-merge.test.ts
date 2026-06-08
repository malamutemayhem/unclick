import { describe, it, expect } from "vitest";
import { deepMerge, deepClone, deepEqual } from "../deep-merge.js";

describe("deep-merge", () => {
  describe("deepMerge", () => {
    it("merges flat objects", () => {
      expect(deepMerge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    });

    it("later values override earlier", () => {
      expect(deepMerge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
    });

    it("merges nested objects recursively", () => {
      const result = deepMerge({ a: { x: 1 } }, { a: { y: 2 } });
      expect(result).toEqual({ a: { x: 1, y: 2 } });
    });

    it("handles multiple sources", () => {
      expect(deepMerge({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
    });

    it("arrays replace instead of merge", () => {
      expect(deepMerge({ a: [1, 2] }, { a: [3] })).toEqual({ a: [3] });
    });

    it("handles empty sources", () => {
      expect(deepMerge({ a: 1 }, {})).toEqual({ a: 1 });
    });
  });

  describe("deepClone", () => {
    it("clones plain objects", () => {
      const obj = { a: { b: 1 } };
      const clone = deepClone(obj);
      expect(clone).toEqual(obj);
      clone.a.b = 99;
      expect(obj.a.b).toBe(1);
    });

    it("clones arrays", () => {
      const arr = [1, [2, 3]];
      const clone = deepClone(arr);
      expect(clone).toEqual(arr);
      (clone[1] as number[])[0] = 99;
      expect((arr[1] as number[])[0]).toBe(2);
    });

    it("clones dates", () => {
      const d = new Date("2024-01-01");
      const clone = deepClone(d);
      expect(clone.getTime()).toBe(d.getTime());
      expect(clone).not.toBe(d);
    });

    it("clones primitives as-is", () => {
      expect(deepClone(42)).toBe(42);
      expect(deepClone("hi")).toBe("hi");
      expect(deepClone(null)).toBe(null);
    });
  });

  describe("deepEqual", () => {
    it("equal primitives", () => {
      expect(deepEqual(1, 1)).toBe(true);
      expect(deepEqual("a", "a")).toBe(true);
    });

    it("unequal primitives", () => {
      expect(deepEqual(1, 2)).toBe(false);
      expect(deepEqual("a", "b")).toBe(false);
    });

    it("equal objects", () => {
      expect(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);
    });

    it("unequal objects", () => {
      expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
      expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    });

    it("equal arrays", () => {
      expect(deepEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
    });

    it("unequal arrays", () => {
      expect(deepEqual([1, 2], [1, 3])).toBe(false);
      expect(deepEqual([1], [1, 2])).toBe(false);
    });

    it("null handling", () => {
      expect(deepEqual(null, null)).toBe(true);
      expect(deepEqual(null, {})).toBe(false);
    });
  });
});
