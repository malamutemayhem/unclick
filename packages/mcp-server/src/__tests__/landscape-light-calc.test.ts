import { describe, it, expect } from "vitest";
import {
  brightness, efficiency, durability, aesthetic,
  llCost, waterproof, forArchitectural, beam,
  bestUse, landscapeLightTypes,
} from "../landscape-light-calc.js";

describe("brightness", () => {
  it("flood brightest", () => {
    expect(brightness("flood_tree_wash")).toBeGreaterThan(brightness("step_riser_recessed"));
  });
});

describe("efficiency", () => {
  it("step most efficient", () => {
    expect(efficiency("step_riser_recessed")).toBeGreaterThan(efficiency("flood_tree_wash"));
  });
});

describe("durability", () => {
  it("well most durable", () => {
    expect(durability("well_ingrade_flush")).toBeGreaterThan(durability("spot_accent_uplighter"));
  });
});

describe("aesthetic", () => {
  it("well best aesthetic", () => {
    expect(aesthetic("well_ingrade_flush")).toBeGreaterThan(aesthetic("flood_tree_wash"));
  });
});

describe("llCost", () => {
  it("well most expensive", () => {
    expect(llCost("well_ingrade_flush")).toBeGreaterThan(llCost("path_bollard_led"));
  });
});

describe("waterproof", () => {
  it("path bollard is waterproof", () => {
    expect(waterproof("path_bollard_led")).toBe(true);
  });
  it("step riser not waterproof", () => {
    expect(waterproof("step_riser_recessed")).toBe(false);
  });
});

describe("forArchitectural", () => {
  it("spot for architectural", () => {
    expect(forArchitectural("spot_accent_uplighter")).toBe(true);
  });
  it("path not architectural", () => {
    expect(forArchitectural("path_bollard_led")).toBe(false);
  });
});

describe("beam", () => {
  it("flood uses wide beam", () => {
    expect(beam("flood_tree_wash")).toBe("wide_flood_60_degree_canopy");
  });
});

describe("bestUse", () => {
  it("well for column uplighting", () => {
    expect(bestUse("well_ingrade_flush")).toBe("column_wall_graze_uplighting");
  });
});

describe("landscapeLightTypes", () => {
  it("returns 5 types", () => {
    expect(landscapeLightTypes()).toHaveLength(5);
  });
});
