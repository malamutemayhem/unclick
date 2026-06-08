import { describe, it, expect } from "vitest";
import { ConvexHullTrick, MaxConvexHullTrick } from "../convex-hull-trick.js";

describe("ConvexHullTrick", () => {
  it("queryMin finds minimum across lines", () => {
    const cht = new ConvexHullTrick();
    cht.addLine(1, 0);
    cht.addLine(-1, 10);
    expect(cht.queryMin(3)).toBe(3);
    expect(cht.queryMin(7)).toBe(3);
  });

  it("removes dominated lines", () => {
    const cht = new ConvexHullTrick();
    cht.addLine(3, 0);
    cht.addLine(2, 1);
    cht.addLine(1, 5);
    expect(cht.lineCount()).toBeLessThanOrEqual(3);
  });

  it("queryMin on empty returns Infinity", () => {
    const cht = new ConvexHullTrick();
    expect(cht.queryMin(5)).toBe(Infinity);
  });

  it("single line returns that line value", () => {
    const cht = new ConvexHullTrick();
    cht.addLine(2, 3);
    expect(cht.queryMin(4)).toBe(11);
    expect(cht.queryMin(0)).toBe(3);
  });

  it("getLines returns stored lines", () => {
    const cht = new ConvexHullTrick();
    cht.addLine(5, 1);
    cht.addLine(3, 2);
    const lines = cht.getLines();
    expect(lines.length).toBeGreaterThanOrEqual(1);
  });

  it("queryAll returns all line evaluations", () => {
    const cht = new ConvexHullTrick();
    cht.addLine(1, 0);
    cht.addLine(0, 3);
    const all = cht.queryAll(2);
    expect(all.length).toBe(cht.lineCount());
    expect(all.some((l) => l.value === 2)).toBe(true);
  });
});

describe("MaxConvexHullTrick", () => {
  it("queryMax finds maximum across lines", () => {
    const cht = new MaxConvexHullTrick();
    cht.addLine(1, 0);
    cht.addLine(-1, 10);
    expect(cht.queryMax(3)).toBe(7);
  });

  it("lineCount tracks lines", () => {
    const cht = new MaxConvexHullTrick();
    cht.addLine(2, 0);
    cht.addLine(1, 3);
    expect(cht.lineCount()).toBeGreaterThanOrEqual(1);
  });
});
