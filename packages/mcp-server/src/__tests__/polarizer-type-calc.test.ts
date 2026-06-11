import { describe, it, expect } from "vitest";
import {
  extinction, transmission, damage, acceptance,
  plCost, tunable, forLaser, mechanism,
  bestUse, polarizerTypes,
} from "../polarizer-type-calc.js";

describe("extinction", () => {
  it("calcite glan thompson best extinction", () => {
    expect(extinction("calcite_glan_thompson")).toBeGreaterThan(extinction("sheet_dichroic_film"));
  });
});

describe("transmission", () => {
  it("brewster angle best transmission", () => {
    expect(transmission("brewster_angle_plate")).toBeGreaterThan(transmission("liquid_crystal_variable"));
  });
});

describe("damage", () => {
  it("brewster angle best damage threshold", () => {
    expect(damage("brewster_angle_plate")).toBeGreaterThan(damage("sheet_dichroic_film"));
  });
});

describe("acceptance", () => {
  it("sheet dichroic widest acceptance", () => {
    expect(acceptance("sheet_dichroic_film")).toBeGreaterThan(acceptance("brewster_angle_plate"));
  });
});

describe("plCost", () => {
  it("calcite most expensive", () => {
    expect(plCost("calcite_glan_thompson")).toBeGreaterThan(plCost("sheet_dichroic_film"));
  });
});

describe("tunable", () => {
  it("liquid crystal is tunable", () => {
    expect(tunable("liquid_crystal_variable")).toBe(true);
  });
  it("sheet dichroic not tunable", () => {
    expect(tunable("sheet_dichroic_film")).toBe(false);
  });
});

describe("forLaser", () => {
  it("calcite for laser", () => {
    expect(forLaser("calcite_glan_thompson")).toBe(true);
  });
  it("sheet dichroic not for laser", () => {
    expect(forLaser("sheet_dichroic_film")).toBe(false);
  });
});

describe("mechanism", () => {
  it("wire grid uses sub wavelength grating", () => {
    expect(mechanism("wire_grid_metallic")).toBe("sub_wavelength_metal_grating");
  });
});

describe("bestUse", () => {
  it("liquid crystal best for polarization microscopy", () => {
    expect(bestUse("liquid_crystal_variable")).toBe("polarization_microscopy_imaging");
  });
});

describe("polarizerTypes", () => {
  it("returns 5 types", () => {
    expect(polarizerTypes()).toHaveLength(5);
  });
});
