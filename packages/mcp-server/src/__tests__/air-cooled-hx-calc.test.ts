import { describe, it, expect } from "vitest";
import {
  coolingCapacity, airDistribution, maintenance, noiseLevel,
  ahCost, fanOnTop, forCondensing, airflow,
  bestUse, airCooledHxTypes,
} from "../air-cooled-hx-calc.js";

describe("coolingCapacity", () => {
  it("air cooled condenser highest capacity", () => {
    expect(coolingCapacity("air_cooled_condenser")).toBeGreaterThan(coolingCapacity("natural_draft_vertical"));
  });
});

describe("airDistribution", () => {
  it("induced draft best distribution", () => {
    expect(airDistribution("induced_draft_horizontal")).toBeGreaterThan(airDistribution("forced_draft_horizontal"));
  });
});

describe("maintenance", () => {
  it("natural draft lowest maintenance", () => {
    expect(maintenance("natural_draft_vertical")).toBeGreaterThan(maintenance("air_cooled_condenser"));
  });
});

describe("noiseLevel", () => {
  it("natural draft quietest", () => {
    expect(noiseLevel("natural_draft_vertical")).toBeGreaterThan(noiseLevel("air_cooled_condenser"));
  });
});

describe("ahCost", () => {
  it("air cooled condenser most expensive", () => {
    expect(ahCost("air_cooled_condenser")).toBeGreaterThan(ahCost("natural_draft_vertical"));
  });
});

describe("fanOnTop", () => {
  it("induced draft has fan on top", () => {
    expect(fanOnTop("induced_draft_horizontal")).toBe(true);
  });
  it("forced draft does not have fan on top", () => {
    expect(fanOnTop("forced_draft_horizontal")).toBe(false);
  });
});

describe("forCondensing", () => {
  it("air cooled condenser for condensing", () => {
    expect(forCondensing("air_cooled_condenser")).toBe(true);
  });
  it("forced draft not for condensing", () => {
    expect(forCondensing("forced_draft_horizontal")).toBe(false);
  });
});

describe("airflow", () => {
  it("natural draft uses natural convection", () => {
    expect(airflow("natural_draft_vertical")).toBe("natural_convection_no_fan_vertical_tubes");
  });
});

describe("bestUse", () => {
  it("air cooled condenser for power plant", () => {
    expect(bestUse("air_cooled_condenser")).toBe("power_plant_steam_condenser_dry_cooling");
  });
});

describe("airCooledHxTypes", () => {
  it("returns 5 types", () => {
    expect(airCooledHxTypes()).toHaveLength(5);
  });
});
