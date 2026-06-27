import { describe, it, expect } from "vitest";
import { analyzeSentiment, compareSentiment, averageSentiment } from "../sentiment-analyzer.js";

describe("analyzeSentiment", () => {
  it("detects positive sentiment", () => {
    const r = analyzeSentiment("This is a great and amazing product");
    expect(r.label).toBe("positive");
    expect(r.score).toBeGreaterThan(0);
    expect(r.positive).toBeGreaterThan(0);
  });

  it("detects negative sentiment", () => {
    const r = analyzeSentiment("This is terrible and awful");
    expect(r.label).toBe("negative");
    expect(r.score).toBeLessThan(0);
    expect(r.negative).toBeGreaterThan(0);
  });

  it("detects neutral sentiment", () => {
    const r = analyzeSentiment("The table is made of wood");
    expect(r.label).toBe("neutral");
  });

  it("handles negation", () => {
    const r = analyzeSentiment("This is not good");
    expect(r.words.some((w) => w.score < 0)).toBe(true);
  });

  it("handles intensifiers", () => {
    const normal = analyzeSentiment("good");
    const intensified = analyzeSentiment("very good");
    expect(intensified.positive).toBeGreaterThan(normal.positive);
  });

  it("returns word scores", () => {
    const r = analyzeSentiment("great terrible");
    expect(r.words.length).toBe(2);
  });
});

describe("compareSentiment", () => {
  it("compares multiple texts", () => {
    const results = compareSentiment(["great day", "terrible day"]);
    expect(results.length).toBe(2);
    expect(results[0].result.label).toBe("positive");
    expect(results[1].result.label).toBe("negative");
  });
});

describe("averageSentiment", () => {
  it("averages sentiment scores", () => {
    const avg = averageSentiment(["great amazing", "terrible awful"]);
    expect(Math.abs(avg)).toBeLessThan(0.5);
  });

  it("returns 0 for empty array", () => {
    expect(averageSentiment([])).toBe(0);
  });
});
