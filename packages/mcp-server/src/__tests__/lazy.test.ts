import { describe, it, expect } from "vitest";
import { Lazy, lazy, lazySeq } from "../lazy.js";

describe("Lazy", () => {
  it("defers computation", () => {
    let computed = false;
    const l = new Lazy(() => { computed = true; return 42; });
    expect(computed).toBe(false);
    expect(l.get()).toBe(42);
    expect(computed).toBe(true);
  });

  it("memoizes result", () => {
    let count = 0;
    const l = lazy(() => ++count);
    expect(l.get()).toBe(1);
    expect(l.get()).toBe(1);
  });

  it("tracks isInitialized", () => {
    const l = lazy(() => 1);
    expect(l.isInitialized).toBe(false);
    l.get();
    expect(l.isInitialized).toBe(true);
  });

  it("map transforms lazily", () => {
    let computed = false;
    const l = lazy(() => 5).map((v: number) => { computed = true; return v * 2; });
    expect(computed).toBe(false);
    expect(l.get()).toBe(10);
  });

  it("flatMap chains lazy values", () => {
    const l = lazy(() => 5).flatMap((v: number) => lazy(() => v * 3));
    expect(l.get()).toBe(15);
  });
});

describe("LazySequence", () => {
  it("take returns first N elements", () => {
    const seq = lazySeq(function* () { let i = 0; while (true) yield i++; });
    expect(seq.take(5)).toEqual([0, 1, 2, 3, 4]);
  });

  it("map transforms lazily", () => {
    const seq = lazySeq(function* () { yield 1; yield 2; yield 3; });
    expect(seq.map((v: number) => v * 2).toArray()).toEqual([2, 4, 6]);
  });

  it("filter keeps matching", () => {
    const seq = lazySeq(function* () { yield 1; yield 2; yield 3; yield 4; });
    expect(seq.filter((v: number) => v % 2 === 0).toArray()).toEqual([2, 4]);
  });

  it("is iterable", () => {
    const seq = lazySeq(function* () { yield 1; yield 2; });
    expect([...seq]).toEqual([1, 2]);
  });
});
