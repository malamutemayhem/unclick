import { describe, it, expect } from "vitest";
import { BehaviorPlanner } from "../behavior-planner.js";

describe("BehaviorPlanner", () => {
  const actions: import("../behavior-planner.js").PlanAction[] = [
    { name: "getAxe", preconditions: {}, effects: { hasAxe: true }, cost: 1 },
    { name: "chopTree", preconditions: { hasAxe: true }, effects: { hasWood: true }, cost: 2 },
    { name: "buildHouse", preconditions: { hasWood: true }, effects: { hasHouse: true }, cost: 3 },
  ];

  it("satisfies checks all conditions", () => {
    expect(BehaviorPlanner.satisfies({ a: true, b: false }, { a: true })).toBe(true);
    expect(BehaviorPlanner.satisfies({ a: true }, { a: true, b: true })).toBe(false);
  });

  it("apply merges effects into state", () => {
    const result = BehaviorPlanner.apply({ a: true }, { b: true });
    expect(result).toEqual({ a: true, b: true });
  });

  it("plan finds sequence of actions", () => {
    const result = BehaviorPlanner.plan({}, { hasHouse: true }, actions);
    expect(result).not.toBeNull();
    expect(result!.length).toBe(3);
    expect(result![0].name).toBe("getAxe");
    expect(result![1].name).toBe("chopTree");
    expect(result![2].name).toBe("buildHouse");
  });

  it("plan returns null for impossible goal", () => {
    const result = BehaviorPlanner.plan({}, { hasCar: true }, actions);
    expect(result).toBeNull();
  });

  it("plan returns empty for already-satisfied goal", () => {
    const result = BehaviorPlanner.plan({ hasAxe: true }, { hasAxe: true }, actions);
    expect(result).not.toBeNull();
    expect(result!.length).toBe(0);
  });

  it("planAStar finds optimal plan", () => {
    const result = BehaviorPlanner.planAStar({}, { hasHouse: true }, actions);
    expect(result).not.toBeNull();
    expect(result!.length).toBe(3);
  });

  it("heuristic counts unsatisfied goals", () => {
    expect(BehaviorPlanner.heuristic({}, { a: true, b: true })).toBe(2);
    expect(BehaviorPlanner.heuristic({ a: true }, { a: true, b: true })).toBe(1);
  });

  it("reachable explores all states", () => {
    const states = BehaviorPlanner.reachable({}, actions);
    expect(states.length).toBeGreaterThan(1);
  });
});
