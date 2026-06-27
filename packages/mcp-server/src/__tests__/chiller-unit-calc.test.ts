import { describe, it, expect } from "vitest";
import {
  efficiency, capacity, noiseLevel, maintenance,
  cuCost, requiresCoolingTower, forLargeBuilding, compressor,
  bestUse, chillerUnitTypes,
} from "../chiller-unit-calc.js";

describe("efficiency", () => {
  it("water cooled centrifugal most efficient", () => {
    expect(efficiency("water_cooled_centrifugal")).toBeGreaterThan(efficiency("air_cooled_scroll"));
  });
});

describe("capacity", () => {
  it("water cooled centrifugal highest capacity", () => {
    expect(capacity("water_cooled_centrifugal")).toBeGreaterThan(capacity("air_cooled_scroll"));
  });
});

describe("noiseLevel", () => {
  it("magnetic bearing quietest", () => {
    expect(noiseLevel("magnetic_bearing")).toBeGreaterThan(noiseLevel("air_cooled_scroll"));
  });
});

describe("maintenance", () => {
  it("magnetic bearing lowest maintenance", () => {
    expect(maintenance("magnetic_bearing")).toBeGreaterThan(maintenance("water_cooled_centrifugal"));
  });
});

describe("cuCost", () => {
  it("magnetic bearing most expensive", () => {
    expect(cuCost("magnetic_bearing")).toBeGreaterThan(cuCost("air_cooled_scroll"));
  });
});

describe("requiresCoolingTower", () => {
  it("water cooled centrifugal requires cooling tower", () => {
    expect(requiresCoolingTower("water_cooled_centrifugal")).toBe(true);
  });
  it("air cooled scroll no cooling tower", () => {
    expect(requiresCoolingTower("air_cooled_scroll")).toBe(false);
  });
});

describe("forLargeBuilding", () => {
  it("water cooled centrifugal for large building", () => {
    expect(forLargeBuilding("water_cooled_centrifugal")).toBe(true);
  });
  it("air cooled scroll not for large building", () => {
    expect(forLargeBuilding("air_cooled_scroll")).toBe(false);
  });
});

describe("compressor", () => {
  it("absorption uses lithium bromide", () => {
    expect(compressor("absorption")).toBe("lithium_bromide_water_heat_driven_no_mechanical_compressor");
  });
});

describe("bestUse", () => {
  it("magnetic bearing for premium data center", () => {
    expect(bestUse("magnetic_bearing")).toBe("premium_data_center_pharma_cleanroom_low_maintenance_site");
  });
});

describe("chillerUnitTypes", () => {
  it("returns 5 types", () => {
    expect(chillerUnitTypes()).toHaveLength(5);
  });
});
