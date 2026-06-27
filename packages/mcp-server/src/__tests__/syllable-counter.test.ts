import { describe, it, expect } from "vitest";
import { SyllableCounter } from "../syllable-counter.js";

describe("SyllableCounter", () => {
  it("counts single syllable words", () => {
    expect(SyllableCounter.count("cat")).toBe(1);
    expect(SyllableCounter.count("dog")).toBe(1);
    expect(SyllableCounter.count("the")).toBe(1);
  });

  it("counts multi-syllable words", () => {
    expect(SyllableCounter.count("water")).toBe(2);
    expect(SyllableCounter.count("beautiful")).toBe(3);
  });

  it("handles empty and short words", () => {
    expect(SyllableCounter.count("")).toBe(0);
    expect(SyllableCounter.count("a")).toBe(1);
    expect(SyllableCounter.count("an")).toBe(1);
  });

  it("counts syllables in a sentence", () => {
    const count = SyllableCounter.countInSentence("the cat sat");
    expect(count).toBeGreaterThanOrEqual(3);
  });

  it("extracts words", () => {
    const words = SyllableCounter.words("Hello world 123");
    expect(words).toContain("Hello");
    expect(words).toContain("world");
  });

  it("counts sentences", () => {
    expect(SyllableCounter.sentenceCount("Hello. World!")).toBe(2);
    expect(SyllableCounter.sentenceCount("One sentence")).toBe(1);
    expect(SyllableCounter.sentenceCount("")).toBe(0);
  });

  it("counts words", () => {
    expect(SyllableCounter.wordCount("one two three")).toBe(3);
    expect(SyllableCounter.wordCount("")).toBe(0);
  });

  it("calculates average syllables per word", () => {
    const avg = SyllableCounter.averageSyllablesPerWord("cat dog");
    expect(avg).toBeCloseTo(1, 0);
    expect(SyllableCounter.averageSyllablesPerWord("")).toBe(0);
  });

  it("counts polysyllable words", () => {
    const count = SyllableCounter.polysyllableCount("beautiful extraordinary cat");
    expect(count).toBeGreaterThanOrEqual(1);
  });

  it("counts monosyllable words", () => {
    const count = SyllableCounter.monosyllableCount("the cat sat on the mat");
    expect(count).toBeGreaterThanOrEqual(4);
  });

  it("handles silent e", () => {
    const makeCount = SyllableCounter.count("make");
    expect(makeCount).toBe(1);
  });
});
