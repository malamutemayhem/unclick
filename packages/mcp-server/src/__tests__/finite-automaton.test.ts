import { describe, it, expect } from "vitest";
import { createFA, runDFA, runNFA, accepts, getReachableStates, isComplete } from "../finite-automaton.js";

describe("DFA", () => {
  it("accepts matching string", () => {
    const fa = createFA([
      { from: "s0", to: "s1", on: "a" },
      { from: "s1", to: "s2", on: "b" },
    ], "s0", ["s2"]);
    expect(runDFA(fa, "ab")).toBe(true);
  });

  it("rejects non-matching string", () => {
    const fa = createFA([
      { from: "s0", to: "s1", on: "a" },
      { from: "s1", to: "s2", on: "b" },
    ], "s0", ["s2"]);
    expect(runDFA(fa, "ba")).toBe(false);
  });

  it("rejects partial match", () => {
    const fa = createFA([
      { from: "s0", to: "s1", on: "a" },
      { from: "s1", to: "s2", on: "b" },
    ], "s0", ["s2"]);
    expect(runDFA(fa, "a")).toBe(false);
  });

  it("accepts empty string if start is accept", () => {
    const fa = createFA([], "s0", ["s0"]);
    expect(runDFA(fa, "")).toBe(true);
  });
});

describe("NFA", () => {
  it("handles epsilon transitions", () => {
    const fa = createFA([
      { from: "s0", to: "s1", on: "" },
      { from: "s1", to: "s2", on: "a" },
    ], "s0", ["s2"]);
    expect(runNFA(fa, "a")).toBe(true);
  });

  it("handles nondeterminism", () => {
    const fa = createFA([
      { from: "s0", to: "s1", on: "a" },
      { from: "s0", to: "s2", on: "a" },
    ], "s0", ["s2"]);
    expect(runNFA(fa, "a")).toBe(true);
  });
});

describe("accepts", () => {
  it("auto-detects DFA", () => {
    const fa = createFA([
      { from: "s0", to: "s1", on: "x" },
    ], "s0", ["s1"]);
    expect(accepts(fa, "x")).toBe(true);
  });

  it("auto-detects NFA with epsilon", () => {
    const fa = createFA([
      { from: "s0", to: "s1", on: "" },
      { from: "s1", to: "s2", on: "y" },
    ], "s0", ["s2"]);
    expect(accepts(fa, "y")).toBe(true);
  });
});

describe("getReachableStates", () => {
  it("finds reachable states", () => {
    const fa = createFA([
      { from: "s0", to: "s1", on: "a" },
      { from: "s1", to: "s2", on: "b" },
    ], "s0", ["s2"]);
    const reachable = getReachableStates(fa);
    expect(reachable.has("s0")).toBe(true);
    expect(reachable.has("s1")).toBe(true);
    expect(reachable.has("s2")).toBe(true);
  });
});

describe("isComplete", () => {
  it("returns true for complete DFA", () => {
    const fa = createFA([
      { from: "s0", to: "s0", on: "a" },
      { from: "s0", to: "s0", on: "b" },
    ], "s0", ["s0"]);
    expect(isComplete(fa)).toBe(true);
  });

  it("returns false for incomplete DFA", () => {
    const fa = createFA([
      { from: "s0", to: "s1", on: "a" },
    ], "s0", ["s1"]);
    fa.alphabet.add("b");
    expect(isComplete(fa)).toBe(false);
  });
});
