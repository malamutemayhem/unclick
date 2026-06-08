import { describe, it, expect } from "vitest";
import { retry, CircuitBreaker } from "../retry.js";

describe("retry", () => {
  it("returns on first success", async () => {
    const result = await retry(async () => 42, { maxAttempts: 3, delayMs: 1 });
    expect(result).toBe(42);
  });

  it("retries on failure then succeeds", async () => {
    let attempts = 0;
    const result = await retry(async () => {
      attempts++;
      if (attempts < 3) throw new Error("fail");
      return "ok";
    }, { maxAttempts: 3, delayMs: 1 });
    expect(result).toBe("ok");
    expect(attempts).toBe(3);
  });

  it("throws after maxAttempts exhausted", async () => {
    await expect(retry(async () => { throw new Error("always"); }, { maxAttempts: 2, delayMs: 1 }))
      .rejects.toThrow("always");
  });

  it("respects shouldRetry predicate", async () => {
    let attempts = 0;
    await expect(retry(async () => {
      attempts++;
      throw new Error("stop");
    }, { maxAttempts: 5, delayMs: 1, shouldRetry: () => false }))
      .rejects.toThrow("stop");
    expect(attempts).toBe(1);
  });

  it("uses fixed backoff", async () => {
    let attempts = 0;
    await expect(retry(async () => {
      attempts++;
      throw new Error("fail");
    }, { maxAttempts: 3, delayMs: 1, backoff: "fixed" }))
      .rejects.toThrow("fail");
    expect(attempts).toBe(3);
  });

  it("uses linear backoff", async () => {
    let attempts = 0;
    await expect(retry(async () => {
      attempts++;
      throw new Error("fail");
    }, { maxAttempts: 2, delayMs: 1, backoff: "linear" }))
      .rejects.toThrow("fail");
    expect(attempts).toBe(2);
  });
});

describe("CircuitBreaker", () => {
  it("passes calls when closed", async () => {
    const cb = new CircuitBreaker({ threshold: 3 });
    const result = await cb.call(async () => "ok");
    expect(result).toBe("ok");
    expect(cb.currentState).toBe("closed");
  });

  it("opens after threshold failures", async () => {
    const cb = new CircuitBreaker({ threshold: 2, resetMs: 100000 });
    for (let i = 0; i < 2; i++) {
      await cb.call(async () => { throw new Error("fail"); }).catch(() => {});
    }
    expect(cb.currentState).toBe("open");
    await expect(cb.call(async () => "ok")).rejects.toThrow("Circuit breaker is open");
  });

  it("resets to closed on success", async () => {
    const cb = new CircuitBreaker({ threshold: 3 });
    await cb.call(async () => { throw new Error("fail"); }).catch(() => {});
    await cb.call(async () => "ok");
    expect(cb.currentState).toBe("closed");
  });

  it("manual reset clears state", async () => {
    const cb = new CircuitBreaker({ threshold: 1, resetMs: 100000 });
    await cb.call(async () => { throw new Error("fail"); }).catch(() => {});
    expect(cb.currentState).toBe("open");
    cb.reset();
    expect(cb.currentState).toBe("closed");
  });
});
