import { describe, it, expect, vi } from "vitest";
import { debounce, throttle } from "../debounce-throttle.js";

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
    debounced("arg");
    debounced.flush();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe("throttle", () => {
  it("executes immediately then throttles", async () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
    await new Promise((r) => setTimeout(r, 150));
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("cancel prevents trailing call", async () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    throttled();
    throttled.cancel();
    await new Promise((r) => setTimeout(r, 150));
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
