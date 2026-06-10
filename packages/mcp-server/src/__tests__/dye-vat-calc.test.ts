import { describe, it, expect } from "vitest";
import {
  vatVolumeLiters, dyeWeightG, mordantWeightG, steepingHours,
  temperatureCelsius, colorFastnessRating, waterChanges, fuelWoodKg,
  dryingDays, costPerKgFabric, dyeSources,
} from "../dye-vat-calc.js";

describe("vatVolumeLiters", () => {
  it("20x fabric weight", () => {
    expect(vatVolumeLiters(5)).toBe(100);
  });
});

describe("dyeWeightG", () => {
  it("woad uses most dye", () => {
    expect(dyeWeightG(5, "woad")).toBeGreaterThan(dyeWeightG(5, "cochineal"));
  });
});

describe("mordantWeightG", () => {
  it("positive weight", () => {
    expect(mordantWeightG(5)).toBeGreaterThan(0);
  });
});

describe("steepingHours", () => {
  it("indigo longest", () => {
    expect(steepingHours("indigo")).toBeGreaterThan(steepingHours("cochineal"));
  });
});

describe("temperatureCelsius", () => {
  it("cochineal hottest", () => {
    expect(temperatureCelsius("cochineal")).toBeGreaterThan(temperatureCelsius("indigo"));
  });
});

describe("colorFastnessRating", () => {
  it("indigo highest", () => {
    expect(colorFastnessRating("indigo")).toBeGreaterThan(colorFastnessRating("weld"));
  });
});

describe("waterChanges", () => {
  it("at least 1", () => {
    expect(waterChanges(8)).toBe(1);
  });
});

describe("fuelWoodKg", () => {
  it("positive fuel", () => {
    expect(fuelWoodKg(100, 70)).toBeGreaterThan(0);
  });
});

describe("dryingDays", () => {
  it("at least 1", () => {
    expect(dryingDays(1)).toBe(1);
  });
});

describe("costPerKgFabric", () => {
  it("cochineal most expensive", () => {
    expect(costPerKgFabric("cochineal", 10)).toBeGreaterThan(costPerKgFabric("weld", 10));
  });
});

describe("dyeSources", () => {
  it("returns 5 sources", () => {
    expect(dyeSources()).toHaveLength(5);
  });
});
