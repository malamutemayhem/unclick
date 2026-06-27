import { describe, it, expect } from "vitest";
import { TokenBucket, SlidingWindowCounter, LeakyBucket, AdaptiveRateLimiter } from "../rate-limiter-advanced.js";

describe("TokenBucket", () => {
  it("allows consumption within capacity", () => {
    const bucket = new TokenBucket({ capacity: 10, refillRate: 1, refillInterval: 1000 });
    expect(bucket.tryConsume(5)).toBe(true);
    expect(bucket.available()).toBe(5);
  });

  it("rejects when exhausted", () => {
    const bucket = new TokenBucket({ capacity: 2, refillRate: 1, refillInterval: 1000 });
    bucket.tryConsume(2);
    expect(bucket.tryConsume(1)).toBe(false);
  });

  it("refills over time", () => {
    const now = 1000000;
    const bucket = new TokenBucket({ capacity: 10, refillRate: 5, refillInterval: 1000 }, now);
    bucket.tryConsume(10, now);
    expect(bucket.tryConsume(1, now)).toBe(false);
    expect(bucket.tryConsume(5, now + 1000)).toBe(true);
  });

  it("does not exceed capacity on refill", () => {
    const now = 1000000;
    const bucket = new TokenBucket({ capacity: 5, refillRate: 10, refillInterval: 1000 }, now);
    bucket.tryConsume(3, now);
    bucket.tryConsume(1, now + 5000);
    expect(bucket.available()).toBe(4);
  });
});

describe("SlidingWindowCounter", () => {
  it("allows requests within limit", () => {
    const counter = new SlidingWindowCounter(1000, 5);
    const now = 100000;
    expect(counter.hit(now)).toBe(true);
    expect(counter.hit(now + 1)).toBe(true);
  });

  it("blocks when limit reached", () => {
    const counter = new SlidingWindowCounter(1000, 3);
    const now = 100000;
    counter.hit(now);
    counter.hit(now + 1);
    counter.hit(now + 2);
    expect(counter.hit(now + 3)).toBe(false);
  });

  it("reports current count", () => {
    const counter = new SlidingWindowCounter(1000, 10);
    const now = 100000;
    counter.hit(now);
    counter.hit(now + 1);
    expect(counter.currentCount(now + 2)).toBeGreaterThanOrEqual(2);
  });
});

describe("LeakyBucket", () => {
  it("accepts requests within capacity", () => {
    const bucket = new LeakyBucket(5, 1);
    const now = Date.now();
    expect(bucket.add(now)).toBe(true);
    expect(bucket.size()).toBe(1);
  });

  it("rejects when full", () => {
    const bucket = new LeakyBucket(2, 1);
    const now = Date.now();
    bucket.add(now);
    bucket.add(now);
    expect(bucket.add(now)).toBe(false);
  });
});

describe("AdaptiveRateLimiter", () => {
  it("starts with base capacity", () => {
    const limiter = new AdaptiveRateLimiter(10, 5);
    expect(limiter.getCapacity()).toBe(10);
  });

  it("reduces capacity on errors", () => {
    const limiter = new AdaptiveRateLimiter(10, 5);
    limiter.recordError();
    limiter.recordError();
    limiter.recordError();
    limiter.recordError();
    expect(limiter.getCapacity()).toBeLessThan(10);
  });

  it("reports stats", () => {
    const limiter = new AdaptiveRateLimiter(10, 5);
    limiter.recordSuccess();
    limiter.recordError();
    const stats = limiter.getStats();
    expect(stats.successes).toBe(1);
    expect(stats.errors).toBe(1);
  });
});
