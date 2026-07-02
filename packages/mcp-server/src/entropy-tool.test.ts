import { describe, it, expect } from "vitest";
import { entropyCalculate } from "./entropy-tool.js";

describe("entropy-tool", () => {
  it("calculates entropy for varied text", async () => {
    const r = await entropyCalculate({ text: "abcdefgh" }) as Record<string, unknown>;
    expect(r.entropy).toBe(3);
    expect(r.normalised).toBe(1);
    expect(r.unique_chars).toBe(8);
    expect(r.unclick_meta).toBeDefined();
  });

  it("returns zero entropy for repeated char", async () => {
    const r = await entropyCalculate({ text: "aaaa" }) as Record<string, unknown>;
    expect(r.entropy).toBe(0);
    expect(r.strength).toBe("very_low");
  });

  it("returns strength rating", async () => {
    const r = await entropyCalculate({ text: "The quick brown fox jumps over the lazy dog!" }) as Record<string, unknown>;
    expect(typeof r.strength).toBe("string");
    expect(r.length).toBe(44);
  });

  it("rejects empty input", async () => {
    const r = await entropyCalculate({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
