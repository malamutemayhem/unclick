import { describe, it, expect } from "vitest";
import { KosarajuSCC } from "../kosaraju-scc.js";

describe("KosarajuSCC", () => {
  it("finds components", () => {
    const edges: [number, number][] = [[0, 1], [1, 2], [2, 0], [3, 4]];
    const scc = new KosarajuSCC(edges);
    expect(scc.componentCount()).toBe(3);
  });

  it("detects strongly connected graph", () => {
    const edges: [number, number][] = [[0, 1], [1, 2], [2, 0]];
    const scc = new KosarajuSCC(edges);
    expect(scc.isStronglyConnected()).toBe(true);
  });

  it("componentOf groups related nodes", () => {
    const edges: [number, number][] = [[1, 2], [2, 1]];
    const scc = new KosarajuSCC(edges);
    const comp = scc.componentOf(1)!;
    expect(comp).toContain(1);
    expect(comp).toContain(2);
  });

  it("nodeCount matches unique nodes", () => {
    const edges: [number, number][] = [[0, 1], [1, 2], [2, 3]];
    const scc = new KosarajuSCC(edges);
    expect(scc.nodeCount()).toBe(4);
  });

  it("DAG has all singletons", () => {
    const edges: [number, number][] = [[0, 1], [1, 2]];
    const scc = new KosarajuSCC(edges);
    expect(scc.componentCount()).toBe(3);
  });

  it("self-loop forms SCC", () => {
    const edges: [number, number][] = [[0, 0]];
    const scc = new KosarajuSCC(edges);
    expect(scc.componentCount()).toBe(1);
    expect(scc.isStronglyConnected()).toBe(true);
  });

  it("missing node returns undefined", () => {
    const edges: [number, number][] = [[0, 1]];
    const scc = new KosarajuSCC(edges);
    expect(scc.componentOf(99)).toBeUndefined();
  });
});
