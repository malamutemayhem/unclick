import { describe, it, expect, vi } from "vitest";
import { CircuitBreaker } from "../circuit-breaker.js";

describe("CircuitBreaker", () => {
  it("starts closed", () => {
    const cb = new CircuitBreaker({ failureThreshold: 3, resetTimeoutMs: 1000 });
    expect(cb.currentState).toBe("closed");
  });

  it("passes through when closed", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 3, resetTimeoutMs: 1000 });
    const result = await cb.execute(async () => 42);
    expect(result).toBe(42);
  });

  it("opens after threshold failures", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 2, resetTimeoutMs: 1000 });
    const fail = async () => { throw new Error("fail"); };
    await expect(cb.execute(fail)).rejects.toThrow();
    await expect(cb.execute(fail)).rejects.toThrow();
    expect(cb.currentState).toBe("open");
  });

  it("rejects when open", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, resetTimeoutMs: 10000 });
    await expect(cb.execute(async () => { throw new Error("fail"); })).rejects.toThrow();
    await expect(cb.execute(async () => 42)).rejects.toThrow("Circuit breaker is open");
  });

  it("transitions to half-open after timeout", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, resetTimeoutMs: 10 });
    await expect(cb.execute(async () => { throw new Error("fail"); })).rejects.toThrow();
    await new Promise((r) => setTimeout(r, 15));
    const result = await cb.execute(async () => "ok");
    expect(result).toBe("ok");
    expect(cb.currentState).toBe("closed");
  });

  it("onStateChange callback", async () => {
    const changes: string[] = [];
    const cb = new CircuitBreaker({
      failureThreshold: 1,
      resetTimeoutMs: 1000,
      onStateChange: (from, to) => changes.push(`${from}->${to}`),
    });
    await expect(cb.execute(async () => { throw new Error("fail"); })).rejects.toThrow();
    expect(changes).toContain("closed->open");
  });

  it("reset returns to closed", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 1, resetTimeoutMs: 10000 });
    await expect(cb.execute(async () => { throw new Error("fail"); })).rejects.toThrow();
    cb.reset();
    expect(cb.currentState).toBe("closed");
    expect(cb.failureCount).toBe(0);
  });

  it("success in closed resets failure count", async () => {
    const cb = new CircuitBreaker({ failureThreshold: 3, resetTimeoutMs: 1000 });
    await expect(cb.execute(async () => { throw new Error("fail"); })).rejects.toThrow();
    await cb.execute(async () => "ok");
    expect(cb.failureCount).toBe(0);
  });
});
