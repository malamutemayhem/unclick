import { describe, it, expect } from "vitest";
import {
  weightKg, maxDepthMeters, lineLengthMeters,
  bottomSampleCapable, castTimeSeconds, crewRequired,
  accuracyRating, speedCompatible, costEstimate, soundingLeadTypes,
} from "../sounding-lead-calc.js";

describe("weightKg", () => {
  it("deep sea lead is heaviest", () => {
    expect(weightKg("deep_sea_lead")).toBeGreaterThan(
      weightKg("hand_lead")
    );
  });
});

describe("maxDepthMeters", () => {
  it("deep sea lead reaches deepest", () => {
    expect(maxDepthMeters("deep_sea_lead")).toBeGreaterThan(
      maxDepthMeters("hand_lead")
    );
  });
});

describe("lineLengthMeters", () => {
  it("deep sea lead has longest line", () => {
    expect(lineLengthMeters("deep_sea_lead")).toBeGreaterThan(
      lineLengthMeters("hand_lead")
    );
  });
});

describe("bottomSampleCapable", () => {
  it("armed lead can sample bottom", () => {
    expect(bottomSampleCapable("armed_lead")).toBe(true);
  });
  it("hand lead cannot", () => {
    expect(bottomSampleCapable("hand_lead")).toBe(false);
  });
});

describe("castTimeSeconds", () => {
  it("deep sea lead takes longest to cast", () => {
    expect(castTimeSeconds("deep_sea_lead")).toBeGreaterThan(
      castTimeSeconds("pole_sounding")
    );
  });
});

describe("crewRequired", () => {
  it("deep sea lead needs most crew", () => {
    expect(crewRequired("deep_sea_lead")).toBeGreaterThan(
      crewRequired("hand_lead")
    );
  });
});

describe("accuracyRating", () => {
  it("pole sounding is most accurate", () => {
    expect(accuracyRating("pole_sounding")).toBeGreaterThan(
      accuracyRating("deep_sea_lead")
    );
  });
});

describe("speedCompatible", () => {
  it("hand lead works at speed", () => {
    expect(speedCompatible("hand_lead")).toBe(true);
  });
  it("deep sea lead does not", () => {
    expect(speedCompatible("deep_sea_lead")).toBe(false);
  });
});

describe("costEstimate", () => {
  it("deep sea lead is most expensive", () => {
    expect(costEstimate("deep_sea_lead")).toBeGreaterThan(
      costEstimate("pole_sounding")
    );
  });
});

describe("soundingLeadTypes", () => {
  it("returns 5 types", () => {
    expect(soundingLeadTypes()).toHaveLength(5);
  });
});
