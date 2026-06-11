import { describe, it, expect } from "vitest";
import {
  efficiency, capacity, noiseLevel, maintenance,
  chCost, waterCooled, forLargeBuilding, compressor,
  bestUse, chillerHvacTypes,
} from "../chiller-hvac-calc.js";

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
  it("absorption lithium bromide quietest", () => {
    expect(noiseLevel("absorption_lithium_bromide")).toBeGreaterThan(noiseLevel("air_cooled_screw"));
  });
});

describe("maintenance", () => {
  it("air cooled scroll lowest maintenance", () => {
    expect(maintenance("air_cooled_scroll")).toBeGreaterThan(maintenance("absorption_lithium_bromide"));
  });
});

describe("chCost", () => {
  it("water cooled centrifugal most expensive", () => {
    expect(chCost("water_cooled_centrifugal")).toBeGreaterThan(chCost("air_cooled_scroll"));
  });
});

describe("waterCooled", () => {
  it("water cooled centrifugal is water cooled", () => {
    expect(waterCooled("water_cooled_centrifugal")).toBe(true);
  });
  it("air cooled scroll not water cooled", () => {
    expect(waterCooled("air_cooled_scroll")).toBe(false);
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
  it("absorption uses lithium bromide cycle", () => {
    expect(compressor("absorption_lithium_bromide")).toBe("lithium_bromide_water_absorption_cycle_steam_hot_water");
  });
});

describe("bestUse", () => {
  it("water cooled centrifugal for large campus", () => {
    expect(bestUse("water_cooled_centrifugal")).toBe("large_campus_data_center_high_rise_district_cooling_plant");
  });
});

describe("chillerHvacTypes", () => {
  it("returns 5 types", () => {
    expect(chillerHvacTypes()).toHaveLength(5);
  });
});
