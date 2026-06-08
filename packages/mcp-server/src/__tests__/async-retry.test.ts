import { describe, it, expect } from "vitest";
import { AsyncRetry } from "../async-retry.js";

describe("AsyncRetry", () => {
  it("execute succeeds on first try", async () => {
    const result = await AsyncRetry.execute(
      async () => 42,
      { maxAttempts: 3, delayMs: 0 }
    );
    expect(result.success).toBe(true);
    expect(result.value).toBe(42);
    expect(result.attempts).toBe(1);
  });

  it("execute retries on failure", async () => {
    let calls = 0;
    const result = await AsyncRetry.execute(
      async () => {
        calls++;
        if (calls < 3) throw new Error("fail");
        return "ok";
      },
      { maxAttempts: 5, delayMs: 0 }
    );
    expect(result.success).toBe(true);
    expect(result.value).toBe("ok");
    expect(result.attempts).toBe(3);
  });

  it("execute fails after max attempts", async () => {
    const result = await AsyncRetry.execute(
      async () => { throw new Error("always fail"); },
      { maxAttempts: 3, delayMs: 0 }
    );
    expect(result.success).toBe(false);
    expect(result.attempts).toBe(3);
  });

  it("retryOn skips retries for non-retryable errors", async () => {
    const result = await AsyncRetry.execute(
      async () => { throw new Error("fatal"); },
      {
        maxAttempts: 5,
        delayMs: 0,
        retryOn: (err) => (err as Error).message !== "fatal",
      }
    );
    expect(result.success).toBe(false);
    expect(result.attempts).toBe(1);
  });

  it("withTimeout resolves before timeout", async () => {
    const value = await AsyncRetry.withTimeout(
      async () => "fast",
      1000
    );
    expect(value).toBe("fast");
  });

  it("withTimeout rejects on timeout", async () => {
    await expect(
      AsyncRetry.withTimeout(
        () => new Promise((r) => setTimeout(r, 5000)),
        10
      )
    ).rejects.toThrow("Timeout");
  });

  it("computeDelay applies exponential backoff", () => {
    expect(AsyncRetry.computeDelay(1, 100, 2, 10000)).toBe(100);
    expect(AsyncRetry.computeDelay(2, 100, 2, 10000)).toBe(200);
    expect(AsyncRetry.computeDelay(3, 100, 2, 10000)).toBe(400);
  });

  it("computeDelay respects maxDelay", () => {
    expect(AsyncRetry.computeDelay(10, 100, 2, 500)).toBe(500);
  });

  it("computeJitter returns value near delay", () => {
    const jittered = AsyncRetry.computeJitter(100, 0.5);
    expect(jittered).toBeGreaterThanOrEqual(50);
    expect(jittered).toBeLessThanOrEqual(150);
  });

  it("totalTimeMs tracks elapsed time", async () => {
    const result = await AsyncRetry.execute(
      async () => 1,
      { maxAttempts: 1, delayMs: 0 }
    );
    expect(result.totalTimeMs).toBeGreaterThanOrEqual(0);
  });
});
