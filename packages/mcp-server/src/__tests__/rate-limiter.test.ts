import { describe, it, expect, vi, afterEach } from "vitest";
import { SlidingWindowLimiter, rateLimitKey } from "../rate-limiter.js";

describe("SlidingWindowLimiter", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows requests within the limit", () => {
    const limiter = new SlidingWindowLimiter({ maxRequests: 3, windowMs: 60_000 });
    expect(limiter.consume("key1").allowed).toBe(true);
    expect(limiter.consume("key1").allowed).toBe(true);
    expect(limiter.consume("key1").allowed).toBe(true);
  });

  it("denies requests over the limit", () => {
    const limiter = new SlidingWindowLimiter({ maxRequests: 2, windowMs: 60_000 });
    limiter.consume("key1");
    limiter.consume("key1");
    const result = limiter.consume("key1");
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
    expect(result.retryAfterMs).toBeGreaterThan(0);
  });

  it("tracks remaining count correctly", () => {
    const limiter = new SlidingWindowLimiter({ maxRequests: 5, windowMs: 60_000 });
    expect(limiter.consume("key1").remaining).toBe(4);
    expect(limiter.consume("key1").remaining).toBe(3);
    expect(limiter.consume("key1").remaining).toBe(2);
  });

  it("resets after window expires", () => {
    vi.useFakeTimers();
    const limiter = new SlidingWindowLimiter({ maxRequests: 1, windowMs: 1000 });
    limiter.consume("key1");
    expect(limiter.consume("key1").allowed).toBe(false);

    vi.advanceTimersByTime(1001);
    expect(limiter.consume("key1").allowed).toBe(true);
  });

  it("isolates keys from each other", () => {
    const limiter = new SlidingWindowLimiter({ maxRequests: 1, windowMs: 60_000 });
    limiter.consume("key1");
    expect(limiter.consume("key1").allowed).toBe(false);
    expect(limiter.consume("key2").allowed).toBe(true);
  });

  it("prunes stale buckets when exceeding maxBuckets", () => {
    vi.useFakeTimers();
    const limiter = new SlidingWindowLimiter({
      maxRequests: 10,
      windowMs: 1000,
      maxBuckets: 5,
    });

    for (let i = 0; i < 6; i++) {
      limiter.consume(`key${i}`);
    }

    vi.advanceTimersByTime(6000);
    limiter.consume("new_key");
    expect(limiter.size).toBeLessThanOrEqual(5);
  });

  it("reset removes a specific key", () => {
    const limiter = new SlidingWindowLimiter({ maxRequests: 1, windowMs: 60_000 });
    limiter.consume("key1");
    expect(limiter.consume("key1").allowed).toBe(false);
    limiter.reset("key1");
    expect(limiter.consume("key1").allowed).toBe(true);
  });
});

describe("rateLimitKey", () => {
  it("combines connector and tenant", () => {
    expect(rateLimitKey("stripe", "abc123")).toBe("stripe:abc123");
  });

  it("returns connector alone without tenant", () => {
    expect(rateLimitKey("stripe")).toBe("stripe");
  });
});
