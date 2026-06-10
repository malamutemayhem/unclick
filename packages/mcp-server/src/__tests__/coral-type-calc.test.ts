import { describe, it, expect } from "vitest";
import {
  growthRateCmPerYear, maxColonySizeMeters, stormResistance,
  biodiversitySupport, depthRangeMeters, branching,
  stinging, reefZone, conservationStatus, coralTypes,
} from "../coral-type-calc.js";

describe("growthRateCmPerYear", () => {
  it("staghorn grows fastest", () => {
    expect(growthRateCmPerYear("staghorn")).toBeGreaterThan(
      growthRateCmPerYear("brain")
    );
  });
});

describe("maxColonySizeMeters", () => {
  it("table coral is largest", () => {
    expect(maxColonySizeMeters("table")).toBeGreaterThan(
      maxColonySizeMeters("mushroom")
    );
  });
});

describe("stormResistance", () => {
  it("brain coral is most resistant", () => {
    expect(stormResistance("brain")).toBeGreaterThan(
      stormResistance("staghorn")
    );
  });
});

describe("biodiversitySupport", () => {
  it("staghorn supports most biodiversity", () => {
    expect(biodiversitySupport("staghorn")).toBeGreaterThan(
      biodiversitySupport("fire")
    );
  });
});

describe("depthRangeMeters", () => {
  it("brain coral grows deepest", () => {
    expect(depthRangeMeters("brain")).toBeGreaterThan(
      depthRangeMeters("fire")
    );
  });
});

describe("branching", () => {
  it("staghorn is branching", () => {
    expect(branching("staghorn")).toBe(true);
  });
  it("brain is not branching", () => {
    expect(branching("brain")).toBe(false);
  });
});

describe("stinging", () => {
  it("fire coral stings", () => {
    expect(stinging("fire")).toBe(true);
  });
  it("brain coral does not sting", () => {
    expect(stinging("brain")).toBe(false);
  });
});

describe("reefZone", () => {
  it("staghorn in fore reef", () => {
    expect(reefZone("staghorn")).toBe("fore_reef");
  });
});

describe("conservationStatus", () => {
  it("staghorn is critically endangered", () => {
    expect(conservationStatus("staghorn")).toBe("critically_endangered");
  });
});

describe("coralTypes", () => {
  it("returns 5 types", () => {
    expect(coralTypes()).toHaveLength(5);
  });
});
