import { describe, it, expect } from "vitest";
import { SkipList } from "../skip-list.js";

describe("SkipList", () => {
  const numCompare = (a: number, b: number) => a - b;

  it("insert and get", () => {
    const sl = new SkipList<number, string>(numCompare);
    sl.insert(3, "three");
    sl.insert(1, "one");
    sl.insert(2, "two");
    expect(sl.get(1)).toBe("one");
    expect(sl.get(2)).toBe("two");
    expect(sl.get(3)).toBe("three");
    expect(sl.get(4)).toBeUndefined();
  });

  it("updates existing key", () => {
    const sl = new SkipList<number, string>(numCompare);
    sl.insert(1, "one");
    sl.insert(1, "ONE");
    expect(sl.get(1)).toBe("ONE");
    expect(sl.size).toBe(1);
  });

  it("delete removes key", () => {
    const sl = new SkipList<number, string>(numCompare);
    sl.insert(1, "a");
    sl.insert(2, "b");
    sl.insert(3, "c");
    expect(sl.delete(2)).toBe(true);
    expect(sl.get(2)).toBeUndefined();
    expect(sl.size).toBe(2);
    expect(sl.delete(99)).toBe(false);
  });

  it("toArray returns sorted order", () => {
    const sl = new SkipList<number, string>(numCompare);
    sl.insert(5, "e");
    sl.insert(1, "a");
    sl.insert(3, "c");
    const arr = sl.toArray();
    expect(arr.map((x) => x.key)).toEqual([1, 3, 5]);
  });

  it("handles string keys", () => {
    const sl = new SkipList<string, number>((a, b) => a.localeCompare(b));
    sl.insert("banana", 2);
    sl.insert("apple", 1);
    sl.insert("cherry", 3);
    expect(sl.toArray().map((x) => x.key)).toEqual(["apple", "banana", "cherry"]);
  });
});
