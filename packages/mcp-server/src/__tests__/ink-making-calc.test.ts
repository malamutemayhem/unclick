import { describe, it, expect } from "vitest";
import {
  lightfastness, waterproof, dryTimeMinutes,
  colorIntensity, corrosive, preparationHours,
  bestPenType, shelfLifeMonths, costPerLiter, inkTypes,
} from "../ink-making-calc.js";

describe("lightfastness", () => {
  it("carbon is most lightfast", () => {
    expect(lightfastness("carbon")).toBeGreaterThan(
      lightfastness("walnut")
    );
  });
});

describe("waterproof", () => {
  it("carbon is waterproof", () => {
    expect(waterproof("carbon")).toBe(true);
  });
  it("walnut is not", () => {
    expect(waterproof("walnut")).toBe(false);
  });
});

describe("dryTimeMinutes", () => {
  it("carbon takes longest to dry", () => {
    expect(dryTimeMinutes("carbon")).toBeGreaterThan(
      dryTimeMinutes("walnut")
    );
  });
});

describe("colorIntensity", () => {
  it("carbon is most intense", () => {
    expect(colorIntensity("carbon")).toBeGreaterThan(
      colorIntensity("walnut")
    );
  });
});

describe("corrosive", () => {
  it("iron gall is corrosive", () => {
    expect(corrosive("iron_gall")).toBe(true);
  });
  it("carbon is not", () => {
    expect(corrosive("carbon")).toBe(false);
  });
});

describe("preparationHours", () => {
  it("oak gall takes longest to prepare", () => {
    expect(preparationHours("oak_gall")).toBeGreaterThan(
      preparationHours("carbon")
    );
  });
});

describe("bestPenType", () => {
  it("carbon works best with brush", () => {
    expect(bestPenType("carbon")).toBe("brush");
  });
});

describe("shelfLifeMonths", () => {
  it("carbon lasts longest", () => {
    expect(shelfLifeMonths("carbon")).toBeGreaterThan(
      shelfLifeMonths("walnut")
    );
  });
});

describe("costPerLiter", () => {
  it("sepia costs most", () => {
    expect(costPerLiter("sepia")).toBeGreaterThan(
      costPerLiter("walnut")
    );
  });
});

describe("inkTypes", () => {
  it("returns 5 types", () => {
    expect(inkTypes()).toHaveLength(5);
  });
});
