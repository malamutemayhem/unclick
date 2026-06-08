import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TokenBucket } from "../token-bucket.js";

describe("TokenBucket", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it("allows consumption up to max tokens", () => {
    const bucket = new TokenBucket({ maxTokens: 5, refillRate: 1 });
    expect(bucket.consume(3)).toBe(true);
    expect(bucket.consume(3)).toBe(false);
    expect(bucket.consume(2)).toBe(true);
  });

  it("refills over time", () => {
    const now = Date.now();
    const bucket = new TokenBucket({ maxTokens: 10, refillRate: 2 });
    bucket.consume(10, now);
    expect(bucket.consume(1, now)).toBe(false);
    expect(bucket.consume(4, now + 2500)).toBe(true);
  });

  it("does not exceed maxTokens", () => {
    const now = Date.now();
    const bucket = new TokenBucket({ maxTokens: 5, refillRate: 10 });
    bucket.consume(5, now);
    const available = bucket.available;
    expect(available).toBeLessThanOrEqual(5);
  });

  it("tryConsume returns retryAfterMs", () => {
    const now = Date.now();
    const bucket = new TokenBucket({ maxTokens: 10, refillRate: 2 });
    bucket.consume(10, now);
    const result = bucket.tryConsume(4, now);
    expect(result.allowed).toBe(false);
    expect(result.retryAfterMs).toBeGreaterThan(0);
  });

  it("reset restores all tokens", () => {
    const bucket = new TokenBucket({ maxTokens: 10, refillRate: 1 });
    bucket.consume(10);
    bucket.reset();
    expect(bucket.available).toBe(10);
  });

  it("supports initialTokens", () => {
    const bucket = new TokenBucket({ maxTokens: 10, refillRate: 1, initialTokens: 0 });
    expect(bucket.consume(1)).toBe(false);
  });
});
