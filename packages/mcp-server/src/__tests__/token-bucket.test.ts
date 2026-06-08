import { describe, it, expect } from "vitest";
import { TokenBucket } from "../token-bucket.js";

describe("TokenBucket", () => {
  it("starts at capacity", () => {
    const bucket = new TokenBucket(10, 1);
    expect(bucket.available).toBe(10);
  });

  it("consumes tokens", () => {
    const bucket = new TokenBucket(10, 1);
    expect(bucket.consume(3)).toBe(true);
    expect(bucket.available).toBe(7);
  });

  it("rejects when insufficient", () => {
    const bucket = new TokenBucket(2, 1);
    expect(bucket.consume(3)).toBe(false);
  });

  it("tryConsume returns retry info", () => {
    const bucket = new TokenBucket(1, 10);
    bucket.consume(1);
    const result = bucket.tryConsume(1);
    expect(result.allowed).toBe(false);
    expect(result.retryAfterMs).toBeGreaterThan(0);
  });

  it("reset restores capacity", () => {
    const bucket = new TokenBucket(10, 1);
    bucket.consume(10);
    bucket.reset();
    expect(bucket.available).toBe(10);
  });

  it("refills over time", async () => {
    const bucket = new TokenBucket(10, 100);
    bucket.consume(5);
    await new Promise((r) => setTimeout(r, 60));
    expect(bucket.available).toBeGreaterThan(5);
  });
});
