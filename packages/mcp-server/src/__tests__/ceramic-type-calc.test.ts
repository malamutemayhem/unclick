import { describe, it, expect } from "vitest";
import {
  hardnessMohs, maxTempCelsius, fractureToughness,
  thermalConductivity, electricalInsulation, biocompatible,
  transparent, bestApplication, costPerKg, ceramicTypes,
} from "../ceramic-type-calc.js";

describe("hardnessMohs", () => {
  it("silicon carbide is hardest", () => {
    expect(hardnessMohs("silicon_carbide")).toBeGreaterThan(
      hardnessMohs("porcelain")
    );
  });
});

describe("maxTempCelsius", () => {
  it("zirconia handles highest temp", () => {
    expect(maxTempCelsius("zirconia")).toBeGreaterThan(
      maxTempCelsius("steatite")
    );
  });
});

describe("fractureToughness", () => {
  it("zirconia is toughest", () => {
    expect(fractureToughness("zirconia")).toBeGreaterThan(
      fractureToughness("porcelain")
    );
  });
});

describe("thermalConductivity", () => {
  it("silicon carbide conducts heat best", () => {
    expect(thermalConductivity("silicon_carbide")).toBeGreaterThan(
      thermalConductivity("zirconia")
    );
  });
});

describe("electricalInsulation", () => {
  it("steatite is best insulator", () => {
    expect(electricalInsulation("steatite")).toBeGreaterThan(
      electricalInsulation("silicon_carbide")
    );
  });
});

describe("biocompatible", () => {
  it("zirconia is biocompatible", () => {
    expect(biocompatible("zirconia")).toBe(true);
  });
  it("silicon carbide is not", () => {
    expect(biocompatible("silicon_carbide")).toBe(false);
  });
});

describe("transparent", () => {
  it("zirconia can be transparent", () => {
    expect(transparent("zirconia")).toBe(true);
  });
  it("alumina is not transparent", () => {
    expect(transparent("alumina")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("zirconia for dental implants", () => {
    expect(bestApplication("zirconia")).toBe("dental_implants");
  });
});

describe("costPerKg", () => {
  it("zirconia costs most", () => {
    expect(costPerKg("zirconia")).toBeGreaterThan(costPerKg("porcelain"));
  });
});

describe("ceramicTypes", () => {
  it("returns 5 types", () => {
    expect(ceramicTypes()).toHaveLength(5);
  });
});
