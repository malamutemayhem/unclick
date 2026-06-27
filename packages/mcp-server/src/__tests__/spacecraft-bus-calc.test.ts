import { describe, it, expect } from "vitest";
import {
  payload, power, reliability, flexibility,
  sbCost, propulsive, forLeo, structure,
  bestUse, spacecraftBuses,
} from "../spacecraft-bus-calc.js";

describe("payload", () => {
  it("large flagship highest payload", () => {
    expect(payload("large_flagship_composite")).toBeGreaterThan(payload("smallsat_cubesat_frame"));
  });
});

describe("power", () => {
  it("large flagship highest power", () => {
    expect(power("large_flagship_composite")).toBeGreaterThan(power("micro_propulsive_module"));
  });
});

describe("reliability", () => {
  it("large flagship most reliable", () => {
    expect(reliability("large_flagship_composite")).toBeGreaterThan(reliability("smallsat_cubesat_frame"));
  });
});

describe("flexibility", () => {
  it("modular espa most flexible", () => {
    expect(flexibility("modular_espa_ring")).toBeGreaterThan(flexibility("large_flagship_composite"));
  });
});

describe("sbCost", () => {
  it("large flagship most expensive", () => {
    expect(sbCost("large_flagship_composite")).toBeGreaterThan(sbCost("smallsat_cubesat_frame"));
  });
});

describe("propulsive", () => {
  it("medium geostat is propulsive", () => {
    expect(propulsive("medium_geostat_platform")).toBe(true);
  });
  it("smallsat not propulsive", () => {
    expect(propulsive("smallsat_cubesat_frame")).toBe(false);
  });
});

describe("forLeo", () => {
  it("smallsat for leo", () => {
    expect(forLeo("smallsat_cubesat_frame")).toBe(true);
  });
  it("medium geostat not for leo", () => {
    expect(forLeo("medium_geostat_platform")).toBe(false);
  });
});

describe("structure", () => {
  it("modular espa uses espa port modular adapter", () => {
    expect(structure("modular_espa_ring")).toBe("espa_port_modular_adapter");
  });
});

describe("bestUse", () => {
  it("smallsat best for iot constellation", () => {
    expect(bestUse("smallsat_cubesat_frame")).toBe("iot_constellation_rapid_deploy");
  });
});

describe("spacecraftBuses", () => {
  it("returns 5 types", () => {
    expect(spacecraftBuses()).toHaveLength(5);
  });
});
