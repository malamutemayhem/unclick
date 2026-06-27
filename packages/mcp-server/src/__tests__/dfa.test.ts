import { describe, it, expect } from "vitest";
import { DFA, fromRegexLike } from "../dfa.js";

describe("DFA", () => {
  const binaryEvenZeros: DFA = new DFA({
    states: ["even", "odd"],
    alphabet: ["0", "1"],
    transitions: {
      even: { "0": "odd", "1": "even" },
      odd: { "0": "even", "1": "odd" },
    },
    start: "even",
    accept: ["even"],
  });

  it("accepts valid strings", () => {
    expect(binaryEvenZeros.accepts("")).toBe(true);
    expect(binaryEvenZeros.accepts("1")).toBe(true);
    expect(binaryEvenZeros.accepts("11")).toBe(true);
    expect(binaryEvenZeros.accepts("00")).toBe(true);
    expect(binaryEvenZeros.accepts("1001")).toBe(true);
  });

  it("rejects invalid strings", () => {
    expect(binaryEvenZeros.accepts("0")).toBe(false);
    expect(binaryEvenZeros.accepts("010")).toBe(true);
    expect(binaryEvenZeros.accepts("000")).toBe(false);
  });

  it("run provides path", () => {
    const result = binaryEvenZeros.run("01");
    expect(result.accepted).toBe(false);
    expect(result.path).toEqual(["even", "odd", "odd"]);
    expect(result.finalState).toBe("odd");
  });

  it("complement flips acceptance", () => {
    const comp = binaryEvenZeros.complement();
    expect(comp.accepts("0")).toBe(true);
    expect(comp.accepts("")).toBe(false);
  });

  it("isComplete checks all transitions", () => {
    expect(binaryEvenZeros.isComplete()).toBe(true);
    const incomplete = new DFA({
      states: ["q0"],
      alphabet: ["a", "b"],
      transitions: { q0: { a: "q0" } },
      start: "q0",
      accept: ["q0"],
    });
    expect(incomplete.isComplete()).toBe(false);
  });

  it("reachable states", () => {
    const dfa = new DFA({
      states: ["q0", "q1", "q2"],
      alphabet: ["a"],
      transitions: { q0: { a: "q1" }, q1: { a: "q1" }, q2: { a: "q2" } },
      start: "q0",
      accept: ["q1"],
    });
    const reachable = dfa.reachableStates();
    expect(reachable.has("q0")).toBe(true);
    expect(reachable.has("q1")).toBe(true);
    expect(reachable.has("q2")).toBe(false);
  });

  it("minimize reduces states", () => {
    const dfa = new DFA({
      states: ["q0", "q1", "q2"],
      alphabet: ["a", "b"],
      transitions: {
        q0: { a: "q1", b: "q2" },
        q1: { a: "q1", b: "q1" },
        q2: { a: "q2", b: "q2" },
      },
      start: "q0",
      accept: ["q1", "q2"],
    });
    const min = dfa.minimize();
    expect(min.accepts("a")).toBe(true);
    expect(min.accepts("b")).toBe(true);
    expect(min.accepts("")).toBe(false);
  });

  it("toDot generates graph", () => {
    const dot = binaryEvenZeros.toDot();
    expect(dot).toContain("digraph DFA");
    expect(dot).toContain("even");
    expect(dot).toContain("odd");
  });

  it("fromRegexLike creates simple DFA", () => {
    const dfa = fromRegexLike("ab", ["a", "b", "c"]);
    expect(dfa.accepts("a")).toBe(true);
    expect(dfa.accepts("b")).toBe(true);
    expect(dfa.accepts("c")).toBe(false);
  });
});
