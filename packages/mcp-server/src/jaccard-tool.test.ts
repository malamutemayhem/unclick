import { describe, it, expect } from "vitest";
import { jaccardSimilarity } from "./jaccard-tool.js";

describe("jaccard-tool", () => {
  it("computes word-level similarity", async () => {
    const r = await jaccardSimilarity({
      text_a: "the cat sat",
      text_b: "the cat ran",
    }) as Record<string, unknown>;
    expect(r.similarity).toBeGreaterThan(0);
    expect(r.similarity).toBeLessThan(1);
    expect(r.intersection_size).toBe(2);
    expect(r.unclick_meta).toBeDefined();
  });

  it("returns 1 for identical texts", async () => {
    const r = await jaccardSimilarity({
      text_a: "hello world",
      text_b: "hello world",
    }) as Record<string, unknown>;
    expect(r.similarity).toBe(1);
  });

  it("supports character mode", async () => {
    const r = await jaccardSimilarity({
      text_a: "abc",
      text_b: "bcd",
      mode: "character",
    }) as Record<string, unknown>;
    expect(r.intersection_size).toBe(2);
    expect(r.union_size).toBe(4);
  });

  it("rejects missing inputs", async () => {
    const r = await jaccardSimilarity({ text_a: "hello" }) as Record<string, unknown>;
    expect(r.error).toMatch(/text_b/i);
  });
});
