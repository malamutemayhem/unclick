import { describe, it, expect } from "vitest";
import {
  maxTempCelsius, processingMinutes, safetyRating,
  equipmentCost, shelfLifeYears, lowAcidSafe,
  beginnerFriendly, bestFood, energyUsage, canningMethods,
} from "../canning-method-calc.js";

describe("maxTempCelsius", () => {
  it("pressure canning reaches highest temp", () => {
    expect(maxTempCelsius("pressure_canning")).toBeGreaterThan(
      maxTempCelsius("water_bath")
    );
  });
});

describe("processingMinutes", () => {
  it("pressure canning takes longest", () => {
    expect(processingMinutes("pressure_canning")).toBeGreaterThan(
      processingMinutes("inversion")
    );
  });
});

describe("safetyRating", () => {
  it("pressure canning is safest", () => {
    expect(safetyRating("pressure_canning")).toBeGreaterThan(
      safetyRating("inversion")
    );
  });
});

describe("equipmentCost", () => {
  it("pressure canning costs most", () => {
    expect(equipmentCost("pressure_canning")).toBeGreaterThan(
      equipmentCost("inversion")
    );
  });
});

describe("shelfLifeYears", () => {
  it("pressure canning lasts longest", () => {
    expect(shelfLifeYears("pressure_canning")).toBeGreaterThan(
      shelfLifeYears("inversion")
    );
  });
});

describe("lowAcidSafe", () => {
  it("pressure canning is low acid safe", () => {
    expect(lowAcidSafe("pressure_canning")).toBe(true);
  });
  it("water bath is not", () => {
    expect(lowAcidSafe("water_bath")).toBe(false);
  });
});

describe("beginnerFriendly", () => {
  it("water bath is beginner friendly", () => {
    expect(beginnerFriendly("water_bath")).toBe(true);
  });
  it("pressure canning is not", () => {
    expect(beginnerFriendly("pressure_canning")).toBe(false);
  });
});

describe("bestFood", () => {
  it("pressure canning best for vegetables", () => {
    expect(bestFood("pressure_canning")).toBe("vegetables");
  });
});

describe("energyUsage", () => {
  it("pressure canning uses most energy", () => {
    expect(energyUsage("pressure_canning")).toBeGreaterThan(
      energyUsage("inversion")
    );
  });
});

describe("canningMethods", () => {
  it("returns 5 methods", () => {
    expect(canningMethods()).toHaveLength(5);
  });
});
