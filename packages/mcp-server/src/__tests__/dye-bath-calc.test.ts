import { describe, it, expect } from "vitest";
import {
  bathVolumeLiters, dyeWeightG, temperatureCelsius, dyeTimeMinutes,
  saltG, washFastnessRating, lightFastnessRating, rinseWaterLiters,
  costPerKg, dyeTypes,
} from "../dye-bath-calc.js";

describe("bathVolumeLiters", () => {
  it("scales with fabric weight and ratio", () => {
    expect(bathVolumeLiters(2, 20)).toBe(40);
  });
});

describe("dyeWeightG", () => {
  it("deeper shade needs more dye", () => {
    expect(dyeWeightG(1, 4)).toBeGreaterThan(dyeWeightG(1, 2));
  });
});

describe("temperatureCelsius", () => {
  it("disperse is hottest", () => {
    expect(temperatureCelsius("disperse")).toBeGreaterThan(temperatureCelsius("reactive"));
  });
});

describe("dyeTimeMinutes", () => {
  it("natural dye takes longest", () => {
    expect(dyeTimeMinutes("natural")).toBeGreaterThan(dyeTimeMinutes("acid"));
  });
});

describe("saltG", () => {
  it("only reactive uses salt", () => {
    expect(saltG(1, "reactive")).toBeGreaterThan(0);
    expect(saltG(1, "acid")).toBe(0);
  });
});

describe("washFastnessRating", () => {
  it("reactive has best wash fastness", () => {
    expect(washFastnessRating("reactive")).toBeGreaterThanOrEqual(washFastnessRating("acid"));
  });
});

describe("lightFastnessRating", () => {
  it("natural has lowest light fastness", () => {
    expect(lightFastnessRating("natural")).toBeLessThan(lightFastnessRating("reactive"));
  });
});

describe("rinseWaterLiters", () => {
  it("3x bath volume", () => {
    expect(rinseWaterLiters(10)).toBe(30);
  });
});

describe("costPerKg", () => {
  it("vat dye is most expensive", () => {
    expect(costPerKg("vat")).toBeGreaterThan(costPerKg("acid"));
  });
});

describe("dyeTypes", () => {
  it("returns 5 types", () => {
    expect(dyeTypes()).toHaveLength(5);
  });
});
