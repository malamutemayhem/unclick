import { describe, it, expect } from "vitest";
import { JumpHash } from "../jump-hash.js";

describe("JumpHash", () => {
  it("hash returns valid bucket", () => {
    const bucket = JumpHash.hash(42, 10);
    expect(bucket).toBeGreaterThanOrEqual(0);
    expect(bucket).toBeLessThan(10);
  });

  it("hashString returns valid bucket", () => {
    const bucket = JumpHash.hashString("hello", 5);
    expect(bucket).toBeGreaterThanOrEqual(0);
    expect(bucket).toBeLessThan(5);
  });

  it("same key always maps to same bucket", () => {
    const b1 = JumpHash.hashString("stable", 8);
    const b2 = JumpHash.hashString("stable", 8);
    expect(b1).toBe(b2);
  });

  it("distribution assigns keys to all buckets", () => {
    const keys = Array.from({ length: 1000 }, (_, i) => `key-${i}`);
    const dist = JumpHash.distribution(keys, 5);
    expect(dist.length).toBe(5);
    for (const count of dist) {
      expect(count).toBeGreaterThan(0);
    }
  });

  it("balanceScore measures distribution quality", () => {
    const balanced = [100, 100, 100, 100];
    expect(JumpHash.balanceScore(balanced)).toBe(1);
  });

  it("monotonicity holds when adding buckets", () => {
    const holds = JumpHash.monotonicity("test-key", 5, 6);
    expect(holds).toBe(true);
  });

  it("hash with single bucket always returns 0", () => {
    expect(JumpHash.hash(123, 1)).toBe(0);
    expect(JumpHash.hash(456, 1)).toBe(0);
  });
});
