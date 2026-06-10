import { describe, it, expect } from "vitest";
import {
  stoppingPower, heatResistance, wetPerformance,
  weightKg, lifespanKm, selfEnergizing,
  recoversEnergy, bestVehicle, costMultiplier, brakeTypes,
} from "../brake-type-calc.js";

describe("stoppingPower", () => {
  it("carbon ceramic stops best", () => {
    expect(stoppingPower("carbon_ceramic")).toBeGreaterThan(
      stoppingPower("drum")
    );
  });
});

describe("heatResistance", () => {
  it("carbon ceramic resists heat best", () => {
    expect(heatResistance("carbon_ceramic")).toBeGreaterThan(
      heatResistance("disc")
    );
  });
});

describe("wetPerformance", () => {
  it("disc outperforms drum in wet", () => {
    expect(wetPerformance("disc")).toBeGreaterThan(
      wetPerformance("drum")
    );
  });
});

describe("weightKg", () => {
  it("carbon ceramic is lightest", () => {
    expect(weightKg("carbon_ceramic")).toBeLessThan(
      weightKg("drum")
    );
  });
});

describe("lifespanKm", () => {
  it("regenerative lasts longest", () => {
    expect(lifespanKm("regenerative")).toBeGreaterThan(
      lifespanKm("disc")
    );
  });
});

describe("selfEnergizing", () => {
  it("drum is self energizing", () => {
    expect(selfEnergizing("drum")).toBe(true);
  });
  it("disc is not", () => {
    expect(selfEnergizing("disc")).toBe(false);
  });
});

describe("recoversEnergy", () => {
  it("regenerative recovers energy", () => {
    expect(recoversEnergy("regenerative")).toBe(true);
  });
  it("disc does not", () => {
    expect(recoversEnergy("disc")).toBe(false);
  });
});

describe("bestVehicle", () => {
  it("carbon ceramic for supercar", () => {
    expect(bestVehicle("carbon_ceramic")).toBe("supercar");
  });
});

describe("costMultiplier", () => {
  it("carbon ceramic costs most", () => {
    expect(costMultiplier("carbon_ceramic")).toBeGreaterThan(
      costMultiplier("disc")
    );
  });
});

describe("brakeTypes", () => {
  it("returns 5 types", () => {
    expect(brakeTypes()).toHaveLength(5);
  });
});
