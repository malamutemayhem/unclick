import { describe, it, expect } from "vitest";
import { natoConvert } from "./natoalphabet-tool.js";

describe("natoalphabet-tool", () => {
  it("encodes text to NATO", async () => {
    const r = await natoConvert({ text: "SOS" }) as Record<string, unknown>;
    expect(r.output).toBe("Sierra Oscar Sierra");
    expect(r.direction).toBe("text_to_nato");
    expect(r.unclick_meta).toBeDefined();
  });

  it("decodes NATO to text", async () => {
    const r = await natoConvert({ text: "Alfa Bravo Charlie" }) as Record<string, unknown>;
    expect(r.output).toBe("ABC");
    expect(r.direction).toBe("nato_to_text");
  });

  it("handles numbers", async () => {
    const r = await natoConvert({ text: "A1" }) as Record<string, unknown>;
    expect(r.output).toContain("Alfa");
    expect(r.output).toContain("One");
  });

  it("rejects empty input", async () => {
    const r = await natoConvert({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
