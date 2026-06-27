import { describe, it, expect } from "vitest";
import { ExponentialBackoff } from "../exponential-backoff.js";

describe("ExponentialBackoff", () => {
  it("calculates exponential delays without jitter", () => {
    const backoff = new ExponentialBackoff({ baseDelay: 100, factor: 2, jitter: false, maxRetries: 5 });
    expect(backoff.nextDelay()).toBe(100);
    expect(backoff.nextDelay()).toBe(200);
    expect(backoff.nextDelay()).toBe(400);
  });

  it("respects maxDelay", () => {
    const backoff = new ExponentialBackoff({ baseDelay: 1000, factor: 10, maxDelay: 5000, jitter: false, maxRetries: 5 });
    backoff.nextDelay();
    backoff.nextDelay();
    expect(backoff.nextDelay()).toBe(5000);
  });

  it("applies jitter", () => {
    const backoff = new ExponentialBackoff({ baseDelay: 1000, jitter: true, maxRetries: 5 });
    const delay = backoff.nextDelay();
    expect(delay).toBeLessThanOrEqual(1000);
    expect(delay).toBeGreaterThanOrEqual(0);
  });

  it("tracks attempts", () => {
    const backoff = new ExponentialBackoff({ maxRetries: 3, jitter: false });
    expect(backoff.currentAttempt).toBe(0);
    backoff.nextDelay();
    expect(backoff.currentAttempt).toBe(1);
  });

  it("canRetry respects maxRetries", () => {
    const backoff = new ExponentialBackoff({ maxRetries: 2, jitter: false });
    expect(backoff.canRetry).toBe(true);
    backoff.nextDelay();
    backoff.nextDelay();
    expect(backoff.canRetry).toBe(false);
  });

  it("reset resets attempts", () => {
    const backoff = new ExponentialBackoff({ maxRetries: 3, jitter: false });
    backoff.nextDelay();
    backoff.nextDelay();
    backoff.reset();
    expect(backoff.currentAttempt).toBe(0);
    expect(backoff.canRetry).toBe(true);
  });

  it("static calculateDelay works", () => {
    expect(ExponentialBackoff.calculateDelay(0, { baseDelay: 100, factor: 2 })).toBe(100);
    expect(ExponentialBackoff.calculateDelay(3, { baseDelay: 100, factor: 2 })).toBe(800);
  });

  it("linearDelay increases linearly", () => {
    expect(ExponentialBackoff.linearDelay(0, 1000)).toBe(1000);
    expect(ExponentialBackoff.linearDelay(2, 1000)).toBe(3000);
  });

  it("totalTime sums all delays", () => {
    const backoff = new ExponentialBackoff({ baseDelay: 100, factor: 2, jitter: false, maxRetries: 3 });
    expect(backoff.totalTime()).toBe(700);
  });
});
