import { describe, it, expect, vi } from "vitest";
import { Observable, computed } from "../observable.js";

describe("Observable", () => {
  it("holds initial value", () => {
    const obs = new Observable(42);
    expect(obs.get()).toBe(42);
  });

  it("set updates value", () => {
    const obs = new Observable(0);
    obs.set(5);
    expect(obs.get()).toBe(5);
  });

  it("notifies subscribers on change", () => {
    const obs = new Observable("a");
    const fn = vi.fn();
    obs.subscribe(fn);
    obs.set("b");
    expect(fn).toHaveBeenCalledWith("b", "a");
  });

  it("skips notification if value unchanged", () => {
    const obs = new Observable(1);
    const fn = vi.fn();
    obs.subscribe(fn);
    obs.set(1);
    expect(fn).not.toHaveBeenCalled();
  });

  it("unsubscribe stops notifications", () => {
    const obs = new Observable(0);
    const fn = vi.fn();
    const unsub = obs.subscribe(fn);
    unsub();
    obs.set(1);
    expect(fn).not.toHaveBeenCalled();
  });

  it("update transforms current value", () => {
    const obs = new Observable(10);
    obs.update((v) => v + 5);
    expect(obs.get()).toBe(15);
  });

  it("tracks subscriber count", () => {
    const obs = new Observable(0);
    expect(obs.subscriberCount).toBe(0);
    const unsub = obs.subscribe(() => {});
    expect(obs.subscriberCount).toBe(1);
    unsub();
    expect(obs.subscriberCount).toBe(0);
  });

  it("swallows subscriber errors", () => {
    const obs = new Observable(0);
    const good = vi.fn();
    obs.subscribe(() => { throw new Error("bad"); });
    obs.subscribe(good);
    obs.set(1);
    expect(good).toHaveBeenCalled();
  });
});

describe("computed", () => {
  it("derives value from source", () => {
    const source = new Observable(5);
    const doubled = computed(source, (v) => v * 2);
    expect(doubled.get()).toBe(10);
  });

  it("updates when source changes", () => {
    const source = new Observable("hello");
    const upper = computed(source, (v) => v.toUpperCase());
    source.set("world");
    expect(upper.get()).toBe("WORLD");
  });
});
