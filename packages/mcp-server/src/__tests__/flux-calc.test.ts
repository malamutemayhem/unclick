import { describe, it, expect } from "vitest";
import {
  activeTempCelsius, corrosiveRating, cleaningRequired, fumesLevel,
  shelfLifeMonths, bestForMetal, waterSoluble, foodSafe,
  costPerKg, fluxTypes,
} from "../flux-calc.js";

describe("activeTempCelsius", () => {
  it("borax activates at highest temp", () => {
    expect(activeTempCelsius("borax").min).toBeGreaterThan(
      activeTempCelsius("rosin").min
    );
  });
});

describe("corrosiveRating", () => {
  it("fluoride is most corrosive", () => {
    expect(corrosiveRating("fluoride")).toBeGreaterThan(
      corrosiveRating("rosin")
    );
  });
});

describe("cleaningRequired", () => {
  it("rosin does not need cleaning", () => {
    expect(cleaningRequired("rosin")).toBe(false);
  });
  it("zinc chloride needs cleaning", () => {
    expect(cleaningRequired("zinc_chloride")).toBe(true);
  });
});

describe("fumesLevel", () => {
  it("fluoride produces most fumes", () => {
    expect(fumesLevel("fluoride")).toBeGreaterThan(fumesLevel("borax"));
  });
});

describe("shelfLifeMonths", () => {
  it("borax lasts longest", () => {
    expect(shelfLifeMonths("borax")).toBeGreaterThan(
      shelfLifeMonths("fluoride")
    );
  });
});

describe("bestForMetal", () => {
  it("borax is best for steel", () => {
    expect(bestForMetal("borax")).toBe("steel");
  });
});

describe("waterSoluble", () => {
  it("borax is water soluble", () => {
    expect(waterSoluble("borax")).toBe(true);
  });
  it("rosin is not water soluble", () => {
    expect(waterSoluble("rosin")).toBe(false);
  });
});

describe("foodSafe", () => {
  it("rosin is food safe", () => {
    expect(foodSafe("rosin")).toBe(true);
  });
  it("zinc chloride is not food safe", () => {
    expect(foodSafe("zinc_chloride")).toBe(false);
  });
});

describe("costPerKg", () => {
  it("fluoride is most expensive", () => {
    expect(costPerKg("fluoride")).toBeGreaterThan(costPerKg("borax"));
  });
});

describe("fluxTypes", () => {
  it("returns 5 types", () => {
    expect(fluxTypes()).toHaveLength(5);
  });
});
