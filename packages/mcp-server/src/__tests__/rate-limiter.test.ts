import { describe, it, expect } from "vitest";
import { RateLimiter, TokenBucketLimiter } from "../rate-limiter.js";

describe("RateLimiter", () => {
  it("allows requests within limit", () => {
    const rl = new RateLimiter(3, 1000);
    const now = 1000;
    expect(rl.tryAcquire(now)).toBe(true);
    expect(rl.tryAcquire(now + 1)).toBe(true);
    expect(rl.tryAcquire(now + 2)).toBe(true);
    expect(rl.tryAcquire(now + 3)).toBe(false);
  });

  it("allows after window expires", () => {
    const rl = new RateLimiter(1, 1000);
    expect(rl.tryAcquire(1000)).toBe(true);
    expect(rl.tryAcquire(1500)).toBe(false);
    expect(rl.tryAcquire(2001)).toBe(true);
  });

  it("retryAfter returns wait time", () => {
    const rl = new RateLimiter(1, 1000);
    rl.tryAcquire(1000);
    expect(rl.retryAfter(1500)).toBe(500);
  });

  it("reset clears state", () => {
    const rl = new RateLimiter(1, 1000);
    rl.tryAcquire(1000);
    rl.reset();
    expect(rl.tryAcquire(1000)).toBe(true);
  });
});

describe("TokenBucketLimiter", () => {
  it("allows requests up to bucket size", () => {
    const tbl = new TokenBucketLimiter(5, 1);
    expect(tbl.tryAcquire(3)).toBe(true);
    expect(tbl.tryAcquire(3)).toBe(false);
    expect(tbl.available).toBe(2);
  });

  it("refills over time", () => {
    const tbl = new TokenBucketLimiter(10, 10);
    const now = Date.now();
    tbl.tryAcquire(10, now);
    expect(tbl.tryAcquire(5, now + 1000)).toBe(true);
  });

  it("reset refills completely", () => {
    const tbl = new TokenBucketLimiter(5, 1);
    tbl.tryAcquire(5);
    tbl.reset();
    expect(tbl.available).toBe(5);
  });
});
