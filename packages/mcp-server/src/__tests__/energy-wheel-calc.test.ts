import { describe, it, expect } from "vitest";
import {
  recovery, latent, pressure, maintenance,
  ewCost, moistureTransfer, forHumid, medium,
  bestUse, energyWheelTypes,
} from "../energy-wheel-calc.js";

describe("recovery", () => {
  it("enthalpy best recovery", () => {
    expect(recovery("total_enthalpy_desiccant")).toBeGreaterThan(recovery("heat_pipe_passive"));
  });
});

describe("latent", () => {
  it("enthalpy best latent", () => {
    expect(latent("total_enthalpy_desiccant")).toBeGreaterThan(latent("sensible_only_aluminum"));
  });
});

describe("pressure", () => {
  it("heat pipe best pressure", () => {
    expect(pressure("heat_pipe_passive")).toBeGreaterThan(pressure("total_enthalpy_desiccant"));
  });
});

describe("maintenance", () => {
  it("heat pipe lowest maintenance", () => {
    expect(maintenance("heat_pipe_passive")).toBeGreaterThan(maintenance("total_enthalpy_desiccant"));
  });
});

describe("ewCost", () => {
  it("polymer most expensive", () => {
    expect(ewCost("polymer_membrane_enthalpy")).toBeGreaterThan(ewCost("sensible_only_aluminum"));
  });
});

describe("moistureTransfer", () => {
  it("enthalpy transfers moisture", () => {
    expect(moistureTransfer("total_enthalpy_desiccant")).toBe(true);
  });
  it("sensible no moisture transfer", () => {
    expect(moistureTransfer("sensible_only_aluminum")).toBe(false);
  });
});

describe("forHumid", () => {
  it("enthalpy for humid", () => {
    expect(forHumid("total_enthalpy_desiccant")).toBe(true);
  });
  it("heat pipe not humid", () => {
    expect(forHumid("heat_pipe_passive")).toBe(false);
  });
});

describe("medium", () => {
  it("heat pipe uses sealed refrigerant", () => {
    expect(medium("heat_pipe_passive")).toBe("sealed_refrigerant_heat_pipe");
  });
});

describe("bestUse", () => {
  it("polymer for hospital lab", () => {
    expect(bestUse("polymer_membrane_enthalpy")).toBe("hospital_lab_cross_contam_free");
  });
});

describe("energyWheelTypes", () => {
  it("returns 5 types", () => {
    expect(energyWheelTypes()).toHaveLength(5);
  });
});
