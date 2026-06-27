import { describe, it, expect } from "vitest";
import {
  waterEfficiency, installCost, laborRequirement,
  uniformity, energyUse, automatable,
  slopeCompatible, bestCropType, waterSource, irrigationMethods,
} from "../irrigation-method-calc.js";

describe("waterEfficiency", () => {
  it("drip most efficient", () => {
    expect(waterEfficiency("drip")).toBeGreaterThan(
      waterEfficiency("flood")
    );
  });
});

describe("installCost", () => {
  it("subsurface most expensive", () => {
    expect(installCost("subsurface")).toBeGreaterThan(
      installCost("flood")
    );
  });
});

describe("laborRequirement", () => {
  it("flood most labor intensive", () => {
    expect(laborRequirement("flood")).toBeGreaterThan(
      laborRequirement("drip")
    );
  });
});

describe("uniformity", () => {
  it("drip most uniform", () => {
    expect(uniformity("drip")).toBeGreaterThan(
      uniformity("flood")
    );
  });
});

describe("energyUse", () => {
  it("center_pivot uses most energy", () => {
    expect(energyUse("center_pivot")).toBeGreaterThan(
      energyUse("flood")
    );
  });
});

describe("automatable", () => {
  it("drip is automatable", () => {
    expect(automatable("drip")).toBe(true);
  });
  it("flood is not", () => {
    expect(automatable("flood")).toBe(false);
  });
});

describe("slopeCompatible", () => {
  it("drip works on slopes", () => {
    expect(slopeCompatible("drip")).toBe(true);
  });
  it("flood does not", () => {
    expect(slopeCompatible("flood")).toBe(false);
  });
});

describe("bestCropType", () => {
  it("flood for rice paddy", () => {
    expect(bestCropType("flood")).toBe("rice_paddy");
  });
});

describe("waterSource", () => {
  it("center_pivot uses deep well", () => {
    expect(waterSource("center_pivot")).toBe("deep_well");
  });
});

describe("irrigationMethods", () => {
  it("returns 5 methods", () => {
    expect(irrigationMethods()).toHaveLength(5);
  });
});
