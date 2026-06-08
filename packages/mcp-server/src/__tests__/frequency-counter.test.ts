import { describe, it, expect } from "vitest";
import { FrequencyCounter } from "../frequency-counter.js";

describe("FrequencyCounter", () => {
  it("counts items", () => {
    const fc = new FrequencyCounter<string>();
    fc.add("a"); fc.add("b"); fc.add("a");
    expect(fc.count("a")).toBe(2);
    expect(fc.count("b")).toBe(1);
    expect(fc.count("c")).toBe(0);
  });

  it("frequency returns proportion", () => {
    const fc = new FrequencyCounter<string>();
    fc.add("a", 3);
    fc.add("b", 1);
    expect(fc.frequency("a")).toBe(0.75);
  });

  it("topN returns most frequent", () => {
    const fc = new FrequencyCounter<string>();
    fc.add("a", 10); fc.add("b", 5); fc.add("c", 20);
    const top = fc.topN(2);
    expect(top[0][0]).toBe("c");
    expect(top[1][0]).toBe("a");
  });

  it("bottomN returns least frequent", () => {
    const fc = new FrequencyCounter<string>();
    fc.add("a", 10); fc.add("b", 1); fc.add("c", 5);
    expect(fc.bottomN(1)[0][0]).toBe("b");
  });

  it("uniqueCount and totalCount", () => {
    const fc = new FrequencyCounter<string>();
    fc.add("a", 3); fc.add("b", 2);
    expect(fc.uniqueCount).toBe(2);
    expect(fc.totalCount).toBe(5);
  });

  it("merge combines counters", () => {
    const a = new FrequencyCounter<string>();
    const b = new FrequencyCounter<string>();
    a.add("x", 5);
    b.add("x", 3);
    b.add("y", 1);
    const merged = a.merge(b);
    expect(merged.count("x")).toBe(8);
    expect(merged.count("y")).toBe(1);
  });

  it("reset clears", () => {
    const fc = new FrequencyCounter<string>();
    fc.add("a", 10);
    fc.reset();
    expect(fc.totalCount).toBe(0);
    expect(fc.uniqueCount).toBe(0);
  });
});
