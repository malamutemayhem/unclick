import { describe, it, expect } from "vitest";
import { MarkovChain, trainText, trainCharacters } from "../markov-chain.js";

describe("MarkovChain", () => {
  it("trains and generates from sequence", () => {
    const mc = new MarkovChain<string>(1);
    mc.train(["a", "b", "c", "a", "b", "c"]);
    const result = mc.generate(["a"], 5);
    expect(result[0]).toBe("a");
    expect(result.length).toBeGreaterThan(1);
  });

  it("returns probabilities", () => {
    const mc = new MarkovChain<string>(1);
    mc.train(["a", "b", "a", "c", "a", "b"]);
    const probs = mc.probabilities(["a"]);
    expect(probs.has("b")).toBe(true);
    expect(probs.has("c")).toBe(true);
    const total = Array.from(probs.values()).reduce((s, v) => s + v, 0);
    expect(total).toBeCloseTo(1);
  });

  it("returns undefined for unknown state", () => {
    const mc = new MarkovChain<string>(1);
    mc.train(["a", "b"]);
    expect(mc.next(["z"])).toBeUndefined();
  });

  it("tracks state count", () => {
    const mc = new MarkovChain<string>(1);
    mc.train(["a", "b", "c", "a"]);
    expect(mc.stateCount()).toBe(3);
  });

  it("hasState works", () => {
    const mc = new MarkovChain<string>(1);
    mc.train(["x", "y", "z"]);
    expect(mc.hasState(["x"])).toBe(true);
    expect(mc.hasState(["w"])).toBe(false);
  });

  it("works with order 2", () => {
    const mc = new MarkovChain<string>(2);
    mc.train(["a", "b", "c", "a", "b", "d"]);
    const probs = mc.probabilities(["a", "b"]);
    expect(probs.has("c")).toBe(true);
    expect(probs.has("d")).toBe(true);
  });

  it("works with number sequences", () => {
    const mc = new MarkovChain<number>(1);
    mc.train([1, 2, 3, 1, 2, 4]);
    const probs = mc.probabilities([2]);
    expect(probs.has(3)).toBe(true);
    expect(probs.has(4)).toBe(true);
  });

  it("stops when no transition found", () => {
    const mc = new MarkovChain<string>(1);
    mc.train(["a", "b"]);
    const result = mc.generate(["a"], 100);
    expect(result).toEqual(["a", "b"]);
  });
});

describe("trainText", () => {
  it("builds chain from text", () => {
    const mc = trainText("the cat sat on the mat the cat", 1);
    expect(mc.stateCount()).toBeGreaterThan(0);
    expect(mc.hasState(["the"])).toBe(true);
  });

  it("generates text sequence", () => {
    const mc = trainText("one two three one two four", 1);
    const result = mc.generate(["one"], 3);
    expect(result[0]).toBe("one");
    expect(result[1]).toBe("two");
  });
});

describe("trainCharacters", () => {
  it("builds character-level chain", () => {
    const mc = trainCharacters("abcabc", 1);
    expect(mc.hasState(["a"])).toBe(true);
    const probs = mc.probabilities(["a"]);
    expect(probs.get("b")).toBeCloseTo(1);
  });
});
