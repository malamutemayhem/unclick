import { describe, it, expect, vi } from "vitest";
import { retry, withRetry, CircuitBreaker } from "../retry.js";

describe("retry", () => {
  it("succeeds on first try", async () => {
    const fn = vi.fn().mockResolvedValue("ok");
    const result = await retry(fn, { maxAttempts: 3, jitter: false });
    expect(result).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries on failure then succeeds", async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error("fail1"))
      .mockResolvedValue("ok");
    const result = await retry(fn, { maxAttempts: 3, initialDelay: 1, jitter: false });
    expect(result).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("throws after max attempts", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("always fail"));
    await expect(retry(fn, { maxAttempts: 2, initialDelay: 1, jitter: false })).rejects.toThrow("always fail");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("respects retryIf", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("no retry"));
    await expect(retry(fn, {
      maxAttempts: 3,
      initialDelay: 1,
      retryIf: () => false,
    })).rejects.toThrow("no retry");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("calls onRetry callback", async () => {
    const onRetry = vi.fn();
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValue("ok");
    await retry(fn, { maxAttempts: 3, initialDelay: 1, jitter: false, onRetry });
    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(onRetry).toHaveBeenCalledWith(expect.any(Error), 1);
  });
});

describe("withRetry", () => {
  it("wraps a function with retry logic", async () => {
    const fn = vi.fn().mockResolvedValue(42);
    const wrapped = withRetry(fn, { maxAttempts: 2 });
    expect(await wrapped()).toBe(42);
  });
});

describe("CircuitBreaker", () => {
  it("starts closed", () => {
    const cb = new CircuitBreaker(3, 1000);
    expect(cb.state).toBe("closed");
  });

  it("opens after threshold failures", async () => {
    const cb = new CircuitBreaker(2, 100000);
    const fail = () => Promise.reject(new Error("fail"));
    for (let i = 0; i < 2; i++) {
      try { await cb.execute(fail); } catch {}
    }
    expect(cb.state).toBe("open");
    await expect(cb.execute(fail)).rejects.toThrow("Circuit breaker is open");
  });

  it("resets on success", async () => {
    const cb = new CircuitBreaker(3, 100000);
    try { await cb.execute(() => Promise.reject(new Error("x"))); } catch {}
    await cb.execute(() => Promise.resolve("ok"));
    expect(cb.state).toBe("closed");
  });

  it("reset() manually closes", async () => {
    const cb = new CircuitBreaker(1, 100000);
    try { await cb.execute(() => Promise.reject(new Error("x"))); } catch {}
    expect(cb.state).toBe("open");
    cb.reset();
    expect(cb.state).toBe("closed");
  });
});
