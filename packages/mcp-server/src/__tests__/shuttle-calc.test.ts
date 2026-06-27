import { describe, it, expect } from "vitest";
import {
  shuttleLengthCm, shuttleWidthMm, weightEmptyG, throwSpeedMPerSec,
  picksPerMinute, maxWeavingWidthCm, woodType, lifespanYears,
  costEstimate, shuttleTypes,
} from "../shuttle-calc.js";

describe("shuttleLengthCm", () => {
  it("ski is longest", () => {
    expect(shuttleLengthCm("ski")).toBeGreaterThan(shuttleLengthCm("boat"));
  });
});

describe("shuttleWidthMm", () => {
  it("rag shuttle is widest", () => {
    expect(shuttleWidthMm("rag")).toBeGreaterThan(shuttleWidthMm("stick"));
  });
});

describe("weightEmptyG", () => {
  it("end feed is heaviest", () => {
    expect(weightEmptyG("end_feed")).toBeGreaterThan(weightEmptyG("stick"));
  });
});

describe("throwSpeedMPerSec", () => {
  it("end feed is fastest", () => {
    expect(throwSpeedMPerSec("end_feed")).toBeGreaterThan(throwSpeedMPerSec("stick"));
  });
});

describe("picksPerMinute", () => {
  it("end feed has most picks", () => {
    expect(picksPerMinute("end_feed")).toBeGreaterThan(picksPerMinute("stick"));
  });
});

describe("maxWeavingWidthCm", () => {
  it("stick shuttle handles widest weave", () => {
    expect(maxWeavingWidthCm("stick")).toBeGreaterThan(maxWeavingWidthCm("boat"));
  });
});

describe("woodType", () => {
  it("boat shuttle uses dogwood", () => {
    expect(woodType("boat")).toBe("dogwood");
  });
});

describe("lifespanYears", () => {
  it("boat shuttle lasts longest", () => {
    expect(lifespanYears("boat")).toBeGreaterThan(lifespanYears("stick"));
  });
});

describe("costEstimate", () => {
  it("end feed is most expensive", () => {
    expect(costEstimate("end_feed")).toBeGreaterThan(costEstimate("stick"));
  });
});

describe("shuttleTypes", () => {
  it("returns 5 types", () => {
    expect(shuttleTypes()).toHaveLength(5);
  });
});
