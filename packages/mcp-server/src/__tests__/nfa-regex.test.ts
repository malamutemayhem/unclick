import { describe, it, expect } from "vitest";
import { NFA } from "../nfa-regex.js";

describe("NFA", () => {
  it("accepts matching string", () => {
    const nfa = new NFA();
    const s1 = nfa.addState(false);
    const s2 = nfa.addState(true);
    nfa.addTransition(0, "a", s1);
    nfa.addTransition(s1, "b", s2);
    expect(nfa.accepts("ab")).toBe(true);
    expect(nfa.accepts("a")).toBe(false);
    expect(nfa.accepts("abc")).toBe(false);
  });

  it("handles epsilon transitions", () => {
    const nfa = new NFA();
    const s1 = nfa.addState(false);
    const s2 = nfa.addState(true);
    nfa.addEpsilon(0, s1);
    nfa.addTransition(s1, "x", s2);
    expect(nfa.accepts("x")).toBe(true);
  });

  it("handles non-determinism", () => {
    const nfa = new NFA();
    const s1 = nfa.addState(false);
    const s2 = nfa.addState(true);
    const s3 = nfa.addState(false);
    nfa.addTransition(0, "a", s1);
    nfa.addTransition(0, "a", s3);
    nfa.addTransition(s1, "b", s2);
    expect(nfa.accepts("ab")).toBe(true);
    expect(nfa.accepts("a")).toBe(false);
  });

  it("fromPattern handles literal", () => {
    const nfa = NFA.fromPattern("abc");
    expect(nfa.accepts("abc")).toBe(true);
    expect(nfa.accepts("ab")).toBe(false);
    expect(nfa.accepts("abcd")).toBe(false);
  });

  it("fromPattern handles star", () => {
    const nfa = NFA.fromPattern("a*b");
    expect(nfa.accepts("b")).toBe(true);
    expect(nfa.accepts("ab")).toBe(true);
    expect(nfa.accepts("aaab")).toBe(true);
    expect(nfa.accepts("a")).toBe(false);
  });

  it("fromPattern handles optional", () => {
    const nfa = NFA.fromPattern("ab?c");
    expect(nfa.accepts("ac")).toBe(true);
    expect(nfa.accepts("abc")).toBe(true);
    expect(nfa.accepts("abbc")).toBe(false);
  });

  it("stateCount tracks states", () => {
    const nfa = new NFA();
    nfa.addState(false);
    nfa.addState(true);
    expect(nfa.stateCount).toBe(3);
  });
});
