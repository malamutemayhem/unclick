import { describe, it, expect } from "vitest";
import {
  graduationMm, maxLengthM, sectionsCount, readabilityDistance,
  selfReading, materialPrimary, weightKg, bubbleLevelBuiltIn,
  costEstimate, rodTypes,
} from "../leveling-rod-calc.js";

describe("graduationMm", () => {
  it("barcode has finest graduation", () => {
    expect(graduationMm("barcode")).toBeLessThan(
      graduationMm("philadelphia")
    );
  });
});

describe("maxLengthM", () => {
  it("philadelphia is longest", () => {
    expect(maxLengthM("philadelphia")).toBeGreaterThan(
      maxLengthM("lenker")
    );
  });
});

describe("sectionsCount", () => {
  it("metric e has most sections", () => {
    expect(sectionsCount("metric_e")).toBeGreaterThan(
      sectionsCount("philadelphia")
    );
  });
});

describe("readabilityDistance", () => {
  it("laser target reads furthest", () => {
    expect(readabilityDistance("laser_target")).toBeGreaterThan(
      readabilityDistance("philadelphia")
    );
  });
});

describe("selfReading", () => {
  it("barcode is self reading", () => {
    expect(selfReading("barcode")).toBe(true);
  });
  it("philadelphia is not self reading", () => {
    expect(selfReading("philadelphia")).toBe(false);
  });
});

describe("materialPrimary", () => {
  it("philadelphia is wood", () => {
    expect(materialPrimary("philadelphia")).toBe("wood");
  });
});

describe("weightKg", () => {
  it("philadelphia is heaviest", () => {
    expect(weightKg("philadelphia")).toBeGreaterThan(
      weightKg("laser_target")
    );
  });
});

describe("bubbleLevelBuiltIn", () => {
  it("philadelphia lacks built-in level", () => {
    expect(bubbleLevelBuiltIn("philadelphia")).toBe(false);
  });
  it("lenker has built-in level", () => {
    expect(bubbleLevelBuiltIn("lenker")).toBe(true);
  });
});

describe("costEstimate", () => {
  it("barcode is most expensive", () => {
    expect(costEstimate("barcode")).toBeGreaterThan(
      costEstimate("philadelphia")
    );
  });
});

describe("rodTypes", () => {
  it("returns 5 types", () => {
    expect(rodTypes()).toHaveLength(5);
  });
});
