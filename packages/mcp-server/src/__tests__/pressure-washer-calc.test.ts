import { describe, it, expect } from "vitest";
import {
  psiRating, flowGpm, portabilityRating, noiseLevel,
  washerCost, hotWater, soapTank, pumpType,
  bestTask, pressureWashers,
} from "../pressure-washer-calc.js";

describe("psiRating", () => {
  it("gas heavy pro highest psi", () => {
    expect(psiRating("gas_heavy_pro")).toBeGreaterThan(psiRating("battery_cordless"));
  });
});

describe("flowGpm", () => {
  it("gas heavy pro highest flow", () => {
    expect(flowGpm("gas_heavy_pro")).toBeGreaterThan(flowGpm("electric_light"));
  });
});

describe("portabilityRating", () => {
  it("battery cordless most portable", () => {
    expect(portabilityRating("battery_cordless")).toBeGreaterThan(portabilityRating("hot_water_commercial"));
  });
});

describe("noiseLevel", () => {
  it("battery cordless quietest", () => {
    expect(noiseLevel("battery_cordless")).toBeGreaterThan(noiseLevel("gas_heavy_pro"));
  });
});

describe("washerCost", () => {
  it("hot water commercial most expensive", () => {
    expect(washerCost("hot_water_commercial")).toBeGreaterThan(washerCost("electric_light"));
  });
});

describe("hotWater", () => {
  it("hot water commercial has hot water", () => {
    expect(hotWater("hot_water_commercial")).toBe(true);
  });
  it("gas heavy pro does not", () => {
    expect(hotWater("gas_heavy_pro")).toBe(false);
  });
});

describe("soapTank", () => {
  it("electric light has soap tank", () => {
    expect(soapTank("electric_light")).toBe(true);
  });
  it("battery cordless does not", () => {
    expect(soapTank("battery_cordless")).toBe(false);
  });
});

describe("pumpType", () => {
  it("gas heavy pro uses triplex plunger pump", () => {
    expect(pumpType("gas_heavy_pro")).toBe("triplex_plunger_pump");
  });
});

describe("bestTask", () => {
  it("hot water commercial for grease oil industrial clean", () => {
    expect(bestTask("hot_water_commercial")).toBe("grease_oil_industrial_clean");
  });
});

describe("pressureWashers", () => {
  it("returns 5 types", () => {
    expect(pressureWashers()).toHaveLength(5);
  });
});
