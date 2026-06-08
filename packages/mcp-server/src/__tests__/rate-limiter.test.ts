import { describe, it, expect } from "vitest";
import { SlidingWindowRateLimiter, TokenBucketRateLimiter } from "../rate-limiter.js";

describe("SlidingWindowRateLimiter", () => {
  it("allows up to max requests", () => {
    const rl = new SlidingWindowRateLimiter(3, 10000);
    expect(rl.attempt("user1", 1000)).toBe(true);
    expect(rl.attempt("user1", 2000)).toBe(true);
    expect(rl.attempt("user1", 3000)).toBe(true);
    expect(rl.attempt("user1", 4000)).toBe(false);
  });

  it("resets after window expires", () => {
    const rl = new SlidingWindowRateLimiter(2, 1000);
    rl.attempt("k", 1000);
    rl.attempt("k", 1500);
    expect(rl.attempt("k", 1800)).toBe(false);
    expect(rl.attempt("k", 2500)).toBe(true);
  });

  it("tracks remaining", () => {
    const rl = new SlidingWindowRateLimiter(5, 10000);
    expect(rl.remaining("k", 1000)).toBe(5);
    rl.attempt("k", 1000);
    expect(rl.remaining("k", 1000)).toBe(4);
  });

  it("isolates keys", () => {
    const rl = new SlidingWindowRateLimiter(1, 10000);
    rl.attempt("a", 1000);
    expect(rl.attempt("b", 1000)).toBe(true);
  });

  it("reset clears a key", () => {
    const rl = new SlidingWindowRateLimiter(1, 10000);
    rl.attempt("k", 1000);
    rl.reset("k");
    expect(rl.attempt("k", 1000)).toBe(true);
  });
});

describe("TokenBucketRateLimiter", () => {
  it("allows requests within bucket", () => {
    const rl = new TokenBucketRateLimiter(10, 1);
    expect(rl.attempt("k", 5, 1000)).toBe(true);
    expect(rl.remaining("k", 1000)).toBe(5);
  });

  it("rejects when bucket empty", () => {
    const rl = new TokenBucketRateLimiter(2, 1);
    rl.attempt("k", 2, 1000);
    expect(rl.attempt("k", 1, 1000)).toBe(false);
  });

  it("refills over time", () => {
    const rl = new TokenBucketRateLimiter(10, 5);
    rl.attempt("k", 10, 1000);
    expect(rl.remaining("k", 1000)).toBe(0);
    expect(rl.remaining("k", 2000)).toBe(5);
  });

  it("caps at maxTokens", () => {
    const rl = new TokenBucketRateLimiter(10, 100);
    expect(rl.remaining("k", 100000)).toBe(10);
  });
});
