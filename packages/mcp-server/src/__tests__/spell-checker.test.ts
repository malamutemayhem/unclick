import { describe, it, expect } from "vitest";
import { editDistance, damerauLevenshtein, SpellChecker, soundex } from "../spell-checker.js";

describe("editDistance", () => {
  it("identical strings have distance 0", () => {
    expect(editDistance("hello", "hello")).toBe(0);
  });

  it("computes insertions", () => {
    expect(editDistance("cat", "cats")).toBe(1);
  });

  it("computes deletions", () => {
    expect(editDistance("cats", "cat")).toBe(1);
  });

  it("computes substitutions", () => {
    expect(editDistance("cat", "bat")).toBe(1);
  });

  it("computes complex distance", () => {
    expect(editDistance("kitten", "sitting")).toBe(3);
  });
});

describe("damerauLevenshtein", () => {
  it("handles transpositions", () => {
    expect(damerauLevenshtein("ab", "ba")).toBe(1);
  });

  it("same as edit distance for non-transposition cases", () => {
    expect(damerauLevenshtein("cat", "bat")).toBe(1);
  });
});

describe("SpellChecker", () => {
  const words = ["hello", "world", "help", "held", "hero", "herp"];

  it("checks correct words", () => {
    const sc = new SpellChecker(words);
    expect(sc.isCorrect("hello")).toBe(true);
    expect(sc.isCorrect("HELLO")).toBe(true);
    expect(sc.isCorrect("xyz")).toBe(false);
  });

  it("suggests corrections", () => {
    const sc = new SpellChecker(words);
    const suggestions = sc.suggest("helo");
    expect(suggestions).toContain("hello");
  });

  it("adds and removes words", () => {
    const sc = new SpellChecker(words);
    sc.addWord("testing");
    expect(sc.isCorrect("testing")).toBe(true);
    sc.removeWord("testing");
    expect(sc.isCorrect("testing")).toBe(false);
  });

  it("checks text", () => {
    const sc = new SpellChecker(words);
    const results = sc.checkText("hello wrld");
    expect(results[0].correct).toBe(true);
    expect(results[1].correct).toBe(false);
    expect(results[1].suggestions.length).toBeGreaterThan(0);
  });

  it("tracks word count", () => {
    const sc = new SpellChecker(words);
    expect(sc.wordCount).toBe(words.length);
  });
});

describe("soundex", () => {
  it("produces correct codes", () => {
    expect(soundex("Robert")).toBe("R163");
    expect(soundex("Rupert")).toBe("R163");
  });

  it("handles short names", () => {
    expect(soundex("A")).toBe("A000");
  });

  it("returns empty for empty input", () => {
    expect(soundex("")).toBe("");
  });
});
