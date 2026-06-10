import { describe, it, expect } from "vitest";
import {
  maxTempCelsius, burnDurationHours, smokeLevel,
  ashProduction, controlEase, indoorSafe,
  bestForgeType, scaleCausation, costPerKg, forgeFuels,
} from "../forge-fuel-calc.js";

describe("maxTempCelsius", () => {
  it("coke reaches highest temp", () => {
    expect(maxTempCelsius("coke")).toBeGreaterThan(
      maxTempCelsius("propane")
    );
  });
});

describe("burnDurationHours", () => {
  it("propane burns longest", () => {
    expect(burnDurationHours("propane")).toBeGreaterThan(
      burnDurationHours("charcoal")
    );
  });
});

describe("smokeLevel", () => {
  it("bituminous coal is smokiest", () => {
    expect(smokeLevel("bituminous_coal")).toBeGreaterThan(
      smokeLevel("propane")
    );
  });
});

describe("ashProduction", () => {
  it("bituminous coal produces most ash", () => {
    expect(ashProduction("bituminous_coal")).toBeGreaterThan(
      ashProduction("propane")
    );
  });
});

describe("controlEase", () => {
  it("propane is easiest to control", () => {
    expect(controlEase("propane")).toBeGreaterThan(
      controlEase("charcoal")
    );
  });
});

describe("indoorSafe", () => {
  it("propane is indoor safe", () => {
    expect(indoorSafe("propane")).toBe(true);
  });
  it("coal is not indoor safe", () => {
    expect(indoorSafe("bituminous_coal")).toBe(false);
  });
});

describe("bestForgeType", () => {
  it("propane best for gas forge", () => {
    expect(bestForgeType("propane")).toBe("gas_forge");
  });
});

describe("scaleCausation", () => {
  it("bituminous coal causes most scale", () => {
    expect(scaleCausation("bituminous_coal")).toBeGreaterThan(
      scaleCausation("charcoal")
    );
  });
});

describe("costPerKg", () => {
  it("charcoal costs most per kg", () => {
    expect(costPerKg("charcoal")).toBeGreaterThan(
      costPerKg("bituminous_coal")
    );
  });
});

describe("forgeFuels", () => {
  it("returns 5 fuels", () => {
    expect(forgeFuels()).toHaveLength(5);
  });
});
