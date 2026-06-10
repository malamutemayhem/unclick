import { describe, it, expect } from "vitest";
import {
  wallThicknessMm, maxFiringTempCelsius, thermalShockResistance, lifespanFirings,
  internalVolumeLiters, weightKg, combustibleLoadG, lidRequired, costEstimate, saggarMaterials,
} from "../saggar-calc.js";

describe("wallThicknessMm", () => {
  it("larger diameter = thicker wall", () => {
    expect(wallThicknessMm(30)).toBeGreaterThan(wallThicknessMm(15));
  });
});

describe("maxFiringTempCelsius", () => {
  it("silicon carbide fires hottest", () => {
    expect(maxFiringTempCelsius("silicon_carbide")).toBeGreaterThan(
      maxFiringTempCelsius("castable")
    );
  });
});

describe("thermalShockResistance", () => {
  it("cordierite has best resistance", () => {
    expect(thermalShockResistance("cordierite")).toBeGreaterThan(
      thermalShockResistance("fireclay")
    );
  });
});

describe("lifespanFirings", () => {
  it("silicon carbide lasts longest", () => {
    expect(lifespanFirings("silicon_carbide")).toBeGreaterThan(
      lifespanFirings("castable")
    );
  });
});

describe("internalVolumeLiters", () => {
  it("larger dimensions = more volume", () => {
    expect(internalVolumeLiters(30, 30)).toBeGreaterThan(
      internalVolumeLiters(20, 20)
    );
  });
});

describe("weightKg", () => {
  it("silicon carbide is densest", () => {
    expect(weightKg("silicon_carbide", 10)).toBeGreaterThan(
      weightKg("cordierite", 10)
    );
  });
});

describe("combustibleLoadG", () => {
  it("proportional to volume", () => {
    expect(combustibleLoadG(10)).toBeGreaterThan(combustibleLoadG(5));
  });
});

describe("lidRequired", () => {
  it("returns true", () => {
    expect(lidRequired()).toBe(true);
  });
});

describe("costEstimate", () => {
  it("silicon carbide is most expensive", () => {
    expect(costEstimate("silicon_carbide")).toBeGreaterThan(
      costEstimate("castable")
    );
  });
});

describe("saggarMaterials", () => {
  it("returns 5 materials", () => {
    expect(saggarMaterials()).toHaveLength(5);
  });
});
