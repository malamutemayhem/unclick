import { describe, it, expect } from "vitest";
import { SkipListMap } from "../skip-list-map.js";

describe("SkipListMap", () => {
  it("set and get store and retrieve values", () => {
    const m = new SkipListMap<number, string>();
    m.set(1, "one");
    m.set(2, "two");
    expect(m.get(1)).toBe("one");
    expect(m.get(2)).toBe("two");
  });

  it("set overwrites existing keys", () => {
    const m = new SkipListMap<string, number>();
    m.set("a", 1);
    m.set("a", 2);
    expect(m.get("a")).toBe(2);
    expect(m.size()).toBe(1);
  });

  it("get returns undefined for missing keys", () => {
    const m = new SkipListMap<number, number>();
    expect(m.get(999)).toBeUndefined();
  });

  it("has checks key existence", () => {
    const m = new SkipListMap<number, string>();
    m.set(5, "five");
    expect(m.has(5)).toBe(true);
    expect(m.has(6)).toBe(false);
  });

  it("delete removes a key", () => {
    const m = new SkipListMap<number, string>();
    m.set(1, "a");
    m.set(2, "b");
    expect(m.delete(1)).toBe(true);
    expect(m.has(1)).toBe(false);
    expect(m.size()).toBe(1);
  });

  it("delete returns false for missing key", () => {
    const m = new SkipListMap<number, string>();
    expect(m.delete(42)).toBe(false);
  });

  it("keys returns sorted keys", () => {
    const m = new SkipListMap<number, string>();
    m.set(3, "c");
    m.set(1, "a");
    m.set(2, "b");
    expect(m.keys()).toEqual([1, 2, 3]);
  });

  it("values returns values in key order", () => {
    const m = new SkipListMap<number, string>();
    m.set(2, "b");
    m.set(1, "a");
    expect(m.values()).toEqual(["a", "b"]);
  });

  it("entries returns key-value pairs in order", () => {
    const m = new SkipListMap<number, string>();
    m.set(3, "c");
    m.set(1, "a");
    expect(m.entries()).toEqual([[1, "a"], [3, "c"]]);
  });

  it("clear resets the map", () => {
    const m = new SkipListMap<number, number>();
    m.set(1, 10);
    m.set(2, 20);
    m.clear();
    expect(m.size()).toBe(0);
    expect(m.keys()).toEqual([]);
  });
});
