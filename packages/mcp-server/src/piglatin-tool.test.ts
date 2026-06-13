import { describe, it, expect } from "vitest";
import { pigLatinConvert } from "./piglatin-tool.js";

describe("piglatin-tool", () => {
  it("converts to Pig Latin", async () => {
    const r = await pigLatinConvert({ text: "hello world" }) as Record<string, unknown>;
    expect(r.output).toBe("ellohay orldway");
    expect(r.direction).toBe("english_to_piglatin");
    expect(r.unclick_meta).toBeDefined();
  });

  it("handles vowel-starting words", async () => {
    const r = await pigLatinConvert({ text: "apple" }) as Record<string, unknown>;
    expect(r.output).toBe("appleyay");
  });

  it("preserves capitalization", async () => {
    const r = await pigLatinConvert({ text: "Hello" }) as Record<string, unknown>;
    expect(r.output).toBe("Ellohay");
  });

  it("decodes Pig Latin", async () => {
    const r = await pigLatinConvert({ text: "ellohay orldway", decode: true }) as Record<string, unknown>;
    expect(r.output).toContain("hello");
    expect(r.direction).toBe("piglatin_to_english");
  });

  it("rejects empty input", async () => {
    const r = await pigLatinConvert({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
