import { describe, it, expect } from "vitest";
import {
  charToDots, dotsToUnicode, charToBraille, textToBraille,
  brailleToText, dotPattern, countDots, brailleLength,
  isGrade1, cellDimensions, lineLength, pageCapacity,
} from "../braille-encode.js";

describe("charToDots", () => {
  it("a = dot 1", () => {
    expect(charToDots("a")).toEqual([1]);
  });

  it("b = dots 1,2", () => {
    expect(charToDots("b")).toEqual([1, 2]);
  });

  it("unknown returns empty", () => {
    expect(charToDots("!")).toEqual([]);
  });
});

describe("dotsToUnicode", () => {
  it("dots 1 = braille A", () => {
    const u = dotsToUnicode([1]);
    expect(u.codePointAt(0)).toBe(0x2801);
  });
});

describe("charToBraille", () => {
  it("space returns blank cell", () => {
    expect(charToBraille(" ").codePointAt(0)).toBe(0x2800);
  });

  it("a returns braille a", () => {
    expect(charToBraille("a")).toBeTruthy();
  });
});

describe("textToBraille", () => {
  it("converts simple text", () => {
    const b = textToBraille("abc");
    expect([...b].length).toBe(3);
  });

  it("adds capital indicator", () => {
    const b = textToBraille("A");
    expect([...b].length).toBe(2);
  });

  it("adds number indicator", () => {
    const b = textToBraille("1");
    expect([...b].length).toBe(2);
  });
});

describe("brailleToText", () => {
  it("round trips lowercase", () => {
    const braille = textToBraille("hello");
    expect(brailleToText(braille)).toBe("hello");
  });

  it("round trips uppercase", () => {
    const braille = textToBraille("Hello");
    expect(brailleToText(braille)).toBe("Hello");
  });

  it("round trips numbers", () => {
    const braille = textToBraille("42");
    expect(brailleToText(braille)).toBe("42");
  });
});

describe("dotPattern", () => {
  it("a = 1", () => {
    expect(dotPattern("a")).toBe("1");
  });
});

describe("countDots", () => {
  it("counts total raised dots", () => {
    expect(countDots("ab")).toBe(3);
  });
});

describe("brailleLength", () => {
  it("includes indicators", () => {
    expect(brailleLength("A1")).toBeGreaterThan(2);
  });
});

describe("isGrade1", () => {
  it("true for simple text", () => {
    expect(isGrade1("hello world")).toBe(true);
  });

  it("false for punctuation", () => {
    expect(isGrade1("hello!")).toBe(false);
  });
});

describe("cellDimensions", () => {
  it("returns positive dimensions", () => {
    const d = cellDimensions();
    expect(d.cellWidthMm).toBeGreaterThan(0);
    expect(d.cellHeightMm).toBeGreaterThan(0);
  });
});

describe("lineLength", () => {
  it("A4 width fits many chars", () => {
    expect(lineLength(210)).toBeGreaterThan(20);
  });
});

describe("pageCapacity", () => {
  it("returns page metrics", () => {
    const p = pageCapacity();
    expect(p.charsPerLine).toBeGreaterThan(0);
    expect(p.linesPerPage).toBeGreaterThan(0);
    expect(p.charsPerPage).toBe(p.charsPerLine * p.linesPerPage);
  });
});
