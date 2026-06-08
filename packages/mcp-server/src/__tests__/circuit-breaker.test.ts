import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CircuitBreaker } from "../circuit-breaker.js";

describe("CircuitBreaker", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it("starts in closed state", () => {
    const cb = new CircuitBreaker({ failureThreshold: 3, resetTimeout: 1000 });
    expect(cb.currentState).toBe("closed");
  });

  it("executes successfully in closed state", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 3, resetTimeout: 1000 });
    const result = await cb.execute(async () => 42);
    expect(result).toBe(42);
  });

  it("opens after threshold failures", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 2, resetTimeout: 1000 });
    const fail = async () => { throw new Error("fail"); };
    await cb.execute(fail).catch(() => {});
    await cb.execute(fail).catch(() => {});
    expect(cb.currentState).toBe("open");
  });

  it("rejects calls when open", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, resetTimeout: 1000 });
    await cb.execute(async () => { throw new Error("x"); }).catch(() => {});
    await expect(cb.execute(async () => "ok")).rejects.toThrow("Circuit breaker is open");
  });

  it("transitions to half-open after timeout", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, resetTimeout: 1000 });
    await cb.execute(async () => { throw new Error("x"); }).catch(() => {});
    vi.advanceTimersByTime(1001);
    const result = await cb.execute(async () => "recovered");
    expect(result).toBe("recovered");
    expect(cb.currentState).toBe("closed");
  });

  it("goes back to open on half-open failure", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, resetTimeout: 1000 });
    await cb.execute(async () => { throw new Error("x"); }).catch(() => {});
    vi.advanceTimersByTime(1001);
    await cb.execute(async () => { throw new Error("still bad"); }).catch(() => {});
    expect(cb.currentState).toBe("open");
  });

  it("reset returns to closed", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, resetTimeout: 1000 });
    await cb.execute(async () => { throw new Error("x"); }).catch(() => {});
    cb.reset();
    expect(cb.currentState).toBe("closed");
  });

  it("resets failure count on success in closed state", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 3, resetTimeout: 1000 });
    await cb.execute(async () => { throw new Error("x"); }).catch(() => {});
    await cb.execute(async () => "ok");
    await cb.execute(async () => { throw new Error("x"); }).catch(() => {});
    await cb.execute(async () => { throw new Error("x"); }).catch(() => {});
    expect(cb.currentState).toBe("closed");
  });
});
