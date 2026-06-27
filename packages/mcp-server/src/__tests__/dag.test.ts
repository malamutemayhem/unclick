import { describe, it, expect } from "vitest";
import { DAG } from "../dag.js";

describe("DAG", () => {
  it("addNode and hasNode", () => {
    const g = new DAG();
    g.addNode("a");
    expect(g.hasNode("a")).toBe(true);
    expect(g.hasNode("b")).toBe(false);
  });

  it("addEdge creates nodes and edge", () => {
    const g = new DAG();
    g.addEdge("a", "b");
    expect(g.hasNode("a")).toBe(true);
    expect(g.hasNode("b")).toBe(true);
    expect(g.hasEdge("a", "b")).toBe(true);
  });

  it("rejects cycles", () => {
    const g = new DAG();
    g.addEdge("a", "b");
    g.addEdge("b", "c");
    expect(() => g.addEdge("c", "a")).toThrow("cycle");
  });

  it("rejects self-loops", () => {
    const g = new DAG();
    expect(() => g.addEdge("a", "a")).toThrow("cycle");
  });

  it("removeNode", () => {
    const g = new DAG();
    g.addEdge("a", "b");
    expect(g.removeNode("b")).toBe(true);
    expect(g.hasNode("b")).toBe(false);
    expect(g.hasEdge("a", "b")).toBe(false);
  });

  it("removeEdge", () => {
    const g = new DAG();
    g.addEdge("a", "b");
    expect(g.removeEdge("a", "b")).toBe(true);
    expect(g.hasEdge("a", "b")).toBe(false);
    expect(g.removeEdge("a", "b")).toBe(false);
  });

  it("nodeCount and edgeCount", () => {
    const g = new DAG();
    g.addEdge("a", "b");
    g.addEdge("a", "c");
    expect(g.nodeCount).toBe(3);
    expect(g.edgeCount).toBe(2);
  });

  it("dependenciesOf", () => {
    const g = new DAG();
    g.addEdge("a", "b");
    g.addEdge("a", "c");
    expect(g.dependenciesOf("a").sort()).toEqual(["b", "c"]);
  });

  it("dependantsOf", () => {
    const g = new DAG();
    g.addEdge("a", "c");
    g.addEdge("b", "c");
    expect(g.dependantsOf("c").sort()).toEqual(["a", "b"]);
  });

  it("topologicalSort", () => {
    const g = new DAG();
    g.addEdge("a", "b");
    g.addEdge("b", "c");
    const sorted = g.topologicalSort();
    expect(sorted.indexOf("c")).toBeLessThan(sorted.indexOf("b"));
    expect(sorted.indexOf("b")).toBeLessThan(sorted.indexOf("a"));
  });

  it("roots returns nodes with no incoming edges", () => {
    const g = new DAG();
    g.addEdge("a", "b");
    g.addEdge("a", "c");
    expect(g.roots()).toEqual(["a"]);
  });

  it("leaves returns nodes with no outgoing edges", () => {
    const g = new DAG();
    g.addEdge("a", "b");
    g.addEdge("a", "c");
    expect(g.leaves().sort()).toEqual(["b", "c"]);
  });
});
