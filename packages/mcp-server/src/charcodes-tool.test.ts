import { describe, it, expect } from "vitest";
import { charcodesConvert } from "./charcodes-tool.js";

describe("charcodes-tool", () => {
  it("returns decimal code points by default", async () => {
    const r = await charcodesConvert({ text: "AB" }) as Record<string, unknown>;
    expect(r.codes).toEqual(["65", "66"]);
    expect(r.format).toBe("decimal");
    expect(r.character_count).toBe(2);
    expect(r.unclick_meta).toBeDefined();
  });

  it("returns hex Unicode notation", async () => {
    const r = await charcodesConvert({ text: "A", format: "hex" }) as Record<string, unknown>;
    expect(r.codes).toEqual(["U+0041"]);
  });

  it("returns binary representation", async () => {
    const r = await charcodesConvert({ text: "A", format: "binary" }) as Record<string, unknown>;
    expect(r.codes).toEqual(["1000001"]);
  });

  it("handles emoji (multi-byte)", async () => {
    const r = await charcodesConvert({ text: "\u{1F600}", format: "hex" }) as Record<string, unknown>;
    expect(r.codes).toEqual(["U+1F600"]);
    expect(r.character_count).toBe(1);
  });

  it("rejects empty input", async () => {
    const r = await charcodesConvert({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
