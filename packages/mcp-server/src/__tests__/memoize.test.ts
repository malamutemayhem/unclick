import { describe, it, expect, vi } from "vitest";
import { memoize, memoizeAsync } from "../memoize.js";

describe("memoize", () => {
  it("caches return values", () => {
    const fn = vi.fn((x: number) => x * 2);
    const memo = memoize(fn);
    expect(memo(5)).toBe(10);
    expect(memo(5)).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("different args get separate cache entries", () => {
    const fn = vi.fn((x: number) => x * 2);
    const memo = memoize(fn);
    expect(memo(1)).toBe(2);
    expect(memo(2)).toBe(4);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("respects maxSize", () => {
    const fn = vi.fn((x: number) => x);
    const memo = memoize(fn, { maxSize: 2 });
    memo(1);
    memo(2);
    memo(3);
    expect(memo.cache.size).toBe(2);
  });

  it("respects ttlMs", () => {
    vi.useFakeTimers();
    const fn = vi.fn((x: number) => x);
    const memo = memoize(fn, { ttlMs: 1000 });
    memo(1);
    vi.advanceTimersByTime(1500);
    memo(1);
    expect(fn).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it("supports custom keyFn", () => {
    const fn = vi.fn((a: string, b: string) => a + b);
    const memo = memoize(fn, { keyFn: (a) => a });
    memo("hello", " world");
    memo("hello", " there");
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe("memoizeAsync", () => {
  it("caches resolved promises", async () => {
    const fn = vi.fn(async (x: number) => x * 2);
    const memo = memoizeAsync(fn);
    expect(await memo(5)).toBe(10);
    expect(await memo(5)).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("evicts on rejection", async () => {
    let fail = true;
    const fn = vi.fn(async (x: number) => {
      if (fail) throw new Error("fail");
      return x;
    });
    const memo = memoizeAsync(fn);
    await expect(memo(1)).rejects.toThrow();
    fail = false;
    expect(await memo(1)).toBe(1);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
