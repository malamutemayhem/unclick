import { describe, it, expect } from "vitest";
import {
  thickness, speed, portability, operatingCost,
  ofCost, portable, forHeavyPlate, fuel,
  bestUse, oxyFuelCutTypes,
} from "../oxy-fuel-cut-calc.js";

describe("thickness", () => {
  it("oxy natural gas heaviest capacity", () => {
    expect(thickness("oxy_natural_gas_heavy")).toBeGreaterThan(thickness("oxy_acetylene_manual"));
  });
});

describe("speed", () => {
  it("multi-torch fastest", () => {
    expect(speed("multi_torch_plate_nest")).toBeGreaterThan(speed("oxy_acetylene_manual"));
  });
});

describe("portability", () => {
  it("oxy acetylene most portable", () => {
    expect(portability("oxy_acetylene_manual")).toBeGreaterThan(portability("multi_torch_plate_nest"));
  });
});

describe("operatingCost", () => {
  it("acetylene higher operating cost than natural gas", () => {
    expect(operatingCost("oxy_acetylene_manual")).toBeGreaterThan(operatingCost("oxy_natural_gas_heavy"));
  });
});

describe("ofCost", () => {
  it("multi-torch most expensive", () => {
    expect(ofCost("multi_torch_plate_nest")).toBeGreaterThan(ofCost("oxy_acetylene_manual"));
  });
});

describe("portable", () => {
  it("oxy acetylene is portable", () => {
    expect(portable("oxy_acetylene_manual")).toBe(true);
  });
  it("multi-torch not portable", () => {
    expect(portable("multi_torch_plate_nest")).toBe(false);
  });
});

describe("forHeavyPlate", () => {
  it("oxy natural gas for heavy plate", () => {
    expect(forHeavyPlate("oxy_natural_gas_heavy")).toBe(true);
  });
  it("oxy acetylene not for heavy plate", () => {
    expect(forHeavyPlate("oxy_acetylene_manual")).toBe(false);
  });
});

describe("fuel", () => {
  it("oxy natural gas uses methane", () => {
    expect(fuel("oxy_natural_gas_heavy")).toBe("natural_gas_methane_ch4_oxygen");
  });
});

describe("bestUse", () => {
  it("multi-torch for plate nest batch", () => {
    expect(bestUse("multi_torch_plate_nest")).toBe("plate_nest_high_volume_batch");
  });
});

describe("oxyFuelCutTypes", () => {
  it("returns 5 types", () => {
    expect(oxyFuelCutTypes()).toHaveLength(5);
  });
});
