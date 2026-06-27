import { describe, it, expect } from "vitest";
import { SlidingWindowCounter, FixedWindowCounter, ConcurrencyLimiter } from "../rate-limiter-window.js";

describe("SlidingWindowCounter", () => {
  it("allows requests within limit", () => {
    const limiter = new SlidingWindowCounter(1000, 5);
    const now = Date.now();
    for (let i = 0; i < 5; i++) {
      expect(limiter.tryAcquire(now + i)).toBe(true);
    }
  });

  it("blocks when limit reached", () => {
    const limiter = new SlidingWindowCounter(1000, 3);
    const now = Date.now();
    limiter.tryAcquire(now);
    limiter.tryAcquire(now);
    limiter.tryAcquire(now);
    expect(limiter.tryAcquire(now)).toBe(false);
  });

  it("reset clears state", () => {
    const limiter = new SlidingWindowCounter(1000, 1);
    limiter.tryAcquire();
    limiter.reset();
    expect(limiter.tryAcquire()).toBe(true);
  });
});

describe("FixedWindowCounter", () => {
  it("allows within limit", () => {
    const limiter = new FixedWindowCounter(1000, 3);
    const now = Date.now();
    expect(limiter.tryAcquire(now)).toBe(true);
    expect(limiter.tryAcquire(now)).toBe(true);
    expect(limiter.tryAcquire(now)).toBe(true);
    expect(limiter.tryAcquire(now)).toBe(false);
  });

  it("resets on new window", () => {
    const limiter = new FixedWindowCounter(100, 2);
    const now = Date.now();
    limiter.tryAcquire(now);
    limiter.tryAcquire(now);
    expect(limiter.tryAcquire(now + 200)).toBe(true);
  });

  it("remaining tracks count", () => {
    const limiter = new FixedWindowCounter(60000, 5);
    limiter.tryAcquire();
    expect(limiter.remaining).toBe(4);
  });

  it("reset clears count", () => {
    const limiter = new FixedWindowCounter(60000, 3);
    limiter.tryAcquire();
    limiter.tryAcquire();
    limiter.reset();
    expect(limiter.remaining).toBe(3);
  });
});

describe("ConcurrencyLimiter", () => {
  it("allows up to max concurrent", () => {
    const limiter = new ConcurrencyLimiter(2);
    expect(limiter.tryAcquire()).toBe(true);
    expect(limiter.tryAcquire()).toBe(true);
    expect(limiter.tryAcquire()).toBe(false);
  });

  it("release frees a slot", () => {
    const limiter = new ConcurrencyLimiter(1);
    limiter.tryAcquire();
    limiter.release();
    expect(limiter.tryAcquire()).toBe(true);
  });

  it("tracks remaining and current", () => {
    const limiter = new ConcurrencyLimiter(3);
    limiter.tryAcquire();
    expect(limiter.current).toBe(1);
    expect(limiter.remaining).toBe(2);
  });

  it("release does not go below zero", () => {
    const limiter = new ConcurrencyLimiter(1);
    limiter.release();
    expect(limiter.current).toBe(0);
  });
});
