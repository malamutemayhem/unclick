import { describe, it, expect } from "vitest";
import {
  stiffness, ductility, drift, fireRating,
  swCost, ductile, forHighRise, reinforcement,
  bestUse, shearWallTypes,
} from "../shear-wall-calc.js";

describe("stiffness", () => {
  it("steel plate stiffest", () => {
    expect(stiffness("steel_plate_infill")).toBeGreaterThan(stiffness("wood_sheathed_plywood"));
  });
});

describe("ductility", () => {
  it("coupled most ductile", () => {
    expect(ductility("coupled_link_beam")).toBeGreaterThan(ductility("reinforced_masonry_cmu"));
  });
});

describe("drift", () => {
  it("steel plate best drift control", () => {
    expect(drift("steel_plate_infill")).toBeGreaterThan(drift("wood_sheathed_plywood"));
  });
});

describe("fireRating", () => {
  it("concrete best fire rating", () => {
    expect(fireRating("reinforced_concrete_solid")).toBeGreaterThan(fireRating("wood_sheathed_plywood"));
  });
});

describe("swCost", () => {
  it("steel plate most expensive", () => {
    expect(swCost("steel_plate_infill")).toBeGreaterThan(swCost("wood_sheathed_plywood"));
  });
});

describe("ductile", () => {
  it("coupled is ductile", () => {
    expect(ductile("coupled_link_beam")).toBe(true);
  });
  it("masonry not ductile", () => {
    expect(ductile("reinforced_masonry_cmu")).toBe(false);
  });
});

describe("forHighRise", () => {
  it("steel plate for high rise", () => {
    expect(forHighRise("steel_plate_infill")).toBe(true);
  });
  it("wood not for high rise", () => {
    expect(forHighRise("wood_sheathed_plywood")).toBe(false);
  });
});

describe("reinforcement", () => {
  it("masonry uses grouted cell", () => {
    expect(reinforcement("reinforced_masonry_cmu")).toBe("grouted_cell_vertical_bar");
  });
});

describe("bestUse", () => {
  it("coupled for tall building core", () => {
    expect(bestUse("coupled_link_beam")).toBe("tall_building_core_dual_system");
  });
});

describe("shearWallTypes", () => {
  it("returns 5 types", () => {
    expect(shearWallTypes()).toHaveLength(5);
  });
});
