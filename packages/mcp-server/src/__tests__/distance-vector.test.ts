import { describe, it, expect } from "vitest";
import { DistanceVectorRouter, converge } from "../distance-vector.js";

describe("DistanceVectorRouter", () => {
  it("knows self at cost 0", () => {
    const r = new DistanceVectorRouter("A");
    expect(r.getCost("A")).toBe(0);
    expect(r.getNextHop("A")).toBe("A");
  });

  it("addNeighbor creates direct route", () => {
    const r = new DistanceVectorRouter("A");
    r.addNeighbor("B", 3);
    expect(r.getCost("B")).toBe(3);
    expect(r.getNextHop("B")).toBe("B");
  });

  it("receiveUpdate learns indirect routes", () => {
    const a = new DistanceVectorRouter("A");
    const b = new DistanceVectorRouter("B");
    a.addNeighbor("B", 1);
    b.addNeighbor("A", 1);
    b.addNeighbor("C", 2);

    a.receiveUpdate(b.getUpdate());
    expect(a.getCost("C")).toBe(3); // A->B(1) + B->C(2)
    expect(a.getNextHop("C")).toBe("B");
  });

  it("receiveUpdate picks shorter route", () => {
    const a = new DistanceVectorRouter("A");
    a.addNeighbor("B", 1);
    a.addNeighbor("C", 10);

    a.receiveUpdate({ from: "B", entries: [{ dest: "C", cost: 2, nextHop: "C" }] });
    expect(a.getCost("C")).toBe(3); // via B: 1+2 < 10
  });

  it("receiveUpdate ignores worse route", () => {
    const a = new DistanceVectorRouter("A");
    a.addNeighbor("B", 1);
    a.addNeighbor("C", 2);

    a.receiveUpdate({ from: "B", entries: [{ dest: "C", cost: 5, nextHop: "C" }] });
    expect(a.getCost("C")).toBe(2); // direct is better
  });

  it("receiveUpdate from unknown neighbor returns false", () => {
    const a = new DistanceVectorRouter("A");
    expect(a.receiveUpdate({ from: "X", entries: [] })).toBe(false);
  });

  it("removeNeighbor purges routes through it", () => {
    const a = new DistanceVectorRouter("A");
    a.addNeighbor("B", 1);
    a.receiveUpdate({ from: "B", entries: [{ dest: "C", cost: 2, nextHop: "C" }] });
    a.removeNeighbor("B");
    expect(a.getCost("C")).toBeNull();
  });

  it("getRoute returns full entry", () => {
    const a = new DistanceVectorRouter("A");
    a.addNeighbor("B", 5);
    const route = a.getRoute("B");
    expect(route).not.toBeNull();
    expect(route!.cost).toBe(5);
  });

  it("getRoute returns null for unknown", () => {
    const a = new DistanceVectorRouter("A");
    expect(a.getRoute("Z")).toBeNull();
  });

  it("getRoutingTable includes all known routes", () => {
    const a = new DistanceVectorRouter("A");
    a.addNeighbor("B", 1);
    a.addNeighbor("C", 2);
    expect(a.getRoutingTable()).toHaveLength(3); // A, B, C
  });

  it("tableSize tracks entries", () => {
    const a = new DistanceVectorRouter("A");
    expect(a.tableSize).toBe(1); // just self
    a.addNeighbor("B", 1);
    expect(a.tableSize).toBe(2);
  });
});

describe("converge", () => {
  it("converges a 3-node network", () => {
    const a = new DistanceVectorRouter("A");
    const b = new DistanceVectorRouter("B");
    const c = new DistanceVectorRouter("C");

    a.addNeighbor("B", 1);
    b.addNeighbor("A", 1);
    b.addNeighbor("C", 2);
    c.addNeighbor("B", 2);

    const rounds = converge([a, b, c]);
    expect(rounds).toBeLessThanOrEqual(3);
    expect(a.getCost("C")).toBe(3);
    expect(c.getCost("A")).toBe(3);
  });

  it("converges a ring topology", () => {
    const a = new DistanceVectorRouter("A");
    const b = new DistanceVectorRouter("B");
    const c = new DistanceVectorRouter("C");

    a.addNeighbor("B", 1); a.addNeighbor("C", 10);
    b.addNeighbor("A", 1); b.addNeighbor("C", 2);
    c.addNeighbor("A", 10); c.addNeighbor("B", 2);

    converge([a, b, c]);
    expect(a.getCost("C")).toBe(3); // A->B->C
  });
});
