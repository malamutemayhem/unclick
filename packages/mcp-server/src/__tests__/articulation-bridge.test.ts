import { describe, it, expect } from "vitest";
import { ArticulationBridge } from "../articulation-bridge.js";

describe("ArticulationBridge", () => {
  it("finds articulation points", () => {
    const edges: [number, number][] = [[0, 1], [1, 2], [2, 0], [1, 3]];
    const ab = new ArticulationBridge(edges);
    expect(ab.articulationPoints()).toContain(1);
  });

  it("finds bridges", () => {
    const edges: [number, number][] = [[0, 1], [1, 2], [2, 0], [1, 3]];
    const ab = new ArticulationBridge(edges);
    expect(ab.bridgeCount()).toBe(1);
    expect(ab.isBridge(1, 3)).toBe(true);
  });

  it("complete graph has no articulation points or bridges", () => {
    const edges: [number, number][] = [[0, 1], [0, 2], [1, 2]];
    const ab = new ArticulationBridge(edges);
    expect(ab.articulationPointCount()).toBe(0);
    expect(ab.bridgeCount()).toBe(0);
  });

  it("chain graph: interior nodes are articulation points", () => {
    const edges: [number, number][] = [[0, 1], [1, 2], [2, 3]];
    const ab = new ArticulationBridge(edges);
    expect(ab.isArticulationPoint(1)).toBe(true);
    expect(ab.isArticulationPoint(2)).toBe(true);
    expect(ab.isArticulationPoint(0)).toBe(false);
  });

  it("chain graph: all edges are bridges", () => {
    const edges: [number, number][] = [[0, 1], [1, 2], [2, 3]];
    const ab = new ArticulationBridge(edges);
    expect(ab.bridgeCount()).toBe(3);
  });

  it("cycle has no bridges", () => {
    const edges: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 0]];
    const ab = new ArticulationBridge(edges);
    expect(ab.bridgeCount()).toBe(0);
  });

  it("isBridge detects in both directions", () => {
    const edges: [number, number][] = [[0, 1]];
    const ab = new ArticulationBridge(edges);
    expect(ab.isBridge(0, 1)).toBe(true);
    expect(ab.isBridge(1, 0)).toBe(true);
  });
});
