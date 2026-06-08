import { describe, it, expect, vi } from "vitest";
import { RetryPolicy } from "../retry-policy.js";

describe("RetryPolicy", () => {
  it("succeeds on first attempt", async () => {
    const policy = new RetryPolicy({ maxAttempts: 3, baseDelayMs: 1 });
    const result = await policy.execute(async () => "ok");
    expect(result).toBe("ok");
  });

  it("retries and eventually succeeds", async () => {
    let calls = 0;
    const policy = new RetryPolicy({ maxAttempts: 3, baseDelayMs: 1, jitter: false });
    const result = await policy.execute(async () => {
      calls++;
      if (calls < 3) throw new Error("not yet");
      return "done";
    });
    expect(result).toBe("done");
    expect(calls).toBe(3);
  });

  it("throws after max attempts", async () => {
    const policy = new RetryPolicy({ maxAttempts: 2, baseDelayMs: 1 });
    await expect(
      policy.execute(async () => { throw new Error("always fails"); })
    ).rejects.toThrow("always fails");
  });

  it("calls onRetry callback", async () => {
    const retries: number[] = [];
    const policy = new RetryPolicy({
      maxAttempts: 3,
      baseDelayMs: 1,
      jitter: false,
      onRetry: (_err, attempt) => retries.push(attempt),
    });
    await policy.execute(async (attempt) => {
      if (attempt < 3) throw new Error("fail");
      return "ok";
    });
    expect(retries).toEqual([1, 2]);
  });

  it("retryOn can stop retries early", async () => {
    let calls = 0;
    const policy = new RetryPolicy({
      maxAttempts: 5,
      baseDelayMs: 1,
      retryOn: (err) => (err as Error).message !== "fatal",
    });
    await expect(
      policy.execute(async () => { calls++; throw new Error("fatal"); })
    ).rejects.toThrow("fatal");
    expect(calls).toBe(1);
  });

  it("calculateDelay respects maxDelayMs", () => {
    const policy = new RetryPolicy({
      maxAttempts: 10,
      baseDelayMs: 1000,
      maxDelayMs: 5000,
      backoffMultiplier: 10,
      jitter: false,
    });
    const delay = policy.calculateDelay(5);
    expect(delay).toBeLessThanOrEqual(5000);
  });
});
