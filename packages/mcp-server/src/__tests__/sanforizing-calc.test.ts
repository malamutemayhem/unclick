import { describe, it, expect } from "vitest";
import {
  shrinkageControl, fabricSpeed, fabricHand, dimensionalStability,
  szCost, heated, forKnit, mechanismConfig,
  bestUse, sanforizingTypes,
} from "../sanforizing-calc.js";

describe("shrinkageControl", () => {
  it("rubber belt best shrinkage control", () => {
    expect(shrinkageControl("rubber_belt")).toBeGreaterThan(shrinkageControl("steam_relaxation"));
  });
});

describe("fabricSpeed", () => {
  it("steam relaxation fastest fabric speed", () => {
    expect(fabricSpeed("steam_relaxation")).toBeGreaterThan(fabricSpeed("dual_shrinkage"));
  });
});

describe("fabricHand", () => {
  it("steam relaxation best fabric hand", () => {
    expect(fabricHand("steam_relaxation")).toBeGreaterThan(fabricHand("compressive_roll"));
  });
});

describe("dimensionalStability", () => {
  it("rubber belt best dimensional stability", () => {
    expect(dimensionalStability("rubber_belt")).toBeGreaterThan(dimensionalStability("steam_relaxation"));
  });
});

describe("szCost", () => {
  it("dual shrinkage most expensive", () => {
    expect(szCost("dual_shrinkage")).toBeGreaterThan(szCost("compressive_roll"));
  });
});

describe("heated", () => {
  it("rubber belt is heated", () => {
    expect(heated("rubber_belt")).toBe(true);
  });
  it("compressive roll not heated", () => {
    expect(heated("compressive_roll")).toBe(false);
  });
});

describe("forKnit", () => {
  it("felt blanket for knit", () => {
    expect(forKnit("felt_blanket")).toBe(true);
  });
  it("rubber belt not for knit", () => {
    expect(forKnit("rubber_belt")).toBe(false);
  });
});

describe("mechanismConfig", () => {
  it("steam relaxation uses conveyor steam chamber", () => {
    expect(mechanismConfig("steam_relaxation")).toBe("conveyor_steam_chamber_relax_tension_free_natural_shrinkage");
  });
});

describe("bestUse", () => {
  it("dual shrinkage for premium woven bidirectional", () => {
    expect(bestUse("dual_shrinkage")).toBe("premium_woven_twill_poplin_bidirectional_shrinkage_guarantee");
  });
});

describe("sanforizingTypes", () => {
  it("returns 5 types", () => {
    expect(sanforizingTypes()).toHaveLength(5);
  });
});
