import { describe, it, expect } from "vitest";
import {
  iaq, comfort, energy, noise,
  dvCost, stratified, forAtrium, delivery,
  bestUse, displacementVentTypes,
} from "../displacement-vent-calc.js";

describe("iaq", () => {
  it("wall unit best iaq", () => {
    expect(iaq("wall_displacement_unit")).toBeGreaterThan(iaq("fabric_duct_low_velocity"));
  });
});

describe("comfort", () => {
  it("chilled beam best comfort", () => {
    expect(comfort("chilled_beam_displacement")).toBeGreaterThan(comfort("fabric_duct_low_velocity"));
  });
});

describe("energy", () => {
  it("chilled beam best energy", () => {
    expect(energy("chilled_beam_displacement")).toBeGreaterThan(energy("fabric_duct_low_velocity"));
  });
});

describe("noise", () => {
  it("fabric duct quietest", () => {
    expect(noise("fabric_duct_low_velocity")).toBeGreaterThan(noise("underfloor_plenum_supply"));
  });
});

describe("dvCost", () => {
  it("chilled beam most expensive", () => {
    expect(dvCost("chilled_beam_displacement")).toBeGreaterThan(dvCost("fabric_duct_low_velocity"));
  });
});

describe("stratified", () => {
  it("floor swirl is stratified", () => {
    expect(stratified("floor_swirl_diffuser")).toBe(true);
  });
  it("fabric duct not stratified", () => {
    expect(stratified("fabric_duct_low_velocity")).toBe(false);
  });
});

describe("forAtrium", () => {
  it("wall unit for atrium", () => {
    expect(forAtrium("wall_displacement_unit")).toBe(true);
  });
  it("floor swirl not atrium", () => {
    expect(forAtrium("floor_swirl_diffuser")).toBe(false);
  });
});

describe("delivery", () => {
  it("fabric uses porous duct", () => {
    expect(delivery("fabric_duct_low_velocity")).toBe("porous_fabric_duct_full_length");
  });
});

describe("bestUse", () => {
  it("wall unit for theater", () => {
    expect(bestUse("wall_displacement_unit")).toBe("theater_auditorium_lecture_hall");
  });
});

describe("displacementVentTypes", () => {
  it("returns 5 types", () => {
    expect(displacementVentTypes()).toHaveLength(5);
  });
});
