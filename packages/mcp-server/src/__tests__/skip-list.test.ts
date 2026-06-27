import { describe, it, expect } from "vitest";
import { SkipList } from "../skip-list.js";

describe("SkipList", () => {
  it("insert and get", () => {
    const sl = new SkipList<number, string>();
    sl.insert(5, "five");
    sl.insert(3, "three");
    sl.insert(7, "seven");
    expect(sl.get(5)).toBe("five");
    expect(sl.get(3)).toBe("three");
  });

  it("has checks existence", () => {
    const sl = new SkipList<number, string>();
    sl.insert(1, "one");
    expect(sl.has(1)).toBe(true);
    expect(sl.has(2)).toBe(false);
  });

  it("update existing key", () => {
    const sl = new SkipList<number, string>();
    sl.insert(1, "a");
    sl.insert(1, "b");
    expect(sl.get(1)).toBe("b");
  });

  it("delete removes key", () => {
    const sl = new SkipList<number, string>();
    sl.insert(1, "a");
    sl.insert(2, "b");
    expect(sl.delete(1)).toBe(true);
    expect(sl.has(1)).toBe(false);
    expect(sl.size).toBe(1);
  });

  it("delete returns false for missing", () => {
    const sl = new SkipList<number, string>();
    expect(sl.delete(99)).toBe(false);
  });

  it("entries returns sorted pairs", () => {
    const sl = new SkipList<number, string>();
    sl.insert(3, "c");
    sl.insert(1, "a");
    sl.insert(2, "b");
    const entries = sl.entries();
    expect(entries.map(([k]) => k)).toEqual([1, 2, 3]);
  });

  it("tracks size", () => {
    const sl = new SkipList<string, number>();
    sl.insert("x", 1);
    sl.insert("y", 2);
    expect(sl.size).toBe(2);
  });

  it("works with string keys", () => {
    const sl = new SkipList<string, number>();
    sl.insert("banana", 2);
    sl.insert("apple", 1);
    sl.insert("cherry", 3);
    expect(sl.get("apple")).toBe(1);
    expect(sl.entries()[0][0]).toBe("apple");
  });
});
