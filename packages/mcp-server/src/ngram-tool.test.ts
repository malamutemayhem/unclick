import { describe, it, expect } from "vitest";
import { ngramExtract } from "./ngram-tool.js";

describe("ngram-tool", () => {
  it("extracts word bigrams by default", async () => {
    const r = await ngramExtract({ text: "the cat sat on the mat" }) as Record<string, unknown>;
    const top = r.top as Record<string, number>;
    expect(top["the cat"]).toBe(1);
    expect(r.n).toBe(2);
    expect(r.mode).toBe("word");
    expect(r.unclick_meta).toBeDefined();
  });

  it("extracts character trigrams", async () => {
    const r = await ngramExtract({ text: "abcabc", n: 3, mode: "character" }) as Record<string, unknown>;
    const top = r.top as Record<string, number>;
    expect(top["abc"]).toBe(2);
  });

  it("extracts word trigrams", async () => {
    const r = await ngramExtract({ text: "a b c a b c", n: 3 }) as Record<string, unknown>;
    const top = r.top as Record<string, number>;
    expect(top["a b c"]).toBe(2);
  });

  it("rejects empty input", async () => {
    const r = await ngramExtract({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
