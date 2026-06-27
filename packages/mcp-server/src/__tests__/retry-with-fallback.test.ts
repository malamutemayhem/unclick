import { describe, it, expect } from "vitest";
import { retryWithFallback, retryUntil } from "../retry-with-fallback.js";

describe("retryWithFallback", () => {
  it("returns on first success", async () => {
    const result = await retryWithFallback(
      async () => 42,
      async () => 0,
    );
    expect(result).toBe(42);
  });

  it("retries then succeeds", async () => {
    let calls = 0;
    const result = await retryWithFallback(
      async () => { calls++; if (calls < 3) throw new Error("fail"); return 99; },
      async () => 0,
      { maxAttempts: 3, delayMs: 1 },
    );
    expect(result).toBe(99);
    expect(calls).toBe(3);
  });

  it("falls back after all retries fail", async () => {
    const result = await retryWithFallback(
      async () => { throw new Error("always fails"); },
      async () => "fallback",
      { maxAttempts: 2, delayMs: 1 },
    );
    expect(result).toBe("fallback");
  });

  it("throws AggregateError when both fail", async () => {
    await expect(retryWithFallback(
      async () => { throw new Error("primary"); },
      async () => { throw new Error("fallback"); },
      { maxAttempts: 1, delayMs: 1 },
    )).rejects.toThrow("Both primary and fallback failed");
  });

  it("calls onRetry callback", async () => {
    const attempts: number[] = [];
    await retryWithFallback(
      async () => { throw new Error("fail"); },
      async () => "ok",
      { maxAttempts: 3, delayMs: 1, onRetry: (a) => attempts.push(a) },
    );
    expect(attempts).toEqual([1, 2, 3]);
  });
});

describe("retryUntil", () => {
  it("returns when predicate matches", async () => {
    let n = 0;
    const result = await retryUntil(
      async () => ++n,
      (v) => v >= 3,
      5,
      1,
    );
    expect(result).toBe(3);
  });

  it("throws after max attempts", async () => {
    await expect(retryUntil(
      async () => 0,
      (v) => v > 0,
      3,
      1,
    )).rejects.toThrow("not satisfied");
  });
});
