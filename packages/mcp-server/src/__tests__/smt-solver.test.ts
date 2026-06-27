import { describe, it, expect } from "vitest";
import {
  SMTSolver,
  smtVar,
  smtConst,
  smtAnd,
  smtEq,
  smtLt,
  smtGt,
  smtAdd,
  smtSub,
  smtNot,
  smtOr,
} from "../smt-solver.js";

describe("SMTSolver", () => {
  it("solves x == 5", () => {
    const solver = new SMTSolver();
    solver.assert(smtEq(smtVar("x"), smtConst(5)));
    const model = solver.solve()!;
    expect(model).not.toBeNull();
    expect(model.get("x")).toBe(5);
  });

  it("solves x + y == 10, x == 3", () => {
    const solver = new SMTSolver();
    solver.assert(smtEq(smtAdd(smtVar("x"), smtVar("y")), smtConst(10)));
    solver.assert(smtEq(smtVar("x"), smtConst(3)));
    const model = solver.solve()!;
    expect(model).not.toBeNull();
    expect(model.get("x")).toBe(3);
    expect(model.get("y")).toBe(7);
  });

  it("detects unsat", () => {
    const solver = new SMTSolver(5);
    solver.assert(smtEq(smtVar("x"), smtConst(3)));
    solver.assert(smtEq(smtVar("x"), smtConst(5)));
    expect(solver.check()).toBe("unsat");
  });

  it("solves inequalities", () => {
    const solver = new SMTSolver(5);
    solver.assert(smtGt(smtVar("x"), smtConst(2)));
    solver.assert(smtLt(smtVar("x"), smtConst(5)));
    const model = solver.solve()!;
    expect(model).not.toBeNull();
    const x = model.get("x") as number;
    expect(x).toBeGreaterThan(2);
    expect(x).toBeLessThan(5);
  });

  it("solves boolean variables", () => {
    const solver = new SMTSolver();
    const a = smtVar("a", "Bool");
    const b = smtVar("b", "Bool");
    solver.assert(smtOr(a, b));
    solver.assert(smtNot(smtAnd(a, b)));
    const model = solver.solve()!;
    expect(model).not.toBeNull();
    const aVal = model.get("a") as boolean;
    const bVal = model.get("b") as boolean;
    expect(aVal || bVal).toBe(true);
    expect(aVal && bVal).toBe(false);
  });

  it("eval evaluates expression with model", () => {
    const solver = new SMTSolver();
    const model = new Map<string, number | boolean>([["x", 5], ["y", 3]]);
    expect(solver.eval(smtAdd(smtVar("x"), smtVar("y")), model)).toBe(8);
    expect(solver.eval(smtSub(smtVar("x"), smtVar("y")), model)).toBe(2);
  });

  it("check returns sat for satisfiable", () => {
    const solver = new SMTSolver();
    solver.assert(smtEq(smtVar("x"), smtConst(1)));
    expect(solver.check()).toBe("sat");
  });

  it("reset clears assertions", () => {
    const solver = new SMTSolver();
    solver.assert(smtEq(smtVar("x"), smtConst(1)));
    solver.reset();
    expect(solver.assertionCount).toBe(0);
  });

  it("assertionCount tracks assertions", () => {
    const solver = new SMTSolver();
    solver.assert(smtEq(smtVar("x"), smtConst(1)));
    solver.assert(smtGt(smtVar("y"), smtConst(0)));
    expect(solver.assertionCount).toBe(2);
  });

  it("solves with no variables (tautology)", () => {
    const solver = new SMTSolver();
    solver.assert(smtEq(smtConst(5), smtConst(5)));
    expect(solver.check()).toBe("sat");
  });

  it("rejects contradiction with no variables", () => {
    const solver = new SMTSolver();
    solver.assert(smtEq(smtConst(3), smtConst(5)));
    expect(solver.check()).toBe("unsat");
  });
});
