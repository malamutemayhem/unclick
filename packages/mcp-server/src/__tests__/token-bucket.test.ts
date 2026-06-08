import { describe, it, expect } from "vitest";
import { TokenBucket } from "../token-bucket.js";

describe("TokenBucket", () => {
  it("starts at capacity", () => {
    const tb = new TokenBucket(10, 1);
    expect(tb.available).toBe(10);
  });

  it("consume reduces tokens", () => {
    const tb = new TokenBucket(10, 1);
    expect(tb.consume(3)).toBe(true);
    expect(tb.available).toBe(7);
  });

  it("consume returns false when insufficient", () => {
    const tb = new TokenBucket(2, 1);
    expect(tb.consume(3)).toBe(false);
    expect(tb.available).toBe(2);
  });

  it("tryConsume returns retry info", () => {
    const tb = new TokenBucket(1, 10);
    tb.consume(1);
    const result = tb.tryConsume(1);
    expect(result.allowed).toBe(false);
    expect(result.retryAfterMs).toBeGreaterThan(0);
  });

  it("tryConsume allows when available", () => {
    const tb = new TokenBucket(5, 1);
    const result = tb.tryConsume(2);
    expect(result.allowed).toBe(true);
    expect(result.retryAfterMs).toBe(0);
  });

  it("reset restores capacity", () => {
    const tb = new TokenBucket(10, 1);
    tb.consume(10);
    tb.reset();
    expect(tb.available).toBe(10);
  });

  it("default consume is 1", () => {
    const tb = new TokenBucket(5, 1);
    tb.consume();
    expect(tb.available).toBe(4);
  });
});
