import { describe, it, expect } from "vitest";
import { SkipList } from "../skip-list.js";

describe("SkipList", () => {
  it("insert and get", () => {
    const sl = new SkipList<number, string>();
    sl.insert(3, "three");
    sl.insert(1, "one");
    sl.insert(2, "two");
    expect(sl.get(1)).toBe("one");
    expect(sl.get(2)).toBe("two");
    expect(sl.get(3)).toBe("three");
  });

  it("get returns undefined for missing", () => {
    const sl = new SkipList<number, string>();
    expect(sl.get(99)).toBeUndefined();
  });

  it("has checks existence", () => {
    const sl = new SkipList<number, string>();
    sl.insert(1, "x");
    expect(sl.has(1)).toBe(true);
    expect(sl.has(2)).toBe(false);
  });

  it("update existing key", () => {
    const sl = new SkipList<number, string>();
    sl.insert(1, "old");
    sl.insert(1, "new");
    expect(sl.get(1)).toBe("new");
    expect(sl.size).toBe(1);
  });

  it("delete removes entry", () => {
    const sl = new SkipList<number, string>();
    sl.insert(1, "a");
    sl.insert(2, "b");
    expect(sl.delete(1)).toBe(true);
    expect(sl.has(1)).toBe(false);
    expect(sl.size).toBe(1);
  });

  it("delete returns false for missing", () => {
    const sl = new SkipList<number, string>();
    expect(sl.delete(1)).toBe(false);
  });

  it("entries returns sorted pairs", () => {
    const sl = new SkipList<number, string>();
    sl.insert(3, "c");
    sl.insert(1, "a");
    sl.insert(2, "b");
    expect(sl.entries()).toEqual([[1, "a"], [2, "b"], [3, "c"]]);
  });

  it("works with string keys", () => {
    const sl = new SkipList<string, number>();
    sl.insert("banana", 2);
    sl.insert("apple", 1);
    sl.insert("cherry", 3);
    expect(sl.get("apple")).toBe(1);
    expect(sl.entries()[0][0]).toBe("apple");
  });

  it("size tracks count", () => {
    const sl = new SkipList<number, number>();
    expect(sl.size).toBe(0);
    sl.insert(1, 1);
    sl.insert(2, 2);
    expect(sl.size).toBe(2);
    sl.delete(1);
    expect(sl.size).toBe(1);
  });
});
