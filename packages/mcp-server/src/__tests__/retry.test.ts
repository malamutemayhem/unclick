import { describe, it, expect, vi, afterEach } from "vitest";
import { withRetry, retryOrThrow } from "../retry.js";

describe("withRetry", () => {
  afterEach(() => vi.useRealTimers());

  it("returns on first success", async () => {
    const fn = vi.fn().mockResolvedValue("ok");
    const result = await withRetry(fn);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data).toBe("ok");
    expect(result.attempts).toBe(1);
  });

  it("retries on transient errors", async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error("ECONNRESET"))
      .mockRejectedValueOnce(new Error("socket hang up"))
      .mockResolvedValue("recovered");

    const result = await withRetry(fn, { initialDelayMs: 1, maxDelayMs: 1 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data).toBe("recovered");
    expect(result.attempts).toBe(3);
  });

  it("does not retry non-transient errors", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("Invalid API key"));
    const result = await withRetry(fn, { initialDelayMs: 1 });
    expect(result.ok).toBe(false);
    expect(result.attempts).toBe(1);
  });

  it("retries on 429 status", async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce({ status: 429, message: "rate limited" })
      .mockResolvedValue("ok");

    const result = await withRetry(fn, { initialDelayMs: 1 });
    expect(result.ok).toBe(true);
    expect(result.attempts).toBe(2);
  });

  it("retries on 502/503/504 status", async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce({ status: 502 })
      .mockRejectedValueOnce({ status: 503 })
      .mockResolvedValue("ok");

    const result = await withRetry(fn, { initialDelayMs: 1 });
    expect(result.ok).toBe(true);
    expect(result.attempts).toBe(3);
  });

  it("gives up after maxRetries", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("ECONNRESET"));
    const result = await withRetry(fn, { maxRetries: 2, initialDelayMs: 1 });
    expect(result.ok).toBe(false);
    expect(result.attempts).toBe(3);
  });

  it("respects custom shouldRetry", async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error("custom error"))
      .mockResolvedValue("ok");

    const result = await withRetry(fn, {
      initialDelayMs: 1,
      shouldRetry: (err) => err instanceof Error && err.message === "custom error",
    });
    expect(result.ok).toBe(true);
  });
});

describe("retryOrThrow", () => {
  it("returns value on success", async () => {
    const result = await retryOrThrow(() => Promise.resolve("ok"));
    expect(result).toBe("ok");
  });

  it("throws on exhausted retries", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("ECONNRESET"));
    await expect(
      retryOrThrow(fn, { maxRetries: 1, initialDelayMs: 1 }),
    ).rejects.toThrow("ECONNRESET");
  });
});
