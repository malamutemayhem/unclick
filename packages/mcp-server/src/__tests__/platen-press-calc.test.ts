import { describe, it, expect } from "vitest";
import {
  maxSheetSizeCm, impressionsPerHour, maxPressurePsi, motorized,
  inkDistributionRollers, registrationAccuracyMm, weightKg,
  beginnerFriendly, costEstimate, pressTypes,
} from "../platen-press-calc.js";

describe("maxSheetSizeCm", () => {
  it("flatbed handles largest sheets", () => {
    expect(maxSheetSizeCm("flatbed").w).toBeGreaterThan(
      maxSheetSizeCm("tabletop").w
    );
  });
});

describe("impressionsPerHour", () => {
  it("cylinder is fastest", () => {
    expect(impressionsPerHour("cylinder")).toBeGreaterThan(
      impressionsPerHour("proof")
    );
  });
});

describe("maxPressurePsi", () => {
  it("flatbed has highest pressure", () => {
    expect(maxPressurePsi("flatbed")).toBeGreaterThan(
      maxPressurePsi("tabletop")
    );
  });
});

describe("motorized", () => {
  it("cylinder is motorized", () => {
    expect(motorized("cylinder")).toBe(true);
  });
  it("tabletop is not motorized", () => {
    expect(motorized("tabletop")).toBe(false);
  });
});

describe("inkDistributionRollers", () => {
  it("cylinder has most rollers", () => {
    expect(inkDistributionRollers("cylinder")).toBeGreaterThan(
      inkDistributionRollers("tabletop")
    );
  });
});

describe("registrationAccuracyMm", () => {
  it("cylinder is most accurate", () => {
    expect(registrationAccuracyMm("cylinder")).toBeLessThan(
      registrationAccuracyMm("tabletop")
    );
  });
});

describe("weightKg", () => {
  it("flatbed is heaviest", () => {
    expect(weightKg("flatbed")).toBeGreaterThan(weightKg("tabletop"));
  });
});

describe("beginnerFriendly", () => {
  it("tabletop is beginner friendly", () => {
    expect(beginnerFriendly("tabletop")).toBe(true);
  });
  it("cylinder is not beginner friendly", () => {
    expect(beginnerFriendly("cylinder")).toBe(false);
  });
});

describe("costEstimate", () => {
  it("flatbed is most expensive", () => {
    expect(costEstimate("flatbed")).toBeGreaterThan(
      costEstimate("tabletop")
    );
  });
});

describe("pressTypes", () => {
  it("returns 5 types", () => {
    expect(pressTypes()).toHaveLength(5);
  });
});
