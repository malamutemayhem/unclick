import { describe, it, expect } from "vitest";
import {
  tempUniformity, throughput, energyEfficiency, zoneControl,
  toCost, directFire, forBaking, ovenConfig,
  bestUse, tunnelOvenTypes,
} from "../tunnel-oven-calc.js";

describe("tempUniformity", () => {
  it("indirect radiant best temp uniformity", () => {
    expect(tempUniformity("indirect_radiant")).toBeGreaterThan(tempUniformity("direct_gas"));
  });
});

describe("throughput", () => {
  it("convection impinge highest throughput", () => {
    expect(throughput("convection_impinge")).toBeGreaterThan(throughput("electric_element"));
  });
});

describe("energyEfficiency", () => {
  it("convection impinge best energy efficiency", () => {
    expect(energyEfficiency("convection_impinge")).toBeGreaterThan(energyEfficiency("electric_element"));
  });
});

describe("zoneControl", () => {
  it("electric element best zone control", () => {
    expect(zoneControl("electric_element")).toBeGreaterThan(zoneControl("direct_gas"));
  });
});

describe("toCost", () => {
  it("hybrid combo most expensive", () => {
    expect(toCost("hybrid_combo")).toBeGreaterThan(toCost("electric_element"));
  });
});

describe("directFire", () => {
  it("direct gas uses direct fire", () => {
    expect(directFire("direct_gas")).toBe(true);
  });
  it("indirect radiant no direct fire", () => {
    expect(directFire("indirect_radiant")).toBe(false);
  });
});

describe("forBaking", () => {
  it("direct gas for baking", () => {
    expect(forBaking("direct_gas")).toBe(true);
  });
  it("electric element not for baking", () => {
    expect(forBaking("electric_element")).toBe(false);
  });
});

describe("ovenConfig", () => {
  it("convection impinge uses high velocity air jet rapid heat", () => {
    expect(ovenConfig("convection_impinge")).toBe("convection_impinge_tunnel_oven_high_velocity_air_jet_rapid_heat");
  });
});

describe("bestUse", () => {
  it("direct gas for bread bake flame crust high volume line", () => {
    expect(bestUse("direct_gas")).toBe("bread_bake_direct_gas_tunnel_oven_flame_crust_high_volume_line");
  });
});

describe("tunnelOvenTypes", () => {
  it("returns 5 types", () => {
    expect(tunnelOvenTypes()).toHaveLength(5);
  });
});
