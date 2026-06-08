import { describe, it, expect } from "vitest";
import { VectorClock } from "../vector-clock.js";

describe("VectorClock", () => {
  it("initializes from record", () => {
    const vc = new VectorClock({ A: 1, B: 2 });
    expect(vc.get("A")).toBe(1);
    expect(vc.get("B")).toBe(2);
    expect(vc.get("C")).toBe(0);
  });

  it("increment advances node clock", () => {
    const vc = new VectorClock();
    vc.increment("A");
    vc.increment("A");
    expect(vc.get("A")).toBe(2);
  });

  it("merge takes max of each component", () => {
    const a = new VectorClock({ X: 3, Y: 1 });
    const b = new VectorClock({ X: 1, Y: 5 });
    const merged = a.merge(b);
    expect(merged.get("X")).toBe(3);
    expect(merged.get("Y")).toBe(5);
  });

  it("happensBefore detects causal ordering", () => {
    const a = new VectorClock({ X: 1, Y: 0 });
    const b = new VectorClock({ X: 1, Y: 1 });
    expect(a.happensBefore(b)).toBe(true);
    expect(b.happensBefore(a)).toBe(false);
  });

  it("isConcurrent detects concurrent events", () => {
    const a = new VectorClock({ X: 2, Y: 0 });
    const b = new VectorClock({ X: 0, Y: 2 });
    expect(a.isConcurrent(b)).toBe(true);
  });

  it("equals compares clocks", () => {
    const a = new VectorClock({ X: 1, Y: 2 });
    const b = new VectorClock({ X: 1, Y: 2 });
    expect(a.equals(b)).toBe(true);
  });

  it("send increments and copies", () => {
    const vc = new VectorClock({ A: 1 });
    const sent = vc.send("A");
    expect(sent.get("A")).toBe(2);
    expect(vc.get("A")).toBe(1);
  });

  it("receive merges and increments", () => {
    const local = new VectorClock({ A: 1, B: 0 });
    const remote = new VectorClock({ A: 0, B: 3 });
    const received = local.receive("A", remote);
    expect(received.get("A")).toBe(2);
    expect(received.get("B")).toBe(3);
  });

  it("toRecord and nodes", () => {
    const vc = new VectorClock({ P: 5, Q: 3 });
    expect(vc.toRecord()).toEqual({ P: 5, Q: 3 });
    expect(vc.nodes().sort()).toEqual(["P", "Q"]);
  });
});
