import { describe, it, expect } from "vitest";
import { renderText, gridToString, gridToAsciiBlock, scaleGrid, invertGrid, countPixels, hasGlyph, listGlyphs } from "../bitmap-font.js";

describe("renderText", () => {
  it("renders single character with correct dimensions", () => {
    const grid = renderText("A");
    expect(grid.width).toBe(3);
    expect(grid.height).toBe(5);
  });

  it("renders multiple characters with spacing", () => {
    const grid = renderText("AB");
    expect(grid.width).toBe(7);
    expect(grid.height).toBe(5);
  });

  it("converts to uppercase", () => {
    const upper = renderText("A");
    const lower = renderText("a");
    expect(gridToString(upper)).toBe(gridToString(lower));
  });

  it("renders space as empty", () => {
    const grid = renderText(" ");
    expect(countPixels(grid)).toBe(0);
  });

  it("skips unknown characters", () => {
    const grid = renderText("A@B");
    expect(grid.height).toBe(5);
  });

  it("renders digits", () => {
    const grid = renderText("123");
    expect(countPixels(grid)).toBeGreaterThan(0);
  });
});

describe("gridToString", () => {
  it("uses custom on/off characters", () => {
    const grid = renderText("I");
    const str = gridToString(grid, "X", "_");
    expect(str).toContain("X");
    expect(str).toContain("_");
    expect(str).not.toContain("#");
  });

  it("has correct number of lines", () => {
    const grid = renderText("A");
    const lines = gridToString(grid).split("\n");
    expect(lines.length).toBe(5);
  });
});

describe("gridToAsciiBlock", () => {
  it("uses block characters", () => {
    const grid = renderText("T");
    const block = gridToAsciiBlock(grid);
    expect(block).toContain("█");
  });
});

describe("scaleGrid", () => {
  it("doubles dimensions", () => {
    const grid = renderText("A");
    const scaled = scaleGrid(grid, 2);
    expect(scaled.width).toBe(6);
    expect(scaled.height).toBe(10);
  });

  it("preserves pixel ratio approximately", () => {
    const grid = renderText("A");
    const orig = countPixels(grid);
    const scaled = scaleGrid(grid, 3);
    expect(countPixels(scaled)).toBe(orig * 9);
  });
});

describe("invertGrid", () => {
  it("inverts all pixels", () => {
    const grid = renderText("A");
    const origOn = countPixels(grid);
    const inverted = invertGrid(grid);
    const invertedOn = countPixels(inverted);
    expect(origOn + invertedOn).toBe(grid.width * grid.height);
  });

  it("double invert returns original", () => {
    const grid = renderText("B");
    const dbl = invertGrid(invertGrid(grid));
    expect(gridToString(dbl)).toBe(gridToString(grid));
  });
});

describe("countPixels", () => {
  it("counts lit pixels", () => {
    const grid = renderText(" ");
    expect(countPixels(grid)).toBe(0);
  });

  it("counts non-zero for letters", () => {
    const grid = renderText("X");
    expect(countPixels(grid)).toBeGreaterThan(0);
  });
});

describe("hasGlyph", () => {
  it("returns true for known chars", () => {
    expect(hasGlyph("A")).toBe(true);
    expect(hasGlyph("0")).toBe(true);
    expect(hasGlyph(".")).toBe(true);
  });

  it("returns false for unknown chars", () => {
    expect(hasGlyph("@")).toBe(false);
    expect(hasGlyph("{")).toBe(false);
  });

  it("is case insensitive", () => {
    expect(hasGlyph("a")).toBe(true);
    expect(hasGlyph("z")).toBe(true);
  });
});

describe("listGlyphs", () => {
  it("returns all available glyphs", () => {
    const glyphs = listGlyphs();
    expect(glyphs.length).toBeGreaterThan(30);
    expect(glyphs).toContain("A");
    expect(glyphs).toContain("0");
    expect(glyphs).toContain(" ");
  });
});
