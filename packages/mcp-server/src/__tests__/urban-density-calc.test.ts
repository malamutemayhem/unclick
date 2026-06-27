import { describe, it, expect } from "vitest";
import {
  populationPerKm2, transitAccessScore, walkabilityScore,
  avgBuildingFloors, greenSpacePercent, carDependent,
  hasMetroSystem, typicalZoning, infraChallenges, urbanDensities,
} from "../urban-density-calc.js";

describe("populationPerKm2", () => {
  it("megacity densest", () => {
    expect(populationPerKm2("megacity")).toBeGreaterThan(
      populationPerKm2("suburban")
    );
  });
});

describe("transitAccessScore", () => {
  it("megacity best transit", () => {
    expect(transitAccessScore("megacity")).toBeGreaterThan(
      transitAccessScore("rural")
    );
  });
});

describe("walkabilityScore", () => {
  it("dense urban most walkable", () => {
    expect(walkabilityScore("dense_urban")).toBeGreaterThan(
      walkabilityScore("suburban")
    );
  });
});

describe("avgBuildingFloors", () => {
  it("megacity tallest buildings", () => {
    expect(avgBuildingFloors("megacity")).toBeGreaterThan(
      avgBuildingFloors("urban")
    );
  });
});

describe("greenSpacePercent", () => {
  it("rural most green space", () => {
    expect(greenSpacePercent("rural")).toBeGreaterThan(
      greenSpacePercent("megacity")
    );
  });
});

describe("carDependent", () => {
  it("suburban is car dependent", () => {
    expect(carDependent("suburban")).toBe(true);
  });
  it("dense urban is not", () => {
    expect(carDependent("dense_urban")).toBe(false);
  });
});

describe("hasMetroSystem", () => {
  it("urban has metro", () => {
    expect(hasMetroSystem("urban")).toBe(true);
  });
  it("rural does not", () => {
    expect(hasMetroSystem("rural")).toBe(false);
  });
});

describe("typicalZoning", () => {
  it("suburban is single family", () => {
    expect(typicalZoning("suburban")).toBe("single_family");
  });
});

describe("infraChallenges", () => {
  it("megacity faces overcrowding", () => {
    expect(infraChallenges("megacity")).toBe("overcrowding");
  });
});

describe("urbanDensities", () => {
  it("returns 5 densities", () => {
    expect(urbanDensities()).toHaveLength(5);
  });
});
