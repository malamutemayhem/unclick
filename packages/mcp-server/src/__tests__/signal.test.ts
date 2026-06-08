import { describe, it, expect, vi } from "vitest";
import { Signal, computed, effect } from "../signal.js";

describe("Signal", () => {
  it("get and set", () => {
    const s = new Signal(0);
    expect(s.get()).toBe(0);
    s.set(42);
    expect(s.get()).toBe(42);
  });

  it("update with function", () => {
    const s = new Signal(10);
    s.update((v) => v + 5);
    expect(s.get()).toBe(15);
  });

  it("notifies subscribers", () => {
    const s = new Signal(0);
    const fn = vi.fn();
    s.subscribe(fn);
    s.set(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("skips notification if same value", () => {
    const s = new Signal(5);
    const fn = vi.fn();
    s.subscribe(fn);
    s.set(5);
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

  it("tracks listener count", () => {
    const s = new Signal(0);
    const unsub = s.subscribe(() => {});
    expect(s.listenerCount).toBe(1);
    unsub();
    expect(s.listenerCount).toBe(0);
  });
});

describe("computed", () => {
  it("derives from dependencies", () => {
    const a = new Signal(2);
    const b = new Signal(3);
    const sum = computed([a, b], () => a.get() + b.get());
    expect(sum.get()).toBe(5);
    a.set(10);
    expect(sum.get()).toBe(13);
  });
});

describe("effect", () => {
  it("runs immediately and on change", () => {
    const s = new Signal(0);
    const log: number[] = [];
    const cleanup = effect([s], () => { log.push(s.get()); });
    s.set(1);
    s.set(2);
    expect(log).toEqual([0, 1, 2]);
    cleanup();
  });

  it("cleanup stops future runs", () => {
    const s = new Signal(0);
    const fn = vi.fn();
    const cleanup = effect([s], fn);
    cleanup();
    s.set(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
