import { describe, it, expect } from "vitest";
import {
  sensitivity, speed, trendability, specificity,
  oaCost, onsite, forWear, method,
  bestUse, oilAnalysisTypes,
} from "../oil-analysis-calc.js";

describe("sensitivity", () => {
  it("ferrography most sensitive", () => {
    expect(sensitivity("ferrography_analytical")).toBeGreaterThan(sensitivity("acid_number_tan"));
  });
});

describe("speed", () => {
  it("viscosity kinematic fastest", () => {
    expect(speed("viscosity_kinematic")).toBeGreaterThan(speed("ferrography_analytical"));
  });
});

describe("trendability", () => {
  it("spectrometric best trendability", () => {
    expect(trendability("spectrometric_wear")).toBeGreaterThan(trendability("ferrography_analytical"));
  });
});

describe("specificity", () => {
  it("ferrography highest specificity", () => {
    expect(specificity("ferrography_analytical")).toBeGreaterThan(specificity("viscosity_kinematic"));
  });
});

describe("oaCost", () => {
  it("ferrography most expensive", () => {
    expect(oaCost("ferrography_analytical")).toBeGreaterThan(oaCost("viscosity_kinematic"));
  });
});

describe("onsite", () => {
  it("particle count can be done onsite", () => {
    expect(onsite("particle_count_iso")).toBe(true);
  });
  it("ferrography not onsite", () => {
    expect(onsite("ferrography_analytical")).toBe(false);
  });
});

describe("forWear", () => {
  it("spectrometric for wear detection", () => {
    expect(forWear("spectrometric_wear")).toBe(true);
  });
  it("viscosity not for wear", () => {
    expect(forWear("viscosity_kinematic")).toBe(false);
  });
});

describe("method", () => {
  it("ferrography uses magnetic separation microscopy", () => {
    expect(method("ferrography_analytical")).toBe("magnetic_separation_microscopy");
  });
});

describe("bestUse", () => {
  it("particle count for hydraulic fluid cleanliness", () => {
    expect(bestUse("particle_count_iso")).toBe("hydraulic_fluid_cleanliness_iso");
  });
});

describe("oilAnalysisTypes", () => {
  it("returns 5 types", () => {
    expect(oilAnalysisTypes()).toHaveLength(5);
  });
});
