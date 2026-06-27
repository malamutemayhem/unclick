import { describe, it, expect } from "vitest";
import {
  pointsToMm, mmToPoints, leadingPt, charsPerLine,
  linesPerPage, wordCount, pageCount, kerning,
  sortCaseCompartments, inkCoveragePercent, typeUnits,
} from "../typesetting-calc.js";

describe("pointsToMm", () => {
  it("12pt approx 4.23mm", () => {
    expect(pointsToMm(12)).toBeCloseTo(4.23, 1);
  });
});

describe("mmToPoints", () => {
  it("round trip", () => {
    expect(mmToPoints(pointsToMm(12))).toBeCloseTo(12, 0);
  });
});

describe("leadingPt", () => {
  it("1.2x font size", () => {
    expect(leadingPt(12, 1.2)).toBe(14.4);
  });
});

describe("charsPerLine", () => {
  it("positive chars", () => {
    expect(charsPerLine(150, 2.5)).toBeGreaterThan(0);
  });
  it("zero width = 0", () => {
    expect(charsPerLine(150, 0)).toBe(0);
  });
});

describe("linesPerPage", () => {
  it("positive lines", () => {
    expect(linesPerPage(297, 4, 25)).toBeGreaterThan(0);
  });
  it("zero leading = 0", () => {
    expect(linesPerPage(297, 0, 25)).toBe(0);
  });
});

describe("wordCount", () => {
  it("positive words", () => {
    expect(wordCount(1000, 5)).toBeGreaterThan(0);
  });
});

describe("pageCount", () => {
  it("positive pages", () => {
    expect(pageCount(50000, 300)).toBeGreaterThan(0);
  });
  it("zero wpp = 0", () => {
    expect(pageCount(50000, 0)).toBe(0);
  });
});

describe("kerning", () => {
  it("tight is negative", () => {
    expect(kerning(12, "tight")).toBeLessThan(0);
  });
  it("normal is zero", () => {
    expect(kerning(12, "normal")).toBe(0);
  });
});

describe("sortCaseCompartments", () => {
  it("positive compartments", () => {
    expect(sortCaseCompartments(52, 2)).toBeGreaterThan(0);
  });
});

describe("inkCoveragePercent", () => {
  it("positive percent", () => {
    expect(inkCoveragePercent(20, 10)).toBeGreaterThan(0);
  });
});

describe("typeUnits", () => {
  it("returns 4 units", () => {
    expect(typeUnits()).toHaveLength(4);
  });
});
