import { describe, it, expect } from "vitest";
import { KeywordExtractor } from "../keyword-extractor.js";

describe("KeywordExtractor", () => {
  const text = "Machine learning is transforming how we process data. Machine learning models can learn patterns from large datasets. Deep learning is a subset of machine learning.";

  it("extract returns top keywords", () => {
    const keywords = KeywordExtractor.extract(text, 5);
    expect(keywords.length).toBeLessThanOrEqual(5);
    expect(keywords[0].score).toBeGreaterThanOrEqual(keywords[keywords.length - 1].score);
  });

  it("extract includes frequent words", () => {
    const keywords = KeywordExtractor.extract(text, 10);
    const words = keywords.map((k) => k.keyword);
    expect(words).toContain("machine");
    expect(words).toContain("learning");
  });

  it("extract filters stopwords", () => {
    const keywords = KeywordExtractor.extract(text, 20);
    const words = keywords.map((k) => k.keyword);
    expect(words).not.toContain("the");
    expect(words).not.toContain("is");
  });

  it("phrases finds repeated multi-word phrases", () => {
    const phrases = KeywordExtractor.phrases(text, 2, 2);
    const phraseWords = phrases.map((p) => p.keyword);
    expect(phraseWords).toContain("machine learning");
  });

  it("rake extracts keywords using RAKE algorithm", () => {
    const results = KeywordExtractor.rake(text, 5);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].score).toBeGreaterThanOrEqual(results[results.length - 1].score);
  });

  it("rake finds multi-word candidates", () => {
    const results = KeywordExtractor.rake("natural language processing is used in many applications of artificial intelligence", 10);
    expect(results.length).toBeGreaterThan(0);
    const keywords = results.map((r) => r.keyword);
    expect(keywords.some((k) => k.includes("natural") || k.includes("language") || k.includes("processing"))).toBe(true);
  });

  it("cooccurrence finds word neighbors", () => {
    const cooc = KeywordExtractor.cooccurrence(text, 3);
    expect(cooc.size).toBeGreaterThan(0);
    const machineNeighbors = cooc.get("machine") || [];
    expect(machineNeighbors).toContain("learning");
  });

  it("handles short text", () => {
    const keywords = KeywordExtractor.extract("hello world", 5);
    expect(keywords.length).toBeLessThanOrEqual(5);
  });

  it("handles empty text", () => {
    const keywords = KeywordExtractor.extract("", 5);
    expect(keywords).toEqual([]);
  });
});
