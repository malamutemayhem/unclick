import { describe, it, expect } from "vitest";
import {
  chamberVolumeLiters, firingTemperatureCelsius, heatingRateCPerHour,
  firingHours, fuelKg, capacityPieces, coolingHours, shelfCount,
  energyCostPerFiring, lifespanFirings, kilnTypes,
} from "../kiln-calc.js";

describe("chamberVolumeLiters", () => {
  it("calculates cylinder volume", () => {
    expect(chamberVolumeLiters(60, 80)).toBeGreaterThan(0);
  });
  it("larger diameter = larger volume", () => {
    expect(chamberVolumeLiters(80, 80)).toBeGreaterThan(chamberVolumeLiters(60, 80));
  });
});

describe("firingTemperatureCelsius", () => {
  it("anagama hottest", () => {
    expect(firingTemperatureCelsius("anagama")).toBeGreaterThan(firingTemperatureCelsius("updraft"));
  });
});

describe("heatingRateCPerHour", () => {
  it("electric fastest", () => {
    expect(heatingRateCPerHour("electric")).toBeGreaterThan(heatingRateCPerHour("anagama"));
  });
});

describe("firingHours", () => {
  it("higher temp = longer firing", () => {
    expect(firingHours(1300, 60)).toBeGreaterThan(firingHours(1000, 60));
  });
  it("zero rate returns zero", () => {
    expect(firingHours(1000, 0)).toBe(0);
  });
});

describe("fuelKg", () => {
  it("electric uses no fuel", () => {
    expect(fuelKg(100, "electric")).toBe(0);
  });
  it("anagama uses most fuel", () => {
    expect(fuelKg(100, "anagama")).toBeGreaterThan(fuelKg(100, "downdraft"));
  });
});

describe("capacityPieces", () => {
  it("positive count for valid inputs", () => {
    expect(capacityPieces(200, 500)).toBeGreaterThan(0);
  });
  it("zero piece volume returns zero", () => {
    expect(capacityPieces(200, 0)).toBe(0);
  });
});

describe("coolingHours", () => {
  it("hotter = longer cooling", () => {
    expect(coolingHours(1300)).toBeGreaterThan(coolingHours(1000));
  });
});

describe("shelfCount", () => {
  it("calculates shelf count", () => {
    expect(shelfCount(80, 20)).toBe(4);
  });
  it("zero spacing returns zero", () => {
    expect(shelfCount(80, 0)).toBe(0);
  });
});

describe("energyCostPerFiring", () => {
  it("electric uses volume-based cost", () => {
    expect(energyCostPerFiring("electric", 5, 100)).toBe(50);
  });
  it("wood uses fuel-based cost", () => {
    expect(energyCostPerFiring("anagama", 5, 100)).toBeGreaterThan(0);
  });
});

describe("lifespanFirings", () => {
  it("electric longest lifespan", () => {
    expect(lifespanFirings("electric")).toBeGreaterThan(lifespanFirings("anagama"));
  });
});

describe("kilnTypes", () => {
  it("returns 5 types", () => {
    expect(kilnTypes()).toHaveLength(5);
  });
});
