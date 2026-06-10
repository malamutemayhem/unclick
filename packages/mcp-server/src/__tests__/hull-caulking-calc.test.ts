import { describe, it, expect } from "vitest";
import {
  waterproofRating, flexibilityRating, applicationDifficulty,
  durabilityYears, repairability, traditional,
  heatRequired, bestHullType, costPerMeter, hullCaulkings,
} from "../hull-caulking-calc.js";

describe("waterproofRating", () => {
  it("epoxy fill is most waterproof", () => {
    expect(waterproofRating("epoxy_fill")).toBeGreaterThan(
      waterproofRating("cotton")
    );
  });
});

describe("flexibilityRating", () => {
  it("marine sealant is most flexible", () => {
    expect(flexibilityRating("marine_sealant")).toBeGreaterThan(
      flexibilityRating("epoxy_fill")
    );
  });
});

describe("applicationDifficulty", () => {
  it("oakum is hardest to apply", () => {
    expect(applicationDifficulty("oakum")).toBeGreaterThan(
      applicationDifficulty("marine_sealant")
    );
  });
});

describe("durabilityYears", () => {
  it("epoxy fill lasts longest", () => {
    expect(durabilityYears("epoxy_fill")).toBeGreaterThan(
      durabilityYears("cotton")
    );
  });
});

describe("repairability", () => {
  it("cotton is easiest to repair", () => {
    expect(repairability("cotton")).toBeGreaterThan(
      repairability("epoxy_fill")
    );
  });
});

describe("traditional", () => {
  it("oakum is traditional", () => {
    expect(traditional("oakum")).toBe(true);
  });
  it("epoxy fill is not", () => {
    expect(traditional("epoxy_fill")).toBe(false);
  });
});

describe("heatRequired", () => {
  it("pitch tar requires heat", () => {
    expect(heatRequired("pitch_tar")).toBe(true);
  });
  it("oakum does not", () => {
    expect(heatRequired("oakum")).toBe(false);
  });
});

describe("bestHullType", () => {
  it("oakum best for plank on frame", () => {
    expect(bestHullType("oakum")).toBe("plank_on_frame");
  });
});

describe("costPerMeter", () => {
  it("epoxy fill costs most", () => {
    expect(costPerMeter("epoxy_fill")).toBeGreaterThan(
      costPerMeter("cotton")
    );
  });
});

describe("hullCaulkings", () => {
  it("returns 5 types", () => {
    expect(hullCaulkings()).toHaveLength(5);
  });
});
