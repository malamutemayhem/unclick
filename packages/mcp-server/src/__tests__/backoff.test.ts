import { describe, it, expect, vi } from "vitest";
import { exponentialBackoff, linearBackoff, constantBackoff, retryWithBackoff } from "../backoff.js";

describe("exponentialBackoff", () => {
  it("increases with each attempt", () => {
    const d0 = exponentialBackoff(0, { jitter: false });
    const d1 = exponentialBackoff(1, { jitter: false });
    const d2 = exponentialBackoff(2, { jitter: false });
    expect(d0).toBe(1000);
    expect(d1).toBe(2000);
    expect(d2).toBe(4000);
  });

  it("caps at maxMs", () => {
    const delay = exponentialBackoff(100, { jitter: false, maxMs: 5000 });
    expect(delay).toBe(5000);
  });

  it("applies jitter by default", () => {
    const delays = new Set<number>();
    for (let i = 0; i < 10; i++) delays.add(exponentialBackoff(2));
    expect(delays.size).toBeGreaterThan(1);
  });
});

describe("linearBackoff", () => {
  it("increases linearly", () => {
    expect(linearBackoff(0)).toBe(1000);
    expect(linearBackoff(1)).toBe(2000);
    expect(linearBackoff(2)).toBe(3000);
  });

  it("caps at maxMs", () => {
    expect(linearBackoff(100, { maxMs: 5000 })).toBe(5000);
  });
});

describe("constantBackoff", () => {
  it("returns the same value", () => {
    expect(constantBackoff(500)).toBe(500);
    expect(constantBackoff()).toBe(1000);
  });
});

describe("retryWithBackoff", () => {
  it("returns on first success", async () => {
    const fn = vi.fn().mockResolvedValue("ok");
    const result = await retryWithBackoff(fn, { maxAttempts: 3 });
    expect(result).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries on failure then succeeds", async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error("fail1"))
      .mockResolvedValue("ok");
    const result = await retryWithBackoff(fn, {
      maxAttempts: 3,
      backoff: () => 0,
    });
    expect(result).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("throws after max attempts", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("fail"));
    await expect(retryWithBackoff(fn, { maxAttempts: 2, backoff: () => 0 }))
      .rejects.toThrow("fail");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("respects shouldRetry", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("permanent"));
    await expect(retryWithBackoff(fn, {
      maxAttempts: 5,
      backoff: () => 0,
      shouldRetry: () => false,
    })).rejects.toThrow("permanent");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("calls onRetry callback", async () => {
    const onRetry = vi.fn();
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValue("ok");
    await retryWithBackoff(fn, {
      maxAttempts: 3,
      backoff: () => 0,
      onRetry,
    });
    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(onRetry).toHaveBeenCalledWith(expect.any(Error), 0, 0);
  });
});
