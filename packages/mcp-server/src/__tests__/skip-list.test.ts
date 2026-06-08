import { describe, it, expect } from "vitest";
import { SkipList } from "../skip-list.js";

const numCompare = (a: number, b: number) => a - b;

describe("SkipList", () => {
  it("starts empty", () => {
    const sl = new SkipList<number, string>(numCompare);
    expect(sl.size).toBe(0);
  });

  it("set and get", () => {
    const sl = new SkipList<number, string>(numCompare);
    sl.set(5, "five");
    expect(sl.get(5)).toBe("five");
  });

  it("get returns undefined for missing key", () => {
    const sl = new SkipList<number, string>(numCompare);
    expect(sl.get(99)).toBeUndefined();
  });

  it("has checks existence", () => {
    const sl = new SkipList<number, string>(numCompare);
    sl.set(1, "one");
    expect(sl.has(1)).toBe(true);
    expect(sl.has(2)).toBe(false);
  });

  it("set overwrites existing key", () => {
    const sl = new SkipList<number, string>(numCompare);
    sl.set(1, "one");
    sl.set(1, "ONE");
    expect(sl.get(1)).toBe("ONE");
    expect(sl.size).toBe(1);
  });

  it("delete removes key", () => {
    const sl = new SkipList<number, string>(numCompare);
    sl.set(1, "one");
    expect(sl.delete(1)).toBe(true);
    expect(sl.has(1)).toBe(false);
    expect(sl.size).toBe(0);
  });

  it("delete returns false for missing key", () => {
    const sl = new SkipList<number, string>(numCompare);
    expect(sl.delete(99)).toBe(false);
  });

  it("keys returns sorted keys", () => {
    const sl = new SkipList<number, string>(numCompare);
    sl.set(3, "c");
    sl.set(1, "a");
    sl.set(2, "b");
    expect(sl.keys()).toEqual([1, 2, 3]);
  });

  it("entries returns sorted entries", () => {
    const sl = new SkipList<number, string>(numCompare);
    sl.set(2, "b");
    sl.set(1, "a");
    expect(sl.entries()).toEqual([[1, "a"], [2, "b"]]);
  });

  it("handles many elements", () => {
    const sl = new SkipList<number, number>(numCompare);
    for (let i = 100; i > 0; i--) sl.set(i, i * 10);
    expect(sl.size).toBe(100);
    expect(sl.get(50)).toBe(500);
    expect(sl.keys()[0]).toBe(1);
    expect(sl.keys()[99]).toBe(100);
  });
});
