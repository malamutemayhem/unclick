import { describe, it, expect } from "vitest";
import { ObservableValue, combine } from "../observable-value.js";

describe("ObservableValue", () => {
  it("stores and retrieves value", () => {
    const v = new ObservableValue(42);
    expect(v.value).toBe(42);
  });

  it("notifies subscribers on set", () => {
    const v = new ObservableValue(0);
    let received = -1;
    v.subscribe((val) => { received = val; });
    v.set(10);
    expect(received).toBe(10);
  });

  it("passes previous value to subscriber", () => {
    const v = new ObservableValue(1);
    let prev = -1;
    v.subscribe((_val, p) => { prev = p; });
    v.set(2);
    expect(prev).toBe(1);
  });

  it("update uses function", () => {
    const v = new ObservableValue(5);
    v.update((n) => n * 2);
    expect(v.value).toBe(10);
  });

  it("unsubscribe works", () => {
    const v = new ObservableValue(0);
    let count = 0;
    const unsub = v.subscribe(() => { count++; });
    v.set(1);
    unsub();
    v.set(2);
    expect(count).toBe(1);
  });

  it("once fires only once", () => {
    const v = new ObservableValue(0);
    let count = 0;
    v.once(() => { count++; });
    v.set(1);
    v.set(2);
    expect(count).toBe(1);
  });

  it("tracks history", () => {
    const v = new ObservableValue(0);
    v.set(1);
    v.set(2);
    expect(v.getHistory()).toEqual([0, 1]);
  });

  it("limits history size", () => {
    const v = new ObservableValue(0, 3);
    v.set(1);
    v.set(2);
    v.set(3);
    v.set(4);
    expect(v.getHistory().length).toBe(3);
  });

  it("reset clears history", () => {
    const v = new ObservableValue(0);
    v.set(1);
    v.reset(0);
    expect(v.getHistory()).toEqual([]);
    expect(v.value).toBe(0);
  });

  it("derived creates linked observable", () => {
    const v = new ObservableValue(5);
    const doubled = v.derived((n) => n * 2);
    expect(doubled.value).toBe(10);
    v.set(10);
    expect(doubled.value).toBe(20);
  });
});

describe("combine", () => {
  it("combines two observables", () => {
    const a = new ObservableValue(1);
    const b = new ObservableValue(2);
    const sum = combine(a, b, (x, y) => x + y);
    expect(sum.value).toBe(3);
    a.set(10);
    expect(sum.value).toBe(12);
    b.set(20);
    expect(sum.value).toBe(30);
  });
});
