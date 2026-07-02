import { describe, it, expect } from "vitest";
import { morseConvert } from "./morse-tool.js";

describe("morse-tool", () => {
  it("encodes text to Morse", async () => {
    const r = await morseConvert({ text: "SOS" }) as Record<string, unknown>;
    expect(r.output).toBe("... --- ...");
    expect(r.direction).toBe("text_to_morse");
    expect(r.unclick_meta).toBeDefined();
  });

  it("decodes Morse to text", async () => {
    const r = await morseConvert({ text: "... --- ..." }) as Record<string, unknown>;
    expect(r.output).toBe("SOS");
    expect(r.direction).toBe("morse_to_text");
  });

  it("handles multi-word encoding", async () => {
    const r = await morseConvert({ text: "HI THERE" }) as Record<string, unknown>;
    expect(r.output).toContain("/");
  });

  it("handles multi-word decoding", async () => {
    const r = await morseConvert({ text: ".... .. / - .... . .-. ." }) as Record<string, unknown>;
    expect(r.output).toBe("HI THERE");
  });

  it("rejects empty input", async () => {
    const r = await morseConvert({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
