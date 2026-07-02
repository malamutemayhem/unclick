import { describe, it, expect } from "vitest";
import { loremGenerate } from "./lorem2-tool.js";

describe("lorem2-tool", () => {
  it("generates lorem ipsum text", async () => {
    const r = await loremGenerate({ paragraphs: 2 }) as Record<string, unknown>;
    expect(r.text).toBeDefined();
    expect(r.paragraphs).toBe(2);
    expect(r.word_count).toBeGreaterThan(10);
    expect(r.unclick_meta).toBeDefined();
  });

  it("defaults to 3 paragraphs", async () => {
    const r = await loremGenerate({}) as Record<string, unknown>;
    expect(r.paragraphs).toBe(3);
  });

  it("caps at 20 paragraphs", async () => {
    const r = await loremGenerate({ paragraphs: 50 }) as Record<string, unknown>;
    expect(r.paragraphs).toBe(20);
  });
});
