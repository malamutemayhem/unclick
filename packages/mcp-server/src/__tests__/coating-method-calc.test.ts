import { describe, it, expect } from "vitest";
import {
  uniformity, speed, thickness, adhesion,
  cmCost, solventFree, forWaterproof, method,
  bestUse, coatingMethodTypes,
} from "../coating-method-calc.js";

describe("uniformity", () => {
  it("gravure best uniformity", () => {
    expect(uniformity("gravure_roller_cell")).toBeGreaterThan(uniformity("spray_coating_airless"));
  });
});

describe("speed", () => {
  it("gravure fastest", () => {
    expect(speed("gravure_roller_cell")).toBeGreaterThan(speed("spray_coating_airless"));
  });
});

describe("thickness", () => {
  it("knife over roll thickest coat", () => {
    expect(thickness("knife_over_roll")).toBeGreaterThan(thickness("gravure_roller_cell"));
  });
});

describe("adhesion", () => {
  it("lamination best adhesion", () => {
    expect(adhesion("lamination_adhesive_film")).toBeGreaterThan(adhesion("spray_coating_airless"));
  });
});

describe("cmCost", () => {
  it("gravure most expensive", () => {
    expect(cmCost("gravure_roller_cell")).toBeGreaterThan(cmCost("dip_coating_immersion"));
  });
});

describe("solventFree", () => {
  it("lamination is solvent free", () => {
    expect(solventFree("lamination_adhesive_film")).toBe(true);
  });
  it("dip coating not solvent free", () => {
    expect(solventFree("dip_coating_immersion")).toBe(false);
  });
});

describe("forWaterproof", () => {
  it("knife over roll for waterproof", () => {
    expect(forWaterproof("knife_over_roll")).toBe(true);
  });
  it("gravure not for waterproof", () => {
    expect(forWaterproof("gravure_roller_cell")).toBe(false);
  });
});

describe("method", () => {
  it("spray uses high pressure atomized", () => {
    expect(method("spray_coating_airless")).toBe("high_pressure_atomized_spray");
  });
});

describe("bestUse", () => {
  it("lamination best for outdoor jacket membrane", () => {
    expect(bestUse("lamination_adhesive_film")).toBe("outdoor_jacket_membrane_bonding");
  });
});

describe("coatingMethodTypes", () => {
  it("returns 5 types", () => {
    expect(coatingMethodTypes()).toHaveLength(5);
  });
});
