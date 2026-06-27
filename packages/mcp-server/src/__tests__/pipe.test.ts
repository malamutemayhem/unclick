import { describe, it, expect } from "vitest";
import { pipe, compose, tap, when, unless } from "../pipe.js";

describe("pipe", () => {
  it("returns value with no functions", () => {
    expect(pipe(5)).toBe(5);
  });

  it("applies single function", () => {
    expect(pipe(2, (x: number) => x * 3)).toBe(6);
  });

  it("chains multiple functions", () => {
    const result = pipe(
      "hello",
      (s: string) => s.toUpperCase(),
      (s: string) => s + "!",
      (s: string) => s.length
    );
    expect(result).toBe(6);
  });
});

describe("compose", () => {
  it("identity with no functions", () => {
    const fn = compose<number>();
    expect(fn(42)).toBe(42);
  });

  it("composes right to left", () => {
    const fn = compose(
      (x: number) => x + 1,
      (x: number) => x * 2
    );
    expect(fn(3)).toBe(7);
  });
});

describe("tap", () => {
  it("executes side effect and passes value through", () => {
    const log: number[] = [];
    const result = pipe(
      10,
      tap((v: number) => { log.push(v); }),
      (x: number) => x + 1
    );
    expect(result).toBe(11);
    expect(log).toEqual([10]);
  });
});

describe("when", () => {
  it("applies fn when predicate is true", () => {
    const double = when<number>((x) => x > 5, (x) => x * 2);
    expect(double(10)).toBe(20);
  });

  it("passes through when predicate is false", () => {
    const double = when<number>((x) => x > 5, (x) => x * 2);
    expect(double(3)).toBe(3);
  });
});

describe("unless", () => {
  it("applies fn when predicate is false", () => {
    const double = unless<number>((x) => x > 5, (x) => x * 2);
    expect(double(3)).toBe(6);
  });

  it("passes through when predicate is true", () => {
    const double = unless<number>((x) => x > 5, (x) => x * 2);
    expect(double(10)).toBe(10);
  });
});
