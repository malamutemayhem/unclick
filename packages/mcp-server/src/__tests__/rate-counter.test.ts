import { describe, it, expect } from "vitest";
import { RateCounter, MultiRateCounter } from "../rate-counter.js";

describe("RateCounter", () => {
  it("counts events in window", () => {
    const counter = new RateCounter(1000);
    const now = 10000;
    counter.record(now);
    counter.record(now);
    counter.record(now);
    expect(counter.count(now)).toBe(3);
  });

  it("prunes events outside window", () => {
    const counter = new RateCounter(1000);
    counter.record(1000);
    counter.record(1501);
    counter.record(2500);
    expect(counter.count(2500)).toBe(2);
  });

  it("calculates rate per second", () => {
    const counter = new RateCounter(10000);
    const now = 50000;
    for (let i = 0; i < 100; i++) counter.record(now);
    expect(counter.rate(now)).toBe(10);
  });

  it("reset clears all data", () => {
    const counter = new RateCounter(1000);
    counter.record();
    counter.reset();
    expect(counter.count()).toBe(0);
  });
});

describe("MultiRateCounter", () => {
  it("tracks separate keys", () => {
    const multi = new MultiRateCounter(1000);
    const now = 5000;
    multi.record("a", now);
    multi.record("a", now);
    multi.record("b", now);
    expect(multi.count("a", now)).toBe(2);
    expect(multi.count("b", now)).toBe(1);
  });

  it("returns 0 for unknown key", () => {
    const multi = new MultiRateCounter();
    expect(multi.count("nope")).toBe(0);
    expect(multi.rate("nope")).toBe(0);
  });

  it("topN returns highest counts", () => {
    const multi = new MultiRateCounter(10000);
    const now = 50000;
    for (let i = 0; i < 5; i++) multi.record("a", now);
    for (let i = 0; i < 3; i++) multi.record("b", now);
    for (let i = 0; i < 8; i++) multi.record("c", now);
    const top = multi.topN(2, now);
    expect(top[0].key).toBe("c");
    expect(top[1].key).toBe("a");
    expect(top).toHaveLength(2);
  });
});
