import { describe, it, expect } from "vitest";
import { MultiMap } from "../multimap.js";

describe("MultiMap", () => {
  it("sets multiple values per key", () => {
    const m = new MultiMap<string, number>();
    m.set("a", 1);
    m.set("a", 2);
    expect(m.get("a")).toEqual([1, 2]);
  });

  it("tracks total size", () => {
    const m = new MultiMap<string, number>();
    m.set("a", 1);
    m.set("a", 2);
    m.set("b", 3);
    expect(m.size).toBe(3);
    expect(m.keyCount).toBe(2);
  });

  it("returns empty array for missing key", () => {
    const m = new MultiMap<string, number>();
    expect(m.get("x")).toEqual([]);
  });

  it("has checks key existence", () => {
    const m = new MultiMap<string, number>();
    m.set("a", 1);
    expect(m.has("a")).toBe(true);
    expect(m.has("b")).toBe(false);
  });

  it("deletes all values for key", () => {
    const m = new MultiMap<string, number>();
    m.set("a", 1);
    m.set("a", 2);
    expect(m.delete("a")).toBe(true);
    expect(m.get("a")).toEqual([]);
    expect(m.size).toBe(0);
  });

  it("deletes specific value", () => {
    const m = new MultiMap<string, number>();
    m.set("a", 1);
    m.set("a", 2);
    m.set("a", 3);
    expect(m.delete("a", 2)).toBe(true);
    expect(m.get("a")).toEqual([1, 3]);
    expect(m.size).toBe(2);
  });

  it("returns false when deleting non-existent", () => {
    const m = new MultiMap<string, number>();
    expect(m.delete("x")).toBe(false);
    m.set("a", 1);
    expect(m.delete("a", 99)).toBe(false);
  });

  it("removes key when last value deleted", () => {
    const m = new MultiMap<string, number>();
    m.set("a", 1);
    m.delete("a", 1);
    expect(m.has("a")).toBe(false);
  });

  it("keys, values, entries", () => {
    const m = new MultiMap<string, number>();
    m.set("a", 1);
    m.set("a", 2);
    m.set("b", 3);
    expect(m.keys()).toEqual(["a", "b"]);
    expect(m.values()).toEqual([1, 2, 3]);
    expect(m.entries()).toEqual([["a", [1, 2]], ["b", [3]]]);
  });

  it("clears everything", () => {
    const m = new MultiMap<string, number>();
    m.set("a", 1);
    m.set("b", 2);
    m.clear();
    expect(m.size).toBe(0);
    expect(m.keyCount).toBe(0);
  });
});
