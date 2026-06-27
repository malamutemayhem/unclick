import { describe, it, expect } from "vitest";
import { StepLimiter, runWithLimit, loopWithLimit, limitedGenerator } from "../step-limiter.js";

describe("StepLimiter", () => {
  it("tracks steps", () => {
    const limiter = new StepLimiter(5);
    limiter.step();
    limiter.step();
    expect(limiter.current).toBe(2);
    expect(limiter.remaining).toBe(3);
  });

  it("throws at limit in throw mode", () => {
    const limiter = new StepLimiter(2, "throw");
    limiter.step();
    limiter.step();
    expect(() => limiter.step()).toThrow("Step limit reached: 2");
  });

  it("returns false at limit in stop mode", () => {
    const limiter = new StepLimiter(2, "stop");
    expect(limiter.step()).toBe(true);
    expect(limiter.step()).toBe(true);
    expect(limiter.step()).toBe(false);
  });

  it("isExhausted reflects state", () => {
    const limiter = new StepLimiter(1);
    expect(limiter.isExhausted).toBe(false);
    limiter.step();
    expect(limiter.isExhausted).toBe(true);
  });

  it("reset clears count", () => {
    const limiter = new StepLimiter(5);
    limiter.step();
    limiter.step();
    limiter.reset();
    expect(limiter.current).toBe(0);
    expect(limiter.remaining).toBe(5);
  });
});

describe("runWithLimit", () => {
  it("runs function within limit", async () => {
    const result = await runWithLimit((limiter) => {
      limiter.step();
      limiter.step();
      return 42;
    }, 5);
    expect(result.value).toBe(42);
    expect(result.stepCount).toBe(2);
    expect(result.limitReached).toBe(false);
  });

  it("catches step limit exceeded", async () => {
    const result = await runWithLimit((limiter) => {
      for (let i = 0; i < 100; i++) limiter.step();
      return "done";
    }, 3);
    expect(result.limitReached).toBe(true);
    expect(result.stepCount).toBe(4);
  });

  it("propagates non-limit errors", async () => {
    await expect(runWithLimit(() => { throw new Error("boom"); }, 5)).rejects.toThrow("boom");
  });
});

describe("loopWithLimit", () => {
  it("processes all items within limit", () => {
    const items = [1, 2, 3];
    const collected: number[] = [];
    const result = loopWithLimit(items, 10, (item) => collected.push(item));
    expect(collected).toEqual([1, 2, 3]);
    expect(result.processed).toBe(3);
    expect(result.limitReached).toBe(false);
  });

  it("stops at limit", () => {
    const items = [1, 2, 3, 4, 5];
    const collected: number[] = [];
    const result = loopWithLimit(items, 3, (item) => collected.push(item));
    expect(collected).toEqual([1, 2, 3]);
    expect(result.processed).toBe(3);
    expect(result.limitReached).toBe(true);
  });
});

describe("limitedGenerator", () => {
  it("limits generator output", () => {
    function* nums() { let i = 0; while (true) yield i++; }
    const limited = [...limitedGenerator(nums(), 5)];
    expect(limited).toEqual([0, 1, 2, 3, 4]);
  });

  it("handles shorter source", () => {
    const limited = [...limitedGenerator([1, 2], 10)];
    expect(limited).toEqual([1, 2]);
  });
});
