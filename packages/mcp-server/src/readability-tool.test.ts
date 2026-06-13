import { describe, it, expect } from "vitest";
import { readabilityScore } from "./readability-tool.js";

describe("readability-tool", () => {
  it("scores simple text as easy", async () => {
    const r = await readabilityScore({ text: "The cat sat. The dog ran." }) as Record<string, unknown>;
    expect(r.flesch_kincaid_grade).toBeLessThan(5);
    expect(r.reading_level).toBe("elementary");
    expect(r.sentences).toBe(2);
    expect(r.unclick_meta).toBeDefined();
  });

  it("scores complex text as harder", async () => {
    const r = await readabilityScore({
      text: "Notwithstanding the aforementioned considerations, the implementation of sophisticated algorithmic procedures necessitates comprehensive evaluation.",
    }) as Record<string, unknown>;
    expect((r.flesch_kincaid_grade as number)).toBeGreaterThan(10);
  });

  it("returns word and sentence counts", async () => {
    const r = await readabilityScore({ text: "Hello world. Goodbye world." }) as Record<string, unknown>;
    expect(r.words).toBe(4);
    expect(r.sentences).toBe(2);
  });

  it("rejects empty input", async () => {
    const r = await readabilityScore({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
