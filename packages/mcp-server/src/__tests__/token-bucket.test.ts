import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TokenBucket } from "../token-bucket.js";

describe("TokenBucket", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it("starts full", () => {
    const bucket = new TokenBucket(10, 1);
    expect(bucket.available()).toBe(10);
  });

  it("consumes tokens", () => {
    const bucket = new TokenBucket(10, 1);
    expect(bucket.tryConsume(3)).toBe(true);
    expect(bucket.available()).toBe(7);
  });

  it("rejects when insufficient tokens", () => {
    const bucket = new TokenBucket(5, 1);
    expect(bucket.tryConsume(3)).toBe(true);
    expect(bucket.tryConsume(3)).toBe(false);
  });

  it("refills over time", () => {
    const bucket = new TokenBucket(10, 5);
    bucket.tryConsume(10);
    expect(bucket.available()).toBe(0);
    vi.advanceTimersByTime(1000);
    expect(bucket.available()).toBe(5);
  });

  it("does not exceed capacity", () => {
    const bucket = new TokenBucket(10, 5);
    vi.advanceTimersByTime(10000);
    expect(bucket.available()).toBe(10);
  });

  it("consume returns wait time", () => {
    const bucket = new TokenBucket(5, 10);
    bucket.tryConsume(5);
    const waitMs = bucket.consume(2);
    expect(waitMs).toBeGreaterThan(0);
  });

  it("consume returns 0 when tokens available", () => {
    const bucket = new TokenBucket(10, 1);
    expect(bucket.consume(5)).toBe(0);
  });

  it("reset refills to capacity", () => {
    const bucket = new TokenBucket(10, 1);
    bucket.tryConsume(10);
    bucket.reset();
    expect(bucket.available()).toBe(10);
  });

  it("exposes capacity and rate", () => {
    const bucket = new TokenBucket(10, 5);
    expect(bucket.maxCapacity).toBe(10);
    expect(bucket.rate).toBe(5);
  });
});
