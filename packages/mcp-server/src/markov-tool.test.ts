import { describe, it, expect } from "vitest";
import { markovGenerate } from "./markov-tool.js";

describe("markov-tool", () => {
  it("generates word-level output", async () => {
    const corpus = "the cat sat on the mat the cat ran on the rug the cat sat on the floor";
    const r = await markovGenerate({ text: corpus, length: 10 }) as Record<string, unknown>;
    expect(typeof r.output).toBe("string");
    expect((r.output as string).split(/\s+/).length).toBeGreaterThan(1);
    expect(r.mode).toBe("word");
    expect(r.unclick_meta).toBeDefined();
  });

  it("generates character-level output", async () => {
    const corpus = "abcabcabcabcabcabc";
    const r = await markovGenerate({ text: corpus, mode: "character", length: 10, order: 2 }) as Record<string, unknown>;
    expect(typeof r.output).toBe("string");
    expect((r.output as string).length).toBeGreaterThan(1);
  });

  it("rejects empty input", async () => {
    const r = await markovGenerate({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });

  it("rejects text too short", async () => {
    const r = await markovGenerate({ text: "hi", order: 5 }) as Record<string, unknown>;
    expect(r.error).toMatch(/too short/i);
  });
});
