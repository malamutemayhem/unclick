import { describe, it, expect } from "vitest";
import { TruthTable } from "../truth-table.js";

describe("TruthTable", () => {
  it("evaluate computes basic logic ops", () => {
    expect(TruthTable.evaluate("AND", true, true)).toBe(true);
    expect(TruthTable.evaluate("AND", true, false)).toBe(false);
    expect(TruthTable.evaluate("OR", false, true)).toBe(true);
    expect(TruthTable.evaluate("NOT", true)).toBe(false);
    expect(TruthTable.evaluate("XOR", true, true)).toBe(false);
    expect(TruthTable.evaluate("NAND", true, true)).toBe(false);
    expect(TruthTable.evaluate("IMPLIES", true, false)).toBe(false);
    expect(TruthTable.evaluate("IFF", true, true)).toBe(true);
  });

  it("generate creates correct number of rows", () => {
    const rows = TruthTable.generate("AND", 2);
    expect(rows.length).toBe(4);
    expect(rows[3].output).toBe(true);
    expect(rows[0].output).toBe(false);
  });

  it("fromFunction builds table from custom function", () => {
    const rows = TruthTable.fromFunction(2, (a, b) => a || b);
    expect(rows.length).toBe(4);
    expect(rows[0].output).toBe(false);
    expect(rows[3].output).toBe(true);
  });

  it("minterms returns indices where output is true", () => {
    const rows = TruthTable.generate("AND", 2);
    expect(TruthTable.minterms(rows)).toEqual([3]);
  });

  it("maxterms returns indices where output is false", () => {
    const rows = TruthTable.generate("AND", 2);
    expect(TruthTable.maxterms(rows)).toEqual([0, 1, 2]);
  });

  it("isTautology detects always-true tables", () => {
    const rows = TruthTable.fromFunction(2, () => true);
    expect(TruthTable.isTautology(rows)).toBe(true);
    expect(TruthTable.isContradiction(rows)).toBe(false);
  });

  it("isContradiction detects always-false tables", () => {
    const rows = TruthTable.fromFunction(2, () => false);
    expect(TruthTable.isContradiction(rows)).toBe(true);
  });

  it("isSatisfiable checks if any output is true", () => {
    const rows = TruthTable.generate("AND", 2);
    expect(TruthTable.isSatisfiable(rows)).toBe(true);
  });

  it("equivalent compares two tables", () => {
    const a = TruthTable.generate("AND", 2);
    const b = TruthTable.generate("AND", 2);
    const c = TruthTable.generate("OR", 2);
    expect(TruthTable.equivalent(a, b)).toBe(true);
    expect(TruthTable.equivalent(a, c)).toBe(false);
  });

  it("toString formats table with headers", () => {
    const rows = TruthTable.generate("AND", 2);
    const str = TruthTable.toString(rows, ["P", "Q"]);
    expect(str).toContain("P | Q | OUT");
    expect(str.split("\n").length).toBe(6);
  });
});
