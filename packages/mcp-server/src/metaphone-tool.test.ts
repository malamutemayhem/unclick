import { describe, it, expect } from "vitest";
import { metaphoneEncode } from "./metaphone-tool.js";

describe("metaphone-tool", () => {
  it("encodes a word to Metaphone", async () => {
    const r = await metaphoneEncode({ text: "Smith" }) as Record<string, unknown>;
    const codes = r.codes as Array<{ word: string; metaphone: string }>;
    expect(codes[0].metaphone).toBe("SM0");
    expect(r.unclick_meta).toBeDefined();
  });

  it("matches similar-sounding words", async () => {
    const r = await metaphoneEncode({ text: "Smith", compare: "Smyth" }) as Record<string, unknown>;
    expect(r.match).toBe(true);
  });

  it("encodes multiple words", async () => {
    const r = await metaphoneEncode({ text: "phone call" }) as Record<string, unknown>;
    const codes = r.codes as Array<{ word: string; metaphone: string }>;
    expect(codes[0].metaphone).toBe("FN");
    expect(codes.length).toBe(2);
  });

  it("rejects empty input", async () => {
    const r = await metaphoneEncode({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
