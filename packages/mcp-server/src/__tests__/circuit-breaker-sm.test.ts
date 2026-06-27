import { describe, it, expect } from "vitest";
import { CircuitBreakerSM } from "../circuit-breaker-sm.js";

describe("CircuitBreakerSM", () => {
  it("starts in closed state", () => {
    const cb = new CircuitBreakerSM({ failureThreshold: 3, resetTimeoutMs: 1000 });
    expect(cb.getState(0)).toBe("closed");
    expect(cb.canExecute(0)).toBe(true);
  });

  it("opens after threshold failures", () => {
    const cb = new CircuitBreakerSM({ failureThreshold: 3, resetTimeoutMs: 1000 });
    cb.recordFailure(0);
    cb.recordFailure(0);
    expect(cb.getState(0)).toBe("closed");
    cb.recordFailure(0);
    expect(cb.getState(0)).toBe("open");
    expect(cb.canExecute(0)).toBe(false);
  });

  it("transitions to half-open after timeout", () => {
    const cb = new CircuitBreakerSM({ failureThreshold: 1, resetTimeoutMs: 1000 });
    cb.recordFailure(0);
    expect(cb.getState(0)).toBe("open");
    expect(cb.getState(1000)).toBe("half-open");
    expect(cb.canExecute(1000)).toBe(true);
  });

  it("closes on success in half-open", () => {
    const cb = new CircuitBreakerSM({ failureThreshold: 1, resetTimeoutMs: 1000 });
    cb.recordFailure(0);
    expect(cb.getState(1000)).toBe("half-open");
    cb.recordSuccess(1000);
    expect(cb.getState(1000)).toBe("closed");
  });

  it("reopens on failure in half-open", () => {
    const cb = new CircuitBreakerSM({ failureThreshold: 1, resetTimeoutMs: 1000 });
    cb.recordFailure(0);
    expect(cb.getState(1000)).toBe("half-open");
    cb.recordFailure(1000);
    expect(cb.getState(1000)).toBe("open");
  });

  it("success in closed resets failure count", () => {
    const cb = new CircuitBreakerSM({ failureThreshold: 3, resetTimeoutMs: 1000 });
    cb.recordFailure(0);
    cb.recordFailure(0);
    cb.recordSuccess(0);
    expect(cb.getFailureCount()).toBe(0);
    cb.recordFailure(0);
    expect(cb.getState(0)).toBe("closed");
  });

  it("reset restores initial state", () => {
    const cb = new CircuitBreakerSM({ failureThreshold: 1, resetTimeoutMs: 1000 });
    cb.recordFailure(0);
    expect(cb.getState(0)).toBe("open");
    cb.reset();
    expect(cb.getState(0)).toBe("closed");
    expect(cb.getFailureCount()).toBe(0);
  });

  it("halfOpenMax requires multiple successes", () => {
    const cb = new CircuitBreakerSM({ failureThreshold: 1, resetTimeoutMs: 1000, halfOpenMax: 2 });
    cb.recordFailure(0);
    expect(cb.getState(1000)).toBe("half-open");
    cb.recordSuccess(1000);
    expect(cb.getState(1000)).toBe("half-open");
    cb.recordSuccess(1000);
    expect(cb.getState(1000)).toBe("closed");
  });
});
