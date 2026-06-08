import { describe, it, expect } from "vitest";
import { exponentialBackoff, linearBackoff, constantDelay, noRetry, maxAttempts, retryOn, withJitter, compose } from "../retry-strategy.js";

describe("exponentialBackoff", () => {
  it("doubles delay each attempt", () => {
    const policy = exponentialBackoff(100, 10000);
    expect(policy(0).delayMs).toBe(100);
    expect(policy(1).delayMs).toBe(200);
    expect(policy(2).delayMs).toBe(400);
  });

  it("caps at max", () => {
    const policy = exponentialBackoff(100, 500);
    expect(policy(10).delayMs).toBe(500);
  });

  it("always says retry", () => {
    const policy = exponentialBackoff();
    expect(policy(100).retry).toBe(true);
  });
});

describe("linearBackoff", () => {
  it("increases linearly", () => {
    const policy = linearBackoff(100, 1000);
    expect(policy(0).delayMs).toBe(100);
    expect(policy(1).delayMs).toBe(200);
    expect(policy(4).delayMs).toBe(500);
  });
});

describe("constantDelay", () => {
  it("returns same delay", () => {
    const policy = constantDelay(500);
    expect(policy(0).delayMs).toBe(500);
    expect(policy(5).delayMs).toBe(500);
  });
});

describe("noRetry", () => {
  it("never retries", () => {
    const policy = noRetry();
    expect(policy(0).retry).toBe(false);
  });
});

describe("maxAttempts", () => {
  it("stops after max", () => {
    const policy = maxAttempts(constantDelay(100), 3);
    expect(policy(0).retry).toBe(true);
    expect(policy(2).retry).toBe(true);
    expect(policy(3).retry).toBe(false);
  });
});

describe("retryOn", () => {
  it("retries matching errors", () => {
    const policy = retryOn(constantDelay(100), (e) => e.includes("timeout"));
    expect(policy(0, "timeout error").retry).toBe(true);
    expect(policy(0, "auth error").retry).toBe(false);
  });

  it("does not retry without error", () => {
    const policy = retryOn(constantDelay(100), () => true);
    expect(policy(0).retry).toBe(false);
  });
});

describe("withJitter", () => {
  it("adds jitter to delay", () => {
    const policy = withJitter(constantDelay(1000), 0.5);
    const d = policy(0);
    expect(d.retry).toBe(true);
    expect(d.delayMs).toBeGreaterThanOrEqual(1000);
    expect(d.delayMs).toBeLessThanOrEqual(1500);
  });
});

describe("compose", () => {
  it("chains policies", () => {
    const policy = compose(
      maxAttempts(constantDelay(100), 3),
      constantDelay(100),
    );
    expect(policy(2).retry).toBe(true);
    expect(policy(3).retry).toBe(false);
  });
});
