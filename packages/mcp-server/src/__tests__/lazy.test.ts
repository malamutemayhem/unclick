import { describe, it, expect } from "vitest";
import { Lazy, lazy, memoize, once } from "../lazy.js";

describe("Lazy", () => {
  it("defers computation", () => {
    let called = false;
    const l = new Lazy(() => { called = true; return 42; });
    expect(called).toBe(false);
    expect(l.get()).toBe(42);
    expect(called).toBe(true);
  });

  it("caches result", () => {
    let count = 0;
    const l = new Lazy(() => { count++; return "x"; });
    l.get();
    l.get();
    expect(count).toBe(1);
  });

  it("isComputed tracks state", () => {
    const l = lazy(() => 1);
    expect(l.isComputed).toBe(false);
    l.get();
    expect(l.isComputed).toBe(true);
  });

  it("map transforms lazily", () => {
    const l = lazy(() => 5);
    const doubled = l.map((x) => x * 2);
    expect(doubled.isComputed).toBe(false);
    expect(doubled.get()).toBe(10);
  });

  it("flatMap chains", () => {
    const l = lazy(() => 3);
    const chained = l.flatMap((x) => lazy(() => x + 1));
    expect(chained.get()).toBe(4);
  });

  it("reset allows recomputation", () => {
    let count = 0;
    const l = new Lazy(() => ++count);
    expect(l.get()).toBe(1);
    l.reset();
    expect(l.get()).toBe(2);
  });
});

describe("memoize", () => {
  it("caches by arguments", () => {
    let calls = 0;
    const add = memoize((a: number, b: number) => { calls++; return a + b; });
    expect(add(1, 2)).toBe(3);
    expect(add(1, 2)).toBe(3);
    expect(calls).toBe(1);
    expect(add(2, 3)).toBe(5);
    expect(calls).toBe(2);
  });
});

describe("once", () => {
  it("only calls function once", () => {
    let count = 0;
    const fn = once(() => ++count);
    expect(fn()).toBe(1);
    expect(fn()).toBe(1);
    expect(count).toBe(1);
  });
});
