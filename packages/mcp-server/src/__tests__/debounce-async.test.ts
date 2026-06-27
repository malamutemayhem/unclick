import { describe, it, expect, vi, afterEach } from "vitest";
import { debounceAsync } from "../debounce-async.js";

describe("debounce-async", () => {
  afterEach(() => { vi.useRealTimers(); });

  it("delays execution", async () => {
    vi.useFakeTimers();
    const fn = vi.fn(async (x: number) => x * 2);
    const debounced = debounceAsync(fn, 100);
    const p = debounced(5);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(await p).toBe(10);
  });

  it("only calls the last invocation", async () => {
    vi.useFakeTimers();
    const fn = vi.fn(async (x: number) => x);
    const debounced = debounceAsync(fn, 100);
    debounced(1).catch(() => {});
    debounced(2).catch(() => {});
    const p = debounced(3);
    vi.advanceTimersByTime(100);
    expect(await p).toBe(3);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("flush executes immediately", async () => {
    vi.useFakeTimers();
    const fn = vi.fn(async (x: number) => x);
    const debounced = debounceAsync(fn, 100);
    debounced(42).catch(() => {});
    const result = await debounced.flush();
    expect(result).toBe(42);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("cancel prevents execution", async () => {
    vi.useFakeTimers();
    const fn = vi.fn(async () => "done");
    const debounced = debounceAsync(fn, 100);
    const p = debounced();
    debounced.cancel();
    vi.advanceTimersByTime(200);
    await expect(p).rejects.toThrow("cancelled");
    expect(fn).not.toHaveBeenCalled();
  });

  it("pending reflects state", () => {
    vi.useFakeTimers();
    const fn = vi.fn(async () => {});
    const debounced = debounceAsync(fn, 100);
    expect(debounced.pending).toBe(false);
    debounced().catch(() => {});
    expect(debounced.pending).toBe(true);
  });
});
