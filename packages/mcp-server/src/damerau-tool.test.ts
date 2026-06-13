import { describe, it, expect } from "vitest";
import { damerauDistance } from "./damerau-tool.js";

describe("damerau-tool", () => {
  it("computes Damerau-Levenshtein distance", async () => {
    const r = await damerauDistance({ text_a: "kitten", text_b: "sitting" }) as Record<string, unknown>;
    expect(r.distance).toBe(3);
    expect(r.unclick_meta).toBeDefined();
  });

  it("counts transposition as one edit", async () => {
    const r = await damerauDistance({ text_a: "ab", text_b: "ba" }) as Record<string, unknown>;
    expect(r.distance).toBe(1);
  });

  it("returns 0 for identical strings", async () => {
    const r = await damerauDistance({ text_a: "hello", text_b: "hello" }) as Record<string, unknown>;
    expect(r.distance).toBe(0);
    expect(r.similarity).toBe(1);
  });

  it("rejects missing inputs", async () => {
    const r = await damerauDistance({ text_a: "test" }) as Record<string, unknown>;
    expect(r.error).toMatch(/text_b/i);
  });
});
