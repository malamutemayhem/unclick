import { describe, it, expect } from "vitest";
import { wordfreqAnalyse } from "./wordfreq-tool.js";

describe("wordfreq-tool", () => {
  it("counts word frequencies", async () => {
    const r = await wordfreqAnalyse({ text: "the cat sat on the mat" }) as Record<string, unknown>;
    const freq = r.frequencies as Record<string, number>;
    expect(freq["the"]).toBe(2);
    expect(r.total_words).toBe(6);
    expect(r.unique_words).toBe(5);
    expect(r.top_word).toBe("the");
    expect(r.unclick_meta).toBeDefined();
  });

  it("respects case_sensitive", async () => {
    const r = await wordfreqAnalyse({ text: "Hello hello HELLO", case_sensitive: true }) as Record<string, unknown>;
    const freq = r.frequencies as Record<string, number>;
    expect(freq["Hello"]).toBe(1);
    expect(freq["hello"]).toBe(1);
    expect(freq["HELLO"]).toBe(1);
    expect(r.unique_words).toBe(3);
  });

  it("limits with top parameter", async () => {
    const r = await wordfreqAnalyse({ text: "a b b c c c d d d d", top: 2 }) as Record<string, unknown>;
    const freq = r.frequencies as Record<string, number>;
    expect(Object.keys(freq).length).toBe(2);
    expect(freq["d"]).toBe(4);
  });

  it("rejects empty input", async () => {
    const r = await wordfreqAnalyse({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
