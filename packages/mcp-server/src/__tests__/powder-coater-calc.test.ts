import { describe, it, expect } from "vitest";
import {
  coatUniformity, throughput, filmThickness, adhesion,
  pcCost, thick, forMetal, coaterConfig,
  bestUse, powderCoaterTypes,
} from "../powder-coater-calc.js";

describe("coatUniformity", () => {
  it("electrophoretic best coat uniformity", () => {
    expect(coatUniformity("electrophoretic")).toBeGreaterThan(coatUniformity("flame_spray"));
  });
});

describe("throughput", () => {
  it("electrostatic spray highest throughput", () => {
    expect(throughput("electrostatic_spray")).toBeGreaterThan(throughput("flame_spray"));
  });
});

describe("filmThickness", () => {
  it("fluidized bed best film thickness", () => {
    expect(filmThickness("fluidized_bed")).toBeGreaterThan(filmThickness("electrophoretic"));
  });
});

describe("adhesion", () => {
  it("electrophoretic best adhesion", () => {
    expect(adhesion("electrophoretic")).toBeGreaterThan(adhesion("flame_spray"));
  });
});

describe("pcCost", () => {
  it("electrophoretic most expensive", () => {
    expect(pcCost("electrophoretic")).toBeGreaterThan(pcCost("fluidized_bed"));
  });
});

describe("thick", () => {
  it("fluidized bed is thick", () => {
    expect(thick("fluidized_bed")).toBe(true);
  });
  it("electrostatic spray not thick", () => {
    expect(thick("electrostatic_spray")).toBe(false);
  });
});

describe("forMetal", () => {
  it("electrostatic spray for metal", () => {
    expect(forMetal("electrostatic_spray")).toBe(true);
  });
});

describe("coaterConfig", () => {
  it("tribostatic gun uses friction charge no ion faraday reach", () => {
    expect(coaterConfig("tribostatic_gun")).toBe("tribostatic_powder_coater_friction_charge_no_ion_faraday_reach");
  });
});

describe("bestUse", () => {
  it("electrophoretic for auto body e coat dip primer", () => {
    expect(bestUse("electrophoretic")).toBe("auto_body_electrophoretic_powder_coater_e_coat_dip_primer");
  });
});

describe("powderCoaterTypes", () => {
  it("returns 5 types", () => {
    expect(powderCoaterTypes()).toHaveLength(5);
  });
});
