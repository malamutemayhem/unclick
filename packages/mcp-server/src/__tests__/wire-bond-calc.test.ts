import { describe, it, expect } from "vitest";
import {
  bondStrength, loopHeight, speed, currentCapacity,
  bondCost, oxidationRes, forPower, wireType,
  bestUse, wireBonds,
} from "../wire-bond-calc.js";

describe("bondStrength", () => {
  it("ribbon bond power strongest bond", () => {
    expect(bondStrength("ribbon_bond_power")).toBeGreaterThan(bondStrength("aluminum_wedge"));
  });
});

describe("loopHeight", () => {
  it("gold ball thermo highest loop", () => {
    expect(loopHeight("gold_ball_thermo")).toBeGreaterThan(loopHeight("ribbon_bond_power"));
  });
});

describe("speed", () => {
  it("gold ball thermo fastest bonding", () => {
    expect(speed("gold_ball_thermo")).toBeGreaterThan(speed("heavy_wire_al"));
  });
});

describe("currentCapacity", () => {
  it("heavy wire al highest current capacity", () => {
    expect(currentCapacity("heavy_wire_al")).toBeGreaterThan(currentCapacity("gold_ball_thermo"));
  });
});

describe("bondCost", () => {
  it("gold ball thermo most expensive", () => {
    expect(bondCost("gold_ball_thermo")).toBeGreaterThan(bondCost("aluminum_wedge"));
  });
});

describe("oxidationRes", () => {
  it("gold ball thermo is oxidation resistant", () => {
    expect(oxidationRes("gold_ball_thermo")).toBe(true);
  });
  it("aluminum wedge not oxidation resistant", () => {
    expect(oxidationRes("aluminum_wedge")).toBe(false);
  });
});

describe("forPower", () => {
  it("ribbon bond power is for power", () => {
    expect(forPower("ribbon_bond_power")).toBe(true);
  });
  it("gold ball thermo not for power", () => {
    expect(forPower("gold_ball_thermo")).toBe(false);
  });
});

describe("wireType", () => {
  it("heavy wire al uses al 300um wedge", () => {
    expect(wireType("heavy_wire_al")).toBe("al_300um_wedge");
  });
});

describe("bestUse", () => {
  it("gold ball thermo best for fine pitch ic packaging", () => {
    expect(bestUse("gold_ball_thermo")).toBe("fine_pitch_ic_packaging");
  });
});

describe("wireBonds", () => {
  it("returns 5 types", () => {
    expect(wireBonds()).toHaveLength(5);
  });
});
