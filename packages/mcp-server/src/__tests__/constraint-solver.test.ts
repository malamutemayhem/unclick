import { describe, it, expect } from "vitest";
import { solve, solveAll, allDifferent } from "../constraint-solver.js";
import type { Variable, Constraint } from "../constraint-solver.js";

describe("constraint-solver", () => {
  it("solves a simple assignment", () => {
    const variables: Variable<number>[] = [
      { name: "x", domain: [1, 2, 3] },
    ];
    const constraints: Constraint<number>[] = [
      { variables: ["x"], check: (v) => v.get("x")! > 1 },
    ];
    const result = solve(variables, constraints);
    expect(result.solution).not.toBeNull();
    expect(result.solution!.get("x")).toBeGreaterThan(1);
  });

  it("returns null for unsatisfiable problem", () => {
    const variables: Variable<number>[] = [
      { name: "x", domain: [1, 2] },
    ];
    const constraints: Constraint<number>[] = [
      { variables: ["x"], check: (v) => v.get("x")! > 10 },
    ];
    const result = solve(variables, constraints);
    expect(result.solution).toBeNull();
  });

  it("solves with allDifferent constraint", () => {
    const variables: Variable<number>[] = [
      { name: "a", domain: [1, 2, 3] },
      { name: "b", domain: [1, 2, 3] },
      { name: "c", domain: [1, 2, 3] },
    ];
    const constraints = [allDifferent<number>(["a", "b", "c"])];
    const result = solve(variables, constraints);
    expect(result.solution).not.toBeNull();
    const values = Array.from(result.solution!.values());
    expect(new Set(values).size).toBe(3);
  });

  it("solves map coloring", () => {
    const colors = ["red", "green", "blue"];
    const variables: Variable<string>[] = [
      { name: "WA", domain: colors },
      { name: "NT", domain: colors },
      { name: "SA", domain: colors },
      { name: "Q", domain: colors },
    ];
    const notEqual = (a: string, b: string): Constraint<string> => ({
      variables: [a, b],
      check: (v) => v.get(a) !== v.get(b),
    });
    const constraints = [
      notEqual("WA", "NT"),
      notEqual("WA", "SA"),
      notEqual("NT", "SA"),
      notEqual("NT", "Q"),
      notEqual("SA", "Q"),
    ];
    const result = solve(variables, constraints);
    expect(result.solution).not.toBeNull();
    expect(result.solution!.get("WA")).not.toBe(result.solution!.get("NT"));
    expect(result.solution!.get("WA")).not.toBe(result.solution!.get("SA"));
  });

  it("tracks explored count", () => {
    const variables: Variable<number>[] = [
      { name: "x", domain: [1, 2, 3] },
    ];
    const result = solve(variables, []);
    expect(result.explored).toBeGreaterThan(0);
  });
});

describe("solveAll", () => {
  it("finds all solutions", () => {
    const variables: Variable<number>[] = [
      { name: "x", domain: [1, 2, 3] },
    ];
    const constraints: Constraint<number>[] = [
      { variables: ["x"], check: (v) => v.get("x")! > 1 },
    ];
    const result = solveAll(variables, constraints);
    expect(result.solutions).toHaveLength(2);
  });

  it("respects maxSolutions", () => {
    const variables: Variable<number>[] = [
      { name: "x", domain: [1, 2, 3, 4, 5] },
    ];
    const result = solveAll(variables, [], 2);
    expect(result.solutions).toHaveLength(2);
  });

  it("returns empty for unsatisfiable", () => {
    const variables: Variable<number>[] = [
      { name: "x", domain: [1] },
    ];
    const constraints: Constraint<number>[] = [
      { variables: ["x"], check: (v) => v.get("x")! > 5 },
    ];
    const result = solveAll(variables, constraints);
    expect(result.solutions).toHaveLength(0);
  });
});
