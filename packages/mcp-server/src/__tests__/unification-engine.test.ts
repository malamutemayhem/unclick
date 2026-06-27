import { describe, it, expect } from "vitest";
import {
  variable, constant, compound, unify, walk, deepWalk,
  termToString, termEquals, freeVars, UnificationEngine,
} from "../unification-engine.js";

describe("unify", () => {
  it("unifies two identical constants", () => {
    const result = unify(constant("a"), constant("a"));
    expect(result).not.toBeNull();
    expect(result!.size).toBe(0);
  });

  it("fails on different constants", () => {
    expect(unify(constant("a"), constant("b"))).toBeNull();
  });

  it("binds variable to constant", () => {
    const result = unify(variable("X"), constant("hello"));
    expect(result).not.toBeNull();
    expect(result!.get("X")).toEqual(constant("hello"));
  });

  it("unifies compound terms", () => {
    const t1 = compound("f", variable("X"), constant("b"));
    const t2 = compound("f", constant("a"), variable("Y"));
    const result = unify(t1, t2);
    expect(result).not.toBeNull();
    expect(result!.get("X")).toEqual(constant("a"));
    expect(result!.get("Y")).toEqual(constant("b"));
  });

  it("fails on different functors", () => {
    const t1 = compound("f", constant("a"));
    const t2 = compound("g", constant("a"));
    expect(unify(t1, t2)).toBeNull();
  });

  it("fails on different arity", () => {
    const t1 = compound("f", constant("a"));
    const t2 = compound("f", constant("a"), constant("b"));
    expect(unify(t1, t2)).toBeNull();
  });

  it("occurs check prevents infinite terms", () => {
    const t1 = variable("X");
    const t2 = compound("f", variable("X"));
    expect(unify(t1, t2)).toBeNull();
  });

  it("transitive unification", () => {
    const bindings = unify(variable("X"), variable("Y"));
    const result = unify(variable("Y"), constant("val"), bindings!);
    expect(result).not.toBeNull();
    const resolved = deepWalk(variable("X"), result!);
    expect(resolved).toEqual(constant("val"));
  });
});

describe("walk and deepWalk", () => {
  it("walk follows bindings", () => {
    const bindings = new Map([["X", constant("a")]]);
    expect(walk(variable("X"), bindings)).toEqual(constant("a"));
  });

  it("deepWalk resolves nested", () => {
    const bindings = new Map([
      ["X", variable("Y")],
      ["Y", constant("done")],
    ]);
    expect(deepWalk(variable("X"), bindings)).toEqual(constant("done"));
  });

  it("deepWalk resolves compounds", () => {
    const bindings = new Map([["X", constant("a")]]);
    const term = compound("f", variable("X"));
    const result = deepWalk(term, bindings);
    expect(result).toEqual(compound("f", constant("a")));
  });
});

describe("termToString", () => {
  it("formats variable", () => {
    expect(termToString(variable("X"))).toBe("?X");
  });

  it("formats constant", () => {
    expect(termToString(constant("hello"))).toBe("hello");
  });

  it("formats compound", () => {
    expect(termToString(compound("f", constant("a"), variable("X")))).toBe("f(a, ?X)");
  });

  it("formats with bindings", () => {
    const bindings = new Map([["X", constant("resolved")]]);
    expect(termToString(variable("X"), bindings)).toBe("resolved");
  });
});

describe("termEquals", () => {
  it("equal constants", () => {
    expect(termEquals(constant("a"), constant("a"))).toBe(true);
  });

  it("different constants", () => {
    expect(termEquals(constant("a"), constant("b"))).toBe(false);
  });

  it("equal compounds", () => {
    expect(termEquals(
      compound("f", constant("a")),
      compound("f", constant("a"))
    )).toBe(true);
  });
});

describe("freeVars", () => {
  it("collects variables", () => {
    const fv = freeVars(compound("f", variable("X"), variable("Y")));
    expect(fv.has("X")).toBe(true);
    expect(fv.has("Y")).toBe(true);
  });

  it("constants have no free vars", () => {
    expect(freeVars(constant("a")).size).toBe(0);
  });
});

describe("UnificationEngine", () => {
  it("unifies and resolves", () => {
    const engine = new UnificationEngine();
    expect(engine.unify(variable("X"), constant("val"))).toBe(true);
    expect(engine.resolve(variable("X"))).toEqual(constant("val"));
  });

  it("fails on conflict", () => {
    const engine = new UnificationEngine();
    engine.unify(variable("X"), constant("a"));
    expect(engine.unify(variable("X"), constant("b"))).toBe(false);
  });

  it("getBinding returns bound value", () => {
    const engine = new UnificationEngine();
    engine.unify(variable("X"), constant("hello"));
    expect(engine.getBinding("X")).toEqual(constant("hello"));
    expect(engine.getBinding("Y")).toBeUndefined();
  });

  it("reset clears state", () => {
    const engine = new UnificationEngine();
    engine.unify(variable("X"), constant("a"));
    engine.reset();
    expect(engine.bindingCount).toBe(0);
  });
});
