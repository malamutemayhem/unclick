import { describe, it, expect } from "vitest";
import {
  tempCelsius, durationHours, flavorIntensity,
  preservationEffectiveness, skillRequired, equipmentNeeded,
  bestMeat, shelfLifeWeeks, costRating, smokeCureMethods,
} from "../smoke-curing-calc.js";

describe("tempCelsius", () => {
  it("hot smoke is hottest", () => {
    expect(tempCelsius("hot_smoke")).toBeGreaterThan(
      tempCelsius("cold_smoke")
    );
  });
});

describe("durationHours", () => {
  it("cold smoke takes longest", () => {
    expect(durationHours("cold_smoke")).toBeGreaterThan(
      durationHours("hot_smoke")
    );
  });
});

describe("flavorIntensity", () => {
  it("pit smoke is most intense", () => {
    expect(flavorIntensity("pit_smoke")).toBeGreaterThan(
      flavorIntensity("liquid_smoke")
    );
  });
});

describe("preservationEffectiveness", () => {
  it("cold smoke preserves best", () => {
    expect(preservationEffectiveness("cold_smoke")).toBeGreaterThan(
      preservationEffectiveness("liquid_smoke")
    );
  });
});

describe("skillRequired", () => {
  it("cold smoke needs most skill", () => {
    expect(skillRequired("cold_smoke")).toBeGreaterThan(
      skillRequired("liquid_smoke")
    );
  });
});

describe("equipmentNeeded", () => {
  it("cold smoke needs equipment", () => {
    expect(equipmentNeeded("cold_smoke")).toBe(true);
  });
  it("liquid smoke does not", () => {
    expect(equipmentNeeded("liquid_smoke")).toBe(false);
  });
});

describe("bestMeat", () => {
  it("cold smoke is best for salmon", () => {
    expect(bestMeat("cold_smoke")).toBe("salmon");
  });
});

describe("shelfLifeWeeks", () => {
  it("cold smoke lasts longest", () => {
    expect(shelfLifeWeeks("cold_smoke")).toBeGreaterThan(
      shelfLifeWeeks("liquid_smoke")
    );
  });
});

describe("costRating", () => {
  it("cold smoke costs most", () => {
    expect(costRating("cold_smoke")).toBeGreaterThan(
      costRating("liquid_smoke")
    );
  });
});

describe("smokeCureMethods", () => {
  it("returns 5 methods", () => {
    expect(smokeCureMethods()).toHaveLength(5);
  });
});
