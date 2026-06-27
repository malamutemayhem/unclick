import { describe, it, expect } from "vitest";
import { DataflowGraph } from "../dataflow-graph.js";

describe("DataflowGraph", () => {
  it("stores and retrieves source values", () => {
    const g = new DataflowGraph<number>();
    g.addSource("a", 10);
    expect(g.getValue("a")).toBe(10);
  });

  it("computes derived values", () => {
    const g = new DataflowGraph<number>();
    g.addSource("a", 3);
    g.addSource("b", 4);
    g.addComputed("sum", ["a", "b"], ([a, b]) => a + b);
    expect(g.getValue("sum")).toBe(7);
  });

  it("propagates changes", () => {
    const g = new DataflowGraph<number>();
    g.addSource("x", 5);
    g.addComputed("doubled", ["x"], ([x]) => x * 2);
    expect(g.getValue("doubled")).toBe(10);
    g.setValue("x", 10);
    expect(g.getValue("doubled")).toBe(20);
  });

  it("chains computations", () => {
    const g = new DataflowGraph<number>();
    g.addSource("a", 2);
    g.addComputed("b", ["a"], ([a]) => a * 3);
    g.addComputed("c", ["b"], ([b]) => b + 1);
    expect(g.getValue("c")).toBe(7);
    g.setValue("a", 5);
    expect(g.getValue("c")).toBe(16);
  });

  it("marks dirty nodes", () => {
    const g = new DataflowGraph<number>();
    g.addSource("x", 1);
    g.addComputed("y", ["x"], ([x]) => x + 1);
    g.getValue("y");
    expect(g.isDirty("y")).toBe(false);
    g.setValue("x", 2);
    expect(g.isDirty("y")).toBe(true);
  });

  it("propagates all at once", () => {
    const g = new DataflowGraph<number>();
    g.addSource("a", 1);
    g.addComputed("b", ["a"], ([a]) => a + 1);
    g.addComputed("c", ["b"], ([b]) => b * 2);
    g.propagate();
    expect(g.isDirty("c")).toBe(false);
  });

  it("snapshots all values", () => {
    const g = new DataflowGraph<number>();
    g.addSource("x", 5);
    g.addComputed("y", ["x"], ([x]) => x * 2);
    const snap = g.snapshot();
    expect(snap.get("x")).toBe(5);
    expect(snap.get("y")).toBe(10);
  });

  it("removes nodes", () => {
    const g = new DataflowGraph<number>();
    g.addSource("a", 1);
    g.removeNode("a");
    expect(g.nodeIds()).toEqual([]);
  });

  it("returns undefined for missing node", () => {
    const g = new DataflowGraph<number>();
    expect(g.getValue("missing")).toBeUndefined();
  });

  it("handles diamond dependency", () => {
    const g = new DataflowGraph<number>();
    g.addSource("a", 1);
    g.addComputed("b", ["a"], ([a]) => a + 1);
    g.addComputed("c", ["a"], ([a]) => a * 2);
    g.addComputed("d", ["b", "c"], ([b, c]) => b + c);
    expect(g.getValue("d")).toBe(4);
    g.setValue("a", 3);
    expect(g.getValue("d")).toBe(10);
  });
});
