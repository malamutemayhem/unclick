import { describe, it, expect } from "vitest";
import {
  furnaceHeightCm, furnaceDiameterCm, charcoalKg, bloomWeightKg,
  smeltingHours, tuyereDiameterCm, slagWeightKg, airflowLpm,
  temperatureCelsius, fuelCostPerSmelt, oreTypes,
} from "../bloomery-calc.js";

describe("furnaceHeightCm", () => {
  it("positive height", () => {
    expect(furnaceHeightCm(10)).toBeGreaterThan(80);
  });
});

describe("furnaceDiameterCm", () => {
  it("30% of height", () => {
    expect(furnaceDiameterCm(110)).toBe(33);
  });
});

describe("charcoalKg", () => {
  it("1.5x ore weight", () => {
    expect(charcoalKg(10)).toBe(15);
  });
});

describe("bloomWeightKg", () => {
  it("magnetite best yield", () => {
    expect(bloomWeightKg(10, "magnetite")).toBeGreaterThan(bloomWeightKg(10, "bog_iron"));
  });
});

describe("smeltingHours", () => {
  it("positive hours", () => {
    expect(smeltingHours(10)).toBeGreaterThan(4);
  });
});

describe("tuyereDiameterCm", () => {
  it("positive diameter", () => {
    expect(tuyereDiameterCm(33)).toBeGreaterThan(0);
  });
});

describe("slagWeightKg", () => {
  it("bog iron most slag", () => {
    expect(slagWeightKg(10, "bog_iron")).toBeGreaterThan(slagWeightKg(10, "magnetite"));
  });
});

describe("airflowLpm", () => {
  it("positive airflow", () => {
    expect(airflowLpm(33)).toBeGreaterThan(0);
  });
});

describe("temperatureCelsius", () => {
  it("magnetite highest temp", () => {
    expect(temperatureCelsius("magnetite")).toBeGreaterThan(temperatureCelsius("bog_iron"));
  });
});

describe("fuelCostPerSmelt", () => {
  it("positive cost", () => {
    expect(fuelCostPerSmelt(15, 2)).toBeGreaterThan(0);
  });
});

describe("oreTypes", () => {
  it("returns 5 types", () => {
    expect(oreTypes()).toHaveLength(5);
  });
});
