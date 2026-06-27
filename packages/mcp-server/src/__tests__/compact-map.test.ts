import { describe, it, expect } from "vitest";
import { CompactMap } from "../compact-map.js";

describe("CompactMap", () => {
  it("set and get", () => {
    const m = new CompactMap<number>();
    m.set("a", 1);
    m.set("b", 2);
    expect(m.get("a")).toBe(1);
    expect(m.get("b")).toBe(2);
  });

  it("overwrites existing key", () => {
    const m = new CompactMap<number>();
    m.set("a", 1);
    m.set("a", 10);
    expect(m.get("a")).toBe(10);
    expect(m.size).toBe(1);
  });

  it("get returns undefined for missing", () => {
    const m = new CompactMap<number>();
    expect(m.get("x")).toBeUndefined();
  });

  it("has checks existence", () => {
    const m = new CompactMap<number>();
    m.set("x", 1);
    expect(m.has("x")).toBe(true);
    expect(m.has("y")).toBe(false);
  });

  it("delete removes entry", () => {
    const m = new CompactMap<number>();
    m.set("a", 1);
    expect(m.delete("a")).toBe(true);
    expect(m.has("a")).toBe(false);
    expect(m.size).toBe(0);
  });

  it("entries returns pairs", () => {
    const m = new CompactMap<number>();
    m.set("a", 1);
    m.set("b", 2);
    expect(m.entries()).toEqual([["a", 1], ["b", 2]]);
  });

  it("keysArray and valuesArray", () => {
    const m = new CompactMap<number>();
    m.set("x", 10);
    m.set("y", 20);
    expect(m.keysArray()).toEqual(["x", "y"]);
    expect(m.valuesArray()).toEqual([10, 20]);
  });

  it("clear empties map", () => {
    const m = new CompactMap<number>();
    m.set("a", 1);
    m.clear();
    expect(m.size).toBe(0);
  });

  it("toObject converts to record", () => {
    const m = new CompactMap<number>();
    m.set("a", 1);
    m.set("b", 2);
    expect(m.toObject()).toEqual({ a: 1, b: 2 });
  });
});
