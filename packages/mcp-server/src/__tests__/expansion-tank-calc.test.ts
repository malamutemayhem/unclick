import { describe, it, expect } from "vitest";
import {
  capacity, pressure, longevity, maintenance,
  etCost, closed, forPotable, material,
  bestUse, expansionTankTypes,
} from "../expansion-tank-calc.js";

describe("capacity", () => {
  it("chilled water highest capacity", () => {
    expect(capacity("chilled_water_large")).toBeGreaterThan(capacity("stainless_potable_water"));
  });
});

describe("pressure", () => {
  it("stainless highest pressure", () => {
    expect(pressure("stainless_potable_water")).toBeGreaterThan(pressure("plain_steel_open"));
  });
});

describe("longevity", () => {
  it("stainless longest lasting", () => {
    expect(longevity("stainless_potable_water")).toBeGreaterThan(longevity("plain_steel_open"));
  });
});

describe("maintenance", () => {
  it("bladder low maintenance", () => {
    expect(maintenance("bladder_precharged")).toBeGreaterThan(maintenance("plain_steel_open"));
  });
});

describe("etCost", () => {
  it("stainless most expensive", () => {
    expect(etCost("stainless_potable_water")).toBeGreaterThan(etCost("plain_steel_open"));
  });
});

describe("closed", () => {
  it("bladder is closed", () => {
    expect(closed("bladder_precharged")).toBe(true);
  });
  it("plain steel not closed", () => {
    expect(closed("plain_steel_open")).toBe(false);
  });
});

describe("forPotable", () => {
  it("stainless for potable", () => {
    expect(forPotable("stainless_potable_water")).toBe(true);
  });
  it("bladder not potable", () => {
    expect(forPotable("bladder_precharged")).toBe(false);
  });
});

describe("material", () => {
  it("chilled water uses epoxy lined", () => {
    expect(material("chilled_water_large")).toBe("carbon_steel_epoxy_lined");
  });
});

describe("bestUse", () => {
  it("stainless for domestic water", () => {
    expect(bestUse("stainless_potable_water")).toBe("domestic_water_thermal_expand");
  });
});

describe("expansionTankTypes", () => {
  it("returns 5 types", () => {
    expect(expansionTankTypes()).toHaveLength(5);
  });
});
