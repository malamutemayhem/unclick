import { describe, it, expect } from "vitest";
import {
  capture, grease, noise, efficiency,
  ehCost, fireSuppress, forCooking, ventilation,
  bestUse, exhaustHoodTypes,
} from "../exhaust-hood-calc.js";

describe("capture", () => {
  it("compensating best capture", () => {
    expect(capture("compensating_makeup_air")).toBeGreaterThan(capture("type_ii_heat_vapor"));
  });
});

describe("grease", () => {
  it("type i best grease", () => {
    expect(grease("type_i_grease_rated")).toBeGreaterThan(grease("type_ii_heat_vapor"));
  });
});

describe("noise", () => {
  it("backshelf quietest", () => {
    expect(noise("backshelf_low_proximity")).toBeGreaterThan(noise("island_canopy_center"));
  });
});

describe("efficiency", () => {
  it("compensating most efficient", () => {
    expect(efficiency("compensating_makeup_air")).toBeGreaterThan(efficiency("island_canopy_center"));
  });
});

describe("ehCost", () => {
  it("island most expensive", () => {
    expect(ehCost("island_canopy_center")).toBeGreaterThan(ehCost("type_ii_heat_vapor"));
  });
});

describe("fireSuppress", () => {
  it("type i has fire suppression", () => {
    expect(fireSuppress("type_i_grease_rated")).toBe(true);
  });
  it("type ii no fire suppression", () => {
    expect(fireSuppress("type_ii_heat_vapor")).toBe(false);
  });
});

describe("forCooking", () => {
  it("type i for cooking", () => {
    expect(forCooking("type_i_grease_rated")).toBe(true);
  });
  it("type ii not cooking", () => {
    expect(forCooking("type_ii_heat_vapor")).toBe(false);
  });
});

describe("ventilation", () => {
  it("island uses four sided canopy", () => {
    expect(ventilation("island_canopy_center")).toBe("four_sided_canopy_island_mount");
  });
});

describe("bestUse", () => {
  it("type ii for dishwasher steam", () => {
    expect(bestUse("type_ii_heat_vapor")).toBe("dishwasher_steam_table_oven");
  });
});

describe("exhaustHoodTypes", () => {
  it("returns 5 types", () => {
    expect(exhaustHoodTypes()).toHaveLength(5);
  });
});
