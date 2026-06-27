import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TokenBucket, SlidingWindowCounter, FixedWindowCounter } from "../rate-limiter.js";

describe("TokenBucket", () => {
  it("starts with full capacity", () => {
    const tb = new TokenBucket(10, 1);
    expect(tb.available).toBe(10);
  });

  it("tryConsume decrements tokens", () => {
    const tb = new TokenBucket(5, 1);
    expect(tb.tryConsume()).toBe(true);
    expect(tb.available).toBe(4);
  });

  it("tryConsume returns false when empty", () => {
    const tb = new TokenBucket(2, 1);
    tb.tryConsume();
    tb.tryConsume();
    expect(tb.tryConsume()).toBe(false);
  });

  it("tryConsume with count", () => {
    const tb = new TokenBucket(5, 1);
    expect(tb.tryConsume(3)).toBe(true);
    expect(tb.available).toBe(2);
    expect(tb.tryConsume(3)).toBe(false);
  });
});

describe("FixedWindowCounter", () => {
  it("allows up to max requests", () => {
    const fw = new FixedWindowCounter(1000, 3);
    expect(fw.tryAcquire()).toBe(true);
    expect(fw.tryAcquire()).toBe(true);
    expect(fw.tryAcquire()).toBe(true);
    expect(fw.tryAcquire()).toBe(false);
  });

  it("remaining reflects usage", () => {
    const fw = new FixedWindowCounter(1000, 5);
    fw.tryAcquire();
    fw.tryAcquire();
    expect(fw.remaining).toBe(3);
  });
});

describe("SlidingWindowCounter", () => {
  it("allows up to max requests", () => {
    const sw = new SlidingWindowCounter(1000, 3);
    expect(sw.tryAcquire()).toBe(true);
    expect(sw.tryAcquire()).toBe(true);
    expect(sw.tryAcquire()).toBe(true);
    expect(sw.tryAcquire()).toBe(false);
  });

  it("remaining shows available slots", () => {
    const sw = new SlidingWindowCounter(1000, 5);
    sw.tryAcquire();
    expect(sw.remaining).toBeLessThanOrEqual(4);
  });
});
