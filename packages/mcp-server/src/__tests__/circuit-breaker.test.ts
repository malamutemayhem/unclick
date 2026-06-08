import { describe, it, expect } from "vitest";
import { CircuitBreaker, CircuitOpenError } from "../circuit-breaker.js";

describe("CircuitBreaker", () => {
  it("starts closed and allows execution", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 3, resetTimeoutMs: 1000 });
    expect(cb.currentState).toBe("closed");
    const result = await cb.execute(async () => 42);
    expect(result).toBe(42);
  });

  it("opens after failure threshold", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 2, resetTimeoutMs: 1000 });
    const fail = async () => { throw new Error("fail"); };
    await expect(cb.execute(fail)).rejects.toThrow("fail");
    await expect(cb.execute(fail)).rejects.toThrow("fail");
    expect(cb.currentState).toBe("open");
    await expect(cb.execute(async () => 1)).rejects.toThrow(CircuitOpenError);
  });

  it("resets failures on success", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 3, resetTimeoutMs: 1000 });
    await expect(cb.execute(async () => { throw new Error("fail"); })).rejects.toThrow();
    await cb.execute(async () => "ok");
    expect(cb.failureCount).toBe(0);
  });

  it("tracks failure count", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 5, resetTimeoutMs: 1000 });
    await expect(cb.execute(async () => { throw new Error("fail"); })).rejects.toThrow();
    await expect(cb.execute(async () => { throw new Error("fail"); })).rejects.toThrow();
    expect(cb.failureCount).toBe(2);
  });

  it("reset restores to closed", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, resetTimeoutMs: 100000 });
    await expect(cb.execute(async () => { throw new Error("fail"); })).rejects.toThrow();
    expect(cb.currentState).toBe("open");
    cb.reset();
    expect(cb.currentState).toBe("closed");
    expect(cb.failureCount).toBe(0);
  });

  it("CircuitOpenError has correct name", () => {
    const err = new CircuitOpenError("test");
    expect(err.name).toBe("CircuitOpenError");
    expect(err.message).toBe("test");
  });
});
