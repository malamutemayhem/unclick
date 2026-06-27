import { describe, it, expect } from "vitest";
import { Signal, effect, computed, SignalMap } from "../signal-reactive.js";

describe("Signal", () => {
  it("get and set values", () => {
    const s = new Signal(10);
    expect(s.get()).toBe(10);
    s.set(20);
    expect(s.get()).toBe(20);
  });

  it("update with function", () => {
    const s = new Signal(5);
    s.update((v) => v * 2);
    expect(s.get()).toBe(10);
  });

  it("peek does not track", () => {
    const s = new Signal(42);
    expect(s.peek()).toBe(42);
  });

  it("skips same value", () => {
    const s = new Signal(1);
    let callCount = 0;
    effect(() => { s.get(); callCount++; });
    expect(callCount).toBe(1);
    s.set(1);
    expect(callCount).toBe(1);
    s.set(2);
    expect(callCount).toBe(2);
  });
});

describe("effect", () => {
  it("runs immediately and on changes", () => {
    const s = new Signal(0);
    const values: number[] = [];
    effect(() => values.push(s.get()));
    s.set(1);
    s.set(2);
    expect(values).toEqual([0, 1, 2]);
  });
});

describe("computed", () => {
  it("derives from signals", () => {
    const a = new Signal(2);
    const b = new Signal(3);
    const sum = computed(() => a.get() + b.get());
    expect(sum.get()).toBe(5);
    a.set(10);
    expect(sum.get()).toBe(13);
  });
});

describe("SignalMap", () => {
  it("get and set", () => {
    const map = new SignalMap<string, number>();
    map.set("a", 1);
    expect(map.get("a")).toBe(1);
    expect(map.size).toBe(1);
  });

  it("delete removes entry", () => {
    const map = new SignalMap<string, number>();
    map.set("a", 1);
    map.delete("a");
    expect(map.get("a")).toBeUndefined();
    expect(map.size).toBe(0);
  });

  it("keys returns all keys", () => {
    const map = new SignalMap<string, number>();
    map.set("x", 1);
    map.set("y", 2);
    expect(map.keys().sort()).toEqual(["x", "y"]);
  });
});
