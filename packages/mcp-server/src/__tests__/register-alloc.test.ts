import { describe, it, expect } from "vitest";
import { RegisterAllocator } from "../register-alloc.js";

describe("RegisterAllocator", () => {
  it("allocates non-overlapping ranges to same register", () => {
    const ra = new RegisterAllocator(2);
    ra.addLiveRange("a", 0, 5);
    ra.addLiveRange("b", 5, 10);
    const result = ra.allocateLinearScan();
    expect(result.allocation.get("a")).toBe(result.allocation.get("b"));
    expect(result.spilled).toHaveLength(0);
  });

  it("allocates overlapping ranges to different registers", () => {
    const ra = new RegisterAllocator(2);
    ra.addLiveRange("a", 0, 10);
    ra.addLiveRange("b", 5, 15);
    const result = ra.allocateLinearScan();
    expect(result.allocation.get("a")).not.toBe(result.allocation.get("b"));
    expect(result.registersUsed).toBe(2);
  });

  it("spills when registers exhausted", () => {
    const ra = new RegisterAllocator(1);
    ra.addLiveRange("a", 0, 10);
    ra.addLiveRange("b", 5, 15);
    const result = ra.allocateLinearScan();
    expect(result.spilled.length).toBe(1);
  });

  it("buildInterferenceGraph detects overlaps", () => {
    const ra = new RegisterAllocator(3);
    ra.addLiveRange("a", 0, 10);
    ra.addLiveRange("b", 5, 15);
    ra.addLiveRange("c", 20, 30);
    const graph = ra.buildInterferenceGraph();
    expect(graph.nodes).toHaveLength(3);
    expect(graph.edges).toHaveLength(1);
    expect(graph.edges[0]).toEqual(["a", "b"]);
  });

  it("greedy coloring allocates correctly", () => {
    const ra = new RegisterAllocator(3);
    ra.addLiveRange("a", 0, 10);
    ra.addLiveRange("b", 5, 15);
    ra.addLiveRange("c", 8, 12);
    const result = ra.allocateGreedyColor();
    expect(result.registersUsed).toBe(3);
    expect(result.spilled).toHaveLength(0);
  });

  it("greedy coloring spills when insufficient registers", () => {
    const ra = new RegisterAllocator(2);
    ra.addLiveRange("a", 0, 10);
    ra.addLiveRange("b", 0, 10);
    ra.addLiveRange("c", 0, 10);
    const result = ra.allocateGreedyColor();
    expect(result.spilled.length).toBe(1);
  });

  it("rangeCount tracks live ranges", () => {
    const ra = new RegisterAllocator(4);
    ra.addLiveRange("x", 0, 5);
    ra.addLiveRange("y", 3, 8);
    expect(ra.rangeCount).toBe(2);
  });

  it("getRanges returns copies", () => {
    const ra = new RegisterAllocator(4);
    ra.addLiveRange("x", 0, 5);
    const ranges = ra.getRanges();
    expect(ranges).toHaveLength(1);
    expect(ranges[0].variable).toBe("x");
  });

  it("clear removes all ranges", () => {
    const ra = new RegisterAllocator(4);
    ra.addLiveRange("x", 0, 5);
    ra.clear();
    expect(ra.rangeCount).toBe(0);
  });

  it("complex scenario with many variables", () => {
    const ra = new RegisterAllocator(4);
    ra.addLiveRange("a", 0, 20);
    ra.addLiveRange("b", 5, 15);
    ra.addLiveRange("c", 10, 25);
    ra.addLiveRange("d", 15, 30);
    ra.addLiveRange("e", 25, 35);
    const result = ra.allocateLinearScan();
    expect(result.spilled.length).toBe(0);
    expect(result.registersUsed).toBeLessThanOrEqual(4);
  });
});
