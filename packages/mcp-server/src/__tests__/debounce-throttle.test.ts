import { describe, it, expect, vi } from "vitest";
import { debounce, throttle, rateLimit } from "../debounce-throttle.js";

describe("debounce", () => {
  it("delays execution", async () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50);
    debounced();
    debounced();
    debounced();
    expect(fn).not.toHaveBeenCalled();
    await new Promise((r) => setTimeout(r, 80));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("cancel prevents execution", async () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50);
    debounced();
    debounced.cancel();
    await new Promise((r) => setTimeout(r, 80));
    expect(fn).not.toHaveBeenCalled();
  });

  it("flush executes immediately", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 1000);
    debounced();
    debounced.flush();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe("throttle", () => {
  it("executes immediately on first call", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
    throttled.cancel();
  });

  it("throttles subsequent calls", async () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 50);
    throttled();
    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
    await new Promise((r) => setTimeout(r, 80));
    expect(fn).toHaveBeenCalledTimes(2);
    throttled.cancel();
  });

  it("cancel prevents pending call", async () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 50);
    throttled();
    throttled();
    throttled.cancel();
    await new Promise((r) => setTimeout(r, 80));
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe("rateLimit", () => {
  it("allows calls within limit", () => {
    const check = rateLimit(3, 1000);
    expect(check()).toBe(true);
    expect(check()).toBe(true);
    expect(check()).toBe(true);
    expect(check()).toBe(false);
  });

  it("resets after window", async () => {
    const check = rateLimit(1, 50);
    expect(check()).toBe(true);
    expect(check()).toBe(false);
    await new Promise((r) => setTimeout(r, 80));
    expect(check()).toBe(true);
  });
});
