import { describe, it, expect } from "vitest";
import {
  efficiency, reliability, turndown, noiseLevel,
  scCost, oilFree, forContinuous, mechanism,
  bestUse, screwCompressorTypes,
} from "../screw-compressor-calc.js";

describe("efficiency", () => {
  it("oil injected variable most efficient", () => {
    expect(efficiency("oil_injected_variable")).toBeGreaterThan(efficiency("oil_injected_single"));
  });
});

describe("reliability", () => {
  it("oil injected single most reliable", () => {
    expect(reliability("oil_injected_single")).toBeGreaterThanOrEqual(reliability("oil_injected_variable"));
  });
});

describe("turndown", () => {
  it("oil injected variable best turndown", () => {
    expect(turndown("oil_injected_variable")).toBeGreaterThan(turndown("oil_injected_single"));
  });
});

describe("noiseLevel", () => {
  it("oil free water inject quietest", () => {
    expect(noiseLevel("oil_free_water_inject")).toBeGreaterThan(noiseLevel("oil_free_dry_screw"));
  });
});

describe("scCost", () => {
  it("twin screw process most expensive", () => {
    expect(scCost("twin_screw_process")).toBeGreaterThan(scCost("oil_injected_single"));
  });
});

describe("oilFree", () => {
  it("oil free dry screw is oil free", () => {
    expect(oilFree("oil_free_dry_screw")).toBe(true);
  });
  it("oil injected single not oil free", () => {
    expect(oilFree("oil_injected_single")).toBe(false);
  });
});

describe("forContinuous", () => {
  it("all screw compressors for continuous use", () => {
    expect(forContinuous("oil_injected_single")).toBe(true);
  });
});

describe("mechanism", () => {
  it("oil free dry screw uses timing gear", () => {
    expect(mechanism("oil_free_dry_screw")).toBe("twin_screw_dry_no_oil_contact_timing_gear");
  });
});

describe("bestUse", () => {
  it("oil injected variable for variable demand", () => {
    expect(bestUse("oil_injected_variable")).toBe("variable_demand_factory_air_energy_saving");
  });
});

describe("screwCompressorTypes", () => {
  it("returns 5 types", () => {
    expect(screwCompressorTypes()).toHaveLength(5);
  });
});
