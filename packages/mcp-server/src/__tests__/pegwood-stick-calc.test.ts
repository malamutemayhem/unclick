import { describe, it, expect } from "vitest";
import {
  cleanAbility, holeFit, durability, absorbency,
  stickCost, needsSharpening, forPivotHoles, woodHardness,
  bestUse, pegwoodSticks,
} from "../pegwood-stick-calc.js";

describe("cleanAbility", () => {
  it("boxwood round natural best cleaning", () => {
    expect(cleanAbility("boxwood_round_natural")).toBeGreaterThan(cleanAbility("sharpened_dowel_pine"));
  });
});

describe("holeFit", () => {
  it("boxwood round natural best hole fit", () => {
    expect(holeFit("boxwood_round_natural")).toBeGreaterThan(holeFit("elder_pith_soft"));
  });
});

describe("durability", () => {
  it("boxwood round natural most durable", () => {
    expect(durability("boxwood_round_natural")).toBeGreaterThan(durability("elder_pith_soft"));
  });
});

describe("absorbency", () => {
  it("elder pith soft most absorbent", () => {
    expect(absorbency("elder_pith_soft")).toBeGreaterThan(absorbency("bamboo_skewer_fine"));
  });
});

describe("stickCost", () => {
  it("boxwood round natural more expensive", () => {
    expect(stickCost("boxwood_round_natural")).toBeGreaterThan(stickCost("sharpened_dowel_pine"));
  });
});

describe("needsSharpening", () => {
  it("boxwood round natural needs sharpening", () => {
    expect(needsSharpening("boxwood_round_natural")).toBe(true);
  });
  it("orange stick pointed no sharpening needed", () => {
    expect(needsSharpening("orange_stick_pointed")).toBe(false);
  });
});

describe("forPivotHoles", () => {
  it("boxwood round natural for pivot holes", () => {
    expect(forPivotHoles("boxwood_round_natural")).toBe(true);
  });
  it("orange stick pointed not for pivot holes", () => {
    expect(forPivotHoles("orange_stick_pointed")).toBe(false);
  });
});

describe("woodHardness", () => {
  it("boxwood round natural is hard dense grain", () => {
    expect(woodHardness("boxwood_round_natural")).toBe("hard_dense_grain");
  });
});

describe("bestUse", () => {
  it("boxwood round natural best for pivot hole clean", () => {
    expect(bestUse("boxwood_round_natural")).toBe("pivot_hole_clean");
  });
});

describe("pegwoodSticks", () => {
  it("returns 5 types", () => {
    expect(pegwoodSticks()).toHaveLength(5);
  });
});
