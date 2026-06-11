import { describe, it, expect } from "vitest";
import {
  capacity, efficiency, noise, maintenance,
  ahCost, noWater, forDesert, fan,
  bestUse, airCooledHeatTypes,
} from "../air-cooled-heat-calc.js";

describe("capacity", () => {
  it("induced draft highest capacity", () => {
    expect(capacity("induced_draft_horizontal")).toBeGreaterThan(capacity("natural_draft_vertical"));
  });
});

describe("efficiency", () => {
  it("variable speed most efficient", () => {
    expect(efficiency("variable_speed_ec_fan")).toBeGreaterThan(efficiency("forced_draft_horizontal"));
  });
});

describe("noise", () => {
  it("natural draft quietest", () => {
    expect(noise("natural_draft_vertical")).toBeGreaterThan(noise("forced_draft_horizontal"));
  });
});

describe("maintenance", () => {
  it("natural draft lowest maintenance", () => {
    expect(maintenance("natural_draft_vertical")).toBeGreaterThan(maintenance("induced_draft_horizontal"));
  });
});

describe("ahCost", () => {
  it("variable speed most expensive", () => {
    expect(ahCost("variable_speed_ec_fan")).toBeGreaterThan(ahCost("forced_draft_horizontal"));
  });
});

describe("noWater", () => {
  it("all are no water", () => {
    expect(noWater("forced_draft_horizontal")).toBe(true);
  });
  it("natural draft no water", () => {
    expect(noWater("natural_draft_vertical")).toBe(true);
  });
});

describe("forDesert", () => {
  it("forced draft for desert", () => {
    expect(forDesert("forced_draft_horizontal")).toBe(true);
  });
  it("natural draft not desert", () => {
    expect(forDesert("natural_draft_vertical")).toBe(false);
  });
});

describe("fan", () => {
  it("natural draft uses chimney effect", () => {
    expect(fan("natural_draft_vertical")).toBe("no_fan_chimney_effect_natural");
  });
});

describe("bestUse", () => {
  it("variable speed for data center", () => {
    expect(bestUse("variable_speed_ec_fan")).toBe("data_center_dry_cooler_free");
  });
});

describe("airCooledHeatTypes", () => {
  it("returns 5 types", () => {
    expect(airCooledHeatTypes()).toHaveLength(5);
  });
});
