import { describe, it, expect } from "vitest";
import { LeakyBucket } from "../leaky-bucket.js";

describe("LeakyBucket", () => {
  it("accepts within capacity", () => {
    const b = new LeakyBucket(10, 100);
    expect(b.add(5)).toBe(true);
    expect(b.add(5)).toBe(true);
  });

  it("rejects over capacity", () => {
    const b = new LeakyBucket(5, 100);
    expect(b.add(5)).toBe(true);
    expect(b.add(1)).toBe(false);
  });

  it("leaks over time", async () => {
    const b = new LeakyBucket(10, 200);
    b.add(10);
    await new Promise((r) => setTimeout(r, 60));
    expect(b.remaining).toBeGreaterThan(0);
  });

  it("tryAdd returns retry time", () => {
    const b = new LeakyBucket(5, 10);
    b.add(5);
    const result = b.tryAdd(1);
    expect(result.accepted).toBe(false);
    expect(result.retryAfterMs).toBeGreaterThan(0);
  });

  it("level tracks current water", () => {
    const b = new LeakyBucket(10, 100);
    b.add(3);
    expect(b.level).toBeCloseTo(3, 0);
  });

  it("reset empties the bucket", () => {
    const b = new LeakyBucket(10, 100);
    b.add(8);
    b.reset();
    expect(b.level).toBe(0);
    expect(b.remaining).toBe(10);
  });
});
