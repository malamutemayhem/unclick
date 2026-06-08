import { describe, it, expect } from "vitest";
import {
  tokenize, nGrams, termFrequency, idf, tfidf,
  cosineSimilarity, jaccardSimilarity, levenshtein,
  sentenceTokenize, removeStopwords, ENGLISH_STOPWORDS,
} from "../natural-language.js";

describe("tokenize", () => {
  it("splits into words", () => {
    expect(tokenize("Hello World!")).toEqual(["hello", "world"]);
  });

  it("handles empty string", () => {
    expect(tokenize("")).toEqual([]);
  });
});

describe("nGrams", () => {
  it("generates bigrams", () => {
    const tokens = ["the", "quick", "brown", "fox"];
    const bigrams = nGrams(tokens, 2);
    expect(bigrams).toEqual([["the", "quick"], ["quick", "brown"], ["brown", "fox"]]);
  });
});

describe("termFrequency", () => {
  it("calculates normalized frequencies", () => {
    const tf = termFrequency(["a", "b", "a"]);
    expect(tf.get("a")).toBeCloseTo(2 / 3);
    expect(tf.get("b")).toBeCloseTo(1 / 3);
  });
});

describe("idf / tfidf", () => {
  it("calculates IDF scores", () => {
    const docs = [["the", "cat"], ["the", "dog"], ["a", "bird"]];
    const idfMap = idf(docs);
    expect(idfMap.get("the")).toBeLessThan(idfMap.get("cat")!);
  });

  it("computes TF-IDF", () => {
    const docs = [["cat", "cat", "dog"], ["dog", "bird"]];
    const idfMap = idf(docs);
    const scores = tfidf(docs[0], idfMap);
    expect(scores.get("cat")).toBeGreaterThan(0);
  });
});

describe("cosineSimilarity", () => {
  it("returns 1 for identical vectors", () => {
    const v = new Map([["a", 1], ["b", 2]]);
    expect(cosineSimilarity(v, v)).toBeCloseTo(1);
  });

  it("returns 0 for orthogonal vectors", () => {
    const a = new Map([["a", 1]]);
    const b = new Map([["b", 1]]);
    expect(cosineSimilarity(a, b)).toBe(0);
  });
});

describe("jaccardSimilarity", () => {
  it("returns 1 for identical sets", () => {
    const s = new Set(["a", "b"]);
    expect(jaccardSimilarity(s, s)).toBe(1);
  });

  it("returns 0 for disjoint sets", () => {
    expect(jaccardSimilarity(new Set(["a"]), new Set(["b"]))).toBe(0);
  });
});

describe("levenshtein", () => {
  it("returns 0 for identical strings", () => {
    expect(levenshtein("hello", "hello")).toBe(0);
  });

  it("calculates edit distance", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
  });
});

describe("sentenceTokenize", () => {
  it("splits sentences", () => {
    const result = sentenceTokenize("Hello world. How are you? Fine!");
    expect(result).toHaveLength(3);
  });
});

describe("removeStopwords", () => {
  it("removes common words", () => {
    const result = removeStopwords(["the", "cat", "is", "big"], ENGLISH_STOPWORDS);
    expect(result).toEqual(["cat", "big"]);
  });
});
