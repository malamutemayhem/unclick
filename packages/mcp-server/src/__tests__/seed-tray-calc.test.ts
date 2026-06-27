import { describe, it, expect } from "vitest";
import {
  seedlingCount, transplantEase, rootDevelopment, moistureControl,
  trayCost, reusable, biodegradable, trayMaterial,
  bestGrower, seedTrays,
} from "../seed-tray-calc.js";

describe("seedlingCount", () => {
  it("cell insert 72 plug highest seedling count", () => {
    expect(seedlingCount("cell_insert_72_plug")).toBeGreaterThan(seedlingCount("soil_block_maker"));
  });
});

describe("transplantEase", () => {
  it("peat pellet expand easiest transplant", () => {
    expect(transplantEase("peat_pellet_expand")).toBeGreaterThan(transplantEase("open_flat_standard"));
  });
});

describe("rootDevelopment", () => {
  it("soil block maker best root development", () => {
    expect(rootDevelopment("soil_block_maker")).toBeGreaterThan(rootDevelopment("open_flat_standard"));
  });
});

describe("moistureControl", () => {
  it("self watering dome best moisture control", () => {
    expect(moistureControl("self_watering_dome")).toBeGreaterThan(moistureControl("open_flat_standard"));
  });
});

describe("trayCost", () => {
  it("soil block maker most expensive", () => {
    expect(trayCost("soil_block_maker")).toBeGreaterThan(trayCost("open_flat_standard"));
  });
});

describe("reusable", () => {
  it("cell insert 72 plug is reusable", () => {
    expect(reusable("cell_insert_72_plug")).toBe(true);
  });
  it("peat pellet expand is not", () => {
    expect(reusable("peat_pellet_expand")).toBe(false);
  });
});

describe("biodegradable", () => {
  it("peat pellet expand is biodegradable", () => {
    expect(biodegradable("peat_pellet_expand")).toBe(true);
  });
  it("cell insert 72 plug is not", () => {
    expect(biodegradable("cell_insert_72_plug")).toBe(false);
  });
});

describe("trayMaterial", () => {
  it("soil block maker uses stainless steel press", () => {
    expect(trayMaterial("soil_block_maker")).toBe("stainless_steel_press");
  });
});

describe("bestGrower", () => {
  it("peat pellet expand best for beginner easy start", () => {
    expect(bestGrower("peat_pellet_expand")).toBe("beginner_easy_start");
  });
});

describe("seedTrays", () => {
  it("returns 5 types", () => {
    expect(seedTrays()).toHaveLength(5);
  });
});
