import { describe, it, expect } from "vitest";
import { CircuitBreaker } from "../circuit-breaker.js";

describe("CircuitBreaker", () => {
  it("starts closed", () => {
    const cb = new CircuitBreaker();
    expect(cb.currentState).toBe("closed");
    expect(cb.canExecute()).toBe(true);
  });

  it("opens after threshold failures", () => {
    const cb = new CircuitBreaker({ failureThreshold: 3, resetTimeoutMs: 60000 });
    cb.recordFailure();
    cb.recordFailure();
    expect(cb.currentState).toBe("closed");
    cb.recordFailure();
    expect(cb.currentState).toBe("open");
    expect(cb.canExecute()).toBe(false);
  });

  it("transitions to half-open after reset timeout", () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, resetTimeoutMs: 0 });
    cb.recordFailure();
    expect(cb.currentState).toBe("half-open");
  });

  it("closes on success in half-open", () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, resetTimeoutMs: 0 });
    cb.recordFailure();
    expect(cb.currentState).toBe("half-open");
    cb.recordSuccess();
    expect(cb.currentState).toBe("closed");
  });

  it("reopens on failure in half-open", () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, resetTimeoutMs: 60000, halfOpenMax: 1 });
    cb.recordFailure();
    expect(cb.currentState).toBe("open");
    expect(cb.canExecute()).toBe(false);
  });

  it("execute runs function when closed", async () => {
    const cb = new CircuitBreaker();
    const result = await cb.execute(async () => 42);
    expect(result).toBe(42);
  });

  it("execute throws when open", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, resetTimeoutMs: 60000 });
    cb.recordFailure();
    await expect(cb.execute(async () => 42)).rejects.toThrow("Circuit breaker is open");
  });

  it("execute records failure on thrown error", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 2 });
    await expect(cb.execute(async () => { throw new Error("fail"); })).rejects.toThrow("fail");
    expect(cb.stats().failures).toBe(1);
  });

  it("reset clears everything", () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, resetTimeoutMs: 60000 });
    cb.recordFailure();
    cb.reset();
    expect(cb.currentState).toBe("closed");
    expect(cb.stats().failures).toBe(0);
  });

  it("stats returns current counts", () => {
    const cb = new CircuitBreaker();
    cb.recordSuccess();
    cb.recordSuccess();
    cb.recordFailure();
    const s = cb.stats();
    expect(s.successes).toBe(2);
    expect(s.failures).toBe(1);
    expect(s.state).toBe("closed");
  });
});
