import { describe, it, expect } from "vitest";
import { brailleConvert } from "./braille-tool.js";

describe("braille-tool", () => {
  it("encodes text to Braille", async () => {
    const r = await brailleConvert({ text: "hello" }) as Record<string, unknown>;
    expect(r.direction).toBe("text_to_braille");
    expect(r.output).toBeTruthy();
    const output = r.output as string;
    expect(output.length).toBe(5);
    expect(r.unclick_meta).toBeDefined();
  });

  it("decodes Braille to text", async () => {
    const encoded = await brailleConvert({ text: "abc" }) as Record<string, unknown>;
    const r = await brailleConvert({ text: encoded.output as string }) as Record<string, unknown>;
    expect(r.direction).toBe("braille_to_text");
    expect(r.output).toBe("abc");
  });

  it("handles spaces", async () => {
    const r = await brailleConvert({ text: "hi there" }) as Record<string, unknown>;
    expect((r.output as string)).toContain(" ");
  });

  it("rejects empty input", async () => {
    const r = await brailleConvert({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
