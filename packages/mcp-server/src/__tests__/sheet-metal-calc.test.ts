import { describe, it, expect } from "vitest";
import {
  densityKgPerM3, sheetWeightKg, minBendRadiusTimesThickness,
  annealingTempCelsius, workHardeningRate, solderability,
  corrosionResistance, machinability, costPerKg, metalTypes,
} from "../sheet-metal-calc.js";

describe("densityKgPerM3", () => {
  it("copper is densest", () => {
    expect(densityKgPerM3("copper")).toBeGreaterThan(
      densityKgPerM3("aluminum")
    );
  });
});

describe("sheetWeightKg", () => {
  it("larger sheet weighs more", () => {
    expect(sheetWeightKg(2, 1, 1, "copper")).toBeGreaterThan(
      sheetWeightKg(1, 1, 1, "copper")
    );
  });
});

describe("minBendRadiusTimesThickness", () => {
  it("stainless needs largest bend radius", () => {
    expect(minBendRadiusTimesThickness("stainless")).toBeGreaterThan(
      minBendRadiusTimesThickness("copper")
    );
  });
});

describe("annealingTempCelsius", () => {
  it("stainless anneals hottest", () => {
    expect(annealingTempCelsius("stainless")).toBeGreaterThan(
      annealingTempCelsius("aluminum")
    );
  });
});

describe("workHardeningRate", () => {
  it("stainless hardens fastest", () => {
    expect(workHardeningRate("stainless")).toBeGreaterThan(
      workHardeningRate("aluminum")
    );
  });
});

describe("solderability", () => {
  it("copper solders best", () => {
    expect(solderability("copper")).toBeGreaterThan(
      solderability("aluminum")
    );
  });
});

describe("corrosionResistance", () => {
  it("stainless resists corrosion best", () => {
    expect(corrosionResistance("stainless")).toBeGreaterThan(
      corrosionResistance("mild_steel")
    );
  });
});

describe("machinability", () => {
  it("brass machines best", () => {
    expect(machinability("brass")).toBeGreaterThan(
      machinability("stainless")
    );
  });
});

describe("costPerKg", () => {
  it("copper is most expensive", () => {
    expect(costPerKg("copper")).toBeGreaterThan(costPerKg("mild_steel"));
  });
});

describe("metalTypes", () => {
  it("returns 5 types", () => {
    expect(metalTypes()).toHaveLength(5);
  });
});
