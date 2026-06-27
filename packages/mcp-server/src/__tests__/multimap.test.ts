import { describe, it, expect } from "vitest";
import { MultiMap } from "../multimap.js";

describe("MultiMap", () => {
  it("stores multiple values per key", () => {
    const mm = new MultiMap<string, number>();
    mm.set("a", 1);
    mm.set("a", 2);
    expect(mm.get("a")).toEqual([1, 2]);
  });

  it("returns empty for missing key", () => {
    const mm = new MultiMap<string, number>();
    expect(mm.get("nope")).toEqual([]);
  });

  it("has and hasValue", () => {
    const mm = new MultiMap<string, number>();
    mm.set("a", 1);
    expect(mm.has("a")).toBe(true);
    expect(mm.hasValue("a", 1)).toBe(true);
    expect(mm.hasValue("a", 2)).toBe(false);
  });

  it("delete removes all values", () => {
    const mm = new MultiMap<string, number>();
    mm.set("a", 1);
    mm.set("a", 2);
    mm.delete("a");
    expect(mm.has("a")).toBe(false);
  });

  it("deleteValue removes single value", () => {
    const mm = new MultiMap<string, number>();
    mm.set("a", 1);
    mm.set("a", 2);
    mm.deleteValue("a", 1);
    expect(mm.get("a")).toEqual([2]);
  });

  it("tracks size and totalValues", () => {
    const mm = new MultiMap<string, number>();
    mm.set("a", 1);
    mm.set("a", 2);
    mm.set("b", 3);
    expect(mm.size).toBe(2);
    expect(mm.totalValues).toBe(3);
  });

  it("iterates all pairs", () => {
    const mm = new MultiMap<string, number>();
    mm.set("a", 1);
    mm.set("a", 2);
    const pairs = [...mm];
    expect(pairs).toEqual([["a", 1], ["a", 2]]);
  });

  it("clear empties the map", () => {
    const mm = new MultiMap<string, number>();
    mm.set("a", 1);
    mm.clear();
    expect(mm.size).toBe(0);
  });
});
