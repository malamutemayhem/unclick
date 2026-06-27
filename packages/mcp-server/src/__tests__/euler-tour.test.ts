import { describe, it, expect } from "vitest";
import { EulerTour } from "../euler-tour.js";

describe("EulerTour", () => {
  const edges: [number, number][] = [
    [1, 2],
    [1, 3],
    [2, 4],
    [2, 5],
  ];

  it("tin and tout are assigned", () => {
    const et = new EulerTour(edges, 1);
    expect(et.tin(1)).toBeGreaterThanOrEqual(0);
    expect(et.tout(1)).toBeGreaterThan(et.tin(1));
  });

  it("depth is correct", () => {
    const et = new EulerTour(edges, 1);
    expect(et.depth(1)).toBe(0);
    expect(et.depth(2)).toBe(1);
    expect(et.depth(4)).toBe(2);
  });

  it("parent is correct", () => {
    const et = new EulerTour(edges, 1);
    expect(et.parent(1)).toBe(-1);
    expect(et.parent(2)).toBe(1);
    expect(et.parent(4)).toBe(2);
  });

  it("isAncestor detects ancestor relationship", () => {
    const et = new EulerTour(edges, 1);
    expect(et.isAncestor(1, 4)).toBe(true);
    expect(et.isAncestor(2, 4)).toBe(true);
    expect(et.isAncestor(3, 4)).toBe(false);
    expect(et.isAncestor(4, 1)).toBe(false);
  });

  it("subtreeSize is correct", () => {
    const et = new EulerTour(edges, 1);
    expect(et.subtreeSize(1)).toBe(5);
    expect(et.subtreeSize(2)).toBe(3);
    expect(et.subtreeSize(3)).toBe(1);
    expect(et.subtreeSize(4)).toBe(1);
  });

  it("getTour returns euler tour sequence", () => {
    const et = new EulerTour(edges, 1);
    const tour = et.getTour();
    expect(tour[0]).toBe(1);
    expect(tour.length).toBe(2 * 5 - 1);
  });

  it("nodeCount returns total nodes", () => {
    const et = new EulerTour(edges, 1);
    expect(et.nodeCount()).toBe(5);
  });

  it("single node tree works", () => {
    const et = new EulerTour([], 1);
    expect(et.depth(1)).toBe(0);
    expect(et.subtreeSize(1)).toBe(1);
    expect(et.isAncestor(1, 1)).toBe(true);
  });
});
