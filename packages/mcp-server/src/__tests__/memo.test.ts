import { describe, it, expect, vi } from "vitest";
import { memo, memoAsync } from "../memo.js";

describe("memo", () => {
  it("caches results", () => {
    const fn = vi.fn((x: number) => x * 2);
    const memoized = memo(fn);
    expect(memoized(5)).toBe(10);
    expect(memoized(5)).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("different args produce different results", () => {
    const fn = vi.fn((x: number) => x * 2);
    const memoized = memo(fn);
    expect(memoized(5)).toBe(10);
    expect(memoized(3)).toBe(6);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("respects maxSize", () => {
    const fn = vi.fn((x: number) => x);
    const memoized = memo(fn, { maxSize: 2 });
    memoized(1);
    memoized(2);
    memoized(3);
    expect(memoized.size).toBe(2);
    memoized(1);
    expect(fn).toHaveBeenCalledTimes(4);
  });

  it("clears cache", () => {
    const fn = vi.fn((x: number) => x);
    const memoized = memo(fn);
    memoized(1);
    memoized.clear();
    expect(memoized.size).toBe(0);
    memoized(1);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("supports custom key function", () => {
    const fn = vi.fn((a: number, b: number) => a + b);
    const memoized = memo(fn, { keyFn: (a: number, b: number) => `${a}+${b}` });
    memoized(1, 2);
    memoized(1, 2);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe("memoAsync", () => {
  it("caches async results", async () => {
    const fn = vi.fn(async (x: number) => x * 2);
    const memoized = memoAsync(fn);
    expect(await memoized(5)).toBe(10);
    expect(await memoized(5)).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("evicts on rejection", async () => {
    let fail = true;
    const fn = vi.fn(async (x: number) => {
      if (fail) throw new Error("fail");
      return x;
    });
    const memoized = memoAsync(fn);
    await expect(memoized(1)).rejects.toThrow("fail");
    fail = false;
    expect(await memoized(1)).toBe(1);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
