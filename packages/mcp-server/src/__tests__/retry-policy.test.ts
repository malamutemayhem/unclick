import { describe, it, expect } from "vitest";
import { createPolicy, calculateDelay, executeWithPolicy, policies } from "../retry-policy.js";

describe("createPolicy", () => {
  it("creates with defaults", () => {
    const p = createPolicy();
    expect(p.maxRetries).toBe(3);
    expect(p.backoffFactor).toBe(2);
  });

  it("accepts overrides", () => {
    const p = createPolicy({ maxRetries: 5 });
    expect(p.maxRetries).toBe(5);
  });
});

describe("calculateDelay", () => {
  it("increases with attempts", () => {
    const p = createPolicy({ jitter: false });
    const d0 = calculateDelay(p, 0);
    const d1 = calculateDelay(p, 1);
    expect(d1).toBeGreaterThan(d0);
  });

  it("caps at maxDelay", () => {
    const p = createPolicy({ jitter: false, maxDelayMs: 5000 });
    expect(calculateDelay(p, 100)).toBeLessThanOrEqual(5000);
  });

  it("applies jitter when enabled", () => {
    const p = createPolicy({ jitter: true });
    const delays = new Set<number>();
    for (let i = 0; i < 20; i++) delays.add(calculateDelay(p, 0));
    expect(delays.size).toBeGreaterThan(1);
  });
});

describe("executeWithPolicy", () => {
  it("succeeds on first try", async () => {
    const p = createPolicy({ maxRetries: 0 });
    const result = await executeWithPolicy(() => Promise.resolve(42), p);
    expect(result).toBe(42);
  });

  it("retries on failure", async () => {
    let calls = 0;
    const p = createPolicy({ maxRetries: 3, baseDelayMs: 1, jitter: false });
    const result = await executeWithPolicy(() => {
      calls++;
      if (calls < 3) throw new Error("fail");
      return Promise.resolve("ok");
    }, p);
    expect(result).toBe("ok");
    expect(calls).toBe(3);
  });

  it("throws after max retries", async () => {
    const p = createPolicy({ maxRetries: 1, baseDelayMs: 1, jitter: false });
    await expect(executeWithPolicy(() => Promise.reject(new Error("always")), p)).rejects.toThrow("always");
  });

  it("respects retryOn filter", async () => {
    const p = createPolicy({ maxRetries: 3, baseDelayMs: 1, retryOn: () => false });
    await expect(executeWithPolicy(() => Promise.reject(new Error("no retry")), p)).rejects.toThrow();
  });
});

describe("preset policies", () => {
  it("has named presets", () => {
    expect(policies.aggressive.maxRetries).toBe(5);
    expect(policies.conservative.maxRetries).toBe(3);
    expect(policies.none.maxRetries).toBe(0);
    expect(policies.linear.backoffFactor).toBe(1);
  });
});
