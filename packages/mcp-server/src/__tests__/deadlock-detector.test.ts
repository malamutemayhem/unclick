import { describe, it, expect } from "vitest";
import { DeadlockDetector } from "../deadlock-detector.js";

describe("DeadlockDetector", () => {
  it("detects simple cycle", () => {
    const dd = new DeadlockDetector();
    dd.addEdge("A", "B");
    dd.addEdge("B", "A");
    expect(dd.hasDeadlock()).toBe(true);
  });

  it("no deadlock without cycle", () => {
    const dd = new DeadlockDetector();
    dd.addEdge("A", "B");
    dd.addEdge("B", "C");
    expect(dd.hasDeadlock()).toBe(false);
  });

  it("finds cycle nodes", () => {
    const dd = new DeadlockDetector();
    dd.addEdge("A", "B");
    dd.addEdge("B", "C");
    dd.addEdge("C", "A");
    const cycles = dd.findCycles();
    expect(cycles.length).toBeGreaterThan(0);
    expect(cycles[0]).toContain("A");
    expect(cycles[0]).toContain("B");
    expect(cycles[0]).toContain("C");
  });

  it("tracks nodes and edges", () => {
    const dd = new DeadlockDetector();
    dd.addEdge("X", "Y");
    dd.addEdge("Y", "Z");
    expect(dd.nodes().length).toBe(3);
    expect(dd.edgeCount()).toBe(2);
  });

  it("removeEdge breaks cycle", () => {
    const dd = new DeadlockDetector();
    dd.addEdge("A", "B");
    dd.addEdge("B", "A");
    expect(dd.hasDeadlock()).toBe(true);
    dd.removeEdge("B", "A");
    expect(dd.hasDeadlock()).toBe(false);
  });

  it("clear resets everything", () => {
    const dd = new DeadlockDetector();
    dd.addEdge("A", "B");
    dd.clear();
    expect(dd.nodes().length).toBe(0);
    expect(dd.edgeCount()).toBe(0);
  });

  it("canAddWithoutDeadlock checks safety", () => {
    const dd = new DeadlockDetector();
    dd.addEdge("A", "B");
    expect(dd.canAddWithoutDeadlock("B", "A")).toBe(false);
    expect(dd.canAddWithoutDeadlock("B", "C")).toBe(true);
  });

  it("handles self-loop as deadlock", () => {
    const dd = new DeadlockDetector();
    dd.addEdge("A", "A");
    expect(dd.hasDeadlock()).toBe(true);
  });
});
