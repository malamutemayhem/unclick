import { describe, it, expect } from "vitest";
import {
  sunExposure, mechanizationEase, yieldPerHectare,
  qualityPotential, laborIntensity, freeStanding,
  suitableForHotClimate, typicalRegion, canopyShape, vineyardTrainings,
} from "../vineyard-training-calc.js";

describe("sunExposure", () => {
  it("cordon best sun exposure", () => {
    expect(sunExposure("cordon")).toBeGreaterThan(
      sunExposure("pergola")
    );
  });
});

describe("mechanizationEase", () => {
  it("vsp easiest to mechanize", () => {
    expect(mechanizationEase("vsp")).toBeGreaterThan(
      mechanizationEase("gobelet")
    );
  });
});

describe("yieldPerHectare", () => {
  it("pergola highest yield", () => {
    expect(yieldPerHectare("pergola")).toBeGreaterThan(
      yieldPerHectare("gobelet")
    );
  });
});

describe("qualityPotential", () => {
  it("gobelet highest quality potential", () => {
    expect(qualityPotential("gobelet")).toBeGreaterThan(
      qualityPotential("pergola")
    );
  });
});

describe("laborIntensity", () => {
  it("gobelet most labor intensive", () => {
    expect(laborIntensity("gobelet")).toBeGreaterThan(
      laborIntensity("cordon")
    );
  });
});

describe("freeStanding", () => {
  it("gobelet is free standing", () => {
    expect(freeStanding("gobelet")).toBe(true);
  });
  it("vsp is not", () => {
    expect(freeStanding("vsp")).toBe(false);
  });
});

describe("suitableForHotClimate", () => {
  it("gobelet suitable for hot climate", () => {
    expect(suitableForHotClimate("gobelet")).toBe(true);
  });
  it("vsp is not", () => {
    expect(suitableForHotClimate("vsp")).toBe(false);
  });
});

describe("typicalRegion", () => {
  it("guyot from burgundy champagne", () => {
    expect(typicalRegion("guyot")).toBe("burgundy_champagne");
  });
});

describe("canopyShape", () => {
  it("gobelet is bush form", () => {
    expect(canopyShape("gobelet")).toBe("bush_form");
  });
});

describe("vineyardTrainings", () => {
  it("returns 5 trainings", () => {
    expect(vineyardTrainings()).toHaveLength(5);
  });
});
