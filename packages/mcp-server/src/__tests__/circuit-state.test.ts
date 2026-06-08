import { describe, it, expect, vi, afterEach } from "vitest";
import { CircuitState } from "../circuit-state.js";

describe("CircuitState", () => {
  afterEach(() => { vi.useRealTimers(); });

  it("starts closed and allows requests", () => {
    const cs = new CircuitState();
    expect(cs.current).toBe("closed");
    expect(cs.isAllowed()).toBe(true);
  });

  it("opens after threshold failures", () => {
    const cs = new CircuitState({ threshold: 3 });
    cs.recordFailure();
    cs.recordFailure();
    expect(cs.current).toBe("closed");
    cs.recordFailure();
    expect(cs.current).toBe("open");
    expect(cs.isAllowed()).toBe(false);
  });

  it("transitions to half-open after timeout", () => {
    vi.useFakeTimers();
    const cs = new CircuitState({ threshold: 1, resetTimeoutMs: 1000 });
    cs.recordFailure();
    expect(cs.current).toBe("open");
    vi.advanceTimersByTime(1000);
    expect(cs.current).toBe("half-open");
    expect(cs.isAllowed()).toBe(true);
  });

  it("closes again after success in half-open", () => {
    vi.useFakeTimers();
    const cs = new CircuitState({ threshold: 1, resetTimeoutMs: 100, halfOpenMax: 1 });
    cs.recordFailure();
    vi.advanceTimersByTime(100);
    expect(cs.current).toBe("half-open");
    cs.recordSuccess();
    expect(cs.current).toBe("closed");
  });

  it("reopens on failure in half-open", () => {
    vi.useFakeTimers();
    const cs = new CircuitState({ threshold: 1, resetTimeoutMs: 100 });
    cs.recordFailure();
    vi.advanceTimersByTime(100);
    expect(cs.current).toBe("half-open");
    cs.recordFailure();
    expect(cs.current).toBe("open");
  });

  it("success in closed resets fail count", () => {
    const cs = new CircuitState({ threshold: 3 });
    cs.recordFailure();
    cs.recordFailure();
    cs.recordSuccess();
    expect(cs.failures).toBe(0);
  });

  it("reset returns to closed", () => {
    const cs = new CircuitState({ threshold: 1 });
    cs.recordFailure();
    expect(cs.current).toBe("open");
    cs.reset();
    expect(cs.current).toBe("closed");
  });

  it("forceOpen opens immediately", () => {
    const cs = new CircuitState();
    cs.forceOpen();
    expect(cs.current).toBe("open");
  });
});
