import { describe, it, expect } from "vitest";
import {
  warpDensityPerCm, weftPasses, colorChangesPerCm,
  reversible, textureRating, hoursPerM2,
  loomTypeRequired, durabilityRating, costPerM2, tapestryTechniques,
} from "../tapestry-weave-calc.js";

describe("warpDensityPerCm", () => {
  it("gobelin has highest density", () => {
    expect(warpDensityPerCm("gobelin")).toBeGreaterThan(
      warpDensityPerCm("navajo")
    );
  });
});

describe("weftPasses", () => {
  it("gobelin has most passes", () => {
    expect(weftPasses("gobelin")).toBeGreaterThan(
      weftPasses("kilim")
    );
  });
});

describe("colorChangesPerCm", () => {
  it("gobelin has most color changes", () => {
    expect(colorChangesPerCm("gobelin")).toBeGreaterThan(
      colorChangesPerCm("navajo")
    );
  });
});

describe("reversible", () => {
  it("kilim is reversible", () => {
    expect(reversible("kilim")).toBe(true);
  });
  it("gobelin is not", () => {
    expect(reversible("gobelin")).toBe(false);
  });
});

describe("textureRating", () => {
  it("soumak has most texture", () => {
    expect(textureRating("soumak")).toBeGreaterThan(
      textureRating("aubusson")
    );
  });
});

describe("hoursPerM2", () => {
  it("gobelin takes longest", () => {
    expect(hoursPerM2("gobelin")).toBeGreaterThan(
      hoursPerM2("kilim")
    );
  });
});

describe("loomTypeRequired", () => {
  it("gobelin uses high warp", () => {
    expect(loomTypeRequired("gobelin")).toBe("high_warp");
  });
});

describe("durabilityRating", () => {
  it("kilim is most durable", () => {
    expect(durabilityRating("kilim")).toBeGreaterThan(
      durabilityRating("soumak")
    );
  });
});

describe("costPerM2", () => {
  it("gobelin is most expensive", () => {
    expect(costPerM2("gobelin")).toBeGreaterThan(
      costPerM2("kilim")
    );
  });
});

describe("tapestryTechniques", () => {
  it("returns 5 techniques", () => {
    expect(tapestryTechniques()).toHaveLength(5);
  });
});
