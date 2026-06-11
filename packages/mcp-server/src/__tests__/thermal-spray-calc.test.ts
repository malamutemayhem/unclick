import { describe, it, expect } from "vitest";
import {
  adhesion, density, temperature, speed,
  tsCost, lowHeat, forWearResist, feedstock,
  bestUse, thermalSprayTypes,
} from "../thermal-spray-calc.js";

describe("adhesion", () => {
  it("hvof best adhesion", () => {
    expect(adhesion("hvof_high_velocity")).toBeGreaterThan(adhesion("flame_spray_wire"));
  });
});

describe("density", () => {
  it("hvof densest coating", () => {
    expect(density("hvof_high_velocity")).toBeGreaterThan(density("flame_spray_wire"));
  });
});

describe("temperature", () => {
  it("cold spray least heat input", () => {
    expect(temperature("cold_spray_kinetic")).toBeGreaterThan(temperature("plasma_arc_spray"));
  });
});

describe("speed", () => {
  it("electric arc fastest", () => {
    expect(speed("electric_arc_twin_wire")).toBeGreaterThan(speed("cold_spray_kinetic"));
  });
});

describe("tsCost", () => {
  it("hvof most expensive", () => {
    expect(tsCost("hvof_high_velocity")).toBeGreaterThan(tsCost("flame_spray_wire"));
  });
});

describe("lowHeat", () => {
  it("cold spray is low heat", () => {
    expect(lowHeat("cold_spray_kinetic")).toBe(true);
  });
  it("plasma not low heat", () => {
    expect(lowHeat("plasma_arc_spray")).toBe(false);
  });
});

describe("forWearResist", () => {
  it("hvof for wear resist", () => {
    expect(forWearResist("hvof_high_velocity")).toBe(true);
  });
  it("flame spray not wear resist", () => {
    expect(forWearResist("flame_spray_wire")).toBe(false);
  });
});

describe("feedstock", () => {
  it("cold spray uses supersonic gas", () => {
    expect(feedstock("cold_spray_kinetic")).toBe("metal_powder_supersonic_gas");
  });
});

describe("bestUse", () => {
  it("hvof for landing gear", () => {
    expect(bestUse("hvof_high_velocity")).toBe("wear_resistant_landing_gear");
  });
});

describe("thermalSprayTypes", () => {
  it("returns 5 types", () => {
    expect(thermalSprayTypes()).toHaveLength(5);
  });
});
