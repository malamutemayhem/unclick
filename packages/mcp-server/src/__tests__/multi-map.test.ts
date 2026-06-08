import { describe, it, expect } from "vitest";
import { MultiMap } from "../multi-map.js";

describe("MultiMap", () => {
  it("stores multiple values per key", () => {
    const mm = new MultiMap<string, number>();
    mm.set("a", 1);
    mm.set("a", 2);
    expect(mm.get("a")).toEqual([1, 2]);
  });

  it("has checks key existence", () => {
    const mm = new MultiMap<string, number>();
    mm.set("x", 1);
    expect(mm.has("x")).toBe(true);
    expect(mm.has("y")).toBe(false);
  });

  it("hasValue checks specific value", () => {
    const mm = new MultiMap<string, number>();
    mm.set("a", 1);
    mm.set("a", 2);
    expect(mm.hasValue("a", 1)).toBe(true);
    expect(mm.hasValue("a", 3)).toBe(false);
  });

  it("delete removes key", () => {
    const mm = new MultiMap<string, number>();
    mm.set("a", 1);
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

  it("deleteValue removes key when empty", () => {
    const mm = new MultiMap<string, number>();
    mm.set("a", 1);
    mm.deleteValue("a", 1);
    expect(mm.has("a")).toBe(false);
  });

  it("totalValues counts all", () => {
    const mm = new MultiMap<string, number>();
    mm.set("a", 1); mm.set("a", 2);
    mm.set("b", 3);
    expect(mm.totalValues()).toBe(3);
  });

  it("keys and entries", () => {
    const mm = new MultiMap<string, number>();
    mm.set("x", 1);
    mm.set("y", 2);
    expect(mm.keys().sort()).toEqual(["x", "y"]);
    expect(mm.entries().length).toBe(2);
  });

  it("valuesFlat returns all values", () => {
    const mm = new MultiMap<string, number>();
    mm.set("a", 1); mm.set("b", 2); mm.set("a", 3);
    expect(mm.valuesFlat().sort()).toEqual([1, 2, 3]);
  });

  it("clear empties everything", () => {
    const mm = new MultiMap<string, number>();
    mm.set("a", 1);
    mm.clear();
    expect(mm.size).toBe(0);
  });
});
