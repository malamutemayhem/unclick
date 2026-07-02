import { describe, it, expect } from "vitest";
import { phoneticSpell } from "./phonetic-tool.js";

describe("phonetic-tool", () => {
  it("spells with NATO alphabet by default", async () => {
    const r = await phoneticSpell({ text: "SOS" }) as Record<string, unknown>;
    expect(r.phonetic_string).toBe("Sierra Oscar Sierra");
    expect(r.format).toBe("nato");
    expect(r.unclick_meta).toBeDefined();
  });

  it("spells with IPA format", async () => {
    const r = await phoneticSpell({ text: "AB", format: "ipa" }) as Record<string, unknown>;
    const spelled = r.spelled as Array<{ char: string; phonetic: string }>;
    expect(spelled[0].phonetic).toContain("eɪ");
    expect(spelled[1].phonetic).toContain("biː");
  });

  it("handles digits in NATO", async () => {
    const r = await phoneticSpell({ text: "A1" }) as Record<string, unknown>;
    expect(r.phonetic_string).toBe("Alpha One");
  });

  it("rejects empty input", async () => {
    const r = await phoneticSpell({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
