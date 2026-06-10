import { describe, it, expect } from "vitest";
import {
  meltingPointCelsius, filteringPasses, yieldPercentFromComb, renderingTempCelsius,
  purityPercent, shelfLifeYears, colorRating, scentIntensity,
  costPerKg, waxGrades,
} from "../beeswax-calc.js";

describe("meltingPointCelsius", () => {
  it("art grade has highest melting point", () => {
    expect(meltingPointCelsius("art")).toBeGreaterThan(
      meltingPointCelsius("filtered")
    );
  });
});

describe("filteringPasses", () => {
  it("pharmaceutical needs most passes", () => {
    expect(filteringPasses("pharmaceutical")).toBeGreaterThan(
      filteringPasses("cosmetic")
    );
  });
  it("raw needs no filtering", () => {
    expect(filteringPasses("raw")).toBe(0);
  });
});

describe("yieldPercentFromComb", () => {
  it("returns 85", () => {
    expect(yieldPercentFromComb()).toBe(85);
  });
});

describe("renderingTempCelsius", () => {
  it("returns 70", () => {
    expect(renderingTempCelsius()).toBe(70);
  });
});

describe("purityPercent", () => {
  it("pharmaceutical is purest", () => {
    expect(purityPercent("pharmaceutical")).toBeGreaterThan(
      purityPercent("raw")
    );
  });
});

describe("shelfLifeYears", () => {
  it("raw lasts longest", () => {
    expect(shelfLifeYears("raw")).toBeGreaterThan(
      shelfLifeYears("pharmaceutical")
    );
  });
});

describe("colorRating", () => {
  it("cosmetic is white", () => {
    expect(colorRating("cosmetic")).toBe("white");
  });
  it("raw is dark yellow", () => {
    expect(colorRating("raw")).toBe("dark_yellow");
  });
});

describe("scentIntensity", () => {
  it("raw has strongest scent", () => {
    expect(scentIntensity("raw")).toBeGreaterThan(
      scentIntensity("pharmaceutical")
    );
  });
});

describe("costPerKg", () => {
  it("pharmaceutical is most expensive", () => {
    expect(costPerKg("pharmaceutical")).toBeGreaterThan(costPerKg("raw"));
  });
});

describe("waxGrades", () => {
  it("returns 5 grades", () => {
    expect(waxGrades()).toHaveLength(5);
  });
});
