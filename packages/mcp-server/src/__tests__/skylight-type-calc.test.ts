import { describe, it, expect } from "vitest";
import {
  light, ventilation, insulation, waterproof,
  skCost, operable, forFlat, glazing,
  bestUse, skylightTypeTypes,
} from "../skylight-type-calc.js";

describe("light", () => {
  it("fixed flat most light", () => {
    expect(light("fixed_flat_glass_unit")).toBeGreaterThan(light("tubular_sun_tunnel_pipe"));
  });
});

describe("ventilation", () => {
  it("venting pivot best ventilation", () => {
    expect(ventilation("venting_pivot_hinge_open")).toBeGreaterThan(ventilation("fixed_flat_glass_unit"));
  });
});

describe("insulation", () => {
  it("fixed flat best insulation", () => {
    expect(insulation("fixed_flat_glass_unit")).toBeGreaterThan(insulation("dome_acrylic_bubble_mount"));
  });
});

describe("waterproof", () => {
  it("tubular most waterproof", () => {
    expect(waterproof("tubular_sun_tunnel_pipe")).toBeGreaterThan(waterproof("ridge_continuous_ventilated"));
  });
});

describe("skCost", () => {
  it("ridge most expensive", () => {
    expect(skCost("ridge_continuous_ventilated")).toBeGreaterThan(skCost("tubular_sun_tunnel_pipe"));
  });
});

describe("operable", () => {
  it("venting pivot is operable", () => {
    expect(operable("venting_pivot_hinge_open")).toBe(true);
  });
  it("fixed flat not operable", () => {
    expect(operable("fixed_flat_glass_unit")).toBe(false);
  });
});

describe("forFlat", () => {
  it("dome for flat roof", () => {
    expect(forFlat("dome_acrylic_bubble_mount")).toBe(true);
  });
  it("fixed flat not for flat roof", () => {
    expect(forFlat("fixed_flat_glass_unit")).toBe(false);
  });
});

describe("glazing", () => {
  it("tubular uses polycarbonate dome", () => {
    expect(glazing("tubular_sun_tunnel_pipe")).toBe("polycarbonate_dome_reflective_tube");
  });
});

describe("bestUse", () => {
  it("venting pivot for bathroom kitchen", () => {
    expect(bestUse("venting_pivot_hinge_open")).toBe("bathroom_kitchen_moisture_vent");
  });
});

describe("skylightTypeTypes", () => {
  it("returns 5 types", () => {
    expect(skylightTypeTypes()).toHaveLength(5);
  });
});
