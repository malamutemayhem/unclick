import { describe, it, expect } from "vitest";
import {
  capacity, flexibility, aesthetic, accessibility,
  rwCost, concealed, forRetrofit, mounting,
  bestUse, racewayTypes,
} from "../raceway-type-calc.js";

describe("capacity", () => {
  it("cable trough highest capacity", () => {
    expect(capacity("cable_trough_ladder")).toBeGreaterThan(capacity("surface_metal_wiremold"));
  });
});

describe("flexibility", () => {
  it("modular pole most flexible", () => {
    expect(flexibility("modular_power_pole")).toBeGreaterThan(flexibility("floor_duct_underfloor"));
  });
});

describe("aesthetic", () => {
  it("floor duct best aesthetic", () => {
    expect(aesthetic("floor_duct_underfloor")).toBeGreaterThan(aesthetic("cable_trough_ladder"));
  });
});

describe("accessibility", () => {
  it("modular pole most accessible", () => {
    expect(accessibility("modular_power_pole")).toBeGreaterThan(accessibility("floor_duct_underfloor"));
  });
});

describe("rwCost", () => {
  it("floor duct most expensive", () => {
    expect(rwCost("floor_duct_underfloor")).toBeGreaterThan(rwCost("surface_metal_wiremold"));
  });
});

describe("concealed", () => {
  it("floor duct is concealed", () => {
    expect(concealed("floor_duct_underfloor")).toBe(true);
  });
  it("surface not concealed", () => {
    expect(concealed("surface_metal_wiremold")).toBe(false);
  });
});

describe("forRetrofit", () => {
  it("surface for retrofit", () => {
    expect(forRetrofit("surface_metal_wiremold")).toBe(true);
  });
  it("floor duct not retrofit", () => {
    expect(forRetrofit("floor_duct_underfloor")).toBe(false);
  });
});

describe("mounting", () => {
  it("modular uses floor to ceiling pole", () => {
    expect(mounting("modular_power_pole")).toBe("floor_to_ceiling_power_pole");
  });
});

describe("bestUse", () => {
  it("cable trough for industrial", () => {
    expect(bestUse("cable_trough_ladder")).toBe("industrial_plant_heavy_cable");
  });
});

describe("racewayTypes", () => {
  it("returns 5 types", () => {
    expect(racewayTypes()).toHaveLength(5);
  });
});
