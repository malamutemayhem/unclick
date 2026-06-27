import { describe, it, expect } from "vitest";
import {
  penetrationDepth, dryTimeMinutes, colorFastness,
  uvResistance, evenCoverage, multicoatNeeded,
  bestFinish, toxicFumes, costPerLiter, leatherDyes,
} from "../leather-dye-calc.js";

describe("penetrationDepth", () => {
  it("aniline penetrates deepest", () => {
    expect(penetrationDepth("aniline")).toBeGreaterThan(
      penetrationDepth("antique")
    );
  });
});

describe("dryTimeMinutes", () => {
  it("oil takes longest to dry", () => {
    expect(dryTimeMinutes("oil")).toBeGreaterThan(
      dryTimeMinutes("spirit")
    );
  });
});

describe("colorFastness", () => {
  it("aniline has best color fastness", () => {
    expect(colorFastness("aniline")).toBeGreaterThan(
      colorFastness("water")
    );
  });
});

describe("uvResistance", () => {
  it("antique has best UV resistance", () => {
    expect(uvResistance("antique")).toBeGreaterThan(
      uvResistance("water")
    );
  });
});

describe("evenCoverage", () => {
  it("aniline gives most even coverage", () => {
    expect(evenCoverage("aniline")).toBeGreaterThan(
      evenCoverage("antique")
    );
  });
});

describe("multicoatNeeded", () => {
  it("water dye needs multiple coats", () => {
    expect(multicoatNeeded("water")).toBe(true);
  });
  it("aniline does not", () => {
    expect(multicoatNeeded("aniline")).toBe(false);
  });
});

describe("bestFinish", () => {
  it("aniline pairs with resolene", () => {
    expect(bestFinish("aniline")).toBe("resolene");
  });
});

describe("toxicFumes", () => {
  it("aniline has toxic fumes", () => {
    expect(toxicFumes("aniline")).toBe(true);
  });
  it("water does not", () => {
    expect(toxicFumes("water")).toBe(false);
  });
});

describe("costPerLiter", () => {
  it("aniline costs most", () => {
    expect(costPerLiter("aniline")).toBeGreaterThan(
      costPerLiter("water")
    );
  });
});

describe("leatherDyes", () => {
  it("returns 5 dyes", () => {
    expect(leatherDyes()).toHaveLength(5);
  });
});
