import { describe, it, expect } from "vitest";
import {
  precision, speed, strength, porosity,
  dcCost, thinWall, forAluminum, process,
  bestUse, dieCastingTypes,
} from "../die-casting-calc.js";

describe("precision", () => {
  it("semi solid most precise", () => {
    expect(precision("semi_solid_thixo")).toBeGreaterThan(precision("squeeze_cast_forged"));
  });
});

describe("speed", () => {
  it("hot chamber zinc fastest", () => {
    expect(speed("hot_chamber_zinc")).toBeGreaterThan(speed("squeeze_cast_forged"));
  });
});

describe("strength", () => {
  it("squeeze cast strongest", () => {
    expect(strength("squeeze_cast_forged")).toBeGreaterThan(strength("hot_chamber_zinc"));
  });
});

describe("porosity", () => {
  it("vacuum assisted least porosity", () => {
    expect(porosity("vacuum_assisted_porosity")).toBeGreaterThan(porosity("cold_chamber_aluminum"));
  });
});

describe("dcCost", () => {
  it("semi solid most expensive", () => {
    expect(dcCost("semi_solid_thixo")).toBeGreaterThan(dcCost("hot_chamber_zinc"));
  });
});

describe("thinWall", () => {
  it("hot chamber supports thin wall", () => {
    expect(thinWall("hot_chamber_zinc")).toBe(true);
  });
  it("squeeze cast not thin wall", () => {
    expect(thinWall("squeeze_cast_forged")).toBe(false);
  });
});

describe("forAluminum", () => {
  it("cold chamber for aluminum", () => {
    expect(forAluminum("cold_chamber_aluminum")).toBe(true);
  });
  it("hot chamber not for aluminum", () => {
    expect(forAluminum("hot_chamber_zinc")).toBe(false);
  });
});

describe("process", () => {
  it("semi solid uses thixotropic slug", () => {
    expect(process("semi_solid_thixo")).toBe("thixotropic_slug_partial_melt");
  });
});

describe("bestUse", () => {
  it("vacuum assisted for structural auto", () => {
    expect(bestUse("vacuum_assisted_porosity")).toBe("structural_auto_shock_tower_node");
  });
});

describe("dieCastingTypes", () => {
  it("returns 5 types", () => {
    expect(dieCastingTypes()).toHaveLength(5);
  });
});
