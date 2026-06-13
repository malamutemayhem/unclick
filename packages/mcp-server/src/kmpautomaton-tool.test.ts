import { describe, it, expect } from "vitest";
import { kmpAutomaton } from "./kmpautomaton-tool.js";

describe("kmpAutomaton", () => {
  it("builds automaton for simple pattern 'ab'", async () => {
    const r = (await kmpAutomaton({ pattern: "ab", alphabet: "ab" })) as any;
    expect(r.states).toBe(3);
    expect(r.accept_state).toBe(2);
    // state 0 + 'a' -> 1, state 0 + 'b' -> 0
    expect(r.transitions[0]).toEqual([1, 0]);
    // state 1 + 'a' -> 1, state 1 + 'b' -> 2
    expect(r.transitions[1]).toEqual([1, 2]);
  });

  it("simulates matching correctly", async () => {
    const r = (await kmpAutomaton({ pattern: "aba", alphabet: "ab" })) as any;
    const text = "ababa";
    let state = 0;
    const matches: number[] = [];
    for (let i = 0; i < text.length; i++) {
      const ci = text[i] === "a" ? 0 : 1;
      state = r.transitions[state][ci];
      if (state === r.accept_state) matches.push(i - 2);
    }
    expect(matches).toEqual([0, 2]);
  });

  it("handles single character pattern", async () => {
    const r = (await kmpAutomaton({ pattern: "a", alphabet: "ab" })) as any;
    expect(r.states).toBe(2);
    expect(r.transitions[0]).toEqual([1, 0]);
    // From accept state, 'a' -> accept again, 'b' -> 0
    expect(r.transitions[1]).toEqual([1, 0]);
  });

  it("rejects empty pattern", async () => {
    await expect(kmpAutomaton({ pattern: "" })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = (await kmpAutomaton({ pattern: "abc" })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
