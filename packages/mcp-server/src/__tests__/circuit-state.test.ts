import { describe, it, expect } from "vitest";
import { CircuitState } from "../circuit-state.js";

describe("CircuitState", () => {
  it("starts closed", () => {
    const cs = new CircuitState(3);
    expect(cs.currentState).toBe("closed");
    expect(cs.isAllowed).toBe(true);
  });

  it("opens after threshold failures", () => {
    const cs = new CircuitState(3, 100);
    cs.recordFailure();
    cs.recordFailure();
    cs.recordFailure();
    expect(cs.currentState).toBe("open");
    expect(cs.isAllowed).toBe(false);
  });

  it("success resets failure count", () => {
    const cs = new CircuitState(3);
    cs.recordFailure();
    cs.recordFailure();
    cs.recordSuccess();
    expect(cs.failureCount).toBe(0);
    expect(cs.currentState).toBe("closed");
  });

  it("execute wraps function", async () => {
    const cs = new CircuitState(3);
    const result = await cs.execute(() => Promise.resolve(42));
    expect(result).toBe(42);
  });

  it("execute records failures", async () => {
    const cs = new CircuitState(2);
    try { await cs.execute(() => Promise.reject(new Error("fail"))); } catch {}
    try { await cs.execute(() => Promise.reject(new Error("fail"))); } catch {}
    expect(cs.currentState).toBe("open");
    await expect(cs.execute(() => Promise.resolve(1))).rejects.toThrow("Circuit is open");
  });

  it("reset restores closed state", () => {
    const cs = new CircuitState(1);
    cs.recordFailure();
    expect(cs.currentState).toBe("open");
    cs.reset();
    expect(cs.currentState).toBe("closed");
  });
});
