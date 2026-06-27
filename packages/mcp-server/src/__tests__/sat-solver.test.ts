import { describe, it, expect } from "vitest";
import {
  solve, verify, isSatisfiable, allSolutions,
  formulaToString, clauseCount, variableCount,
} from "../sat-solver.js";

describe("solve", () => {
  it("solves simple satisfiable formula", () => {
    const formula = [[1], [2]];
    const result = solve(formula);
    expect(result).not.toBeNull();
    expect(verify(formula, result!)).toBe(true);
  });

  it("solves with negation", () => {
    const formula = [[1, -2], [-1, 2]];
    const result = solve(formula);
    expect(result).not.toBeNull();
    expect(verify(formula, result!)).toBe(true);
  });

  it("detects unsatisfiable", () => {
    const formula = [[1], [-1]];
    expect(solve(formula)).toBeNull();
  });

  it("solves 3-SAT instance", () => {
    const formula = [[1, 2, 3], [-1, -2, 3], [1, -2, -3]];
    const result = solve(formula);
    expect(result).not.toBeNull();
    expect(isSatisfiable(formula)).toBe(true);
  });

  it("solves unit clause", () => {
    const formula = [[1]];
    const result = solve(formula);
    expect(result).not.toBeNull();
    expect(result!.get(1)).toBe(true);
  });
});

describe("verify", () => {
  it("verifies correct assignment", () => {
    const formula = [[1, 2], [-1, 2]];
    const assignment = new Map([[1, true], [2, true]]);
    expect(verify(formula, assignment)).toBe(true);
  });

  it("rejects incorrect assignment", () => {
    const formula = [[1], [-1]];
    expect(verify(formula, new Map([[1, true]]))).toBe(false);
  });
});

describe("allSolutions", () => {
  it("finds all solutions", () => {
    const formula = [[1, 2]];
    const solutions = allSolutions(formula);
    expect(solutions.length).toBeGreaterThanOrEqual(2);
  });

  it("respects limit", () => {
    const formula = [[1, 2]];
    expect(allSolutions(formula, 1).length).toBe(1);
  });
});

describe("utilities", () => {
  it("counts clauses", () => {
    expect(clauseCount([[1, 2], [3]])).toBe(2);
  });

  it("counts variables", () => {
    expect(variableCount([[1, -2], [2, 3]])).toBe(3);
  });

  it("formats formula", () => {
    const s = formulaToString([[1, -2], [3]]);
    expect(s).toContain("~2");
  });

  it("isSatisfiable helper", () => {
    expect(isSatisfiable([[1]])).toBe(true);
    expect(isSatisfiable([[1], [-1]])).toBe(false);
  });
});
