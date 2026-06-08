import { describe, it, expect, beforeEach } from "vitest";
import {
  atom, variable, compound, num, unify, resolve, termToString,
  fact, rule, queryAll, resetVarCounter,
} from "../logic-program.js";

beforeEach(() => resetVarCounter());

describe("unify", () => {
  it("unifies identical atoms", () => {
    const s = unify(atom("hello"), atom("hello"));
    expect(s).not.toBeNull();
  });

  it("fails on different atoms", () => {
    expect(unify(atom("a"), atom("b"))).toBeNull();
  });

  it("unifies variable with atom", () => {
    const s = unify(variable("X"), atom("hello"));
    expect(s).not.toBeNull();
    expect(resolve(variable("X"), s!)).toEqual(atom("hello"));
  });

  it("unifies compound terms", () => {
    const a = compound("f", variable("X"), atom("b"));
    const b = compound("f", atom("a"), variable("Y"));
    const s = unify(a, b);
    expect(s).not.toBeNull();
    expect(resolve(variable("X"), s!)).toEqual(atom("a"));
    expect(resolve(variable("Y"), s!)).toEqual(atom("b"));
  });

  it("fails on different functors", () => {
    expect(unify(compound("f", atom("a")), compound("g", atom("a")))).toBeNull();
  });

  it("unifies numbers", () => {
    expect(unify(num(42), num(42))).not.toBeNull();
    expect(unify(num(1), num(2))).toBeNull();
  });
});

describe("termToString", () => {
  it("prints compound", () => {
    expect(termToString(compound("parent", atom("tom"), atom("bob")))).toBe("parent(tom, bob)");
  });
});

describe("queryAll", () => {
  it("queries facts", () => {
    const program = [
      fact(compound("parent", atom("tom"), atom("bob"))),
      fact(compound("parent", atom("tom"), atom("liz"))),
      fact(compound("parent", atom("bob"), atom("ann"))),
    ];
    const results = queryAll(program, [compound("parent", atom("tom"), variable("X"))]);
    expect(results.length).toBe(2);
  });

  it("queries with rules", () => {
    const program = [
      fact(compound("parent", atom("tom"), atom("bob"))),
      fact(compound("parent", atom("bob"), atom("ann"))),
      rule(
        compound("grandparent", variable("X"), variable("Z")),
        compound("parent", variable("X"), variable("Y")),
        compound("parent", variable("Y"), variable("Z")),
      ),
    ];
    const results = queryAll(program, [compound("grandparent", atom("tom"), variable("W"))]);
    expect(results.length).toBe(1);
    const w = resolve(variable("W"), results[0]);
    expect(w).toEqual(atom("ann"));
  });

  it("finds no results for unmatched query", () => {
    const program = [fact(compound("color", atom("red")))];
    const results = queryAll(program, [compound("color", atom("blue"))]);
    expect(results).toEqual([]);
  });

  it("respects limit", () => {
    const program = [
      fact(compound("num", num(1))),
      fact(compound("num", num(2))),
      fact(compound("num", num(3))),
    ];
    const results = queryAll(program, [compound("num", variable("X"))], 2);
    expect(results.length).toBe(2);
  });
});
