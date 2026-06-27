import { describe, it, expect } from "vitest";
import {
  durabilityYears, impactResistance, thermalMass,
  maintenanceFrequency, aestheticVersatility, fireResistant,
  renewable, bestStyle, costPerSqFt, claddingTypes,
} from "../cladding-type-calc.js";

describe("durabilityYears", () => {
  it("stone lasts longest", () => {
    expect(durabilityYears("stone")).toBeGreaterThan(
      durabilityYears("vinyl")
    );
  });
});

describe("impactResistance", () => {
  it("stone has highest impact resistance", () => {
    expect(impactResistance("stone")).toBeGreaterThan(
      impactResistance("vinyl")
    );
  });
});

describe("thermalMass", () => {
  it("stone has highest thermal mass", () => {
    expect(thermalMass("stone")).toBeGreaterThan(thermalMass("vinyl"));
  });
});

describe("maintenanceFrequency", () => {
  it("timber needs most maintenance", () => {
    expect(maintenanceFrequency("timber")).toBeGreaterThan(
      maintenanceFrequency("stone")
    );
  });
});

describe("aestheticVersatility", () => {
  it("timber is most versatile aesthetically", () => {
    expect(aestheticVersatility("timber")).toBeGreaterThan(
      aestheticVersatility("vinyl")
    );
  });
});

describe("fireResistant", () => {
  it("brick veneer is fire resistant", () => {
    expect(fireResistant("brick_veneer")).toBe(true);
  });
  it("timber is not", () => {
    expect(fireResistant("timber")).toBe(false);
  });
});

describe("renewable", () => {
  it("timber is renewable", () => {
    expect(renewable("timber")).toBe(true);
  });
  it("stone is not", () => {
    expect(renewable("stone")).toBe(false);
  });
});

describe("bestStyle", () => {
  it("stone for luxury", () => {
    expect(bestStyle("stone")).toBe("luxury");
  });
});

describe("costPerSqFt", () => {
  it("stone costs most", () => {
    expect(costPerSqFt("stone")).toBeGreaterThan(costPerSqFt("vinyl"));
  });
});

describe("claddingTypes", () => {
  it("returns 5 types", () => {
    expect(claddingTypes()).toHaveLength(5);
  });
});
