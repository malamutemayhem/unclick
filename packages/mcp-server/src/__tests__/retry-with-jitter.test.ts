import { describe, it, expect, vi } from "vitest";
import { retryWithJitter, computeDelay } from "../retry-with-jitter.js";

describe("retry-with-jitter", () => {
  it("returns on first success", async () => {
    const result = await retryWithJitter(async () => 42);
    expect(result).toBe(42);
  });

  it("retries on failure then succeeds", async () => {
    let calls = 0;
    const result = await retryWithJitter(
      async () => {
        calls++;
        if (calls < 3) throw new Error("fail");
        return "ok";
      },
      { maxRetries: 3, baseDelay: 1 }
    );
    expect(result).toBe("ok");
    expect(calls).toBe(3);
  });

  it("throws after max retries", async () => {
    await expect(
      retryWithJitter(
        async () => { throw new Error("always fails"); },
        { maxRetries: 2, baseDelay: 1 }
      )
    ).rejects.toThrow("always fails");
  });

  it("respects shouldRetry", async () => {
    let calls = 0;
    await expect(
      retryWithJitter(
        async () => { calls++; throw new Error("stop"); },
        { maxRetries: 5, baseDelay: 1, shouldRetry: () => false }
      )
    ).rejects.toThrow("stop");
    expect(calls).toBe(1);
  });

  it("calls onRetry callback", async () => {
    const onRetry = vi.fn();
    await retryWithJitter(
      (() => {
        let c = 0;
        return async () => { c++; if (c < 2) throw new Error("x"); return "ok"; };
      })(),
      { maxRetries: 3, baseDelay: 1, onRetry }
    );
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("computeDelay with no jitter", () => {
    const d = computeDelay(0, 1000, 30000, "none");
    expect(d).toBe(1000);
  });

  it("computeDelay respects maxDelay", () => {
    const d = computeDelay(10, 1000, 5000, "none");
    expect(d).toBe(5000);
  });

  it("computeDelay with full jitter is bounded", () => {
    for (let i = 0; i < 20; i++) {
      const d = computeDelay(2, 100, 10000, "full");
      expect(d).toBeGreaterThanOrEqual(0);
      expect(d).toBeLessThanOrEqual(400);
    }
  });
});
