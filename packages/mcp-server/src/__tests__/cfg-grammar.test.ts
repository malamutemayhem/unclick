import { describe, it, expect } from "vitest";
import { CFGGrammar } from "../cfg-grammar.js";

describe("CFGGrammar", () => {
  it("addProduction and count", () => {
    const g = new CFGGrammar();
    g.addProduction("S", ["a", "B"]);
    g.addProduction("B", ["b"]);
    expect(g.productionCount).toBe(2);
  });

  it("auto-sets start symbol", () => {
    const g = new CFGGrammar();
    g.addProduction("E", ["T"]);
    expect(g.getStart()).toBe("E");
  });

  it("setStart overrides", () => {
    const g = new CFGGrammar();
    g.addProduction("E", ["T"]);
    g.addProduction("T", ["x"]);
    g.setStart("T");
    expect(g.getStart()).toBe("T");
  });

  it("getNonTerminals", () => {
    const g = new CFGGrammar();
    g.addProduction("S", ["A", "b"]);
    g.addProduction("A", ["a"]);
    const nts = g.getNonTerminals();
    expect(nts.has("S")).toBe(true);
    expect(nts.has("A")).toBe(true);
    expect(nts.size).toBe(2);
  });

  it("getTerminals", () => {
    const g = new CFGGrammar();
    g.addProduction("S", ["A", "b"]);
    g.addProduction("A", ["a"]);
    const terms = g.getTerminals();
    expect(terms.has("a")).toBe(true);
    expect(terms.has("b")).toBe(true);
    expect(terms.has("S")).toBe(false);
  });

  it("firstSet for terminal", () => {
    const g = new CFGGrammar();
    g.addProduction("S", ["a"]);
    const first = g.firstSet("a");
    expect(first.has("a")).toBe(true);
  });

  it("firstSet for non-terminal", () => {
    const g = new CFGGrammar();
    g.addProduction("S", ["A", "b"]);
    g.addProduction("A", ["a"]);
    const first = g.firstSet("S");
    expect(first.has("a")).toBe(true);
  });

  it("firstSet includes epsilon for nullable", () => {
    const g = new CFGGrammar();
    g.addProduction("S", ["A", "b"]);
    g.addProduction("A", [""]);
    g.addProduction("A", ["a"]);
    const first = g.firstSet("A");
    expect(first.has("")).toBe(true);
    expect(first.has("a")).toBe(true);
  });

  it("isNullable", () => {
    const g = new CFGGrammar();
    g.addProduction("A", [""]);
    g.addProduction("A", ["x"]);
    expect(g.isNullable("A")).toBe(true);
    expect(g.isNullable("x")).toBe(false);
  });

  it("followSet of start has $", () => {
    const g = new CFGGrammar();
    g.addProduction("S", ["A", "b"]);
    g.addProduction("A", ["a"]);
    const follow = g.followSet("S");
    expect(follow.has("$")).toBe(true);
  });

  it("followSet propagates from production", () => {
    const g = new CFGGrammar();
    g.addProduction("S", ["A", "b"]);
    g.addProduction("A", ["a"]);
    const follow = g.followSet("A");
    expect(follow.has("b")).toBe(true);
  });

  it("removeLeftRecursion", () => {
    const g = new CFGGrammar();
    g.addProduction("E", ["E", "+", "T"]);
    g.addProduction("E", ["T"]);
    const g2 = g.removeLeftRecursion();
    const eProds = g2.getProductions("E");
    const isRecursive = eProds.some(p => p.body[0] === "E");
    expect(isRecursive).toBe(false);
    expect(g2.getStart()).toBe("E");
  });

  it("removeLeftRecursion preserves non-recursive", () => {
    const g = new CFGGrammar();
    g.addProduction("S", ["a", "b"]);
    const g2 = g.removeLeftRecursion();
    expect(g2.productionCount).toBe(1);
  });

  it("getProductions filters by head", () => {
    const g = new CFGGrammar();
    g.addProduction("S", ["a"]);
    g.addProduction("S", ["b"]);
    g.addProduction("T", ["c"]);
    expect(g.getProductions("S")).toHaveLength(2);
    expect(g.getProductions("T")).toHaveLength(1);
  });
});
