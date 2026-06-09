import { describe, it, expect } from "vitest";
import { textToMorse, morseToText, isValidMorse, morseToTiming, countDitsAndDahs, getCharMorse, getMorseChar } from "../morse-code.js";

describe("textToMorse", () => {
  it("encodes simple text", () => {
    expect(textToMorse("SOS")).toBe("... --- ...");
  });

  it("handles spaces as word separators", () => {
    expect(textToMorse("HI THERE")).toContain("/");
  });

  it("is case insensitive", () => {
    expect(textToMorse("abc")).toBe(textToMorse("ABC"));
  });

  it("encodes numbers", () => {
    const morse = textToMorse("123");
    expect(morse).toContain(".----");
  });
});

describe("morseToText", () => {
  it("decodes simple morse", () => {
    expect(morseToText("... --- ...")).toBe("SOS");
  });

  it("handles word separators", () => {
    const text = morseToText(".... .. / - .... . .-. .");
    expect(text).toBe("HI THERE");
  });
});

describe("roundtrip", () => {
  it("encode then decode returns original", () => {
    const original = "HELLO WORLD";
    expect(morseToText(textToMorse(original))).toBe(original);
  });
});

describe("isValidMorse", () => {
  it("validates correct morse", () => {
    expect(isValidMorse("... --- ...")).toBe(true);
  });

  it("rejects invalid morse", () => {
    expect(isValidMorse("...---...")).toBe(false);
  });
});

describe("morseToTiming", () => {
  it("produces timing array", () => {
    const timing = morseToTiming(".", 100);
    expect(timing.length).toBeGreaterThan(0);
    expect(timing[0].signal).toBe(true);
    expect(timing[0].duration).toBe(100);
  });

  it("dashes are 3x unit", () => {
    const timing = morseToTiming("-", 50);
    expect(timing[0].duration).toBe(150);
  });
});

describe("countDitsAndDahs", () => {
  it("counts correctly", () => {
    const result = countDitsAndDahs("... --- ...");
    expect(result.dits).toBe(6);
    expect(result.dahs).toBe(3);
  });
});

describe("getCharMorse / getMorseChar", () => {
  it("looks up character to morse", () => {
    expect(getCharMorse("A")).toBe(".-");
    expect(getCharMorse("1")).toBe(".----");
  });

  it("looks up morse to character", () => {
    expect(getMorseChar(".-")).toBe("A");
  });

  it("returns null for unknown", () => {
    expect(getCharMorse("`")).toBeNull();
    expect(getMorseChar("........")).toBeNull();
  });
});
