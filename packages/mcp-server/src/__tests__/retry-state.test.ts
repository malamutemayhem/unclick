import { describe, it, expect } from "vitest";
import { RetryState, shouldRetry } from "../retry-state.js";

describe("RetryState", () => {
  it("tracks attempts", () => {
    const state = new RetryState({ maxAttempts: 3, baseDelayMs: 100 });
    expect(state.currentAttempt).toBe(0);
    state.record();
    expect(state.currentAttempt).toBe(1);
  });

  it("tracks remaining attempts", () => {
    const state = new RetryState({ maxAttempts: 3, baseDelayMs: 100 });
    expect(state.remainingAttempts).toBe(3);
    state.record();
    expect(state.remainingAttempts).toBe(2);
  });

  it("knows when exhausted", () => {
    const state = new RetryState({ maxAttempts: 2, baseDelayMs: 100 });
    expect(state.exhausted).toBe(false);
    state.record();
    state.record();
    expect(state.exhausted).toBe(true);
  });

  it("computes exponential delay", () => {
    const state = new RetryState({ maxAttempts: 5, baseDelayMs: 100, jitter: false, backoffFactor: 2 });
    expect(state.nextDelay()).toBe(100);
    state.record();
    expect(state.nextDelay()).toBe(200);
    state.record();
    expect(state.nextDelay()).toBe(400);
  });

  it("respects maxDelay", () => {
    const state = new RetryState({ maxAttempts: 10, baseDelayMs: 1000, maxDelayMs: 5000, jitter: false });
    for (let i = 0; i < 10; i++) state.record();
    expect(state.nextDelay()).toBeLessThanOrEqual(5000);
  });

  it("resets state", () => {
    const state = new RetryState({ maxAttempts: 3, baseDelayMs: 100 });
    state.record();
    state.record();
    state.reset();
    expect(state.currentAttempt).toBe(0);
    expect(state.exhausted).toBe(false);
  });
});

describe("shouldRetry", () => {
  it("returns true when no filter", () => {
    expect(shouldRetry(new Error())).toBe(true);
  });

  it("filters by error class", () => {
    class CustomError extends Error {}
    expect(shouldRetry(new CustomError(), [CustomError])).toBe(true);
    expect(shouldRetry(new Error(), [CustomError])).toBe(false);
  });
});
