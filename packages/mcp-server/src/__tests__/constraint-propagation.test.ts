import { describe, it, expect } from "vitest";
import {
  createCSP, addVariable, addConstraint, addNotEqual,
  addAllDifferent, solve, solveAll,
} from "../constraint-propagation.js";

describe("solve", () => {
  it("solves simple assignment", () => {
    let csp = createCSP<number>();
    csp = addVariable(csp, "x", [1, 2, 3]);
    csp = addConstraint(csp, ["x"], (a) => a.get("x")! > 2);
    const result = solve(csp);
    expect(result).not.toBeNull();
    expect(result!.get("x")).toBe(3);
  });

  it("solves with not-equal constraint", () => {
    let csp = createCSP<number>();
    csp = addVariable(csp, "a", [1, 2]);
    csp = addVariable(csp, "b", [1, 2]);
    csp = addNotEqual(csp, "a", "b");
    const result = solve(csp);
    expect(result).not.toBeNull();
    expect(result!.get("a")).not.toBe(result!.get("b"));
  });

  it("solves 3-coloring problem", () => {
    let csp = createCSP<string>();
    const colors = ["red", "green", "blue"];
    csp = addVariable(csp, "A", colors);
    csp = addVariable(csp, "B", colors);
    csp = addVariable(csp, "C", colors);
    csp = addNotEqual(csp, "A", "B");
    csp = addNotEqual(csp, "B", "C");
    csp = addNotEqual(csp, "A", "C");
    const result = solve(csp);
    expect(result).not.toBeNull();
    expect(result!.get("A")).not.toBe(result!.get("B"));
    expect(result!.get("B")).not.toBe(result!.get("C"));
    expect(result!.get("A")).not.toBe(result!.get("C"));
  });

  it("returns null for unsatisfiable", () => {
    let csp = createCSP<number>();
    csp = addVariable(csp, "x", [1]);
    csp = addVariable(csp, "y", [1]);
    csp = addNotEqual(csp, "x", "y");
    expect(solve(csp)).toBeNull();
  });

  it("handles allDifferent", () => {
    let csp = createCSP<number>();
    csp = addVariable(csp, "a", [1, 2, 3]);
    csp = addVariable(csp, "b", [1, 2, 3]);
    csp = addVariable(csp, "c", [1, 2, 3]);
    csp = addAllDifferent(csp, ["a", "b", "c"]);
    const result = solve(csp);
    expect(result).not.toBeNull();
    const vals = [result!.get("a"), result!.get("b"), result!.get("c")];
    expect(new Set(vals).size).toBe(3);
  });
});

describe("solveAll", () => {
  it("finds all solutions", () => {
    let csp = createCSP<number>();
    csp = addVariable(csp, "x", [1, 2]);
    csp = addVariable(csp, "y", [1, 2]);
    csp = addNotEqual(csp, "x", "y");
    const solutions = solveAll(csp);
    expect(solutions.length).toBe(2);
  });

  it("respects limit", () => {
    let csp = createCSP<number>();
    csp = addVariable(csp, "x", [1, 2, 3]);
    const solutions = solveAll(csp, 2);
    expect(solutions.length).toBe(2);
  });

  it("returns empty for unsatisfiable", () => {
    let csp = createCSP<number>();
    csp = addVariable(csp, "x", [1]);
    csp = addConstraint(csp, ["x"], (a) => a.get("x")! > 5);
    expect(solveAll(csp)).toEqual([]);
  });
});
