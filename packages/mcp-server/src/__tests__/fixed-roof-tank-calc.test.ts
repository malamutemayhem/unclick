import { describe, it, expect } from "vitest";
import {
  pressureRating, capacity, simplicity, vaporControl,
  fxCost, inertBlanketed, forNonVolatile, construction,
  bestUse, fixedRoofTankTypes,
} from "../fixed-roof-tank-calc.js";

describe("pressureRating", () => {
  it("dome roof highest pressure rating", () => {
    expect(pressureRating("dome_roof_pressure")).toBeGreaterThan(pressureRating("cone_roof_standard"));
  });
});

describe("capacity", () => {
  it("flat roof highest capacity", () => {
    expect(capacity("flat_roof_low_press")).toBeGreaterThan(capacity("nitrogen_blanketed"));
  });
});

describe("simplicity", () => {
  it("cone roof simplest", () => {
    expect(simplicity("cone_roof_standard")).toBeGreaterThan(simplicity("nitrogen_blanketed"));
  });
});

describe("vaporControl", () => {
  it("nitrogen blanketed best vapor control", () => {
    expect(vaporControl("nitrogen_blanketed")).toBeGreaterThan(vaporControl("cone_roof_standard"));
  });
});

describe("fxCost", () => {
  it("dome roof most expensive", () => {
    expect(fxCost("dome_roof_pressure")).toBeGreaterThan(fxCost("flat_roof_low_press"));
  });
});

describe("inertBlanketed", () => {
  it("nitrogen blanketed is inert", () => {
    expect(inertBlanketed("nitrogen_blanketed")).toBe(true);
  });
  it("cone roof not inert", () => {
    expect(inertBlanketed("cone_roof_standard")).toBe(false);
  });
});

describe("forNonVolatile", () => {
  it("cone roof for non volatile", () => {
    expect(forNonVolatile("cone_roof_standard")).toBe(true);
  });
  it("dome roof not for non volatile", () => {
    expect(forNonVolatile("dome_roof_pressure")).toBe(false);
  });
});

describe("construction", () => {
  it("umbrella roof uses self supporting curved", () => {
    expect(construction("umbrella_roof_self")).toBe("self_supporting_umbrella_curved_roof_no_column");
  });
});

describe("bestUse", () => {
  it("nitrogen blanketed for solvent resin", () => {
    expect(bestUse("nitrogen_blanketed")).toBe("solvent_resin_oxidation_sensitive_inert_blanket");
  });
});

describe("fixedRoofTankTypes", () => {
  it("returns 5 types", () => {
    expect(fixedRoofTankTypes()).toHaveLength(5);
  });
});
