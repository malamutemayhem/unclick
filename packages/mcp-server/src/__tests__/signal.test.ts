import { describe, it, expect, vi } from "vitest";
import { Signal, Computed, signal, computed } from "../signal.js";

describe("Signal", () => {
  it("has initial value", () => {
    const s = signal(5);
    expect(s.value).toBe(5);
  });

  it("set updates value", () => {
    const s = signal(1);
    s.set(2);
    expect(s.value).toBe(2);
  });

  it("update with function", () => {
    const s = signal(5);
    s.update((n: number) => n + 1);
    expect(s.value).toBe(6);
  });

  it("notifies subscribers on change", () => {
    const s = signal(0);
    const fn = vi.fn();
    s.subscribe(fn);
    s.set(1);
    expect(fn).toHaveBeenCalledWith(1);
  });

  it("does not notify if value unchanged", () => {
    const s = signal(5);
    const fn = vi.fn();
    s.subscribe(fn);
    s.set(5);
    expect(fn).not.toHaveBeenCalled();
  });

  it("unsubscribe stops notifications", () => {
    const s = signal(0);
    const fn = vi.fn();
    const unsub = s.subscribe(fn);
    unsub();
    s.set(1);
    expect(fn).not.toHaveBeenCalled();
  });

  it("peek returns value without subscribing", () => {
    const s = signal(42);
    expect(s.peek()).toBe(42);
  });
});

describe("Computed", () => {
  it("computes from dependencies", () => {
    const a = signal(2);
    const b = signal(3);
    const sum = computed(() => a.value + b.value, [a, b]);
    expect(sum.value).toBe(5);
  });

  it("updates when dependency changes", () => {
    const a = signal(1);
    const c = computed(() => a.value * 2, [a]);
    a.set(5);
    expect(c.value).toBe(10);
  });

  it("notifies subscribers", () => {
    const a = signal(1);
    const c = computed(() => a.value * 2, [a]);
    const fn = vi.fn();
    c.subscribe(fn);
    a.set(3);
    expect(fn).toHaveBeenCalledWith(6);
  });

  it("dispose stops updates", () => {
    const a = signal(1);
    const c = computed(() => a.value * 2, [a]);
    const fn = vi.fn();
    c.subscribe(fn);
    c.dispose();
    a.set(10);
    expect(fn).not.toHaveBeenCalled();
  });
});
