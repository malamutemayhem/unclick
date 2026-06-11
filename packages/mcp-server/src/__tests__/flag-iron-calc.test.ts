import { describe, it, expect } from "vitest";
import {
  sealQuality, heatRetain, controlFeel, reachDepth,
  ironCost, heated, forTight, tipShape,
  bestUse, flagIrons,
} from "../flag-iron-calc.js";

describe("sealQuality", () => {
  it("curved barrel follow best seal quality", () => {
    expect(sealQuality("curved_barrel_follow")).toBeGreaterThan(sealQuality("wide_spread_cover"));
  });
});

describe("heatRetain", () => {
  it("electric heat modern best heat retain", () => {
    expect(heatRetain("electric_heat_modern")).toBeGreaterThan(heatRetain("narrow_tight_joint"));
  });
});

describe("controlFeel", () => {
  it("narrow tight joint best control feel", () => {
    expect(controlFeel("narrow_tight_joint")).toBeGreaterThan(controlFeel("electric_heat_modern"));
  });
});

describe("reachDepth", () => {
  it("narrow tight joint best reach depth", () => {
    expect(reachDepth("narrow_tight_joint")).toBeGreaterThan(reachDepth("wide_spread_cover"));
  });
});

describe("ironCost", () => {
  it("electric heat modern most expensive", () => {
    expect(ironCost("electric_heat_modern")).toBeGreaterThan(ironCost("straight_flat_standard"));
  });
});

describe("heated", () => {
  it("electric heat modern is heated", () => {
    expect(heated("electric_heat_modern")).toBe(true);
  });
  it("straight flat standard not heated", () => {
    expect(heated("straight_flat_standard")).toBe(false);
  });
});

describe("forTight", () => {
  it("narrow tight joint is for tight", () => {
    expect(forTight("narrow_tight_joint")).toBe(true);
  });
  it("straight flat standard not for tight", () => {
    expect(forTight("straight_flat_standard")).toBe(false);
  });
});

describe("tipShape", () => {
  it("wide spread cover uses wide flat spread", () => {
    expect(tipShape("wide_spread_cover")).toBe("wide_flat_spread");
  });
});

describe("bestUse", () => {
  it("electric heat modern best for consistent heat seal", () => {
    expect(bestUse("electric_heat_modern")).toBe("consistent_heat_seal");
  });
});

describe("flagIrons", () => {
  it("returns 5 types", () => {
    expect(flagIrons()).toHaveLength(5);
  });
});
