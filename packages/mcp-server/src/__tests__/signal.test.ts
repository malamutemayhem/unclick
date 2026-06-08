import { describe, it, expect, vi } from "vitest";
import { Signal, computed, effect } from "../signal.js";

describe("signal", () => {
  it("stores and retrieves value", () => {
    const s = new Signal(42);
    expect(s.value).toBe(42);
  });

  it("notifies subscribers on change", () => {
    const s = new Signal(0);
    const fn = vi.fn();
    s.subscribe(fn);
    s.value = 1;
    expect(fn).toHaveBeenCalledWith(1);
  });

  it("skips notification when value unchanged", () => {
    const s = new Signal(5);
    const fn = vi.fn();
    s.subscribe(fn);
    s.value = 5;
    expect(fn).not.toHaveBeenCalled();
  });

  it("unsubscribe stops notifications", () => {
    const s = new Signal(0);
    const fn = vi.fn();
    const unsub = s.subscribe(fn);
    unsub();
    s.value = 1;
    expect(fn).not.toHaveBeenCalled();
  });

  it("update applies function", () => {
    const s = new Signal(10);
    s.update((v) => v + 5);
    expect(s.value).toBe(15);
  });

  it("peek returns value without tracking", () => {
    const s = new Signal("hello");
    expect(s.peek()).toBe("hello");
  });

  it("computed derives from dependencies", () => {
    const a = new Signal(2);
    const b = new Signal(3);
    const sum = computed(() => a.value + b.value, [a, b]);
    expect(sum.value).toBe(5);
    a.value = 10;
    expect(sum.value).toBe(13);
  });

  it("effect runs on change", () => {
    const s = new Signal(0);
    const fn = vi.fn();
    const dispose = effect(fn, [s]);
    expect(fn).toHaveBeenCalledTimes(1);
    s.value = 1;
    expect(fn).toHaveBeenCalledTimes(2);
    dispose();
    s.value = 2;
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
