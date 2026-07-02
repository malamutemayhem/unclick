import { describe, it, expect } from "vitest";
import { acronymGenerate } from "./acronymgen-tool.js";

describe("acronymgen-tool", () => {
  it("generates acronym skipping small words", async () => {
    const r = await acronymGenerate({ text: "Application Programming Interface" }) as Record<string, unknown>;
    expect(r.acronym).toBe("API");
    expect(r.unclick_meta).toBeDefined();
  });

  it("skips common small words", async () => {
    const r = await acronymGenerate({ text: "Lord of the Rings" }) as Record<string, unknown>;
    expect(r.acronym).toBe("LR");
    expect(r.full_acronym).toBe("LOTR");
  });

  it("includes small words when asked", async () => {
    const r = await acronymGenerate({ text: "Lord of the Rings", include_small_words: true }) as Record<string, unknown>;
    expect(r.acronym).toBe("LOTR");
  });

  it("handles single word", async () => {
    const r = await acronymGenerate({ text: "Hello" }) as Record<string, unknown>;
    expect(r.acronym).toBe("H");
  });

  it("rejects empty input", async () => {
    const r = await acronymGenerate({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
