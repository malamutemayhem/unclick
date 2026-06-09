import { describe, it, expect } from "vitest";
import {
  ptToPx, pxToPt, pxToEm, emToPx, ptToMm, mmToPt,
  pxToRem, remToPx, modularScale, SCALES, lineHeight,
  optimalLineLength, paragraphSpacing, baselineGrid,
  letterSpacing, wordSpacing, capHeight, xHeight,
  fluidFontSize, contrastRatio, meetsWCAG, readingTime,
  wordsPerPage, iconSize,
} from "../typography-calc.js";

describe("unit conversions", () => {
  it("pt to px", () => {
    expect(ptToPx(12)).toBeCloseTo(16, 0);
  });

  it("px to pt", () => {
    expect(pxToPt(16)).toBe(12);
  });

  it("px to em", () => {
    expect(pxToEm(24, 16)).toBe(1.5);
  });

  it("em to px", () => {
    expect(emToPx(1.5, 16)).toBe(24);
  });

  it("pt to mm", () => {
    expect(ptToMm(72)).toBeCloseTo(25.4, 0);
  });

  it("mm to pt", () => {
    expect(mmToPt(25.4)).toBeCloseTo(72, 0);
  });

  it("px to rem", () => {
    expect(pxToRem(32, 16)).toBe(2);
  });

  it("rem to px", () => {
    expect(remToPx(2, 16)).toBe(32);
  });
});

describe("modularScale", () => {
  it("generates ascending sizes", () => {
    const scale = modularScale(16, SCALES.perfect_fourth, 4);
    for (let i = 1; i < scale.length; i++) {
      expect(scale[i]).toBeGreaterThan(scale[i - 1]);
    }
  });
});

describe("lineHeight", () => {
  it("default 1.5 ratio", () => {
    expect(lineHeight(16)).toBe(24);
  });
});

describe("optimalLineLength", () => {
  it("between 45 and 75 chars", () => {
    const opt = optimalLineLength(16);
    expect(opt.minCh).toBe(45);
    expect(opt.maxCh).toBe(75);
  });
});

describe("paragraphSpacing", () => {
  it("fraction of line height", () => {
    expect(paragraphSpacing(24)).toBe(18);
  });
});

describe("baselineGrid", () => {
  it("equals line height at 1x", () => {
    expect(baselineGrid(24)).toBe(24);
  });
});

describe("letterSpacing", () => {
  it("positive for positive tracking", () => {
    expect(letterSpacing(16, 50)).toBeGreaterThan(0);
  });
});

describe("wordSpacing", () => {
  it("quarter of em by default", () => {
    expect(wordSpacing(16)).toBe(4);
  });
});

describe("capHeight / xHeight", () => {
  it("cap height > x height", () => {
    expect(capHeight(16)).toBeGreaterThan(xHeight(16));
  });
});

describe("fluidFontSize", () => {
  it("returns clamp expression", () => {
    const css = fluidFontSize(16, 24);
    expect(css).toContain("clamp(");
    expect(css).toContain("vw");
  });
});

describe("contrastRatio", () => {
  it("max ratio for black/white", () => {
    expect(contrastRatio(1, 0)).toBe(21);
  });

  it("1:1 for same color", () => {
    expect(contrastRatio(0.5, 0.5)).toBe(1);
  });
});

describe("meetsWCAG", () => {
  it("AA at 4.5:1", () => {
    expect(meetsWCAG(4.5, "AA")).toBe(true);
  });

  it("fails AAA at 4.5:1", () => {
    expect(meetsWCAG(4.5, "AAA")).toBe(false);
  });

  it("large text AA at 3:1", () => {
    expect(meetsWCAG(3, "AA", true)).toBe(true);
  });
});

describe("readingTime", () => {
  it("1000 words at 200wpm = 5 min", () => {
    expect(readingTime(1000)).toBe(5);
  });
});

describe("wordsPerPage", () => {
  it("A4 page has many words", () => {
    expect(wordsPerPage(12, 14, 210, 297)).toBeGreaterThan(200);
  });
});

describe("iconSize", () => {
  it("scales correctly", () => {
    expect(iconSize(24, "small")).toBe(18);
    expect(iconSize(24, "large")).toBe(36);
  });
});
