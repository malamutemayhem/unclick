import { describe, it, expect, vi } from "vitest";
import { TTLCache, MemoCache } from "../cache.js";

describe("TTLCache", () => {
  it("set and get", () => {
    const c = new TTLCache<string, number>(10000);
    c.set("a", 1);
    expect(c.get("a")).toBe(1);
  });
  it("returns undefined for missing", () => {
    const c = new TTLCache<string, number>();
    expect(c.get("x")).toBeUndefined();
  });
  it("expires entries", () => {
    const c = new TTLCache<string, number>();
    c.set("a", 1, -1);
    expect(c.get("a")).toBeUndefined();
  });
  it("has", () => {
    const c = new TTLCache<string, number>(10000);
    c.set("a", 1);
    expect(c.has("a")).toBe(true);
    expect(c.has("b")).toBe(false);
  });
  it("delete", () => {
    const c = new TTLCache<string, number>(10000);
    c.set("a", 1);
    expect(c.delete("a")).toBe(true);
    expect(c.get("a")).toBeUndefined();
  });
  it("clear", () => {
    const c = new TTLCache<string, number>(10000);
    c.set("a", 1); c.set("b", 2);
    c.clear();
    expect(c.get("a")).toBeUndefined();
  });
  it("keys", () => {
    const c = new TTLCache<string, number>(10000);
    c.set("a", 1); c.set("b", 2);
    expect(c.keys().sort()).toEqual(["a", "b"]);
  });
});

describe("MemoCache", () => {
  it("caches results", () => {
    const mc = new MemoCache();
    let calls = 0;
    const fn = mc.memoize((x: number) => { calls++; return x * 2; });
    expect(fn(5)).toBe(10);
    expect(fn(5)).toBe(10);
    expect(calls).toBe(1);
  });
  it("different args get different results", () => {
    const mc = new MemoCache();
    const fn = mc.memoize((x: number) => x * 2);
    expect(fn(3)).toBe(6);
    expect(fn(4)).toBe(8);
    expect(mc.size).toBe(2);
  });
  it("clear resets cache", () => {
    const mc = new MemoCache();
    const fn = mc.memoize((x: number) => x);
    fn(1);
    mc.clear();
    expect(mc.size).toBe(0);
  });
});
