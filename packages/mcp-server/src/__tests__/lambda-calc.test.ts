import { describe, it, expect } from "vitest";
import { LambdaCalculus } from "../lambda-calc.js";

const LC = LambdaCalculus;

describe("LambdaCalculus", () => {
  it("creates and prints terms", () => {
    const id = LC.abstraction("x", LC.variable("x"));
    expect(LC.toString(id)).toBe("(\\x.x)");
  });

  it("computes free variables", () => {
    const term = LC.application(LC.variable("x"), LC.abstraction("y", LC.variable("y")));
    const free = LC.freeVars(term);
    expect(free.has("x")).toBe(true);
    expect(free.has("y")).toBe(false);
  });

  it("performs substitution", () => {
    const term = LC.abstraction("x", LC.variable("y"));
    const result = LC.substitute(term, "y", LC.variable("z"));
    expect(LC.toString(result)).toBe("(\\x.z)");
  });

  it("beta reduces application", () => {
    const id = LC.abstraction("x", LC.variable("x"));
    const app = LC.application(id, LC.variable("y"));
    const result = LC.betaReduce(app);
    expect(result).not.toBeNull();
    expect(LC.toString(result!)).toBe("y");
  });

  it("normalizes terms", () => {
    const id = LC.abstraction("x", LC.variable("x"));
    const app = LC.application(id, LC.variable("a"));
    const normal = LC.normalize(app);
    expect(LC.toString(normal)).toBe("a");
  });

  it("creates church numerals", () => {
    const zero = LC.churchNumeral(0);
    expect(LC.toString(zero)).toBe("(\\f.(\\x.x))");
    const two = LC.churchNumeral(2);
    expect(LC.toString(two)).toBe("(\\f.(\\x.(f (f x))))");
  });

  it("detects alpha equivalence", () => {
    const t1 = LC.abstraction("x", LC.variable("x"));
    const t2 = LC.abstraction("y", LC.variable("y"));
    expect(LC.isAlphaEquivalent(t1, t2)).toBe(true);
  });

  it("handles capture-avoiding substitution", () => {
    const term = LC.abstraction("x", LC.variable("y"));
    const result = LC.substitute(term, "y", LC.variable("x"));
    const str = LC.toString(result);
    expect(str).not.toBe("(\\x.x)");
  });
});
