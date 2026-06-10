import { describe, it, expect } from "vitest";
import {
  soleLengthMm, bladeWidthMm, bedAngleDeg, mouthOpeningMm,
  shavingThicknessMm, sharpeningAngleDeg, weightKg, sharpeningIntervalMinutes,
  costEstimate, planeTypes,
} from "../hand-plane-calc.js";

describe("soleLengthMm", () => {
  it("jointer is longest", () => {
    expect(soleLengthMm("jointer")).toBeGreaterThan(soleLengthMm("block"));
  });
});

describe("bladeWidthMm", () => {
  it("jointer has widest blade", () => {
    expect(bladeWidthMm("jointer")).toBeGreaterThan(bladeWidthMm("block"));
  });
});

describe("bedAngleDeg", () => {
  it("block plane has lowest bed angle", () => {
    expect(bedAngleDeg("block")).toBeLessThan(bedAngleDeg("smoothing"));
  });
});

describe("mouthOpeningMm", () => {
  it("scrub has widest mouth", () => {
    expect(mouthOpeningMm("scrub")).toBeGreaterThan(
      mouthOpeningMm("smoothing")
    );
  });
});

describe("shavingThicknessMm", () => {
  it("scrub takes thickest shaving", () => {
    expect(shavingThicknessMm("scrub")).toBeGreaterThan(
      shavingThicknessMm("smoothing")
    );
  });
});

describe("sharpeningAngleDeg", () => {
  it("scrub has steepest angle", () => {
    expect(sharpeningAngleDeg("scrub")).toBeGreaterThan(
      sharpeningAngleDeg("smoothing")
    );
  });
});

describe("weightKg", () => {
  it("jointer is heaviest", () => {
    expect(weightKg("jointer")).toBeGreaterThan(weightKg("block"));
  });
});

describe("sharpeningIntervalMinutes", () => {
  it("block holds edge longest", () => {
    expect(sharpeningIntervalMinutes("block")).toBeGreaterThan(
      sharpeningIntervalMinutes("scrub")
    );
  });
});

describe("costEstimate", () => {
  it("jointer is most expensive", () => {
    expect(costEstimate("jointer")).toBeGreaterThan(costEstimate("scrub"));
  });
});

describe("planeTypes", () => {
  it("returns 5 types", () => {
    expect(planeTypes()).toHaveLength(5);
  });
});
