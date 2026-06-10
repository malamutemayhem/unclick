import { describe, it, expect } from "vitest";
import {
  bandwidth, maxDistance, signalLoss, installEase, costPerMeter,
  bendResistant, telecomGrade, primaryUse, coreDiameter, opticalFibers,
} from "../optical-fiber-calc.js";

describe("bandwidth", () => {
  it("single mode highest bandwidth", () => {
    expect(bandwidth("single_mode")).toBeGreaterThan(bandwidth("plastic"));
  });
});

describe("maxDistance", () => {
  it("single mode longest distance", () => {
    expect(maxDistance("single_mode")).toBeGreaterThan(maxDistance("multimode"));
  });
});

describe("signalLoss", () => {
  it("plastic most signal loss", () => {
    expect(signalLoss("plastic")).toBeGreaterThan(signalLoss("single_mode"));
  });
});

describe("installEase", () => {
  it("plastic easiest to install", () => {
    expect(installEase("plastic")).toBeGreaterThan(installEase("single_mode"));
  });
});

describe("costPerMeter", () => {
  it("photonic crystal most expensive", () => {
    expect(costPerMeter("photonic_crystal")).toBeGreaterThan(costPerMeter("plastic"));
  });
});

describe("bendResistant", () => {
  it("plastic is bend resistant", () => {
    expect(bendResistant("plastic")).toBe(true);
  });
  it("single mode is not", () => {
    expect(bendResistant("single_mode")).toBe(false);
  });
});

describe("telecomGrade", () => {
  it("single mode is telecom grade", () => {
    expect(telecomGrade("single_mode")).toBe(true);
  });
  it("plastic is not", () => {
    expect(telecomGrade("plastic")).toBe(false);
  });
});

describe("primaryUse", () => {
  it("single mode for long haul telecom", () => {
    expect(primaryUse("single_mode")).toBe("long_haul_telecom");
  });
});

describe("coreDiameter", () => {
  it("plastic has 1mm core", () => {
    expect(coreDiameter("plastic")).toBe("1mm");
  });
});

describe("opticalFibers", () => {
  it("returns 5 fiber types", () => {
    expect(opticalFibers()).toHaveLength(5);
  });
});
