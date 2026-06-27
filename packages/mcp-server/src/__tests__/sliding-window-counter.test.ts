import { describe, it, expect } from "vitest";
import { SlidingWindowCounter } from "../sliding-window-counter.js";

describe("SlidingWindowCounter", () => {
  it("starts at 0", () => {
    const c = new SlidingWindowCounter(1000);
    expect(c.total).toBe(0);
  });

  it("increments count", () => {
    const c = new SlidingWindowCounter(60000);
    c.increment();
    c.increment();
    c.increment();
    expect(c.total).toBe(3);
  });

  it("increment with count", () => {
    const c = new SlidingWindowCounter(60000);
    c.increment(5);
    expect(c.total).toBe(5);
  });

  it("exceedsLimit checks threshold", () => {
    const c = new SlidingWindowCounter(60000);
    c.increment(10);
    expect(c.exceedsLimit(5)).toBe(true);
    expect(c.exceedsLimit(15)).toBe(false);
  });

  it("reset clears all", () => {
    const c = new SlidingWindowCounter(60000);
    c.increment(100);
    c.reset();
    expect(c.total).toBe(0);
  });
});
