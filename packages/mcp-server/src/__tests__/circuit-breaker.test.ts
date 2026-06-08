import { describe, it, expect, vi, beforeEach } from "vitest";
import { CircuitBreaker, CircuitOpenError, getBreaker, resetAllBreakers } from "../circuit-breaker.js";

describe("CircuitBreaker", () => {
  it("starts closed and allows execution", () => {
    const cb = new CircuitBreaker();
    expect(cb.getState()).toBe("closed");
    expect(cb.canExecute()).toBe(true);
  });

  it("stays closed below failure threshold", () => {
    const cb = new CircuitBreaker({ failureThreshold: 3 });
    cb.recordFailure();
    cb.recordFailure();
    expect(cb.getState()).toBe("closed");
    expect(cb.canExecute()).toBe(true);
  });

  it("opens after reaching failure threshold", () => {
    const cb = new CircuitBreaker({ failureThreshold: 3 });
    cb.recordFailure();
    cb.recordFailure();
    cb.recordFailure();
    expect(cb.getState()).toBe("open");
    expect(cb.canExecute()).toBe(false);
  });

  it("resets failure count on success", () => {
    const cb = new CircuitBreaker({ failureThreshold: 3 });
    cb.recordFailure();
    cb.recordFailure();
    cb.recordSuccess();
    cb.recordFailure();
    expect(cb.getState()).toBe("closed");
  });

  it("transitions to half-open after reset timeout", () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, resetTimeoutMs: 100 });
    cb.recordFailure();
    expect(cb.getState()).toBe("open");

    vi.useFakeTimers();
    vi.advanceTimersByTime(150);
    expect(cb.getState()).toBe("half-open");
    expect(cb.canExecute()).toBe(true);
    vi.useRealTimers();
  });

  it("closes from half-open on success", () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, resetTimeoutMs: 0 });
    cb.recordFailure();
    expect(cb.getState()).toBe("half-open");
    cb.recordSuccess();
    expect(cb.getState()).toBe("closed");
  });

  it("re-opens from half-open on failure", () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, resetTimeoutMs: 60000 });
    cb.recordFailure();
    expect(cb.getState()).toBe("open");

    vi.useFakeTimers();
    vi.advanceTimersByTime(60001);
    expect(cb.getState()).toBe("half-open");
    cb.recordFailure();
    expect(cb.getState()).toBe("open");
    vi.useRealTimers();
  });

  it("execute wraps success", async () => {
    const cb = new CircuitBreaker();
    const result = await cb.execute(() => Promise.resolve(42));
    expect(result).toBe(42);
  });

  it("execute wraps failure and records it", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 1 });
    await expect(cb.execute(() => Promise.reject(new Error("boom")))).rejects.toThrow("boom");
    expect(cb.getState()).toBe("open");
  });

  it("execute throws CircuitOpenError when open", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, resetTimeoutMs: 60000 });
    cb.recordFailure();
    try {
      await cb.execute(() => Promise.resolve("nope"));
      expect.fail("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(CircuitOpenError);
      expect((err as CircuitOpenError).retryAfterMs).toBeGreaterThan(0);
    }
  });

  it("reset clears all state", () => {
    const cb = new CircuitBreaker({ failureThreshold: 1 });
    cb.recordFailure();
    expect(cb.getState()).toBe("open");
    cb.reset();
    expect(cb.getState()).toBe("closed");
    expect(cb.getStats().failures).toBe(0);
  });

  it("getStats returns current state", () => {
    const cb = new CircuitBreaker();
    cb.recordFailure();
    const stats = cb.getStats();
    expect(stats.state).toBe("closed");
    expect(stats.failures).toBe(1);
    expect(stats.lastFailureTime).toBeGreaterThan(0);
  });
});

describe("getBreaker registry", () => {
  beforeEach(() => resetAllBreakers());

  it("returns same breaker for same endpoint", () => {
    const a = getBreaker("github");
    const b = getBreaker("github");
    expect(a).toBe(b);
  });

  it("returns different breakers for different endpoints", () => {
    const a = getBreaker("github");
    const b = getBreaker("slack");
    expect(a).not.toBe(b);
  });
});
