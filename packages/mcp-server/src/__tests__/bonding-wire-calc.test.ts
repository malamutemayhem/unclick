import { describe, it, expect } from "vitest";
import {
  conductivity, bondStrength, loopHeight, speed,
  bwCost, oxidationResist, forPower, material,
  bestUse, bondingWires,
} from "../bonding-wire-calc.js";

describe("conductivity", () => {
  it("copper ball bond highest conductivity", () => {
    expect(conductivity("copper_ball_bond")).toBeGreaterThan(conductivity("aluminum_wedge"));
  });
});

describe("bondStrength", () => {
  it("gold ball bond strongest bond", () => {
    expect(bondStrength("gold_ball_bond")).toBeGreaterThan(bondStrength("aluminum_wedge"));
  });
});

describe("loopHeight", () => {
  it("gold ball bond highest loop", () => {
    expect(loopHeight("gold_ball_bond")).toBeGreaterThan(loopHeight("ribbon_power"));
  });
});

describe("speed", () => {
  it("gold ball bond fastest bonding", () => {
    expect(speed("gold_ball_bond")).toBeGreaterThan(speed("ribbon_power"));
  });
});

describe("bwCost", () => {
  it("gold ball bond most expensive", () => {
    expect(bwCost("gold_ball_bond")).toBeGreaterThan(bwCost("copper_ball_bond"));
  });
});

describe("oxidationResist", () => {
  it("gold ball bond is oxidation resistant", () => {
    expect(oxidationResist("gold_ball_bond")).toBe(true);
  });
  it("copper ball bond not oxidation resistant", () => {
    expect(oxidationResist("copper_ball_bond")).toBe(false);
  });
});

describe("forPower", () => {
  it("ribbon power for power", () => {
    expect(forPower("ribbon_power")).toBe(true);
  });
  it("gold ball bond not for power", () => {
    expect(forPower("gold_ball_bond")).toBe(false);
  });
});

describe("material", () => {
  it("ribbon power uses al ribbon 2mm wide", () => {
    expect(material("ribbon_power")).toBe("al_ribbon_2mm_wide");
  });
});

describe("bestUse", () => {
  it("copper ball bond best for high volume consumer", () => {
    expect(bestUse("copper_ball_bond")).toBe("high_volume_consumer");
  });
});

describe("bondingWires", () => {
  it("returns 5 types", () => {
    expect(bondingWires()).toHaveLength(5);
  });
});
