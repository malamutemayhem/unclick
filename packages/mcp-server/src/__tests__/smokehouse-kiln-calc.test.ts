import { describe, it, expect } from "vitest";
import {
  smokeDepth, temperatureControl, throughput, energyEfficiency,
  skCost, automated, forArtisan, kilnConfig,
  bestUse, smokehouseKilnTypes,
} from "../smokehouse-kiln-calc.js";

describe("smokeDepth", () => {
  it("natural draft best smoke depth", () => {
    expect(smokeDepth("natural_draft")).toBeGreaterThan(smokeDepth("liquid_smoke"));
  });
});

describe("temperatureControl", () => {
  it("liquid smoke best temperature control", () => {
    expect(temperatureControl("liquid_smoke")).toBeGreaterThan(temperatureControl("natural_draft"));
  });
});

describe("throughput", () => {
  it("liquid smoke highest throughput", () => {
    expect(throughput("liquid_smoke")).toBeGreaterThanOrEqual(throughput("continuous_tunnel"));
  });
});

describe("energyEfficiency", () => {
  it("liquid smoke best energy efficiency", () => {
    expect(energyEfficiency("liquid_smoke")).toBeGreaterThan(energyEfficiency("natural_draft"));
  });
});

describe("skCost", () => {
  it("continuous tunnel most expensive", () => {
    expect(skCost("continuous_tunnel")).toBeGreaterThan(skCost("natural_draft"));
  });
});

describe("automated", () => {
  it("forced air is automated", () => {
    expect(automated("forced_air")).toBe(true);
  });
  it("natural draft not automated", () => {
    expect(automated("natural_draft")).toBe(false);
  });
});

describe("forArtisan", () => {
  it("natural draft for artisan", () => {
    expect(forArtisan("natural_draft")).toBe(true);
  });
  it("forced air not for artisan", () => {
    expect(forArtisan("forced_air")).toBe(false);
  });
});

describe("kilnConfig", () => {
  it("electrostatic uses charge particle deposit surface", () => {
    expect(kilnConfig("electrostatic")).toBe("electrostatic_smokehouse_kiln_charge_particle_deposit_surface");
  });
});

describe("bestUse", () => {
  it("continuous tunnel for large scale conveyor multi zone", () => {
    expect(bestUse("continuous_tunnel")).toBe("large_scale_smokehouse_continuous_tunnel_conveyor_multi_zone_line");
  });
});

describe("smokehouseKilnTypes", () => {
  it("returns 5 types", () => {
    expect(smokehouseKilnTypes()).toHaveLength(5);
  });
});
