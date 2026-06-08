import { describe, it, expect } from "vitest";
import { SkipList } from "../skip-list-prob.js";

describe("SkipList", () => {
  it("insert and get", () => {
    const sl = new SkipList<number, string>();
    sl.insert(5, "five");
    sl.insert(3, "three");
    sl.insert(7, "seven");
    expect(sl.get(5)).toBe("five");
    expect(sl.get(3)).toBe("three");
    expect(sl.get(7)).toBe("seven");
  });

  it("returns undefined for missing keys", () => {
    const sl = new SkipList<number, string>();
    sl.insert(1, "one");
    expect(sl.get(99)).toBeUndefined();
  });

  it("updates value on duplicate insert", () => {
    const sl = new SkipList<number, string>();
    sl.insert(1, "old");
    sl.insert(1, "new");
    expect(sl.get(1)).toBe("new");
    expect(sl.size).toBe(1);
  });

  it("delete removes key", () => {
    const sl = new SkipList<number, string>();
    sl.insert(1, "a");
    sl.insert(2, "b");
    expect(sl.delete(1)).toBe(true);
    expect(sl.get(1)).toBeUndefined();
    expect(sl.size).toBe(1);
  });

  it("delete returns false for missing", () => {
    const sl = new SkipList<number, string>();
    expect(sl.delete(42)).toBe(false);
  });

  it("keys returns sorted keys", () => {
    const sl = new SkipList<number, number>();
    sl.insert(30, 3);
    sl.insert(10, 1);
    sl.insert(20, 2);
    expect(sl.keys()).toEqual([10, 20, 30]);
  });

  it("range query", () => {
    const sl = new SkipList<number, string>();
    for (let i = 0; i < 10; i++) sl.insert(i, `v${i}`);
    const range = sl.range(3, 6);
    expect(range.length).toBe(4);
    expect(range[0]).toEqual([3, "v3"]);
    expect(range[3]).toEqual([6, "v6"]);
  });

  it("works with string keys", () => {
    const sl = new SkipList<string, number>();
    sl.insert("banana", 2);
    sl.insert("apple", 1);
    sl.insert("cherry", 3);
    expect(sl.get("apple")).toBe(1);
    expect(sl.keys()).toEqual(["apple", "banana", "cherry"]);
  });
});
