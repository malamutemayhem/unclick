import { describe, it, expect } from "vitest";
import { huffmanCode } from "./huffman-tool.js";

describe("huffmanCode", () => {
  it("encodes a simple string", async () => {
    const r = await huffmanCode({ text: "aabbc" }) as any;
    expect(r.unique_chars).toBe(3);
    expect(r.text_length).toBe(5);
    expect(Object.keys(r.codes).length).toBe(3);
    expect(r.encoded_bits).toBeGreaterThan(0);
    expect(r.compression_ratio).toBeLessThan(1);
  });

  it("handles single character", async () => {
    const r = await huffmanCode({ text: "aaaa" }) as any;
    expect(r.unique_chars).toBe(1);
    expect(r.codes["a"]).toBe("0");
    expect(r.encoded_bits).toBe(4);
  });

  it("calculates entropy", async () => {
    const r = await huffmanCode({ text: "abababab" }) as any;
    expect(r.entropy).toBeCloseTo(1, 4);
  });

  it("handles spaces", async () => {
    const r = await huffmanCode({ text: "a b" }) as any;
    expect(r.codes["<space>"]).toBeTruthy();
  });

  it("rejects empty text", async () => {
    await expect(huffmanCode({ text: "" })).rejects.toThrow("required");
  });

  it("stamps meta", async () => {
    const r = await huffmanCode({ text: "test" }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
