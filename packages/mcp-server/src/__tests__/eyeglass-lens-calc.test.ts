import { describe, it, expect } from "vitest";
import {
  visionCorrection, adaptationTime, priceRange, aestheticAppeal,
  distortionLevel, multifocal, uvProtection, bestUseCase,
  lensTechnology, eyeglassLenses,
} from "../eyeglass-lens-calc.js";

describe("visionCorrection", () => {
  it("progressive best vision correction", () => {
    expect(visionCorrection("progressive")).toBeGreaterThan(visionCorrection("single_vision"));
  });
});

describe("adaptationTime", () => {
  it("progressive longest adaptation", () => {
    expect(adaptationTime("progressive")).toBeGreaterThan(adaptationTime("single_vision"));
  });
});

describe("priceRange", () => {
  it("progressive most expensive", () => {
    expect(priceRange("progressive")).toBeGreaterThan(priceRange("single_vision"));
  });
});

describe("aestheticAppeal", () => {
  it("progressive better looking than bifocal", () => {
    expect(aestheticAppeal("progressive")).toBeGreaterThan(aestheticAppeal("bifocal"));
  });
});

describe("distortionLevel", () => {
  it("progressive more distortion than single vision", () => {
    expect(distortionLevel("progressive")).toBeGreaterThan(distortionLevel("single_vision"));
  });
});

describe("multifocal", () => {
  it("progressive is multifocal", () => {
    expect(multifocal("progressive")).toBe(true);
  });
  it("single vision is not", () => {
    expect(multifocal("single_vision")).toBe(false);
  });
});

describe("uvProtection", () => {
  it("photochromic has UV protection", () => {
    expect(uvProtection("photochromic")).toBe(true);
  });
  it("single vision does not", () => {
    expect(uvProtection("single_vision")).toBe(false);
  });
});

describe("bestUseCase", () => {
  it("polarized for driving", () => {
    expect(bestUseCase("polarized")).toBe("driving_water_sports");
  });
});

describe("lensTechnology", () => {
  it("progressive uses gradient power zones", () => {
    expect(lensTechnology("progressive")).toBe("gradient_power_zones");
  });
});

describe("eyeglassLenses", () => {
  it("returns 5 lens types", () => {
    expect(eyeglassLenses()).toHaveLength(5);
  });
});
