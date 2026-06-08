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

  it("flush triggers immediately", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 500);
    debounced();
    debounced.flush();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe("throttle", () => {
  it("limits call rate", async () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 50);
    throttled();
    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
    await new Promise((r) => setTimeout(r, 80));
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("cancel prevents trailing call", async () => {
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
  it("enforces max calls per window", () => {
    const fn = vi.fn(() => true);
    const limited = rateLimit(fn, 2, 1000);
    limited();
    limited();
    limited();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("tracks remaining calls", () => {
    const fn = vi.fn(() => true);
    const limited = rateLimit(fn, 3, 1000);
    expect(limited.remaining()).toBe(3);
    limited();
    expect(limited.remaining()).toBe(2);
  });
});
