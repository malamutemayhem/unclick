import { describe, it, expect } from "vitest";
import { retryWithBackoff, exponentialDelay, linearDelay, constantDelay } from "../retry-with-backoff.js";

describe("retryWithBackoff", () => {
  it("returns on first success", async () => {
    const result = await retryWithBackoff(async () => 42, { maxRetries: 3, initialDelay: 1 });
    expect(result).toBe(42);
  });

  it("retries on failure", async () => {
    let attempts = 0;
    const result = await retryWithBackoff(async () => {
      attempts++;
      if (attempts < 3) throw new Error("fail");
      return "ok";
    }, { maxRetries: 5, initialDelay: 1 });
    expect(result).toBe("ok");
    expect(attempts).toBe(3);
  });

  it("throws after max retries", async () => {
    await expect(
      retryWithBackoff(async () => { throw new Error("always fail"); }, { maxRetries: 2, initialDelay: 1 })
    ).rejects.toThrow("always fail");
  });

  it("respects retryIf guard", async () => {
    let attempts = 0;
    await expect(
      retryWithBackoff(
        async () => { attempts++; throw new Error("nope"); },
        { maxRetries: 5, initialDelay: 1, retryIf: () => false }
      )
    ).rejects.toThrow("nope");
    expect(attempts).toBe(1);
  });

  it("calls onRetry callback", async () => {
    const retries: number[] = [];
    let attempts = 0;
    await retryWithBackoff(
      async () => { attempts++; if (attempts < 3) throw new Error("x"); return "ok"; },
      { maxRetries: 5, initialDelay: 1, onRetry: (_err: any, attempt: number) => retries.push(attempt) }
    );
    expect(retries).toEqual([1, 2]);
  });
});

describe("delay functions", () => {
  it("exponentialDelay calculates correctly", () => {
    expect(exponentialDelay(0, 100)).toBe(100);
    expect(exponentialDelay(1, 100)).toBe(200);
    expect(exponentialDelay(2, 100)).toBe(400);
  });

  it("exponentialDelay respects maxDelay", () => {
    expect(exponentialDelay(10, 100, 2, 500)).toBe(500);
  });

  it("linearDelay calculates correctly", () => {
    expect(linearDelay(0, 100, 50)).toBe(100);
    expect(linearDelay(1, 100, 50)).toBe(150);
    expect(linearDelay(2, 100, 50)).toBe(200);
  });

  it("constantDelay returns constant", () => {
    expect(constantDelay(500)).toBe(500);
  });
});
