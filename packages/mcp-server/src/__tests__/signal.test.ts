import { describe, it, expect, vi } from "vitest";
import { Signal, Computed, Effect } from "../signal.js";

describe("Signal", () => {
  it("holds initial value", () => {
    const s = new Signal(42);
    expect(s.value).toBe(42);
  });

  it("set updates value", () => {
    const s = new Signal(1);
    s.set(2);
    expect(s.value).toBe(2);
  });

  it("update transforms value", () => {
    const s = new Signal(5);
    s.update((v) => v * 2);
    expect(s.value).toBe(10);
  });

  it("subscribe notifies on change", () => {
    const s = new Signal(0);
    const fn = vi.fn();
    s.subscribe(fn);
    s.set(1);
    expect(fn).toHaveBeenCalledWith(1);
  });

  it("does not notify for same value", () => {
    const s = new Signal(1);
    const fn = vi.fn();
    s.subscribe(fn);
    s.set(1);
    expect(fn).not.toHaveBeenCalled();
  });

  it("unsubscribe stops notifications", () => {
    const s = new Signal(0);
    const fn = vi.fn();
    const unsub = s.subscribe(fn);
    unsub();
    s.set(1);
    expect(fn).not.toHaveBeenCalled();
  });

  it("subscriberCount", () => {
    const s = new Signal(0);
    expect(s.subscriberCount).toBe(0);
    const unsub = s.subscribe(() => {});
    expect(s.subscriberCount).toBe(1);
    unsub();
    expect(s.subscriberCount).toBe(0);
  });
});

describe("Computed", () => {
  it("derives from signals", () => {
    const a = new Signal(2);
    const b = new Signal(3);
    const sum = new Computed(() => a.value + b.value, [a, b]);
    expect(sum.value).toBe(5);
  });

  it("updates when dependencies change", () => {
    const a = new Signal(1);
    const c = new Computed(() => a.value * 10, [a]);
    a.set(5);
    expect(c.value).toBe(50);
  });

  it("subscribe notifies on change", () => {
    const a = new Signal(1);
    const c = new Computed(() => a.value * 2, [a]);
    const fn = vi.fn();
    c.subscribe(fn);
    a.set(3);
    expect(fn).toHaveBeenCalledWith(6);
  });

  it("dispose stops updates", () => {
    const a = new Signal(1);
    const c = new Computed(() => a.value * 2, [a]);
    c.dispose();
    a.set(5);
    expect(c.value).toBe(2);
  });
});

describe("Effect", () => {
  it("runs on dependency change", () => {
    const a = new Signal(0);
    const fn = vi.fn();
    new Effect(fn, [a]);
    a.set(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("dispose stops effect", () => {
    const a = new Signal(0);
    const fn = vi.fn();
    const e = new Effect(fn, [a]);
    e.dispose();
    a.set(1);
    expect(fn).not.toHaveBeenCalled();
  });
});
