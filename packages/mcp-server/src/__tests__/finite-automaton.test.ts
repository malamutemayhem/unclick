import { describe, it, expect } from "vitest";
import { DFA, buildRegexDFA } from "../finite-automaton.js";

describe("DFA", () => {
  const binaryEndsInOne = new DFA({
    states: ["q0", "q1"],
    alphabet: ["0", "1"],
    transitions: {
      q0: { "0": "q0", "1": "q1" },
      q1: { "0": "q0", "1": "q1" },
    },
    startState: "q0",
    acceptStates: ["q1"],
  });

  it("accepts matching input", () => {
    expect(binaryEndsInOne.accepts("101")).toBe(true);
    expect(binaryEndsInOne.accepts("1")).toBe(true);
  });

  it("rejects non-matching input", () => {
    expect(binaryEndsInOne.accepts("100")).toBe(false);
    expect(binaryEndsInOne.accepts("0")).toBe(false);
  });

  it("rejects empty input when start is not accept", () => {
    expect(binaryEndsInOne.accepts("")).toBe(false);
  });

  it("rejects unknown chars", () => {
    expect(binaryEndsInOne.accepts("abc")).toBe(false);
  });

  it("run returns path and final state", () => {
    const result = binaryEndsInOne.run("101");
    expect(result.accepted).toBe(true);
    expect(result.finalState).toBe("q1");
    expect(result.path).toEqual(["q0", "q1", "q0", "q1"]);
  });

  it("run stops on unknown transition", () => {
    const result = binaryEndsInOne.run("1x0");
    expect(result.accepted).toBe(false);
    expect(result.path).toEqual(["q0", "q1"]);
  });

  it("run on empty string returns start state", () => {
    const result = binaryEndsInOne.run("");
    expect(result.finalState).toBe("q0");
    expect(result.path).toEqual(["q0"]);
  });
});

describe("buildRegexDFA", () => {
  it("matches exact string", () => {
    expect(buildRegexDFA("hello").accepts("hello")).toBe(true);
  });

  it("rejects partial match", () => {
    expect(buildRegexDFA("hello").accepts("hell")).toBe(false);
  });

  it("rejects extra chars", () => {
    expect(buildRegexDFA("hi").accepts("hii")).toBe(false);
  });

  it("rejects wrong string", () => {
    expect(buildRegexDFA("abc").accepts("xyz")).toBe(false);
  });

  it("matches empty pattern with empty input", () => {
    expect(buildRegexDFA("").accepts("")).toBe(true);
  });

  it("run traces full path", () => {
    const result = buildRegexDFA("ab").run("ab");
    expect(result.accepted).toBe(true);
    expect(result.path).toEqual(["s0", "s1", "s2"]);
  });
});
