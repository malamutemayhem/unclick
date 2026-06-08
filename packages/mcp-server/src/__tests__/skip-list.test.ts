import { describe, it, expect } from "vitest";
import { SkipList } from "../skip-list.js";

describe("SkipList", () => {
  it("sets and gets values", () => {
    const sl = new SkipList<number, string>();
    sl.set(1, "a");
    sl.set(2, "b");
    sl.set(3, "c");
    expect(sl.get(1)).toBe("a");
    expect(sl.get(2)).toBe("b");
    expect(sl.get(3)).toBe("c");
  });

  it("overwrites existing keys", () => {
    const sl = new SkipList<number, string>();
    sl.set(1, "old");
    sl.set(1, "new");
    expect(sl.get(1)).toBe("new");
    expect(sl.size).toBe(1);
  });

  it("returns undefined for missing keys", () => {
    const sl = new SkipList<number, string>();
    expect(sl.get(99)).toBeUndefined();
  });

  it("has checks existence", () => {
    const sl = new SkipList<string, number>();
    sl.set("x", 1);
    expect(sl.has("x")).toBe(true);
    expect(sl.has("y")).toBe(false);
  });

  it("deletes keys", () => {
    const sl = new SkipList<number, string>();
    sl.set(1, "a");
    sl.set(2, "b");
    expect(sl.delete(1)).toBe(true);
    expect(sl.get(1)).toBeUndefined();
    expect(sl.size).toBe(1);
    expect(sl.delete(99)).toBe(false);
  });

  it("toArray returns sorted entries", () => {
    const sl = new SkipList<number, string>();
    sl.set(3, "c");
    sl.set(1, "a");
    sl.set(2, "b");
    const arr = sl.toArray();
    expect(arr.map((e) => e.key)).toEqual([1, 2, 3]);
    expect(arr.map((e) => e.value)).toEqual(["a", "b", "c"]);
  });

  it("tracks size", () => {
    const sl = new SkipList<number, number>();
    expect(sl.size).toBe(0);
    sl.set(1, 1);
    sl.set(2, 2);
    expect(sl.size).toBe(2);
    sl.delete(1);
    expect(sl.size).toBe(1);
  });
});
