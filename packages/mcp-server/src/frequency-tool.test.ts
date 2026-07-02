import { describe, it, expect } from "vitest";
import { frequencyAnalyse } from "./frequency-tool.js";

describe("frequency-tool", () => {
  it("counts character frequencies", async () => {
    const r = await frequencyAnalyse({ text: "aabbc" }) as Record<string, unknown>;
    const top = r.top as Record<string, number>;
    expect(top["a"]).toBe(2);
    expect(top["b"]).toBe(2);
    expect(top["c"]).toBe(1);
    expect(r.mode).toBe("character");
    expect(r.unclick_meta).toBeDefined();
  });

  it("counts bigram frequencies", async () => {
    const r = await frequencyAnalyse({ text: "the cat and the dog and the fish", mode: "bigram" }) as Record<string, unknown>;
    const top = r.top as Record<string, number>;
    expect(top["and the"]).toBe(2);
  });

  it("respects top parameter", async () => {
    const r = await frequencyAnalyse({ text: "abcdef", top: 2 }) as Record<string, unknown>;
    const top = r.top as Record<string, number>;
    expect(Object.keys(top).length).toBe(2);
  });

  it("rejects empty input", async () => {
    const r = await frequencyAnalyse({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
