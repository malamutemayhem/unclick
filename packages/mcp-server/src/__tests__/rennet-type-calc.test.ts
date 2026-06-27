import { describe, it, expect } from "vitest";
import {
  coagulationMinutes, curdFirmness, flavorContribution,
  agingSuitability, vegetarian, yieldPercent,
  bestCheese, shelfLifeMonths, costPerLiter, rennetTypes,
} from "../rennet-type-calc.js";

describe("coagulationMinutes", () => {
  it("acid coagulates fastest", () => {
    expect(coagulationMinutes("acid")).toBeLessThan(
      coagulationMinutes("vegetable")
    );
  });
});

describe("curdFirmness", () => {
  it("animal rennet gives firmest curds", () => {
    expect(curdFirmness("animal")).toBeGreaterThan(
      curdFirmness("acid")
    );
  });
});

describe("flavorContribution", () => {
  it("animal contributes most flavor", () => {
    expect(flavorContribution("animal")).toBeGreaterThan(
      flavorContribution("acid")
    );
  });
});

describe("agingSuitability", () => {
  it("animal is most suited for aging", () => {
    expect(agingSuitability("animal")).toBeGreaterThan(
      agingSuitability("acid")
    );
  });
});

describe("vegetarian", () => {
  it("microbial is vegetarian", () => {
    expect(vegetarian("microbial")).toBe(true);
  });
  it("animal is not vegetarian", () => {
    expect(vegetarian("animal")).toBe(false);
  });
});

describe("yieldPercent", () => {
  it("acid has highest yield", () => {
    expect(yieldPercent("acid")).toBeGreaterThan(
      yieldPercent("vegetable")
    );
  });
});

describe("bestCheese", () => {
  it("acid rennet best for ricotta", () => {
    expect(bestCheese("acid")).toBe("ricotta");
  });
});

describe("shelfLifeMonths", () => {
  it("fermentation rennet lasts longest", () => {
    expect(shelfLifeMonths("fermentation")).toBeGreaterThan(
      shelfLifeMonths("acid")
    );
  });
});

describe("costPerLiter", () => {
  it("animal costs most", () => {
    expect(costPerLiter("animal")).toBeGreaterThan(
      costPerLiter("acid")
    );
  });
});

describe("rennetTypes", () => {
  it("returns 5 types", () => {
    expect(rennetTypes()).toHaveLength(5);
  });
});
