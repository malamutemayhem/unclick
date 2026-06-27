import { describe, it, expect } from "vitest";
import {
  accuracyMinutes, installDifficulty, latitudeSensitivity,
  readability, decorativeValue, wallMounted,
  humanGnomon, bestLocation, buildCost, sundialTypes,
} from "../sundial-type-calc.js";

describe("accuracyMinutes", () => {
  it("equatorial is most accurate", () => {
    expect(accuracyMinutes("equatorial")).toBeLessThan(
      accuracyMinutes("portable")
    );
  });
});

describe("installDifficulty", () => {
  it("analemmatic is hardest to install", () => {
    expect(installDifficulty("analemmatic")).toBeGreaterThan(
      installDifficulty("portable")
    );
  });
});

describe("latitudeSensitivity", () => {
  it("analemmatic is most latitude sensitive", () => {
    expect(latitudeSensitivity("analemmatic")).toBeGreaterThan(
      latitudeSensitivity("equatorial")
    );
  });
});

describe("readability", () => {
  it("horizontal is most readable", () => {
    expect(readability("horizontal")).toBeGreaterThan(
      readability("portable")
    );
  });
});

describe("decorativeValue", () => {
  it("vertical has most decorative value", () => {
    expect(decorativeValue("vertical")).toBeGreaterThan(
      decorativeValue("portable")
    );
  });
});

describe("wallMounted", () => {
  it("vertical is wall mounted", () => {
    expect(wallMounted("vertical")).toBe(true);
  });
  it("horizontal is not", () => {
    expect(wallMounted("horizontal")).toBe(false);
  });
});

describe("humanGnomon", () => {
  it("analemmatic uses human gnomon", () => {
    expect(humanGnomon("analemmatic")).toBe(true);
  });
  it("horizontal does not", () => {
    expect(humanGnomon("horizontal")).toBe(false);
  });
});

describe("bestLocation", () => {
  it("analemmatic best in public park", () => {
    expect(bestLocation("analemmatic")).toBe("public_park");
  });
});

describe("buildCost", () => {
  it("equatorial costs most", () => {
    expect(buildCost("equatorial")).toBeGreaterThan(
      buildCost("portable")
    );
  });
});

describe("sundialTypes", () => {
  it("returns 5 types", () => {
    expect(sundialTypes()).toHaveLength(5);
  });
});
