import { describe, it, expect } from "vitest";
import { wordCount } from "./wordcount-tool.js";

describe("wordcount-tool", () => {
  it("counts words and characters", async () => {
    const r = await wordCount({ text: "Hello world. This is a test." }) as Record<string, unknown>;
    expect(r.words).toBe(6);
    expect(r.sentences).toBe(2);
    expect(r.characters).toBeGreaterThan(0);
    expect(r.unclick_meta).toBeDefined();
  });

  it("calculates reading time", async () => {
    const text = Array(200).fill("word").join(" ");
    const r = await wordCount({ text }) as Record<string, unknown>;
    expect(r.reading_time_minutes).toBe(1);
  });

  it("rejects missing text", async () => {
    const r = await wordCount({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
