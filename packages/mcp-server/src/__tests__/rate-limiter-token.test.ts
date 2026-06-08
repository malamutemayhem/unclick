import { describe, it, expect } from "vitest";
import { TokenBucketLimiter, SlidingWindowLimiter } from "../rate-limiter-token.js";

describe("TokenBucketLimiter", () => {
  it("allows requests within capacity", () => {
    const limiter = new TokenBucketLimiter(5, 1, 0);
    expect(limiter.tryConsume(1, 0)).toBe(true);
    expect(limiter.tryConsume(1, 0)).toBe(true);
  });

  it("rejects when tokens exhausted", () => {
    const limiter = new TokenBucketLimiter(2, 1, 0);
    expect(limiter.tryConsume(1, 0)).toBe(true);
    expect(limiter.tryConsume(1, 0)).toBe(true);
    expect(limiter.tryConsume(1, 0)).toBe(false);
  });

  it("refills tokens over time", () => {
    const limiter = new TokenBucketLimiter(2, 2, 0);
    limiter.tryConsume(2, 0);
    expect(limiter.tryConsume(1, 0)).toBe(false);
    expect(limiter.tryConsume(1, 1000)).toBe(true);
  });

  it("availableTokens reflects state", () => {
    const limiter = new TokenBucketLimiter(10, 1, 0);
    limiter.tryConsume(3, 0);
    expect(limiter.availableTokens(0)).toBe(7);
  });

  it("timeUntilAvailable calculates delay", () => {
    const limiter = new TokenBucketLimiter(5, 2, 0);
    limiter.tryConsume(5, 0);
    const wait = limiter.timeUntilAvailable(2, 0);
    expect(wait).toBe(1000);
  });

  it("reset restores capacity", () => {
    const limiter = new TokenBucketLimiter(5, 1, 0);
    limiter.tryConsume(5, 0);
    limiter.reset(0);
    expect(limiter.availableTokens(0)).toBe(5);
  });

  it("getCapacity and getRefillRate", () => {
    const limiter = new TokenBucketLimiter(10, 3, 0);
    expect(limiter.getCapacity()).toBe(10);
    expect(limiter.getRefillRate()).toBe(3);
  });
});

describe("SlidingWindowLimiter", () => {
  it("allows requests within limit", () => {
    const limiter = new SlidingWindowLimiter(1000, 3);
    expect(limiter.tryAcquire(100)).toBe(true);
    expect(limiter.tryAcquire(200)).toBe(true);
    expect(limiter.tryAcquire(300)).toBe(true);
    expect(limiter.tryAcquire(400)).toBe(false);
  });

  it("sliding window expires old entries", () => {
    const limiter = new SlidingWindowLimiter(1000, 2);
    limiter.tryAcquire(0);
    limiter.tryAcquire(500);
    expect(limiter.tryAcquire(600)).toBe(false);
    expect(limiter.tryAcquire(1001)).toBe(true);
  });

  it("remaining tracks availability", () => {
    const limiter = new SlidingWindowLimiter(1000, 3);
    expect(limiter.remaining(0)).toBe(3);
    limiter.tryAcquire(0);
    expect(limiter.remaining(0)).toBe(2);
  });

  it("reset clears history", () => {
    const limiter = new SlidingWindowLimiter(1000, 1);
    limiter.tryAcquire(0);
    limiter.reset();
    expect(limiter.remaining(0)).toBe(1);
  });
});
