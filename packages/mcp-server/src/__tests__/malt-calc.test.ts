import { describe, it, expect } from "vitest";
import {
  colorSrm, potentialGravityPoints, maxPercentOfGrist, moisturePercent,
  diasticPowerLintner, proteinPercent, crushGapMm, gravityContribution,
  storageLifeMonths, maltTypes,
} from "../malt-calc.js";

describe("colorSrm", () => {
  it("roasted is darkest", () => {
    expect(colorSrm("roasted")).toBeGreaterThan(colorSrm("pale"));
  });
});

describe("potentialGravityPoints", () => {
  it("pilsner has highest ppg", () => {
    expect(potentialGravityPoints("pilsner")).toBeGreaterThan(
      potentialGravityPoints("roasted")
    );
  });
});

describe("maxPercentOfGrist", () => {
  it("roasted limited to 10%", () => {
    expect(maxPercentOfGrist("roasted")).toBe(10);
  });
  it("pale can be 100%", () => {
    expect(maxPercentOfGrist("pale")).toBe(100);
  });
});

describe("moisturePercent", () => {
  it("roasted has least moisture", () => {
    expect(moisturePercent("roasted")).toBeLessThan(moisturePercent("crystal"));
  });
});

describe("diasticPowerLintner", () => {
  it("pilsner has most diastatic power", () => {
    expect(diasticPowerLintner("pilsner")).toBeGreaterThan(diasticPowerLintner("munich"));
  });
  it("crystal has zero", () => {
    expect(diasticPowerLintner("crystal")).toBe(0);
  });
});

describe("proteinPercent", () => {
  it("crystal has most protein", () => {
    expect(proteinPercent("crystal")).toBeGreaterThan(proteinPercent("pilsner"));
  });
});

describe("crushGapMm", () => {
  it("crystal has widest gap", () => {
    expect(crushGapMm("crystal")).toBeGreaterThan(crushGapMm("roasted"));
  });
});

describe("gravityContribution", () => {
  it("more malt = higher gravity", () => {
    expect(gravityContribution(5, 36, 20, 75)).toBeGreaterThan(
      gravityContribution(3, 36, 20, 75)
    );
  });
  it("zero volume returns zero", () => {
    expect(gravityContribution(5, 36, 0, 75)).toBe(0);
  });
});

describe("storageLifeMonths", () => {
  it("roasted stores longest", () => {
    expect(storageLifeMonths("roasted")).toBeGreaterThan(storageLifeMonths("munich"));
  });
});

describe("maltTypes", () => {
  it("returns 5 types", () => {
    expect(maltTypes()).toHaveLength(5);
  });
});
