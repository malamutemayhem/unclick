import { describe, it, expect, vi } from "vitest";
import { debounce, throttle, leading } from "../debounce-throttle.js";

describe("debounce", () => {
  it("delays execution", async () => {
    vi.useFakeTimers();
    let count = 0;
    const fn = debounce(() => count++, 100);
    fn();
    fn();
    fn();
    expect(count).toBe(0);
    vi.advanceTimersByTime(100);
    expect(count).toBe(1);
    vi.useRealTimers();
  });

  it("cancel prevents execution", () => {
    vi.useFakeTimers();
    let count = 0;
    const fn = debounce(() => count++, 100);
    fn();
    fn.cancel();
    vi.advanceTimersByTime(200);
    expect(count).toBe(0);
    vi.useRealTimers();
  });
});

describe("throttle", () => {
  it("limits execution rate", () => {
    vi.useFakeTimers();
    let count = 0;
    const fn = throttle(() => count++, 100);
    fn(); // fires immediately
    fn(); // queued
    fn(); // replaces queue
    expect(count).toBe(1);
    vi.advanceTimersByTime(100);
    expect(count).toBe(2);
    vi.useRealTimers();
  });
});

describe("leading", () => {
  it("fires on leading edge only", () => {
    vi.useFakeTimers();
    let count = 0;
    const fn = leading(() => count++, 100);
    fn();
    fn();
    fn();
    expect(count).toBe(1);
    vi.advanceTimersByTime(100);
    fn();
    expect(count).toBe(2);
    vi.useRealTimers();
  });
});
