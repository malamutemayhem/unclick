import { describe, it, expect } from "vitest";
import { retryWith, withTimeout, retryWithFallback } from "../retry-policy.js";

describe("retryWith", () => {
  it("succeeds on first try", async () => {
    const result = await retryWith(() => Promise.resolve(42), { maxRetries: 3, baseDelay: 10 });
    expect(result).toBe(42);
  });

  it("retries on failure then succeeds", async () => {
    let attempts = 0;
    const result = await retryWith(() => {
      attempts++;
      if (attempts < 3) throw new Error("fail");
      return Promise.resolve("ok");
    }, { maxRetries: 5, baseDelay: 1 });
    expect(result).toBe("ok");
    expect(attempts).toBe(3);
  });

  it("throws after max retries", async () => {
    await expect(retryWith(
      () => Promise.reject(new Error("always fails")),
      { maxRetries: 2, baseDelay: 1 }
    )).rejects.toThrow("always fails");
  });

  it("respects retryOn filter", async () => {
    let attempts = 0;
    await expect(retryWith(
      () => { attempts++; throw new Error("not retryable"); },
      { maxRetries: 5, baseDelay: 1, retryOn: () => false }
    )).rejects.toThrow("not retryable");
    expect(attempts).toBe(1);
  });
});

describe("withTimeout", () => {
  it("resolves within timeout", async () => {
    const result = await withTimeout(Promise.resolve(1), 1000);
    expect(result).toBe(1);
  });

  it("rejects after timeout", async () => {
    await expect(withTimeout(
      new Promise((r) => setTimeout(r, 5000)),
      10
    )).rejects.toThrow("Timeout");
  });
});

describe("retryWithFallback", () => {
  it("uses primary when it succeeds", async () => {
    const result = await retryWithFallback(
      () => Promise.resolve("primary"),
      () => Promise.resolve("fallback")
    );
    expect(result).toBe("primary");
  });

  it("falls back when primary fails", async () => {
    const result = await retryWithFallback(
      () => Promise.reject(new Error("fail")),
      () => Promise.resolve("fallback"),
      0
    );
    expect(result).toBe("fallback");
  });
});
