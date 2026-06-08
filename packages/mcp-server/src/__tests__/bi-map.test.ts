import { describe, it, expect } from "vitest";
import { BiMap } from "../bi-map.js";

describe("BiMap", () => {
  it("set and get by key", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    expect(bm.get("a")).toBe(1);
  });

  it("getKey reverse lookup", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    expect(bm.getKey(1)).toBe("a");
  });

  it("overwrites old value when key is reused", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    bm.set("a", 2);
    expect(bm.get("a")).toBe(2);
    expect(bm.getKey(1)).toBeUndefined();
    expect(bm.getKey(2)).toBe("a");
    expect(bm.size).toBe(1);
  });

  it("overwrites old key when value is reused", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    bm.set("b", 1);
    expect(bm.get("a")).toBeUndefined();
    expect(bm.get("b")).toBe(1);
    expect(bm.getKey(1)).toBe("b");
    expect(bm.size).toBe(1);
  });

  it("hasKey and hasValue", () => {
    const bm = new BiMap<string, number>();
    bm.set("x", 10);
    expect(bm.hasKey("x")).toBe(true);
    expect(bm.hasKey("y")).toBe(false);
    expect(bm.hasValue(10)).toBe(true);
    expect(bm.hasValue(20)).toBe(false);
  });

  it("deleteKey removes pair", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    expect(bm.deleteKey("a")).toBe(true);
    expect(bm.get("a")).toBeUndefined();
    expect(bm.getKey(1)).toBeUndefined();
    expect(bm.size).toBe(0);
  });

  it("deleteValue removes pair", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    expect(bm.deleteValue(1)).toBe(true);
    expect(bm.get("a")).toBeUndefined();
    expect(bm.size).toBe(0);
  });

  it("clear removes everything", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    bm.set("b", 2);
    bm.clear();
    expect(bm.size).toBe(0);
  });

  it("forEach iterates all pairs", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    bm.set("b", 2);
    const pairs: Array<[string, number]> = [];
    bm.forEach((v, k) => pairs.push([k, v]));
    expect(pairs.sort()).toEqual([["a", 1], ["b", 2]]);
  });

  it("entries returns iterator", () => {
    const bm = new BiMap<string, number>();
    bm.set("x", 5);
    const entries = [...bm.entries()];
    expect(entries).toEqual([["x", 5]]);
  });
});
