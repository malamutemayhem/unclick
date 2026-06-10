import { describe, it, expect } from "vitest";
import {
  areaExtent, flowSpeed, erosionPower, calvingActivity,
  climateRecord, accessibleForResearch, seaLevelContribution, landformCreated,
  famousExample, glacierTypes,
} from "../glacier-type-calc.js";

describe("areaExtent", () => {
  it("ice sheet largest area", () => {
    expect(areaExtent("ice_sheet")).toBeGreaterThan(areaExtent("cirque"));
  });
});

describe("flowSpeed", () => {
  it("tidewater fastest flow", () => {
    expect(flowSpeed("tidewater")).toBeGreaterThan(flowSpeed("cirque"));
  });
});

describe("erosionPower", () => {
  it("ice sheet most erosion", () => {
    expect(erosionPower("ice_sheet")).toBeGreaterThan(erosionPower("piedmont"));
  });
});

describe("calvingActivity", () => {
  it("tidewater most calving", () => {
    expect(calvingActivity("tidewater")).toBeGreaterThan(calvingActivity("cirque"));
  });
});

describe("climateRecord", () => {
  it("ice sheet best climate record", () => {
    expect(climateRecord("ice_sheet")).toBeGreaterThan(climateRecord("cirque"));
  });
});

describe("accessibleForResearch", () => {
  it("valley is accessible", () => {
    expect(accessibleForResearch("valley")).toBe(true);
  });
  it("ice sheet is not", () => {
    expect(accessibleForResearch("ice_sheet")).toBe(false);
  });
});

describe("seaLevelContribution", () => {
  it("ice sheet contributes to sea level", () => {
    expect(seaLevelContribution("ice_sheet")).toBe(true);
  });
  it("cirque does not", () => {
    expect(seaLevelContribution("cirque")).toBe(false);
  });
});

describe("landformCreated", () => {
  it("valley creates u shaped valley moraine", () => {
    expect(landformCreated("valley")).toBe("u_shaped_valley_moraine");
  });
});

describe("famousExample", () => {
  it("piedmont is malaspina alaska", () => {
    expect(famousExample("piedmont")).toBe("malaspina_alaska");
  });
});

describe("glacierTypes", () => {
  it("returns 5 types", () => {
    expect(glacierTypes()).toHaveLength(5);
  });
});
