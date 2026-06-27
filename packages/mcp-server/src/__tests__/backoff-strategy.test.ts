import { describe, it, expect } from "vitest";
import { exponentialDelay, fibonacciDelay, linearDelay, constantDelay, decorrelatedJitter, delaySequence, withBackoff } from "../backoff-strategy.js";

describe("exponentialDelay", () => {
  it("increases with attempt", () => {
    const d0 = exponentialDelay(0, { jitter: false, baseDelayMs: 100 });
    const d1 = exponentialDelay(1, { jitter: false, baseDelayMs: 100 });
    const d2 = exponentialDelay(2, { jitter: false, baseDelayMs: 100 });
    expect(d1).toBeGreaterThan(d0);
    expect(d2).toBeGreaterThan(d1);
  });

  it("respects maxDelayMs", () => {
    const d = exponentialDelay(100, { jitter: false, maxDelayMs: 1000 });
    expect(d).toBeLessThanOrEqual(1000);
  });

  it("jitter reduces delay", () => {
    const delays = Array.from({ length: 100 }, () => exponentialDelay(3, { jitter: true, baseDelayMs: 100 }));
    expect(delays.some((d) => d < exponentialDelay(3, { jitter: false, baseDelayMs: 100 }))).toBe(true);
  });
});

describe("fibonacciDelay", () => {
  it("follows fibonacci pattern", () => {
    const d0 = fibonacciDelay(0, { jitter: false, baseDelayMs: 100 });
    const d1 = fibonacciDelay(1, { jitter: false, baseDelayMs: 100 });
    const d4 = fibonacciDelay(4, { jitter: false, baseDelayMs: 100 });
    expect(d0).toBe(100);
    expect(d1).toBe(100);
    expect(d4).toBe(500);
  });
});

describe("linearDelay", () => {
  it("increases linearly", () => {
    const d0 = linearDelay(0, { jitter: false, baseDelayMs: 100 });
    const d1 = linearDelay(1, { jitter: false, baseDelayMs: 100 });
    expect(d0).toBe(100);
    expect(d1).toBe(200);
  });
});

describe("constantDelay", () => {
  it("returns base delay without jitter", () => {
    expect(constantDelay({ jitter: false, baseDelayMs: 200 })).toBe(200);
  });
});

describe("decorrelatedJitter", () => {
  it("returns within bounds", () => {
    for (let i = 0; i < 50; i++) {
      const d = decorrelatedJitter(100, { baseDelayMs: 50, maxDelayMs: 5000 });
      expect(d).toBeGreaterThanOrEqual(50);
      expect(d).toBeLessThanOrEqual(5000);
    }
  });
});

describe("delaySequence", () => {
  it("generates sequence of delays", () => {
    const seq = delaySequence(5, "exponential", { jitter: false, baseDelayMs: 10 });
    expect(seq.length).toBe(5);
    for (let i = 1; i < seq.length; i++) {
      expect(seq[i]).toBeGreaterThanOrEqual(seq[i - 1]);
    }
  });
});

describe("withBackoff", () => {
  it("returns on first success", async () => {
    const result = await withBackoff(() => 42, { maxRetries: 3, baseDelayMs: 1 });
    expect(result).toBe(42);
  });

  it("retries and succeeds", async () => {
    let attempt = 0;
    const result = await withBackoff(() => {
      if (attempt++ < 2) throw new Error("fail");
      return "ok";
    }, { maxRetries: 3, baseDelayMs: 1 });
    expect(result).toBe("ok");
  });

  it("throws after max retries", async () => {
    await expect(withBackoff(() => { throw new Error("fail"); }, { maxRetries: 2, baseDelayMs: 1 })).rejects.toThrow("fail");
  });

  it("respects shouldRetry", async () => {
    let attempts = 0;
    await expect(withBackoff(
      () => { attempts++; throw new Error("nope"); },
      { maxRetries: 5, baseDelayMs: 1 },
      () => false,
    )).rejects.toThrow("nope");
    expect(attempts).toBe(1);
  });
});
