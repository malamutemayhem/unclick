import { describe, it, expect } from "vitest";
import {
  quality, control, speed, versatility,
  twCost, autogenous, forThinWall, electrode,
  bestUse, tigWelderTypes,
} from "../tig-welder-calc.js";

describe("quality", () => {
  it("pulsed tig highest quality", () => {
    expect(quality("pulsed_tig_precision")).toBeGreaterThan(quality("hot_wire_tig_fast"));
  });
});

describe("control", () => {
  it("orbital tig best control", () => {
    expect(control("orbital_tig_tube")).toBeGreaterThan(control("hot_wire_tig_fast"));
  });
});

describe("speed", () => {
  it("hot wire tig fastest", () => {
    expect(speed("hot_wire_tig_fast")).toBeGreaterThan(speed("dc_tig_steel_standard"));
  });
});

describe("versatility", () => {
  it("dc tig most versatile", () => {
    expect(versatility("dc_tig_steel_standard")).toBeGreaterThan(versatility("orbital_tig_tube"));
  });
});

describe("twCost", () => {
  it("orbital tig most expensive", () => {
    expect(twCost("orbital_tig_tube")).toBeGreaterThan(twCost("dc_tig_steel_standard"));
  });
});

describe("autogenous", () => {
  it("dc tig can be autogenous", () => {
    expect(autogenous("dc_tig_steel_standard")).toBe(true);
  });
  it("ac tig not autogenous", () => {
    expect(autogenous("ac_tig_aluminum")).toBe(false);
  });
});

describe("forThinWall", () => {
  it("pulsed tig for thin wall", () => {
    expect(forThinWall("pulsed_tig_precision")).toBe(true);
  });
  it("hot wire not for thin wall", () => {
    expect(forThinWall("hot_wire_tig_fast")).toBe(false);
  });
});

describe("electrode", () => {
  it("orbital uses enclosed head", () => {
    expect(electrode("orbital_tig_tube")).toBe("enclosed_head_orbital_auto_rotation");
  });
});

describe("bestUse", () => {
  it("ac tig for aluminum aerospace", () => {
    expect(bestUse("ac_tig_aluminum")).toBe("aluminum_magnesium_oxide_clean_aerospace");
  });
});

describe("tigWelderTypes", () => {
  it("returns 5 types", () => {
    expect(tigWelderTypes()).toHaveLength(5);
  });
});
