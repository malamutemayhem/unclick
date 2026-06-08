import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { SlidingWindowRateLimiter, FixedWindowRateLimiter } from "../rate-limiter.js";

describe("SlidingWindowRateLimiter", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it("allows requests within limit", () => {
    const rl = new SlidingWindowRateLimiter({ maxRequests: 3, windowMs: 1000 });
    expect(rl.tryAcquire("a")).toBe(true);
    expect(rl.tryAcquire("a")).toBe(true);
    expect(rl.tryAcquire("a")).toBe(true);
  });

  it("blocks requests over limit", () => {
    const rl = new SlidingWindowRateLimiter({ maxRequests: 2, windowMs: 1000 });
    rl.tryAcquire("a");
    rl.tryAcquire("a");
    expect(rl.tryAcquire("a")).toBe(false);
  });

  it("allows requests after window expires", () => {
    const rl = new SlidingWindowRateLimiter({ maxRequests: 1, windowMs: 1000 });
    rl.tryAcquire("a");
    expect(rl.tryAcquire("a")).toBe(false);
    vi.advanceTimersByTime(1001);
    expect(rl.tryAcquire("a")).toBe(true);
  });

  it("tracks remaining count", () => {
    const rl = new SlidingWindowRateLimiter({ maxRequests: 3, windowMs: 1000 });
    expect(rl.remaining("a")).toBe(3);
    rl.tryAcquire("a");
    expect(rl.remaining("a")).toBe(2);
  });

  it("isolates keys", () => {
    const rl = new SlidingWindowRateLimiter({ maxRequests: 1, windowMs: 1000 });
    rl.tryAcquire("a");
    expect(rl.tryAcquire("b")).toBe(true);
  });

  it("reset clears a key", () => {
    const rl = new SlidingWindowRateLimiter({ maxRequests: 1, windowMs: 1000 });
    rl.tryAcquire("a");
    rl.reset("a");
    expect(rl.tryAcquire("a")).toBe(true);
  });

  it("resetAll clears everything", () => {
    const rl = new SlidingWindowRateLimiter({ maxRequests: 1, windowMs: 1000 });
    rl.tryAcquire("a");
    rl.tryAcquire("b");
    rl.resetAll();
    expect(rl.tryAcquire("a")).toBe(true);
    expect(rl.tryAcquire("b")).toBe(true);
  });

  it("nextAllowedAt returns null when under limit", () => {
    const rl = new SlidingWindowRateLimiter({ maxRequests: 5, windowMs: 1000 });
    expect(rl.nextAllowedAt("a")).toBeNull();
  });

  it("nextAllowedAt returns timestamp when at limit", () => {
    const rl = new SlidingWindowRateLimiter({ maxRequests: 1, windowMs: 1000 });
    rl.tryAcquire("a");
    expect(rl.nextAllowedAt("a")).toBeGreaterThan(0);
  });
});

describe("FixedWindowRateLimiter", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it("allows requests within limit", () => {
    const rl = new FixedWindowRateLimiter({ maxRequests: 2, windowMs: 1000 });
    expect(rl.tryAcquire("x")).toBe(true);
    expect(rl.tryAcquire("x")).toBe(true);
    expect(rl.tryAcquire("x")).toBe(false);
  });

  it("resets after window expires", () => {
    const rl = new FixedWindowRateLimiter({ maxRequests: 1, windowMs: 1000 });
    rl.tryAcquire("x");
    vi.advanceTimersByTime(1001);
    expect(rl.tryAcquire("x")).toBe(true);
  });

  it("tracks remaining", () => {
    const rl = new FixedWindowRateLimiter({ maxRequests: 3, windowMs: 1000 });
    expect(rl.remaining("x")).toBe(3);
    rl.tryAcquire("x");
    expect(rl.remaining("x")).toBe(2);
  });

  it("reset clears a key", () => {
    const rl = new FixedWindowRateLimiter({ maxRequests: 1, windowMs: 1000 });
    rl.tryAcquire("x");
    rl.reset("x");
    expect(rl.remaining("x")).toBe(1);
  });
});
