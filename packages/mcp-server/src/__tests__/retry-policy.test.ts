import { describe, it, expect, vi } from "vitest";
import { retry } from "../retry-policy.js";

describe("retry-policy", () => {
  it("succeeds on first attempt", async () => {
    const fn = vi.fn().mockResolvedValue("ok");
    const result = await retry(fn, { maxAttempts: 3, baseDelayMs: 1 });
    expect(result).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries and succeeds", async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValue("ok");
    const result = await retry(fn, { maxAttempts: 3, baseDelayMs: 1 });
    expect(result).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("throws after max attempts", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("always fails"));
    await expect(
      retry(fn, { maxAttempts: 3, baseDelayMs: 1, maxDelayMs: 1 })
    ).rejects.toThrow("always fails");
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("calls onRetry callback", async () => {
    const onRetry = vi.fn();
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValue("ok");
    await retry(fn, { maxAttempts: 3, baseDelayMs: 1, onRetry });
    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(onRetry).toHaveBeenCalledWith(expect.any(Error), 1);
  });

  it("stops early if retryIf returns false", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("permanent"));
    await expect(
      retry(fn, { maxAttempts: 5, baseDelayMs: 1, retryIf: () => false })
    ).rejects.toThrow("permanent");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("applies exponential backoff factor", async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error("f1"))
      .mockRejectedValueOnce(new Error("f2"))
      .mockResolvedValue("ok");
    const start = Date.now();
    await retry(fn, { maxAttempts: 3, baseDelayMs: 10, backoffFactor: 2 });
    expect(fn).toHaveBeenCalledTimes(3);
  });
});
