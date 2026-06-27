import { describe, it, expect } from "vitest";
import {
  maxTempCelsius, heatupTimeMinutes, fuelCostRating, portability,
  ventilationRequired, tempControlPrecision, smokeLevel, noiseLevel,
  costEstimate, forgeTypes,
} from "../forge-calc.js";

describe("maxTempCelsius", () => {
  it("induction reaches highest temp", () => {
    expect(maxTempCelsius("induction")).toBeGreaterThan(
      maxTempCelsius("electric")
    );
  });
});

describe("heatupTimeMinutes", () => {
  it("induction heats fastest", () => {
    expect(heatupTimeMinutes("induction")).toBeLessThan(
      heatupTimeMinutes("coal")
    );
  });
});

describe("fuelCostRating", () => {
  it("induction is cheapest to run", () => {
    expect(fuelCostRating("induction")).toBeLessThan(
      fuelCostRating("electric")
    );
  });
});

describe("portability", () => {
  it("induction is most portable", () => {
    expect(portability("induction")).toBeGreaterThan(portability("coal"));
  });
});

describe("ventilationRequired", () => {
  it("coal needs ventilation", () => {
    expect(ventilationRequired("coal")).toBe(true);
  });
  it("induction does not", () => {
    expect(ventilationRequired("induction")).toBe(false);
  });
});

describe("tempControlPrecision", () => {
  it("induction has best control", () => {
    expect(tempControlPrecision("induction")).toBeGreaterThan(
      tempControlPrecision("coal")
    );
  });
});

describe("smokeLevel", () => {
  it("coal is smokiest", () => {
    expect(smokeLevel("coal")).toBeGreaterThan(smokeLevel("gas"));
  });
  it("induction produces no smoke", () => {
    expect(smokeLevel("induction")).toBe(0);
  });
});

describe("noiseLevel", () => {
  it("electric is quietest", () => {
    expect(noiseLevel("electric")).toBeLessThan(noiseLevel("induction"));
  });
});

describe("costEstimate", () => {
  it("induction is most expensive", () => {
    expect(costEstimate("induction")).toBeGreaterThan(
      costEstimate("coal")
    );
  });
});

describe("forgeTypes", () => {
  it("returns 5 types", () => {
    expect(forgeTypes()).toHaveLength(5);
  });
});
