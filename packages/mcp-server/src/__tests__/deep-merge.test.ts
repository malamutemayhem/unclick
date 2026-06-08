import { describe, it, expect } from "vitest";
import { deepMerge, deepMergeWith, deepClone, deepEqual } from "../deep-merge.js";

describe("deep-merge", () => {
  it("merges flat objects", () => {
    expect(deepMerge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  it("later values overwrite earlier ones", () => {
    expect(deepMerge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
  });

  it("recursively merges nested objects", () => {
    const result = deepMerge(
      { db: { host: "localhost", port: 5432 } },
      { db: { port: 3306, name: "mydb" } }
    );
    expect(result).toEqual({ db: { host: "localhost", port: 3306, name: "mydb" } });
  });

  it("arrays overwrite instead of merging", () => {
    expect(deepMerge({ tags: [1, 2] }, { tags: [3] })).toEqual({ tags: [3] });
  });

  it("merges three or more sources", () => {
    const result = deepMerge({ a: 1 }, { b: 2 }, { c: 3 });
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("deepMergeWith uses custom merger", () => {
    const result = deepMergeWith(
      (a, b) => (Array.isArray(a) && Array.isArray(b) ? [...a, ...b] : b),
      { tags: ["a"] },
      { tags: ["b"] }
    );
    expect(result).toEqual({ tags: ["a", "b"] });
  });

  it("deepClone creates independent copy", () => {
    const original = { a: { b: [1, 2] } };
    const clone = deepClone(original);
    clone.a.b.push(3);
    expect(original.a.b).toEqual([1, 2]);
    expect(clone.a.b).toEqual([1, 2, 3]);
  });

  it("deepEqual compares objects", () => {
    expect(deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] })).toBe(true);
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(null, {})).toBe(false);
  });
});
