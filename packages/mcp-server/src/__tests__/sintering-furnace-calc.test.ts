import { describe, it, expect } from "vitest";
import {
  temperature, throughput, density, atmosphere,
  sfCost, continuous, forPowderMetal, heating,
  bestUse, sinteringFurnaceTypes,
} from "../sintering-furnace-calc.js";

describe("temperature", () => {
  it("vacuum and hip sintering highest temperature", () => {
    expect(temperature("vacuum_sintering")).toBeGreaterThan(temperature("mesh_belt_continuous"));
    expect(temperature("hip_sintering")).toBeGreaterThan(temperature("mesh_belt_continuous"));
  });
});

describe("throughput", () => {
  it("mesh belt continuous highest throughput", () => {
    expect(throughput("mesh_belt_continuous")).toBeGreaterThan(throughput("hip_sintering"));
  });
});

describe("density", () => {
  it("vacuum and hip sintering highest density", () => {
    expect(density("vacuum_sintering")).toBeGreaterThan(density("mesh_belt_continuous"));
    expect(density("hip_sintering")).toBeGreaterThan(density("mesh_belt_continuous"));
  });
});

describe("atmosphere", () => {
  it("vacuum sintering best atmosphere control", () => {
    expect(atmosphere("vacuum_sintering")).toBeGreaterThan(atmosphere("mesh_belt_continuous"));
  });
});

describe("sfCost", () => {
  it("hip sintering most expensive", () => {
    expect(sfCost("hip_sintering")).toBeGreaterThan(sfCost("mesh_belt_continuous"));
  });
});

describe("continuous", () => {
  it("mesh belt is continuous", () => {
    expect(continuous("mesh_belt_continuous")).toBe(true);
  });
  it("vacuum sintering not continuous", () => {
    expect(continuous("vacuum_sintering")).toBe(false);
  });
});

describe("forPowderMetal", () => {
  it("all types for powder metal", () => {
    expect(forPowderMetal("mesh_belt_continuous")).toBe(true);
    expect(forPowderMetal("hip_sintering")).toBe(true);
  });
});

describe("heating", () => {
  it("hip sintering uses argon isostatic pressure", () => {
    expect(heating("hip_sintering")).toBe("argon_gas_isostatic_pressure_vessel_full_density_closure");
  });
});

describe("bestUse", () => {
  it("walking beam for cemented carbide", () => {
    expect(bestUse("walking_beam")).toBe("cemented_carbide_tool_insert_tungsten_carbide_hard_metal");
  });
});

describe("sinteringFurnaceTypes", () => {
  it("returns 5 types", () => {
    expect(sinteringFurnaceTypes()).toHaveLength(5);
  });
});
