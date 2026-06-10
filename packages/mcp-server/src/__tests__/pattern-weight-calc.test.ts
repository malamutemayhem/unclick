import { describe, it, expect } from "vitest";
import {
  holdForce, fabricSafe, stackable, gripBase,
  weightCost, magnetic, conforming, baseMaterial,
  bestUse, patternWeights,
} from "../pattern-weight-calc.js";

describe("holdForce", () => {
  it("magnetic strip hold strongest hold", () => {
    expect(holdForce("magnetic_strip_hold")).toBeGreaterThan(holdForce("stone_polished_round"));
  });
});

describe("fabricSafe", () => {
  it("stone polished round most fabric safe", () => {
    expect(fabricSafe("stone_polished_round")).toBeGreaterThan(fabricSafe("magnetic_strip_hold"));
  });
});

describe("stackable", () => {
  it("steel disc flat most stackable", () => {
    expect(stackable("steel_disc_flat")).toBeGreaterThan(stackable("lead_shot_bag"));
  });
});

describe("gripBase", () => {
  it("lead shot bag best grip base", () => {
    expect(gripBase("lead_shot_bag")).toBeGreaterThan(gripBase("stone_polished_round"));
  });
});

describe("weightCost", () => {
  it("magnetic strip hold more expensive", () => {
    expect(weightCost("magnetic_strip_hold")).toBeGreaterThan(weightCost("steel_disc_flat"));
  });
});

describe("magnetic", () => {
  it("magnetic strip hold is magnetic", () => {
    expect(magnetic("magnetic_strip_hold")).toBe(true);
  });
  it("steel disc flat not magnetic", () => {
    expect(magnetic("steel_disc_flat")).toBe(false);
  });
});

describe("conforming", () => {
  it("lead shot bag is conforming", () => {
    expect(conforming("lead_shot_bag")).toBe(true);
  });
  it("steel disc flat not conforming", () => {
    expect(conforming("steel_disc_flat")).toBe(false);
  });
});

describe("baseMaterial", () => {
  it("steel disc flat uses chrome plated steel", () => {
    expect(baseMaterial("steel_disc_flat")).toBe("chrome_plated_steel");
  });
});

describe("bestUse", () => {
  it("lead shot bag best for curved fabric hold", () => {
    expect(bestUse("lead_shot_bag")).toBe("curved_fabric_hold");
  });
});

describe("patternWeights", () => {
  it("returns 5 types", () => {
    expect(patternWeights()).toHaveLength(5);
  });
});
