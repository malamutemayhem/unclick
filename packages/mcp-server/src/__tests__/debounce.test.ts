import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { debounce, throttle } from "../debounce.js";

describe("debounce", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("delays execution", () => {
    let count = 0;
    const fn = debounce(() => { count++; }, 100);
    fn();
    expect(count).toBe(0);
    vi.advanceTimersByTime(100);
    expect(count).toBe(1);
  });

  it("resets timer on repeated calls", () => {
    let count = 0;
    const fn = debounce(() => { count++; }, 100);
    fn();
    vi.advanceTimersByTime(50);
    fn();
    vi.advanceTimersByTime(50);
    expect(count).toBe(0);
    vi.advanceTimersByTime(50);
    expect(count).toBe(1);
  });

  it("uses latest args", () => {
    let value = "";
    const fn = debounce((v: unknown) => { value = String(v); }, 100);
    fn("a");
    fn("b");
    fn("c");
    vi.advanceTimersByTime(100);
    expect(value).toBe("c");
  });

  it("cancel prevents execution", () => {
    let count = 0;
    const fn = debounce(() => { count++; }, 100);
    fn();
    fn.cancel();
    vi.advanceTimersByTime(200);
    expect(count).toBe(0);
  });

  it("flush executes immediately", () => {
    let count = 0;
    const fn = debounce(() => { count++; }, 100);
    fn();
    fn.flush();
    expect(count).toBe(1);
    vi.advanceTimersByTime(200);
    expect(count).toBe(1);
  });
});

describe("throttle", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("executes first call immediately", () => {
    let count = 0;
    const fn = throttle(() => { count++; }, 100);
    fn();
    expect(count).toBe(1);
  });

  it("blocks calls within interval", () => {
    let count = 0;
    const fn = throttle(() => { count++; }, 100);
    fn();
    fn();
    fn();
    expect(count).toBe(1);
  });

  it("executes trailing call after interval", () => {
    let count = 0;
    const fn = throttle(() => { count++; }, 100);
    fn();
    fn();
    vi.advanceTimersByTime(100);
    expect(count).toBe(2);
  });

  it("cancel prevents trailing call", () => {
    let count = 0;
    const fn = throttle(() => { count++; }, 100);
    fn();
    fn();
    fn.cancel();
    vi.advanceTimersByTime(200);
    expect(count).toBe(1);
  });
});
