import { describe, it, expect } from "vitest";
import { MarkovChainText } from "../markov-chain-text.js";

describe("MarkovChainText", () => {
  const corpus = "the cat sat on the mat the cat sat on the floor";

  it("trains and generates text", () => {
    const mc = new MarkovChainText(2);
    mc.train(corpus);
    const text = mc.generate(5);
    expect(text.split(" ").length).toBeGreaterThan(2);
  });

  it("tracks state count", () => {
    const mc = new MarkovChainText(1);
    mc.train("a b c a b d");
    expect(mc.stateCount).toBeGreaterThan(0);
  });

  it("gets transitions for key", () => {
    const mc = new MarkovChainText(1);
    mc.train("a b a c a b");
    const transitions = mc.getTransitions("a");
    expect(transitions).not.toBeUndefined();
    expect(transitions!.has("b")).toBe(true);
    expect(transitions!.has("c")).toBe(true);
  });

  it("calculates probability", () => {
    const mc = new MarkovChainText(1);
    mc.train("a b a b a c");
    expect(mc.probability("a", "b")).toBeCloseTo(2/3);
    expect(mc.probability("a", "c")).toBeCloseTo(1/3);
  });

  it("finds most likely next word", () => {
    const mc = new MarkovChainText(1);
    mc.train("a b a b a c");
    expect(mc.mostLikely("a")).toBe("b");
  });

  it("returns null for unknown key", () => {
    const mc = new MarkovChainText(1);
    mc.train("a b");
    expect(mc.mostLikely("z")).toBeNull();
  });

  it("generates empty for untrained", () => {
    const mc = new MarkovChainText(1);
    expect(mc.generate(10)).toBe("");
  });

  it("higher order captures more context", () => {
    const mc = new MarkovChainText(3);
    mc.train("one two three four one two three five");
    expect(mc.stateCount).toBeGreaterThan(0);
  });
});
