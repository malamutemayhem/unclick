import { describe, it, expect } from "vitest";
import {
  diameterMm, burnPoolDiameterCm, trimLengthMm, mushroomingRisk,
  sootLevel, crackleEffect, selfTrimming, burnRateRating,
  costPerMeter, wickMaterials,
} from "../wick-sizing-calc.js";

describe("diameterMm", () => {
  it("larger container needs thicker wick", () => {
    expect(diameterMm(10)).toBeGreaterThan(diameterMm(5));
  });
});

describe("burnPoolDiameterCm", () => {
  it("thicker wick makes larger pool", () => {
    expect(burnPoolDiameterCm(3)).toBeGreaterThan(burnPoolDiameterCm(1));
  });
});

describe("trimLengthMm", () => {
  it("hemp needs longest trim", () => {
    expect(trimLengthMm("hemp")).toBeGreaterThan(
      trimLengthMm("wood_wick")
    );
  });
});

describe("mushroomingRisk", () => {
  it("zinc core mushrooms most", () => {
    expect(mushroomingRisk("zinc_core")).toBeGreaterThan(
      mushroomingRisk("wood_wick")
    );
  });
});

describe("sootLevel", () => {
  it("wood wick has least soot", () => {
    expect(sootLevel("wood_wick")).toBeLessThan(sootLevel("zinc_core"));
  });
});

describe("crackleEffect", () => {
  it("wood wick crackles", () => {
    expect(crackleEffect("wood_wick")).toBe(true);
  });
  it("cotton does not crackle", () => {
    expect(crackleEffect("cotton_braided")).toBe(false);
  });
});

describe("selfTrimming", () => {
  it("cotton braided self-trims", () => {
    expect(selfTrimming("cotton_braided")).toBe(true);
  });
  it("wood wick does not self-trim", () => {
    expect(selfTrimming("wood_wick")).toBe(false);
  });
});

describe("burnRateRating", () => {
  it("zinc core burns fastest", () => {
    expect(burnRateRating("zinc_core")).toBeGreaterThan(
      burnRateRating("hemp")
    );
  });
});

describe("costPerMeter", () => {
  it("wood wick is most expensive", () => {
    expect(costPerMeter("wood_wick")).toBeGreaterThan(
      costPerMeter("cotton_braided")
    );
  });
});

describe("wickMaterials", () => {
  it("returns 5 materials", () => {
    expect(wickMaterials()).toHaveLength(5);
  });
});
