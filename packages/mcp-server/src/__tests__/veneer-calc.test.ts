import { describe, it, expect } from "vitest";
import {
  sheetAreaM2, sheetsNeeded, pressurePsi, openTimeMins, cureTimeHours,
  grainMatchSheets, edgeBandingLengthM, flatteningTimeHours,
  qualityGrade, costMultiplier, veneerMatches,
} from "../veneer-calc.js";

describe("sheetAreaM2", () => {
  it("calculates area correctly", () => {
    expect(sheetAreaM2(100, 100)).toBe(1);
  });
  it("larger sheet = more area", () => {
    expect(sheetAreaM2(200, 100)).toBeGreaterThan(sheetAreaM2(100, 100));
  });
});

describe("sheetsNeeded", () => {
  it("more coverage = more sheets", () => {
    expect(sheetsNeeded(5, 0.5, 1.2)).toBeGreaterThan(sheetsNeeded(2, 0.5, 1.2));
  });
  it("zero sheet area returns zero", () => {
    expect(sheetsNeeded(5, 0, 1.2)).toBe(0);
  });
});

describe("pressurePsi", () => {
  it("mechanical press highest pressure", () => {
    expect(pressurePsi("mechanical")).toBeGreaterThan(pressurePsi("vacuum"));
  });
});

describe("openTimeMins", () => {
  it("epoxy longest open time", () => {
    expect(openTimeMins("epoxy")).toBeGreaterThan(openTimeMins("pva"));
  });
  it("contact has zero open time", () => {
    expect(openTimeMins("contact")).toBe(0);
  });
});

describe("cureTimeHours", () => {
  it("epoxy longest cure", () => {
    expect(cureTimeHours("epoxy")).toBeGreaterThan(cureTimeHours("pva"));
  });
});

describe("grainMatchSheets", () => {
  it("radial needs 4 sheets", () => {
    expect(grainMatchSheets("radial")).toBe(4);
  });
  it("book needs 2 sheets", () => {
    expect(grainMatchSheets("book")).toBe(2);
  });
});

describe("edgeBandingLengthM", () => {
  it("includes 10% waste", () => {
    expect(edgeBandingLengthM(100)).toBeCloseTo(1.1, 1);
  });
});

describe("flatteningTimeHours", () => {
  it("more sheets = more time", () => {
    expect(flatteningTimeHours(10)).toBeGreaterThan(flatteningTimeHours(5));
  });
});

describe("qualityGrade", () => {
  it("diamond highest quality", () => {
    expect(qualityGrade("diamond")).toBeGreaterThan(qualityGrade("random"));
  });
});

describe("costMultiplier", () => {
  it("diamond most expensive", () => {
    expect(costMultiplier("diamond")).toBeGreaterThan(costMultiplier("random"));
  });
});

describe("veneerMatches", () => {
  it("returns 5 matches", () => {
    expect(veneerMatches()).toHaveLength(5);
  });
});
