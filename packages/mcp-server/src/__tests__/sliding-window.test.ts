import { describe, it, expect } from "vitest";
import { SlidingWindowCounter, SlidingWindowLog } from "../sliding-window.js";

describe("SlidingWindowCounter", () => {
  it("allows hits within limit", () => {
    const sw = new SlidingWindowCounter(1000, 5);
    for (let i = 0; i < 5; i++) {
      expect(sw.hit(1000 + i)).toBe(true);
    }
  });

  it("rejects over limit", () => {
    const sw = new SlidingWindowCounter(1000, 2);
    expect(sw.hit(1000)).toBe(true);
    expect(sw.hit(1001)).toBe(true);
    expect(sw.hit(1002)).toBe(false);
  });

  it("remaining decreases", () => {
    const sw = new SlidingWindowCounter(1000, 5);
    sw.hit(1000);
    sw.hit(1001);
    expect(sw.remaining(1002)).toBe(3);
  });

  it("reset clears all", () => {
    const sw = new SlidingWindowCounter(1000, 5);
    sw.hit(1000);
    sw.reset();
    expect(sw.count(1000)).toBe(0);
  });
});

describe("SlidingWindowLog", () => {
  it("allows hits within limit", () => {
    const sw = new SlidingWindowLog(1000, 3);
    expect(sw.hit(1000)).toBe(true);
    expect(sw.hit(1200)).toBe(true);
    expect(sw.hit(1500)).toBe(true);
  });

  it("rejects over limit", () => {
    const sw = new SlidingWindowLog(1000, 2);
    sw.hit(1000);
    sw.hit(1200);
    expect(sw.hit(1500)).toBe(false);
  });

  it("allows after window expires", () => {
    const sw = new SlidingWindowLog(1000, 2);
    sw.hit(1000);
    sw.hit(1200);
    expect(sw.hit(2100)).toBe(true);
  });

  it("retryAfter returns wait time", () => {
    const sw = new SlidingWindowLog(1000, 1);
    sw.hit(1000);
    expect(sw.retryAfter(1500)).toBe(500);
  });

  it("oldest returns first timestamp", () => {
    const sw = new SlidingWindowLog(10000, 10);
    sw.hit(100);
    sw.hit(200);
    expect(sw.oldestTimestamp()).toBe(100);
  });

  it("reset clears all", () => {
    const sw = new SlidingWindowLog(1000, 5);
    sw.hit(1000);
    sw.reset();
    expect(sw.count(1000)).toBe(0);
  });
});
