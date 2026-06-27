import { describe, it, expect } from "vitest";
import { PixelFont } from "../pixel-font.js";

describe("PixelFont", () => {
  it("renders single character", () => {
    const result = PixelFont.render("A");
    const lines = result.split("\n");
    expect(lines).toHaveLength(5);
    expect(lines[0]).toHaveLength(3);
  });

  it("renders multiple characters with spacing", () => {
    const result = PixelFont.render("HI");
    const lines = result.split("\n");
    expect(lines).toHaveLength(5);
    expect(lines[0].length).toBe(7);
  });

  it("uses custom fill and empty characters", () => {
    const result = PixelFont.render("I", "*", ".");
    expect(result).toContain("*");
    expect(result).toContain(".");
  });

  it("handles lowercase by converting to upper", () => {
    const upper = PixelFont.render("A");
    const lower = PixelFont.render("a");
    expect(upper).toBe(lower);
  });

  it("gets glyph for character", () => {
    const glyph = PixelFont.getGlyph("A");
    expect(glyph).not.toBeNull();
    expect(glyph).toHaveLength(5);
  });

  it("returns null for unknown glyph", () => {
    expect(PixelFont.getGlyph("@")).toBeNull();
  });

  it("lists available characters", () => {
    const chars = PixelFont.availableChars();
    expect(chars).toContain("A");
    expect(chars).toContain("0");
    expect(chars).toContain(" ");
  });

  it("reports glyph dimensions", () => {
    expect(PixelFont.glyphWidth()).toBe(3);
    expect(PixelFont.glyphHeight()).toBe(5);
  });

  it("calculates text width", () => {
    expect(PixelFont.textWidth("HI")).toBe(7);
    expect(PixelFont.textWidth("A")).toBe(3);
  });

  it("converts text to bitmap", () => {
    const bitmap = PixelFont.toBitmap("I");
    expect(bitmap).toHaveLength(5);
    expect(bitmap[0]).toHaveLength(3);
    expect(bitmap[0].some((b) => b)).toBe(true);
  });
});
