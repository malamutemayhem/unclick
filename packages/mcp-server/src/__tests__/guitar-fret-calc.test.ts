import { describe, it, expect } from "vitest";
import {
  scaleLengthMm, fretPositionMm, fretSpacingMm, fretWireWidthMm,
  fretWireHeightMm, nutWidthMm, stringSpacingMm, actionMm,
  compensationMm, totalFrets, scaleLengths,
} from "../guitar-fret-calc.js";

describe("scaleLengthMm", () => {
  it("bass is longest", () => {
    expect(scaleLengthMm("bass")).toBeGreaterThan(scaleLengthMm("short"));
  });
});

describe("fretPositionMm", () => {
  it("12th fret is half scale length", () => {
    expect(fretPositionMm(648, 12)).toBeCloseTo(324, 0);
  });
  it("higher frets = farther from nut", () => {
    expect(fretPositionMm(648, 5)).toBeGreaterThan(fretPositionMm(648, 3));
  });
});

describe("fretSpacingMm", () => {
  it("first fret has widest spacing", () => {
    expect(fretSpacingMm(648, 1)).toBeGreaterThan(fretSpacingMm(648, 12));
  });
});

describe("fretWireWidthMm", () => {
  it("jumbo is widest", () => {
    expect(fretWireWidthMm("jumbo")).toBeGreaterThan(fretWireWidthMm("vintage"));
  });
});

describe("fretWireHeightMm", () => {
  it("jumbo is tallest", () => {
    expect(fretWireHeightMm("jumbo")).toBeGreaterThan(fretWireHeightMm("vintage"));
  });
});

describe("nutWidthMm", () => {
  it("more strings = wider nut", () => {
    expect(nutWidthMm(6)).toBeLessThan(nutWidthMm(12));
  });
});

describe("stringSpacingMm", () => {
  it("positive spacing", () => {
    expect(stringSpacingMm(43, 6)).toBeGreaterThan(0);
  });
  it("single string returns zero", () => {
    expect(stringSpacingMm(43, 1)).toBe(0);
  });
});

describe("actionMm", () => {
  it("high action is tallest", () => {
    expect(actionMm("high")).toBeGreaterThan(actionMm("low"));
  });
});

describe("compensationMm", () => {
  it("thicker gauge = more compensation", () => {
    expect(compensationMm(46)).toBeGreaterThan(compensationMm(10));
  });
});

describe("totalFrets", () => {
  it("long scale has 24 frets", () => {
    expect(totalFrets("long")).toBe(24);
  });
});

describe("scaleLengths", () => {
  it("returns 5 types", () => {
    expect(scaleLengths()).toHaveLength(5);
  });
});
