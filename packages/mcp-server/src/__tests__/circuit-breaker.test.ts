import { describe, it, expect } from "vitest";
import { CircuitBreaker } from "../circuit-breaker.js";

describe("CircuitBreaker", () => {
  it("starts closed", () => {
    const cb = new CircuitBreaker({ failureThreshold: 3, resetTimeoutMs: 1000 });
    expect(cb.getState()).toBe("closed");
  });

  it("opens after threshold failures", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 2, resetTimeoutMs: 1000 });
    const fail = () => Promise.reject(new Error("fail"));
    await expect(cb.execute(fail)).rejects.toThrow();
    await expect(cb.execute(fail)).rejects.toThrow();
    expect(cb.getState()).toBe("open");
    await expect(cb.execute(fail)).rejects.toThrow("Circuit is open");
  });

  it("succeeds when closed", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 3, resetTimeoutMs: 1000 });
    const result = await cb.execute(() => Promise.resolve(42));
    expect(result).toBe(42);
  });

  it("resets failure count on success", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 3, resetTimeoutMs: 1000 });
    const fail = () => Promise.reject(new Error("fail"));
    await expect(cb.execute(fail)).rejects.toThrow();
    await cb.execute(() => Promise.resolve("ok"));
    expect(cb.getFailures()).toBe(0);
  });

  it("transitions to half-open after timeout", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, resetTimeoutMs: 50 });
    await expect(cb.execute(() => Promise.reject(new Error("x")))).rejects.toThrow();
    expect(cb.getState()).toBe("open");
    await new Promise((r) => setTimeout(r, 60));
    expect(cb.getState()).toBe("half-open");
  });

  it("closes from half-open on success", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, resetTimeoutMs: 50, halfOpenMax: 1 });
    await expect(cb.execute(() => Promise.reject(new Error("x")))).rejects.toThrow();
    await new Promise((r) => setTimeout(r, 60));
    await cb.execute(() => Promise.resolve("ok"));
    expect(cb.getState()).toBe("closed");
  });

  it("reset works", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, resetTimeoutMs: 10000 });
    await expect(cb.execute(() => Promise.reject(new Error("x")))).rejects.toThrow();
    expect(cb.getState()).toBe("open");
    cb.reset();
    expect(cb.getState()).toBe("closed");
    expect(cb.getFailures()).toBe(0);
  });
});
