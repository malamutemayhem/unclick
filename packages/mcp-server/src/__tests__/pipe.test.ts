import { describe, it, expect, vi } from "vitest";
import { pipe, compose, tap, identity, constant, pipeAsync, when } from "../pipe.js";

describe("pipe", () => {
  it("pipes functions left to right", () => {
    const double = (n: number) => n * 2;
    const addOne = (n: number) => n + 1;
    const fn = pipe(double, addOne);
    expect(fn(5)).toBe(11);
  });

  it("compose applies right to left", () => {
    const double = (n: number) => n * 2;
    const addOne = (n: number) => n + 1;
    const fn = compose(double, addOne);
    expect(fn(5)).toBe(12);
  });

  it("pipe with single function", () => {
    const fn = pipe((x: number) => x + 1);
    expect(fn(5)).toBe(6);
  });

  it("tap runs side effect without changing value", () => {
    const spy = vi.fn();
    const fn = pipe(
      (x: number) => x * 2,
      tap(spy),
      (x: number) => x + 1
    );
    expect(fn(5)).toBe(11);
    expect(spy).toHaveBeenCalledWith(10);
  });

  it("identity returns same value", () => {
    expect(identity(42)).toBe(42);
    expect(identity("hello")).toBe("hello");
  });

  it("constant returns a function that always returns the value", () => {
    const always5 = constant(5);
    expect(always5()).toBe(5);
    expect(always5()).toBe(5);
  });

  it("pipeAsync handles async functions", async () => {
    const result = await pipeAsync(
      5,
      async (x: number) => x * 2,
      async (x: number) => x + 1
    );
    expect(result).toBe(11);
  });

  it("when conditionally transforms", () => {
    const doubleIfPositive = when<number>(
      (n) => n > 0,
      (n) => n * 2
    );
    expect(doubleIfPositive(5)).toBe(10);
    expect(doubleIfPositive(-3)).toBe(-3);
  });
});
