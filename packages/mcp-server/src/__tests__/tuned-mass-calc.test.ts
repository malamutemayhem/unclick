import { describe, it, expect } from "vitest";
import {
  attenuation, bandwidth, response, maintenance,
  tmCost, active, forBuilding, element,
  bestUse, tunedMassTypes,
} from "../tuned-mass-calc.js";

describe("attenuation", () => {
  it("active electromagnetic best attenuation", () => {
    expect(attenuation("active_electromagnetic")).toBeGreaterThan(attenuation("viscoelastic_constrained"));
  });
});

describe("bandwidth", () => {
  it("active electromagnetic widest bandwidth", () => {
    expect(bandwidth("active_electromagnetic")).toBeGreaterThan(bandwidth("pendulum_building_sway"));
  });
});

describe("response", () => {
  it("active electromagnetic fastest response", () => {
    expect(response("active_electromagnetic")).toBeGreaterThan(response("pendulum_building_sway"));
  });
});

describe("maintenance", () => {
  it("viscoelastic lowest maintenance", () => {
    expect(maintenance("viscoelastic_constrained")).toBeGreaterThan(maintenance("active_electromagnetic"));
  });
});

describe("tmCost", () => {
  it("active electromagnetic most expensive", () => {
    expect(tmCost("active_electromagnetic")).toBeGreaterThan(tmCost("viscoelastic_constrained"));
  });
});

describe("active", () => {
  it("active electromagnetic is active", () => {
    expect(active("active_electromagnetic")).toBe(true);
  });
  it("pendulum not active", () => {
    expect(active("pendulum_building_sway")).toBe(false);
  });
});

describe("forBuilding", () => {
  it("pendulum for building", () => {
    expect(forBuilding("pendulum_building_sway")).toBe(true);
  });
  it("viscoelastic not for building", () => {
    expect(forBuilding("viscoelastic_constrained")).toBe(false);
  });
});

describe("element", () => {
  it("liquid sloshing uses u tube column", () => {
    expect(element("liquid_sloshing_column")).toBe("u_tube_liquid_column_sloshing");
  });
});

describe("bestUse", () => {
  it("spring mass for factory floor", () => {
    expect(bestUse("spring_mass_floor_vibe")).toBe("factory_floor_machine_footfall");
  });
});

describe("tunedMassTypes", () => {
  it("returns 5 types", () => {
    expect(tunedMassTypes()).toHaveLength(5);
  });
});
