import { describe, it, expect } from "vitest";
import { retry, withRetry } from "../retry.js";

describe("retry", () => {
  it("returns on first success", async () => {
    const result = await retry(async () => 42, { maxAttempts: 3, baseDelayMs: 1 });
    expect(result).toBe(42);
  });

  it("retries on failure then succeeds", async () => {
    let attempts = 0;
    const result = await retry(async () => {
      attempts++;
      if (attempts < 3) throw new Error("fail");
      return "ok";
    }, { maxAttempts: 5, baseDelayMs: 1 });
    expect(result).toBe("ok");
    expect(attempts).toBe(3);
  });

  it("throws after max attempts", async () => {
    await expect(retry(async () => { throw new Error("always fail"); }, { maxAttempts: 2, baseDelayMs: 1 })).rejects.toThrow("always fail");
  });

  it("respects retryOn filter", async () => {
    let attempts = 0;
    await expect(retry(async () => {
      attempts++;
      throw new Error("nope");
    }, {
      maxAttempts: 5,
      baseDelayMs: 1,
      retryOn: () => false,
    })).rejects.toThrow("nope");
    expect(attempts).toBe(1);
  });

  it("withRetry wraps function", async () => {
    const fn = withRetry(async () => 42, { maxAttempts: 1 });
    expect(await fn()).toBe(42);
  });
});
