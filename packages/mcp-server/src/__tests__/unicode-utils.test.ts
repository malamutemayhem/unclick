import { describe, it, expect } from "vitest";
import { UnicodeUtils } from "../unicode-utils.js";

describe("UnicodeUtils", () => {
  it("extracts code points", () => {
    expect(UnicodeUtils.codePoints("AB")).toEqual([65, 66]);
  });

  it("creates string from code points", () => {
    expect(UnicodeUtils.fromCodePoints([65, 66])).toBe("AB");
  });

  it("escapes non-ASCII characters", () => {
    const result = UnicodeUtils.toEscaped("Aé");
    expect(result).toContain("A");
    expect(result).toContain("\\u00e9");
  });

  it("counts character length correctly", () => {
    expect(UnicodeUtils.charLength("Hello")).toBe(5);
  });

  it("detects ASCII strings", () => {
    expect(UnicodeUtils.isAscii("Hello")).toBe(true);
    expect(UnicodeUtils.isAscii("Café")).toBe(false);
  });

  it("categorizes characters", () => {
    expect(UnicodeUtils.category("A")).toBe("letter");
    expect(UnicodeUtils.category("5")).toBe("digit");
    expect(UnicodeUtils.category("!")).toBe("punctuation");
  });

  it("reverses strings", () => {
    expect(UnicodeUtils.reverse("abc")).toBe("cba");
  });

  it("truncates with suffix", () => {
    expect(UnicodeUtils.truncate("Hello World", 8)).toBe("Hello...");
    expect(UnicodeUtils.truncate("Hi", 10)).toBe("Hi");
  });

  it("pads strings", () => {
    expect(UnicodeUtils.pad("hi", 5, " ", "right")).toBe("hi   ");
    expect(UnicodeUtils.pad("hi", 5, " ", "left")).toBe("   hi");
    expect(UnicodeUtils.pad("hi", 6, " ", "center")).toBe("  hi  ");
  });

  it("counts by category", () => {
    const counts = UnicodeUtils.countByCategory("Ab1!");
    expect(counts["letter"]).toBe(2);
    expect(counts["digit"]).toBe(1);
    expect(counts["punctuation"]).toBe(1);
  });
});
