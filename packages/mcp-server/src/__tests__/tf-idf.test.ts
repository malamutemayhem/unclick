import { describe, it, expect } from "vitest";
import { TfIdf } from "../tf-idf.js";

describe("TfIdf", () => {
  it("tf calculates term frequency", () => {
    const tfidf = new TfIdf();
    tfidf.addDocument(["cat", "dog", "cat", "bird"]);
    expect(tfidf.tf("cat", 0)).toBe(0.5);
    expect(tfidf.tf("dog", 0)).toBe(0.25);
  });

  it("idf calculates inverse document frequency", () => {
    const tfidf = new TfIdf();
    tfidf.addDocument(["cat", "dog"]);
    tfidf.addDocument(["cat", "bird"]);
    tfidf.addDocument(["fish", "bird"]);
    const catIdf = tfidf.idf("cat");
    const fishIdf = tfidf.idf("fish");
    expect(catIdf).toBeLessThan(fishIdf);
  });

  it("tfidf combines tf and idf", () => {
    const tfidf = new TfIdf();
    tfidf.addDocument(["cat", "cat", "dog"]);
    tfidf.addDocument(["dog", "bird"]);
    const score = tfidf.tfidf("cat", 0);
    expect(score).toBeGreaterThan(0);
  });

  it("topTerms returns highest scoring terms", () => {
    const tfidf = new TfIdf();
    tfidf.addDocument(["machine", "learning", "deep", "learning"]);
    tfidf.addDocument(["web", "development", "web"]);
    const top = tfidf.topTerms(0, 3);
    expect(top.length).toBeLessThanOrEqual(3);
    expect(top[0].tfidf).toBeGreaterThanOrEqual(top[top.length - 1].tfidf);
  });

  it("search finds relevant documents", () => {
    const tfidf = new TfIdf();
    tfidf.addDocumentFromText("machine learning algorithms");
    tfidf.addDocumentFromText("web development frameworks");
    tfidf.addDocumentFromText("machine learning models");
    const results = tfidf.search("machine learning");
    expect(results.length).toBe(2);
    expect(results[0].docIndex === 0 || results[0].docIndex === 2).toBe(true);
  });

  it("similarity measures document similarity", () => {
    const tfidf = new TfIdf();
    tfidf.addDocument(["cat", "dog", "pet"]);
    tfidf.addDocument(["cat", "dog", "animal"]);
    tfidf.addDocument(["car", "truck", "vehicle"]);
    const similar = tfidf.similarity(0, 1);
    const different = tfidf.similarity(0, 2);
    expect(similar).toBeGreaterThan(different);
  });

  it("addDocumentFromText splits text", () => {
    const tfidf = new TfIdf();
    const idx = tfidf.addDocumentFromText("hello world hello");
    expect(tfidf.tf("hello", idx)).toBeCloseTo(2 / 3, 2);
  });

  it("documentCount tracks documents", () => {
    const tfidf = new TfIdf();
    tfidf.addDocument(["a"]);
    tfidf.addDocument(["b"]);
    expect(tfidf.documentCount()).toBe(2);
  });

  it("vocabulary returns all unique terms", () => {
    const tfidf = new TfIdf();
    tfidf.addDocument(["cat", "dog"]);
    tfidf.addDocument(["dog", "bird"]);
    const vocab = tfidf.vocabulary();
    expect(vocab).toContain("cat");
    expect(vocab).toContain("dog");
    expect(vocab).toContain("bird");
    expect(vocab.length).toBe(3);
  });

  it("handles missing term gracefully", () => {
    const tfidf = new TfIdf();
    tfidf.addDocument(["cat"]);
    expect(tfidf.tf("xyz", 0)).toBe(0);
    expect(tfidf.idf("xyz")).toBe(0);
  });
});
