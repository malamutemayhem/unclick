import { describe, it, expect } from "vitest";
import { ConstantBackoff, LinearBackoff, ExponentialBackoff, JitteredBackoff, DecorrelatedJitterBackoff, retryWithBackoff, computeDelays } from "../retry-backoff.js";

describe("retry-backoff", () => {
  describe("ConstantBackoff", () => {
    it("returns same delay every time", () => {
      const b = new ConstantBackoff(100);
      expect(b.delay(0)).toBe(100);
      expect(b.delay(5)).toBe(100);
    });
  });

  describe("LinearBackoff", () => {
    it("increases linearly", () => {
      const b = new LinearBackoff(100, 50);
      expect(b.delay(0)).toBe(100);
      expect(b.delay(1)).toBe(150);
      expect(b.delay(2)).toBe(200);
    });
  });

  describe("ExponentialBackoff", () => {
    it("increases exponentially", () => {
      const b = new ExponentialBackoff(100, 2, 10000);
      expect(b.delay(0)).toBe(100);
      expect(b.delay(1)).toBe(200);
      expect(b.delay(2)).toBe(400);
    });

    it("caps at max", () => {
      const b = new ExponentialBackoff(100, 2, 500);
      expect(b.delay(10)).toBe(500);
    });
  });

  describe("JitteredBackoff", () => {
    it("adds jitter to base delay", () => {
      const inner = new ConstantBackoff(100);
      const b = new JitteredBackoff(inner, 0.5);
      const d = b.delay(0);
      expect(d).toBeGreaterThanOrEqual(100);
      expect(d).toBeLessThanOrEqual(150);
    });
  });

  describe("DecorrelatedJitterBackoff", () => {
    it("returns at least base delay", () => {
      const b = new DecorrelatedJitterBackoff(100);
      expect(b.delay(0)).toBeGreaterThanOrEqual(100);
    });
  });

  describe("retryWithBackoff", () => {
    it("succeeds on first try", async () => {
      const result = await retryWithBackoff(async () => 42, new ConstantBackoff(1), 3);
      expect(result).toBe(42);
    });

    it("retries on failure then succeeds", async () => {
      let attempt = 0;
      const result = await retryWithBackoff(async () => {
        if (attempt++ < 2) throw new Error("fail");
        return "ok";
      }, new ConstantBackoff(1), 5);
      expect(result).toBe("ok");
    });

    it("throws after max attempts", async () => {
      await expect(retryWithBackoff(
        async () => { throw new Error("always fails"); },
        new ConstantBackoff(1),
        3
      )).rejects.toThrow("always fails");
    });

    it("respects shouldRetry", async () => {
      let attempts = 0;
      await expect(retryWithBackoff(
        async () => { attempts++; throw new Error("fatal"); },
        new ConstantBackoff(1),
        5,
        () => false
      )).rejects.toThrow("fatal");
      expect(attempts).toBe(1);
    });
  });

  describe("computeDelays", () => {
    it("computes delay schedule", () => {
      const delays = computeDelays(new ExponentialBackoff(100, 2, 10000), 4);
      expect(delays).toEqual([100, 200, 400, 800]);
    });
  });
});
