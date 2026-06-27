import { describe, it, expect } from "vitest";
import {
  fermentTempCelsius, attenuationPercent, flocculationRating,
  alcoholTolerancePercent, flavorContribution, lagTimeHours,
  reusablePitches, bestApplication, costPerPacket, yeastStrains,
} from "../yeast-strain-calc.js";

describe("fermentTempCelsius", () => {
  it("bread ferments at highest temp", () => {
    expect(fermentTempCelsius("bread")).toBeGreaterThan(
      fermentTempCelsius("lager")
    );
  });
});

describe("attenuationPercent", () => {
  it("wine attenuates most", () => {
    expect(attenuationPercent("wine")).toBeGreaterThan(
      attenuationPercent("ale")
    );
  });
});

describe("flocculationRating", () => {
  it("ale flocculates best", () => {
    expect(flocculationRating("ale")).toBeGreaterThan(
      flocculationRating("wild")
    );
  });
});

describe("alcoholTolerancePercent", () => {
  it("wine tolerates most alcohol", () => {
    expect(alcoholTolerancePercent("wine")).toBeGreaterThan(
      alcoholTolerancePercent("bread")
    );
  });
});

describe("flavorContribution", () => {
  it("wild contributes most flavor", () => {
    expect(flavorContribution("wild")).toBeGreaterThan(
      flavorContribution("lager")
    );
  });
});

describe("lagTimeHours", () => {
  it("wild has longest lag", () => {
    expect(lagTimeHours("wild")).toBeGreaterThan(
      lagTimeHours("bread")
    );
  });
});

describe("reusablePitches", () => {
  it("ale is most reusable", () => {
    expect(reusablePitches("ale")).toBeGreaterThan(
      reusablePitches("bread")
    );
  });
});

describe("bestApplication", () => {
  it("wild is best for lambic", () => {
    expect(bestApplication("wild")).toBe("lambic");
  });
});

describe("costPerPacket", () => {
  it("wild costs most", () => {
    expect(costPerPacket("wild")).toBeGreaterThan(
      costPerPacket("bread")
    );
  });
});

describe("yeastStrains", () => {
  it("returns 5 strains", () => {
    expect(yeastStrains()).toHaveLength(5);
  });
});
