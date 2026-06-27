import { describe, it, expect, vi } from "vitest";
import { Store, computed } from "../reactive-store.js";

describe("Store", () => {
  it("get returns initial value", () => {
    const s = new Store(42);
    expect(s.get()).toBe(42);
  });

  it("set updates value", () => {
    const s = new Store(0);
    s.set(10);
    expect(s.get()).toBe(10);
  });

  it("set with updater function", () => {
    const s = new Store(5);
    s.set((prev) => prev + 1);
    expect(s.get()).toBe(6);
  });

  it("subscribe notifies on change", () => {
    const s = new Store(0);
    const fn = vi.fn();
    s.subscribe(fn);
    s.set(1);
    expect(fn).toHaveBeenCalledWith(1, 0);
  });

  it("unsubscribe stops notifications", () => {
    const s = new Store(0);
    const fn = vi.fn();
    const unsub = s.subscribe(fn);
    unsub();
    s.set(1);
    expect(fn).not.toHaveBeenCalled();
  });

  it("undo reverts to previous state", () => {
    const s = new Store(0, 10);
    s.set(1);
    s.set(2);
    expect(s.undo()).toBe(true);
    expect(s.get()).toBe(1);
  });

  it("undo returns false when no history", () => {
    const s = new Store(0, 10);
    expect(s.undo()).toBe(false);
  });

  it("select notifies on selected value change", () => {
    const s = new Store({ x: 1, y: 2 }, 5);
    const fn = vi.fn();
    s.select((state) => state.x, fn);
    s.set({ x: 10, y: 2 });
    expect(fn).toHaveBeenCalledWith(10, 1);
  });

  it("reset clears history", () => {
    const s = new Store(0, 10);
    s.set(1);
    s.set(2);
    s.reset(0);
    expect(s.get()).toBe(0);
    expect(s.getHistory()).toEqual([]);
  });

  it("listenerCount tracks subscribers", () => {
    const s = new Store(0);
    const unsub = s.subscribe(() => {});
    expect(s.listenerCount).toBe(1);
    unsub();
    expect(s.listenerCount).toBe(0);
  });
});

describe("computed", () => {
  it("derives from store", () => {
    const s = new Store({ count: 5 });
    const doubled = computed(s, (state) => state.count * 2);
    expect(doubled.get()).toBe(10);
    s.set({ count: 10 });
    expect(doubled.get()).toBe(20);
  });
});
