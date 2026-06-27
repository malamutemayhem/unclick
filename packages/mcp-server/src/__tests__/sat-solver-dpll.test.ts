import { describe, it, expect } from "vitest";
import { SATSolverDPLL } from "../sat-solver-dpll.js";

describe("SATSolverDPLL", () => {
  it("solves simple satisfiable formula", () => {
    const clauses = [[1, 2], [-1, 2], [1, -2]];
    const result = SATSolverDPLL.solve(clauses, 2);
    expect(result).not.toBeNull();
    expect(SATSolverDPLL.isSatisfied(clauses, result!)).toBe(true);
  });

  it("detects unsatisfiable formula", () => {
    const clauses = [[1], [-1]];
    expect(SATSolverDPLL.solve(clauses, 1)).toBeNull();
  });

  it("solves 3-SAT instance", () => {
    const clauses = [[1, 2, 3], [-1, -2, 3], [1, -2, -3]];
    const result = SATSolverDPLL.solve(clauses, 3);
    expect(result).not.toBeNull();
    expect(SATSolverDPLL.isSatisfied(clauses, result!)).toBe(true);
  });

  it("single clause single variable", () => {
    const result = SATSolverDPLL.solve([[1]], 1);
    expect(result).not.toBeNull();
    expect(result!.get(1)).toBe(true);
  });

  it("empty clauses is satisfiable", () => {
    const result = SATSolverDPLL.solve([], 0);
    expect(result).not.toBeNull();
  });

  it("isSatisfied verifies assignment", () => {
    const clauses = [[1, -2], [2]];
    const good = new Map([[1, true], [2, true]]);
    const bad = new Map([[1, false], [2, false]]);
    expect(SATSolverDPLL.isSatisfied(clauses, good)).toBe(true);
    expect(SATSolverDPLL.isSatisfied(clauses, bad)).toBe(false);
  });

  it("handles pure literals", () => {
    const clauses = [[1, 2], [1, 3]];
    const result = SATSolverDPLL.solve(clauses, 3);
    expect(result).not.toBeNull();
  });
});
