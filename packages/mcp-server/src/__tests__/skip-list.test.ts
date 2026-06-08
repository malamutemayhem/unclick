import { describe, it, expect } from "vitest";
import { SkipList } from "../skip-list.js";

describe("SkipList", () => {
  it("insert and get", () => {
    const sl = new SkipList<string>();
    sl.insert(5, "five");
    sl.insert(3, "three");
    sl.insert(8, "eight");
    expect(sl.get(5)).toBe("five");
    expect(sl.get(3)).toBe("three");
    expect(sl.get(8)).toBe("eight");
  });

  it("returns undefined for missing keys", () => {
    const sl = new SkipList<string>();
    expect(sl.get(1)).toBeUndefined();
  });

  it("has checks existence", () => {
    const sl = new SkipList<string>();
    sl.insert(10, "ten");
    expect(sl.has(10)).toBe(true);
    expect(sl.has(20)).toBe(false);
  });

  it("updates existing key", () => {
    const sl = new SkipList<string>();
    sl.insert(1, "old");
    sl.insert(1, "new");
    expect(sl.get(1)).toBe("new");
    expect(sl.size).toBe(1);
  });

  it("delete removes key", () => {
    const sl = new SkipList<string>();
    sl.insert(1, "a");
    sl.insert(2, "b");
    expect(sl.delete(1)).toBe(true);
    expect(sl.has(1)).toBe(false);
    expect(sl.size).toBe(1);
  });

  it("delete returns false for missing key", () => {
    const sl = new SkipList<string>();
    expect(sl.delete(99)).toBe(false);
  });

  it("toArray returns sorted entries", () => {
    const sl = new SkipList<string>();
    sl.insert(30, "c");
    sl.insert(10, "a");
    sl.insert(20, "b");
    expect(sl.toArray()).toEqual([
      { key: 10, value: "a" },
      { key: 20, value: "b" },
      { key: 30, value: "c" },
    ]);
  });

  it("handles many insertions", () => {
    const sl = new SkipList<number>();
    for (let i = 0; i < 100; i++) {
      sl.insert(i, i * 10);
    }
    expect(sl.size).toBe(100);
    expect(sl.get(50)).toBe(500);
    expect(sl.get(99)).toBe(990);
  });
});
