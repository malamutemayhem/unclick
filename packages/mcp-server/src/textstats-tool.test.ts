import { describe, it, expect } from "vitest";
import { textReadability } from "./textstats-tool.js";

describe("textstats-tool", () => {
  it("analyzes simple text", async () => {
    const r = await textReadability({ text: "The cat sat on the mat. It was a good day." }) as Record<string, unknown>;
    expect(r.word_count).toBe(11);
    expect(r.sentence_count).toBe(2);
    expect(r.flesch_reading_ease).toBeGreaterThan(50);
    expect(r.reading_level).toBeDefined();
    expect(r.unclick_meta).toBeDefined();
  });

  it("handles complex text", async () => {
    const text = "Notwithstanding the aforementioned complications, the implementation proceeded satisfactorily.";
    const r = await textReadability({ text }) as Record<string, unknown>;
    expect(r.avg_syllables_per_word).toBeGreaterThan(2);
  });

  it("provides grade level", async () => {
    const r = await textReadability({ text: "I like dogs. Dogs are fun. Fun is good." }) as Record<string, unknown>;
    expect(r.flesch_kincaid_grade).toBeDefined();
  });

  it("rejects empty input", async () => {
    const r = await textReadability({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
