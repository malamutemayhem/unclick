import { describe, it, expect, vi } from "vitest";
import { retry, retryWithTimeout, withRetry, isRetryable } from "../retry.js";

describe("retry", () => {
  it("returns on first success", async () => {
    const fn = vi.fn().mockResolvedValue(42);
    expect(await retry(fn)).toBe(42);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries on failure then succeeds", async () => {
    let calls = 0;
    const result = await retry(async () => {
      calls++;
      if (calls < 3) throw new Error("fail");
      return "ok";
    }, { maxAttempts: 3, initialDelayMs: 1 });
    expect(result).toBe("ok");
    expect(calls).toBe(3);
  });

  it("throws after max attempts", async () => {
    await expect(retry(async () => { throw new Error("nope"); }, { maxAttempts: 2, initialDelayMs: 1 }))
      .rejects.toThrow("nope");
  });

  it("stops when shouldRetry returns false", async () => {
    let calls = 0;
    await expect(retry(async () => {
      calls++;
      throw new Error("stop");
    }, { maxAttempts: 5, initialDelayMs: 1, shouldRetry: () => false }))
      .rejects.toThrow("stop");
    expect(calls).toBe(1);
  });

  it("calls onRetry callback", async () => {
    const onRetry = vi.fn();
    let calls = 0;
    await retry(async () => {
      calls++;
      if (calls < 2) throw new Error("retry me");
      return "done";
    }, { maxAttempts: 3, initialDelayMs: 1, onRetry });
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("respects backoff multiplier", async () => {
    const onRetry = vi.fn();
    let calls = 0;
    await retry(async () => {
      calls++;
      if (calls < 3) throw new Error("fail");
      return "ok";
    }, { maxAttempts: 3, initialDelayMs: 10, backoffMultiplier: 2, onRetry });
    expect(onRetry).toHaveBeenCalledTimes(2);
    expect(onRetry.mock.calls[0][2]).toBe(10);
    expect(onRetry.mock.calls[1][2]).toBe(20);
  });
});

describe("retryWithTimeout", () => {
  it("throws on timeout", async () => {
    await expect(retryWithTimeout(
      async () => { await new Promise((r) => setTimeout(r, 500)); return 1; },
      50,
      { maxAttempts: 1, initialDelayMs: 1 }
    )).rejects.toThrow("Retry timed out");
  });
});

describe("withRetry", () => {
  it("wraps a function with retry", async () => {
    let calls = 0;
    const fn = withRetry(async (x: number) => {
      calls++;
      if (calls < 2) throw new Error("once");
      return x * 2;
    }, { maxAttempts: 3, initialDelayMs: 1 });
    expect(await fn(5)).toBe(10);
  });
});

describe("isRetryable", () => {
  it("detects timeout", () => { expect(isRetryable(new Error("Connection timeout"))).toBe(true); });
  it("detects 429", () => { expect(isRetryable(new Error("429 Too Many Requests"))).toBe(true); });
  it("detects 503", () => { expect(isRetryable(new Error("503 Service Unavailable"))).toBe(true); });
  it("rejects unknown errors", () => { expect(isRetryable(new Error("Syntax error"))).toBe(false); });
});
