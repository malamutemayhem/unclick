import { describe, it, expect } from "vitest";
import {
  containment, cleanability, throttling, pressureLimit,
  dvCost, zeroDeadLeg, forPharma, diaphragm,
  bestUse, diaphragmValveTypes,
} from "../diaphragm-valve-calc.js";

describe("containment", () => {
  it("zero dead leg and lined best containment", () => {
    expect(containment("zero_dead_leg_aseptic")).toBeGreaterThan(containment("straight_through_full"));
  });
});

describe("cleanability", () => {
  it("zero dead leg best cleanability", () => {
    expect(cleanability("zero_dead_leg_aseptic")).toBeGreaterThan(cleanability("lined_corrosive_chem"));
  });
});

describe("throttling", () => {
  it("weir type best throttling", () => {
    expect(throttling("weir_type_standard")).toBeGreaterThan(throttling("straight_through_full"));
  });
});

describe("pressureLimit", () => {
  it("lined corrosive highest pressure limit", () => {
    expect(pressureLimit("lined_corrosive_chem")).toBeGreaterThan(pressureLimit("zero_dead_leg_aseptic"));
  });
});

describe("dvCost", () => {
  it("zero dead leg most expensive", () => {
    expect(dvCost("zero_dead_leg_aseptic")).toBeGreaterThan(dvCost("weir_type_standard"));
  });
});

describe("zeroDeadLeg", () => {
  it("zero dead leg aseptic is zero dead leg", () => {
    expect(zeroDeadLeg("zero_dead_leg_aseptic")).toBe(true);
  });
  it("weir type not zero dead leg", () => {
    expect(zeroDeadLeg("weir_type_standard")).toBe(false);
  });
});

describe("forPharma", () => {
  it("weir type for pharma", () => {
    expect(forPharma("weir_type_standard")).toBe(true);
  });
  it("lined corrosive not for pharma", () => {
    expect(forPharma("lined_corrosive_chem")).toBe(false);
  });
});

describe("diaphragm", () => {
  it("multi port uses manifold block", () => {
    expect(diaphragm("multi_port_block_body")).toBe("multi_port_manifold_block_reduce_weld");
  });
});

describe("bestUse", () => {
  it("zero dead leg for pharma wfi", () => {
    expect(bestUse("zero_dead_leg_aseptic")).toBe("pharma_wfi_pure_steam_aseptic_point");
  });
});

describe("diaphragmValveTypes", () => {
  it("returns 5 types", () => {
    expect(diaphragmValveTypes()).toHaveLength(5);
  });
});
