import { describe, it, expect } from "vitest";
import {
  waterDepthCm, biodiversityIndex, carbonSequestration,
  floodControl, waterFiltration, treeCover,
  acidicWater, dominantPlant, restorationCostPerHa, wetlandTypes,
} from "../wetland-type-calc.js";

describe("waterDepthCm", () => {
  it("swamp is deepest", () => {
    expect(waterDepthCm("swamp")).toBeGreaterThan(
      waterDepthCm("fen")
    );
  });
});

describe("biodiversityIndex", () => {
  it("mangrove has highest biodiversity", () => {
    expect(biodiversityIndex("mangrove")).toBeGreaterThan(
      biodiversityIndex("bog")
    );
  });
});

describe("carbonSequestration", () => {
  it("bog sequesters most carbon", () => {
    expect(carbonSequestration("bog")).toBeGreaterThan(
      carbonSequestration("swamp")
    );
  });
});

describe("floodControl", () => {
  it("mangrove provides best flood control", () => {
    expect(floodControl("mangrove")).toBeGreaterThan(
      floodControl("bog")
    );
  });
});

describe("waterFiltration", () => {
  it("marsh filters water best", () => {
    expect(waterFiltration("marsh")).toBeGreaterThan(
      waterFiltration("mangrove")
    );
  });
});

describe("treeCover", () => {
  it("swamp has tree cover", () => {
    expect(treeCover("swamp")).toBe(true);
  });
  it("marsh does not", () => {
    expect(treeCover("marsh")).toBe(false);
  });
});

describe("acidicWater", () => {
  it("bog has acidic water", () => {
    expect(acidicWater("bog")).toBe(true);
  });
  it("fen does not", () => {
    expect(acidicWater("fen")).toBe(false);
  });
});

describe("dominantPlant", () => {
  it("bog dominated by sphagnum moss", () => {
    expect(dominantPlant("bog")).toBe("sphagnum_moss");
  });
});

describe("restorationCostPerHa", () => {
  it("mangrove costs most to restore", () => {
    expect(restorationCostPerHa("mangrove")).toBeGreaterThan(
      restorationCostPerHa("bog")
    );
  });
});

describe("wetlandTypes", () => {
  it("returns 5 types", () => {
    expect(wetlandTypes()).toHaveLength(5);
  });
});
