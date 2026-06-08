import { describe, it, expect } from "vitest";
import { TokenBucket, LeakyBucket } from "../token-bucket.js";

describe("TokenBucket", () => {
  it("allows consumption within capacity", () => {
    const tb = new TokenBucket(10, 1);
    expect(tb.consume(5)).toBe(true);
    expect(tb.consume(5)).toBe(true);
    expect(tb.consume(1)).toBe(false);
  });

  it("tracks available tokens", () => {
    const tb = new TokenBucket(10, 1);
    tb.consume(3);
    expect(tb.available).toBe(7);
  });

  it("tryConsume returns retry info", () => {
    const tb = new TokenBucket(5, 10);
    tb.consume(5);
    const result = tb.tryConsume(1);
    expect(result.allowed).toBe(false);
    expect(result.retryAfterMs).toBeGreaterThan(0);
  });

  it("reset restores capacity", () => {
    const tb = new TokenBucket(10, 1);
    tb.consume(10);
    tb.reset();
    expect(tb.available).toBe(10);
  });
});

describe("LeakyBucket", () => {
  it("accepts within capacity", () => {
    const lb = new LeakyBucket(5, 1);
    expect(lb.add()).toBe(true);
    expect(lb.add()).toBe(true);
    expect(lb.size).toBe(2);
  });

  it("rejects when full", () => {
    const lb = new LeakyBucket(2, 0.001);
    lb.add();
    lb.add();
    expect(lb.add()).toBe(false);
  });

  it("remaining tracks space", () => {
    const lb = new LeakyBucket(5, 1);
    lb.add();
    lb.add();
    expect(lb.remaining).toBe(3);
  });
});
