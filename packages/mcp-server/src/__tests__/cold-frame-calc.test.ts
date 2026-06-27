import { describe, it, expect } from "vitest";
import {
  interiorTempBoostCelsius, lightTransmissionPercent, lifespanYears,
  ventingAngleDeg, idealDepthCm, seasonExtensionWeeks, hailResistance,
  weightKgPerM2, costPerM2, glazingTypes,
} from "../cold-frame-calc.js";

describe("interiorTempBoostCelsius", () => {
  it("double glass gives most boost", () => {
    expect(interiorTempBoostCelsius("double_glass")).toBeGreaterThan(
      interiorTempBoostCelsius("polyethylene")
    );
  });
});

describe("lightTransmissionPercent", () => {
  it("acrylic transmits most light", () => {
    expect(lightTransmissionPercent("acrylic")).toBeGreaterThan(
      lightTransmissionPercent("double_glass")
    );
  });
});

describe("lifespanYears", () => {
  it("double glass lasts longest", () => {
    expect(lifespanYears("double_glass")).toBeGreaterThan(
      lifespanYears("polyethylene")
    );
  });
});

describe("ventingAngleDeg", () => {
  it("hot day needs wider venting", () => {
    expect(ventingAngleDeg(30)).toBeGreaterThan(ventingAngleDeg(18));
  });
  it("cold day needs no venting", () => {
    expect(ventingAngleDeg(10)).toBe(0);
  });
});

describe("idealDepthCm", () => {
  it("returns 30", () => {
    expect(idealDepthCm()).toBe(30);
  });
});

describe("seasonExtensionWeeks", () => {
  it("double glass extends season most", () => {
    expect(seasonExtensionWeeks("double_glass")).toBeGreaterThan(
      seasonExtensionWeeks("polyethylene")
    );
  });
});

describe("hailResistance", () => {
  it("polycarbonate resists hail best", () => {
    expect(hailResistance("polycarbonate")).toBeGreaterThan(
      hailResistance("single_glass")
    );
  });
});

describe("weightKgPerM2", () => {
  it("double glass is heaviest", () => {
    expect(weightKgPerM2("double_glass")).toBeGreaterThan(
      weightKgPerM2("polyethylene")
    );
  });
});

describe("costPerM2", () => {
  it("double glass is most expensive", () => {
    expect(costPerM2("double_glass")).toBeGreaterThan(
      costPerM2("polyethylene")
    );
  });
});

describe("glazingTypes", () => {
  it("returns 5 types", () => {
    expect(glazingTypes()).toHaveLength(5);
  });
});
