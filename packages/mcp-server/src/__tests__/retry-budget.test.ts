import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { RetryBudget, standardBudget, strictBudget } from "../retry-budget.js";

describe("RetryBudget", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("allows retries within budget", () => {
    const budget = new RetryBudget({ maxRetries: 3, windowMs: 60000 });
    expect(budget.canRetry()).toBe(true);
    expect(budget.consume()).toBe(true);
    expect(budget.consume()).toBe(true);
    expect(budget.consume()).toBe(true);
    expect(budget.canRetry()).toBe(false);
    expect(budget.consume()).toBe(false);
  });

  it("tracks remaining budget", () => {
    const budget = new RetryBudget({ maxRetries: 5, windowMs: 60000 });
    expect(budget.remaining).toBe(5);
    budget.consume();
    budget.consume();
    expect(budget.remaining).toBe(3);
    expect(budget.used).toBe(2);
  });

  it("refills after window expires", () => {
    const budget = new RetryBudget({ maxRetries: 2, windowMs: 1000 });
    budget.consume();
    budget.consume();
    expect(budget.canRetry()).toBe(false);

    vi.advanceTimersByTime(1001);
    expect(budget.canRetry()).toBe(true);
    expect(budget.remaining).toBe(2);
  });

  it("partially refills as old entries expire", () => {
    const budget = new RetryBudget({ maxRetries: 3, windowMs: 1000 });
    budget.consume();
    vi.advanceTimersByTime(500);
    budget.consume();
    budget.consume();
    expect(budget.canRetry()).toBe(false);

    vi.advanceTimersByTime(501);
    expect(budget.remaining).toBe(1);
  });

  it("reset clears all usage", () => {
    const budget = new RetryBudget({ maxRetries: 2, windowMs: 60000 });
    budget.consume();
    budget.consume();
    budget.reset();
    expect(budget.remaining).toBe(2);
  });
});

describe("pre-configured budgets", () => {
  it("standardBudget allows 10 retries", () => {
    const budget = standardBudget();
    expect(budget.remaining).toBe(10);
  });

  it("strictBudget allows 3 retries", () => {
    const budget = strictBudget();
    expect(budget.remaining).toBe(3);
  });
});
