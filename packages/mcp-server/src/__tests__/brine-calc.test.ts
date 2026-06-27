import { describe, it, expect } from "vitest";
import {
  saltPercentByWeight, saltGrams, specificGravity, temperatureCelsius,
  soakTimeHours, phTarget, shelfLifeWeeks, vesselVolumeLiters,
  costPerLiter, brineUses,
} from "../brine-calc.js";

describe("saltPercentByWeight", () => {
  it("curing uses most salt", () => {
    expect(saltPercentByWeight("curing")).toBeGreaterThan(saltPercentByWeight("fermentation"));
  });
});

describe("saltGrams", () => {
  it("calculates salt from water and percent", () => {
    expect(saltGrams(1000, 5)).toBe(50);
  });
});

describe("specificGravity", () => {
  it("higher salt = higher gravity", () => {
    expect(specificGravity(20)).toBeGreaterThan(specificGravity(5));
  });
});

describe("temperatureCelsius", () => {
  it("curing needs coldest temp", () => {
    expect(temperatureCelsius("curing")).toBeLessThan(temperatureCelsius("pickling"));
  });
});

describe("soakTimeHours", () => {
  it("olive takes longest", () => {
    expect(soakTimeHours("olive")).toBeGreaterThan(soakTimeHours("curing"));
  });
});

describe("phTarget", () => {
  it("pickling is most acidic", () => {
    expect(phTarget("pickling")).toBeLessThan(phTarget("cheese"));
  });
});

describe("shelfLifeWeeks", () => {
  it("olive lasts longest", () => {
    expect(shelfLifeWeeks("olive")).toBeGreaterThan(shelfLifeWeeks("curing"));
  });
});

describe("vesselVolumeLiters", () => {
  it("more product = larger vessel", () => {
    expect(vesselVolumeLiters(5, 2)).toBeGreaterThan(vesselVolumeLiters(2, 2));
  });
});

describe("costPerLiter", () => {
  it("cheese brine is most expensive", () => {
    expect(costPerLiter("cheese")).toBeGreaterThan(costPerLiter("fermentation"));
  });
});

describe("brineUses", () => {
  it("returns 5 uses", () => {
    expect(brineUses()).toHaveLength(5);
  });
});
