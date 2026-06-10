import { describe, it, expect } from "vitest";
import {
  temperatureCelsius, smokingTimeHours, woodChipsKg, bestWoodSpecies,
  moistureLossPercent, shelfLifeDays, saltPretreatmentG, chamberVolumeLiters,
  costPerKg, smokeTypes,
} from "../smoke-cure-calc.js";

describe("temperatureCelsius", () => {
  it("hot smoking is hotter than cold", () => {
    expect(temperatureCelsius("hot").min).toBeGreaterThan(temperatureCelsius("cold").max);
  });
});

describe("smokingTimeHours", () => {
  it("hanging takes longest", () => {
    expect(smokingTimeHours("hanging")).toBeGreaterThan(smokingTimeHours("hot"));
  });
});

describe("woodChipsKg", () => {
  it("more product = more chips", () => {
    expect(woodChipsKg(5)).toBeGreaterThan(woodChipsKg(2));
  });
});

describe("bestWoodSpecies", () => {
  it("hot smoking uses hickory", () => {
    expect(bestWoodSpecies("hot")).toBe("hickory");
  });
});

describe("moistureLossPercent", () => {
  it("pit loses most moisture", () => {
    expect(moistureLossPercent("pit")).toBeGreaterThan(moistureLossPercent("liquid"));
  });
});

describe("shelfLifeDays", () => {
  it("hanging lasts longest", () => {
    expect(shelfLifeDays("hanging")).toBeGreaterThan(shelfLifeDays("hot"));
  });
});

describe("saltPretreatmentG", () => {
  it("scales with product weight", () => {
    expect(saltPretreatmentG(3)).toBeGreaterThan(saltPretreatmentG(1));
  });
});

describe("chamberVolumeLiters", () => {
  it("scales with product weight", () => {
    expect(chamberVolumeLiters(5)).toBeGreaterThan(chamberVolumeLiters(2));
  });
});

describe("costPerKg", () => {
  it("hanging is most expensive", () => {
    expect(costPerKg("hanging")).toBeGreaterThan(costPerKg("liquid"));
  });
});

describe("smokeTypes", () => {
  it("returns 5 types", () => {
    expect(smokeTypes()).toHaveLength(5);
  });
});
