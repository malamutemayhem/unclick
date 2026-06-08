import { describe, it, expect } from "vitest";
import { SimpleMovingAverage, ExponentialMovingAverage, simpleMA } from "../moving-average.js";

describe("SimpleMovingAverage", () => {
  it("computes running average", () => {
    const sma = new SimpleMovingAverage(3);
    expect(sma.push(10)).toBe(10);
    expect(sma.push(20)).toBe(15);
    expect(sma.push(30)).toBe(20);
  });

  it("slides window when full", () => {
    const sma = new SimpleMovingAverage(2);
    sma.push(10);
    sma.push(20);
    expect(sma.push(30)).toBe(25);
  });

  it("current returns last average", () => {
    const sma = new SimpleMovingAverage(3);
    expect(sma.current).toBe(0);
    sma.push(6);
    expect(sma.current).toBe(6);
  });

  it("count and full", () => {
    const sma = new SimpleMovingAverage(3);
    expect(sma.count).toBe(0);
    expect(sma.full).toBe(false);
    sma.push(1); sma.push(2); sma.push(3);
    expect(sma.count).toBe(3);
    expect(sma.full).toBe(true);
  });

  it("reset clears state", () => {
    const sma = new SimpleMovingAverage(3);
    sma.push(10);
    sma.reset();
    expect(sma.current).toBe(0);
    expect(sma.count).toBe(0);
  });
});

describe("ExponentialMovingAverage", () => {
  it("first value is the average", () => {
    const ema = new ExponentialMovingAverage(0.5);
    expect(ema.push(10)).toBe(10);
  });

  it("applies exponential weight", () => {
    const ema = new ExponentialMovingAverage(0.5);
    ema.push(10);
    const v = ema.push(20);
    expect(v).toBe(15);
  });

  it("current returns last", () => {
    const ema = new ExponentialMovingAverage(0.3);
    expect(ema.current).toBe(0);
    ema.push(100);
    expect(ema.current).toBe(100);
  });

  it("rejects invalid alpha", () => {
    expect(() => new ExponentialMovingAverage(0)).toThrow();
    expect(() => new ExponentialMovingAverage(1.5)).toThrow();
  });

  it("reset clears state", () => {
    const ema = new ExponentialMovingAverage(0.5);
    ema.push(10);
    ema.reset();
    expect(ema.current).toBe(0);
    expect(ema.count).toBe(0);
  });
});

describe("simpleMA", () => {
  it("computes moving average array", () => {
    const result = simpleMA([1, 2, 3, 4, 5], 3);
    expect(result.length).toBe(5);
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(1.5);
    expect(result[2]).toBeCloseTo(2);
    expect(result[3]).toBeCloseTo(3);
    expect(result[4]).toBeCloseTo(4);
  });

  it("handles empty", () => {
    expect(simpleMA([], 3)).toEqual([]);
  });
});
