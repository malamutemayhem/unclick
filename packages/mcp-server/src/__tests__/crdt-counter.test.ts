import { describe, it, expect } from "vitest";
import { GCounter, PNCounter } from "../crdt-counter.js";

describe("GCounter", () => {
  it("increments and returns value", () => {
    const c = new GCounter();
    c.increment("A", 5);
    c.increment("B", 3);
    expect(c.value()).toBe(8);
  });

  it("merge takes max per node", () => {
    const a = new GCounter();
    a.increment("X", 10);
    a.increment("Y", 2);
    const b = new GCounter();
    b.increment("X", 5);
    b.increment("Y", 8);
    const merged = a.merge(b);
    expect(merged.value()).toBe(18);
  });

  it("getNodeValue returns per-node count", () => {
    const c = new GCounter();
    c.increment("A", 7);
    expect(c.getNodeValue("A")).toBe(7);
    expect(c.getNodeValue("B")).toBe(0);
  });

  it("nodes lists contributors", () => {
    const c = new GCounter();
    c.increment("A");
    c.increment("B");
    expect(c.nodes().sort()).toEqual(["A", "B"]);
  });
});

describe("PNCounter", () => {
  it("supports increment and decrement", () => {
    const c = new PNCounter();
    c.increment("A", 10);
    c.decrement("A", 3);
    expect(c.value()).toBe(7);
  });

  it("can go negative", () => {
    const c = new PNCounter();
    c.decrement("A", 5);
    expect(c.value()).toBe(-5);
  });

  it("merge converges", () => {
    const a = new PNCounter();
    a.increment("X", 10);
    a.decrement("X", 2);
    const b = new PNCounter();
    b.increment("X", 5);
    b.decrement("Y", 3);
    const merged = a.merge(b);
    expect(merged.value()).toBe(5);
  });
});
