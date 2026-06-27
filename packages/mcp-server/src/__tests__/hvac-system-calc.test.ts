import { describe, it, expect } from "vitest";
import {
  efficiencySeer, installCost, operatingCost,
  zoneControl, noiseLevel, requiresDuctwork,
  providesHeatingAndCooling, bestApplication, refrigerantType, hvacSystems,
} from "../hvac-system-calc.js";

describe("efficiencySeer", () => {
  it("geothermal most efficient", () => {
    expect(efficiencySeer("geothermal")).toBeGreaterThan(
      efficiencySeer("packaged")
    );
  });
});

describe("installCost", () => {
  it("geothermal highest install cost", () => {
    expect(installCost("geothermal")).toBeGreaterThan(
      installCost("packaged")
    );
  });
});

describe("operatingCost", () => {
  it("geothermal lowest operating cost", () => {
    expect(operatingCost("geothermal")).toBeLessThan(
      operatingCost("packaged")
    );
  });
});

describe("zoneControl", () => {
  it("vrf best zone control", () => {
    expect(zoneControl("vrf")).toBeGreaterThan(
      zoneControl("packaged")
    );
  });
});

describe("noiseLevel", () => {
  it("geothermal quietest", () => {
    expect(noiseLevel("geothermal")).toBeLessThan(
      noiseLevel("packaged")
    );
  });
});

describe("requiresDuctwork", () => {
  it("split requires ductwork", () => {
    expect(requiresDuctwork("split")).toBe(true);
  });
  it("ductless mini does not", () => {
    expect(requiresDuctwork("ductless_mini")).toBe(false);
  });
});

describe("providesHeatingAndCooling", () => {
  it("all systems provide both", () => {
    expect(providesHeatingAndCooling("geothermal")).toBe(true);
  });
});

describe("bestApplication", () => {
  it("vrf for commercial multi zone", () => {
    expect(bestApplication("vrf")).toBe("commercial_multi_zone");
  });
});

describe("refrigerantType", () => {
  it("ductless mini uses r32", () => {
    expect(refrigerantType("ductless_mini")).toBe("r32");
  });
});

describe("hvacSystems", () => {
  it("returns 5 systems", () => {
    expect(hvacSystems()).toHaveLength(5);
  });
});
