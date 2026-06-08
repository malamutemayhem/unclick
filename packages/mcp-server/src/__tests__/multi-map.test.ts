import { describe, it, expect } from "vitest";
import { MultiMap } from "../multi-map.js";

describe("MultiMap", () => {
  it("adds multiple values per key", () => {
    const mm = new MultiMap<string, number>();
    mm.add("a", 1);
    mm.add("a", 2);
    mm.add("a", 3);
    expect(mm.get("a")).toEqual([1, 2, 3]);
  });

  it("returns empty array for missing key", () => {
    const mm = new MultiMap<string, number>();
    expect(mm.get("nope")).toEqual([]);
  });

  it("has checks key existence", () => {
    const mm = new MultiMap<string, number>();
    mm.add("a", 1);
    expect(mm.has("a")).toBe(true);
    expect(mm.has("b")).toBe(false);
  });

  it("delete removes entire key", () => {
    const mm = new MultiMap<string, number>();
    mm.add("a", 1);
    mm.add("a", 2);
    expect(mm.delete("a")).toBe(true);
    expect(mm.has("a")).toBe(false);
  });

  it("removeValue removes specific value", () => {
    const mm = new MultiMap<string, number>();
    mm.add("a", 1);
    mm.add("a", 2);
    mm.add("a", 3);
    expect(mm.removeValue("a", 2)).toBe(true);
    expect(mm.get("a")).toEqual([1, 3]);
  });

  it("removeValue deletes key when empty", () => {
    const mm = new MultiMap<string, number>();
    mm.add("a", 1);
    mm.removeValue("a", 1);
    expect(mm.has("a")).toBe(false);
  });

  it("tracks keyCount and totalValues", () => {
    const mm = new MultiMap<string, number>();
    mm.add("a", 1);
    mm.add("a", 2);
    mm.add("b", 3);
    expect(mm.keyCount).toBe(2);
    expect(mm.totalValues).toBe(3);
  });

  it("values returns flat list", () => {
    const mm = new MultiMap<string, number>();
    mm.add("a", 1);
    mm.add("b", 2);
    mm.add("a", 3);
    expect(mm.values().sort()).toEqual([1, 2, 3]);
  });

  it("clear empties everything", () => {
    const mm = new MultiMap<string, number>();
    mm.add("a", 1);
    mm.add("b", 2);
    mm.clear();
    expect(mm.keyCount).toBe(0);
    expect(mm.totalValues).toBe(0);
  });

  it("forEach iterates keys with values", () => {
    const mm = new MultiMap<string, number>();
    mm.add("x", 10);
    mm.add("x", 20);
    const collected: Array<[string, readonly number[]]> = [];
    mm.forEach((k, v) => collected.push([k, v]));
    expect(collected).toEqual([["x", [10, 20]]]);
  });
});
