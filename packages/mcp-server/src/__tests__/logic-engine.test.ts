import { describe, it, expect } from "vitest";
import {
  atom, variable, compound, unify, resolve, termToString,
  rule, fact, LogicEngine, parseTerm
} from "../logic-engine.js";

describe("LogicEngine", () => {
  it("unifies atoms", () => {
    const s = unify(atom("a"), atom("a"));
    expect(s).not.toBeNull();
    expect(unify(atom("a"), atom("b"))).toBeNull();
  });

  it("unifies variable with atom", () => {
    const s = unify(variable("X"), atom("hello"));
    expect(s).not.toBeNull();
    expect(resolve(variable("X"), s!).type).toBe("atom");
  });

  it("unifies compound terms", () => {
    const a = compound("f", atom("a"), variable("X"));
    const b = compound("f", variable("Y"), atom("b"));
    const s = unify(a, b);
    expect(s).not.toBeNull();
    expect(resolve(variable("X"), s!)).toEqual(atom("b"));
    expect(resolve(variable("Y"), s!)).toEqual(atom("a"));
  });

  it("fails on arity mismatch", () => {
    const a = compound("f", atom("a"));
    const b = compound("f", atom("a"), atom("b"));
    expect(unify(a, b)).toBeNull();
  });

  it("fails on functor mismatch", () => {
    const a = compound("f", atom("a"));
    const b = compound("g", atom("a"));
    expect(unify(a, b)).toBeNull();
  });

  it("occurs check prevents infinite terms", () => {
    const s = unify(variable("X"), compound("f", variable("X")));
    expect(s).toBeNull();
  });

  it("termToString formats terms", () => {
    expect(termToString(atom("hello"))).toBe("hello");
    expect(termToString(variable("X"))).toBe("X");
    expect(termToString(compound("f", atom("a"), atom("b")))).toBe("f(a, b)");
  });

  it("queries simple facts", () => {
    const engine = new LogicEngine();
    engine.addFact(compound("parent", atom("tom"), atom("bob")));
    engine.addFact(compound("parent", atom("tom"), atom("liz")));
    engine.addFact(compound("parent", atom("bob"), atom("ann")));

    const results = engine.query(compound("parent", atom("tom"), variable("X")));
    expect(results).toHaveLength(2);
  });

  it("queries with rules", () => {
    const engine = new LogicEngine();
    engine.addFact(compound("parent", atom("tom"), atom("bob")));
    engine.addFact(compound("parent", atom("bob"), atom("ann")));
    engine.addRule(rule(
      compound("grandparent", variable("X"), variable("Z")),
      compound("parent", variable("X"), variable("Y")),
      compound("parent", variable("Y"), variable("Z"))
    ));

    const results = engine.query(compound("grandparent", atom("tom"), variable("W")));
    expect(results).toHaveLength(1);
    const w = resolve(variable("W"), results[0]);
    expect(termToString(w)).toBe("ann");
  });

  it("handles multiple results", () => {
    const engine = new LogicEngine();
    engine.addFact(compound("likes", atom("alice"), atom("cats")));
    engine.addFact(compound("likes", atom("alice"), atom("dogs")));
    engine.addFact(compound("likes", atom("bob"), atom("cats")));

    const results = engine.query(compound("likes", variable("X"), atom("cats")));
    expect(results).toHaveLength(2);
  });

  it("parseTerm parses atoms and variables", () => {
    expect(parseTerm("hello")).toEqual(atom("hello"));
    expect(parseTerm("X")).toEqual(variable("X"));
  });

  it("parseTerm parses compound terms", () => {
    const t = parseTerm("f(a, X)");
    expect(t.type).toBe("compound");
    expect((t as { functor: string }).functor).toBe("f");
  });

  it("queryAll with multiple goals", () => {
    const engine = new LogicEngine();
    engine.addFact(compound("friend", atom("alice"), atom("bob")));
    engine.addFact(compound("friend", atom("bob"), atom("carol")));
    engine.addFact(compound("likes", atom("bob"), atom("pizza")));

    const results = engine.queryAll([
      compound("friend", atom("alice"), variable("X")),
      compound("likes", variable("X"), variable("Y")),
    ]);
    expect(results).toHaveLength(1);
    expect(termToString(resolve(variable("Y"), results[0]))).toBe("pizza");
  });
});
