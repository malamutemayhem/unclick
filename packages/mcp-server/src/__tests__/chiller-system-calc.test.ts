import { describe, it, expect } from "vitest";
import {
  efficiency, capacity, partLoadPerf, maintenance,
  chCost, oilFree, forLargeBuilding, compressor,
  bestUse, chillerSystemTypes,
} from "../chiller-system-calc.js";

describe("efficiency", () => {
  it("magnetic bearing most efficient", () => {
    expect(efficiency("magnetic_bearing_oil")).toBeGreaterThan(efficiency("absorption_steam_fired"));
  });
});

describe("capacity", () => {
  it("centrifugal water cooled highest capacity", () => {
    expect(capacity("centrifugal_water_cooled")).toBeGreaterThan(capacity("scroll_air_cooled"));
  });
});

describe("partLoadPerf", () => {
  it("magnetic bearing best part load", () => {
    expect(partLoadPerf("magnetic_bearing_oil")).toBeGreaterThan(partLoadPerf("absorption_steam_fired"));
  });
});

describe("maintenance", () => {
  it("magnetic bearing lowest maintenance", () => {
    expect(maintenance("magnetic_bearing_oil")).toBeGreaterThan(maintenance("absorption_steam_fired"));
  });
});

describe("chCost", () => {
  it("magnetic bearing most expensive", () => {
    expect(chCost("magnetic_bearing_oil")).toBeGreaterThan(chCost("scroll_air_cooled"));
  });
});

describe("oilFree", () => {
  it("magnetic bearing is oil free", () => {
    expect(oilFree("magnetic_bearing_oil")).toBe(true);
  });
  it("centrifugal not oil free", () => {
    expect(oilFree("centrifugal_water_cooled")).toBe(false);
  });
});

describe("forLargeBuilding", () => {
  it("centrifugal for large building", () => {
    expect(forLargeBuilding("centrifugal_water_cooled")).toBe(true);
  });
  it("scroll air cooled not for large building", () => {
    expect(forLargeBuilding("scroll_air_cooled")).toBe(false);
  });
});

describe("compressor", () => {
  it("absorption uses lithium bromide", () => {
    expect(compressor("absorption_steam_fired")).toBe("lithium_bromide_water_absorber_generator_steam_heat");
  });
});

describe("bestUse", () => {
  it("scroll for small office retail", () => {
    expect(bestUse("scroll_air_cooled")).toBe("small_office_retail_no_cooling_tower_available");
  });
});

describe("chillerSystemTypes", () => {
  it("returns 5 types", () => {
    expect(chillerSystemTypes()).toHaveLength(5);
  });
});
