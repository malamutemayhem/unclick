import { describe, it, expect } from "vitest";
import {
  controlRange, cleanability, corrosionResist, leakIntegrity,
  dvCost, zeroDead, forBioprocess, diaphragm,
  bestUse, diaphragmValveControlTypes,
} from "../diaphragm-valve-control-calc.js";

describe("controlRange", () => {
  it("weir type best control range", () => {
    expect(controlRange("weir_type_standard")).toBeGreaterThan(controlRange("straight_through_full"));
  });
});

describe("cleanability", () => {
  it("straight through best cleanability", () => {
    expect(cleanability("straight_through_full")).toBeGreaterThanOrEqual(cleanability("zero_dead_leg_tee"));
  });
});

describe("corrosionResist", () => {
  it("all diaphragm valves high corrosion resist", () => {
    expect(corrosionResist("weir_type_standard")).toBeGreaterThanOrEqual(9);
  });
});

describe("leakIntegrity", () => {
  it("aseptic steam barrier best leak integrity", () => {
    expect(leakIntegrity("aseptic_steam_barrier")).toBeGreaterThan(leakIntegrity("straight_through_full"));
  });
});

describe("dvCost", () => {
  it("aseptic steam barrier most expensive", () => {
    expect(dvCost("aseptic_steam_barrier")).toBeGreaterThan(dvCost("weir_type_standard"));
  });
});

describe("zeroDead", () => {
  it("zero dead leg tee has zero dead", () => {
    expect(zeroDead("zero_dead_leg_tee")).toBe(true);
  });
  it("weir type not zero dead", () => {
    expect(zeroDead("weir_type_standard")).toBe(false);
  });
});

describe("forBioprocess", () => {
  it("all types for bioprocess", () => {
    expect(forBioprocess("weir_type_standard")).toBe(true);
  });
});

describe("diaphragm", () => {
  it("multiport uses multi port block body", () => {
    expect(diaphragm("multiport_block_body")).toBe("multi_port_block_body_integrated_manifold");
  });
});

describe("bestUse", () => {
  it("zero dead leg for bioreactor sampling", () => {
    expect(bestUse("zero_dead_leg_tee")).toBe("bioreactor_sampling_zero_dead_leg_sterile");
  });
});

describe("diaphragmValveControlTypes", () => {
  it("returns 5 types", () => {
    expect(diaphragmValveControlTypes()).toHaveLength(5);
  });
});
