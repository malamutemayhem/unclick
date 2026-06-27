import { describe, it, expect } from "vitest";
import { Stopwords } from "../stopwords.js";

describe("Stopwords", () => {
  it("removes stopwords from array", () => {
    const result = Stopwords.remove(["the", "quick", "brown", "fox"]);
    expect(result).toEqual(["quick", "brown", "fox"]);
  });

  it("removeFromText filters text", () => {
    const result = Stopwords.removeFromText("the quick brown fox is very fast");
    expect(result).not.toContain("the");
    expect(result).toContain("quick");
    expect(result).toContain("fast");
  });

  it("isStopword checks individual words", () => {
    expect(Stopwords.isStopword("the")).toBe(true);
    expect(Stopwords.isStopword("computer")).toBe(false);
  });

  it("list returns sorted stopwords", () => {
    const list = Stopwords.list();
    expect(list.length).toBeGreaterThan(50);
    expect(list[0] < list[1]).toBe(true);
  });

  it("count returns stopword count", () => {
    expect(Stopwords.count()).toBeGreaterThan(50);
  });

  it("filter removes both default and custom stopwords", () => {
    const result = Stopwords.filter(
      ["the", "quick", "brown", "fox", "hello"],
      ["hello", "quick"],
    );
    expect(result).toEqual(["brown", "fox"]);
  });

  it("ratio calculates stopword ratio", () => {
    const ratio = Stopwords.ratio("the quick brown fox is a very fast animal");
    expect(ratio).toBeGreaterThan(0);
    expect(ratio).toBeLessThan(1);
  });

  it("contentWords extracts meaningful words", () => {
    const words = Stopwords.contentWords("the quick brown fox is running fast");
    expect(words).toContain("quick");
    expect(words).toContain("brown");
    expect(words).not.toContain("the");
    expect(words).not.toContain("is");
  });

  it("density counts content word frequencies", () => {
    const density = Stopwords.density("the cat sat on the mat the cat");
    expect(density.get("cat")).toBe(2);
    expect(density.get("sat")).toBe(1);
    expect(density.has("the")).toBe(false);
  });

  it("handles empty text", () => {
    expect(Stopwords.ratio("")).toBe(0);
    expect(Stopwords.contentWords("")).toEqual([]);
  });
});
