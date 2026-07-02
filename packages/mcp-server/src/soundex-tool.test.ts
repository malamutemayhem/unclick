import { describe, it, expect } from "vitest";
import { soundexEncode } from "./soundex-tool.js";

describe("soundex-tool", () => {
  it("encodes a word to Soundex", async () => {
    const r = await soundexEncode({ text: "Robert" }) as Record<string, unknown>;
    const codes = r.codes as Array<{ word: string; soundex: string }>;
    expect(codes[0].soundex).toBe("R163");
    expect(r.unclick_meta).toBeDefined();
  });

  it("encodes multiple words", async () => {
    const r = await soundexEncode({ text: "Smith Smyth" }) as Record<string, unknown>;
    const codes = r.codes as Array<{ word: string; soundex: string }>;
    expect(codes[0].soundex).toBe(codes[1].soundex);
  });

  it("compares two names", async () => {
    const r = await soundexEncode({ text: "Smith", compare: "Smyth" }) as Record<string, unknown>;
    expect(r.match).toBe(true);
  });

  it("detects non-matching names", async () => {
    const r = await soundexEncode({ text: "Smith", compare: "Johnson" }) as Record<string, unknown>;
    expect(r.match).toBe(false);
  });

  it("rejects empty input", async () => {
    const r = await soundexEncode({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
