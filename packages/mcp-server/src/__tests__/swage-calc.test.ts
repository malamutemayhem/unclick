import { describe, it, expect } from "vitest";
import {
  cavityDepthMm, cavityWidthMm, blowsRequired, workingTemperatureCelsius,
  swageBlockWeightKg, topSwageHandleLengthCm, springSwageOpeningMm,
  finishQualityRating, materialRemovalPercent, swageShapes,
} from "../swage-calc.js";

describe("cavityDepthMm", () => {
  it("vee is deepest", () => {
    expect(cavityDepthMm(20, "vee")).toBeGreaterThan(cavityDepthMm(20, "hexagonal"));
  });
});

describe("cavityWidthMm", () => {
  it("vee is widest", () => {
    expect(cavityWidthMm(20, "vee")).toBeGreaterThan(cavityWidthMm(20, "square"));
  });
});

describe("blowsRequired", () => {
  it("high carbon needs most blows", () => {
    expect(blowsRequired("high_carbon")).toBeGreaterThan(blowsRequired("mild_steel"));
  });
});

describe("workingTemperatureCelsius", () => {
  it("mild steel is hottest", () => {
    expect(workingTemperatureCelsius("mild_steel")).toBeGreaterThan(
      workingTemperatureCelsius("high_carbon")
    );
  });
});

describe("swageBlockWeightKg", () => {
  it("larger block = heavier", () => {
    expect(swageBlockWeightKg(15)).toBeGreaterThan(swageBlockWeightKg(10));
  });
});

describe("topSwageHandleLengthCm", () => {
  it("30cm longer than block", () => {
    expect(topSwageHandleLengthCm(10)).toBe(40);
  });
});

describe("springSwageOpeningMm", () => {
  it("larger stock = wider opening", () => {
    expect(springSwageOpeningMm(20)).toBeGreaterThan(springSwageOpeningMm(10));
  });
});

describe("finishQualityRating", () => {
  it("round has best finish", () => {
    expect(finishQualityRating("round")).toBeGreaterThan(finishQualityRating("vee"));
  });
});

describe("materialRemovalPercent", () => {
  it("vee removes most material", () => {
    expect(materialRemovalPercent("vee")).toBeGreaterThan(
      materialRemovalPercent("round")
    );
  });
  it("round removes no material", () => {
    expect(materialRemovalPercent("round")).toBe(0);
  });
});

describe("swageShapes", () => {
  it("returns 5 shapes", () => {
    expect(swageShapes()).toHaveLength(5);
  });
});
