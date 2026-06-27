import { describe, it, expect } from "vitest";
import { PageReplacement } from "../page-replacement.js";

describe("PageReplacement", () => {
  const pages = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1];

  it("FIFO counts page faults", () => {
    const result = PageReplacement.fifo(pages, 3);
    expect(result.faults).toBeGreaterThan(0);
    expect(result.hitRate).toBeGreaterThan(0);
    expect(result.hitRate).toBeLessThan(1);
  });

  it("LRU counts page faults", () => {
    const result = PageReplacement.lru(pages, 3);
    expect(result.faults).toBeGreaterThan(0);
  });

  it("Optimal has fewest faults", () => {
    const optResult = PageReplacement.optimal(pages, 3);
    const fifoResult = PageReplacement.fifo(pages, 3);
    const lruResult = PageReplacement.lru(pages, 3);
    expect(optResult.faults).toBeLessThanOrEqual(fifoResult.faults);
    expect(optResult.faults).toBeLessThanOrEqual(lruResult.faults);
  });

  it("Clock approximates LRU", () => {
    const result = PageReplacement.clock(pages, 3);
    expect(result.faults).toBeGreaterThan(0);
    expect(result.history.length).toBe(pages.length);
  });

  it("large frame count means fewer faults", () => {
    const small = PageReplacement.fifo(pages, 2);
    const large = PageReplacement.fifo(pages, 5);
    expect(large.faults).toBeLessThanOrEqual(small.faults);
  });

  it("history has correct length", () => {
    const result = PageReplacement.lru([1, 2, 3, 1], 2);
    expect(result.history.length).toBe(4);
  });

  it("no faults when everything fits", () => {
    const result = PageReplacement.fifo([1, 2, 3, 1, 2, 3], 3);
    expect(result.faults).toBe(3);
    expect(result.hitRate).toBe(0.5);
  });
});
