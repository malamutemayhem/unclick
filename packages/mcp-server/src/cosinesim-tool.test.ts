import { describe, it, expect } from "vitest";
import { cosinesimCompare } from "./cosinesim-tool.js";

describe("cosinesim-tool", () => {
  it("returns 1 for identical texts", async () => {
    const r = await cosinesimCompare({
      text_a: "the cat sat",
      text_b: "the cat sat",
    }) as Record<string, unknown>;
    expect(r.similarity).toBe(1);
    expect(r.unclick_meta).toBeDefined();
  });

  it("returns 0 for completely different texts", async () => {
    const r = await cosinesimCompare({
      text_a: "apple banana",
      text_b: "car door",
    }) as Record<string, unknown>;
    expect(r.similarity).toBe(0);
  });

  it("computes partial similarity", async () => {
    const r = await cosinesimCompare({
      text_a: "the cat sat on the mat",
      text_b: "the cat ran on the rug",
    }) as Record<string, unknown>;
    expect(r.similarity).toBeGreaterThan(0);
    expect(r.similarity).toBeLessThan(1);
  });

  it("rejects missing inputs", async () => {
    const r = await cosinesimCompare({ text_a: "hello" }) as Record<string, unknown>;
    expect(r.error).toMatch(/text_b/i);
  });
});
