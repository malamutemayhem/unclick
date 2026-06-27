import { describe, it, expect } from "vitest";
import { PushdownAutomaton } from "../pushdown-automaton.js";

describe("PushdownAutomaton", () => {
  function balancedParensPDA(): PushdownAutomaton {
    const pda = new PushdownAutomaton("q0", ["q1"], "Z");
    pda.addTransition("q0", "(", "Z", "q0", ["A", "Z"]);
    pda.addTransition("q0", "(", "A", "q0", ["A", "A"]);
    pda.addTransition("q0", ")", "A", "q0", []);
    pda.addTransition("q0", "", "Z", "q1", ["Z"]);
    return pda;
  }

  it("accepts balanced parentheses", () => {
    const pda = balancedParensPDA();
    expect(pda.accepts("()")).toBe(true);
    expect(pda.accepts("(())")).toBe(true);
    expect(pda.accepts("()()")).toBe(true);
  });

  it("rejects unbalanced parentheses", () => {
    const pda = balancedParensPDA();
    expect(pda.accepts("(")).toBe(false);
    expect(pda.accepts(")")).toBe(false);
    expect(pda.accepts("(()")).toBe(false);
  });

  it("accepts empty string", () => {
    const pda = balancedParensPDA();
    expect(pda.accepts("")).toBe(true);
  });

  it("transitionCount tracks transitions", () => {
    const pda = balancedParensPDA();
    expect(pda.transitionCount()).toBe(4);
  });

  it("stateCount includes all states", () => {
    const pda = new PushdownAutomaton("q0", ["q1"]);
    pda.addTransition("q0", "a", "Z", "q1", ["Z"]);
    expect(pda.stateCount()).toBe(2);
  });

  it("accepts a^n b^n language", () => {
    const pda = new PushdownAutomaton("q0", ["q2"], "Z");
    pda.addTransition("q0", "a", "Z", "q0", ["A", "Z"]);
    pda.addTransition("q0", "a", "A", "q0", ["A", "A"]);
    pda.addTransition("q0", "b", "A", "q1", []);
    pda.addTransition("q1", "b", "A", "q1", []);
    pda.addTransition("q1", "", "Z", "q2", ["Z"]);
    expect(pda.accepts("aabb")).toBe(true);
    expect(pda.accepts("ab")).toBe(true);
    expect(pda.accepts("aab")).toBe(false);
  });

  it("rejects wrong input for simple PDA", () => {
    const pda = new PushdownAutomaton("q0", ["q1"], "Z");
    pda.addTransition("q0", "x", "Z", "q1", ["Z"]);
    expect(pda.accepts("y")).toBe(false);
    expect(pda.accepts("x")).toBe(true);
  });
});
