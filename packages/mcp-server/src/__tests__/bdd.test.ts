import { describe, it, expect } from "vitest";
import {
  TRUE, FALSE, variable, evaluate, and, or, not, xor, implies,
  restrict, satCount, nodeCount, isEquivalent,
} from "../bdd.js";

describe("evaluate", () => {
  it("evaluates leaf true", () => {
    expect(evaluate(TRUE, new Map())).toBe(true);
  });

  it("evaluates leaf false", () => {
    expect(evaluate(FALSE, new Map())).toBe(false);
  });

  it("evaluates variable", () => {
    const x = variable(0);
    expect(evaluate(x, new Map([[0, true]]))).toBe(true);
    expect(evaluate(x, new Map([[0, false]]))).toBe(false);
  });
});

describe("operations", () => {
  it("AND gate", () => {
    const result = and(variable(0), variable(1));
    expect(evaluate(result, new Map([[0, true], [1, true]]))).toBe(true);
    expect(evaluate(result, new Map([[0, true], [1, false]]))).toBe(false);
    expect(evaluate(result, new Map([[0, false], [1, true]]))).toBe(false);
  });

  it("OR gate", () => {
    const result = or(variable(0), variable(1));
    expect(evaluate(result, new Map([[0, false], [1, false]]))).toBe(false);
    expect(evaluate(result, new Map([[0, true], [1, false]]))).toBe(true);
  });

  it("NOT gate", () => {
    const result = not(variable(0));
    expect(evaluate(result, new Map([[0, true]]))).toBe(false);
    expect(evaluate(result, new Map([[0, false]]))).toBe(true);
  });

  it("XOR gate", () => {
    const result = xor(variable(0), variable(1));
    expect(evaluate(result, new Map([[0, true], [1, true]]))).toBe(false);
    expect(evaluate(result, new Map([[0, true], [1, false]]))).toBe(true);
  });

  it("IMPLIES", () => {
    const result = implies(variable(0), variable(1));
    expect(evaluate(result, new Map([[0, true], [1, false]]))).toBe(false);
    expect(evaluate(result, new Map([[0, false], [1, false]]))).toBe(true);
  });
});

describe("restrict", () => {
  it("restricts variable to value", () => {
    const expr = and(variable(0), variable(1));
    const restricted = restrict(expr, 0, true);
    expect(evaluate(restricted, new Map([[1, true]]))).toBe(true);
    expect(evaluate(restricted, new Map([[1, false]]))).toBe(false);
  });
});

describe("satCount", () => {
  it("counts satisfying assignments for tautology", () => {
    expect(satCount(TRUE, 2)).toBe(4);
  });

  it("counts zero for contradiction", () => {
    expect(satCount(FALSE, 2)).toBe(0);
  });

  it("counts for single variable", () => {
    expect(satCount(variable(0), 1)).toBe(1);
  });
});

describe("nodeCount", () => {
  it("counts leaf nodes", () => {
    expect(nodeCount(TRUE)).toBe(1);
  });

  it("counts variable nodes", () => {
    expect(nodeCount(variable(0))).toBe(3);
  });
});

describe("isEquivalent", () => {
  it("detects equivalent BDDs", () => {
    const a = not(not(variable(0)));
    const b = variable(0);
    expect(isEquivalent(a, b, 1)).toBe(true);
  });

  it("detects non-equivalent", () => {
    expect(isEquivalent(variable(0), not(variable(0)), 1)).toBe(false);
  });
});
