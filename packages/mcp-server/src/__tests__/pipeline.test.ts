import { describe, it, expect, vi } from "vitest";
import { Pipeline, pipe } from "../pipeline.js";

describe("Pipeline", () => {
  it("executes steps in order", async () => {
    const p = Pipeline.create<number>()
      .pipe((n) => n + 1)
      .pipe((n) => n * 2);
    expect(await p.execute(5)).toBe(12);
  });

  it("handles async steps", async () => {
    const p = Pipeline.create<string>()
      .pipe(async (s) => s.toUpperCase())
      .pipe((s) => s + "!");
    expect(await p.execute("hello")).toBe("HELLO!");
  });

  it("empty pipeline returns input", async () => {
    const p = Pipeline.create<number>();
    expect(await p.execute(42)).toBe(42);
  });

  it("tap runs side effect without changing value", async () => {
    const spy = vi.fn();
    const p = Pipeline.create<number>()
      .pipe((n) => n * 2)
      .tap(spy)
      .pipe((n) => n + 1);
    expect(await p.execute(5)).toBe(11);
    expect(spy).toHaveBeenCalledWith(10);
  });

  it("branch selects path based on predicate", async () => {
    const p = Pipeline.create<number>()
      .branch(
        (n) => n > 0,
        (n) => `positive: ${n}`,
        (n) => `non-positive: ${n}`
      );
    expect(await p.execute(5)).toBe("positive: 5");
    expect(await p.execute(-1)).toBe("non-positive: -1");
  });
});

describe("pipe helper", () => {
  it("creates pipeline from functions", async () => {
    const p = pipe(
      (n: number) => n + 1,
      (n: number) => n * 3
    );
    expect(await p.execute(2)).toBe(9);
  });
});
