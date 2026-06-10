import { describe, it, expect } from "vitest";
import {
  sweepPower, fineDebris, durability, cornerReach,
  broomCost, washable, needsPower, bristleType,
  bestSurface, brooms,
} from "../broom-calc.js";

describe("sweepPower", () => {
  it("electric sweeper cordless most sweep power", () => {
    expect(sweepPower("electric_sweeper_cordless")).toBeGreaterThan(sweepPower("corn_straw_traditional"));
  });
});

describe("fineDebris", () => {
  it("electric sweeper cordless best fine debris", () => {
    expect(fineDebris("electric_sweeper_cordless")).toBeGreaterThan(fineDebris("push_broom_wide"));
  });
});

describe("durability", () => {
  it("rubber bristle pet most durable", () => {
    expect(durability("rubber_bristle_pet")).toBeGreaterThan(durability("corn_straw_traditional"));
  });
});

describe("cornerReach", () => {
  it("angle cut indoor best corner reach", () => {
    expect(cornerReach("angle_cut_indoor")).toBeGreaterThan(cornerReach("push_broom_wide"));
  });
});

describe("broomCost", () => {
  it("electric sweeper cordless most expensive", () => {
    expect(broomCost("electric_sweeper_cordless")).toBeGreaterThan(broomCost("corn_straw_traditional"));
  });
});

describe("washable", () => {
  it("angle cut indoor is washable", () => {
    expect(washable("angle_cut_indoor")).toBe(true);
  });
  it("corn straw traditional is not", () => {
    expect(washable("corn_straw_traditional")).toBe(false);
  });
});

describe("needsPower", () => {
  it("electric sweeper cordless needs power", () => {
    expect(needsPower("electric_sweeper_cordless")).toBe(true);
  });
  it("angle cut indoor does not", () => {
    expect(needsPower("angle_cut_indoor")).toBe(false);
  });
});

describe("bristleType", () => {
  it("rubber bristle pet uses natural rubber electrostatic", () => {
    expect(bristleType("rubber_bristle_pet")).toBe("natural_rubber_electrostatic");
  });
});

describe("bestSurface", () => {
  it("angle cut indoor best for kitchen hardwood tile", () => {
    expect(bestSurface("angle_cut_indoor")).toBe("kitchen_hardwood_tile");
  });
});

describe("brooms", () => {
  it("returns 5 types", () => {
    expect(brooms()).toHaveLength(5);
  });
});
