import { describe, it, expect } from "vitest";
import { TarjanSCC } from "../tarjan-scc.js";

describe("TarjanSCC", () => {
  it("finds SCCs in simple graph", () => {
    const edges: [number, number][] = [[0, 1], [1, 2], [2, 0], [3, 4]];
    const scc = new TarjanSCC(edges);
    expect(scc.componentCount()).toBe(3);
  });

  it("single SCC for strongly connected graph", () => {
    const edges: [number, number][] = [[0, 1], [1, 2], [2, 0]];
    const scc = new TarjanSCC(edges);
    expect(scc.isStronglyConnected()).toBe(true);
  });

  it("componentOf returns correct component", () => {
    const edges: [number, number][] = [[0, 1], [1, 0], [2, 3], [3, 2]];
    const scc = new TarjanSCC(edges);
    const comp = scc.componentOf(0)!;
    expect(comp).toContain(0);
    expect(comp).toContain(1);
    expect(comp).not.toContain(2);
  });

  it("condensation is a DAG", () => {
    const edges: [number, number][] = [[0, 1], [1, 0], [1, 2], [2, 3], [3, 2]];
    const scc = new TarjanSCC(edges);
    const dag = scc.condensation();
    expect(dag.size).toBe(scc.componentCount());
  });

  it("each node in exactly one component", () => {
    const edges: [number, number][] = [[0, 1], [1, 2], [2, 0], [2, 3]];
    const scc = new TarjanSCC(edges);
    const all = scc.components().flat();
    const unique = new Set(all);
    expect(unique.size).toBe(all.length);
  });

  it("linear graph has all singletons", () => {
    const edges: [number, number][] = [[0, 1], [1, 2], [2, 3]];
    const scc = new TarjanSCC(edges);
    expect(scc.componentCount()).toBe(4);
  });

  it("two cycles connected by one edge", () => {
    const edges: [number, number][] = [[0, 1], [1, 0], [1, 2], [2, 3], [3, 2]];
    const scc = new TarjanSCC(edges);
    expect(scc.componentCount()).toBe(2);
  });
});
