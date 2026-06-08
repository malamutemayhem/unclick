import { describe, it, expect } from "vitest";
import { Signal, computed, effect } from "../signal.js";

describe("Signal", () => {
  it("get and set", () => {
    const s = new Signal(0);
    expect(s.get()).toBe(0);
    s.set(5);
    expect(s.get()).toBe(5);
  });

  it("notifies subscribers on change", () => {
    const s = new Signal(0);
    const values: number[] = [];
    s.subscribe((v) => values.push(v));
    s.set(1);
    s.set(2);
    expect(values).toEqual([1, 2]);
  });

  it("skips notification for same value", () => {
    const s = new Signal(1);
    let calls = 0;
    s.subscribe(() => calls++);
    s.set(1);
    expect(calls).toBe(0);
  });

  it("update uses function", () => {
    const s = new Signal(5);
    s.update((v) => v * 2);
    expect(s.get()).toBe(10);
  });

  it("unsubscribe stops notifications", () => {
    const s = new Signal(0);
    const values: number[] = [];
    const unsub = s.subscribe((v) => values.push(v));
    s.set(1);
    unsub();
    s.set(2);
    expect(values).toEqual([1]);
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
  it("runs immediately and on changes", () => {
    const s = new Signal(0);
    const runs: number[] = [];
    const cleanup = effect([s], () => { runs.push(s.get()); });
    expect(runs).toEqual([0]);
    s.set(1);
    expect(runs).toEqual([0, 1]);
    cleanup();
    s.set(2);
    expect(runs).toEqual([0, 1]);
  });
});
