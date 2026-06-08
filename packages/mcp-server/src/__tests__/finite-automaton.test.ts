import { describe, it, expect } from "vitest";
import { DFA } from "../finite-automaton.js";

describe("DFA", () => {
  it("accepts matching strings", () => {
    const dfa = DFA.fromTransitions("q0", ["q1"], [
      { from: "q0", input: "a", to: "q1" },
      { from: "q1", input: "b", to: "q0" },
    ]);
    expect(dfa.accepts_string("a")).toBe(true);
    expect(dfa.accepts_string("aba")).toBe(true);
  });

  it("rejects non-matching strings", () => {
    const dfa = DFA.fromTransitions("q0", ["q1"], [
      { from: "q0", input: "a", to: "q1" },
      { from: "q1", input: "b", to: "q0" },
    ]);
    expect(dfa.accepts_string("b")).toBe(false);
    expect(dfa.accepts_string("ab")).toBe(false);
  });

  it("step by step execution", () => {
    const dfa = DFA.fromTransitions("s0", ["s2"], [
      { from: "s0", input: "0", to: "s1" },
      { from: "s1", input: "1", to: "s2" },
    ]);
    expect(dfa.state).toBe("s0");
    dfa.step("0");
    expect(dfa.state).toBe("s1");
    dfa.step("1");
    expect(dfa.state).toBe("s2");
    expect(dfa.isAccepting()).toBe(true);
  });

  it("reset returns to start state", () => {
    const dfa = DFA.fromTransitions("q0", ["q1"], [
      { from: "q0", input: "a", to: "q1" },
    ]);
    dfa.step("a");
    expect(dfa.state).toBe("q1");
    dfa.reset();
    expect(dfa.state).toBe("q0");
  });

  it("rejects on unknown input", () => {
    const dfa = DFA.fromTransitions("q0", ["q1"], [
      { from: "q0", input: "a", to: "q1" },
    ]);
    expect(dfa.accepts_string("x")).toBe(false);
  });
});
