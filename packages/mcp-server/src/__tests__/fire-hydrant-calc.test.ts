import { describe, it, expect } from "vitest";
import {
  flow, pressure, frostProtect, accessibility,
  fhCost, dryBarrel, forCold, outlet,
  bestUse, fireHydrantTypes,
} from "../fire-hydrant-calc.js";

describe("flow", () => {
  it("wet barrel highest flow", () => {
    expect(flow("wet_barrel_california")).toBeGreaterThan(flow("wall_mounted_flush"));
  });
});

describe("pressure", () => {
  it("underground highest pressure", () => {
    expect(pressure("underground_vault_pit")).toBeGreaterThan(pressure("wall_mounted_flush"));
  });
});

describe("frostProtect", () => {
  it("dry barrel best frost protection", () => {
    expect(frostProtect("dry_barrel_frost_proof")).toBeGreaterThan(frostProtect("wet_barrel_california"));
  });
});

describe("accessibility", () => {
  it("pillar post most accessible", () => {
    expect(accessibility("pillar_post_indicator")).toBeGreaterThan(accessibility("underground_vault_pit"));
  });
});

describe("fhCost", () => {
  it("underground most expensive", () => {
    expect(fhCost("underground_vault_pit")).toBeGreaterThan(fhCost("wall_mounted_flush"));
  });
});

describe("dryBarrel", () => {
  it("dry barrel is dry", () => {
    expect(dryBarrel("dry_barrel_frost_proof")).toBe(true);
  });
  it("wet barrel not dry", () => {
    expect(dryBarrel("wet_barrel_california")).toBe(false);
  });
});

describe("forCold", () => {
  it("dry barrel for cold climate", () => {
    expect(forCold("dry_barrel_frost_proof")).toBe(true);
  });
  it("wet barrel not for cold", () => {
    expect(forCold("wet_barrel_california")).toBe(false);
  });
});

describe("outlet", () => {
  it("wall mounted has single outlet", () => {
    expect(outlet("wall_mounted_flush")).toBe("single_outlet_wall_flush");
  });
});

describe("bestUse", () => {
  it("underground for airport", () => {
    expect(bestUse("underground_vault_pit")).toBe("airport_runway_flush_grade");
  });
});

describe("fireHydrantTypes", () => {
  it("returns 5 types", () => {
    expect(fireHydrantTypes()).toHaveLength(5);
  });
});
