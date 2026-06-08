import { describe, it, expect } from "vitest";
import { OrderedMap } from "../ordered-map.js";

describe("OrderedMap", () => {
  it("preserves insertion order", () => {
    const m = new OrderedMap<string, number>();
    m.set("b", 2);
    m.set("a", 1);
    m.set("c", 3);
    expect(m.keys()).toEqual(["b", "a", "c"]);
    expect(m.values()).toEqual([2, 1, 3]);
  });

  it("gets values by key", () => {
    const m = new OrderedMap<string, number>();
    m.set("a", 1);
    expect(m.get("a")).toBe(1);
    expect(m.get("b")).toBeUndefined();
  });

  it("updates existing key without reordering", () => {
    const m = new OrderedMap<string, number>();
    m.set("a", 1);
    m.set("b", 2);
    m.set("a", 10);
    expect(m.keys()).toEqual(["a", "b"]);
    expect(m.get("a")).toBe(10);
  });

  it("deletes keys", () => {
    const m = new OrderedMap<string, number>();
    m.set("a", 1);
    m.set("b", 2);
    m.delete("a");
    expect(m.keys()).toEqual(["b"]);
    expect(m.size).toBe(1);
  });

  it("first and last", () => {
    const m = new OrderedMap<string, number>();
    m.set("a", 1);
    m.set("b", 2);
    m.set("c", 3);
    expect(m.first()).toEqual(["a", 1]);
    expect(m.last()).toEqual(["c", 3]);
  });

  it("at with index", () => {
    const m = new OrderedMap<string, number>();
    m.set("a", 1);
    m.set("b", 2);
    expect(m.at(0)).toEqual(["a", 1]);
    expect(m.at(-1)).toEqual(["b", 2]);
    expect(m.at(5)).toBeUndefined();
  });

  it("entries", () => {
    const m = new OrderedMap<string, number>();
    m.set("x", 10);
    m.set("y", 20);
    expect(m.entries()).toEqual([["x", 10], ["y", 20]]);
  });

  it("is iterable", () => {
    const m = new OrderedMap<string, number>();
    m.set("a", 1);
    m.set("b", 2);
    expect([...m]).toEqual([["a", 1], ["b", 2]]);
  });

  it("clears all", () => {
    const m = new OrderedMap<string, number>();
    m.set("a", 1);
    m.clear();
    expect(m.size).toBe(0);
    expect(m.first()).toBeUndefined();
  });

  it("has checks existence", () => {
    const m = new OrderedMap<string, number>();
    m.set("a", 1);
    expect(m.has("a")).toBe(true);
    expect(m.has("b")).toBe(false);
  });
});
