import { describe, it, expect, vi } from "vitest";
import { debounce, throttle } from "../debounce.js";

describe("debounce", () => {
  it("delays function execution", async () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50);
    debounced();
    expect(fn).not.toHaveBeenCalled();
    await new Promise((r) => setTimeout(r, 80));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("resets timer on repeated calls", async () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50);
    debounced();
    await new Promise((r) => setTimeout(r, 30));
    debounced();
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
    const debounced = debounce(fn, 1000);
    debounced("arg1");
    debounced.flush();
    expect(fn).toHaveBeenCalledWith("arg1");
  });
});

describe("throttle", () => {
  it("calls immediately on first invocation", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("suppresses calls within interval", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("cancel clears pending call", async () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 50);
    throttled();
    throttled();
    throttled.cancel();
    await new Promise((r) => setTimeout(r, 80));
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
