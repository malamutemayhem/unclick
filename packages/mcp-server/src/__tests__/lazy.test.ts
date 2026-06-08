import { describe, it, expect, vi } from "vitest";
import { Lazy, lazy, lazyAsync, memoizeLazy } from "../lazy.js";

describe("lazy", () => {
  it("defers computation until value is accessed", () => {
    const fn = vi.fn(() => 42);
    const lz = new Lazy(fn);
    expect(fn).not.toHaveBeenCalled();
    expect(lz.value).toBe(42);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("caches the result", () => {
    const fn = vi.fn(() => Math.random());
    const lz = lazy(fn);
    const first = lz.value;
    const second = lz.value;
    expect(first).toBe(second);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("isInitialized tracks state", () => {
    const lz = lazy(() => "x");
    expect(lz.isInitialized).toBe(false);
    lz.value;
    expect(lz.isInitialized).toBe(true);
  });

  it("map creates a new lazy", () => {
    const lz = lazy(() => 5).map((n) => n * 2);
    expect(lz.value).toBe(10);
  });

  it("flatMap chains lazy values", () => {
    const lz = lazy(() => 3).flatMap((n) => lazy(() => n + 10));
    expect(lz.value).toBe(13);
  });

  it("lazyAsync defers and caches promise", async () => {
    let calls = 0;
    const fn = lazyAsync(async () => { calls++; return 99; });
    const a = fn();
    const b = fn();
    expect(await a).toBe(99);
    expect(await b).toBe(99);
    expect(calls).toBe(1);
  });

  it("memoizeLazy caches per key", () => {
    const fn = vi.fn((key: string) => key.toUpperCase());
    const mfn = memoizeLazy(fn);
    expect(mfn("a")).toBe("A");
    expect(mfn("a")).toBe("A");
    expect(mfn("b")).toBe("B");
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
