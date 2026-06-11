import { describe, it, expect } from "vitest";
import {
  temperature, uniformity, cleanProcess, throughput,
  vfCost, oxFree, forAerospace, heating,
  bestUse, vacuumFurnaceTypes,
} from "../vacuum-furnace-calc.js";

describe("temperature", () => {
  it("vertical bottom load highest temperature", () => {
    expect(temperature("vertical_bottom_load")).toBeGreaterThan(temperature("vacuum_brazing"));
  });
});

describe("uniformity", () => {
  it("vacuum brazing best uniformity", () => {
    expect(uniformity("vacuum_brazing")).toBeGreaterThan(uniformity("vacuum_oil_quench"));
  });
});

describe("cleanProcess", () => {
  it("vacuum brazing and gas quench cleanest process", () => {
    expect(cleanProcess("vacuum_brazing")).toBeGreaterThan(cleanProcess("vacuum_oil_quench"));
    expect(cleanProcess("vacuum_gas_quench")).toBeGreaterThan(cleanProcess("vacuum_oil_quench"));
  });
});

describe("throughput", () => {
  it("vacuum oil quench highest throughput", () => {
    expect(throughput("vacuum_oil_quench")).toBeGreaterThan(throughput("vacuum_brazing"));
  });
});

describe("vfCost", () => {
  it("vacuum brazing most expensive", () => {
    expect(vfCost("vacuum_brazing")).toBeGreaterThan(vfCost("horizontal_hot_wall"));
  });
});

describe("oxFree", () => {
  it("all types are oxidation free", () => {
    expect(oxFree("horizontal_hot_wall")).toBe(true);
    expect(oxFree("vacuum_brazing")).toBe(true);
  });
});

describe("forAerospace", () => {
  it("vertical bottom load for aerospace", () => {
    expect(forAerospace("vertical_bottom_load")).toBe(true);
  });
  it("vacuum oil quench not for aerospace", () => {
    expect(forAerospace("vacuum_oil_quench")).toBe(false);
  });
});

describe("heating", () => {
  it("vacuum brazing uses all metal hot zone", () => {
    expect(heating("vacuum_brazing")).toBe("all_metal_hot_zone_high_vacuum_braze_filler_flow_capillary");
  });
});

describe("bestUse", () => {
  it("vacuum gas quench for die mold tool", () => {
    expect(bestUse("vacuum_gas_quench")).toBe("die_mold_tool_bright_hardening_no_distortion_gas_quench");
  });
});

describe("vacuumFurnaceTypes", () => {
  it("returns 5 types", () => {
    expect(vacuumFurnaceTypes()).toHaveLength(5);
  });
});
