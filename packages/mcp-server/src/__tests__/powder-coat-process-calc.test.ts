import { describe, it, expect } from "vitest";
import {
  thickness, uniformity, durability, speed,
  pcCost, noSolvent, forOutdoor, resin,
  bestUse, powderCoatProcessTypes,
} from "../powder-coat-process-calc.js";

describe("thickness", () => {
  it("fluidized bed thickest coat", () => {
    expect(thickness("fluidized_bed_dip")).toBeGreaterThan(thickness("tribocharge_friction_gun"));
  });
});

describe("uniformity", () => {
  it("tribocharge most uniform", () => {
    expect(uniformity("tribocharge_friction_gun")).toBeGreaterThan(uniformity("flame_spray_thermoplastic"));
  });
});

describe("durability", () => {
  it("fluidized bed most durable", () => {
    expect(durability("fluidized_bed_dip")).toBeGreaterThan(durability("tribocharge_friction_gun"));
  });
});

describe("speed", () => {
  it("electrostatic spray fastest", () => {
    expect(speed("electrostatic_spray_thermo")).toBeGreaterThan(speed("flame_spray_thermoplastic"));
  });
});

describe("pcCost", () => {
  it("flame spray more expensive than fluidized bed", () => {
    expect(pcCost("flame_spray_thermoplastic")).toBeGreaterThan(pcCost("fluidized_bed_dip"));
  });
});

describe("noSolvent", () => {
  it("all powder coat types are solvent free", () => {
    expect(noSolvent("electrostatic_spray_thermo")).toBe(true);
  });
  it("fluidized bed solvent free", () => {
    expect(noSolvent("fluidized_bed_dip")).toBe(true);
  });
});

describe("forOutdoor", () => {
  it("electrostatic spray for outdoor", () => {
    expect(forOutdoor("electrostatic_spray_thermo")).toBe(true);
  });
  it("flame spray not for outdoor", () => {
    expect(forOutdoor("flame_spray_thermoplastic")).toBe(false);
  });
});

describe("resin", () => {
  it("electrostatic spray uses polyester tgic", () => {
    expect(resin("electrostatic_spray_thermo")).toBe("polyester_tgic_superdurable");
  });
});

describe("bestUse", () => {
  it("tribocharge for complex faraday parts", () => {
    expect(bestUse("tribocharge_friction_gun")).toBe("faraday_cage_recess_complex_part");
  });
});

describe("powderCoatProcessTypes", () => {
  it("returns 5 types", () => {
    expect(powderCoatProcessTypes()).toHaveLength(5);
  });
});
