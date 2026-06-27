import { describe, it, expect } from "vitest";
import {
  dirtTrap, cleanEase, durability, comfort,
  matCost, waterproof, customFit, matMaterial,
  bestSeason, floorMats,
} from "../floor-mat-calc.js";

describe("dirtTrap", () => {
  it("thermoplastic laser cut best dirt trapping", () => {
    expect(dirtTrap("thermoplastic_laser_cut")).toBeGreaterThan(dirtTrap("vinyl_clear_protector"));
  });
});

describe("cleanEase", () => {
  it("thermoplastic laser cut easiest to clean", () => {
    expect(cleanEase("thermoplastic_laser_cut")).toBeGreaterThan(cleanEase("carpet_plush_oem"));
  });
});

describe("durability", () => {
  it("thermoplastic laser cut most durable", () => {
    expect(durability("thermoplastic_laser_cut")).toBeGreaterThan(durability("carpet_plush_oem"));
  });
});

describe("comfort", () => {
  it("carpet plush oem most comfortable", () => {
    expect(comfort("carpet_plush_oem")).toBeGreaterThan(comfort("coco_fiber_scraper"));
  });
});

describe("matCost", () => {
  it("thermoplastic laser cut most expensive", () => {
    expect(matCost("thermoplastic_laser_cut")).toBeGreaterThan(matCost("vinyl_clear_protector"));
  });
});

describe("waterproof", () => {
  it("rubber all weather is waterproof", () => {
    expect(waterproof("rubber_all_weather")).toBe(true);
  });
  it("carpet plush oem is not", () => {
    expect(waterproof("carpet_plush_oem")).toBe(false);
  });
});

describe("customFit", () => {
  it("thermoplastic laser cut is custom fit", () => {
    expect(customFit("thermoplastic_laser_cut")).toBe(true);
  });
  it("rubber all weather is not", () => {
    expect(customFit("rubber_all_weather")).toBe(false);
  });
});

describe("matMaterial", () => {
  it("thermoplastic laser cut uses tpe odorless precision", () => {
    expect(matMaterial("thermoplastic_laser_cut")).toBe("tpe_odorless_precision");
  });
});

describe("bestSeason", () => {
  it("rubber all weather best for winter rain mud snow", () => {
    expect(bestSeason("rubber_all_weather")).toBe("winter_rain_mud_snow");
  });
});

describe("floorMats", () => {
  it("returns 5 types", () => {
    expect(floorMats()).toHaveLength(5);
  });
});
