import { describe, it, expect } from "vitest";
import {
  shoulderCoverage, plateCount, weightKg, rivets,
  mobilityPercent, deflectionAngle, paddingThicknessCm,
  strapLength, forgingHeats, armorSteels,
} from "../pauldron-calc.js";

describe("shoulderCoverage", () => {
  it("wider than shoulder", () => {
    expect(shoulderCoverage(40)).toBeGreaterThan(40);
  });
});

describe("plateCount", () => {
  it("full most plates", () => {
    expect(plateCount("full")).toBeGreaterThan(plateCount("rigid"));
  });
});

describe("weightKg", () => {
  it("positive kg", () => {
    expect(weightKg(40, 1.5, "mild")).toBeGreaterThan(0);
  });
});

describe("rivets", () => {
  it("proportional to plates", () => {
    expect(rivets(5, 4)).toBe(16);
  });
});

describe("mobilityPercent", () => {
  it("capped at 95", () => {
    expect(mobilityPercent(20)).toBeLessThanOrEqual(95);
  });
});

describe("deflectionAngle", () => {
  it("positive angle", () => {
    expect(deflectionAngle(1.5, 20)).toBeGreaterThan(0);
  });
  it("zero curvature = 0", () => {
    expect(deflectionAngle(1.5, 0)).toBe(0);
  });
});

describe("paddingThicknessCm", () => {
  it("positive cm", () => {
    expect(paddingThicknessCm(2)).toBeGreaterThan(0);
  });
});

describe("strapLength", () => {
  it("positive cm", () => {
    expect(strapLength(120)).toBeGreaterThan(0);
  });
});

describe("forgingHeats", () => {
  it("case hardened most heats", () => {
    expect(forgingHeats(2, "case_hardened")).toBeGreaterThan(forgingHeats(2, "mild"));
  });
});

describe("armorSteels", () => {
  it("returns 5 steels", () => {
    expect(armorSteels()).toHaveLength(5);
  });
});
