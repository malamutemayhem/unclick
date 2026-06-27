import { describe, it, expect } from "vitest";
import {
  acidityPh, shelfLifeMonths, flavorIntensity,
  crunchRetention, probioticContent, fermented,
  heatProcessed, bestVegetable, costPerLiter, pickleBrines,
} from "../pickle-brine-calc.js";

describe("acidityPh", () => {
  it("lime juice is most acidic", () => {
    expect(acidityPh("lime_juice")).toBeLessThan(
      acidityPh("salt_water")
    );
  });
});

describe("shelfLifeMonths", () => {
  it("vinegar lasts longest", () => {
    expect(shelfLifeMonths("vinegar")).toBeGreaterThan(
      shelfLifeMonths("whey")
    );
  });
});

describe("flavorIntensity", () => {
  it("vinegar is most intense", () => {
    expect(flavorIntensity("vinegar")).toBeGreaterThan(
      flavorIntensity("salt_water")
    );
  });
});

describe("crunchRetention", () => {
  it("whey retains crunch best", () => {
    expect(crunchRetention("whey")).toBeGreaterThan(
      crunchRetention("lime_juice")
    );
  });
});

describe("probioticContent", () => {
  it("whey has most probiotics", () => {
    expect(probioticContent("whey")).toBeGreaterThan(
      probioticContent("vinegar")
    );
  });
});

describe("fermented", () => {
  it("salt water is fermented", () => {
    expect(fermented("salt_water")).toBe(true);
  });
  it("vinegar is not", () => {
    expect(fermented("vinegar")).toBe(false);
  });
});

describe("heatProcessed", () => {
  it("vinegar is heat processed", () => {
    expect(heatProcessed("vinegar")).toBe(true);
  });
  it("salt water is not", () => {
    expect(heatProcessed("salt_water")).toBe(false);
  });
});

describe("bestVegetable", () => {
  it("salt water best for cucumber", () => {
    expect(bestVegetable("salt_water")).toBe("cucumber");
  });
});

describe("costPerLiter", () => {
  it("lime juice costs most", () => {
    expect(costPerLiter("lime_juice")).toBeGreaterThan(
      costPerLiter("salt_water")
    );
  });
});

describe("pickleBrines", () => {
  it("returns 5 brines", () => {
    expect(pickleBrines()).toHaveLength(5);
  });
});
