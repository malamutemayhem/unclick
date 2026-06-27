import { describe, it, expect, vi } from "vitest";
import { lazy, lazyAsync, LazyMap, Memo } from "../lazy.js";

describe("lazy", () => {
  it("calls factory only once", () => {
    const factory = vi.fn(() => 42);
    const get = lazy(factory);
    expect(get()).toBe(42);
    expect(get()).toBe(42);
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it("returns same value each time", () => {
    const obj = {};
    const get = lazy(() => obj);
    expect(get()).toBe(obj);
    expect(get()).toBe(obj);
  });
});

describe("lazyAsync", () => {
  it("calls factory only once", async () => {
    const factory = vi.fn(() => Promise.resolve(99));
    const get = lazyAsync(factory);
    expect(await get()).toBe(99);
    expect(await get()).toBe(99);
    expect(factory).toHaveBeenCalledTimes(1);
  });
});

describe("LazyMap", () => {
  it("creates value on first access", () => {
    const factory = vi.fn((k: string) => k.toUpperCase());
    const map = new LazyMap(factory);
    expect(map.get("hello")).toBe("HELLO");
    expect(map.get("hello")).toBe("HELLO");
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it("tracks size and has", () => {
    const map = new LazyMap((k: number) => k * 2);
    map.get(5);
    expect(map.size).toBe(1);
    expect(map.has(5)).toBe(true);
    expect(map.has(6)).toBe(false);
  });

  it("delete and clear", () => {
    const map = new LazyMap((k: number) => k);
    map.get(1); map.get(2);
    map.delete(1);
    expect(map.size).toBe(1);
    map.clear();
    expect(map.size).toBe(0);
  });
});

describe("Memo", () => {
  it("recomputes when deps change", () => {
    const factory = vi.fn((x: unknown) => (x as number) * 2);
    const memo = new Memo(factory);
    expect(memo.get(5)).toBe(10);
    expect(memo.get(5)).toBe(10);
    expect(factory).toHaveBeenCalledTimes(1);
    expect(memo.get(6)).toBe(12);
    expect(factory).toHaveBeenCalledTimes(2);
  });

  it("invalidate forces recompute", () => {
    const factory = vi.fn(() => Math.random());
    const memo = new Memo(factory);
    const first = memo.get();
    memo.invalidate();
    const second = memo.get();
    expect(factory).toHaveBeenCalledTimes(2);
  });
});
