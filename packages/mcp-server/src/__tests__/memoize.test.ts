import { describe, it, expect, vi } from "vitest";
import { memoize } from "../memoize.js";

describe("memoize", () => {
  it("caches results", () => {
    const fn = vi.fn((x: number) => x * 2);
    const m = memoize(fn);
    expect(m(5)).toBe(10);
    expect(m(5)).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("different args get different results", () => {
    const fn = vi.fn((x: number) => x * 2);
    const m = memoize(fn);
    expect(m(3)).toBe(6);
    expect(m(4)).toBe(8);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("respects maxSize", () => {
    const fn = vi.fn((x: number) => x);
    const m = memoize(fn, { maxSize: 2 });
    m(1);
    m(2);
    m(3);
    expect(m.cache.size).toBe(2);
  });

  it("respects ttl", () => {
    const fn = vi.fn((x: number) => x);
    const now = Date.now();
    vi.spyOn(Date, "now").mockReturnValue(now);
    const m = memoize(fn, { ttl: 100 });
    m(1);
    expect(fn).toHaveBeenCalledTimes(1);

    vi.spyOn(Date, "now").mockReturnValue(now + 200);
    m(1);
    expect(fn).toHaveBeenCalledTimes(2);
    vi.restoreAllMocks();
  });

  it("clear empties cache", () => {
    const m = memoize((x: number) => x);
    m(1);
    m(2);
    m.clear();
    expect(m.cache.size).toBe(0);
  });

  it("has checks cache presence", () => {
    const m = memoize((x: number) => x);
    expect(m.has(1)).toBe(false);
    m(1);
    expect(m.has(1)).toBe(true);
  });

  it("custom key function", () => {
    const fn = vi.fn((a: number, b: number) => a + b);
    const m = memoize(fn, { keyFn: (a, b) => `${a}+${b}` });
    m(1, 2);
    m(1, 2);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("delete removes specific entry", () => {
    const m = memoize((x: number) => x * 2);
    m(5);
    expect(m.has(5)).toBe(true);
    m.delete("[5]");
    expect(m.has(5)).toBe(false);
  });
});
