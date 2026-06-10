import { describe, it, expect } from "vitest";
import {
  strokeComplexity, readability, writingAngleDegrees,
  penPressureVariation, formalityLevel, cursive,
  usesHeadline, historicalPeriod, bestToolType, scriptTypes,
} from "../script-type-calc.js";

describe("strokeComplexity", () => {
  it("blackletter is most complex", () => {
    expect(strokeComplexity("blackletter")).toBeGreaterThan(
      strokeComplexity("uncial")
    );
  });
});

describe("readability", () => {
  it("serif roman is most readable", () => {
    expect(readability("serif_roman")).toBeGreaterThan(
      readability("blackletter")
    );
  });
});

describe("writingAngleDegrees", () => {
  it("copperplate has steepest angle", () => {
    expect(writingAngleDegrees("copperplate")).toBeGreaterThan(
      writingAngleDegrees("serif_roman")
    );
  });
});

describe("penPressureVariation", () => {
  it("copperplate has most pressure variation", () => {
    expect(penPressureVariation("copperplate")).toBeGreaterThan(
      penPressureVariation("uncial")
    );
  });
});

describe("formalityLevel", () => {
  it("copperplate is most formal", () => {
    expect(formalityLevel("copperplate")).toBeGreaterThan(
      formalityLevel("uncial")
    );
  });
});

describe("cursive", () => {
  it("copperplate is cursive", () => {
    expect(cursive("copperplate")).toBe(true);
  });
  it("blackletter is not cursive", () => {
    expect(cursive("blackletter")).toBe(false);
  });
});

describe("usesHeadline", () => {
  it("devanagari uses headline", () => {
    expect(usesHeadline("devanagari")).toBe(true);
  });
  it("serif roman does not", () => {
    expect(usesHeadline("serif_roman")).toBe(false);
  });
});

describe("historicalPeriod", () => {
  it("blackletter is gothic", () => {
    expect(historicalPeriod("blackletter")).toBe("gothic");
  });
});

describe("bestToolType", () => {
  it("copperplate uses pointed nib", () => {
    expect(bestToolType("copperplate")).toBe("pointed_nib");
  });
});

describe("scriptTypes", () => {
  it("returns 5 types", () => {
    expect(scriptTypes()).toHaveLength(5);
  });
});
