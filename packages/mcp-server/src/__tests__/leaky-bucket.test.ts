import { describe, it, expect } from "vitest";
import { LeakyBucket } from "../leaky-bucket.js";

describe("LeakyBucket", () => {
  it("accepts under capacity", () => {
    const bucket = new LeakyBucket(5, 1);
    expect(bucket.add(3)).toBe(true);
    expect(bucket.add(2)).toBe(true);
  });

  it("rejects over capacity", () => {
    const bucket = new LeakyBucket(3, 1);
    expect(bucket.add(3)).toBe(true);
    expect(bucket.add(1)).toBe(false);
  });

  it("leaks over time", () => {
    const bucket = new LeakyBucket(10, 10);
    const now = 1000;
    bucket.add(10, now);
    expect(bucket.add(5, now + 1000)).toBe(true);
  });

  it("waitTime returns 0 when space available", () => {
    const bucket = new LeakyBucket(5, 1);
    expect(bucket.waitTime(1)).toBe(0);
  });

  it("waitTime returns positive when full", () => {
    const bucket = new LeakyBucket(3, 1);
    const now = 1000;
    bucket.add(3, now);
    expect(bucket.waitTime(1, now)).toBeGreaterThan(0);
  });

  it("reset empties bucket", () => {
    const bucket = new LeakyBucket(5, 1);
    bucket.add(5);
    bucket.reset();
    expect(bucket.isEmpty).toBe(true);
  });

  it("isFull and isEmpty", () => {
    const bucket = new LeakyBucket(3, 1);
    expect(bucket.isEmpty).toBe(true);
    bucket.add(3);
    expect(bucket.isFull).toBe(true);
  });
});
