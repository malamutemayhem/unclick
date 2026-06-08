import { describe, it, expect } from "vitest";
import { pipe, compose, tap, identity, constant, memoize, once } from "../pipe.js";

describe("pipe", () => {
  it("pipes through one function", () => {
    expect(pipe(2, (x: number) => x * 3)).toBe(6);
  });

  it("pipes through multiple functions", () => {
    expect(pipe(
      "hello",
      (s: string) => s.toUpperCase(),
      (s: string) => s + "!",
    )).toBe("HELLO!");
  });
});

describe("compose", () => {
  it("composes functions right to left", () => {
    const fn = compose(
      (x: number) => x + 1,
      (x: number) => x * 2,
    );
    expect(fn(3)).toBe(7);
  });
});

describe("tap", () => {
  it("returns value unchanged", () => {
    let captured = 0;
    const result = pipe(42, tap((x: number) => { captured = x; }));
    expect(result).toBe(42);
    expect(captured).toBe(42);
  });
});

describe("identity", () => {
  it("returns the same value", () => {
    expect(identity(42)).toBe(42);
    expect(identity("hello")).toBe("hello");
  });
});

describe("constant", () => {
  it("returns a function that always returns the value", () => {
    const fn = constant(42);
    expect(fn()).toBe(42);
    expect(fn()).toBe(42);
  });
});

describe("memoize", () => {
  it("caches results", () => {
    let callCount = 0;
    const fn = memoize((x: number) => { callCount++; return x * 2; });
    expect(fn(3)).toBe(6);
    expect(fn(3)).toBe(6);
    expect(callCount).toBe(1);
  });

  it("distinguishes different arguments", () => {
    const fn = memoize((x: number) => x * 2);
    expect(fn(3)).toBe(6);
    expect(fn(4)).toBe(8);
  });
});

describe("once", () => {
  it("only calls function once", () => {
    let count = 0;
    const fn = once(() => { count++; return "done"; });
    expect(fn()).toBe("done");
    expect(fn()).toBe("done");
    expect(count).toBe(1);
  });
});
