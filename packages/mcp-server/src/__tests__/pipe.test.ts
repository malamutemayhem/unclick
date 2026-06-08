import { describe, it, expect, vi } from "vitest";
import { pipe, compose, tap, when, unless } from "../pipe.js";

describe("pipe", () => {
  it("pipes through single function", () => {
    expect(pipe(5, (x: number) => x * 2)).toBe(10);
  });

  it("pipes through multiple functions", () => {
    expect(pipe(
      5,
      (x: number) => x * 2,
      (x: number) => x + 1,
      (x: number) => String(x)
    )).toBe("11");
  });

  it("compose creates right-to-left pipeline", () => {
    const fn = compose(
      (x: number) => x + 1,
      (x: number) => x * 2
    );
    expect(fn(5)).toBe(11);
  });

  it("compose with single function", () => {
    const fn = compose((x: number) => x + 1);
    expect(fn(5)).toBe(6);
  });

  it("tap executes side effect and returns value", () => {
    const fn = vi.fn();
    const result = pipe(42, tap(fn));
    expect(result).toBe(42);
    expect(fn).toHaveBeenCalledWith(42);
  });

  it("when applies fn if predicate is true", () => {
    const double = when((x: number) => x > 3, (x: number) => x * 2);
    expect(double(5)).toBe(10);
    expect(double(2)).toBe(2);
  });

  it("unless applies fn if predicate is false", () => {
    const double = unless((x: number) => x > 3, (x: number) => x * 2);
    expect(double(2)).toBe(4);
    expect(double(5)).toBe(5);
  });
});
